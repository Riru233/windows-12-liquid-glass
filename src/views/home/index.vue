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
      position: absolute; /* 确保它在最底层且覆盖全屏 */
      width: 100%;
      top: 0;
      left: 0;
    " @mousedown.self="deactivateAll" />

  <component v-for="name in running" :key="name" :is="windowComponents[name]" :ref="(el) => setRef(el, name)"
    :active="activeWindow === name" :style="{ zIndex: zIndexes[name] }" v-model:top="pos[name].top"
    v-model:left="pos[name].left" @close="close(name)" @mousedown.stop="activate(name)" />

  <Taskbar @mousedown.self="deactivateAll" />
</template>

<script setup>
import { ref, reactive, defineAsyncComponent, markRaw } from "vue";
import Taskbar from "/src/views/home/components/taskbar/index_mode1.vue";

// 1. 定义异步组件映射表
// 使用 defineAsyncComponent 实现按需加载
const windowComponents = {
  explorer: markRaw(defineAsyncComponent(() => import("/src/views/home/components/explorer/index.vue"))),
  settings: markRaw(defineAsyncComponent(() => import("/src/views/home/components/settings/index.vue"))),
  about: markRaw(defineAsyncComponent(() => import("/src/views/home/components/aboutWindow/index.vue"))),
};

// 2. 状态管理
const running = reactive(["about", "explorer", "settings"]);
const activeWindow = ref("");

const pos = reactive({
  about: { top: 120, left: 120 },
  settings: { top: 180, left: 180 },
  explorer: { top: 240, left: 240 },
});

const zIndexes = reactive({
  about: 1,
  settings: 2,
  explorer: 3,
});

// 存储组件引用的 Map
const windowRefs = new Map();
const setRef = (el, name) => {
  if (el) windowRefs.set(name, el);
};

const deactivateAll = () => {
  activeWindow.value = "";
  console.log("已点击桌面，取消所有窗口激活状态");
};

const activate = (name) => {
  if (activeWindow.value === name) return; // 已经是激活状态则跳过
  activeWindow.value = name;
  const maxZ = Math.max(...Object.values(zIndexes));
  zIndexes[name] = maxZ + 1;
};

const close = (name) => {
  const instance = windowRefs.get(name);
  if (!instance) return;

  // 统一的退出动画处理
  // 如果子组件内部有 close 方法，优先调用（用于子组件处理内部动画）
  if (typeof instance.close === 'function') {
    instance.close();
  } else if (instance.$el) {
    instance.$el.style.animation = "anim-reverse 0.3s cubic-bezier(0, 1, 0, 1) forwards";
  }

  setTimeout(() => {
    const index = running.indexOf(name);
    if (index > -1) running.splice(index, 1);
    windowRefs.delete(name);
  }, 300);
};
</script>