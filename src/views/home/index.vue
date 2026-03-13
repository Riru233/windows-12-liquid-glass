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

  <TransitionGroup name="window-zoom">
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
      const winW = 200;
      const winH = 200;

      let index = Object.keys(pos).length;
      let targetTop = startPos + index * step;
      let targetLeft = startPos + index * step;

      if (targetTop + winH + taskbarHeight > window.innerHeight) {
        targetTop = window.innerHeight - taskbarHeight - winH - 20;
      }

      if (targetLeft + winW > window.innerWidth) {
        const resetIndex = index % 8;
        targetTop = startPos + resetIndex * step;
        targetLeft = startPos + resetIndex * step;
      }

      pos[win.id] = {
        top: Math.max(0, targetTop),
        left: Math.max(0, targetLeft)
      };

      const maxZ = Math.max(...Object.values(zIndexes), 0);
      zIndexes[win.id] = maxZ + 1;
      activeWindow.value = win.id;
      minimizedStates[win.id] = false;
    }
  });
}, { immediate: true, deep: true });

const deactivateAll = () => {
  activeWindow.value = "";
};

const activate = (id) => {
  if (minimizedStates[id]) {
    handleRestore(id);
    return;
  }
  if (activeWindow.value === id) return;
  activeWindow.value = id;
  const zValues = Object.values(zIndexes);
  const maxZ = zValues.length > 0 ? Math.max(...zValues) : 1;
  zIndexes[id] = maxZ + 1;
};

const handleMinimize = (id) => {
  console.log("minimize");
  minimizedStates[id] = true;
  if (activeWindow.value === id) {
    const otherWindows = windowList.value.filter(w => w.id !== id && !minimizedStates[w.id]);
    if (otherWindows.length > 0) {
      const nextActiveWin = otherWindows.reduce((prev, current) => {
        return (zIndexes[prev.id] > zIndexes[current.id]) ? prev : current;
      });
      activeWindow.value = nextActiveWin.id;
    } else {
      activeWindow.value = "";
    }
  }
};

const handleRestore = (id) => {
  minimizedStates[id] = false;
  activate(id);
};

const handleClose = (id) => {
  const instance = windowRefs.get(id);
  if (!instance) return;

  if (typeof instance.close === 'function') {
    instance.close();
  } else if (instance.$el) {
    instance.$el.style.animation = "winanim-reverse 0.5s cubic-bezier(1,0,0,0.5) forwards";
  }

  setTimeout(() => {
    const idx = windowList.value.findIndex(w => w.id === id);
    if (idx > -1) {
      windowList.value.splice(idx, 1);
    }
    delete pos[id];
    delete zIndexes[id];
    delete minimizedStates[id];
    windowRefs.delete(id);
  }, 500);
};

const openWindow = (name) => {
  const newId = `win_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  windowList.value.push({ id: newId, name: name });
};

onMounted(() => {
  setTimeout(() => {
    openWindow("demo");
  }, 1000);
  setTimeout(() => {
    handleMinimize('demo');
  }, 2000);
});

const appConfigs = {
  explorer: { title: "文件资源管理器", url: "/public/icons/explorer_ICO_MYCOMPUTER.ico" },
  settings: { title: "设置", url: "/public/icons/settings/logo.scale-100.png" },
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
  minimizedStates,
  activate,
  openWindow,
  handleMinimize,
  handleRestore
});
</script>

<style scoped>
.window-zoom-enter-active {
  animation: win-zoom-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.window-zoom-leave-active {
  animation: win-zoom-out 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes win-zoom-in {
  from {
    transform: scale(0.1) translateY(500px);
  }

  to {
    transform: scale(1) translateY(0);
  }
}

@keyframes win-zoom-out {
  from {
    transform: scale(1);
    filter: blur(0);
  }

  to {
    transform: scale(0.1) translateY(100vh);
    opacity: 0;
    filter: blur(10px);
  }
}
</style>