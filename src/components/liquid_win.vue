<template>
  <div
    class="glass-component"
    :class="{ maximized: maximized, 'no-transition': isDragging || resizing }"
    ref="glassWindow"
    :style="rootStyle"
  >
    <div
      class="filter-layer"
      :style="{
        borderRadius: `${effectiveRadius}px`,
        backdropFilter:
          props.displacementScale !== 0
            ? `url(#${filterId})`
            : `blur(${props.blur}px)`,
        borderTop: `solid 1px #ffffffaa`,
        borderRight: `solid 2px #ffffffaa`,
      }"
    ></div>

    <svg
      v-if="!maximized"
      class="vector-border"
      :viewBox="`0 0 ${winW} ${winH}`"
      :style="{ zIndex: 9 }"
    >
      <defs>
        <linearGradient :id="borderGradId" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="20%" stop-color="#fff7" />
          <stop offset="50%" stop-color="#6667" />
          <stop offset="80%" stop-color="#fff7" />
        </linearGradient>
      </defs>
      <rect
        x="0.5"
        y="-0.5"
        :width="winW - 1"
        :height="winH + 1.5"
        :rx="10"
        fill="none"
        :stroke="`url(#${borderGradId})`"
        stroke-width="2"
        style="pointer-events: none;"
      />
    </svg>


    <div
      class="active-layer"
      :style="
        props.active
          ? `border-radius:${effectiveRadius}px;background: linear-gradient(to bottom,#fffa,#fff0);box-shadow: 12px 12px 20px #00000033;`
          : `background: linear-gradient(to bottom,#fff6,#fff0);border-radius:${effectiveRadius}px;box-shadow: 0 0 20px #00000033;`
      "
    ></div>

    <div
      class="glass-content-inner"
      :style="{
        borderRadius: `${effectiveRadius}px`,
        outline: `1px solid #999`,
        overflow: `hidden`,
      }"
    >
      <div v-if="props.title" class="titlebar" @mousedown="startDrag">
        <img
          :src="props.icon"
          v-if="props.icon"
          alt=""
          style="width: 16px; height: 16px; color: #333"
        />
        <div style="color: #333" class="glass-fog">{{ props.title }}</div>
        <div style="flex-grow: 1"></div>

        <div
          style="display: flex; flex-direction: row;"
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
            style="padding: 0 16px; "
            @click="$emit('minimize')"
          >
            <svg class="icon windowBtnStd" viewBox="0 0 1024 1024">
              <path
                d="M160.213333 533.333333h703.658667a32 32 0 0 0 0-64H160.213333a32 32 0 0 0 0 64z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div style="padding: 0 16px; " @click="toggleMaximize">
            <svg v-if="maximized" class="icon windowBtnStd" viewBox="0 0 1024 1024">
              <path
                d="M320 170.666667h384a149.333333 149.333333 0 0 1 149.333333 149.333333v384a149.333333 149.333333 0 0 1-149.333333 149.333333H320a149.333333 149.333333 0 0 1-149.333333-149.333333V320a149.333333 149.333333 0 0 1 149.333333-149.333333z m0 74.666666a74.666667 74.666667 0 0 0-74.666667 74.666667v384a74.666667 74.666667 0 0 0 74.666667 74.666667h384a74.666667 74.666667 0 0 0 74.666666-74.666667V320a74.666667 74.666667 0 0 0-74.666666-74.666667z"
                fill="currentColor"
              ></path>
              <path
                d="M213.333333 384h74.666667v298.666667a74.666667 74.666667 0 0 0 74.666667 74.666666h298.666666v74.666667a74.666667 74.666667 0 0 1-74.666666 74.666667H288a74.666667 74.666667 0 0 1-74.666667-74.666667z"
                fill="currentColor"
              ></path>
            </svg>
            <svg v-else class="icon windowBtnStd" viewBox="0 0 1024 1024">
              <path
                d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div
            style="padding: 0 11px 0 16px; "
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

    <div v-if="props.resizable && !maximized" class="resize-layer">
      <div
        v-for="dir in resizeHandles"
        :key="dir"
        class="resize-handle"
        :class="`resize-${dir}`"
        @mousedown.stop="onResizeStart(dir, $event)"
      ></div>
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
            :width="filterW"
            :height="filterH"
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

    <Teleport to="body">
      <div
        v-if="previewState !== 'none'"
        class="max-preview"
        :class="{ 'preview-in': previewState === 'in', 'preview-out': previewState === 'out' }"
        :style="previewStyle"
        @animationend="onPreviewAnimEnd"
      >
        <liquid-glass
          class="preview-glass"
          :width="previewRect.width"
          :height="previewRect.height"
          :radius="14"
          :displacementScale="35"
          :config_layer2="
          {
            radius: 10,
            gamma: 8,
            deadzone: 0.8,
            edge: 0.1,
            isInward: true,
          }
          "
          :blur="0"
          :precise="0.5"
          :drag="false"
          position="relative"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { generateDisplacementMap } from "/src/utils/genvec_layer2.js";
