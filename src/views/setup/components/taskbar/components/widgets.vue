<template>
  <!-- 小部件内容 -->
  <div
    style="display: flex"
    :style="{flexDirection: direction}"
  >
    <div :style=" direction === 'row' ? {fontSize: '12px'} : {fontSize: '11px'} ">Recovery mode</div>
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
