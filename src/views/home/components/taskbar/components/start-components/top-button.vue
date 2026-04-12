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
      :layerClass="props.selected ? 'colorful-open-start' : 'colorful-start'"
      :drag="false"
      :blur="5"
      position="relative"
      :layerStyle="`justify-content: center;align-items:center;display: flex;flex-direction:row;color: #333;gap:3px;background: ${props.selected ? props.selectedColor : '#ffffff66'};box-shadow: 0 0 10px #333;`"
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
    selected: Boolean,
    selectedColor: String,
});
</script>
<style>
.colorful-open-start {
  color: #fff!important;
}

</style>
