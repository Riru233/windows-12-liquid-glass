<template>
  <SetupFrame>
    <div class="content">
      <h1>Install Windows 12</h1>
      <div style="font-size: 13px;">Setup will guide you through the installation process.</div>
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
</script>