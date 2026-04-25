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
        <div style="width: 100%; display: flex; padding: 20px; gap: 10px">
          <div>
            <!-- copilot -->
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
              style="height: 16px; width: 16px; margin-top: 3px">
              <path
                d="M22.9253 4.97196C22.5214 3.79244 21.4126 3 20.1658 3L18.774 3C17.3622 3 16.1532 4.01106 15.9033 5.40051L14.4509 13.4782L15.0163 11.5829C15.3849 10.347 16.5215 9.5 17.8112 9.5L23.0593 9.5L25.3054 10.809L27.4705 9.5H26.5598C25.313 9.5 24.2042 8.70756 23.8003 7.52804L22.9253 4.97196Z"
                fill="url(#zqv70o08-paint0_radial_262034_2117)"></path>
              <path
                d="M9.39637 27.0147C9.79613 28.2011 10.9084 29 12.1604 29H14.5727C16.1772 29 17.4805 27.704 17.4893 26.0995L17.5315 18.4862L16.9699 20.4033C16.6058 21.6461 15.4659 22.5 14.1708 22.5H8.88959L6.96437 21.0214L4.88007 22.5H5.78013C7.03206 22.5 8.14435 23.299 8.54411 24.4853L9.39637 27.0147Z"
                fill="url(#zqv70o08-paint1_radial_262034_2117)"></path>
              <path
                d="M19.7501 3H8.81266C5.68767 3 3.81268 7.08916 2.56269 11.1783C1.08177 16.0229 -0.856044 22.5021 4.75017 22.5021H9.66051C10.9615 22.5021 12.105 21.6415 12.4657 20.3915C13.2784 17.5759 14.7501 12.4993 15.9014 8.65192C16.4758 6.73249 16.9543 5.08404 17.6886 4.05749C18.1003 3.48196 18.7864 3 19.7501 3Z"
                fill="url(#zqv70o08-paint2_radial_262034_2117)"></path>
              <path
                d="M19.7501 3H8.81266C5.68767 3 3.81268 7.08916 2.56269 11.1783C1.08177 16.0229 -0.856044 22.5021 4.75017 22.5021H9.66051C10.9615 22.5021 12.105 21.6415 12.4657 20.3915C13.2784 17.5759 14.7501 12.4993 15.9014 8.65192C16.4758 6.73249 16.9543 5.08404 17.6886 4.05749C18.1003 3.48196 18.7864 3 19.7501 3Z"
                fill="url(#zqv70o08-paint3_linear_262034_2117)"></path>
              <path
                d="M12.2478 29H23.1852C26.3102 29 28.1852 24.9103 29.4352 20.8207C30.9161 15.9755 32.854 9.49548 27.2477 9.49548H22.3375C21.0364 9.49548 19.893 10.3562 19.5322 11.6062C18.7196 14.4221 17.2479 19.4994 16.0965 23.3474C15.5221 25.2671 15.0436 26.9157 14.3093 27.9424C13.8976 28.518 13.2115 29 12.2478 29Z"
                fill="url(#zqv70o08-paint4_radial_262034_2117)"></path>
              <path
                d="M12.2478 29H23.1852C26.3102 29 28.1852 24.9103 29.4352 20.8207C30.9161 15.9755 32.854 9.49548 27.2477 9.49548H22.3375C21.0364 9.49548 19.893 10.3562 19.5322 11.6062C18.7196 14.4221 17.2479 19.4994 16.0965 23.3474C15.5221 25.2671 15.0436 26.9157 14.3093 27.9424C13.8976 28.518 13.2115 29 12.2478 29Z"
                fill="url(#zqv70o08-paint5_linear_262034_2117)"></path>
              <defs>
                <radialGradient id="zqv70o08-paint0_radial_262034_2117" cx="0" cy="0" r="1"
                  gradientTransform="matrix(-7.37821 -8.55084 -7.96607 7.17216 25.5747 13.5466)"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.0955758" stop-color="#00AEFF"></stop>
                  <stop offset="0.773185" stop-color="#2253CE"></stop>
                  <stop offset="1" stop-color="#0736C4"></stop>
                </radialGradient>
                <radialGradient id="zqv70o08-paint1_radial_262034_2117" cx="0" cy="0" r="1"
                  gradientTransform="matrix(6.61516 7.92888 7.80904 -6.47171 7.1753 21.9482)"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FFB657"></stop>
                  <stop offset="0.633728" stop-color="#FF5F3D"></stop>
                  <stop offset="0.923392" stop-color="#C02B3C"></stop>
                </radialGradient>
                <radialGradient id="zqv70o08-paint2_radial_262034_2117" cx="0" cy="0" r="1"
                  gradientTransform="matrix(-0.990905 -17.2799 98.0282 -5.51056 8.54161 22.4952)"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.03" stop-color="#FFC800"></stop>
                  <stop offset="0.31" stop-color="#98BD42"></stop>
                  <stop offset="0.49" stop-color="#52B471"></stop>
                  <stop offset="0.843838" stop-color="#0D91E1"></stop>
                </radialGradient>
                <linearGradient id="zqv70o08-paint3_linear_262034_2117" x1="9.52186" y1="3" x2="10.3572" y2="22.5029"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#3DCBFF"></stop>
                  <stop offset="0.246674" stop-color="#0588F7" stop-opacity="0"></stop>
                </linearGradient>
                <radialGradient id="zqv70o08-paint4_radial_262034_2117" cx="0" cy="0" r="1"
                  gradientTransform="matrix(-8.64067 24.4636 -29.4075 -10.797 27.8096 7.58585)"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.0661714" stop-color="#8C48FF"></stop>
                  <stop offset="0.5" stop-color="#F2598A"></stop>
                  <stop offset="0.895833" stop-color="#FFB152"></stop>
                </radialGradient>
                <linearGradient id="zqv70o08-paint5_linear_262034_2117" x1="28.6736" y1="8.30469" x2="28.6627"
                  y2="13.617" gradientUnits="userSpaceOnUse">
                  <stop offset="0.0581535" stop-color="#F8ADFA"></stop>
                  <stop offset="0.708063" stop-color="#A86EDD" stop-opacity="0"></stop>
                </linearGradient>
              </defs>
            </svg>
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
import SlideCapsule from "./control-components/slide-capsule.vue";
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
