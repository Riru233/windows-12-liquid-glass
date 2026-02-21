<template>

    <!-- 1. 开始 -->
    <div style="
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 10px;
                height: 28px;
              " v-for="i in dockData">
        <div v-html="i.icon" v-if="i.icon" style="-webkit-box-reflect: below -4px linear-gradient(transparent calc(100% - 15px), rgba(0, 0, 0, .5));"></div>
        <div style="display:flex;flex-direction: column;align-items: center;justify-content: center;">
            <img :src="i.url" alt="" v-if="i.url" style="width: 22px!important; height: 22px;">
            <div :style="i.active ? { 'background-color': '#333a',position:'relative',height:'3px',width:'12px',top: '5px',borderRadius: '2px' } : {}"></div>
        </div>
        <!-- <div style="text-shadow: #fff 0px 0px 8px;font-size: 14px;align-self: center;" v-if="i.name != ''">{{ i.name }}
        </div> -->
    </div>
</template>
<script setup>
const dockData = [
    {
        id: 1,
        name: 'Start',
        icon: `
        <svg t="1758723718980" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="5255" width="24px" height="24px">
            <defs>
                <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#333c" />
                    <stop offset="100%" stop-color="#3333" />
                </linearGradient>
            </defs>
            <path
                d="M81.92 289.42336v207.79008h415.29344V81.92H81.92v207.50336z m444.86656 0v207.79008H942.08V81.92H526.78656v207.50336zM81.92 734.57664V942.08h415.29344V526.78656H81.92v207.79008z m444.86656 0V942.08H942.08V526.78656H526.78656v207.79008z"
                p-id="5256" fill="url(#linearGradient)"></path>
        </svg>`,
    },
    {
        id: 2,
        name: 'Search',
        icon: `
        <svg t="1758723992214" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="7130" width="24px" height="20px" >
            <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#333" />
                <stop offset="100%" stop-color="#666" />
            </linearGradient>
            <path
                d="M1006.007227 926.859131L801.704607 723.067694a446.432746 446.432746 0 1 0-528.221951 139.212044 448.136688 448.136688 0 0 0 348.626488 0 448.221885 448.221885 0 0 0 101.214142-59.637963l203.876633 203.450649a55.974487 55.974487 0 1 0 78.977702-79.233293zM447.540308 805.708871a357.061 357.061 0 1 1 356.038635-356.975803 356.890606 356.890606 0 0 1-356.038635 356.975803z"
                fill="url(#lg1)" p-id="7131"></path>
        </svg>
        `,
    },
    {
        id: 3,
        name: 'Setup',
        url: '/public/icons/setup_1000.ico',
        active: 1
    }
]
</script>
<style scoped></style>