<template>
  <div
    class="desktop"
    @mousemove="onDrag"
    @mouseup="stopDrag"
    @mouseleave="stopDrag"
    @contextmenu.prevent="openContextMenu"
    @click="closeMenu"
  >
    <div
      v-for="icon in icons"
      :key="icon.id"
      class="icon-item"
      :class="[
        iconSizeClass,
        { 'is-original-dragging': draggingIcon?.id === icon.id },
        { 'no-transition': !isAnimating },
      ]"
      :style="{ left: icon.x + 'px', top: icon.y + 'px' }"
      @mousedown.stop="startDrag($event, icon)"
    >
      <div class="icon-visual">
        <img
          v-if="icon.img"
          :src="icon.img"
          :alt="icon.name"
          :style="{ width: '100%', height: '100%' }"
          draggable="false"
        />
        <div v-else class="icon-placeholder"></div>
      </div>
      <span class="icon-label">{{ icon.name }}</span>
    </div>

    <div
      v-if="dragGhost"
      class="icon-item ghost-icon"
      :class="iconSizeClass"
      :style="{ left: dragGhost.x + 'px', top: dragGhost.y + 'px' }"
    >
      <div class="icon-visual">
        <img
          v-if="dragGhost.img"
          :src="dragGhost.img"
          :style="{ width: '100%', height: '100%' }"
          draggable="false"
        />
        <div v-else class="icon-placeholder"></div>
      </div>
      <span class="icon-label">{{ dragGhost.name }}</span>
    </div>

<div
  v-if="menuVisible"
  class="menu-wrapper"
  :style="{ left: menuX + 'px', top: menuY + 'px' }"
  @click.stop
>
  <LiquidGlass
    :key="'main-' + menuKey"
    :width="160"
    :height="calculatedHeight"
    :radius="15"
    :displacementScale="150"
    :layerStyle="{ background: 'rgba(255, 255, 255, 0.6)', borderRadius: '15px' }"
    :blur="5"
    position="relative"
    :precise="1"
    class="glass-root main-menu"
  >
    <div class="context-menu-content" ref="menuRef">
      <ul>
        <template v-for="(item, index) in menuConfig" :key="index">
          <hr v-if="item.type === 'separator'" class="menu-sep" />

          <li 
            v-else 
            :class="{ 'has-submenu': item.hasSubmenu }"
            @click="!item.hasSubmenu && item.click?.()"
          >
            <span class="check" v-if="item.type === 'radio' || item.type === 'checkbox'">
              {{ item.type === 'radio' ? (item.active() ? '●' : '') : (item.active() ? '✓' : '') }}
            </span>

            {{ item.label }}
            
            <span v-if="item.hasSubmenu" class="arrow">▶</span>

            <div v-if="item.hasSubmenu" class="submenu-anchor">
              <LiquidGlass
                :width="item.submenuWidth"
                :height="item.submenuHeight"
                :radius="15"
                :displacementScale="150"
                :layerStyle="{ background: 'rgba(255, 255, 255, 0.6)', borderRadius: '15px' }"
                :blur="5"
                position="relative"
                class="glass-root sub-menu-glass"
              >
                <ul class="submenu-list">
                  <template v-for="(sub, subIdx) in item.children" :key="subIdx">
                    <hr v-if="sub.type === 'separator'" class="menu-sep" />
                    <li v-else @click.stop="sub.click?.()">
                      <span class="check" v-if="sub.type">
                        {{ sub.type === 'radio' ? (sub.active() ? '●' : '') : (sub.active() ? '✓' : '') }}
                      </span>
                      {{ sub.label }}
                    </li>
                  </template>
                </ul>
              </LiquidGlass>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </LiquidGlass>
</div>

    <div class="taskbar-placeholder"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from "vue";
import LiquidGlass from "@/components/liquid_glass.vue";

const icons = ref([]);
const draggingIcon = ref(null);
const dragGhost = ref(null); // 随动克隆体
const offset = ref({ x: 0, y: 0 });
const currentIconSize = ref("medium");
const currentSort = ref("");
const isGridAlign = ref(true);
const isAutoArrange = ref(false);
const isAnimating = ref(true);

const menuVisible = ref(false);
const menuX = ref(0);
const menuY = ref(0);
const menuKey = ref(0);
const menuRef = ref(null);
const calculatedHeight = ref(240);

const gridSize = computed(() => {
  if (currentIconSize.value === "large") return { x: 140, y: 160 };
  if (currentIconSize.value === "small") return { x: 70, y: 80 };
  return { x: 100, y: 110 };
});


const iconSizeClass = computed(() => `size-${currentIconSize.value}`);

const saveToLocal = () =>
  localStorage.setItem("desktop_data", JSON.stringify(icons.value));

