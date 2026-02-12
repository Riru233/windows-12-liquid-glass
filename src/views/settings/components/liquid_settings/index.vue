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
        
        <div style="display: flex; flex-direction: row; align-items: center;">
          <div class="win-btn-wrapper">
            <div class="win-btn-icon" style="mask-image: url(/public/minimize.png);"></div>
          </div>
          <div class="win-btn-wrapper">
            <div class="win-btn-icon" style="mask-image: url(/public/maximum.png);"></div>
          </div>
          <div class="win-btn-wrapper">
            <div class="win-btn-icon" style="mask-image: url(/public/close.png);"></div>
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