import LiquidGlass from "./liquid_glass.vue";

const props = defineProps({
  title: String,
  width: Number,
  height: Number,
  active: Boolean,
  winPattern: Number, // 0: 只有关闭按钮 1: 三大金刚按钮
  icon: { type: String, default: "" },
  displacementScale: { type: Number, default: 0 },
  blur: { type: Number, default: 3 },
  precise: { type: Number, default: 0.1 },
  resizable: { type: Boolean, default: false },
  config_layer2: {
    type: Object,
    default: () => ({
      radius: 10,
      gamma: 0.6,
      deadzone: 8,
      edge: 0.01,
      isInward: true,
    }),
  },
});

const top = defineModel("top");
const left = defineModel("left");

const emit = defineEmits([
  "close",
  "minimize",
  "maximize",
  "restore",
  "update:width",
  "update:height",
]);

const glassWindow = ref(null);
// 动态 ID 确保多个组件实例不冲突
const filterId = `win_filter_${Math.random().toString(36).substr(2, 5)}`;
const borderGradId = `brd_grad_${Math.random().toString(36).substr(2, 5)}`;
const borderGradId1 = `brd_grad_${Math.random().toString(36).substr(2, 5)}`;

// 窗口内部尺寸（resizable 时可被拖拽改变，props 变化时同步）
const winW = ref(props.width || 0);
const winH = ref(props.height || 0);
watch(
  () => [props.width, props.height],
  ([w, h]) => {
    if (w) winW.value = w;
    if (h) winH.value = h;
  },
);

// 最大化状态
const TASKBAR_H = 46;
const MAX_DRAG_TOP = 10;
const PREVIEW_INSET = 10;
const maximized = ref(false);
const savedRect = ref(null);
const previewState = ref("none"); // none | in | out
const previewRect = ref({ top: 0, left: 0, width: 0, height: 0 });

const rootStyle = computed(() => {
  if (maximized.value) {
    return {
      width: `${winW.value}px`,
      height: `${winH.value}px`,
      top: `0px`,
      left: `0px`,
      willChange: "top, left",
    };
  }
  return {
    width: `${winW.value - 4}px`,
    height: `${winH.value}px`,
    top: `${top.value}px`,
    left: `${left.value}px`,
    willChange: isDragging.value ? "top, left" : "auto",
  };
});

const effectiveRadius = computed(() =>
  maximized.value ? 0 : props.config_layer2.radius,
);

const previewStyle = computed(() => ({
  position: "fixed",
  top: `${previewRect.value.top}px`,
  left: `${previewRect.value.left}px`,
  width: `${previewRect.value.width}px`,
  height: `${previewRect.value.height}px`,
  zIndex: 1,
  outline: '1px solid #555',
  pointerEvents: "none",
  "--pv-from-top": `${previewFrom.value.top}px`,
  "--pv-from-left": `${previewFrom.value.left}px`,
  "--pv-from-w": `${previewFrom.value.width}px`,
  "--pv-from-h": `${previewFrom.value.height}px`,
  "--pv-to-top": `${previewRect.value.top}px`,
  "--pv-to-left": `${previewRect.value.left}px`,
  "--pv-to-w": `${previewRect.value.width}px`,
  "--pv-to-h": `${previewRect.value.height}px`,
}));

// 位移贴图图层计算
const displacementMap = computed(() => {
  props.config_layer2.deadzone = (filterW.value - 48) / filterW.value / 1.4;
  props.config_layer2.edge = filterW.value * 0.01 / 1.4;
  return generateDisplacementMap({
    width: filterW.value,
    height: filterH.value,
    precise: props.precise,
    ...props.config_layer2,
    radius: effectiveRadius.value,
  });
});

// 滤镜尺寸跟随容器实际尺寸（ResizeObserver 实测）
const filterSize = ref({
  width: props.width || 128,
  height: props.height || 128,
});
const filterW = computed(() => filterSize.value.width || props.width || 128);
const filterH = computed(() => filterSize.value.height || props.height || 128);

let resizeObserver = null;

onMounted(() => {
  const el = glassWindow.value;
  if (!el || typeof ResizeObserver === "undefined") return;
  resizeObserver = new ResizeObserver((entries) => {
    const rect = entries[0]?.contentRect;
    if (!rect) return;
    filterSize.value = { width: rect.width, height: rect.height };
  });
  resizeObserver.observe(el);
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  clearTimeout(previewTimer);
});

