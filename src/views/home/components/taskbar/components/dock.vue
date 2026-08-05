<template>
  <div class="dock-container">
    <div v-for="item in fixedItems" :key="item.name" class="dock-item">
      <div class="icon-group" v-html="item.icon" @click="item.action"></div>
    </div>
    <div class="separator" v-if="pagedItems.length > 0"></div>
    <div v-for="win in pagedItems" :key="win.id" class="dock-item" @click="handleDynamicClick(win.id)">
      <div class="icon-group">
        <div v-if="win.icon" v-html="win.icon" class="app-icon-svg"></div>
        <div v-else-if="win.url" :style="{ backgroundImage: `url(${win.url})` }" class="app-icon-img" />
        <div class="status-bar" :class="activeWindow === win.id ? 'bar-active' : 'bar-running'"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref, watch } from "vue";

// 注入来自根组件的上下文
const { windowList, activeWindow, activate, handleMinimize, handleRestore, minimizedStates, appConfigs } = inject('desktopContext');

const PAGE_SIZE = 34;
const currentPage = ref(0);
const emits = defineEmits(['toggle-start']);
const toggleStart = () => {
  emits("toggle-start");
};
// 固定图标配置
const fixedItems = [
  { 
    name: 'start', 
    icon: `<svg t="1758723718980" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5255" style="width: 22px;height:22px;"><defs><linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fffc" /><stop offset="100%" stop-color="#fffc" /></linearGradient></defs><path d="M81.92 289.42336v207.79008h415.29344V81.92H81.92v207.50336z m444.86656 0v207.79008H942.08V81.92H526.78656v207.50336zM81.92 734.57664V942.08h415.29344V526.78656H81.92v207.79008z m444.86656 0V942.08H942.08V526.78656H526.78656v207.79008z" p-id="5256" fill="url(#linearGradient)"></path></svg>`,
    action: toggleStart
  },
  { 
    name: 'search', 
    icon: `<svg t="1758723992214" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7130" style="width: 20px;margin-top:1px"><linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffffff" /><stop offset="100%" stop-color="#cccccc" /></linearGradient><path d="M1006.007227 926.859131L801.704607 723.067694a446.432746 446.432746 0 1 0-528.221951 139.212044 448.136688 448.136688 0 0 0 348.626488 0 448.221885 448.221885 0 0 0 101.214142-59.637963l203.876633 203.450649a55.974487 55.974487 0 1 0 78.977702-79.233293zM447.540308 805.708871a357.061 357.061 0 1 1 356.038635-356.975803 356.890606 356.890606 0 0 1-356.038635 356.975803z" fill="url(#lg1)" p-id="7131"></path></svg>` 
  }
];


// 动态处理点击图标逻辑
const handleDynamicClick = (id) => {
  if (minimizedStates[id]) {
    handleRestore(id); // 触发 win-restore 动画
  } else if (activeWindow.value === id) {
    handleMinimize(id); // 触发 win-restore 动画
  } else {
    activate(id);
  }
};
const handleFixedClick = (name) => {
  console.log("Click fixed item:", name);
  // 这里可以扩展开始菜单等逻辑
};

// 所有动态图标
const allDynamicItems = computed(() => {
  return windowList.value.map(win => {
    const config = appConfigs[win.name] || {};
    return { id: win.id, name: win.name, icon: config.icon, url: config.url };
  });
});

// 计算总页数
const totalTabs = computed(() => Math.ceil(allDynamicItems.value.length / PAGE_SIZE));

// 当前页面展示的图标
const pagedItems = computed(() => allDynamicItems.value.slice(0, PAGE_SIZE));

// 翻页逻辑
const nextPage = () => {
  if (currentPage.value < totalTabs.value - 1) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--;
};

// 自动跳转逻辑
watch(() => allDynamicItems.value.length, (newLen, oldLen) => {
  if (newLen > oldLen) {
    const targetPage = Math.floor((newLen - 1) / PAGE_SIZE);
    if (targetPage !== currentPage.value) {
      currentPage.value = targetPage;
    }
  } else if (currentPage.value >= totalTabs.value && totalTabs.value > 0) {
    currentPage.value = totalTabs.value - 1;
  }
});
</script>

<style scoped>
.dock-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
}

.separator {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 4px;
}

.dock-item {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.dock-item:hover {
  transform: translateY(-2px);
}

.icon-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  -webkit-box-reflect: below -4px linear-gradient(transparent 70%, rgba(0, 0, 0, .1));
}

.app-icon-svg,
.app-icon-img {
  width: 22px;
  height: 22px;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-icon-svg :deep(svg) {
  width: 100%;
  height: 100%;
}

.status-bar {
  height: 3px;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.bar-active { background: #fffa; width: 12px; }
.bar-running { background: #fff6; width: 6px; }

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #fff;
  font-size: 10px;
  margin-left: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
}

.pagination-controls span {
  cursor: pointer;
  user-select: none;
  opacity: 0.8;
}

.pagination-controls span:hover { opacity: 1; }
.pagination-controls .disabled {
  opacity: 0.2;
  cursor: not-allowed;
}
</style>