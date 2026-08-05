/**
 * Liquid Glass 动态滤镜配置
 *
 * targetFPS:  SVG 滤镜每秒最大更新帧数 (默认 60)
 *             采样器会根据实际 requestAnimationFrame 间隔自适应节流
 *             降低此值可减少 CPU 占用（如 30 即半帧率）
 *
 * enableAdaptiveSampling: 是否启用自适应采样
 *                         true 时采样器会跳过低于目标间隔的帧
 *                         false 时每帧都执行（不推荐）
 *
 * interpolateFeImage: 是否在帧间对 feImage 尺寸做插值
 *                     开启后 feImage 的 width/height 会线性过渡，
 *                     视觉上更丝滑，但需要额外 rAF 循环
 */
export default {
  targetFPS: 60,
  enableAdaptiveSampling: true,
  interpolateFeImage: true,
};