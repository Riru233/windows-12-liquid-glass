<template>
  <liquidWin title=" " :width="300" :height="200" @updatePos="updatePos"
    :active="props.active" :winPattern="0" v-model:top="top" v-model:left="left">
    <div style="margin:20px;font-size: 60px;color: #333;">
      Aa
    </div>
    <div style="margin:0 20px;font-size: 24px;color: #333;">
      材质显示项
    </div>
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
