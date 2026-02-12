# Windows 12概念版介绍

本项目主要改进液态玻璃特性，让开发者能够快速上手

# 示例

1. 无边框窗口


```vue
<template>
  <LiquidWin
    :width="900"
    :height="610"
    :displacementScale="150"
    :active="true"
    :initialTop="150"
    :initialLeft="480"
    v-slot="{ startDrag }"
  >
  <!-- width、height是大小，displacementScale控制扭曲度，active控制的是窗口活跃状态，initialTop、initialLeft是窗口初始位置 -->
  example
  </LiquidWin>
</template>
<script setup>
import LiquidWin from "/src/components/liquid_win.vue";
</script>
```

2. 带有标题栏的窗口

```vue
<template>
  <liquidWin
    title="About"
    :width="400"
    :height="400"
    :displacementScale="100"
    :active="false"
    :winPattern="0"
    :initialTop="500"
    :initialLeft="1480"
    @close="close"
  >
  <!-- 有title时需要带winPattern属性：
   0: 只有叉号
   1: 三大金刚按钮
   2: 带帮助的叉号（暂没有做） -->
  example
  </liquidWin>
</template>
<script setup>
import LiquidWin from "/src/components/liquid_win.vue";
</script>
```

# 开源注意事项

在发布视频、文章等内容时，请注明出处，并保留本项目的开源协议。