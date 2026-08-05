/**
 * useFrameLoop.js - 帧率感知动画循环
 *
 * 核心思路：
 *   1. 利用 requestAnimationFrame 驱动渲染循环
 *   2. 根据 targetFPS 计算最小帧间隔（ms），跳过未到期的帧
 *   3. 回调收到 (deltaTime, elapsedTime) 供插值计算
 *   4. 组件销毁时自动取消循环
 */
import { onUnmounted } from "vue";
import config from "/src/config/liquid-glass.config.js";

/**
 * 启动帧率感知循环
 * @param {function} callback - (dt, elapsed) => void，dt 为上一帧实际耗时 (ms)
 * @param {object}   opts     - 可选覆盖 { targetFPS, enableAdaptiveSampling }
 * @returns {{ start: Function, stop: Function }}
 */
export function useFrameLoop(callback, opts = {}) {
  const targetFPS = opts.targetFPS ?? config.targetFPS;
  const adaptive  = opts.enableAdaptiveSampling ?? config.enableAdaptiveSampling;

  const minInterval = 1000 / targetFPS;
  let rafId    = null;
  let lastTime = 0;
  let running  = false;

  function loop(now) {
    if (!running) return;
    rafId = requestAnimationFrame(loop);

    const dt = now - lastTime;
    if (adaptive && dt < minInterval) return;   // 自适应跳帧

    lastTime = now;
    callback(dt, now);
  }

  function start() {
    if (running) return;
    running  = true;
    lastTime = performance.now();
    rafId    = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  onUnmounted(stop);

  return { start, stop };
}

/**
 * 线性插值工具
 */
export function lerp(a, b, t) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}