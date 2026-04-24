<template>
  <div
    class="glass-component"
    ref="glassWindow"
    :style="{
      width: `${props.width - 4}px`,
      height: `${props.height}px`,
      top: `${top}px`,
      left: `${left}px`,
      willChange: isDragging ? 'top, left' : 'auto',
    }"
  >
    <div
      class="filter-layer"
      :style="{
        borderRadius: `${props.config_layer2.radius}px`,
        backdropFilter:
          props.displacementScale !== 0
            ? `url(#${filterId})`
            : props.active
              ? `blur(${props.blur * 10}px)`
              : `blur(${props.blur}px)`,
        borderTop: `solid 1px #ffffffaa`,
        borderRight: `solid 2px #ffffffaa`,
      }"
    ></div>

    <div
      class="active-layer"
      :style="
        props.active
          ? `border-radius:${props.config_layer2.radius}px;background: #ffffff22;box-shadow: 12px 12px 20px #00000033;`
          : `background: transparent;border-radius:${props.config_layer2.radius}px;box-shadow: 0 0 20px #00000033;`
      "
    ></div>

    <div
      class="glass-content-inner"
      :style="{
        borderRadius: `${props.config_layer2.radius}px`,
        overflow: `hidden`,
      }"
    >
      <div v-if="props.title" class="titlebar" @mousedown="startDrag">
        <img
          :src="props.icon"
          alt=""
          style="width: 16px; height: 16px; color: #333"
        />
        <div style="color: #333" class="glass-fog">{{ props.title }}</div>
        <div style="flex-grow: 1"></div>

        <div
          style="display: flex; flex-direction: row; cursor: pointer"
          @click="$emit('close')"
          v-if="props.winPattern === 0"
        >
          <div style="margin: 0 5px; font-size: 14px">
            <svg
              class="icon windowBtnClose"
              viewBox="0 0 1024 1024"
              width="14px"
            >
              <path
                d="M187.605333 194.304l3.114667-3.584a32 32 0 0 1 41.642667-3.114667l3.584 3.114667L512 466.730667l276.053333-276.053334a32 32 0 1 1 45.226667 45.269334L557.269333 512l276.053334 276.053333a32 32 0 0 1 3.072 41.642667l-3.114667 3.584a32 32 0 0 1-41.642667 3.114667l-3.584-3.114667L512 557.269333l-276.053333 276.053334a32 32 0 0 1-45.226667-45.269334L466.730667 512l-276.053334-276.053333a32 32 0 0 1-3.072-41.642667l3.114667-3.584-3.114667 3.584z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>

        <div
          style="
            display: flex;
            flex-direction: row;
            height: 24px;
            align-items: center;
            font-size: 14px;
          "
          v-if="props.winPattern === 1"
        >
          <div
            style="padding: 0 16px; cursor: pointer"
            @click="$emit('minimize')"
          >
            <svg class="icon windowBtnStd" viewBox="0 0 1024 1024">
              <path
                d="M160.213333 533.333333h703.658667a32 32 0 0 0 0-64H160.213333a32 32 0 0 0 0 64z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div style="padding: 0 16px; cursor: pointer">
            <svg class="icon windowBtnStd" viewBox="0 0 1024 1024">
              <path
                d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div
            style="padding: 0 11px 0 16px; cursor: pointer"
            @click="$emit('close')"
          >
            <svg class="icon windowBtnClose" viewBox="0 0 1024 1024">
              <path
                d="M187.605333 194.304l3.114667-3.584a32 32 0 0 1 41.642667-3.114667l3.584 3.114667L512 466.730667l276.053333-276.053334a32 32 0 1 1 45.226667 45.269334L557.269333 512l276.053334 276.053333a32 32 0 0 1 3.072 41.642667l-3.114667 3.584a32 32 0 0 1-41.642667 3.114667l-3.584-3.114667L512 557.269333l-276.053333 276.053334a32 32 0 0 1-45.226667-45.269334L466.730667 512l-276.053334-276.053333a32 32 0 0 1-3.072-41.642667l3.114667-3.584-3.114667 3.584z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <slot :startDrag="startDrag"></slot>
    </div>

    <svg
      color-interpolation-filters="sRGB"
      style="display: none"
      v-if="displacementScale != 0"
    >
      <defs>
        <filter :id="filterId">
          <feGaussianBlur
            in="SourceGraphic"
            :stdDeviation="blur"
            result="blurred"
          />

          <feImage
            :href="displacementMap"
            x="0"
            y="0"
            :width="width"
            :height="height"
            result="map"
          />

          <feDisplacementMap
            in="blurred"
            in2="map"
            :scale="displacementScale"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced_source"
          />

          <feColorMatrix
            in="displaced_source"
            type="saturate"
            :values="props.active ? '1.2' : '1.0'"
            result="saturated"
          />

          <feBlend in="saturated" mode="normal" result="withSaturation" />
          <feBlend in="withSaturation" mode="normal" />
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
  winPattern: Number, // 0: 只有关闭按钮 1: 三大金刚按钮
  icon: { type: String, default: "" },
  displacementScale: { type: Number, default: 78 },
  blur: { type: Number, default: 5 },
  precise: { type: Number, default: 0.1 },
  config_layer2: {
    type: Object,
    default: () => ({
      radius: 10,
      gamma: 1,
      deadzone: 0.9,
      edge: 10,
      isInward: true,
    }),
  },
});

