<template>
  <div class="toolbar">
    <div class="navbtns">
      <!-- 上一步 -->

      <div>
        <svg t="1760621368275" class="icon windowBtnStd" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="3590" style="padding: 0 10px;width:16px;height:16px;">
          <path
            d="M908.5 482H188.2l250.5-250.5c11.7-11.7 11.7-30.7 0-42.4s-30.7-11.7-42.4 0L94.6 490.8c-11.7 11.7-11.7 30.7 0 42.4L396.3 835c5.9 5.9 13.5 8.8 21.2 8.8 7.7 0 15.4-2.9 21.2-8.8 11.7-11.7 11.7-30.7 0-42.4L188.2 542h720.3c16.6 0 30-13.4 30-30s-13.4-30-30-30z"
            fill="currentColor" p-id="3591"></path>
        </svg>
      </div>
      <span style="color: #333" class=" glass-fog">设置</span>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>
.navbtns {
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 3px 0;
}

.toolbar {
  height: 42px !important;
  width: calc(100% - 6px);
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 5px;
  font-size: 12px;
  gap: 80px;
  -webkit-app-region: drag;
  /* 支持Electron环境下的拖动 */
}

.fab {
  height: 42px !important;
  width: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 5px;
  font-size: 12px;
  gap: 10px;
  -webkit-app-region: drag;
  /* 支持Electron环境下的拖动 */
}

.address {
  background: rgba(230, 230, 230, 0.667);
  border-top: #fffa 2px solid;
  border-bottom: #fffa 1px solid;
  border-radius: 14px;
  height: 20px;
  backdrop-filter: blur(10px);
  padding: 3px 10px;
  flex: 2;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  gap: 10px;
}

.search {
  border-radius: 14px;
  margin: 0 140px 0 120px;
  font-size: 14px;
  color: #333;
  gap: 5px;
}
</style>
