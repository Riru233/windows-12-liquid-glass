<template>
    <div style="position: fixed;color: #fff;font-size:25px;text-align:center;width:100%;bottom: 100px;">Ready to install Windows 12</div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
setTimeout(() => {
    router.push('/setup/step2')
}, 1000)
</script>
<style>
body {
    background-color: #190754;
}
</style>