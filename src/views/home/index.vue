<template>
  <!-- bg -->
  <div alt="" style="
      margin: 0;
      padding: 0;
      min-height: 100vh;
      background-image: url(&quot;/public/imgbeta12.png&quot;);
      background-attachment: fixed;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    " />
  <Explorer ref="explorerRef" @close="close" @mousedown="activate('explorer')" :style="{ zIndex: zIndexes.explorer }"
    :active="activeWindow === 'explorer'" v-model:top="pos.explorer.top" v-model:left="pos.explorer.left" />

  <Settings ref="settingsRef" @close="close" @mousedown="activate('settings')" :style="{ zIndex: zIndexes.settings }"
    :active="activeWindow === 'settings'" v-model:top="pos.settings.top" v-model:left="pos.settings.left" />

  <AboutWindow v-if="running.includes('about')" ref="aboutRef" @close="close" @mousedown="activate('about')"
    :style="{ zIndex: zIndexes.about }" :active="activeWindow === 'about'" v-model:top="pos.about.top" v-model:left="pos.about.left" />
  <!-- liquidglass -->
  <!-- <LiquidGlass
    :width="200"
    :height="200"
    :initialTop="322"
    :initialLeft="100"
    :displacementScale="200"
    position="fixed"
    :bounce="1"
    :precise="1"
    :radius="99"
    layerStyle="background: #fff2"
    :blur="0"
    :drag="true"
    :zoom="2"
    :config_layer2="{
      gamma: 1,
      deadzone: 0,
      edge: 10,
      isInward: true,
    }"
  >
  </LiquidGlass> -->
  <!-- taskbar -->
  <Taskbar />
</template>
<script setup>
import Taskbar from "/src/views/home/components/taskbar/index_mode1.vue";
import AboutWindow from "/src/views/home/components/aboutWindow/index.vue";
import LiquidGlass from "/src/components/liquid_glass.vue";
import Explorer from "/src/views/home/components/explorer/index.vue";
import Settings from "/src/views/home/components/settings/index.vue";
import { ref, reactive } from "vue";

const running = reactive(["about", "explorer", "settings"]);
const pos = reactive({
  about: { top: 120, left: 120 },
  explorer: { top: 240, left: 240 },
  settings: { top: 180, left: 180 },
});

// 记录每个窗口的 z-index
const zIndexes = reactive({
  about: 1,
  explorer: 2,
  settings: 3
});

// 记录当前哪个窗口是 active 状态
const activeWindow = ref("explorer");

const aboutRef = ref(null);
const explorerRef = ref(null);
const settingsRef = ref(null);

// 激活窗口的函数
const activate = (name) => {
  activeWindow.value = name;
  // 获取当前所有窗口中最大的 z-index，并给当前点击的窗口 +1
  const maxZ = Math.max(...Object.values(zIndexes));
  zIndexes[name] = maxZ + 1;
};

const close = (name) => {
  switch (running.indexOf(name)) {
    case "about":
      aboutRef.value.style.animation =
        "anim-reverse 0.3s cubic-bezier(0, 1, 0, 1) forwards !important";
      break;
    case "explorer":
      explorerRef.value.style.animationFillMode =
        "anim-reverse 0.3s cubic-bezier(0, 1, 0, 1)";
      explorerRef.value.close();
      break;
    case "settings":
      settingsRef.value.style.animationFillMode =
        "anim-reverse 0.3s cubic-bezier(0, 1, 0, 1)";
      settingsRef.value.close();
      break;
  }
  setTimeout(() => {
    running.splice(running.indexOf(name), 1);
  }, 300);
};
</script>
