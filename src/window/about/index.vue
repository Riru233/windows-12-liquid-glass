<template>
  <liquidWin title="About Windows" :width="540" :height="560" @updatePos="updatePos" :active="props.active"
    :winPattern="0" v-model:top="top" v-model:left="left" @close="close" icon="/public/icons/info.svg">
    <div style="
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
      ">
      <div id="actionbar" style="
          height: 60px;
          text-align: center;
          width: 100%;
          margin: 10px 0;
          color: #fff;
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 8px;
        ">
        <!-- Windows 12 -->
        <svg class="icon" viewBox="0 0 1024 1024" width="60px" height="60px" style="
            filter: drop-shadow(#24acf2aa 0 0 6px) drop-shadow(#24acf2aa 0 0 12px);">
          <defs>
            <linearGradient id="lg-about" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fff" />
              <stop offset="100%" stop-color="#fff3" />
            </linearGradient>
          </defs>
          <path
            d="M81.92 289.42336v207.79008h415.29344V81.92H81.92v207.50336z m444.86656 0v207.79008H942.08V81.92H526.78656v207.50336zM81.92 734.57664V942.08h415.29344V526.78656H81.92v207.79008z m444.86656 0V942.08H942.08V526.78656H526.78656v207.79008z"
            fill="url(#lg-about)"></path>
        </svg>
        <div style="
            display: flex;
            flex-direction: column;
            justify-content: left;
            font-weight: 100;
            filter: drop-shadow(#24acf2aa 0 0 6px) drop-shadow(#24acf2aa 0 0 12px);
          ">
          <div style="font-size: 32px">Windows 12</div>
          <!-- <div style="font-size: 24px">Windows 12</div> -->
        </div>
      </div>
      <WindowView />
      <div style="display: flex; flex-direction: row;">
        <LiquidGlass :width="80" :height="32" :radius="20" :displacementScale="75" :drag="false" :blur="0"
          position="relative" style="background-color: #fff7;margin: 10px;" :layer-style="`color: #333;text-align:center;font-size: 14px;justify-content:center;align-items:center;display:flex;`" :precise="1">
          More Info
        </LiquidGlass>
        <div style="flex-grow: 1"></div>
        <LiquidGlass :width="80" :height="32" :radius="20" :displacementScale="75" :drag="false" :blur="0"
          position="relative" style="background-color: #24acf2aa;margin: 10px;" :layer-style="`text-align:center;font-size: 14px;justify-content:center;align-items:center;display:flex;`" :precise="1">
          OK
        </LiquidGlass>
      </div>
    </div>
  </liquidWin>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import WindowView from "./components/windowView.vue";
import LiquidWin from "/src/components/liquid_win.vue";
import LiquidGlass from "@/components/liquid_glass.vue";
const top = defineModel("top");
const left = defineModel("left");
const props = defineProps({
  active: Boolean,
});
const updatePos = (top, left) => {
  emit("updatePos:top", top);
  emit("updatePos:left", left);
};


const emit = defineEmits(["close"]);
const close = () => emit("close", "about");
</script>

<style scoped>
@import "/src/assets/liquidglass.css";

.std-btn {
  margin: 10px;
  height: 32px;
  font-size: 14px;
  border: none;
  border-radius: 20px;
  padding: 0 10px;
  color: #fffc;
  box-shadow:
    #fff -0.5px -0.5px 0.5px,
    #fff 0.5px 0.5px 0.5px;
  background: linear-gradient(to bottom, #fff6, #8886);
}

.std-btn.primary {
  background-color: #24acf2;
}
</style>
