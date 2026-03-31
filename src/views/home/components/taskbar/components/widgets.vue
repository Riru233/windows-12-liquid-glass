<template>
  <!-- 小部件图标 -->
  <div style="padding: 3px; margin: 0 0 0 10px">
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
    <img src="/icons/sidebar_100.ico" alt="" 
      :width="direction === 'row'?'24px':'28px'"
      :height="direction === 'row'?'24px':'28px'"
      :style="direction === 'row' ? 'margin:-8px 0':'margin: 0px 0'">
  </div>
  <!-- 小部件内容 -->
  <div
    style="display: flex"
    :style="{flexDirection: direction,textShadow: ' 0 0 2px #000,0 0 4px #000'}"
  >
    <div :style=" direction === 'row' ? {fontSize: '12px'} : {fontSize: '11px'} " style="font-weight: 600;">“小工具”回归</div>
    <div
      :style="direction === 'row' ? 'margin-left: 10px;font-size: 12px;' : 'color: #fff;font-size: 11px;'" style="color: #ccc"
    >
      将喜欢的小工具固定在桌面
    </div>
  </div>
</template>
<script setup>
const prop = defineProps({
  direction: {
    type: String,
    default: "row",
  },
});
</script>
