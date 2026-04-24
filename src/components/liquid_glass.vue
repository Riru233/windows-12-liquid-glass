<template>
  <div
    class="glass-component"
    :class="props.bounce == 1 ? 'lg-bounce' : ''"
    ref="glassWindow"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: `${props.radius}px`,
      top: `${props.initialTop}px`,
      left: `${props.initialLeft}px`,
      position: `${props.position}`,
    }"
  >
    <div
      class="filter-layer"
      :class="props.bgClass"
      :style="{
        zIndex: 8,
        borderRadius: `${props.radius}px`,
        backdropFilter: `url(#${filterId})`,
      }"
    ></div>

    <svg 
      class="vector-border" 
      :viewBox="`0 0 ${width} ${height}`"
      :style="{ zIndex: 9 }"
    >
      <defs>
        <linearGradient :id="borderGradId" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff5"  />
        </linearGradient>
      </defs>
      <rect
        x="0.5"
        y="0.5"
        :width="width - 1"
        :height="height - 1"
        :rx="props.radius"
        fill="none"
        :stroke="`url(#${borderGradId})`"
        stroke-width="2"
        style="pointer-events: none;"
      />
    </svg>

    <div
      class="glass-content-inner"
      @mousedown="startDrag"
      :style="props.layerStyle"
      :class="props.layerClass"
    >
      <slot :startDrag="startDrag"></slot>
    </div>

    <svg color-interpolation-filters="sRGB" style="display: none">
      <defs>
        <filter :id="filterId">
          <feGaussianBlur
            in="SourceGraphic"
            :stdDeviation="props.blur"
            result="blurred_source"
          />
          <feImage
            :href="displacementMap"
            x="0"
            y="0"
            :width="props.width"
            :height="props.height"
            result="displacement_map"
          />
          <feDisplacementMap
            in="blurred_source"
            in2="displacement_map"
            :scale="displacementScale"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced_source"
          />
          <feColorMatrix in="displaced_source" type="saturate" values="1.4" />
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
  bgClass: String,
  bounce: Number,
  layerStyle: String,
  drag: { type: Boolean, default: false },
  zoom: { type: Number, default: 1 },
  initialTop: { type: Number, default: 0 },
  initialLeft: { type: Number, default: 0 },
  position: { type: String },
  blur: { type: Number, default: 0 },
  precise: { type: Number, default: 0.1 },
  config_layer2: {
    type: Object,
    default: () => ({
      radius: 10,
      gamma: 1.9,
      deadzone: 0.5,
      edge: 8,
      isInward: true,
    }),
  },
});

defineEmits(["close"]);

const glassWindow = ref(null);
const filterId = `win_filter_${Math.random().toString(36).substr(2, 5)}`;
const borderGradId = `brd_grad_${Math.random().toString(36).substr(2, 5)}`;

// 核心位移贴图保留，因为这是“液体玻璃”的灵魂
const displacementMap = computed(() => {
  const cfg = { ...props.config_layer2 };
  cfg.radius = props.radius - 1;
  return generateDisplacementMap({
    width: props.width,
    height: props.height,
    precise: props.precise,
    ...cfg,
  });
});

// [已优化] 移除 SpecularLayer 的计算属性，不再调用 generateEdgeMap

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

const startDrag = (e) => {
  if (!props.drag) return;
  if (e.target.closest(".windowBtnClose") || e.target.closest("button")) return;
  isDragging = true;
  const el = glassWindow.value;
  const rect = el.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", stopDrag);
  e.preventDefault();
};

const handleDrag = (e) => {
  if (!props.drag || !isDragging) return;
  const el = glassWindow.value;
  let l = e.clientX - offsetX;
  let t = e.clientY - offsetY;
  el.style.left = `${Math.max(0, Math.min(l, window.innerWidth - el.offsetWidth))}px`;
  el.style.top = `${Math.max(0, Math.min(t, window.innerHeight - el.offsetHeight))}px`;
};

const stopDrag = () => {
  isDragging = false;
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDrag);
};
</script>

<style scoped>
@import "/src/assets/liquidglass.css";

.glass-component {
  overflow: hidden;
  user-select: none;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 30px -5px;
  z-index: 10;
  display: flex;
}

/* 矢量边框样式：绝对定位并覆盖在最上层或滤镜层 */
.vector-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  fill: none;
}

.filter-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.glass-content-inner {
  z-index: 10;
  width: 100%;
  position: relative;
}

@keyframes lg-bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.lg-bounce:active {
  animation: lg-bounce 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
</style>