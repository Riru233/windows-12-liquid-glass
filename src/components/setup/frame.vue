<template>
  <!-- 任务栏 -->
  <Taskbar />
  <div class="desktop-icon">
    <img src="/public/icons/setup_1000.ico" alt="" style="width: 48px" />
    <div
      style="
        text-wrap: inherit;
        width: 64px;
        font-weight: 500;
        text-align: center;
        font-size: 12px;
        color: #fff;
        text-shadow: 1px 1px 1px #000,1px 1px 2px #000,1px 1px 3px #000,1px 1px 4px #000;
      "
    >
      Install Windows 12
    </div>
  </div>
  <div class="setup-container">
    <!-- 安装程序窗口 -->
    <div class="window-frame" ref="windowFrame" :style="props.delay == 0 ? '' : `animation: anim 0.3s cubic-bezier(0, 1, 0, 1) forwards;opacity:0;animation-delay: ${props.delay}ms;`">
      <!-- 标题栏 -->
      <div class="title-bar" @mousedown="startDrag">
        <img
          src="/public/icons/setup_1000.ico"
          alt=""
          style="width: 16px; height: 16px; padding: 0 5px"
        />
        <div class="title">Windows 12 Setup</div>
        <div style="flex-grow: 1"></div>
        <div class="window-controls">
          <div
            style="
              display: flex;
              flex-direction: row;
              height: 24px;
              align-items: center;
              font-size: 14px;
            "
          >
            <div class="winBtnBasicHov-std">
              <svg class="icon windowBtnStdBasic" viewBox="0 0 1024 1024">
                <path
                  d="M160.213333 533.333333h703.658667a32 32 0 0 0 0-64H160.213333a32 32 0 0 0 0 64z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div class="winBtnBasicHov-std">
              <svg class="icon windowBtnStdBasic" viewBox="0 0 1024 1024">
                <path
                  d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"
                  fill="#ccc"
                ></path>
              </svg>
            </div>
            <div class="winBtnBasicHov-close" @click="close">
              <svg class="icon windowBtnCloseBasic" viewBox="0 0 1024 1024">
                <path
                  d="M187.605333 194.304l3.114667-3.584a32 32 0 0 1 41.642667-3.114667l3.584 3.114667L512 466.730667l276.053333-276.053334a32 32 0 1 1 45.226667 45.269334L557.269333 512l276.053334 276.053333a32 32 0 0 1 3.072 41.642667l-3.114667 3.584a32 32 0 0 1-41.642667 3.114667l-3.584-3.114667L512 557.269333l-276.053333 276.053334a32 32 0 0 1-45.226667-45.269334L466.730667 512l-276.053334-276.053333a32 32 0 0 1-3.072-41.642667l3.114667-3.584-3.114667 3.584z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import Taskbar from "/src/views/setup/components/taskbar/index_mode2.vue";
const router = useRouter();

const props = defineProps({
  delay: {
    type: Number,
    default: 0,
  },
});

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

const windowFrame = ref(null);

const startDrag = (e) => {
  if (e.target.closest(".windowBtnCloseBasic") || e.target.closest("button")) return;
  isDragging = true;
  const el = windowFrame.value;
  offsetX = e.clientX - el.getBoundingClientRect().left;
  offsetY = e.clientY - el.getBoundingClientRect().top;
  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", stopDrag);
  e.preventDefault();
};

const handleDrag = (e) => {
  if (!isDragging) return;
  const el = windowFrame.value;
  let l = e.clientX - offsetX;
  let t = e.clientY - offsetY;
  el.style.left = `${Math.max(-window.innerWidth, Math.min(l, window.innerWidth - 30))}px`;
  el.style.top = `${Math.max(30, Math.min(t, window.innerHeight - 30))}px`;
  localStorage.setItem("winPosLeft", `${el.style.left}`);
  localStorage.setItem("winPosTop", `${el.style.top}`);
};

const stopDrag = () => {
  isDragging = false;
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDrag);
};

// import { onMounted } from "vue";
// function lockFrame() {
//   const start = performance.now();
//   // 强制阻塞 33ms
//   while (performance.now() - start < 10) {
//     // 啥也不干，死等
//   }
//   requestAnimationFrame(lockFrame);
// }

