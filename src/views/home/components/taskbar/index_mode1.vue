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
      <div class="unit" style="
          gap: 6px;
          display: flex;
          align-items: center;
          flex-direction: row;
        ">
        <Dock />
      </div>
      <div style="flex: 1.23"></div>
      <!-- 分隔 -->
      <div style="flex: 1"></div>
      <!-- 右侧2 -->
      <div class="unit">
        <Widgets direction="column" />
      </div>
      <!-- 分隔 -->
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
  <div style="
      position: fixed;
      color: #fff;
      font-size: 12px;
      bottom: 50px;
      right: 0;
      text-align: right;
      text-shadow: #000 0 0 2px,#000 0 0 4px;
    ">
    <!-- <p>Do not take screen shots of this build.</p> -->
    <p>Windows 12 Developer Preview</p>
    <p>Build 29900.2620.fs_dev11_fit.260322-2312</p>
  </div>
  <!-- 右下角控制中心 -->
  <control :class="stat.panel" />
  <!-- 右下角通知横幅 -->
  <notification title="Wechat" detailLine1="Windows Developer Team"
    detailLine2="Thanks for your support to choose Windows 12." :class="stat.notification" />
</template>
<script setup>
import Widgets from "./components/widgets.vue";
import Dock from "./components/dock.vue";
import Status from "./components/status.vue";
import control from "./components/control.vue";
import notification from "./components/notification.vue";
import { reactive, onMounted } from "vue";
const stat = reactive({
  panel: 'panel-init',
  notification: "notification-init",
});

const togglePanel = () => {
  if (stat.panel === 'panel-init' || stat.panel === 'panel-close') {
    stat.panel = 'panel-open';
  } else {
    stat.panel = 'panel-close';
  }
};

onMounted(() => {
  // 模拟通知开启
  setTimeout(() => {
    stat.notification = "notification-open";
  }, 1000);
  // 模拟通知关闭
  setTimeout(() => {
    stat.notification = "notification-close";
  }, 6000);
});
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
  /* background: linear-gradient(to top, #00000081 0%, #0000 100%); */
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
  user-select: none;
}

p {
  margin: 0;
}

@keyframes panel-open {
  0% {
    bottom: -200px;
    transform: scaleY(1) translateY(300px);
  }

  40% {
    transform: scaleX(0.9) scaleY(1.3) translateY(-120px);
    bottom: 30px;
  }
  75% {
    transform: scaleX(1.05) scaleY(1);
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
    transform: scaleY(3) translateY(300px);
    bottom: -200px;
  }
}

.panel-open {
  animation: panel-open 0.5s ease-out forwards;
}

.panel-init {
  bottom: -200px;
  transform: scaleY(3) translateY(300px);
}

.panel-close {
  animation: panel-close 0.3s ease-out forwards;
  pointer-events: none;
}

@keyframes nopen {
  0% {
    transform: translateX(120%);
  }

  50% {
    transform: translateX(-10%) scaleY(1.2) scaleX(0.8);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes nclose {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(120%);
  }
}

.notification-open {
  animation: nopen 0.5s ease forwards;
}

.notification-init {
  transform: translateX(120%);
}

.notification-close {
  animation: nclose 0.3s ease forwards;
  pointer-events: none;
}
</style>
