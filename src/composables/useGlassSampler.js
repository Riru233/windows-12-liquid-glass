/**
 * useGlassSampler.js - 玻璃容器平滑采样器
 *
 * 职责：
 *   1. 以可配置采样率（默认 60Hz，自适应实际帧率）驱动数值更新
 *   2. 将目标值按时间常数平滑逼近，避免跳变、保证视觉丝滑
 *   3. 每次采样前执行 driver 回调，便于外部持续更新目标值（如循环动画）
 *   4. 长宽、圆角等所有数值通道走同一套逻辑
 */
import { reactive, readonly } from "vue";
import { useFrameLoop } from "./useFrameLoop.js";
import config from "/src/config/liquid-glass.config.js";

/**
 * @param {object} initial - 初始值，如 { width: 300, height: 220, radius: 24 }
 * @param {object} opts - { tau, eps, driver, targetFPS, enableAdaptiveSampling }
 *        tau: 逼近时间常数 (ms)，越小跟随越快；driver: (elapsed, stats) => void
 * @returns {{ current, target, stats, setTarget, start, stop }}
 */
export function useGlassSampler(initial, opts = {}) {
  const channels = Object.keys(initial);
  const current = reactive({ ...initial });
  const target = reactive({ ...initial });
  const tau = opts.tau ?? 90;
  const eps = opts.eps ?? 0.05;

  const { start, stop, stats } = useFrameLoop(
    (dt, elapsed, frameStats) => {
      if (opts.driver) opts.driver(elapsed, frameStats);

      let changed = false;
      const k = 1 - Math.exp(-dt / tau); // 时间基准逼近，帧率无关
      for (const key of channels) {
        const diff = target[key] - current[key];
        if (Math.abs(diff) < eps) {
          if (current[key] !== target[key]) {
            current[key] = target[key];
            changed = true;
          }
          continue;
        }
        current[key] += diff * k;
        changed = true;
      }
      if (changed && opts.onSample) opts.onSample(current, frameStats);
    },
    {
      targetFPS: opts.targetFPS ?? config.targetFPS,
      enableAdaptiveSampling:
        opts.enableAdaptiveSampling ?? config.enableAdaptiveSampling,
    },
  );

  function setTarget(partial, snap = false) {
    for (const key of Object.keys(partial)) {
      target[key] = partial[key];
      if (snap) current[key] = partial[key];
    }
  }

  return {
    current: readonly(current),
    target: readonly(target),
    stats,
    setTarget,
    start,
    stop,
  };
}
