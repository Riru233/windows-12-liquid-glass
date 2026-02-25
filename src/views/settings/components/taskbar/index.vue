<template>
  <!-- 任务栏——药丸样式 -->
  <div class="glass-component taskbar">
    <div class="glass-v2"></div>
    <div class="glass-content">
      <!-- 左侧 -->
      <div class="unit">
        <Widgets />
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
        <Status />
      </div>
    </div>
    <liquidFilter
      :width="800"
      :height="20"
      id="glass-v2-taskbar"
      displacementScale="78"
      :precise="1"
      :config_layer2="{
        radius: 28,
        gamma: 1.2,
        deadzone: 0.6,
        edge: 0.1,
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
    <p>Evaluation only. Build 29835.1020.fs_dev11_fit.260118-0936</p>
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

.taskbar {
  width: 800px !important;
  left: calc(50% - 400px);
  border-radius: 24px;
  height: 48px;
  --border-radius: 0px;
  color: #fff;
  border-top: solid rgba(255, 255, 255, 0.397) 1px;
  border-bottom: solid rgba(255, 255, 255, 0.397) 1px;
  outline: solid rgba(0, 25, 138, 0.308) 1px;
  position: fixed;
  width: 100%;
  padding: 0 0;
  z-index: 999;
  bottom: 5px;
}

.glass-content {
  border-radius: 24px;
  backdrop-filter: blur(2px);
  background: linear-gradient(to top, #0000003f 0%, #0000 100%);
  box-shadow: none;
}

.glass-v2 {
  backdrop-filter: url(#glass-v2-taskbar);
  width: 800px;
  height: 46px;
  position: fixed;
  border-radius: 25px;
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
</style>
