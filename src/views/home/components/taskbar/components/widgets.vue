<template>
  <!-- 小部件图标 -->
  <div style="padding:0; margin: 0 0 5px 0;width:180px;" class="panel-sidebar">
    <!-- <svg
      t="1760579924821"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4671"
      :width="direction === 'row'?'24px':'36px'"
      :height="direction === 'row'?'24px':'36px'"
      :style="direction === 'row' ? 'margin:-8px 0':'margin: -15px 0'"
    >
      <path
        d="M512 972.8c-254.5152 0-460.8-206.2848-460.8-460.8s206.2848-460.8 460.8-460.8 460.8 206.2848 460.8 460.8-206.2848 460.8-460.8 460.8z"
        fill="#FFFFAF44"
        p-id="4672"
      ></path>
      <path
        d="M512 819.2c-169.6768 0-307.2-137.5232-307.2-307.2s137.5232-307.2 307.2-307.2 307.2 137.5232 307.2 307.2-137.5232 307.2-307.2 307.2z"
        fill="#FFCF0066"
        p-id="4673"
      ></path>
    </svg> -->
    <LiquidFilter id="panel-sidebar" :width="180" :height="32" displacementScale="42" :precise="1" :config_layer2="{
      radius: 12,
      gamma: 1,
      deadzone: 0.05,
      edge: 12,
      isInward: true,
    }" />
    <div style="display: flex;flex-direction: row;">
      <img src="/icons/sidebar_100.ico" alt="" :width="direction === 'row' ? '24px' : '28px'"
        :height="direction === 'row' ? '24px' : '28px'"
        :style="direction === 'row' ? 'margin:-8px 0' : 'margin: 0px 0'">
      <div style="display: flex;flex-direction: column;">

        <div :style="direction === 'row' ? { fontSize: '12px' } : { fontSize: '11px' }" style="font-weight: 600;">
          “小工具”回归
        </div>
        <div :style="direction === 'row' ? 'margin-left: 10px;font-size: 12px;' : 'color: #fff;font-size: 11px;'"
          style="color: #ccc">
          将喜欢的小工具固定在桌面
        </div>
      </div>
    </div>
  </div>
  <!-- 小部件内容 -->
  <!-- <div style="display: flex" :style="{ flexDirection: direction, textShadow: ' 0 0 2px #000,0 0 4px #000' }" class="panel-sidebar">
    <LiquidFilter id="panel-sidebar" :width="78" :height="32" displacementScale="42" :precise="1" :config_layer2="{
      radius: 12,
      gamma: 1,
      deadzone: 0.05,
      edge: 12,
      isInward: true,
    }" />
  </div> -->
</template>
<script setup>
import LiquidFilter from "@/components/liquid_v2.vue";
const prop = defineProps({
  direction: {
    type: String,
    default: "row",
  },
});
</script>
<style>
@keyframes panel-hover-sidebar {
  0% {
    transform: scaleX(1);
  }

  10% {
    transform: scaleX(1.2);
  }

  40% {
    transform: scaleX(1) scaleY(1.2);
  }

  100% {
    transform: scaleX(1) scaleY(1);
  }
}

/* 全局 */
.panel-sidebar {
  text-shadow: #000 0 0 2px, #000 0 0 4px;
  transition: all 0.3s ease-out;
  height: 32px;
  border-radius: 12px;
}
.panel-sidebar:hover {
  animation: panel-hover-sidebar 0.3s ease-out forwards;
  backdrop-filter: url(#panel-sidebar);
  background-color: #0002;
}
</style>
