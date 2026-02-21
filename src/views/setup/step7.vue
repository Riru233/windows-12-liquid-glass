<template>
  <SetupFrame>
    <div class="content">
      <h1>Select Image</h1>

      <div style="font-size: 13px">
        <p>Please select the image you want to install.</p>
      </div>
      <br />
      <div>Recommended images:</div>
      <div style="display: flex; flex-wrap: wrap; gap: 20px">
        <div :class="stat.option === 1? 'c-block-checked' : 'c-block'" @click="setOption(1)">
          <div class="c-block-title">Windows 12 Home</div>
          <div class="c-block-desc">
            For individuals and family users, and casual gamers, you cannot use remote access or cloud services.
          </div>
        </div>
        <div :class="stat.option === 2? 'c-block-checked' : 'c-block'" @click="setOption(2)">
          <div class="c-block-title">Windows 12 Pro</div>
          <div class="c-block-desc">
            For small businesses and enterprises, and advanced gamers
          </div>
        </div>
        <div :class="stat.option === 3? 'c-block-checked' : 'c-block'" @click="setOption(3)">
          <div class="c-block-title">Windows 12 Education</div>
          <div class="c-block-desc">
            For educational institutions, teachers and students
          </div>
        </div>
        <div :class="stat.option === 4? 'c-block-checked' : 'c-block'" @click="setOption(4)">
          <div class="c-block-title">Windows 12 Enterprise</div>
          <div class="c-block-desc">
            For large organizations, and advanced security needs
          </div>
        </div>

        <button
          style="
            color: #0078d7;
            background-color: #fff0;
            border: none;
            cursor: pointer;
            text-align: left;
          "
        >
          <u>A</u>dvanced options
        </button>
      </div>
      <br />
    </div>
    <div class="footer">
      <img src="/public/microsoft.png" alt="" style="height: 16px" />
      <div class="textbtn"><u>S</u>upport</div>
      <div class="textbtn"><u>L</u>egal</div>
      <div style="flex-grow: 1"></div>
      <button class="fillbtn" @click="router.push('/setup/step5')">
        <u>B</u>ack
      </button>
      <button class="fillbtnnext" @click="verify" :disabled="stat.option==0?true:false"><u>N</u>ext</button>
    </div>
  </SetupFrame>
</template>

<script setup>
import { useRouter } from "vue-router";
import SetupFrame from "@/components/setup/frame.vue";
import { reactive } from "vue";
const router = useRouter();
const verify = () => {
  if (stat.option === 0) return;
  localStorage.setItem("install-option",stat.option)
  router.push("/setup/step8");
};
const stat = reactive({
  option: 0
})
const setOption = (option) => {
  stat.option = option;
};
</script>
<style scoped>
.c-block {
  width: 310px;
  margin: 5px 0;
  border: 1px solid #e5e5e5;
  padding: 10px;
  border-radius: 30px;
  cursor: pointer;
}
.c-block-checked {
  width: 310px;
  margin: 5px 0;
  border: 1px solid #0451a5;
  padding: 10px;
  border-radius: 30px;
}
.c-block-title {
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 10px;
}
.c-block-desc {
  font-size: 13px;
  margin-bottom: 10px;
}
</style>
