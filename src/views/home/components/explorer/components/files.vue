<template>
    <div class="contentOne" style="color:#000;margin: -100px 0;z-index:-1000;display: flex;flex-direction: row;flex-wrap: wrap;gap: 3px;
align-content: flex-start;">
        <div v-for="i in files" style="width: 178px;height:178px;display: flex;flex-direction: column;justify-content: center;align-items: center;">
            <img :src="i.icon" alt="" style="width: 96px;height:96px;">
            <div style="font-size: 11px;text-align: center;">{{i.name}}</div>
        </div>
    </div>
</template>
<script setup>
const files = [
    {icon: '/public/icons/imageres_25.png', name: 'Network'},
    {icon: '/public/icons/imageres_55.png', name: 'Recycle Bin'},
    {icon: '/public/icons/imageres_88.png', name: 'Administrator'},
    {icon: '/public/icons/imageres_108.png', name: 'Music'},
    {icon: '/public/icons/imageres_109.png', name: 'This PC'},
    {icon: '/public/icons/imageres_112.png', name: 'Documents'},
    {icon: '/public/icons/imageres_113.png', name: 'Pictures'},
    {icon: '/public/icons/imageres_184.png', name: 'Downloads'},
    {icon: '/public/icons/imageres_189.png', name: 'Videos'},
    {icon: '/public/icons/shell32_51380.png', name: 'Main Folder'},
    {icon: '/public/icons/shell32_51586.png', name: 'Gallery'},
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