<template>
  <div
    class="glass-component"
    ref="glassWindow"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: `${config_layer2.radius}px`,
      top: `${initialTop}px`,
      left: `${initialLeft}px`
    }"
  >
    <div class="filter-layer" :style="{ borderRadius: `${config_layer2.radius}px`, backdropFilter: `url(#${filterId})` }"></div>
    <div class="active-layer" :style="{ borderRadius: `${config_layer2.radius}px`, background: active ? `linear-gradient(to bottom, #23aaf255)` : `transparent` }"></div>

    <div class="glass-content-inner">
      <div v-if="title" class="titlebar" @mousedown="startDrag">
        <svg class="icon glass-fog" viewBox="0 0 1024 1024" width="18px" height="18px" style="width: 18px; margin: 0 3px">
          <path d="M512 85.290667c235.690667 0 426.752 191.061333 426.752 426.752 0 235.648-191.061333 426.709333-426.752 426.709333-235.690667 0-426.752-191.061333-426.752-426.709333C85.248 276.352 276.309333 85.290667 512 85.290667z m0 64a362.752 362.752 0 1 0 0 725.461333A362.752 362.752 0 0 0 512 149.333333z m-0.170667 298.666666a32 32 0 0 1 31.744 27.648l0.298667 4.352 0.128 234.752a32 32 0 0 1-63.701333 4.352l-0.298667-4.309333-0.128-234.752a32 32 0 0 1 32-32zM512 298.794667a42.624 42.624 0 1 1 0 85.205333 42.624 42.624 0 0 1 0-85.205333z" fill="#333"></path>
        </svg>
        <div style="color: #333" class="glass-fog">{{ title }}</div>
        <div style="flex-grow: 1"></div>
        <!-- 样式1：只有关闭 -->
        <div style="display: flex; flex-direction: row" @click="$emit('close')" v-if="props.winPattern === 0">
          <div style="margin: 0 5px; font-size: 14px">
            <svg class="icon windowBtnClose" viewBox="0 0 1024 1024" width="14px">
              <path d="M187.605333 194.304l3.114667-3.584a32 32 0 0 1 41.642667-3.114667l3.584 3.114667L512 466.730667l276.053333-276.053334a32 32 0 1 1 45.226667 45.269334L557.269333 512l276.053334 276.053333a32 32 0 0 1 3.072 41.642667l-3.114667 3.584a32 32 0 0 1-41.642667 3.114667l-3.584-3.114667L512 557.269333l-276.053333 276.053334a32 32 0 0 1-45.226667-45.269334L466.730667 512l-276.053334-276.053333a32 32 0 0 1-3.072-41.642667l3.114667-3.584-3.114667 3.584z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
        <!-- 样式2：三大金刚 -->
          <div style="display: flex; flex-direction: row; height: 24px; align-items: center; font-size: 14px;" v-if="props.winPattern === 1">
            <div style="padding: 0 16px"><svg class="icon windowBtnStd" viewBox="0 0 1024 1024"><path d="M160.213333 533.333333h703.658667a32 32 0 0 0 0-64H160.213333a32 32 0 0 0 0 64z" fill="currentColor"></path></svg></div>
            <div style="padding: 0 16px"><svg class="icon windowBtnStd" viewBox="0 0 1024 1024"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z" fill="currentColor"></path></svg></div>
            <div style="padding: 0 11px 0 16px" @click="close"><svg class="icon windowBtnClose" viewBox="0 0 1024 1024"><path d="M187.605333 194.304l3.114667-3.584a32 32 0 0 1 41.642667-3.114667l3.584 3.114667L512 466.730667l276.053333-276.053334a32 32 0 1 1 45.226667 45.269334L557.269333 512l276.053334 276.053333a32 32 0 0 1 3.072 41.642667l-3.114667 3.584a32 32 0 0 1-41.642667 3.114667l-3.584-3.114667L512 557.269333l-276.053333 276.053334a32 32 0 0 1-45.226667-45.269334L466.730667 512l-276.053334-276.053333a32 32 0 0 1-3.072-41.642667l3.114667-3.584-3.114667 3.584z" fill="currentColor"></path></svg></div>
          </div>
      </div>

      <slot :startDrag="startDrag"></slot>
    </div>

    <svg color-interpolation-filters="sRGB" style="display: none">
      <defs>
        <filter :id="filterId">
          <feGaussianBlur in="SourceGraphic" :stdDeviation="blur" result="blurred" />
          <feImage :href="displacementMap" x="0" y="0" :width="width" :height="height" result="map" />
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
  title: String,
  width: Number,
  height: Number,
  active: Boolean,
  winPattern: Number,    // 0: 只有关闭按钮 1: 三大金刚按钮
  displacementScale: Number,
  initialTop: Number,
  initialLeft: Number,
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
  if (!isDragging) return;
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
  position: fixed;
  overflow: hidden;
  user-select: none;
  box-shadow: rgba(58, 58, 58, 0.333) 0px 0px 20px 1px;
  border: solid 1px #ffffffaa;
  outline: solid #6663 1px;
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
.filter-layer, .active-layer {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
}

/* --- 原封不动搬运的标题栏样式 --- */
.titlebar {
  height: 32px !important;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 0 5px;
  font-size: 12px;
  cursor: default;
  flex-shrink: 0; /* 保证不被内容压缩 */
}
.icon {
  z-index: 4;
  display: flex;
  width: auto;
  align-items: center;
  justify-content: center;
}
</style>