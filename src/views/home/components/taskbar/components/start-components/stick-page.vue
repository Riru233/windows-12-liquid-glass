<template>
    <div style="display: flex;flex-direction: row;">
        <div style="display: flex;flex-direction: column;">
            <div class="container">
                <div style="color: #fff;text-shadow: #000 0 0 2px,#000 0 0 4px;">推荐</div>
                <div class="stick-container">
                    <stick size="2x4" title="Microsoft Store" bg="#aaaaaf66" color="#fff">
                        <img src="/icons/ms-store.png" alt="" style="width:48px">
                    </stick>
                    <stick size="2x2" title="Microsoft Edge" bg="#225ad966" color="#fff">
                        <img src="/icons/msedge_101.ico" alt="" style="width:48px">
                    </stick>
                    <stick size="1x1" title="Sticky Notes" bg="#33333366" color="#fff">
                        <img src="/icons/StickyNotesSmallTile.scale-200.png" alt="" style="width:48px">
                    </stick>
                    <stick size="1x1" title="Copilot" bg="#33333366" color="#fff">
                        <img src="/icons/copilot.png" alt="Copilot" style="width:32px">
                    </stick>
                    <stick size="1x1" title="Teams" bg="#33333366" color="#fff">
                        <img src="/icons/teams.png" alt="Teams" style="width:32px">
                    </stick>
                    <stick size="1x1" title="电脑管家" bg="#33333366" color="#fff">
                        <img src="/icons/WindowsSecurityAppList.scale-125_contrast-white.png" alt="电脑管家" style="width:32px">
                    </stick>
                    <stick size="2x2" title="天气" bg="#33333366" color="#fff" @click="$emit('open-run')">
                        <img src="/icons/run.ico" alt="" style="width:48px">
                    </stick>
                </div>
            </div>
        </div>
        <div style="display: flex;flex-direction: column;">
            <div class="container">
                <div style="color: #fff;text-shadow: #000 0 0 2px,#000 0 0 4px;">系统维护</div>
                <div class="stick-container">
                    <stick size="2x2" title="运行" bg="#33333366" color="#fff" @click="$emit('open-run')">
                        <img src="/icons/run.ico" alt="" style="width:48px">
                    </stick>
                    <stick size="2x2" title="设置" bg="#33333366" color="#fff" @click="$emit('open-run')">
                        <img src="/icons/settings/logo.scale-100.png" alt="" style="width:48px">
                    </stick>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import stick from './stick.vue';
</script>

<style scoped>
.stick-container {
    display: grid;
    /* 基础列宽 64px */
    grid-template-columns: repeat(auto-fill, 64px);
    /* 基础行高 64px */
    grid-auto-rows: 64px;
    /* 间距 10px */
    gap: 10px;

    /* 自动填充算法：dense 确保大磁贴换行后，小磁贴能填补空隙 */
    grid-auto-flow: row dense;
    width: 100%;max-width: 300px;
    min-height: 0;
}

.container {
    margin: 0 auto;
    width: 100%;
    padding: 0 0 0 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>