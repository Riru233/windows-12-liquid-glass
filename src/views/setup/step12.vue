<template>
  <SetupFrame>
    <div class="content">
      <h1>Ready to install</h1>
      <div style="font-size: 13px; line-height: 2em">
        You can continue to use your PC during installation. But you must save and close
        your files before restarting your PC.
      </div>
      <div style="font-size: 13px; line-height: 2em">
        To recap, you've chosen to:
      </div>
      <br />
      <div class="selection-list">
        <div class="selection-item">
          <span class="check-icon font-bold">✓</span>
          <span class="item-text">Install {{ stat.spec }}</span>
        </div>

        <div class="selection-item">
          <span class="check-icon font-bold">✓</span>
          <span class="item-text">Keep nothing</span>
        </div>
      </div>
      <p class="note-text">
        Note: Certain apps and features may have additional requirements above
        the Windows 12 minimum system requirements. Some features from previous
        versions of Windows aren't available in Windows 12.
      </p>
      <div class="spec-link">Check device specifications</div>
    </div>

    <div class="footer">
      <img src="/public/microsoft.png" alt="" style="height: 16px" />
      <div class="textbtn"><u>S</u>upport</div>
      <div class="textbtn"><u>L</u>egal</div>
      <div style="flex-grow: 1"></div>
      <button class="fillbtn" @click="router.push('/setup/step11')">
        <u>B</u>ack
      </button>
      <button class="fillbtnnext" @click="router.push('/setup/step13')">
        <u>I</u>nstall
      </button>
    </div>
  </SetupFrame>
</template>

<script setup>
import { useRouter } from "vue-router";
import SetupFrame from "@/components/setup/frame.vue";
import { onMounted, reactive } from "vue";

const router = useRouter();

const stat = reactive({
  spec: "Windows 12"
});

onMounted(()=> {
  const installOption = localStorage.getItem("install-option");
  console.log(installOption);
  switch (installOption) {
    case '1':
      stat.spec = "Windows 12 Home";
      break;
    case '2':
      stat.spec = "Windows 12 Pro";
      break;
    case '3':
      stat.sped = "Windows 12 Education";
      break;
    case '4':
      stat.spec = "Windows 12 Enterprise";
      break;
    default:
      stat.spec = "Windows 12";
      break;
  }
})
</script>

<style scoped>
/* 核心容器 */
.setup-container {
  font-family: "Segoe UI Variable Text", "Segoe UI", Arial, sans-serif;
  color: #202020;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 60px;
  line-height: 1.5;
  background-color: #ffffff;
}

/* 顶部警告 */
.warning-text {
  font-size: 15px;
  margin-bottom: 35px;
}

/* 摘要标题 */
.recap-title {
  font-size: 15px;
  margin-bottom: 25px;
}

/* 列表样式 */
.selection-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 60px;
}

.selection-item {
  display: flex;
  align-items: flex-start;
}

.check-icon {
  font-size: 18px;
  margin-right: 15px;
  margin-top: -2px; /* 微调勾选符号位置 */
}

.item-text {
  font-size: 15px;
}

.font-bold {
  font-weight: 600; /* Windows 界面通常使用 Semi-bold 而不是极粗 */
}

/* 底部备注 */
.footer-section {
  max-width: 650px;
}

.note-text {
  font-size: 13px;
  margin-bottom: 8px;
}

.spec-link {
  font-size: 14px;
  color: #0067c0;
  text-decoration: none;
  border-bottom: 1px dotted transparent;
}

.spec-link:hover {
  text-decoration: underline;
}

/* 针对高分辨率屏幕的微调 */
@media (max-width: 640px) {
  .setup-container {
    padding: 20px;
  }
}
</style>
