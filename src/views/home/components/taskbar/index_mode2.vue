<template>
  <div class="taskbar-top">
    <div
      style="
        width: 100%;
        height: 30px;
        position: fixed;
        background: linear-gradient(to bottom, #00000044 0%, #0000 100%);
      "
    >
      <div class="mask-b-from-20-to-55"></div>
      <div class="mask-b-from-50-to-75"></div>
      <div class="mask-b-from-70-to-100"></div>
    </div>
    <div class="unit">
      <Widgets direction="row" />
    </div>
    <div style="flex-grow: 1"></div>
    <div class="unit" style="height: 30px; margin: 0">
      <Status direction="row" />
    </div>
  </div>

  <div class="taskbar-bottom-container">
    <div ref="taskbarRef" class="glass-component taskbar-bottom">
      <div class="glass-v2"></div>
      
      <div class="glass-content">
        <div class="unit-inner">
          <Dock />
        </div>
      </div>

      <liquidFilter
        v-if="autoWidth > 0"
        :width="autoWidth + 10" 
        :height="48"
        :image_base64="WindowSize"
        id="glass-v2-taskbar"
        :displacementScale="78"
        :precise="1"
        :config_layer2="{
          radius: 24,
          gamma: 1,
          deadzone: 0.16,
          edge: 18,
          isInward: true,
        }"
      />
    </div>
  </div>

  <div class="watermark-fixed">
    <p>Windows 12 Insider Preview</p>
    <p>Evaluation only. Build 29835.1020.fs_dev11_fit.260118-0936</p>
    <p>If you meet any issues, press Windows+F and feedback it.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import LiquidFilter from "/src/components/liquid_v2.vue";
import Widgets from "./components/widgets.vue";
import Dock from "./components/dock.vue";
import Status from "./components/status.vue";

const taskbarRef = ref(null);
const autoWidth = ref(0);
let observer = null;

onMounted(() => {
  if (taskbarRef.value) {
    // 使用 ResizeObserver 实时监听内容撑开的宽度
    observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // 更新宽度值，liquidFilter 将响应式重绘
        autoWidth.value = entry.contentRect.width;
      }
    });
    observer.observe(taskbarRef.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
@import "/src/assets/liquidglass.css";
@import "/src/assets/gradientblur.css";

/* 修复容器定位：确保它不限制宽度 */
.taskbar-bottom-container {
  position: fixed;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.taskbar-bottom {
  position: relative;
  width: auto !important; /* 强制自适应内容 */
  padding: 0 5px;
  background: #0000001c;
  min-width: 60px;
  height: 48px;
  border-radius: 24px;
  color: #fff;
  border-top: solid #fff6 1px;
  border-bottom: solid #fff8 1px;
  transition: transform 0.3s ease-out;
  display: inline-flex; /* 关键：由内容撑开 */
  align-items: center;
  pointer-events: auto;
}

.taskbar-bottom:hover {
  transform: scale(1.2) translateY(-5px);
  background: #67a4ffa4;

}

.glass-v2 {
  backdrop-filter: url(#glass-v2-taskbar);
  position: absolute; /* 绝对定位同步父级宽度 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  pointer-events: none;
  z-index: -1;
}



.unit-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.taskbar-top {
  width: 100% !important;
  left: 0;
  height: 30px;
  color: #fff;
  position: fixed;
  display: flex;
  flex-direction: row;
  z-index: 999;
  top: 0;
}

.taskbar-top .unit {
  display: flex;
  flex-direction: row;
  z-index: 2;
  height: 25px;
  margin: 3px 15px;
  justify-content: center;
  align-items: center;
}

.watermark-fixed {
  position: fixed;
  color: #fff;
  font-size: 12px;
  bottom: 10px;
  right: 10px;
  text-align: right;
  pointer-events: none;
}

p { margin: 0; }
@import "/src/assets/liquidglass.css";
@import "/src/assets/gradientblur.css";

/* 1. 外层容器负责居中定位，不限制宽度 */
.taskbar-bottom-container {
  position: fixed;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  justify-content: center;
  pointer-events: none; /* 防止容器遮挡点击 */
}

/* 2. 核心自适应任务栏 */
.taskbar-bottom {
  position: relative;
  background-color: #5197ff41;
  width: auto !important; /* 强制覆盖所有 width: 100% */
  min-width: 100px;
  height: 48px;
  border-radius: 24px;
  color: #fff;
  border-top: solid #fff6 1px;
  border-bottom: solid #fff8 1px;
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  display: inline-flex; /* 关键：根据内容自动收缩 */
  align-items: center;
  pointer-events: auto; /* 恢复点击 */
  overflow: visible;
}


/* 3. 背景毛玻璃：跟随父级宽度 */
.glass-v2 {
  backdrop-filter: url(#glass-v2-taskbar);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  z-index: -1;
}

/* 4. 内容层：消除之前的 flex-grow */
.glass-content {
  display: flex;
  align-items: center;
  padding: 0 16px; /* 侧边留白 */
  height: 100%;
  border-radius: 24px;
  box-shadow: none;
  white-space: nowrap;
}

.unit-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
}

.taskbar-top {
  width: 100% !important;
  left: 0;
  height: 30px;
  color: #fff;
  position: fixed;
  display: flex;
  flex-direction: row;
  z-index: 999;
  top: 0;
}


.taskbar-top .unit {
  display: flex;
  align-items: center;
  margin: 0 12px;
  z-index: 2;
}

* {
  
  color: #fff;
}

p { margin: 0; }
</style>