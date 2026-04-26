<template>
  <div class="bg" :style="props.panel == 'panel-open'
    ? 'transform: scale(1)'
    : `right:0;bottom:0;width:0;height:0;`
    " style="transition: all 0.3s ease">
    <div class="mask-ur-from-70-to-100"></div>
    <div class="mask-ur-from-50-to-75"></div>
    <div class="mask-ur-from-20-to-55"></div>
  </div>
  <div class="control-container" :class="props.panel">
    <!-- 第一层：询问Copilot -->
    <div style="width: calc(100% - 30px); margin: 15px 0 15px 15px; display: flex;">
      <TopButton :width="800" :height="36" :radius="18">
        <div style="width: 100%; display: flex; padding: 20px; gap: 10px;align-items: center;">
          <div>
            <!-- copilot -->
            <img src="/icons/copilot.png" alt="" width="16px" style="margin: 0;padding: 0;">
          </div>
          <div>
            <i>Ask Copilot</i>
          </div>
        </div>
      </TopButton>
    </div>
    <!-- 第二层：标签 -->
    <div style="width: calc(100% - 30px); margin: 15px 0 15px 15px; display: flex;gap: 5px;">
      <TopButton :width="60" :height="36" :radius="18" style="border-radius: 16px;filter: none" :selected="true">Start
      </TopButton>
      <TopButton :width="90" :height="36" :radius="18" style="border-radius: 16px;filter: none;">All Apps</TopButton>
      <TopButton :width="120" :height="36" :radius="18" style="border-radius: 16px;filter: none;">Recommend</TopButton>
    </div>
    <!-- 第三层：动态磁贴 -->
    <StickPage style="margin: 15px 0 15px 15px" />
    <!-- 第四层：底部操作 -->
    <div
      style="width: calc(100% - 30px); margin: 15px 0 15px 15px; display: flex;gap: 5px;justify-content: center;align-items: center;">
      <TopButton :width="36" :height="36" :radius="18" style="border-radius: 16px;filter: none;" :selected="false">
        #
      </TopButton>
      <div style="color: #fff;text-shadow: #000 0 0 2px,#000 0 0 4px;">Administrator</div>
      <div style="flex-grow: 1;"></div>
      <TopButton :width="36" :height="36" :radius="18" style="border-radius: 15px;filter: none;" :selected="true" selected-color="#f006">
        <svg t="1775055767259" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="17479" width="18px" height="18px">
          <path
            d="M350.037333 205.653333a32 32 0 0 1 27.050667 58.026667A320.426667 320.426667 0 0 0 192 554.282667c0 176.981333 143.274667 320.426667 319.957333 320.426666s319.957333-143.445333 319.957334-320.426666a320.426667 320.426667 0 0 0-184.448-290.304 32 32 0 1 1 27.178666-57.941334 384.426667 384.426667 0 0 1 221.269334 348.245334c0 212.309333-171.904 384.426667-384 384.426666C299.904 938.666667 128 766.549333 128 554.24a384.426667 384.426667 0 0 1 222.037333-348.586667zM512 106.496a32 32 0 0 1 31.701333 27.648l0.298667 4.352v320a32 32 0 0 1-63.701333 4.352l-0.298667-4.352v-320a32 32 0 0 1 32-32z"
            p-id="17480" fill="currentColor"></path>
        </svg>
      </TopButton>
    </div>
  </div>
</template>
<script setup>
import StickPage from "./start-components/stick-page.vue";
import TopButton from "./start-components/top-button.vue";
import { ref, reactive } from "vue";
const stat = reactive({
  bright: 50,
  vol: 80,
});

const props = defineProps({
  panel: {
    type: String,
    default: "panel-init",
  },
});
// --- 拖拽逻辑实现 ---
const dragInfo = ref({
  isDragging: false,
  targetKey: null, // 'bright' 或 'vol'
  startX: 0,
  startValue: 0,
});

/**
 * 开始拖拽
 * @param {MouseEvent} e
 * @param {string} key 'bright' | 'vol' */
const startDrag = (e, key) => {
  dragInfo.value.isDragging = true;
  dragInfo.value.targetKey = key;
  dragInfo.value.startX = e.clientX;
  dragInfo.value.startValue = stat[key];

  // 防止拖拽过程中选中文本
  e.preventDefault();
};

/**
 * 拖拽中处理
 */
const handleDragging = (e) => {
  if (!dragInfo.value.isDragging) return;

  const { startX, startValue, targetKey } = dragInfo.value;
  const currentX = e.clientX;

  // 计算偏移量
  // 假设整个胶囊宽度大约 300px，你可以调整此处的除数来改变灵敏度
  // 3 表示 3px 移动对应 1% 的变化
  const diff = Math.floor((currentX - startX) / 3.5);

  let newValue = startValue + diff;

  // 边界约束 0-100
  if (newValue < 0) newValue = 0;
  if (newValue > 100) newValue = 100;

  stat[targetKey] = newValue;
};

/**
 * 停止拖拽
 */
const stopDrag = () => {
  dragInfo.value.isDragging = false;
  dragInfo.value.targetKey = null;
};
</script>
<style scoped>
@import "/src/assets/gradientblur.css";

.bg {
  left: 0px;
  bottom: 0px;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle at 0% calc(100% 200px),
      rgba(0, 0, 0, 0.171) 50%,
      transparent 65%) repeat;
  position: fixed;
  z-index: 998;
}

.control-container {
  position: fixed;
  justify-content: center;
  align-items: center;
  left: 20px;
  bottom: 30px;
  width: 820px;
  height: 835px;
  overflow-y: none;
  z-index: 999;
}

.six-flex {
  display: flex;
  flex-direction: row;
  margin: 15px 0 0 15px;
  flex-wrap: wrap;
  gap: 10px;
}

@keyframes panel-open {
  0% {
    transform: translateY(200%);
  }
  100% {

  }
}

@keyframes panel-close {
  0% {
    
  }
  100% {
    transform: translateY(200%);
  }
}

.panel-open {
  animation: panel-open 0.3s cubic-bezier(0,0,0,1) forwards;
}

.panel-init {
  bottom: -200px;
  gap: 5px;
  display: flex;
  transform: scaleY(3) translateY(300px);
  pointer-events: none;
}

.panel-close {
  animation: panel-close 0.3s cubic-bezier(1,1,0,0) forwards;
  pointer-events: none;
}
</style>
<style>
.colorful-start {
  background-color: #f8f8f866;
  transition: all 0.3s ease-in-out;
}

.colorful-open-start {
  background-color: #0023f563;
  transition: all 0.3s ease-in-out;
}

.colorful-start:hover {
  background-color: #ffffff96;
}

.colorful-start:hover svg {
  filter: none;
}

.colorful-open-start:hover {
  background-color: #006af56c;
}
</style>
