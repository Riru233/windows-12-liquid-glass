<template>
  <div
    class="glass-component"
    ref="glassWindow"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: `${props.radius}px`,
      top: `${initialTop}px`,
      left: `${initialLeft}px`
    }"
  >
    <div class="filter-layer" :style="{ borderRadius: `${props.radius}px`, backdropFilter: `url(#${filterId})` }"></div>

    <div class="glass-content-inner" @mousedown="startDrag" :style="props.layerStyle" :class="props.layerClass">

      <slot :startDrag="startDrag"></slot>
    </div>

    <svg color-interpolation-filters="sRGB" style="display: none">
      <defs>
        <filter :id="filterId">
          <feGaussianBlur in="SourceGraphic" :stdDeviation="props.blur" result="blurred" />
          <feImage :href="displacementMap" x="0" y="0" :width="props.width" :height="props.height" result="map" />
          <feDisplacementMap in="blurred" in2="map" :scale="displacementScale" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="saturate" values="1.6" />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { generateDisplacementMap } from "/src/utils/genvec_layer2.js";

const props = defineProps({
  width: Number,
  height: Number,
  radius: Number,
  active: Boolean,
  displacementScale: Number,
  layerClass: String,
  layerStyle: String,
  drag: { type: Boolean, default: false },
  zoom: { type: Number, default: 1 },
  initialTop: { type: Number, default: 100 },
  initialLeft: { type: Number, default: 100 },
  blur: { type: Number, default: 1 },
  precise: { type: Number, default: 0.1 },
  config_layer2: {
    type: Object,
    default: () => ({ radius: 10, gamma: 1.9, deadzone: 0.5, edge: 8, isInward: true }),
  },
});

defineEmits(["close"]);

const glassWindow = ref(null);
const filterId = `win_filter_${Math.random().toString(36).substr(2, 5)}`;

const displacementMap = computed(() => {
  props.config_layer2.radius = props.radius - 15;
  return generateDisplacementMap({
    width: props.width,
    height: props.height,
    precise: props.precise,
    ...props.config_layer2,
  });
});

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

const startDrag = (e) => {
  if (!props.drag) return;
  if (e.target.closest(".windowBtnClose") || e.target.closest("button")) return;
  isDragging = true;
  const el = glassWindow.value;
  offsetX = e.clientX - el.getBoundingClientRect().left;
  offsetY = e.clientY - el.getBoundingClientRect().top;
  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", stopDrag);
  e.preventDefault();
};

const handleDrag = (e) => {
  if (!props.drag) return;
  if (!isDragging) return;
  const el = glassWindow.value;
  let l = e.clientX - offsetX;
  let t = e.clientY - offsetY;
  el.style.left = `${Math.max(0, Math.min(l, window.innerWidth - el.offsetWidth))}px`;
  el.style.top = `${Math.max(0, Math.min(t, window.innerHeight - el.offsetHeight))}px`;
};

const stopDrag = () => {
  if (!props.drag) return;
  isDragging = false;
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDrag);
};
</script>

<style scoped>
@import "/src/assets/liquidglass.css";

.glass-component {
  position: fixed;
  overflow: hidden;
  user-select: none;
  box-shadow: rgba(58, 58, 58, 0.333) 0px 0px 20px 1px;
  z-index: 10;
  display: flex;
}

.glass-content-inner {
  position: relative;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.filter-layer {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
}

.icon {
  z-index: 4;
  display: flex;
  width: auto;
  align-items: center;
  justify-content: center;
}
</style>