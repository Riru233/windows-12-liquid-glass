<template>
  <!-- 分体式任务栏（根据泄露图） -->
  <!-- 任务栏——顶部 -->
  <div class="taskbar-top">
    <!-- 渐变模糊 -->
    <div
      style="
        width: 100%;
        height: 30px;
        position: fixed;
        background: linear-gradient(to bottom, #00000081 0%, #0000 100%);
      "
    >
      <div class="mask-d-from-20-to-55"></div>
      <div class="mask-d-from-50-to-75"></div>
      <div class="mask-d-from-70-to-100"></div>
    </div>
    <!-- 左侧 -->
    <div class="unit">
      <Widgets direction="row" />
    </div>
    <div style="flex-grow: 1"></div>
    <!-- 右侧 -->
    <div class="unit" style="height: 30px; margin: 0">
      <Status direction="row" />
    </div>
  </div>
  <!-- 任务栏——底部 -->
  <div class="glass-component taskbar-bottom">
    <div class="glass-v2"></div>
    <div class="glass-content">
      <div style="flex-grow: 1"></div>
      <!-- 居中 -->
      <div
        class="unit"
        style="
          gap: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          margin: 0 20px;
        "
      >
        <Dock />
      </div>
      <div style="flex-grow: 1"></div>
    </div>
    <liquidFilter
      :width="800"
      :height="50"
      :image_base64="WindowSize"
      id="glass-v2-taskbar"
      :displacementScale="40"
      :precise="1"
      :config_layer2="{
        radius: 24,
        gamma: 6,
        deadzone: 0.16,
        edge: 18,
        isInward: true,
      }"
    />
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
      bottom: 60px;
      right: 0;
      text-align: right;
    "
  >
    <!-- <p>Do not take screen shots of this build.</p> -->
    <p>Windows 12 Insider Preview</p>
    <p>Evaluation only. Build 26512.3531.fs_dev11_fit.260118-0936</p>
    <p>If you meet any issues, press Windows+F and feedback it.</p>
  </div>
</template>
<script setup>
import LiquidFilter from "/src/components/liquid_v2.vue";
import Widgets from "./components/widgets.vue";
import Dock from "./components/dock.vue";
import Status from "./components/status.vue";
</script>
<style scoped>
@import "/src/assets/liquidglass.css";
@import "/src/assets/gradientblur.css";

.taskbar-bottom {
  width: 800px !important;
  left: calc(50% - 400px);
  border-radius: 24px;
  height: 48px;
  --border-radius: 0px;
  color: #fff;
  border-top: solid #fff6 1px;
  border-bottom: solid #fff8 1px;
  position: fixed;
  width: 100%;
  padding: 0 0;
  z-index: 999;
  bottom: 5px;
  transition: all 0.3s ease-out;
}

.taskbar-bottom:hover {
  transform: scale(1.23) translateY(-5px);
}

.taskbar-top {
  width: 100% !important;
  left: 0;
  height: 30px;
  color: #fff;
  position: fixed;
  display: flex;
  flex-direction: row;
  padding: 0 0;
  z-index: 999;
  top: 0;
}

.glass-content {
  border-radius: 24px;
  background: #0002;
  box-shadow: none;
}

.glass-v2 {
  backdrop-filter: url(#glass-v2-taskbar);
  width: 800px;
  height: 50px;
  position: fixed;
  border-radius: 24px;
}

.taskbar-top .unit {
  display: flex;
  flex-direction: row;
  z-index: 2;
  height: 25px;
  margin: 3px 0;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}

.taskbar-bottom .unit {
  display: flex;
  flex-direction: row;
  z-index: 2;
  height: 44px;
  margin: 3px 0;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}

p {
  margin: 0;
}
</style>
