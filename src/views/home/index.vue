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
    v-for="name in running" 
    :key="name" 
    :is="windowComponents[name]" 
    :ref="(el) => setRef(el, name)"
    :active="activeWindow === name" 
    :style="{ zIndex: zIndexes[name] }" 
    v-model:top="pos[name].top"
    v-model:left="pos[name].left" 
    @close="close(name)" 
    @mousedown.stop="activate(name)" 
  />

  <Taskbar @mousedown.stop />
</template>

<script setup>
import { ref, reactive, defineAsyncComponent, markRaw } from "vue";
import Taskbar from "/src/views/home/components/taskbar/index_mode1.vue";

// 1. 窗口配置列表 (只需在这里维护窗口名称)
const windowList = ["about", "explorer", "settings", "demo"];

// 2. 自动生成组件映射
const windowComponents = {};
windowList.forEach(name => {
  // 假设你的路径规律一致，about 对应 aboutWindow，其他对应同名文件夹
  const path = name === 'about' ? 'aboutWindow' : name;
  windowComponents[name] = markRaw(
    defineAsyncComponent(() => import(`/src/views/home/components/${path}/index.vue`))
  );
});

// 3. 响应式状态初始化
const running = reactive([...windowList]); // 初始全部打开
const activeWindow = ref("");
const pos = reactive({});
const zIndexes = reactive({});

// 4. 根据索引批量初始化位置和层级
windowList.forEach((name, index) => {
  // 阶梯式坐标：每增加一个窗口，向右下方偏移 60px
  pos[name] = { 
    top: 120 + index * 60, 
    left: 120 + index * 60 
  };
  // 初始堆叠顺序：索引越靠后，层级越高
  zIndexes[name] = index + 1;
});

// 存储引用
const windowRefs = new Map();
const setRef = (el, name) => {
  if (el) windowRefs.set(name, el);
};

// 核心逻辑
const deactivateAll = () => {
  activeWindow.value = "";
};

const activate = (name) => {
  if (activeWindow.value === name) return;
  activeWindow.value = name;
  const maxZ = Math.max(...Object.values(zIndexes), 0);
  zIndexes[name] = maxZ + 1;
};

const close = (name) => {
  const instance = windowRefs.get(name);
  if (!instance) return;

  if (typeof instance.close === 'function') {
    instance.close();
  } else if (instance.$el) {
    instance.$el.style.animation = "anim-reverse 0.3s cubic-bezier(0, 1, 0, 1) forwards";
  }

  setTimeout(() => {
    const idx = running.indexOf(name);
    if (idx > -1) running.splice(idx, 1);
    windowRefs.delete(name);
  }, 300);
};
</script>