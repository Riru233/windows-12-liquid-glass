<template>
  <div class="fadein-h1">Setup is loading</div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
setTimeout(() => {
  router.push("/setup/step1");
}, 3000);
</script>
<style>
@keyframes fadein-h1 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
body {
  background-color: #190754;
}
.fadein-h1 {
  position: fixed;
  color: #fff;
  font-size: 25px;
  bottom: 100px;
  text-align: center;
  width: 100%;
  animation: fadein-h1 0.3s ease-in;
}
</style>
