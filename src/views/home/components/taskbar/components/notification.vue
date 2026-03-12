<template>
  <div class="bottom-notification" ref="bottomNotification">
    <LiquidGlass :width="350" :height="parentHeight" :radius="10" :displacementScale="75" :drag="false" :blur="5"
      position="relative" layerStyle="margin: 10px;" style="background-color: #fff6;" :precise="1">
      <div class="title">
        <div><img src="/meta/Weixin_IDI_ICON1.ico" alt="logo" width="14px" height="14px"></div>
        <div style="flex:1">{{ props.title }}</div>
        <div>
            <div style="margin: 0 5px; font-size: 12px">
              <svg class="icon windowBtnClose" viewBox="0 0 1024 1024" width="14px">
                <path
                  d="M330.666667 512a74.666667 74.666667 0 1 1-149.333334 0 74.666667 74.666667 0 0 1 149.333334 0zM586.666667 512a74.666667 74.666667 0 1 1-149.333334 0 74.666667 74.666667 0 0 1 149.333334 0zM768 586.666667a74.666667 74.666667 0 1 0 0-149.333334 74.666667 74.666667 0 0 0 0 149.333334z"
                  p-id="17392"></path>
              </svg>
            </div>
        </div>
        <div>
          <div style="margin: 0 5px; font-size: 12px">
            <svg class="icon windowBtnClose" viewBox="0 0 1024 1024" width="14px">
              <path
                d="M187.605333 194.304l3.114667-3.584a32 32 0 0 1 41.642667-3.114667l3.584 3.114667L512 466.730667l276.053333-276.053334a32 32 0 1 1 45.226667 45.269334L557.269333 512l276.053334 276.053333a32 32 0 0 1 3.072 41.642667l-3.114667 3.584a32 32 0 0 1-41.642667 3.114667l-3.584-3.114667L512 557.269333l-276.053333 276.053334a32 32 0 0 1-45.226667-45.269334L466.730667 512l-276.053334-276.053333a32 32 0 0 1-3.072-41.642667l3.114667-3.584-3.114667 3.584z"
                fill="#333"></path>
            </svg>
          </div>
        </div>
      </div>
      <div style="display: flex;flex-direction: row;">
        <div>

        </div>
        <div style="display: flex;flex-direction: column;">
          <div class="subtitle">
            {{ props.detailLine1 }}</div>
          <div class="detail">
            {{ props.detailLine2 }}</div>
        </div>
      </div>
    </LiquidGlass>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import LiquidGlass from "/src/components/liquid_glass.vue";
const bottomNotification = ref(null);
const parentHeight = ref(100); // 默认初始值

// 监听父元素尺寸变化
let resizeObserver;

onMounted(() => {
  if (bottomNotification.value) {
    // 初始化高度
    parentHeight.value = bottomNotification.value.offsetHeight;

    // 监听高度变化
    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // 更新高度，LiquidGlass 内部的 watch 会被触发重绘
        parentHeight.value = entry.contentRect.height;
      }
    });
    resizeObserver.observe(bottomNotification.value);
  }
});
const props = defineProps({
  title: String,
  detailLine1: String,
  detailLine2: String,
});
</script>
<style scoped>
* {
  font-family: 'Segoe UI';
}
.bottom-notification {
  position: fixed;
  justify-content: center;
  align-items: center;
  right: 20px;
  bottom: 80px;
  width: 350px;
  height: 90px;
  z-index: 999;
}

.title,
.subtitle,
.detail {
  margin-left: 10px;
  color: #333;
  /* filter: drop-shadow(#fff 0 0 2px) drop-shadow(#fff 0 0 4px) drop-shadow(#fff 0 0 6px); */
}

.subtitle,
.detail {
  font-size: 13.5px;
}

.title {
  font-size: 12px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  justify-content: center;
  height:20px;
}
.detail {
  opacity: 0.6;
}
</style>
