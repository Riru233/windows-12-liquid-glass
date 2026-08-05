/**
 * Liquid Glass 动态滤镜配置
 *
 * targetFPS: SVG 滤镜每秒最大更新帧数（默认 60）
 *             采样器会根据实际 requestAnimationFrame 间隔自适应节流：
 *             显示器刷新率高于目标帧率时跳帧（如 120Hz 屏采样 60Hz），
 *             低于目标帧率时跟随实际帧率（如 30Hz 屏就按 30Hz 采样）。
 *
 * enableAdaptiveSampling: 是否启用自适应采样
 *                         true 时采样器会跳过低于目标间隔的帧
 *                         false 时每帧都执行（不推荐）
 *
 * fpsMeasureWindow: 实际帧率/采样帧率统计窗口（毫秒），供 HUD 显示
 *
 * interpolateFeImage: 是否在帧间对 feImage 尺寸做插值
 *                     开启后 feImage 的 width/height 会平滑过渡，
 *                     视觉上更丝滑，但需要额外 rAF 循环
 */
export default {
  targetFPS: 60,
  enableAdaptiveSampling: true,
  fpsMeasureWindow: 1000,
  interpolateFeImage: true,
};
