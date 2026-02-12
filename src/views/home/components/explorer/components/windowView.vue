<template>
  <div id="contentbar">
    <div class="gradientBlurContainer">
      <div class="gradientBlur">
        <div
          style="background: linear-gradient(to bottom, #def4 70%, #0000 100%);height:100%;width:100%;margin-top:-10px"
        ></div>
        <div
          class="mask-b-from-70-to-100"
          style="
            backdrop-filter: blur(0.8px);
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
          "
        ></div>
        <div
          class="mask-b-from-50-to-75"
          style="
            backdrop-filter: blur(2px);
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: #0000;
          "
        ></div>
        <div
          class="mask-b-from-20-to-55"
          style="
            backdrop-filter: blur(10px);
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: #0000;
          "
        ></div>
      </div>
      <div class="cont">
        <div
          style="
            position: relative;
            margin: 0 20px 0 20px;
            display: flex;
            flex-direction: column;
            color: #444;
          "
        >
          <div style="display: flex; flex-direction: row; align-items: center">
            <img
              src="/public/icons/imageres_183.ico"
              alt=""
              style="width: 48px; height: 48px; margin: 0 10px"
            />
            <div style="display: flex; flex-direction: column">
              <div style="color: #333; font-size: 14px">Desktop</div>
              <div style="color: #666; font-size: 12px">14 Objects</div>
              <div
                class="cloud"
                :style="{
                  width:
                    stylesheet.tooltip.width -
                    stylesheet.tooltip.paddingX * 2 +
                    'px',
                  height:
                    stylesheet.tooltip.height -
                    stylesheet.tooltip.paddingY * 2 +
                    'px',
                  padding:
                    stylesheet.tooltip.paddingY +
                    'px ' +
                    stylesheet.tooltip.paddingX +
                    'px',
                }"
              >
                <svg
                  t="1760698908233"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  style="width: 18px; margin: 0 3px"
                >
                  <path
                    d="M512 85.290667c235.690667 0 426.752 191.061333 426.752 426.752 0 235.648-191.061333 426.709333-426.752 426.709333-235.690667 0-426.752-191.061333-426.752-426.709333C85.248 276.352 276.309333 85.290667 512 85.290667z m0 64a362.752 362.752 0 1 0 0 725.461333A362.752 362.752 0 0 0 512 149.333333z m-0.170667 298.666666a32 32 0 0 1 31.744 27.648l0.298667 4.352 0.128 234.752a32 32 0 0 1-63.701333 4.352l-0.298667-4.309333-0.128-234.752a32 32 0 0 1 32-32zM512 298.794667a42.624 42.624 0 1 1 0 85.205333 42.624 42.624 0 0 1 0-85.205333z"
                    p-id="17270"
                    fill="#666"
                  ></path>
                </svg>
                <div class="glass-fog" style="font-size: 14px">
                  Select object(s) to show details.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- cloud -->
    <liquidFilter
      :width="264"
      :height="35"
      id="cloud"
      displacementScale="78"
      :precise="1"
      :config_layer2="{
        radius: 28,
        gamma: 1,
        deadzone: 0.05,
        edge: 18,
        isInward: true,
      }"
    />
    <div class="main">
      <div class="sidebar">
        <div class="item">
          <img
            src="/public/icons/imageres_1024.ico"
            alt=""
            style="width: 16px; height: 16px"
          />
          <div>Favorites</div>
        </div>
        <div class="item">
          <img
            src="/public/desktop.png"
            alt=""
            style="width: 16px; height: 12px; margin-left: 2em"
          />
          <div>Desktop</div>
        </div>
        <div class="item">
          <img
            src="/public/icons/imageres_184_16.png"
            alt=""
            style="width: 16px; height: 16px; margin-left: 2em"
          />
          <div>Downloads</div>
        </div>
        <br />
        <div class="item">
          <img
            src="/public/icons/shell32_51586.png"
            alt=""
            style="width: 16px; height: 16px"
          />
          <div>Gallery</div>
        </div>
        <br />
        <div class="item">
          <img
            src="/public/icons/shell32_51380.png"
            alt=""
            style="width: 16px; height: 16px"
          />
          <div>Main Folder</div>
        </div>
        <br />
        <div class="item">
          <img
            src="/public/icons/explorer_ICO_MYCOMPUTER.ico"
            alt=""
            style="width: 16px; height: 16px"
          />
          <div>Storage</div>
        </div>
        <br />
        <div class="item">
          <img
            src="/public/icons/imageres_109.png"
            alt=""
            style="width: 16px; height: 16px"
          />
          <div>This PC</div>
        </div>
        <br />
        <div class="item">
          <img
            src="/public/icons/imageres_1040.png"
            alt=""
            style="width: 16px; height: 16px"
          />
          <div>Onedrive</div>
        </div>
        <br />
        <div class="item">
          <img
            src="/public/icons/imageres_25.png"
            alt=""
            style="width: 16px; height: 16px"
          />
          <div>Network</div>
        </div>
      </div>
      <div class="content">
        <files></files>
      </div>
    </div>
    <div
      class="status"
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 11px;
        margin-left: 10px;
        color: #333;
      "
    >
      <div>14 Objects</div>
      <div style="flex-grow: 1"></div>
      <div>
        <svg
          t="1760693802817"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="54031"
          width="16"
          height="16"
        >
          <path
            d="M160 213.333333a32 32 0 0 0 0 64h704a32 32 0 0 0 0-64H160zM160 384a32 32 0 0 0 0 64h704a32 32 0 0 0 0-64H160zM128 586.666667a32 32 0 0 1 32-32h704a32 32 0 0 1 0 64H160a32 32 0 0 1-32-32zM160 725.333333a32 32 0 0 0 0 64h704a32 32 0 0 0 0-64H160z"
            p-id="54032"
            fill="#444"
          ></path>
        </svg>
      </div>
      <div>
        <svg
          t="1760693802817"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="54031"
          width="14"
          height="14"
          style="margin: 0 5px"
        >
          <path
            d="M202.666667 874.666667h618.666666a32 32 0 0 1 4.352 63.701333L821.333333 938.666667H202.666667a32 32 0 0 1-4.352-63.701334l4.352-0.298666h618.666666-618.666666zM693.333333 128A160 160 0 0 1 853.333333 288v362.666667A160 160 0 0 1 693.333333 810.666667h-362.666666A160 160 0 0 1 170.666667 650.666667v-362.666667A160 160 0 0 1 330.666667 128h362.666666z m0 64h-362.666666A96 96 0 0 0 234.666667 288v362.666667a96 96 0 0 0 96 96h362.666666a96 96 0 0 0 96-96v-362.666667a96 96 0 0 0-96-96z"
            p-id="83202"
            fill="#444"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import files from "./files.vue";
