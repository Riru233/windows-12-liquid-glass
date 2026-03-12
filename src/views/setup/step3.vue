<template>
  <SetupFrame>
    <div class="content">
      <h1>Select setup option</h1>
      <div style="font-size: 12px">
        Install the latest version of Windows 12, or repair your PC. If you're
        installing Windows 12, please note your files, apps, and settings will
        be deleted.
      </div>
      <br />
      <div style="display: flex; flex-direction: row">
        <div style="width: 200px">I would like to</div>
        <div class="radio-group">
          <label class="style-radio">
            <input type="radio" value="0" v-model="picked" />
            <span class="checkmark"></span>
            <u>I</u>nstall Windows 12</label
          >
          <label class="style-radio">
            <input type="radio" value="1" v-model="picked" />
            <span class="checkmark"></span>
            <u>R</u>epair my PC</label
          >
        </div>
      </div>
      <br />
      <div>
        <!-- 复选框 -->
        <label class="style-checkbox">
          <input type="checkbox" v-model="agree" />
          <span class="checkbox-box"></span>
          I agree everything will be deleted including files, apps, and
          settings</label
        >
      </div>
    </div>

    <div class="footer">
      <img src="/public/microsoft.png" alt="" style="height: 16px" />
      <div class="textbtn"><u>S</u>upport</div>
      <div class="textbtn"><u>L</u>egal</div>
      <div style="flex-grow: 1"></div>
      <button class="fillbtn" @click="router.push('/setup/step2')">
        <u>B</u>ack
      </button>
      <button class="fillbtnnext" @click="nextStep" :disabled="agree ? false : true">
        <u>N</u>ext
      </button>
    </div>

    <!-- <liquidFilter
      :width="16"
      :height="16"
      :blur="0"
      id="radio-1"
      displacementScale="10"
      :precise="1"
      :config_layer2="{
        radius: 8,
        gamma: 1.9,
        deadzone: 0.5,
        edge: 8,
        isInward: true,
      }"
    />
    <liquidFilter
      :width="16"
      :height="16"
      :blur="0"
      id="checkbox-1"
      displacementScale="10"
      :precise="1"
      :config_layer2="{
        radius: 2,
        gamma: 1.9,
        deadzone: 0.5,
        edge: 8,
        isInward: true,
      }"
    /> -->
  </SetupFrame>
</template>

<script setup>
import { useRouter } from "vue-router";
import liquidFilter from "/src/components/liquid_v2.vue";
import { ref } from "vue";
import SetupFrame from "@/components/setup/frame.vue";
const router = useRouter();
const picked = ref("0");
const agree = ref(false);
const nextStep = () => {
  if (!agree.value) {
    return;
  }
  router.push("/setup/step4");
};
</script>
