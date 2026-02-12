// 第一层：生成渐变
/**
 * genvec.js - 全画布向量生成版 (无剪裁)
 */
export const generateGradientMap = (config) => {
  const {
    width = 128,
    height = 128,
    gamma = 1.0, // 设为 1.0 得到完美的线性渐变
    precise = 0.2,
  } = config;

  const calcW = Math.max(8, Math.floor(width * precise));
  const calcH = Math.max(2, Math.round(calcW / (width / height)));

  const canvas = document.createElement("canvas");
  canvas.width = calcW;
  canvas.height = calcH;
  const ctx = canvas.getContext("2d");

  const resultData = ctx.createImageData(calcW, calcH);
  const pix = resultData.data;

  for (let y = 0; y < calcH; y++) {
    for (let x = 0; x < calcW; x++) {
      const p = (y * calcW + x) * 4;

      // 1. 获取归一化坐标 (-1 到 1)
      // 左边缘 -1, 右边缘 1, 中心 0
      const nx = (x / (calcW - 1)) * 2 - 1;
      // 上边缘 -1, 下边缘 1, 中心 0
      const ny = (y / (calcH - 1)) * 2 - 1;

      /**
       * 2. 核心：向内收缩逻辑
       * 我们希望：
       * - 在左侧 (nx < 0)，向量向右 (正值)，颜色 > 127
       * - 在右侧 (nx > 1)，向量向左 (负值)，颜色 < 127
       * - 同理处理 Y 轴
       */

      // 使用 Math.pow 处理 gamma 以控制渐变的“硬度”
      const vx = Math.sign(-nx) * Math.pow(Math.abs(nx), gamma);
      const vy = Math.sign(-ny) * Math.pow(Math.abs(ny), gamma);

      // 3. 映射到 0-255
      // 当 nx = -1 (左边缘), pix[p] = 127.5 + 127.5 * 1 = 255 (纯红)
      // 当 nx = 1 (右边缘), pix[p] = 127.5 + 127.5 * -1 = 0 (无红)
      // 当 nx = 0 (中心), pix[p] = 127.5 (中性)
      pix[p] = Math.round(127.5 + 127.5 * vx); // R 通道: 左右收缩
      pix[p + 1] = Math.round(127.5 + 127.5 * vy); // G 通道: 上下收缩
      pix[p + 2] = 0; // B 通道
      pix[p + 3] = 255; // A 通道
    }
  }

  ctx.putImageData(resultData, 0, 0);
  return canvas.toDataURL("image/png");
};
// 第二层：生成向量场
export const generateDisplacementMap = (config) => {
  const {
    width = 128,
    height = 128,
    radius = 20,
    gamma = 0.8,
    deadzone = 0.5,
    edge = 1.5,
    isInward = false,
    precise = 0.2,
  } = config;

  // --- 核心修复：比例对齐逻辑 ---

  // 1. 确定主轴缩放
  // 我们以宽度为基准计算缩放系数，确保它是一个精确的浮点数
  const rawCalcW = width * precise;
  const calcW = Math.max(8, Math.floor(rawCalcW));

  // 2. 根据 calcW 和原始比例，精确计算 calcH
  // 这样可以保证 (calcW / calcH) 始终等于 (width / height)
  const aspectRatio = width / height;
  const calcH = Math.max(2, Math.round(calcW / aspectRatio));

  // 3. 计算实际应用的缩放比（用于同步圆角半径）
  const actualScaleX = calcW / width;
  const actualScaleY = calcH / height;
  const calcRadius = radius * Math.min(actualScaleX, actualScaleY);

  // --- 画布准备 ---
  const canvas = document.createElement("canvas");
  canvas.width = calcW;
  canvas.height = calcH;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  // 4. 形状绘制
  function createRoundedRectPath(ctx, w, h, r) {
    ctx.beginPath();
    // 稍微向内偏移 0.5 像素防止切边
    ctx.moveTo(r, 0);
    ctx.lineTo(w - r, 0);
    ctx.quadraticCurveTo(w, 0, w, r);
    ctx.lineTo(w, h - r);
    ctx.quadraticCurveTo(w, h, w - r, h);
    ctx.lineTo(r, h);
    ctx.quadraticCurveTo(0, h, 0, h - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
  }

  ctx.clearRect(0, 0, calcW, calcH);
  ctx.fillStyle = "white";
  createRoundedRectPath(ctx, calcW, calcH, calcRadius);
  ctx.fill();

  const imgData = ctx.getImageData(0, 0, calcW, calcH);
  const mask = new Uint8Array(calcW * calcH);
  for (let i = 0; i < mask.length; i++) {
    mask[i] = imgData.data[i * 4 + 3] > 128 ? 1 : 0;
  }

  // --- EDT 算法 ---
  function buildBoundary() {
    const e = new Uint8Array(calcW * calcH);
    for (let t = 0; t < calcH; t++) {
      for (let n = 0; n < calcW; n++) {
        const a = t * calcW + n;
        if (!mask[a]) continue;
        let isEdge = false;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = n + dx,
              ny = t + dy;
            if (
              nx < 0 ||
              ny < 0 ||
              nx >= calcW ||
              ny >= calcH ||
              !mask[ny * calcW + nx]
            ) {
              isEdge = true;
              break;
            }
          }
          if (isEdge) break;
        }
        e[a] = isEdge ? 1 : 0;
      }
    }
    return e;
  }

  function edt1d(e, t) {
    const n = new Int32Array(t),
      a = new Float32Array(t + 1),
      m = new Float32Array(t);
    let o = 0;
    n[0] = 0;
    a[0] = -1e20;
    a[1] = 1e20;
    for (let q = 1; q < t; q++) {
      let val = (e[q] + q * q - (e[n[o]] + n[o] * n[o])) / (2 * (q - n[o]));
      while (val <= a[o]) {
        if (--o < 0) {
          o = 0;
          val = -1e20;
          break;
        }
        val = (e[q] + q * q - (e[n[o]] + n[o] * n[o])) / (2 * (q - n[o]));
      }
      n[++o] = q;
      a[o] = val;
      a[o + 1] = 1e20;
    }
    o = 0;
    for (let i = 0; i < t; i++) {
      while (a[o + 1] < i) o++;
      m[i] = (i - n[o]) * (i - n[o]) + e[n[o]];
    }
    return m;
  }

  function distanceEDT(boundary) {
    const INF = 1e9,
      n = new Float32Array(calcW * calcH);
    for (let y = 0; y < calcH; y++) {
      const row = new Float32Array(calcW);
      for (let x = 0; x < calcW; x++)
        row[x] = boundary[y * calcW + x] ? 0 : INF;
      const res = edt1d(row, calcW);
      for (let x = 0; x < calcW; x++) n[y * calcW + x] = res[x];
    }
    const finalDist = new Float32Array(calcW * calcH);
    for (let x = 0; x < calcW; x++) {
      const col = new Float32Array(calcH);
      for (let y = 0; y < calcH; y++) col[y] = n[y * calcW + x];
      const res = edt1d(col, calcH);
      for (let y = 0; y < calcH; y++) {
        const idx = y * calcW + x;
        finalDist[idx] = mask[idx] ? Math.sqrt(res[y]) : 0;
      }
    }
    let maxD = 0;
    for (let i = 0; i < finalDist.length; i++)
      if (finalDist[i] > maxD) maxD = finalDist[i];
    return [finalDist, maxD];
  }

  const [distField, maxDist] = distanceEDT(buildBoundary());

  // --- 重心与像素填充 ---
  let sumX = 0,
    sumY = 0,
    count = 0;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i]) {
      sumX += i % calcW;
      sumY += Math.floor(i / calcW);
      count++;
    }
  }
  const centerX = count ? sumX / count : calcW / 2;
  const centerY = count ? sumY / count : calcH / 2;

  const resultData = ctx.createImageData(calcW, calcH);
  const pix = resultData.data;
  const W_zone = Math.max(1e-6, 1 - deadzone);

  for (let y = 0; y < calcH; y++) {
    for (let x = 0; x < calcW; x++) {
      const idx = y * calcW + x;
      const p = idx * 4;
      if (!mask[idx]) {
        pix[p] = 127;
        pix[p + 1] = 127;
        pix[p + 2] = 0;
        pix[p + 3] = 0;
        continue;
      }
      const distNorm = Math.max(
        0,
        Math.min(1, distField[idx] / (maxDist || 1)),
      );
      const E = Math.max(0, Math.min(1, (W_zone - distNorm) / W_zone));
      let weight = Math.pow(E, gamma);
      let strength = Math.min(1, Math.max(0, weight / (1 + edge * (1 - E))));

      let vx = centerX - x;
      let vy = centerY - y;
      const hyp = Math.hypot(vx, vy) || 1e-6;
      vx /= hyp;
      vy /= hyp;

      if (!isInward) {
        vx = -vx;
        vy = -vy;
      }

      pix[p] = Math.round(127.5 + 127.5 * vx * strength);
      pix[p + 1] = Math.round(127.5 + 127.5 * vy * strength);
      pix[p + 2] = 0;
      pix[p + 3] = 255;
    }
  }

  ctx.putImageData(resultData, 0, 0);
  return canvas.toDataURL("image/png");
};
// 第三层：边框生成
export const generateEdgeMap = ({
  width = 300,
  height = 150,
  radius = 10,
  angle = 45,
  precise = 0.1, // 默认开启精度缩放，解决卡顿
  edge = 1,
}) => {
  // 1. 缩放尺寸计算
  const renderW = width * precise;
  const renderH = height * precise;
  const renderRadius = radius * precise;
  const renderEdge = edge * precise;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = renderW;
  canvas.height = renderH;

  // 2. 角度转换 (CSS 角度转换为 Canvas 弧度)
  const rad = ((angle - 90) * Math.PI) / 180;

  // 3. 计算渐变向量
  // 使用较长的向量长度确保渐变足够“长”，从而消除局部的剧烈明暗变化（反射感）
  const cx = renderW / 2;
  const cy = renderH / 2;
  const length = Math.max(renderW, renderH) * 1.5; // 增加长度使渐变更平缓

  const x0 = cx - (Math.cos(rad) * length) / 2;
  const y0 = cy - (Math.sin(rad) * length) / 2;
  const x1 = cx + (Math.cos(rad) * length) / 2;
  const y1 = cy + (Math.sin(rad) * length) / 2;

  // 4. 关键：去除重复颜色，只使用单次线性过渡
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  // 只从不透明白色过渡到全透明白色
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  // 5. 路径绘制辅助
  const drawPath = (context, x, y, w, h, r) => {
    context.beginPath();
    const safeR = Math.min(r, w / 2, h / 2);
    if (context.roundRect) {
      context.roundRect(x, y, w, h, safeR);
    } else {
      context.moveTo(x + safeR, y);
      context.arcTo(x + w, y, x + w, y + h, safeR);
      context.arcTo(x + w, y + h, x, y + h, safeR);
      context.arcTo(x, y + h, x, y, safeR);
      context.arcTo(x, y, x + w, y, safeR);
      context.closePath();
    }
  };

  // 6. 执行绘制
  drawPath(ctx, 0, 0, renderW, renderH, renderRadius);
  ctx.fillStyle = gradient;
  ctx.fill();

  // 7. 挖空内部，仅保留边框
  ctx.globalCompositeOperation = "destination-out";
  const innerR = Math.max(0, renderRadius - renderEdge);
  drawPath(
    ctx,
    renderEdge,
    renderEdge,
    renderW - renderEdge * 2,
    renderH - renderEdge * 2,
    innerR,
  );
  for (let i = 0; i < 100; i++) {
    ctx.fill();
  }

  return canvas.toDataURL("image/png");
};