import LiquidFilter from "/src/components/liquid_v2.vue";
const stylesheet = {
  tooltip: {
    width: "264",
    height: "35",
    paddingX: 5,
    paddingY: 5,
  },
};
</script>
<style scoped>
@import "tailwindcss";
@import "/src/assets/gradientblur.css";

* {
  box-sizing: unset;
}

p {
  margin: 0;
}

.sidebar {
  border-top: #fffc 1px solid;
  border-bottom: #fffc 1px solid;
  width: 145px;
  overflow-y: scroll;
  height: 355px;
  margin: 5px 5px;
  border-radius: 10px;
  background: #fffa;
  box-shadow: #0002 0px 0px 40px 0px;
}
.sidebar::-webkit-scrollbar {
  width: 1px;
}

#contentbar {
  display: flex;
  background-color: #fffd;
  flex-direction: column;
  height: 100%;
  outline: solid #6663 1px;
  max-height: 100%;
}

.main {
  margin: 0 1px 1px;
  width: calc(100% - 4px);
  border-radius: 0 0 8px 8px;
  max-height: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
}

.item {
  color: #000;
  font-size: 11px;
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  gap: 3px;
  align-items: center;
}

.gradientBlurContainer {
  z-index: 31;
  position: relative;
  right: 0;
  left: 0;
  height: 100px;
  background: linear-gradient(to bottom, #ffffff42 0, #ffffff00 100%);
  margin-right: 16px;
}

.gradientBlur {
  height: 110px;
  padding-top: 10px;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: -3;
}

.cont {
  position: relative;
  margin-top: -110px;
}

.status {
  height: 20px;
}

.cloud {
  backdrop-filter: url(#cloud);
  border-radius: 28px;
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.178);
  border-top: #fff 1px solid;
  border-bottom: #fff 1px solid;
  /* outline: #aaa 1px solid; */
  margin: 5px 10px;
  padding: 0 5px;
  color: #666;
}

.content {
  flex: 1;
}
</style>
