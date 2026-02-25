<template>
  <!-- bg -->
  <div
    alt=""
    style="
      margin: 0;
      padding: 0;
      min-height: 100vh;
      background-image: url(&quot;/public/imgbeta12.png&quot;);
      background-attachment: fixed;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    "
  />
  <!-- aboutWindow -->
  <AboutWindow
    class="window1"
    ref="aboutRef"
    @close="close"
    v-if="running?.includes('about')"
  />
  <!-- explorer -->
  <Explorer class="window2" ref="explorerRef" @close="close" />
  <!-- liquidglass -->
  <LiquidGlass
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
  </LiquidGlass>
  <!-- taskbar -->
  <Taskbar />
</template>
<script setup>
import Taskbar from "/src/views/home/components/taskbar/index_mode1.vue";
import AboutWindow from "/src/views/home/components/aboutWindow/index.vue";
import LiquidGlass from "/src/components/liquid_glass.vue";
import Explorer from "/src/views/home/components/explorer/index.vue";
import { ref, reactive } from "vue";

const running = reactive(["about", "explorer"]);

const aboutRef = ref(null);
const explorerRef = ref(null);

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
  }
  setTimeout(() => {
    running.splice(running.indexOf(name), 1);
  }, 300);
};
</script>
<style scoped>
@keyframes anim {
  0% {
    transform: scale(0.5) perspective(1000px) rotate3d(0.5, 0, 0, 45deg);
    opacity: 0;
  }

  100% {
    transform: scale(1) perspective(1000px) rotate3d(0, 0, 0, 0deg);
    opacity: 1;
  }
}

@keyframes anim-reverse {
  0% {
    transform: scale(1) perspective(1000px) rotate3d(0, 0, 0, 0deg);
    opacity: 1;
  }

  100% {
    transform: scale(0.5) perspective(1000px) rotate3d(0.5, 0, 0, 45deg);
    opacity: 0;
  }
}

.window1,
.window2 {
  animation: anim 0.3s cubic-bezier(0, 1, 0, 1);
}
</style>
