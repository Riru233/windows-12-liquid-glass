<template>
  <!-- 任务栏——沉浸样式 -->
  <div class="taskbar">
    <div style="width: 100%; height: 48px; position: fixed">
      <div class="mask-u-from-70-to-100"></div>
      <div class="mask-u-from-50-to-75"></div>
      <div class="mask-u-from-20-to-55"></div>
    </div>
    <div class="glass-content">
      <!-- 左侧 -->
      <div class="unit">
        <Widgets direction="column" />
      </div>
      <!-- 分隔 -->
      <div style="flex: 1.23"></div>
      <!-- 居中 -->
      <div
        class="unit"
        style="
          gap: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
        "
      >
        <Dock />
      </div>
      <!-- 分隔 -->
      <div style="flex: 1"></div>
      <!-- 右侧 -->
      <div class="unit" style="height: 42px; margin: 0">
        <Status direction="column" @toggle-panel="togglePanel" />
      </div>
    </div>
  </div>
  <!-- Windows保密水印 -->
  <!-- <div style="position: fixed;color: #fff;font-size: 12px;bottom: 100px;right:0;width: 30em;z-index: 0;">
        <b style="text-align: center;width:100%;">Windows Confidential</b>
        <p>Unauthorized use or disclosure in any manner may result in disciplinary action up to and including termination of employment (in the case of employees), termination of an assignment or contract (int the case of contigent staff), and potential civil and criminal liability.</p>
       </div> -->
  <!-- 右下角水印 -->
  <div
    style="
      position: fixed;
      color: #fff;
      font-size: 12px;
      bottom: 50px;
      right: 0;
      text-align: right;
    "
  >
    <!-- <p>Do not take screen shots of this build.</p> -->
    <p>Windows 12 Insider Preview</p>
    <p>Evaluation only. Build 29835.1020.fs_dev11_fit.260118-0936</p>
  </div>
  <!-- 右下角控制中心 -->
  <control :class="stat.panel === 1 ? 'panel-open' : 'panel-close'" />
</template>
<script setup>
import Widgets from "./components/widgets.vue";
import Dock from "./components/dock.vue";
import Status from "./components/status.vue";
import control from "./components/control.vue";
import { reactive } from "vue";
const stat = reactive({
  panel: 0,
});

const togglePanel = () => {
  if (stat.panel === 0) {
    stat.panel = 1;
  } else {
    stat.panel = 0;
  }
};
</script>
<style scoped>
@import "/src/assets/liquidglass.css";
@import "/src/assets/gradientblur.css";

.taskbar {
  height: 48px;
  --border-radius: 0px;
  color: #fff;
  position: fixed;
  bottom: -2px;
  width: 100%;
  padding: 0 0;
  z-index: 999;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
}

.glass-content {
  background: linear-gradient(to top, #00000081 0%, #0000 100%);
  box-shadow: none;
}

.unit {
  display: flex;
  flex-direction: row;
  z-index: 2;
  height: 40px;
  margin: 3px 0;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}

p {
  margin: 0;
}
@keyframes panel-open {
  0% {
    bottom: -400px;
    transform: scaleX(1) scaleY(1);
  }
  50% {
    transform: scaleX(0.8) scaleY(1.3) translateY(-40px);
    bottom: 30px;
  }
  100% {
    transform: scaleX(1) scaleY(1) translateY(0px);
    bottom: 30px;
  }
}
@keyframes panel-close {
  0% {
    transform: scaleX(1) scaleY(1) translateY(0px);
    bottom: 30px;
  }
  100% {
    transform: scaleX(0.4) scaleY(4) translateY(300px);
    bottom: -200px;
  }
}
.panel-open {
  animation: panel-open 0.3s ease-out forwards;
}
.panel-close {
  animation: panel-close 0.3s ease-out forwards;
  pointer-events: none;
}
</style>
