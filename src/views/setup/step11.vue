<template>
  <SetupFrame>
    <div class="content">
      <h1>Select location to install Windows 12</h1>
      <div style="font-size: 13px">
        Please select the location where you want to install Windows 12.
      </div>
      <div style="display: flex;gap: 10px;align-items: center;flex-direction: row;color:#0072d9;font-size:13px;margin-top:20px;">
        <div style="height:32px;width:120px;flex:1">
          <u>R</u>efresh
        </div>
        <div style="height:32px;flex:1">
          <u>L</u>oad Driver
        </div>
        <div style="height:32px;flex:1;color:#aaa;">
          Bring Disk <u>O</u>nline
        </div>
        <div style="height:32px;flex:1;color:#aaa;">
        </div>
      </div>
      <div style="display: flex;gap: 10px;align-items: center;flex-direction: row;color:#0072d9;font-size:13px;margin-top:10px;">
        <div style="height:32px;width:120px;flex:1">
          <u>D</u>elete Partition
        </div>
        <div style="height:32px;flex:1">
          <u>F</u>ormat Partition
        </div>
        <div style="height:32px;flex:1;color:#aaa;">
          <u>C</u>reate Partition
        </div>
        <div style="height:32px;flex:1;color:#aaa;">
          <u>E</u>xtend Partition
        </div>
      </div>
      <div
        style="
          border: #ccc 1px solid;
          flex: 1;
          overflow-y: scroll;
          margin: 20px 0px;
          padding: 0 20px 0 0;
        "
        class="overflow"
      >
        <table class="partition-table">
          <thead>
            <tr>
              <th class="col-name">Name</th>
              <th class="col-size">Total Size</th>
              <th class="col-free">Free Space</th>
              <th class="col-type">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in partitions"
              :key="index"
              :class="{ 'is-selected': selectedIndex === index }"
              @click="selectedIndex = index"
            >
              <td class="col-name">{{ item.name }}</td>
              <td class="col-size">{{ item.totalSize }}</td>
              <td class="col-free">{{ item.freeSpace }}</td>
              <td class="col-type">{{ item.type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="footer">
      <img src="/public/microsoft.png" alt="" style="height: 16px" />
      <div class="textbtn"><u>S</u>upport</div>
      <div class="textbtn"><u>L</u>egal</div>
      <div style="flex-grow: 1"></div>
      <button class="fillbtn" @click="router.push('/setup/step9')">
        <u>B</u>ack
      </button>
      <button class="fillbtnnext" @click="router.push('/setup/step12')">
        <u>N</u>ext
      </button>
    </div>
  </SetupFrame>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import SetupFrame from "@/components/setup/frame.vue";
const router = useRouter();

// 模拟图片中的数据
const partitions = ref([
  { name: 'Disk 0 Partition 1', totalSize: '200.0 MB', freeSpace: '200.0 MB', type: 'System' },
  { name: 'Disk 0 Partition 2', totalSize: '16.0 MB', freeSpace: '16.0 MB', type: 'MSR (Reserved)' },
  { name: 'Disk 0 Partition 3', totalSize: '215.0 GB', freeSpace: '215.0 GB', type: 'Windows SSD' },
  { name: 'Disk 0 Partition 4', totalSize: '768.0 GB', freeSpace: '768.0 GB', type: 'Files' },
  { name: 'Disk 0 Partition 5', totalSize: '735.0 MB', freeSpace: '735.0 MB', type: 'Recovery' },
]);

// 默认选中图片中的第三行
const selectedIndex = ref(2);
</script>

<style scoped>
.window-container {
  font-family: "Segoe UI";
  padding: 20px;
  background-color: #ffffff;
}

.partition-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  color: #333;
  user-select: none; /* 防止点击时文字被选中 */
}

/* 表头样式 */
.partition-table thead th {
  text-align: left;
  font-weight: normal;
  color: #555;
  padding: 4px 8px;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #f0f0f0;
}

/* 单元格基础样式 */
.partition-table td {
  padding: 4px 8px;
  white-space: nowrap;
  border: 1px solid transparent; /* 保持高度一致 */
}

/* 列宽微调 */
.col-name { width: 40%; }
.col-size { width: 20%; }
.col-free { width: 20%; }
.col-type { width: 20%; }

/* 行悬停与选中逻辑 */
.partition-table tbody tr:hover {
  background-color: #e5f3ff;
}

.partition-table tr.is-selected {
  background-color: #0078d7 !important; /* Windows 经典蓝色选中色 */
  color: #ffffff !important;
}

/* 模拟图片中的光标位置对齐 */
.col-size, .col-free {
  font-family: "Segoe UI"; /* 数字建议等宽 */
}
</style>