// 最大化 / 还原
const applyMaximize = () => {
  if (maximized.value) return;
  savedRect.value = {
    top: top.value,
    left: left.value,
    width: winW.value,
    height: winH.value,
  };
  maximized.value = true;
  top.value = 0;
  left.value = 0;
  winW.value = window.innerWidth;
  winH.value = window.innerHeight - TASKBAR_H;
  emit("update:top", 0);
  emit("update:left", 0);
  emit("update:width", winW.value);
  emit("update:height", winH.value);
  emit("maximize");
};

const applyRestore = () => {
  if (!maximized.value) return;
  const r = savedRect.value || { top: 60, left: 60, width: 560, height: 480 };
  maximized.value = false;
  top.value = r.top;
  left.value = r.left;
  winW.value = r.width;
  winH.value = r.height;
  emit("update:top", r.top);
  emit("update:left", r.left);
  emit("update:width", r.width);
  emit("update:height", r.height);
  emit("restore");
};

const toggleMaximize = () => {
  if (maximized.value) applyRestore();
  else applyMaximize();
};

// 最大化预激活预览
const previewFrom = ref({ top: 0, left: 0, width: 0, height: 0 });
let previewTimer = null;

const enterPreview = (e) => {
  if (previewState.value === "in") return;
  previewState.value = "in";
  clearTimeout(previewTimer);
  const finalRect = {
    top: PREVIEW_INSET,
    left: PREVIEW_INSET,
    width: window.innerWidth - PREVIEW_INSET * 2,
    height: window.innerHeight - TASKBAR_H - PREVIEW_INSET * 2,
  };
  previewRect.value = finalRect;
  const originX = e?.clientX ?? window.innerWidth / 2;
  const originY = e?.clientY ?? PREVIEW_INSET;
  const startW = Math.max(48, finalRect.width * 0.15);
  const startH = Math.max(28, finalRect.height * 0.15);
  previewFrom.value = {
    top: Math.min(Math.max(originY - startH / 2, 0), window.innerHeight - startH),
    left: Math.min(Math.max(originX - startW / 2, 0), window.innerWidth - startW),
    width: startW,
    height: startH,
  };
};

const cancelPreview = () => {
  if (previewState.value === "in") {
    previewState.value = "out";
    clearTimeout(previewTimer);
    previewTimer = setTimeout(() => {
      previewState.value = "none";
    }, 300);
  }
};

const onPreviewAnimEnd = (e) => {
  if (e.animationName === "max-preview-out" && previewState.value === "out") {
    clearTimeout(previewTimer);
    previewState.value = "none";
  }
};

/**
 * 标题栏拖拽交互逻辑（含最大化闭环）
 */
const isDragging = ref(false);
let dragMode = "none"; // none | move | preview
let dragFromMaximized = false;
let dragStartClientY = 0;
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
  isDragging.value = true;
  dragMode = "move";
  dragStartClientY = e.clientY;

  if (props.resizable && maximized.value) {
    // 从最大化状态开始拖动：先记录光标相对位置，第一次移动时立即还原
    dragFromMaximized = true;
    // 宽度映射：光标落点在还原后窗口内的横向位置 = X坐标 ÷ 页面宽度 × 还原后窗口宽度
    const restoredW = savedRect.value?.width || winW.value;
    offsetX = (e.clientX / window.innerWidth) * restoredW;
    offsetY = e.clientY;
  } else {
    const el = glassWindow.value;
    const rect = el.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  }

  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", stopDrag);
  e.preventDefault();
};

const handleDrag = (e) => {
  if (!isDragging.value) return;

  if (dragFromMaximized) {
    dragFromMaximized = false;
    applyRestore();
  }

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

  if (props.resizable) {
    const atMaxZone =
      e.clientY <= MAX_DRAG_TOP ||
      (finalTop <= 0 && e.clientY < dragStartClientY);
    if (dragMode === "move" && atMaxZone) {
      dragMode = "preview";
      enterPreview(e);
    } else if (dragMode === "preview" && !atMaxZone) {
      dragMode = "move";
      cancelPreview();
    }
  }
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDrag);

  if (props.resizable) {
    if (dragMode === "preview") {
      previewState.value = "none";
      applyMaximize();
    }
    dragMode = "none";
  }
};

/**
 * 四边四角 resize 逻辑
 */
const resizeHandles = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];
const MIN_W = 260;
const MIN_H = 180;
const resizing = ref("");
let resizeStart = null;

