<template>
  <svg color-interpolation-filters="sRGB" style="display: none">
    <defs>
      <filter :id="props.id">
        <feGaussianBlur
          in="SourceGraphic"
          :stdDeviation="props.blur"
          result="blurred_source"
        />
        <feImage
          :href="computedBase64_layer2"
          x="0"
          y="0"
          :width="props.width"
          :height="props.height"
          result="displacement_map"
        />
        <feDisplacementMap
          in="blurred_source"
          in2="displacement_map"
          :scale="props.displacementScale"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displaced"
        />
        <feColorMatrix
          in="displaced"
          type="saturate"
          values="1.6"
          result="displaced_saturated"
        />
        <feBlend in="displaced_saturated" in2="displaced" mode="normal" />
      </filter>
    </defs>
  </svg>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";

import {
  generateDisplacementMap,
  generateGradientMap,
} from "/src/utils/genvec_layer2.js";

const props = defineProps({
  id: { type: String, required: true },

  width: { type: Number, required: true },

  height: { type: Number, required: true },

  displacementScale: { type: Number, default: 78 },

  precise: { type: Number, default: 0.1 },
  blur: { type: Number, default: 1 },

  // 暴露给外部调节贴图生成的参数
  config_layer1: {
    type: Object,

    default: () => ({
      gamma: 40,
      deadzone: 0,
      edge: 0,
      isInward: false,
    }),
  },
  config_layer2: {
    type: Object,
    default: () => ({
      radius: 10,
      gamma: 1.9,
      deadzone: 0.5,
      edge: 8,
      isInward: true,
    }),
  },
});

// 动态计算 Base64 贴图

const computedBase64_layer1 = computed(() => {
  return generateGradientMap({
    width: props.width,
    height: props.height,
    precise: props.precise,
    ...props.config_layer1,
  });
});

let computedBase64_layer2 = computed(() => {
  return generateDisplacementMap({
    width: props.width,
    height: props.height,
    precise: props.precise,
    ...props.config_layer2,
  });
});
watch(
  [() => props.width, () => props.height, () => props.borderRadius],
  ([newWidth, newHeight, newRadius], [oldWidth, oldHeight, oldRadius]) => {
    // 打印变化信息（可根据需求替换为业务逻辑）
    console.log("尺寸/圆角发生变化：");
    console.log(`宽度：${oldWidth} → ${newWidth}`);
    console.log(`高度：${oldHeight} → ${newHeight}`);
    console.log(`圆角：${oldRadius} → ${newRadius}`);
    computedBase64_layer2 = computed(() => {
      return generateDisplacementMap({
        width: props.width,
        height: props.height,
        precise: props.precise,
        ...props.config_layer2,
      });
    });
  },
  {
    immediate: true, // 立即执行一次（可选）
    deep: false, // 基础类型无需深度监听
  },
);
onMounted(() => {
  console.log(props.width);
});
</script>

<style scoped>
@import "/src/assets/liquidglass.css";
</style>
