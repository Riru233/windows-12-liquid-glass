<template>
  <!-- 操作杆 -->
  <div
    style="
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
      flex: 1;
    "
    ref="liquidParent"
  >
    <!-- 液态玻璃 -->
    <LiquidGlass
      :width="parentWidth"
      :height="32"
      :radius="10"
      :displacementScale="150"
      :layerClass="props.selected ? 'colorful-open' : 'colorful'"
      :drag="false"
      :blur="10"
      position="relative"
      layerStyle="justify-content: center;align-items:center;"
      :precise="1"
    >
      <div
        :style="`width: 100%;height:100%;color:${props.vol<8 ? '#333':'#fff'};background: linear-gradient(to right, #39f5 0%, #39f5 ${props.vol}%,#fff0 ${props.vol}%);justify-content:center;display:flex;align-items:center;`"
      >
        <div style="margin-left: 5px">
          <slot></slot>
        </div>
        <div style="flex-grow: 1"></div>
      </div>
    </LiquidGlass>
    <!-- 液态玻璃按钮 -->
    <LiquidGlass
      v-if="props.extraBtn"
      :width="32"
      :height="32"
      :radius="10"
      :displacementScale="150"
      :layerClass="props.selected ? 'colorful-open' : 'colorful'"
      :drag="false"
      :blur="10"
      position="relative"
      layerStyle="justify-content: center;align-items:center;"
      :precise="1"
    >
      <svg
        t="1772025306103"
        class="icon"
        viewBox="0 0 1098 1024"
        style="color: #333"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1810"
        width="20"
        height="20"
      >
        <path
          d="M320.66048 512c-56.32 0-102.4 46.08-102.4 102.4s46.08 102.4 102.4 102.4 102.4-46.08 102.4-102.4-46.08-102.4-102.4-102.4z m0 153.6c-28.16 0-51.2-23.04-51.2-51.2s23.04-51.2 51.2-51.2 51.2 23.04 51.2 51.2-23.04 51.2-51.2 51.2zM551.06048 256c-56.32 0-102.4 46.08-102.4 102.4s46.08 102.4 102.4 102.4 102.4-46.08 102.4-102.4-46.08-102.4-102.4-102.4z m0 153.6c-28.16 0-51.2-23.04-51.2-51.2s23.04-51.2 51.2-51.2 51.2 23.04 51.2 51.2-23.04 51.2-51.2 51.2z m230.4 204.8c-56.32 0-102.4 46.08-102.4 102.4s46.08 102.4 102.4 102.4 102.4-46.08 102.4-102.4-46.08-102.4-102.4-102.4z m0 153.6c-28.16 0-51.2-23.04-51.2-51.2s23.04-51.2 51.2-51.2 51.2 23.04 51.2 51.2-23.04 51.2-51.2 51.2z"
          p-id="1812"
          fill="currentColor"
        ></path>
        <path
          d="M551.06048 256c7.68 0 17.92 2.56 25.6 2.56V179.2c0-15.36-10.24-25.6-25.6-25.6s-25.6 10.24-25.6 25.6v79.36c7.68 0 17.92-2.56 25.6-2.56z m0 204.8c-7.68 0-17.92-2.56-25.6-2.56V844.8c0 15.36 10.24 25.6 25.6 25.6s25.6-10.24 25.6-25.6V458.24c-7.68 0-17.92 2.56-25.6 2.56z m230.4 153.6c7.68 0 17.92 2.56 25.6 2.56V179.2c0-15.36-10.24-25.6-25.6-25.6s-25.6 10.24-25.6 25.6v437.76c7.68 0 17.92-2.56 25.6-2.56z m0 204.8c-7.68 0-17.92-2.56-25.6-2.56v28.16c0 15.36 10.24 25.6 25.6 25.6s25.6-10.24 25.6-25.6v-28.16c-7.68 0-17.92 2.56-25.6 2.56z m-460.8-307.2c7.68 0 17.92 2.56 25.6 2.56V179.2c0-15.36-10.24-25.6-25.6-25.6s-25.6 10.24-25.6 25.6v335.36c7.68 0 17.92-2.56 25.6-2.56z m0 204.8c-7.68 0-17.92-2.56-25.6-2.56V844.8c0 15.36 10.24 25.6 25.6 25.6s25.6-10.24 25.6-25.6v-130.56c-7.68 0-17.92 2.56-25.6 2.56z"
          p-id="1813"
          fill="currentColor"
        ></path>
      </svg>
    </LiquidGlass>
  </div>
</template>
<script setup>
import LiquidGlass from "@/components/liquid_glass.vue";
import { onMounted, ref, onUnmounted } from "vue";
const props = defineProps({
  selected: { type: Boolean, default: false },
  title: { type: String, default: "" },
  vol: { type: Number, default: 0 },
  extraBtn: { type: Number, default: 0 },
});
const liquidParent = ref(null);
const parentWidth = ref(100); // 默认初始值

// 监听父元素尺寸变化
let resizeObserver;

onMounted(() => {
  if (liquidParent.value) {
    // 初始化宽度
    parentWidth.value = liquidParent.value.offsetWidth;

    // 监听宽度变化
    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // 更新宽度，LiquidGlass 内部的 watch 会被触发重绘
        parentWidth.value = entry.contentRect.width;
      }
    });
    resizeObserver.observe(liquidParent.value);
  }
});

const updateVolByMouse = (clientX) => {
  if (!liquidParent.value || parentWidth.value <= 0) return;
  
  const rect = liquidParent.value.getBoundingClientRect();
  // 1. 计算鼠标相对于组件左侧的像素位移
  const offsetX = clientX - rect.left;
  
  // 2. 将位移转换为 0-100 的数值
  // parentWidth 是我们之前做响应式计算出的主进度条宽度
  let newValue = (offsetX / parentWidth.value) * 100;
  
  // 3. 边界约束
  newValue = Math.max(0, Math.min(100, newValue));
  
  // 4. 发送给父组件 (如果是 v-model:vol)
  emit("update:vol", newValue);
};

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect();
});
</script>

<style scoped>
.glass-component {
  transition: all 0.3s ease-out;
}
.glass-component:hover {
  box-shadow: #a8dbff91 0px 0px 10px 10px;
  transform: scale(1.1);
  z-index:999
}
</style>
