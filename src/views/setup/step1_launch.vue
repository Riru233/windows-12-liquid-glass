<template>
  <div class="layer"></div>
  <SetupFrame :delay="1000">
    <div class="content">
      <h1>Install Windows 12</h1>
      <div style="font-size: 13px">
        Setup will guide you through the installation process.
      </div>
    </div>
    <div class="footer">
      <img src="/public/microsoft.png" alt="" style="height: 16px" />
      <div class="textbtn"><u>S</u>upport</div>
      <div class="textbtn"><u>L</u>egal</div>
      <div style="flex-grow: 1"></div>
      <button class="fillbtn" disabled><u>B</u>ack</button>
      <button class="fillbtnnext" @click="router.push('/setup/step2')">
        <u>N</u>ext
      </button>
    </div>
  </SetupFrame>
</template>

<script setup>
import { useRouter } from "vue-router";
import SetupFrame from "@/components/setup/frame.vue";
const router = useRouter();
setTimeout(() => {
  router.push("/setup/step1");
}, 1500);
</script>
<style>
@keyframes fadein-all {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeout-all {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    pointer-events: none;
  }
}
*::not(.layer) {
  animation: fadein-all 0.5s ease-in-out;
}
.layer {
  z-index: 10009989;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0);
  animation: fadeout-all 0.5s ease-in-out forwards;
}

</style>
