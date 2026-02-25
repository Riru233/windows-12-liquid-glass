<template>
  <div
    style="display: flex; flex-direction: column; align-items: center; gap: 5px"
  >
    <!-- 液态玻璃 -->
    <LiquidGlass
      :width="props.width"
      :height="props.height"
      :radius="props.radius"
      :displacementScale="150"
      :bgClass="props.selected ? 'colorful-open' : 'colorful'"
      :drag="false"
      :blur="10"
      position="relative"
      layerStyle="justify-content: center;align-items:center;display: flex;flex-direction:row;color: #333;gap:3px;"
      :precise="1"
    >
      <slot></slot>
    </LiquidGlass>
  </div>
</template>
<script setup>
import LiquidGlass from "@/components/liquid_glass.vue";
const props = defineProps({
    width: Number,
    height: Number,
    radius: Number,
});
</script>
<style></style>
