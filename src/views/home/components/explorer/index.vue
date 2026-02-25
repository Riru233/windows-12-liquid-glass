<template>
  <LiquidWin
    :width="900"
    :height="610"
    :displacementScale="300"
    :active="true"
    :initialTop="150"
    :initialLeft="480"
    v-slot="{ startDrag }"
  >
    <div class="glass-content">
      <div style="display: flex; flex-direction: column; flex: 1">
        <div class="titlebar" @mousedown="startDrag">
          <div class="labels">
            <LiquidGlass
              class="fix-glass"
              :width="200" :height="25" :radius="18" :displacementScale="40" :precise="1" :drag="false"
              :config_layer2="{
                radius: 18,
                gamma: 1,
                deadzone: 0.05,
                edge: 12,
                isInward: true,
              }"
            >
              <div class="label selected-content">
                <img
                  src="/public/desktop.png"
                  alt=""
                  style="width: 16px; height: 12px; margin: 0 10px"
                />
                <div style="flex: 1">Desktop</div>
              </div>
            </LiquidGlass>

            <div class="label">
              <img
                src="/public/folder.png"
                alt=""
                style="width: 16px; height: 16px; margin: 0 10px"
              />
              <div style="flex: 1" class="glass-fog">
                C:\Windows\System32\...
              </div>
            </div>

            <svg class="icon" viewBox="0 0 1024 1024" width="20" height="20">
              <path
                d="M791.457164 482.009422 542.361553 482.009422 542.361553 232.913811c0-17.190122-13.94987-31.139992-31.139992-31.139992-17.190122 0-31.139992 13.94987-31.139992 31.139992l0 249.095611L230.985958 482.009422C213.795836 482.009422 199.845966 495.959292 199.845966 513.149414c0 17.190122 13.94987 31.139992 31.139992 31.139992l249.095611 0 0 249.095611c0 17.224179 13.94987 31.139992 31.139992 31.139992 17.190122 0 31.139992-13.915813 31.139992-31.139992L542.361553 544.289406l249.095611 0c17.224179 0 31.139992-13.94987 31.139992-31.139992C822.597156 495.959292 808.681343 482.009422 791.457164 482.009422L791.457164 482.009422z"
                fill="#fff"
              ></path>
            </svg>
          </div>
          <div style="flex-grow: 1"></div>
          <div
            style="
              display: flex;
              flex-direction: row;
              height: 24px;
              align-items: center;
              font-size: 14px;
            "
          >
            <div style="padding: 0 16px">
              <svg class="icon windowBtnStd" viewBox="0 0 1024 1024">
                <path
                  d="M160.213333 533.333333h703.658667a32 32 0 0 0 0-64H160.213333a32 32 0 0 0 0 64z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div style="padding: 0 16px">
              <svg class="icon windowBtnStd" viewBox="0 0 1024 1024">
                <path
                  d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div style="padding: 0 16px" @click="close">
              <svg class="icon windowBtnClose" viewBox="0 0 1024 1024">
                <path
                  d="M187.605333 194.304l3.114667-3.584a32 32 0 0 1 41.642667-3.114667l3.584 3.114667L512 466.730667l276.053333-276.053334a32 32 0 1 1 45.226667 45.269334L557.269333 512l276.053334 276.053333a32 32 0 0 1 3.072 41.642667l-3.114667 3.584a32 32 0 0 1-41.642667 3.114667l-3.584-3.114667L512 557.269333l-276.053333 276.053334a32 32 0 0 1-45.226667-45.269334L466.730667 512l-276.053334-276.053333a32 32 0 0 1-3.072-41.642667l3.114667-3.584-3.114667 3.584z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <toolbar />
        <WindowView />
      </div>
    </div>
  </LiquidWin>
</template>

<script setup>
import LiquidGlass from "/src/components/liquid_glass.vue";
import LiquidWin from "/src/components/liquid_win.vue";
import WindowView from "./components/windowView.vue";
import toolbar from "./components/toolbar.vue";

const emit = defineEmits(["close"]);
const close = () => emit("close", "explorer");
</script>

<style scoped>
@import "/src/assets/liquidglass.css";
.fix-glass {
  /* 将原本 .selected 的视觉效果移到这里 */
  background: rgba(0, 119, 255, 0.438);
}
.icon {
  z-index: 4;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.titlebar {
  height: 40px !important;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 0 0 0 5px;
  font-size: 12px;
}

.label {
  display: flex;
  width: 200px;
  align-items: center;
  justify-content: center;
  height: 24px;
  color: #333;
  border-radius: 14px;
}


.selected-content {
  width: 100%;
  height: 100%;
  border: none; /* 边框移到了外层 wrapper */
  background: transparent; /* 背景移到了外层 wrapper */
  color: #fff;
}

.labels {
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.glass-content {
  background-color: rgba(172, 208, 255, 0.467);
  flex: 1;
  display: flex;
}
</style>
