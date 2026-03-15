<template>
  <div style="
      margin: 0;
      padding: 0;
      min-height: 100vh;
      background-image: url('/public/imgbeta12.png');
      background-attachment: fixed;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
    " @mousedown.self="deactivateAll" />

  <TransitionGroup :name="animMode">
    <component v-for="win in windowList" v-show="!minimizedStates[win.id]" :key="win.id" :is="getComponent(win.name)"
      :ref="(el) => setRef(el, win.id)" :active="activeWindow === win.id" :style="{ zIndex: zIndexes[win.id] }"
      v-model:top="pos[win.id].top" v-model:left="pos[win.id].left" @close="handleClose(win.id)"
      @minimize="handleMinimize(win.id)" @mousedown.stop="activate(win.id)" />
  </TransitionGroup>

  <button @click="openWindow('demo')"
    style="position:fixed;right:10px;bottom:80px;width:42px;height:42px;border:none;border-radius: 21px;background:#fff;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,0.2);z-index:9999;">＋</button>

  <Taskbar @mousedown.stop @restore="handleRestore" />
</template>

<script setup>
import { ref, reactive, defineAsyncComponent, markRaw, onMounted, watch, provide, nextTick } from "vue";
import Taskbar from "/src/views/home/components/taskbar/index_mode1.vue";

const windowList = ref([
  { id: 'win_1', name: "demo" },
  { id: 'win_2', name: "about" },
  { id: 'win_3', name: "explorer" },
  { id: 'win_4', name: "settings" }
]);

const animMode = ref("win-open"); // 初始动画模式
const componentCache = new Map();
const getComponent = (name) => {
  if (!componentCache.has(name)) {
    componentCache.set(name, markRaw(
      defineAsyncComponent(() => import(`/src/window/${name}/index.vue`))
    ));
  }
  return componentCache.get(name);
};

const activeWindow = ref("");
const pos = reactive({});
const zIndexes = reactive({});
const minimizedStates = reactive({});
const windowRefs = new Map();

const setRef = (el, id) => {
  if (el) windowRefs.set(id, el);
};

watch(windowList, (newList) => {
  newList.forEach((win) => {
    if (!pos[win.id]) {
      const taskbarHeight = 46;
      const startPos = 120;
      const step = 30;
      
      // 假设窗口的平均尺寸，用于碰撞检测
      const winW = 200; 
      const winH = 200;

      // 1. 计算当前的索引（第几个窗口）
      let index = Object.keys(pos).length;

      // 2. 初始预设计算（常规阶梯）
      let targetTop = startPos + index * step;
      let targetLeft = startPos + index * step;

      // 3. 底部边界检测：如果 Top 触及任务栏
      if (targetTop + winH + taskbarHeight > window.innerHeight) {
        // 固定 Top 坐标在底部的安全位置，不再向下增加
        targetTop = window.innerHeight - taskbarHeight - winH - 20; 
        
        // 此时 targetLeft 仍然会随 index 增加而向右移动
      }

      // 4. 右侧边界检测：如果 Left 也触及屏幕边缘
      if (targetLeft + winW > window.innerWidth) {
        // 彻底重置：根据当前窗口总数取模，让它回到左上角区域循环
        const resetIndex = index % 8; 
        targetTop = startPos + resetIndex * step;
        targetLeft = startPos + resetIndex * step;
      }

      // 5. 应用坐标
      pos[win.id] = { 
        top: Math.max(0, targetTop), // 确保不会变成负数
        left: Math.max(0, targetLeft) 
      };
      
      // 层级与激活
      const maxZ = Math.max(...Object.values(zIndexes), 0);
      zIndexes[win.id] = maxZ + 1;
      activeWindow.value = win.id;
    }
  });
}, { immediate: true, deep: true });

const deactivateAll = () => { activeWindow.value = ""; };

const activate = (id) => {
  if (minimizedStates[id]) {
    handleRestore(id);
    return;
  }
  if (activeWindow.value === id) return;
  activeWindow.value = id;
  const maxZ = Math.max(...Object.values(zIndexes), 0);
  zIndexes[id] = maxZ + 1;
};

const handleMinimize = (id) => {
  animMode.value = "win-restore"; // 切换到还原/最小化类组
  nextTick(() => {
    minimizedStates[id] = true;
    if (activeWindow.value === id) {
      const otherWindows = windowList.value.filter(w => w.id !== id && !minimizedStates[w.id]);
      activeWindow.value = otherWindows.length > 0 ? 
        otherWindows.reduce((p, c) => zIndexes[p.id] > zIndexes[c.id] ? p : c).id : "";
    }
  });
};

const handleRestore = (id) => {
  animMode.value = "win-restore"; // 使用还原动画
  nextTick(() => {
    minimizedStates[id] = false;
    activate(id);
  });
};

const handleClose = (id) => {
  animMode.value = "win-open"; // 关闭使用打开类的反向动画
  nextTick(() => {
    const idx = windowList.value.findIndex(w => w.id === id);
    if (idx > -1) windowList.value.splice(idx, 1);
    delete pos[id]; delete zIndexes[id]; delete minimizedStates[id];
  });
};

const openWindow = (name) => {
  animMode.value = "win-open"; // 新开使用打开动画
  nextTick(() => {
    const newId = `win_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    windowList.value.push({ id: newId, name: name });
  });
};

const appConfigs = {
  explorer: { title: "文件资源管理器", url: "/public/icons/explorer_ICO_MYCOMPUTER.ico" },
  settings: { title: "设置", url: "/public/icons/settings/logo.scale-100.png" },
  demo: { title: "演示程序", icon: `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><circle cx="512" cy="512" r="400" fill="#4CAF50"/></svg>` },
  about: { title: "关于系统", icon: `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 85.290667c235.690667 0 426.752 191.061333 426.752 426.752 0 235.648-191.061333 426.709333-426.752 426.709333-235.690667 0-426.752-191.061333-426.752-426.709333C85.248 276.352 276.309333 85.290667 512 85.290667z m0 64a362.752 362.752 0 1 0 0 725.461333A362.752 362.752 0 0 0 512 149.333333z m-0.170667 298.666666a32 32 0 0 1 31.744 27.648l0.298667 4.352 0.128 234.752a32 32 0 0 1-63.701333 4.352l-0.298667-4.309333-0.128-234.752a32 32 0 0 1 32-32zM512 298.794667a42.624 42.624 0 1 1 0 85.205333 42.624 42.624 0 0 1 0-85.205333z" fill="#fff"></path></svg>` }
};

provide('desktopContext', {
  appConfigs, windowList, activeWindow, minimizedStates, 
  activate, openWindow, handleMinimize, handleRestore 
});
</script>

<style scoped>
/* ============================================================
   1. 初次开启动画: 居中放大淡入
   ============================================================ */
.win-open-enter-active {
  animation: winanim 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.win-open-leave-active {
  animation: winanim-reverse 0.3s ease-in forwards;
}


/* ============================================================
   2. 还原/最小化动画 (win-restore): 从底部任务栏升起/落下
   ============================================================ */
.win-restore-enter-active,
.win-restore-leave-active {
  /* 关键：设置变换中心为左下角 */
  transform-origin: left bottom;
}

.win-restore-enter-active {
  animation: win-restore-in 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.win-restore-leave-active {
  animation: win-restore-out 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes win-restore-in {
  from { transform: translateY(50vh) scale(0); }
  to { transform: translateY(0) scale(1); }
}
@keyframes win-restore-out {
  from { transform: translateY(0) scale(1);  }
  to { transform: translateY(50vh) scale(0);  }
}
</style>