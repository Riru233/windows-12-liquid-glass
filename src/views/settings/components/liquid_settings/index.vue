<template>
  <LiquidWin 
    :width="900" 
    :height="600" 
    :displacementScale="150"
    :initialTop="150"
    :initialLeft="480"
    v-slot="{ startDrag }"
  >
    <div class="glass-content" style="display: flex; flex-direction: column; flex: 1;">
      
      <div class="titlebar" @mousedown="startDrag">
        <toolbar />
        <div style="flex-grow: 1"></div>
        
        <div
          style="
            display: flex;
            flex-direction: row;
            height: 24px;
            align-items: center;
            font-size: 14px;
          "
        >
          <div style="padding: 0 16px">
            <svg class="icon windowBtnStd" viewBox="0 0 1024 1024">
              <path
                d="M160.213333 533.333333h703.658667a32 32 0 0 0 0-64H160.213333a32 32 0 0 0 0 64z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div style="padding: 0 16px">
            <svg class="icon windowBtnStd" viewBox="0 0 1024 1024">
              <path
                d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div style="padding: 0 11px 0 16px" @click="close">
            <svg class="icon windowBtnClose" viewBox="0 0 1024 1024">
              <path
                d="M187.605333 194.304l3.114667-3.584a32 32 0 0 1 41.642667-3.114667l3.584 3.114667L512 466.730667l276.053333-276.053334a32 32 0 1 1 45.226667 45.269334L557.269333 512l276.053334 276.053333a32 32 0 0 1 3.072 41.642667l-3.114667 3.584a32 32 0 0 1-41.642667 3.114667l-3.584-3.114667L512 557.269333l-276.053333 276.053334a32 32 0 0 1-45.226667-45.269334L466.730667 512l-276.053334-276.053333a32 32 0 0 1-3.072-41.642667l3.114667-3.584-3.114667 3.584z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <WindowView />
    </div>
  </LiquidWin>
</template>

<script setup>
import LiquidWin from "/src/components/liquid_win.vue";
import WindowView from "./components/windowView.vue";
import toolbar from "./components/toolbar.vue";

// 注意：拖拽逻辑、offset计算、mousemove 监听全部已移入 LiquidWin 内部，此处不再需要
</script>

<style scoped>
@import "/src/assets/liquidglass.css";

/* 确保内容区域铺满并带有背景色 */
.glass-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: rgba(172, 208, 255, 0.467);
}

.titlebar {
  height: 40px !important;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 0 5px;
  font-size: 12px;
  cursor: default;
}

/* 按钮图标通用样式 */
.win-btn-wrapper {
  margin: 0 15px;
  cursor: pointer;
}

.win-btn-icon {
  height: 10px;
  width: 10px;
  background-color: #888;
  mask-size: contain;
  mask-repeat: no-repeat;
}

/* 移除原有的 #glass-window 相关样式，因为 LiquidWin 内部已处理 */
</style>