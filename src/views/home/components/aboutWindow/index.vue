<template>
  <liquidWin
    title="About Windows"
    :width="400"
    :height="400"
    :displacementScale="100"
    :active="false"
    :winPattern="0"
    :initialTop="500"
    :initialLeft="1480"
    @close="close"
  >
    <div style="display: flex; flex-direction: column; flex: 1; justify-content: center;">
      <div id="actionbar" style="height: 40px; text-align: center; width: 100%; margin: 10px 0; color: #fff; align-items: center; font-size: 32px; display: flex; flex-direction: row; justify-content: center; gap: 8px;">
        <svg class="icon" viewBox="0 0 1024 1024" width="48px" height="48px">
          <defs>
            <linearGradient id="lg-about" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fffc" /><stop offset="100%" stop-color="#fff6" />
            </linearGradient>
          </defs>
          <path d="M81.92 289.42336v207.79008h415.29344V81.92H81.92v207.50336z m444.86656 0v207.79008H942.08V81.92H526.78656v207.50336zM81.92 734.57664V942.08h415.29344V526.78656H81.92v207.79008z m444.86656 0V942.08H942.08V526.78656H526.78656v207.79008z" fill="url(#lg-about)"></path>
        </svg>
        <div>Windows 12</div>
      </div>
      <WindowView />
      <div style="display: flex; flex-direction: row">
        <button style="margin: 10px; height: 32px; font-size: 14px; border: none; border-radius: 20px; border-bottom: #ccca 1px solid; background: linear-gradient(to bottom, #fff6, #8886); padding: 0 10px; color: #fffc; box-shadow: #fff -0.5px -0.5px 0.5px, #fff 0.5px 0.5px 0.5px;">More Information</button>
        <div style="flex-grow: 1"></div>
        <button style="margin: 10px; height: 32px; font-size: 14px; border: none; border-radius: 20px; border-bottom: #fffa 1px solid; background-color: #24acf2; color: #fffc; padding: 0 10px; box-shadow: #fff -0.5px -0.5px 0.5px, #fff 0.5px 0.5px 0.5px;">Confirm</button>
      </div>
    </div>
  </liquidWin>
</template>

<script setup>
import LiquidWin from "/src/components/liquid_win.vue";
import WindowView from "./components/windowView.vue";

const emit = defineEmits(["close"]);
const close = () => emit("close", "about");
</script>

<style scoped>
@import "/src/assets/liquidglass.css";
.std-btn {
  margin: 10px; height: 32px; font-size: 14px; border: none; border-radius: 20px; 
  padding: 0 10px; color: #fffc; box-shadow: #fff -0.5px -0.5px 0.5px, #fff 0.5px 0.5px 0.5px;
  background: linear-gradient(to bottom, #fff6, #8886);
}
.std-btn.primary {
  background-color: #24acf2;
}
</style>