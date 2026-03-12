<template>
  <SetupFrame>
    <div class="content">
      <h1>Installing Windows 12</h1>
      <div style="font-size: 13px; line-height: 2em">
        Please keep your PC plugged in and don't shut down. This process may take up to 20 minutes.
      </div>
      <br />
      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 10px;
          align-items: center;
        "
      >
        <svg class="progressRing" height="28" width="28" viewBox="0 0 16 16">
          <circle cx="8px" cy="8px" r="7px"></circle>
        </svg>
        <div>{{ stat.info }} - {{ stat.process }}% complete</div>
      </div>
      <br />
      <button class="fillbtnnext" style="width:calc(6em + 40px);text-align: center;" @click="cancel"><u>C</u>ancel</button>
    </div>

    <div class="footer">
      <img src="/public/microsoft.png" alt="" style="height: 16px" />
      <div class="textbtn"><u>S</u>upport</div>
      <div class="textbtn"><u>L</u>egal</div>
      <div style="flex-grow: 1"></div>
      <button class="fillbtn" disabled><u>B</u>ack</button>
      <button class="fillbtn" disabled><u>N</u>ext</button>
    </div>
  </SetupFrame>
</template>

<script setup>
import { useRouter } from "vue-router";
import SetupFrame from "@/components/setup/frame.vue";
import { onMounted, reactive } from "vue";
const router = useRouter();
const stat = reactive({
  process: 0,
  info: "Copying Windows files (1/5)"
});
onMounted(() => {
  setTimeout(() => {
    stat.process = 1;
  }, 1000);
  setTimeout(() => {
    stat.process = 5;
  }, 3000);
  setTimeout(() => {
    stat.process = 8;
  }, 5000);
  setTimeout(() => {
    stat.process = 16;
  }, 7000);
  setTimeout(() => {
    stat.process = 17;
  }, 9000);
  setTimeout(() => {
    stat.process = 19;
  }, 11000);
  setTimeout(() => {
    stat.process = 20;
    stat.info = "Getting files ready for installation (2/5)";
  }, 13000);

  setTimeout(() => {
    stat.process = 22;
  }, 15000);
  setTimeout(() => {
    stat.process = 26;
  }, 17000);
  setTimeout(() => {
    stat.process = 28;
  }, 19000);
  setTimeout(() => {
    stat.process = 29;
  }, 21000);
  setTimeout(() => {
    stat.process = 30;
    stat.info = "Ready to restart";
  }, 23000);
  setTimeout(() => {
    router.push("/setup/step14");
  }, 25000);
});

const cancel = () => {
  router.push("/setup/step1");
};
</script>

<style scoped>
@keyframes spin-infinite {
  0% {
    stroke-dasharray: 0.01px, 43.97px;
    transform: rotate(0deg);
  }
  50% {
    stroke-dasharray: 21.99px, 21.99px;
    transform: rotate(450deg);
  }
  100% {
    stroke-dasharray: 0.01px, 43.97px;
    transform: rotate(1080deg);
  }
}
.progressRing circle {
  stroke: #0451a5;
  fill: none;
  stroke-width: 2px;
  stroke-linecap: round;
  transform-origin: 50% 50%;
  transition: all 0.2s ease-in-out 0s;
  animation: 2s linear 0s infinite normal none running spin-infinite;
}
</style>
