<template>
    <div class="contentOne" style="color:#000;margin: -100px 0;z-index:-1000;display: flex;flex-direction: row;flex-wrap: wrap;gap: 3px;
align-content: flex-start;">
        <div v-for="i in files" style="width: 178px;height:178px;display: flex;flex-direction: column;justify-content: center;align-items: center;gap: 5px;">
            <img :src="i.icon" alt="" style="width: 96px;height:96px;">
            <div style="font-size: 12px;text-align: center;">{{i.name}}</div>
        </div>
    </div>
</template>
<script setup>
const files = [
    {icon: '/public/icons/imageres_25.png', name: '网络'},
    {icon: '/public/icons/imageres_55.png', name: '回收站'},
    {icon: '/public/icons/imageres_88.png', name: '管理员'},
    {icon: '/public/icons/imageres_108.png', name: '音乐'},
    {icon: '/public/icons/imageres_109.png', name: '此电脑'},
    {icon: '/public/icons/imageres_112.png', name: '文档'},
    {icon: '/public/icons/imageres_113.png', name: '图片'},
    {icon: '/public/icons/imageres_184.png', name: '下载'},
    {icon: '/public/icons/imageres_189.png', name: '视频'},
    {icon: '/public/icons/shell32_51380.png', name: '主文件夹'},
    {icon: '/public/icons/shell32_51586.png', name: '图库'},
    {icon: '/public/icons/WINWORD_1.ico', name: 'Word'},
    {icon: '/public/icons/XLICONS_257.ico', name: 'Excel'},
    {icon: '/public/icons/POWERPNT_1300.ico', name: 'PowerPoint'},
]
</script>
<style scoped>
.contentOne {
    overflow-y: scroll;
    padding-top: 100px;
    height: 360px;
}
</style>