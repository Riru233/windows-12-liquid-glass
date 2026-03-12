<template>
  <liquidWin title="Windows Demo" :width="200" :height="200" :displacementScale="78" @updatePos="updatePos"
    :active="props.active" :winPattern="0" v-model:top="top" v-model:left="left">
  </liquidWin>
</template>

<script setup>
// 基本窗口必需库
import LiquidWin from "/src/components/liquid_win.vue";
const top = defineModel("top")
const left = defineModel("left")
const props = defineProps({
  active: Boolean,
});
const updatePos = (top, left) => {
  emit("updatePos:top", top);
  emit("updatePos:left", left);
}
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
  box-shadow: #fff -0.5px -0.5px 0.5px, #fff 0.5px 0.5px 0.5px;
  background: linear-gradient(to bottom, #fff6, #8886);
}

.std-btn.primary {
  background-color: #24acf2;
}
</style>