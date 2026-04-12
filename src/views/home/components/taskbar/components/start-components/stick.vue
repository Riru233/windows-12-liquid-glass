<template>
  <div :class="['app-item', viewMode]" :style="{ color: props.color }">
    <div class="icon-wrapper" :style="{ backgroundColor: props.bg }">
      <slot></slot>
    </div>
    <span class="app-title">{{ title }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  bg: { type: String, default: 'rgba(255,255,255,0.1)' },
  color: { type: String, default: '#333' },
  title: { type: String, default: "" },
  viewMode: { type: String, default: 'grid' } // 'grid' 或 'list'
});
</script>

<style scoped>
.app-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 8px;
  padding: 8px;
  filter: drop-shadow(0px 0px 3px #0003) drop-shadow(0px 0px 6px #0003);
}

.app-item:hover {
  filter: drop-shadow(12px 12px 3px #0003) drop-shadow(12px 12px 6px #0003);
  transform: translateY(-2px);
}

/* 图标模式：上下排列 */
.app-item.grid {
  flex-direction: column;
  justify-content: center;
  width: 65px; /* 固定宽度保证对齐 */
  gap: 8px;
}
.app-item.grid .icon-wrapper {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}
.app-item.grid .app-title {
  font-size: 12px;
  text-align: center;
  word-break: break-all;
}

/* 列表模式：左右排列 */
.app-item.list {
  flex-direction: row;
  width: 100%; /* 占满一行 */
  gap: 15px;
  padding: 10px 15px;
}
.app-item.list .icon-wrapper {
  width: 32px;
  height: 32px;
}
.app-item.list .app-title {
  font-size: 14px;
}
</style>