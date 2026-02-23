<template>
  <SetupFrame>
    <div class="content">
      <h1>Select language and keyboard settings</h1>
      <br>
      <div class="form-section">
        <div class="form-group">
          <label>Languag<u>e</u> to install</label>
          <select>
            <option>English (United States)</option>
          </select>
        </div>
        <div class="form-group">
          <label><u>T</u>ime and currency format</label>
          <select>
            <option>English (United States)</option>
          </select>
        </div>
        <div class="form-group">
          <label><u>K</u>eyboard or input method:</label>
          <select>
            <option>US</option>
          </select>
        </div>
      </div>
    </div>
    <div class="footer">
      <img src="/public/microsoft.png" alt="" style="height: 16px" />
      <div class="textbtn"><u>S</u>upport</div>
      <div class="textbtn"><u>L</u>egal</div>
      <div style="flex-grow: 1"></div>
      <button class="fillbtn" @click="router.push('/setup/step1?back=1')"><u>B</u>ack</button>
      <button class="fillbtnnext" @click="router.push('/setup/step3')">
        <u>N</u>ext
      </button>
    </div>
  </SetupFrame>
</template>

<script setup>
import { useRouter } from "vue-router";
import SetupFrame from "@/components/setup/frame.vue";
const router = useRouter();
</script>