// onMounted(() => {
//   lockFrame();
// });

const close = () => {
  router.push("/setup/step1");
};

onMounted(()=> {
  localStorage.getItem("winPosLeft") && (windowFrame.value.style.left = localStorage.getItem("winPosLeft"));
  localStorage.getItem("winPosTop") && (windowFrame.value.style.top = localStorage.getItem("winPosTop"));
})
</script>
<style>
@keyframes anim {
  0% {
    transform: scale(0.5) perspective(1000px) rotate3d(0.5, 0, 0, -45deg);
    opacity: 0;
  }

  100% {
    transform: scale(1) perspective(1000px) rotate3d(0, 0, 0, 0deg);
    opacity: 1;
  }
}

@keyframes anim-reverse {
  0% {
    transform: scale(1) perspective(1000px) rotate3d(0, 0, 0, 0deg);
    opacity: 1;
  }

  100% {
    transform: scale(0.5) perspective(1000px) rotate3d(0.5, 0, 0, 45deg);
    opacity: 0;
  }
}

/* 全局样式重置 */
body {
  margin: 0;
  padding: 0;
  background: rgba(0, 89, 255);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: "Segoe UI", Tahoma, Helvetica, Sans-Serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(0, 0, 0);
}

.setup-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* 模拟窗口外边框 */
.window-frame {
  width: 800px;
  height: 600px;
  position: fixed;
  border: 1px solid #717273;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

/* 标题栏 */
.title-bar {
  height: 32px;
  background-color: #d8d8d8;
  color: #333;
  display: flex;
  cursor: default;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}
.title {
  flex: 1;
}
.mini-icon {
  width: 14px;
  margin-right: 5px;
}
.window-controls .ctrl {
  padding: 0 10px;
  cursor: pointer;
  font-size: 16px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 300;
  text-align: left;
  width: 100%;
  color: cornflowerblue;
  margin: 20px 0 0 0;
}

/* 页面主体 */
.content {
  flex: 1;
  padding: 10px 40px;
  display: flex;
  flex-direction: column;
  align-items: left;
}

.logo-section {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}
/* 表单区域 */
.form-section {
  width: 100%;
  max-width: 600px;
}
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.form-group label {
  flex: 1;
  text-align: left;
  margin-right: 15px;
  font-size: 14px;
}
.form-group select {
  width: 280px;
  height: 25px;
  background: white;
  border: 1px solid #7a7a7a;
  padding-left: 5px;
}

.hint-text {
  margin-top: 60px;
  font-size: 13px;
}

/* 底部按钮区 */

.footer {
  height: 35px;
  width: calc(100% - 40px);
  display: flex;
  flex-direction: row;
  margin: 10px 20px;
  gap: 20px;
}
.textbtn {
  color: #888;
  font-size: 12px;
}
.textbtn-content {
  padding: 10px 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fillbtn,
.fillbtnnext {
  padding: 3px 40px;
  background-color: #e2e2e2;
  border-top: 2px #fffa solid;
  border-bottom: 1px #fffa solid;
  border-left: none;
  border-right: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  outline: #d6d6d6 solid 1px;
  margin-bottom: 10px;
  cursor: pointer;
}
.fillbtnnext:hover {
  outline: #7aa4ff solid 1px;
  background-color: #d6e3ff;
}
.fillbtn:hover {
  outline: #cccccc solid 1px;
  background-color: #e6e6e6;
}

.fillbtn:disabled,
.fillbtnnext:disabled {
  background-color: #e9e9e9;
  outline: #b3b3b3 solid 1px !important;
  cursor: not-allowed;
}
.winBtnBasicHov-close {
  padding: 5px 16px;
  color: #333;
}
.winBtnBasicHov-std {
  padding: 5px 16px;
  color: #333;
}
.winBtnBasicHov-std:hover {
  background-color: #e1e1e1;
  color: #333;
}
.winBtnBasicHov-close:hover {
  background-color: #e81123;
  color: #fff;
}
.radio-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
/* 
单选框 
*/
/* 容器设置 */
.style-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
  position: relative;
  font-family: sans-serif;
}

/* 1. 隐藏原生输入框 */
.style-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* 2. 创建自定义外圈 */
.checkmark {
  height: 16px;
  width: 16px;
  background-color: #eee;
  outline: #555 solid 1px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
  transition: all 0.3s ease;
  position: relative;
}

/* 鼠标悬停效果 */
.style-radio:hover input ~ .checkmark {
  background-color: rgba(233, 233, 233, 0.39);
}

.style-radio:hover input:checked ~ .checkmark {
  background-color: #2195f359;
}
/* 点击触发 */
.style-radio:active input ~ .checkmark,
.style-radio:active input:checked ~ .checkmark {
  background-color: rgba(161, 161, 161, 0.37);
  transform: scale(4) rotate(135deg);
  border-top: 1px solid #dededeaa;
  border-bottom: 1px solid #dededeaa;
  height: 14px;
  outline: none;
}
/* 拟态玻璃备用 */
/* .style-radio:active input ~ .checkmark,
.style-radio:active input:checked ~ .checkmark {
  background-color: rgba(206, 206, 206, 0);
  backdrop-filter: url(#radio-1);
  transform: scale(4) rotate(135deg);
  border-top: 1px solid #dededeaa;
  border-bottom: 1px solid #dededeaa;
  height:14px;
  box-shadow: #000a 0px 0px 10px;
  outline: none;
} */
.style-radio:active input:checked ~ .checkmark::after {
  display: none;
}

/* 3. 选中时的外圈颜色 */
.style-radio input:checked ~ .checkmark {
  background-color: #0065b8;
  outline: #0065b8 1px solid;
}

/* 4. 创建选中的内点 (实心圆) */
.checkmark::after {
  content: "";
  position: absolute;
  display: none;
  top: 5px;
  left: 5px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
}

/* 选中时显示内点 */
.style-radio input:checked ~ .checkmark::after {
  display: block;
}

/* 
复选框 
*/
/* 复选框容器 */
.style-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
  position: relative;
  font-family: sans-serif;
  user-select: none; /* 防止点击过快选中文字 */
}

