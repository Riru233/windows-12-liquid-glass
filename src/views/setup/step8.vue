<template>
  <SetupFrame>
    <div class="content">
      <h1>{{ stat.title }}</h1>
      <br>
      <div style="display: flex;flex-direction: row;gap: 10px;align-items: center;">
        <svg class="progressRing" height="28" width="28" viewBox="0 0 16 16">
          <circle cx="8px" cy="8px" r="7px"></circle>
        </svg>
        <div>Please wait</div>
      </div>
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
  title: "We're getting a few things ready"
});
onMounted(() => {
  setTimeout(() => {
    stat.title = "Checking your PC"
  }, 300);
  setTimeout(() => {
    router.push("/setup/step9");
  }, 2300);
});
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
