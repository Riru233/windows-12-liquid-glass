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
      :class="[iconSizeClass, { 'is-dragging': draggingIcon?.id === icon.id }]"
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
      <!-- <div class="btn-delete" @click.stop="removeIcon(icon.id)">×</div> -->
    </div>

    <div
      v-if="menuVisible"
      class="menu-wrapper"
      :style="{ left: menuX + 'px', top: menuY + 'px' }"
      @click.stop
    >
      <LiquidGlass
        :key="'main-' + menuKey"
        :width="180"
        :height="calculatedHeight"
        :radius="15"
        :displacementScale="150"
        :layerStyle="{
          background: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '15px',
        }"
        :blur="1"
        position="relative"
        :precise="1"
        class="glass-root main-menu"
      >
        <div class="context-menu-content" ref="menuRef">
          <ul>
            <li class="has-submenu">
              View <span class="arrow">▶</span>
              <div class="submenu-anchor">
                <LiquidGlass
                  :width="160"
                  :height="190"
                  :radius="15"
                  :displacementScale="150"
                  :layerStyle="{
                    background: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '15px',
                  }"
                  :blur="1"
                  position="relative"
                  class="glass-root sub-menu-glass"
                >
                  <ul class="submenu-list">
                    <li @click="setIconSize('large')">
                      <span class="check">{{
                        currentIconSize === "large" ? "●" : ""
                      }}</span
                      >Large
                    </li>
                    <li @click="setIconSize('medium')">
                      <span class="check">{{
                        currentIconSize === "medium" ? "●" : ""
                      }}</span
                      >Medium
                    </li>
                    <li @click="setIconSize('small')">
                      <span class="check">{{
                        currentIconSize === "small" ? "●" : ""
                      }}</span
                      >Small
                    </li>
                    <hr class="menu-sep" />
                    <li @click="toggleAutoArrange">
                      <span class="check">{{ isAutoArrange ? "✓" : "" }}</span
                      >Auto Arrange
                    </li>
                    <li @click="toggleGridAlign">
                      <span class="check">{{ isGridAlign ? "✓" : "" }}</span
                      >Grid Align
                    </li>
                  </ul>
                </LiquidGlass>
              </div>
            </li>
            <li @click="refresh">Refresh</li>
            <hr class="menu-sep" />
            <li class="has-submenu">
              New <span class="arrow">▶</span>
              <div class="submenu-anchor">
                <LiquidGlass
                  :width="140"
                  :height="80"
                  :radius="15"
                  :layerStyle="{
                    background: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '15px',
                  }"
                  :blur="1"
                  position="relative"
                  class="glass-root sub-menu-glass"
                >
                  <ul class="submenu-list">
                    <li @click="addIcon">Folder</li>
                    <li>Shortcut</li>
                  </ul>
                </LiquidGlass>
              </div>
            </li>
            <hr class="menu-sep" />
            <li>Display Settings</li>
            <li>Personalization</li>
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

// --- 逻辑部分 (保持核心功能) ---
const icons = ref([]);
const draggingIcon = ref(null);
const offset = ref({ x: 0, y: 0 });
const currentIconSize = ref("medium");
const isGridAlign = ref(true);
const isAutoArrange = ref(false);
const menuVisible = ref(false);
const menuX = ref(0);
const menuY = ref(0);
const menuKey = ref(0);
const menuRef = ref(null);
const calculatedHeight = ref(210);

const gridSize = computed(() => {
  if (currentIconSize.value === "large") return { x: 140, y: 160 };
  if (currentIconSize.value === "small") return { x: 70, y: 80 };
  return { x: 100, y: 110 };
});
const iconSizeClass = computed(() => `size-${currentIconSize.value}`);
const saveToLocal = () =>
  localStorage.setItem("desktop_data", JSON.stringify(icons.value));
