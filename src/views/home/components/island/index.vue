<template>
  <div class="island" :class="state.expand" @click="expandOut">
    {{ props.content }}
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});

const state = reactive({
  expand: "expandInit",
});
const expandIn = () => {
  state.expand = "expandIn";
};
const expandOut = () => {
  state.expand = "expandOut";
};

onMounted(() => {
  setTimeout(() => {
    state.expand = "expandIn";
  }, 1000);
});
</script>
<style scoped>
/* 顶部居中，黑色背景，圆角，半透明，模糊，边框，阴影 */
.island {
  position: absolute;
  left: 50%;
  z-index: 999;
  transform: translateX(-50%);
  display: flex;
  cursor: pointer;
  user-select: none;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  backdrop-filter: blur(10px);
}

.expandInit {
  width: 0;
  height: 0;
  padding: 0;
  top: 20px;
  color: #fff0 !important;
}
.expandIn {
  animation: expandIn 0.3s linear forwards;
}
.expandOut {
  animation: expandOut 0.3s linear forwards;
}

@keyframes expandIn {
  0% {
    width: 0;
    height: 0;
    top: 20px;
    padding: 0;
    color: #fff0;
    opacity: 0;
  }
  30% {
    width: 24px;
    top: 20px;
    height: 24px;
    padding: 0;
    color: #fff0;
    opacity: 1;
  }
  60% {
    width: 24px;
    top: 35px;
    height: 24px;
    padding: 0;
    color: #fff0;
    opacity: 1;
  }
  100% {
    width: 300px;
    top: 50px;
    height: 48px;
    padding: 0 15px;
    color: #fff;
  }
}

@keyframes expandOut {
  0% {
    width: 300px;
    height: 48px;
    top: 50px;
    padding: 0 15px;
    color: #fff;
  }
  30% {
    width: 24px;
    height: 24px;
    top: 35px;
    padding: 0;
    color: #fff0;
    opacity: 1;
  }
  60% {
    width: 24px;
    top: 20px;
    height: 24px;
    padding: 0;
    color: #fff0;
    opacity: 1;
  }
  100% {
    width: 0;
    height: 0;
    top: 20px;
    padding: 0;
    color: #fff0;
    opacity: 0;
  }
}
</style>
