<template>
  <!-- bg -->
  <div
    alt=""
    style="
      margin: 0;
      padding: 0;
      min-height: 100vh;
      background-image: url(&quot;./imgbeta12.png&quot;);
      background-attachment: fixed;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    "
  />
  <LiquidSettings class="window2" ref="explorerRef" @close="close" />
  <!-- taskbar -->
  <Taskbar />
</template>
<script setup>
import Taskbar from "/src/views/home/components/taskbar/index_mode1.vue";
import LiquidSettings from "/src/views/settings/components/liquid_settings/index.vue";
import { ref, reactive } from "vue";

const running = reactive(["about", "explorer"]);

const aboutRef = ref(null);
const explorerRef = ref(null);

const close = (name) => {
  switch (running.indexOf(name)){
    case "about":
      aboutRef.value.style.animation = "anim-reverse 0.3s cubic-bezier(0, 1, 0, 1) forwards !important";
      break;
    case "explorer":
      explorerRef.value.style.animationFillMode = "anim-reverse 0.3s cubic-bezier(0, 1, 0, 1)";
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