const onResizeStart = (dir, e) => {
  e.preventDefault();
  e.stopPropagation();
  resizing.value = dir;
  resizeStart = {
    x: e.clientX,
    y: e.clientY,
    left: left.value,
    top: top.value,
    width: winW.value,
    height: winH.value,
  };
  document.addEventListener("mousemove", onResizeMove);
  document.addEventListener("mouseup", onResizeEnd);
};

const onResizeMove = (e) => {
  if (!resizing.value || !resizeStart) return;
  const dx = e.clientX - resizeStart.x;
  const dy = e.clientY - resizeStart.y;
  const maxW = window.innerWidth - 10;
  const maxH = window.innerHeight - TASKBAR_H - 10;

  let width = resizeStart.width;
  let height = resizeStart.height;
  let posLeft = resizeStart.left;
  let posTop = resizeStart.top;

  if (resizing.value.includes("e")) width = resizeStart.width + dx;
  if (resizing.value.includes("s")) height = resizeStart.height + dy;
  if (resizing.value.includes("w")) {
    width = resizeStart.width - dx;
    posLeft = resizeStart.left + dx;
  }
  if (resizing.value.includes("n")) {
    height = resizeStart.height - dy;
    posTop = resizeStart.top + dy;
  }

  width = Math.min(maxW, Math.max(MIN_W, width));
  height = Math.min(maxH, Math.max(MIN_H, height));

  if (resizing.value.includes("w")) {
    posLeft = resizeStart.left + (resizeStart.width - width);
  }
  if (resizing.value.includes("n")) {
    posTop = resizeStart.top + (resizeStart.height - height);
  }

  winW.value = width;
  winH.value = height;
  left.value = posLeft;
  top.value = posTop;
  emit("update:width", width);
  emit("update:height", height);
};

const onResizeEnd = () => {
  resizing.value = "";
  resizeStart = null;
  document.removeEventListener("mousemove", onResizeMove);
  document.removeEventListener("mouseup", onResizeEnd);
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
  transition:
    width 0.18s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.18s cubic-bezier(0.22, 1, 0.36, 1),
    left 0.18s cubic-bezier(0.22, 1, 0.36, 1),
    top 0.18s cubic-bezier(0.22, 1, 0.36, 1);
}

.glass-component.no-transition {
  transition: none !important;
}

.glass-component.maximized {
  box-shadow: none;
}

.glass-content-inner {
  position: relative;
  z-index: 8;
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: border-radius 0.18s cubic-bezier(0.22, 1, 0.36, 1);
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
}

.icon:hover {
  opacity: 0.7;
}

/* 四边四角 resize 手柄 */
.resize-layer {
  position: absolute;
  inset: 0;
  z-index: 40;
  pointer-events: none;
}

.resize-handle {
  position: absolute;
  pointer-events: auto;
}

.resize-n { top: -4px; left: 10px; right: 10px; height: 8px; cursor: n-resize; }
.resize-s { bottom: -4px; left: 10px; right: 10px; height: 8px; cursor: s-resize; }
.resize-e { right: -4px; top: 10px; bottom: 10px; width: 8px; cursor: e-resize; }
.resize-w { left: -4px; top: 10px; bottom: 10px; width: 8px; cursor: w-resize; }
.resize-ne { top: -4px; right: -4px; width: 14px; height: 14px; cursor: ne-resize; }
.resize-nw { top: -4px; left: -4px; width: 14px; height: 14px; cursor: nw-resize; }
.resize-se { bottom: -4px; right: -4px; width: 14px; height: 14px; cursor: se-resize; }
.resize-sw { bottom: -4px; left: -4px; width: 14px; height: 14px; cursor: sw-resize; }

/* 最大化预激活预览 */
.max-preview {
  position: fixed;
  border-radius: 14px;
  overflow: hidden;
}

.max-preview.preview-in {
  animation: max-preview-in 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.max-preview.preview-out {
  animation: max-preview-out 0.22s ease-in forwards;
}

.preview-glass {
  width: 100% !important;
  height: 100% !important;
}

@keyframes max-preview-in {
  from {
    top: var(--pv-from-top);
    left: var(--pv-from-left);
    width: var(--pv-from-w);
    height: var(--pv-from-h);
  }
  to {
    top: var(--pv-to-top);
    left: var(--pv-to-left);
    width: var(--pv-to-w);
    height: var(--pv-to-h);
  }
}

@keyframes max-preview-out {
  from {
    top: var(--pv-to-top);
    left: var(--pv-to-left);
    width: var(--pv-to-w);
    height: var(--pv-to-h);
  }
  to {
    top: var(--pv-from-top);
    left: var(--pv-from-left);
    width: var(--pv-from-w);
    height: var(--pv-from-h);
  }
}
</style>