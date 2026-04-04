<template>
  <div class="stick-wrapper" :style="tileStyle">
    <LiquidGlass :width="actualSize.w" :height="actualSize.h" :radius="25" :displacementScale="75"
      :layerStyle="`background-color: ${props.bg}; color: ${props.color};`" :drag="false" :blur="3" position="relative"
      layerStyle="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100%;"
      :precise="1">
      <div class="content-box">
        <div style="flex:1;display: flex;align-items: center;">
          <slot></slot>
        </div>
        <span v-if="title && (actualSize.w > 64)" class="tile-title">{{ title }}</span>
      </div>
    </LiquidGlass>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import LiquidGlass from "@/components/liquid_glass.vue";

const props = defineProps({
  colored: { type: Boolean, default: false },
  bg: { type: String, default: '#fff0' },
  color: { type: String, default: '#fff' },
  title: { type: String, default: "" },
  size: { type: String, default: '1x1' } // 支持 '1x1', '2x2', '2x4'
});

// 定义基础常量 (需与 Page 的 Grid 配置匹配)
const BASE = 64;
const GAP = 10;

// 计算传给 LiquidGlass 的精确整数宽高
const actualSize = computed(() => {
  const [row, col] = props.size.split('x').map(Number);
  return {
    // 宽度 = (列数 * 基础宽) + (间距数 * GAP)
    w: Math.floor(col * BASE + (col - 1) * GAP),
    // 高度 = (行数 * 基础高) + (间距数 * GAP)
    h: Math.floor(row * BASE + (row - 1) * GAP)
  };
});

const tileStyle = computed(() => {
  const [row, col] = props.size.split('x').map(Number);
  return {
    gridRow: `span ${row}`,
    gridColumn: `span ${col}`,
    width: `${actualSize.value.w}px`,
    height: `${actualSize.value.h}px`
  };
});
</script>

<style scoped>
.stick-wrapper {
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.stick-wrapper:hover {
  transform: scale(1.05);
  z-index: 10;
}

.content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: 100%;
}

.tile-title {
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  width: 100%;
  padding: 0 10px 10px 30px;
}

.icon {
  width: 24px;
  height: 24px;
}

.detail-arrow {
  position: absolute;
  right: 6px;
  bottom: 6px;
}

.icon-arrow {
  width: 12px;
  height: 12px;
}
</style>