const alignToGrid = (icon) => {
  isAnimating.value = false;
  
  // 1. 计算原始目标网格坐标
  let targetX = 5 + Math.round((icon.x - 5) / gridSize.value.x) * gridSize.value.x;
  let targetY = 5 + Math.round((icon.y - 5) / gridSize.value.y) * gridSize.value.y;

  // 2. 简单的防重叠逻辑：如果位置被占用，则向下搜索空位
  const isOccupied = (x, y) => 
    icons.value.some(i => i.id !== icon.id && i.x === x && i.y === y);

  while (isOccupied(targetX, targetY)) {
    targetY += gridSize.value.y; // 如果重叠，自动垂直向下移一格
    // 如果超出屏幕高度，可以考虑移到下一列
    if (targetY + gridSize.value.y > window.innerHeight - 100) {
      targetY = 5;
      targetX += gridSize.value.x;
    }
  }

  icon.x = targetX;
  icon.y = targetY;

  // 恢复动画
  nextTick(() => { setTimeout(() => { isAnimating.value = true; }, 50); });
};

const realignAll = () => {
  isAnimating.value = true;
  
  if (isAutoArrange.value || currentSort.value) {
    // 如果有排序规则，先进行数组排序
    if (currentSort.value === 'name') {
      icons.value.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // 重新排列所有图标，填充网格
    let currentX = 5;
    let currentY = 5;
    
    icons.value.forEach((icon) => {
      icon.x = currentX;
      icon.y = currentY;
      
      currentY += gridSize.value.y;
      // 换列逻辑
      if (currentY + gridSize.value.y > window.innerHeight - 100) {
        currentY = 5;
        currentX += gridSize.value.x;
      }
    });
  } else if (isGridAlign.value) {
    // 仅网格对齐时，逐个调用防重叠逻辑
    icons.value.forEach(alignToGrid);
  }
  saveToLocal();
};

watch(currentIconSize, realignAll);

const startDrag = (e, icon) => {
  if (isAutoArrange.value) return;
  draggingIcon.value = icon;

  // 初始化坐标偏移
  const iconOffsetX = e.clientX - icon.x;
  const iconOffsetY = e.clientY - icon.y;
  offset.value = { x: iconOffsetX, y: iconOffsetY };

  // 创建一个随鼠标移动的镜像 (Ghost)
  dragGhost.value = {
    ...icon,
    x: icon.x,
    y: icon.y,
  };

  closeMenu();
};

const onDrag = (e) => {
  if (dragGhost.value) {
    // 只更新镜像的坐标，原图标 icons 里的数据保持不变
    dragGhost.value.x = e.clientX - offset.value.x;
    dragGhost.value.y = e.clientY - offset.value.y;
  }
};

const stopDrag = () => {
  if (draggingIcon.value && dragGhost.value) {
    // 停止拖动时，将镜像位置同步给原图标
    draggingIcon.value.x = dragGhost.value.x;
    draggingIcon.value.y = dragGhost.value.y;

    if (isGridAlign.value) {
      alignToGrid(draggingIcon.value);
    }

    saveToLocal();
  }
  // 清空状态
  draggingIcon.value = null;
  dragGhost.value = null;
};

const openContextMenu = (e) => {
  menuVisible.value = false;
  nextTick(() => {
    let x = e.clientX;
    let y = e.clientY;
    if (x + 360 > window.innerWidth) x -= 160;
    if (y + 300 > window.innerHeight) y -= 160;
    menuX.value = x;
    menuY.value = y;
    menuKey.value++;
    menuVisible.value = true;
    nextTick(() => {
      if (menuRef.value) calculatedHeight.value = menuRef.value.offsetHeight;
    });
  });
};

const closeMenu = () => {
  menuVisible.value = false;
};
const setIconSize = (size) => {
  currentIconSize.value = size;
  closeMenu();
};
const toggleGridAlign = () => {
  isGridAlign.value = !isGridAlign.value;
  realignAll();
  closeMenu();
};
const toggleAutoArrange = () => {
  isAutoArrange.value = !isAutoArrange.value;
  realignAll();
  closeMenu();
};

const refresh = () => {
  setTimeout(() => {
    document.querySelectorAll(".icon-item").forEach((el) => {
      el.style.display = "none";
    });
  }, 100);
  setTimeout(() => {
    document.querySelectorAll(".icon-item").forEach((el) => {
      el.style.display = "flex";
    });
  }, 200);
  closeMenu();
};

const addIcon = () => {
  const name = prompt("名称:");
  if (name) {
    const icon = {
      id: Date.now(),
      name,
      img: "",
      x: menuX.value,
      y: menuY.value,
    };
    if (isGridAlign.value) alignToGrid(icon);
    icons.value.push(icon);
    saveToLocal();
  }
  closeMenu();
};
// 定义菜单配置
const menuConfig = ref([
  {
    label: "View",
    hasSubmenu: true,
    submenuWidth: 160,
    submenuHeight: 235,
    children: [
      { label: "Large", type: "radio", active: () => currentIconSize.value === "large", click: () => setIconSize("large") },
      { label: "Medium", type: "radio", active: () => currentIconSize.value === "medium", click: () => setIconSize("medium") },
      { label: "Small", type: "radio", active: () => currentIconSize.value === "small", click: () => setIconSize("small") },
      { type: "separator" },
      { label: "Auto Arrange", type: "checkbox", active: () => isAutoArrange.value, click: toggleAutoArrange },
      { label: "Grid Align", type: "checkbox", active: () => isGridAlign.value, click: toggleGridAlign },
      { type: "separator" },
      { label: "Show desktop icons", click: refresh },
    ],
  },
  {
    label: "Sort by",
    hasSubmenu: true,
    submenuWidth: 160,
    submenuHeight: 150,
    children: [
      { label: "Name", type: "radio", active: () => currentSort.value === "name", click: () => currentSort.value = "name" },
      { label: "Type", type: "radio", active: () => currentSort.value === "type", click: () => currentSort.value = "type" },
      { label: "Size", type: "radio", active: () => currentSort.value === "size", click: () => currentSort.value = "size" },
      { label: "Date", type: "radio", active: () => currentSort.value === "date", click: () => currentSort.value = "date" },
    ],
  },
  { label: "Refresh", click: refresh },
  { type: "separator" },
  {
    label: "New",
    hasSubmenu: true,
    submenuWidth: 140,
    submenuHeight: 80,
    children: [
      { label: "Folder", click: addIcon },
      { label: "Shortcut", click: () => {} },
    ],
  },
  { type: "separator" },
  { label: "Display Settings", click: () => {} },
  { label: "Personalize", click: () => {} },
  { type: "separator" },
  { label: "Open in Terminal", click: () => {} },
  { label: "Show classic menu", click: () => {} },
]);
onMounted(() => {
  const saved = localStorage.getItem("desktop_data");
  icons.value = saved
    ? JSON.parse(saved)
    : [
        {
          id: 1,
          name: "Administrator",
          img: "/icons/imageres_88.png",
          x: 5,
          y: 5,
        },
        {
          id: 2,
          name: "This PC",
          img: "/icons/imageres_109.png",
          x: 5,
          y: 115,
        },
        {
          id: 3,
          name: "Recycle Bin",
          img: "/icons/imageres_55.png",
          x: 5,
          y: 225,
        },
        {
          id: 4,
          name: "Networks",
          img: "/icons/imageres_25.png",
          x: 5,
          y: 335,
        },
        {
          id: 5,
          name: "Microsoft Edge",
          img: "/icons/msedge_101.ico",
          x: 5,
          y: 445,
        },
      ];
});
</script>

<style scoped>
.desktop {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  user-select: none;
}
.icon-item {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0;
  border-radius: 4px;
  will-change: left, top;
  z-index: 10;
}

/* 原图标在拖动时变半透明并保持在原位 */
.is-original-dragging {
  opacity: 1;
  transition: none !important; /* 原位保持不动，不需要过渡 */
}

/* 随动镜像样式 */
.ghost-icon {
  opacity: 0.7;
  pointer-events: none; /* 镜像不能阻挡鼠标事件 */
  z-index: 100;
  transition: none !important; /* 必须关闭 transition 以减少随动延迟 */
}

.icon-item.no-transition {
  transition: none !important;
}

.icon-item:hover {
  background: linear-gradient(to right bottom,#fffa,#fff3);
  outline: #fff6 1px solid;
}

.icon-label {
  color: white;
  font-size: 12px;
  text-shadow:
    1px 1px 1px #000,
    1px 1px 2px #000,
    1px 1px 3px #000,
    1px 1px 4px #000;
  text-align: center;
}

.menu-wrapper {
  position: fixed;
  z-index: 9999;
}

:deep(.glass-root),
:deep(.glass-root > div),
:deep(.glass-root canvas) {
  overflow: visible !important;
}

.context-menu-content {
  width: 160px;
  padding: 5px 0;
  color: #333;
  font-family: sans-serif;
  font-size: 14px;
}

.context-menu-content ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.context-menu-content li {
  padding: 8px 25px;
  position: relative;
  white-space: nowrap;
}
.context-menu-content li:hover {
  background: rgba(0, 0, 0, 0.05);
}

.submenu-anchor {
  display: none;
  position: absolute;
  left: 100%;
  top: 0;
  padding-left: 4px;
  z-index: 1000;
  animation: menuexpand 0.2s ease-out forwards;
  transform-origin: top left;
}

.has-submenu:hover > .submenu-anchor {
  display: block;
}

.sub-menu-glass {
  pointer-events: auto;
  color: #000;
}

.submenu-list {
  padding: 5px 0;
}
.check {
  display: inline-block;
  width: 18px;
  margin-left: -15px;
  font-weight: bold;
}
.arrow {
  float: right;
  font-size: 10px;
  margin-top: 2px;
  opacity: 0.6;
}
.menu-sep {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  margin: 4px 0;
}

.size-medium {
  width: 74px;
  .icon-visual {
    width: 48px;
    height: 48px;
    margin-bottom: 4px;
  }
}
.size-large {
  width: 140px;
  .icon-visual {
    width: 64px;
    height: 64px;
    margin-bottom: 4px;
  }
}
.size-small {
  width: 74px;
  .icon-visual {
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
  }
}
</style>