const alignToGrid = (icon) => {
  icon.x = Math.round(icon.x / gridSize.value.x) * gridSize.value.x;
  icon.y = Math.round(icon.y / gridSize.value.y) * gridSize.value.y;
};
const realignAll = () => {
  if (isAutoArrange.value)
    icons.value.forEach((icon, i) => {
      icon.x = 20;
      icon.y = 20 + i * gridSize.value.y;
    });
  else if (isGridAlign.value) icons.value.forEach(alignToGrid);
  saveToLocal();
};
watch(currentIconSize, realignAll);

const startDrag = (e, icon) => {
  if (isAutoArrange.value) return;
  draggingIcon.value = icon;
  offset.value = { x: e.clientX - icon.x, y: e.clientY - icon.y };
  closeMenu();
};
const onDrag = (e) => {
  if (draggingIcon.value) {
    draggingIcon.value.x = e.clientX - offset.value.x;
    draggingIcon.value.y = e.clientY - offset.value.y;
  }
};
const stopDrag = () => {
  if (draggingIcon.value) {
    if (isGridAlign.value) alignToGrid(draggingIcon.value);
    draggingIcon.value = null;
    saveToLocal();
  }
};

const openContextMenu = (e) => {
  menuVisible.value = false;
  nextTick(() => {
    let x = e.clientX;
    let y = e.clientY;
    if (x + 360 > window.innerWidth) x -= 180;
    if (y + 300 > window.innerHeight) y -= 200;
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
const removeIcon = (id) => {
  icons.value = icons.value.filter((i) => i.id !== id);
  saveToLocal();
};

onMounted(() => {
  const saved = localStorage.getItem("desktop_data");
  icons.value = saved
    ? JSON.parse(saved)
    : [
        { id: 1, name: "Administrator", img: "/public/icons/imageres_88.png", x: 5, y: 5 },
        { id: 2, name: "This PC", img: "/public/icons/imageres_109.png", x: 5, y: 115 },
        { id: 3, name: "Recycle Bin", img: "/public/icons/imageres_55.png", x: 5, y: 225 },
        { id: 4, name: "Networks", img: "/public/icons/imageres_25.png", x: 5, y: 335 },
        { id: 5, name: "Microsoft Edge", img: "/public/icons/msedge_101.ico", x: 5, y: 445 },
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
  padding: 5px;
  border-radius: 4px;
  transition:
    left 0.2s ease-out,
    top 0.2s ease-out;
}
.icon-item:hover {
  background: rgba(255, 255, 255, 0.2);
}
.icon-visual {
  width: 48px;
  height: 48px;
  margin-bottom: 4px;
}
.icon-label {
  color: white;
  font-size: 12px;
  text-shadow: 1px 1px 1px #000,1px 1px 2px #000,1px 1px 4px #000;
  text-align: center;
}

/* --- 菜单材质修正核心样式 --- */
.menu-wrapper {
  position: fixed;
  z-index: 9999;
}

/* 关键：必须解除所有父层级 LiquidGlass 的裁剪，否则子级玻璃无法渲染 */
:deep(.glass-root),
:deep(.glass-root > div),
:deep(.glass-root canvas) {
  overflow: visible !important;
}

.context-menu-content {
  width: 180px;
  padding: 5px 0;
  color: #333;
  font-family: sans-serif;
  font-size: 13px;
}

.context-menu-content ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.context-menu-content li {
  padding: 8px 25px;
  position: relative; /* 子菜单以此为基准 */
  white-space: nowrap;
}
.context-menu-content li:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* 二级菜单锚点：负责定位和隐藏显示 */
.submenu-anchor {
  display: none;
  position: absolute;
  left: 100%;
  top: 0;
  padding-left: 4px; /* 留出一点缝隙，防止重叠过于死板 */
  z-index: 1000;
  /* 增加投影，强化玻璃堆叠的体积感 */
}

.has-submenu:hover > .submenu-anchor {
  display: block;
}

/* 强制二级玻璃材质属性 */
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

.btn-delete {
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background: #ff4d4f;
  color: white;
  border-radius: 50%;
  display: none;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  cursor: pointer;
}
.icon-item:hover .btn-delete {
  display: flex;
}
.size-medium {
  width: 64px;
}
</style>
