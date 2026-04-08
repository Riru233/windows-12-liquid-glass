<template>
  <div
    style="
      margin: 0;
      padding: 0;
      min-height: 100vh;
      background-image: url(&quot;/public/img0.png&quot;);
      background-attachment: fixed;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
    "
    @mousedown.self="deactivateAll"
  />

  <TransitionGroup
    :name="animMode"
    @before-enter="calcDynamicPos"
    @before-leave="calcDynamicPos"
  >
    <component
      v-for="win in windowList"
      v-show="!minimizedStates[win.id]"
      :key="win.id"
      :is="getComponent(win.name)"
      :ref="(el) => setRef(el, win.id)"
      :active="activeWindow === win.id"
      :style="{ zIndex: zIndexes[win.id] }"
      v-model:top="pos[win.id].top"
      v-model:left="pos[win.id].left"
      @close="handleClose(win.id)"
      @minimize="handleMinimize(win.id)"
      @mousedown.stop="activate(win.id)"
    />
  </TransitionGroup>
    <!-- <liquid_glass style="color:#000;" layerClass="" blur="0"
      layerStyle="" width="250" height="250" radius="125" :displacementScale="125" :precise="1" :drag="true"
      position="fixed" /> -->

  <!-- <button
    @click="openWindow('demo')"
    style="
      position: fixed;
      right: 10px;
      bottom: 80px;
      width: 42px;
      height: 42px;
      border: none;
      border-radius: 21px;
      background: #fff;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      z-index: 9999;
    "
  >
    ＋
  </button> -->

  <Taskbar @mousedown.stop @restore="handleRestore" />
</template>

<script setup>
import {
  ref,
  reactive,
  defineAsyncComponent,
  markRaw,
  onMounted,
  watch,
  provide,
  nextTick,
} from "vue";
import Taskbar from "/src/views/home/components/taskbar/index_mode1.vue";
import liquid_glass from "@/components/liquid_glass.vue";

const windowList = ref([
  // { id: "win_1", name: "demo" },
  { id: "win_2", name: "about" },
  { id: "win_3", name: "explorer" },
  { id: "win_4", name: "settings" },
]);

const animMode = ref("win-open");
const componentCache = new Map();
const getComponent = (name) => {
  if (!componentCache.has(name)) {
    componentCache.set(
      name,
      markRaw(
        defineAsyncComponent(() => import(`/src/window/${name}/index.vue`)),
      ),
    );
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

/**
 * 新增逻辑：计算窗口原点到 Dock 图标原点的位移差
 */
const calcDynamicPos = (el) => {
  // 只有还原逻辑需要动态计算位移
  if (animMode.value !== "win-restore") return;

  // 1. 获取当前组件对应的 ID
  const winId = [...windowRefs.entries()].find(([id, refEl]) => {
    return refEl.$el === el || refEl === el;
  })?.[0];

  if (!winId) return;

  // 2. 获取对应的 Dock 图标元素 (假设 ID 格式为 icon-win_x)
  const iconEl = document.getElementById(`icon-${winId}`);

  if (iconEl) {
    const iconRect = iconEl.getBoundingClientRect();
    const winRect = el.getBoundingClientRect();

    // 计算 X 轴和 Y 轴的偏差 (基于原点，即左上角)
    const dx = iconRect.left - winRect.left;
    const dy = iconRect.top - winRect.top;

    // 3. 注入 CSS 变量
    el.style.setProperty("--dx", `${dx}px`);
    el.style.setProperty("--dy", `${dy}px`);
  }
};

watch(
  windowList,
  (newList) => {
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
          left: Math.max(0, targetLeft),
        };
        const maxZ = Math.max(...Object.values(zIndexes), 0);
        zIndexes[win.id] = maxZ + 1;
        activeWindow.value = win.id;
        minimizedStates[win.id] = false;
      }
    });
  },
  { immediate: true, deep: true },
);

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
  const maxZ = Math.max(...Object.values(zIndexes), 0);
  zIndexes[id] = maxZ + 1;
};

const handleMinimize = (id) => {
  animMode.value = "win-restore";
  nextTick(() => {
    minimizedStates[id] = true;
    if (activeWindow.value === id) {
      const otherWindows = windowList.value.filter(
        (w) => w.id !== id && !minimizedStates[w.id],
      );
      activeWindow.value =
        otherWindows.length > 0
          ? otherWindows.reduce((p, c) =>
              zIndexes[p.id] > zIndexes[c.id] ? p : c,
            ).id
          : "";
    }
  });
};

const handleRestore = (id) => {
  animMode.value = "win-restore";
  nextTick(() => {
    minimizedStates[id] = false;
    activate(id);
  });
};

const handleClose = (id) => {
  animMode.value = "win-open";
  nextTick(() => {
    const idx = windowList.value.findIndex((w) => w.id === id);
    if (idx > -1) windowList.value.splice(idx, 1);
    delete pos[id];
    delete zIndexes[id];
    delete minimizedStates[id];
  });
};

const openWindow = (name) => {
  animMode.value = "win-open";
  nextTick(() => {
    const newId = `win_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    windowList.value.push({ id: newId, name: name });
  });
};

const appConfigs = {
  explorer: {
    title: "文件资源管理器",
    url: "/public/icons/explorer_ICO_MYCOMPUTER.ico",
  },
  settings: { title: "设置", url: "/public/icons/settings/logo.scale-100.png" },
  demo: {
    title: "演示程序",
    icon: `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><circle cx="512" cy="512" r="400" fill="#4CAF50"/></svg>`,
  },
  about: {
    title: "关于系统",
    icon: `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 85.290667c235.690667 0 426.752 191.061333 426.752 426.752 0 235.648-191.061333 426.709333-426.752 426.709333-235.690667 0-426.752-191.061333-426.752-426.709333C85.248 276.352 276.309333 85.290667 512 85.290667z m0 64a362.752 362.752 0 1 0 0 725.461333A362.752 362.752 0 0 0 512 149.333333z m-0.170667 298.666666a32 32 0 0 1 31.744 27.648l0.298667 4.352 0.128 234.752a32 32 0 0 1-63.701333 4.352l-0.298667-4.309333-0.128-234.752a32 32 0 0 1 32-32zM512 298.794667a42.624 42.624 0 1 1 0 85.205333 42.624 42.624 0 0 1 0-85.205333z" fill="#fff"></path></svg>`,
  },
};

provide("desktopContext", {
  appConfigs,
  windowList,
  activeWindow,
  minimizedStates,
  activate,
  openWindow,
  handleMinimize,
  handleRestore,
});
</script>

<style scoped>
.win-open-enter-active {
  animation: winanim 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.win-open-leave-active {
  animation: winanim-reverse 0.3s ease-in forwards;
}

/* ============================================================
   2. 还原/最小化动画：使用计算出的变量 --dx 和 --dy
   ============================================================ */
.win-restore-enter-active,
.win-restore-leave-active {
  transform-origin: 0 0; /* 修改为 0 0 以配合原点计算 */
}

.win-restore-enter-active {
  animation: win-restore-in 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.win-restore-leave-active {
  animation: win-restore-out 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes win-restore-in {
  from {
    transform: translate3d(var(--dx, 0), var(--dy, 100vh), 0) scale(0);
  }
  to {
    transform: translate3d(0, 0, 0) scale(1);
  }
}
@keyframes win-restore-out {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(var(--dx, 0), var(--dy, 100vh), 0) scale(0);
  }
}
</style>
