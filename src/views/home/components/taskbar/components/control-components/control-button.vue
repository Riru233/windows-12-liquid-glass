<template>
  <div
    style="display: flex; flex-direction: column; align-items: center; gap: 5px"
  >
    <!-- 液态玻璃 -->
    <LiquidGlass
      :width="100"
      :height="48"
      :radius="10"
      :displacementScale="150"
      :layerClass="props.selected ? 'colorful-open' : 'colorful'"
      :drag="false"
      :blur="10"
      position="relative"
      layerStyle="justify-content: center;align-items:center;"
      :precise="1"
    >
      <svg
        class="icon"
        style="
          width: 20px;
          height: 20px;
          vertical-align: middle;
          overflow: hidden;
        "
        :style="props.selected ? `fill: #fff`:`fill: #333`"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="16975"
      >
        <slot></slot>
      </svg>
    </LiquidGlass>
    <div
      style="
        color: #fff;
        text-shadow:
          0 0 2px #000,
          0 0 4px #000;
        font-size: 12px;
        margin-bottom: 5px;
      "
    >
      {{ props.title }}
    </div>
  </div>
</template>
<script setup>
import LiquidGlass from "@/components/liquid_glass.vue";
const props = defineProps({
  selected: { type: Boolean, default: false },
  title: { type: String, default: "" },
});
</script>

<style scoped>

.glass-component {
  transition: all 0.3s ease-out;
}
.glass-component:hover {
  box-shadow: #a8dbff91 0px 0px 10px 10px;
  transform: scale(1.1);
}
</style>