const top = defineModel("top");
const left = defineModel("left");

defineEmits(["close", "minimize"]);

const glassWindow = ref(null);
// 动态 ID 确保多个组件实例不冲突
const filterId = `win_filter_${Math.random().toString(36).substr(2, 5)}`;

// 位移贴图图层计算
const displacementMap = computed(() => {
  props.config_layer2.deadzone = (props.width - 48) / props.width;
  props.config_layer2.edge = props.width * 0.01;
  return generateDisplacementMap({
    width: props.width,
    height: props.height,
    precise: props.precise,
    ...props.config_layer2,
  });
});

/**
 * 拖拽交互逻辑
 */
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

const startDrag = (e) => {
  // 排除按钮区域的拖拽触发
  if (
    e.target.closest(".windowBtnClose") ||
    e.target.closest(".windowBtnStd") ||
    e.target.closest("button")
  )
    return;
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
  if (!isDragging) return;
  const el = glassWindow.value;
  let l = e.clientX - offsetX;
  let t = e.clientY - offsetY;

  // 边界控制逻辑
  const finalLeft = Math.max(
    -window.innerWidth,
    Math.min(l, window.innerWidth - 30),
  );
  const finalTop = Math.max(-30, Math.min(t, window.innerHeight - 30));

  el.style.left = `${finalLeft}px`;
  el.style.top = `${finalTop}px`;

  // 实时更新 v-model
  top.value = finalTop;
  left.value = finalLeft;
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
  overflow: visible;
  user-select: none;
  z-index: 10;
  display: flex;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.glass-content-inner {
  position: relative;
  z-index: 8;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: solid 2px #ffffff55;
  /* background: radial-gradient(circle, #ffffff00 60%, #ffffff66 ); */
}

.filter-layer,
.active-layer {
  background: linear-gradient(135deg, #ffffff00, #ffffff44, #ffffff00, #ffffff44, #ffffff00, #ffffff44);
  transition: all 0.2s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 2px);
  height: 100%;
  pointer-events: none;
}

/* 标题栏样式 */
.titlebar {
  height: 32px !important;
  display: flex;
  gap: 5px;
  align-items: center;
  flex-direction: row;
  margin: 0 10px;
  font-size: 12px;
  cursor: default;
  flex-shrink: 0;
}

.icon {
  z-index: 4;
  display: flex;
  width: auto;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.icon:hover {
  opacity: 0.7;
}
</style>
