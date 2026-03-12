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

  <Taskbar @mousedown.stop />
</template>

<script setup>
import { ref, reactive, defineAsyncComponent, markRaw, onMounted, watch } from "vue";
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
  newList.forEach((win, index) => {
    // 如果是新窗口（没有坐标记录），初始化它
    if (!pos[win.id]) {
      const offset = (Object.keys(pos).length) * 30;
      pos[win.id] = { 
        top: 120 + offset, 
        left: 120 + offset 
      };
      
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
  const maxZ = Math.max(...Object.values(zIndexes), 0);
  zIndexes[id] = maxZ + 1;
};

// 处理关闭逻辑（带动画）
const handleClose = (id) => {
  const instance = windowRefs.get(id);
  if (!instance) return;

  // 执行关闭动画
  if (typeof instance.close === 'function') {
    instance.close();
  } else if (instance.$el) {
    instance.$el.style.animation = "anim-reverse 0.3s cubic-bezier(0, 1, 0, 1) forwards";
  }

  // 动画结束后从 windowList 中彻底移除
  setTimeout(() => {
    const idx = windowList.value.findIndex(w => w.id === id);
    if (idx > -1) {
      windowList.value.splice(idx, 1);
    }
    // 清理状态缓存
    delete pos[id];
    delete zIndexes[id];
    windowRefs.delete(id);
    if (activeWindow.value === id) activeWindow.value = "";
  }, 300);
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
  }, 3000);

  setTimeout(() => {
    openWindow("demo");
  }, 4000);
});
</script>