/**
 * useFrameLoop.js - 帧率感知动画循环
 *
 * 核心思路：
 *   1. 利用 requestAnimationFrame 驱动渲染循环
 *   2. 根据 targetFPS 计算最小帧间隔（ms），跳过未到期的帧（自适应节流）
 *   3. 显示器刷新率高于目标时按目标帧率采样，低于目标时跟随实际帧率
 *   4. 回调收到 (deltaTime, elapsedTime, stats)，stats 内含实测帧率
 *   5. 组件销毁时自动取消循环
 */
import { reactive, onUnmounted } from "vue";
import config from "/src/config/liquid-glass.config.js";

/**
 * 启动帧率感知循环
 * @param {function} callback - (dt, elapsed, stats) => void
 *        dt 为上一采样帧实际耗时 (ms)，elapsed 为启动后累计时长 (ms)
 * @param {object} opts - 可选覆盖 { targetFPS, enableAdaptiveSampling, fpsMeasureWindow }
 * @returns {{ start: Function, stop: Function, stats: object }}
 */
export function useFrameLoop(callback, opts = {}) {
  const targetFPS = opts.targetFPS ?? config.targetFPS;
  const adaptive = opts.enableAdaptiveSampling ?? config.enableAdaptiveSampling;
  const measureWindow = opts.fpsMeasureWindow ?? config.fpsMeasureWindow ?? 1000;

  const minInterval = 1000 / targetFPS;
  const stats = reactive({
    targetFPS,
    actualFPS: 0,
    sampledFPS: 0,
    elapsed: 0,
  });

  let rafId = null;
  let lastTime = 0;
  let startTime = 0;
  let running = false;
  let rafFrames = 0;
  let sampledFrames = 0;
  let measureStart = 0;

  function loop(now) {
    if (!running) return;
    rafId = requestAnimationFrame(loop);

    const dt = now - lastTime;
    rafFrames++;
    if (now - measureStart >= measureWindow) {
      stats.actualFPS = Math.round((rafFrames * 1000) / (now - measureStart));
      stats.sampledFPS = Math.round(
        (sampledFrames * 1000) / (now - measureStart),
      );
      rafFrames = 0;
      sampledFrames = 0;
      measureStart = now;
    }

    if (adaptive && dt < minInterval) return; // 自适应跳帧：采样适应实际帧率

    lastTime = now;
    sampledFrames++;
    stats.elapsed = now - startTime;
    callback(dt, stats.elapsed, stats);
  }

  function start() {
    if (running) return;
    running = true;
    lastTime = performance.now();
    startTime = lastTime;
    measureStart = lastTime;
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  onUnmounted(stop);

  return { start, stop, stats };
}

/**
 * 线性插值工具
 */
export function lerp(a, b, t) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}
