<template>
  <div
    class="fadein"
    ref="fadein"
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      flex-direction: column;
      height: 100vh;
    "
  >
    <div style="flex: 1"></div>
    <!-- UEFI FALSE -->
    <div v-if="uefi == false" style="height: 128px">
      <svg class="icon" viewBox="0 0 1024 1024" width="128px" height="128px">
        <defs>
          <linearGradient
            id="sweep-gradient"
            x1="-100%"
            y1="-100%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stop-color="#ccc6" />
            <stop offset="50%" stop-color="#ccc" />
            <stop offset="100%" stop-color="#ccc6" />

            <animate
              attributeName="x1"
              from="-150%"
              to="150%"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              from="0%"
              to="600%"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
        <path
          d="M81.92 289.42336v207.79008h415.29344V81.92H81.92v207.50336z m444.86656 0v207.79008H942.08V81.92H526.78656v207.50336zM81.92 734.57664V942.08h415.29344V526.78656H81.92v207.79008z m444.86656 0V942.08H942.08V526.78656H526.78656v207.79008z"
          fill="url(#sweep-gradient)"
        ></path>
      </svg>
    </div>

    <!-- UEFI TRUE -->
    <div
      v-if="uefi == true"
      style="height: 128px; color: #fff; font-size: 48px"
    >
    <!-- surface -->
      <svg class="icon" viewBox="0 0 1024 1024" width="128px" height="128px">
        <path
          d="M81.92 289.42336v207.79008h415.29344V81.92H81.92v207.50336z m444.86656 0v207.79008H942.08V81.92H526.78656v207.50336zM81.92 734.57664V942.08h415.29344V526.78656H81.92v207.79008z m444.86656 0V942.08H942.08V526.78656H526.78656v207.79008z"
          fill="#fff"
        ></path>
      </svg>
    </div>
    <div style="flex: 1"></div>
    <div class="stat">
      <svg
        class="progressRing"
        height="32"
        width="32"
        style="width: 32"
        viewBox="0 0 16 16"
      >
        <circle cx="8px" cy="8px" r="7px"></circle>
      </svg>
      <p>{{ stat.title }}</p>
    </div>
    <div style="flex: 0.5"></div>

    <!-- UEFI TRUE -->
    <div
      v-if="uefi == true"
      style="
        position: fixed;
        width: 100vw;
        justify-content: center;
        bottom: 0px;
        height: 24px;
        color: #fffa;
        font-size: 18px;
        display: flex;
        gap: 5px;
        margin-bottom: 40px;
      "
    >
      <svg class="icon" viewBox="0 0 1024 1024" width="24px" height="24px">
        <defs>
          <linearGradient
            id="sweep-gradient"
            x1="-100%"
            y1="-100%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stop-color="#ccc6" />
            <stop offset="50%" stop-color="#ccc" />
            <stop offset="100%" stop-color="#ccc6" />

            <animate
              attributeName="x1"
              from="-150%"
              to="150%"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              from="0%"
              to="600%"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
        <path
          d="M81.92 289.42336v207.79008h415.29344V81.92H81.92v207.50336z m444.86656 0v207.79008H942.08V81.92H526.78656v207.50336zM81.92 734.57664V942.08h415.29344V526.78656H81.92v207.79008z m444.86656 0V942.08H942.08V526.78656H526.78656v207.79008z"
          fill="url(#sweep-gradient)"
        ></path>
      </svg>
      Windows 12
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
const fadein = ref(null);
const router = useRouter();
const stat = reactive({
  title: "Starting Windows",
});
// config

const uefi = true;

// function
setTimeout(() => {
  stat.title = "Setup is loading";
}, 3000);
setTimeout(() => {
  fadein.value.style.animation = "fadeout 0.3s ease-in-out forwards";
}, 6450);
setTimeout(() => {
  router.push("/setup/step17");
}, 10450);
</script>
<style>
@keyframes fadein-h1 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
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

body {
  background-color: #000000;
}
.fadein {
  animation: fadein-h1 0.3s ease-in-out;
}
.stat {
  color: #fff;
  font-size: 25px;
  text-align: center;
  width: 100%;
}
.progressRing circle {
  stroke: #fff;
  fill: none;
  stroke-width: 2px;
  stroke-linecap: round;
  transform-origin: 50% 50%;
  transition: all 0.2s ease-in-out 0s;
  animation: 2s linear 0s infinite normal none running spin-infinite;
}
</style>
