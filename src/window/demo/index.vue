<template>
  <liquidWin
    title="Liquid Glass Demo"
    :width="560"
    :height="520"
    :active="props.active"
    :winPattern="1"
    resizable
    v-model:top="top"
    v-model:left="left"
    @close="close"
    @minimize="minimize"
    @maximize="onMaximize"
    @restore="onRestore"
  >
    <div class="demo-body">
      <div class="demo-desc">
        Buttons below control the child glass loops (enlarge/shrink and corner
        radius). Drag the bottom-right grip of the child to resize it. Drag the
        window edges/corners to resize the window — the child stays constrained
        by the parent's available space.
      </div>

      <div class="stage" ref="stageRef">
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
              title="Drag to resize"
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
          Enlarge / Shrink Loop
        </button>
        <button
          class="std-btn"
          :class="{ on: radiusLoopOn }"
          @click="toggleRadiusLoop"
        >
          Radius + / − Loop
        </button>
      </div>
    </div>
  </liquidWin>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import LiquidWin from "/src/components/liquid_win.vue";
import LiquidGlass from "/src/components/liquid_glass.vue";
import { useGlassSampler } from "/src/composables/useGlassSampler.js";

const top = defineModel("top");
const left = defineModel("left");
const props = defineProps({
  active: Boolean,
});
const emit = defineEmits(["close", "minimize"]);

const IDLE_RATIO = 0.72;
const LOOP_MIN = 0.55;
const LOOP_MAX = 0.95;
const RADIUS_MIN = 8;
const RADIUS_MAX = 64;
const SIZE_PERIOD = 2600;
const RADIUS_PERIOD = 2200;
const MIN_CHILD_W = 140;
const MIN_CHILD_H = 100;

const configLayer2 = reactive({
  radius: 10,
  gamma: 1.2,
  deadzone: 0.4,
  edge: 6,
  isInward: true,
});

const sizeLoopOn = ref(false);
const radiusLoopOn = ref(false);
const winMaximized = ref(false);
const stageRef = ref(null);
const stageSize = ref({ w: 0, h: 0 });
let manualSize = null;
let stageRO = null;

const glass = useGlassSampler(
  { width: 300, height: 220, radius: 24 },
  { tau: 90, driver: onDriverFrame },
);
const { current, stats, setTarget, start } = glass;

function onDriverFrame(elapsed) {
  const a = stageSize.value;
  if (a.w > 0 && a.h > 0) {
    if (sizeLoopOn.value) {
      const t = elapsed / SIZE_PERIOD;
      const scale =
        LOOP_MIN +
        (LOOP_MAX - LOOP_MIN) * (0.5 - 0.5 * Math.cos(2 * Math.PI * t));
      setTarget({ width: a.w * scale, height: a.h * scale });
    } else if (manualSize) {
      setTarget({
        width: Math.min(manualSize.w, a.w),
        height: Math.min(manualSize.h, a.h),
      });
    } else {
      setTarget({ width: a.w * IDLE_RATIO, height: a.h * IDLE_RATIO });
    }
  }
  if (radiusLoopOn.value) {
    const t = elapsed / RADIUS_PERIOD;
    const maxR = Math.min(RADIUS_MAX, (a.w || 300) * 0.35);
    const r =
      RADIUS_MIN +
      (maxR - RADIUS_MIN) * (0.5 - 0.5 * Math.cos(2 * Math.PI * t));
    setTarget({ radius: r });
  }
}

const hudItems = computed(() => [
  { label: "Target FPS", value: `${stats.targetFPS}Hz` },
  { label: "Actual FPS", value: stats.actualFPS ? `${stats.actualFPS}Hz` : "—" },
  { label: "Sample FPS", value: stats.sampledFPS ? `${stats.sampledFPS}Hz` : "—" },
  {
    label: "Parent Space",
    value: `${Math.round(stageSize.value.w)} × ${Math.round(stageSize.value.h)}`,
  },
  {
    label: "Child Size",
    value: `${Math.round(current.width)} × ${Math.round(current.height)}`,
  },
  { label: "Child Radius", value: `${Math.round(current.radius)}px` },
  { label: "Window State", value: winMaximized.value ? "Maximized" : "Normal" },
  { label: "Size Loop", value: sizeLoopOn.value ? "Running" : "Stopped" },
  { label: "Radius Loop", value: radiusLoopOn.value ? "Running" : "Stopped" },
]);

const toggleSizeLoop = () => {
  sizeLoopOn.value = !sizeLoopOn.value;
  if (sizeLoopOn.value) manualSize = null;
};

const toggleRadiusLoop = () => {
  radiusLoopOn.value = !radiusLoopOn.value;
  if (!radiusLoopOn.value) {
    setTarget({ radius: 24 });
  }
};

const onResizeGripDown = (e) => {
  e.preventDefault();
  const startX = e.clientX;
  const startY = e.clientY;
  const startW = current.width;
  const startH = current.height;

  const onMove = (ev) => {
    const a = stageSize.value;
    const maxW = Math.max(MIN_CHILD_W, a.w);
    const maxH = Math.max(MIN_CHILD_H, a.h);
    const w = Math.min(
      maxW,
      Math.max(MIN_CHILD_W, startW + (ev.clientX - startX)),
    );
    const h = Math.min(
      maxH,
      Math.max(MIN_CHILD_H, startH + (ev.clientY - startY)),
    );
    manualSize = { w, h };
    setTarget({ width: w, height: h });
  };
  const onUp = () => {
    manualSize = { w: current.width, h: current.height };
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
  };
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
};

const onMaximize = () => {
  winMaximized.value = true;
};

const onRestore = () => {
  winMaximized.value = false;
};

const close = () => emit("close");
const minimize = () => emit("minimize");

onMounted(() => {
  start();
  const el = stageRef.value;
  if (el && typeof ResizeObserver !== "undefined") {
    stageRO = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r) stageSize.value = { w: r.width, h: r.height };
    });
    stageRO.observe(el);
  }
});

onUnmounted(() => {
  if (stageRO) {
    stageRO.disconnect();
    stageRO = null;
  }
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
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