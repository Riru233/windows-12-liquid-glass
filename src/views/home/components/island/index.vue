<template>
  <div
    class="island"
    :class="state.expand"
    :style="{
      width: `${animWidth}px`,
      height: `${animHeight}px`,
      top: `${animTop}px`,
      borderRadius: `${animRadius}px`,
      color: animColor,
      opacity: animOpacity
    }"
    @click="expandOut"
  >
    <LiquidGlass
      :width="animWidth"
      :height="animHeight"
      :radius="animRadius"
      :blur="8"
      :displacementScale="4"
      bgClass="glass-tint"
      position="absolute"
    />
    <div class="island-content">{{ props.content }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import LiquidGlass from "/src/components/liquid_glass.vue";

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});

const state = reactive({
  expand: "expandInit",
});

const animWidth = ref(0);
const animHeight = ref(0);
const animTop = ref(20);
const animRadius = ref(24);
const animColor = ref("rgba(255,255,255,0)");
const animOpacity = ref(0);

let animFrame = null;

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

const expandInKeyframes = [
  { t: 0, w: 0, h: 0, top: 20, r: 24, color: "rgba(255,255,255,0)", opacity: 0 },
  { t: 0.3, w: 24, h: 24, top: 20, r: 24, color: "rgba(255,255,255,0)", opacity: 1 },
  { t: 0.6, w: 24, h: 24, top: 35, r: 24, color: "rgba(255,255,255,0)", opacity: 1 },
  { t: 1, w: 300, h: 48, top: 50, r: 24, color: "#fff", opacity: 1 },
];

const expandOutKeyframes = [
  { t: 0, w: 300, h: 48, top: 50, r: 24, color: "#fff", opacity: 1 },
  { t: 0.3, w: 24, h: 24, top: 35, r: 24, color: "rgba(255,255,255,0)", opacity: 1 },
  { t: 0.6, w: 24, h: 24, top: 20, r: 24, color: "rgba(255,255,255,0)", opacity: 1 },
  { t: 1, w: 0, h: 0, top: 20, r: 24, color: "rgba(255,255,255,0)", opacity: 0 },
];

function interpolate(keyframes, progress) {
  let i = 0;
  while (i < keyframes.length - 1 && keyframes[i + 1].t <= progress) i++;
  if (i >= keyframes.length - 1) return keyframes[keyframes.length - 1];
  const from = keyframes[i];
  const to = keyframes[i + 1];
  const seg = (progress - from.t) / (to.t - from.t);
  const e = easeInOut(seg);
  return {
    w: from.w + (to.w - from.w) * e,
    h: from.h + (to.h - from.h) * e,
    top: from.top + (to.top - from.top) * e,
    r: from.r + (to.r - from.r) * e,
    color: progress < 0.5 ? from.color : to.color,
    opacity: from.opacity + (to.opacity - from.opacity) * e,
  };
}

function animate(keyframes, duration, onComplete) {
  if (animFrame) cancelAnimationFrame(animFrame);
  const startTime = performance.now();
  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const v = interpolate(keyframes, progress);
    animWidth.value = v.w;
    animHeight.value = v.h;
    animTop.value = v.top;
    animRadius.value = v.r;
    animColor.value = v.color;
    animOpacity.value = v.opacity;
    if (progress < 1) {
      animFrame = requestAnimationFrame(tick);
    } else if (onComplete) {
      onComplete();
    }
  }
  animFrame = requestAnimationFrame(tick);
}

function expandIn() {
  state.expand = "expandIn";
  animate(expandInKeyframes, 300);
}

function expandOut() {
  state.expand = "expandOut";
  animate(expandOutKeyframes, 300);
}

onMounted(() => {
  setTimeout(() => {
    expandIn();
  }, 1000);
});
</script>

<style scoped>
.island {
  position: absolute;
  left: 50%;
  z-index: 999;
  transform: translateX(-50%);
  display: flex;
  cursor: pointer;
  user-select: none;
  align-items: center;
  overflow: hidden;
}

.island-content {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 15px;
}

.expandInit {
  pointer-events: none;
}
.expandIn {
  pointer-events: auto;
}
.expandOut {
  pointer-events: auto;
}
</style>