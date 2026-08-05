<template>
  <LiquidGlass
    :width="800"
    :height="650"
    :radius="20"
    :displacementScale="150"
    layerClass="colorful-start"
    :drag="false"
    :blur="3"
    position="relative"
    :layerStyle="`padding: 30px;gap:3px;background: #fffa;box-shadow: 0 0 10px #333;`"
    :precise="0.1"
    :config_layer2="{
      gamma: 1.8,
      deadzone: 0.8,
      edge: 1.8,
      isInward: true,
    }"
  >
    <div v-for="section in appSections" :key="section.id" class="section">
      <div class="section-title">{{ section.title }}</div>
      <div :class="['apps-container', viewMode]">
        <Stick
          v-for="app in section.apps"
          :key="app.name"
          :title="app.name"
          bg="#fff0"
          :viewMode="viewMode"
        >
          <img :src="app.icon" class="icon-img" />
        </Stick>
      </div>
    </div>
  </LiquidGlass>
</template>

<script setup>
import { ref } from "vue";
import Stick from "./stick.vue";
import LiquidGlass from "@/components/liquid_glass.vue";

const viewMode = ref("grid");

// 将应用数据抽离成数组，方便后期动态增加或修改
const appSections = ref([
  {
    id: "pinned",
    title: "Pinned",
    apps: [
      { name: "Microsoft Store", icon: "/icons/ms-store.png" },
      { name: "Edge", icon: "/icons/msedge_101.ico" },
      { name: "Copilot", icon: "/icons/copilot.png" },
      { name: "Settings", icon: "/icons/settings/logo.scale-100.png" },
      {
        name: "Security Center",
        icon: "/icons/WindowsSecurityAppList.scale-125_contrast-white.png",
      },
    ],
  },
  {
    id: "maintenance",
    title: "Recent apps",
    apps: [{ name: "Settings", icon: "/icons/settings/logo.scale-100.png" }],
  },
]);
</script>

<style scoped>
.page-wrapper {
  padding: 20px;
  color: white;
}

.toolbar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.toolbar button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.toolbar button.active {
  background: #0078d4;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 16px;
  margin-bottom: 15px;
  color: #333;
  text-shadow: 2px 2px 2px #0003;
}

/* 核心布局逻辑 */
.apps-container {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  gap: 15px;
}

.apps-container.list {
  flex-direction: column; /* 列表模式纵向排列 */
  max-width: 400px; /* 限制列表宽度，防止拉得太长 */
}

.icon-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
