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
    " @mousedown.self="deactivateAll" />

  <component 
    v-for="win in windowList" 
    :key="win.id" 
    :is="getComponent(win.name)" 
    :ref="(el) => setRef(el, win.id)"
    :active="activeWindow === win.id" 
    :style="{ zIndex: zIndexes[win.id] }" 
    v-model:top="pos[win.id].top"
    v-model:left="pos[win.id].left" 
    @close="handleClose(win.id)" 
    @mousedown.stop="activate(win.id)" 
  />
  <button @click="openWindow('demo')" alt="Open Demo Window" style="position:fixed;right:10px;bottom:80px;width:42px;height:42px;border:none;border-radius: 21px;">＋</button>

  <Taskbar @mousedown.stop />
</template>

<script setup>
import { ref, reactive, defineAsyncComponent, markRaw, onMounted, watch, provide } from "vue";
import Taskbar from "/src/views/home/components/taskbar/index_mode1.vue";

/**
 * 1. 响应式窗口列表
 * 数据结构: { id: String, name: String }
 * id 是唯一标识（由于支持重复窗口，不能用 name 当 key）
 */
const windowList = ref([
  { id: 'win_1', name: "demo" },
  { id: 'win_2', name: "about" },
  { id: 'win_3', name: "explorer" },
  { id: 'win_4', name: "settings" }
]);

// 组件库缓存，避免重复 defineAsyncComponent
const componentCache = new Map();
const getComponent = (name) => {
  if (!componentCache.has(name)) {
    componentCache.set(name, markRaw(
      defineAsyncComponent(() => import(`/src/window/${name}/index.vue`))
    ));
  }
  return componentCache.get(name);
};

// 状态管理
const activeWindow = ref("");
const pos = reactive({});
const zIndexes = reactive({});
const windowRefs = new Map();

// 设置 Ref
const setRef = (el, id) => {
  if (el) windowRefs.set(id, el);
};

/**
 * 2. 监听 windowList 变化
 * 实时初始化新窗口的位置和层级
 */
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


// 核心逻辑
const deactivateAll = () => {
  activeWindow.value = "";
};

const activate = (id) => {
  if (activeWindow.value === id) return;
  activeWindow.value = id;
  
  // 核心：找到当前所有窗口中最大的 zIndex
  const zValues = Object.values(zIndexes);
  const maxZ = zValues.length > 0 ? Math.max(...zValues) : 1;
  
  // 将当前点击的窗口 zIndex 设置为最大值 + 1
  zIndexes[id] = maxZ + 1;
};
// 处理关闭逻辑（带动画）
const handleClose = (id) => {
  const instance = windowRefs.get(id);
  if (!instance) return;

  // 1. 执行关闭动画
  if (typeof instance.close === 'function') {
    instance.close();
  } else if (instance.$el) {
    instance.$el.style.animation = "winanim-reverse 0.5s cubic-bezier(1,0,0,0.5) forwards";
  }

  if (activeWindow.value === id) {
    // 找出所有还在运行但不是当前要关闭的窗口
    const otherWindows = windowList.value.filter(w => w.id !== id);
    
    if (otherWindows.length > 0) {
      // 找到 zIndex 最大的窗口
      const nextActiveWin = otherWindows.reduce((prev, current) => {
        return (zIndexes[prev.id] > zIndexes[current.id]) ? prev : current;
      });
      // 激活它，但不改变它的 zIndex（保持原层级）
      activeWindow.value = nextActiveWin.id;
    } else {
      // 没有其他窗口了，清空活跃状态
      activeWindow.value = "";
    }
  }
  setTimeout(() => {
    const idx = windowList.value.findIndex(w => w.id === id);
    if (idx > -1) {
      windowList.value.splice(idx, 1);
    }
    // 清理状态缓存
    delete pos[id];
    delete zIndexes[id];
    windowRefs.delete(id);
  }, 500);
};

/**
 * 3. 辅助函数：打开新窗口
 * 调用此函数即可实现“点击一次打开一个”
 */
const openWindow = (name) => {
  const newId = `win_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  windowList.value.push({ id: newId, name: name });
};

// 挂载后的生命周期测试
onMounted(() => {
  // 测试：移除末尾元素
  // setTimeout(() => {
  //   windowList.value.pop();
  // }, 2000);

  // 测试：重复打开多个 demo 窗口
  setTimeout(() => {
    openWindow("demo");
  }, 1000);
});

// 任务栏配置

const appConfigs = {
  explorer: {
    title: "文件资源管理器",
    url: "/public/icons/explorer_ICO_MYCOMPUTER.ico",
  },
  settings: {
    title: "设置",
    url: "/public/icons/settings/logo.scale-100.png",
  },
  demo: {
    title: "演示程序",
    icon: `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><circle cx="512" cy="512" r="400" fill="#4CAF50"/></svg>`
  },
  about: {
    title: "关于系统",
    icon: `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 85.290667c235.690667 0 426.752 191.061333 426.752 426.752 0 235.648-191.061333 426.709333-426.752 426.709333-235.690667 0-426.752-191.061333-426.752-426.709333C85.248 276.352 276.309333 85.290667 512 85.290667z m0 64a362.752 362.752 0 1 0 0 725.461333A362.752 362.752 0 0 0 512 149.333333z m-0.170667 298.666666a32 32 0 0 1 31.744 27.648l0.298667 4.352 0.128 234.752a32 32 0 0 1-63.701333 4.352l-0.298667-4.309333-0.128-234.752a32 32 0 0 1 32-32zM512 298.794667a42.624 42.624 0 1 1 0 85.205333 42.624 42.624 0 0 1 0-85.205333z" fill="#fff"></path></svg>`
  }
};

provide('desktopContext', {
  appConfigs,
  windowList,
  activeWindow,
  activate, // 使用上面定义的 activate
  openWindow
});
</script>