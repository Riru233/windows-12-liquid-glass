<template>
  <liquidWin
    title="Liquid Glass Demo"
    :active="props.active"
    :winPattern="0"
    v-model:top="top"
    v-model:left="left"
    @close="close"
    @minimize="minimize"
  >
    <div class="demo-body">
      <div class="demo-desc">
        下方按钮控制玻璃子容器的 放大/缩小 与 弧度增减 循环；拖拽子容器右下角抓手可直接调整大小。
      </div>

      <div class="stage">
        <liquidGlass
          :width="current.width"
          :height="current.height"
          :radius="current.radius"
          :displacementScale="90"
          :blur="1"
          :precise="0.1"
          :drag="false"
          :config_layer2="configLayer2"
          position="relative"
          class="demo-glass"
        >
          <div class="glass-inner">
            <div class="glass-text">Aa</div>
            <div class="glass-sub">Liquid Glass</div>
            <div
              class="resize-grip"
              title="拖拽调整大小"
              @mousedown.stop="onResizeGripDown"
            ></div>
          </div>
        </liquidGlass>
      </div>

      <div class="hud">
        <div class="hud-row" v-for="item in hudItems" :key="item.label">
          <span class="hud-label">{{ item.label }}</span>
          <span class="hud-value">{{ item.value }}</span>
        </div>
      </div>

      <div class="controls">
        <button
          class="std-btn"
          :class="{ on: sizeLoopOn }"
          @click="toggleSizeLoop"
        >
          放大 / 缩小 循环
        </button>
        <button
          class="std-btn"
          :class="{ on: radiusLoopOn }"
          @click="toggleRadiusLoop"
        >
          弧度 + / − 循环
        </button>
      </div>
    </div>
  </liquidWin>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import LiquidWin from "/src/components/liquid_win.vue";
import LiquidGlass from "/src/components/liquid_glass.vue";
import { useGlassSampler } from "/src/composables/useGlassSampler.js";

const top = defineModel("top");
const left = defineModel("left");
const props = defineProps({
  active: Boolean,
});
const emit = defineEmits(["close", "minimize"]);

const SIZE_BASE = { width: 300, height: 220 };
const SIZE_MAX = 1.7;
const RADIUS_BASE = 24;
const RADIUS_MIN = 8;
const RADIUS_MAX = 64;
const SIZE_PERIOD = 2600;
const RADIUS_PERIOD = 2200;
const MIN_W = 140;
const MIN_H = 100;
const MAX_W = 900;
const MAX_H = 650;

const configLayer2 = reactive({
  radius: 10,
  gamma: 1.2,
  deadzone: 0.4,
  edge: 6,
  isInward: true,
});

const sizeLoopOn = ref(false);
const radiusLoopOn = ref(false);

const glass = useGlassSampler(
  {
    width: SIZE_BASE.width,
    height: SIZE_BASE.height,
    radius: RADIUS_BASE,
  },
  { tau: 90, driver: onDriverFrame },
);
const { current, stats, setTarget, start } = glass;

function onDriverFrame(elapsed) {
  if (sizeLoopOn.value) {
    const t = elapsed / SIZE_PERIOD;
    const scale = 1 + (SIZE_MAX - 1) * (0.5 - 0.5 * Math.cos(2 * Math.PI * t));
    glass.setTarget({
      width: SIZE_BASE.width * scale,
      height: SIZE_BASE.height * scale,
    });
  }
  if (radiusLoopOn.value) {
    const t = elapsed / RADIUS_PERIOD;
    const r =
      RADIUS_MIN +
      (RADIUS_MAX - RADIUS_MIN) * (0.5 - 0.5 * Math.cos(2 * Math.PI * t));
    glass.setTarget({ radius: r });
  }
}

const hudItems = computed(() => [
  { label: "目标帧率", value: `${stats.targetFPS}Hz` },
  { label: "实际帧率", value: stats.actualFPS ? `${stats.actualFPS}Hz` : "—" },
  { label: "采样帧率", value: stats.sampledFPS ? `${stats.sampledFPS}Hz` : "—" },
  {
    label: "子容器尺寸",
    value: `${Math.round(current.width)} × ${Math.round(current.height)}`,
  },
  { label: "子容器圆角", value: `${Math.round(current.radius)}px` },
  { label: "尺寸循环", value: sizeLoopOn.value ? "运行中" : "停止" },
  { label: "弧度循环", value: radiusLoopOn.value ? "运行中" : "停止" },
]);

const toggleSizeLoop = () => {
  sizeLoopOn.value = !sizeLoopOn.value;
  if (!sizeLoopOn.value) {
    glass.setTarget({ width: SIZE_BASE.width, height: SIZE_BASE.height });
  }
};

const toggleRadiusLoop = () => {
  radiusLoopOn.value = !radiusLoopOn.value;
  if (!radiusLoopOn.value) {
    glass.setTarget({ radius: RADIUS_BASE });
  }
};

const onResizeGripDown = (e) => {
  e.preventDefault();
  const startX = e.clientX;
  const startY = e.clientY;
  const startW = current.width;
  const startH = current.height;

  const onMove = (ev) => {
    const nextW = Math.min(
      MAX_W,
      Math.max(MIN_W, startW + (ev.clientX - startX)),
    );
    const nextH = Math.min(
      MAX_H,
      Math.max(MIN_H, startH + (ev.clientY - startY)),
    );
    glass.setTarget({ width: nextW, height: nextH });
  };
  const onUp = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
  };
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
};

const close = () => emit("close");
const minimize = () => emit("minimize");

onMounted(() => {
  start();
});
</script>

<style scoped>
.demo-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  overflow: hidden;
  color: #333;
  user-select: none;
  min-width: 320px;
}

.demo-desc {
  font-size: 12px;
  line-height: 1.6;
  color: #555;
  background: #ffffff55;
  border: 1px solid #ffffffaa;
  border-radius: 10px;
  padding: 8px 12px;
  backdrop-filter: blur(4px);
}

.stage {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 240px;
}

.glass-inner {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;
  overflow: hidden;
}

.glass-text {
  font-size: 56px;
  font-weight: 600;
  line-height: 1;
}

.glass-sub {
  font-size: 16px;
  margin-top: 6px;
  opacity: 0.85;
}

.hud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hud-row {
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 12px;
  background: #ffffff66;
  border: 1px solid #ffffffaa;
  backdrop-filter: blur(6px);
}

.hud-label {
  color: #666;
}

.hud-value {
  font-weight: 600;
  color: #222;
}

.controls {
  display: flex;
  gap: 10px;
}

.std-btn {
  height: 34px;
  font-size: 13px;
  border: none;
  border-radius: 18px;
  padding: 0 16px;
  color: #333;
  cursor: pointer;
  background: linear-gradient(to bottom, #ffffffaa, #ffffff55);
  border: 1px solid #ffffffcc;
  box-shadow: 0 2px 8px #00000022;
}

.std-btn:hover {
  background: linear-gradient(to bottom, #ffffffcc, #ffffff88);
}

.std-btn.on {
  color: #fff;
  background: linear-gradient(to bottom, #24acf2dd, #1b7fc4dd);
}

.resize-grip {
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
  border-radius: 4px;
  opacity: 0.7;
  background: repeating-linear-gradient(
    135deg,
    #3339 0 2px,
    transparent 2px 5px
  );
}

.resize-grip:hover {
  opacity: 1;
}
</style>