/* 1. 隐藏原生输入框 */
.style-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* 2. 创建自定义方框 */
.checkbox-box {
  height: 16px;
  width: 16px;
  background-color: #eee;
  outline: #555 solid 1px;
  border-radius: 2px; /* 复选框通常是方角或微圆角 */
  margin-right: 10px;
  display: inline-block;
  position: relative;
  transition: all 0.3s ease;
}

/* 鼠标悬停效果 */
.style-checkbox:hover input ~ .checkbox-box {
  background-color: rgba(233, 233, 233, 0.39);
}

.style-checkbox:hover input:checked ~ .checkbox-box {
  background-color: #2195f359;
}

.style-checkbox:active input ~ .checkbox-box,
.style-checkbox:active input:checked ~ .checkbox-box {
  background-color: rgba(161, 161, 161, 0.37);
  transform: scale(4);
  outline: none;
}

/* 拟态玻璃 */
/* .style-checkbox:active input ~ .checkbox-box,
.style-checkbox:active input:checked ~ .checkbox-box {
  background-color: transparent;
  backdrop-filter: url(#checkbox-1);
  transform: scale(4);
  box-shadow: #000a 0px 0px 10px;
  outline: none;
} */

/* 点击时隐藏内部勾号，避免视觉混乱 */
.style-checkbox:active input:checked ~ .checkbox-box::after {
  display: none;
}

/* 3. 选中时的外圈颜色 */
.style-checkbox input:checked ~ .checkbox-box {
  background-color: #0065b8;
  outline: #0065b8 1px solid;
}

/* 4. 创建选中的“勾号” */
.checkbox-box::after {
  content: "";
  position: absolute;
  display: none;
  /* 勾号居中定位 */
  left: 5px;
  top: 1px;
  width: 4px;
  height: 8px;
  /* 绘制 L 型边框再旋转 */
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* 选中时显示勾号 */
.style-checkbox input:checked ~ .checkbox-box::after {
  display: block;
}

.desktop-icon {
  position: fixed;
  display: flex;
  top: 30px;
  left: 10px;
  gap: 0px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
