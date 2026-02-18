<template>
  <div class="setup-container">
    <div class="window-frame">
      <div class="title-bar">
        <div style="flex-grow: 1"></div>
        <div class="window-controls">
          <div
            style="
              display: flex;
              flex-direction: row;
              height: 24px;
              align-items: center;
              font-size: 14px;
            "
          >
            <div class="winBtnBasicHov-close" @click="close">
              <svg class="icon windowBtnCloseBasic" viewBox="0 0 1024 1024">
                <path
                  d="M187.605333 194.304l3.114667-3.584a32 32 0 0 1 41.642667-3.114667l3.584 3.114667L512 466.730667l276.053333-276.053334a32 32 0 1 1 45.226667 45.269334L557.269333 512l276.053334 276.053333a32 32 0 0 1 3.072 41.642667l-3.114667 3.584a32 32 0 0 1-41.642667 3.114667l-3.584-3.114667L512 557.269333l-276.053333 276.053334a32 32 0 0 1-45.226667-45.269334L466.730667 512l-276.053334-276.053333a32 32 0 0 1-3.072-41.642667l3.114667-3.584-3.114667 3.584z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="title-bar">
        <!-- 上一步 -->
        <svg
          t="1760621368275"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3590"
          width="20"
          height="20"
          style="padding: 0 10px"
        >
          <path
            d="M908.5 482H188.2l250.5-250.5c11.7-11.7 11.7-30.7 0-42.4s-30.7-11.7-42.4 0L94.6 490.8c-11.7 11.7-11.7 30.7 0 42.4L396.3 835c5.9 5.9 13.5 8.8 21.2 8.8 7.7 0 15.4-2.9 21.2-8.8 11.7-11.7 11.7-30.7 0-42.4L188.2 542h720.3c16.6 0 30-13.4 30-30s-13.4-30-30-30z"
            fill="#333"
            p-id="3591"
          ></path>
        </svg>
        <img
          src="/public/icons/setup_1000.ico"
          alt=""
          style="width: 16px; height: 16px; padding: 0 5px"
        />
        <div class="title">Windows Setup</div>
        <div class="window-controls">
          <div
            style="
              display: flex;
              flex-direction: row;
              height: 24px;
              align-items: center;
              font-size: 14px;
            "
          ></div>
        </div>
      </div>

      <div class="content">
        <h1>Activate Windows</h1>
        <div style="font-size: 14px">
          <p>
            If this is the first time you're installing Windows on this PC (or
            you're installing a different edition), you need to enter a valid
            Windows product key. Your product key should be in the confirmation
            email you received after buying a digital copy of Windows or on a
            label inside the box that Windows came in.
          </p>
          <br />
          <p>The product key looks like this: XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</p>
          <br />
          <p>
            If you're reinstalling Windows, select I don't have a product key.
            Your copy of Windows will be automatically activated later.
          </p>
          <br />
          <div
            class="product-key-input-wrapper"
            style="display: flex; align-items: center; margin-bottom: 25px"
          >
            <div
              class="input-container"
              style="
                position: relative;
                flex: 1;
                max-width: 400px;
                display: flex;
              "
            >
              <input
                type="text"
                placeholder=""
                style="
                  height: 28px;
                  border: 1px solid #ababab;
                  border-bottom: 2px solid #0078d7;
                  padding: 0 5px;
                  border-radius: 10px;
                  flex: 1;
                "
              />
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                style="width: 32px; height: 32px; margin-left: 10px"
              >
                <path
                  d="m853.45333,183a96,96 0 0 1 96,96l0,405.54667a96,96 0 0 1 -96,96l-661.12,0a96,96 0 0 1 -96,-96l0,-405.54667a96,96 0 0 1 96,-96l661.12,0zm0,64l-661.12,0a32,32 0 0 0 -32,32l0,405.54667c0,17.664 14.336,32 32,32l661.12,0a32,32 0 0 0 32,-32l0,-405.54667a32,32 0 0 0 -32,-32zm-106.45333,341.33333a32,32 0 0 1 4.352,63.70134l-4.352,0.29866l-448,0a32,32 0 0 1 -4.352,-63.70133l4.352,-0.29867l448,0zm-32,-149.33333a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm-255.78667,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm-128,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm256,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm-320.21333,-128a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm127.78667,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm128,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm128,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm128,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333z"
                  p-id="8880"
                  fill="#ababab"
                />
              </svg>
            </div>
          </div>
          <br />
          <div style="color:#0078d7"><u>P</u>rivacy Statement</div>
          <br />
          <div style="color:#0078d7"><u>I</u> don't have a product key</div>
          <br>
          <button style="padding: 3px 15px;background-color: #cfcfcf;border-top:2px #fffa solid;border-bottom:1px #fffa solid;border-left:none;border-right:none;border-radius: 10px;outline:#666 solid 1px;margin-bottom: 10px;"><u>N</u>ext</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style>
/* 全局样式重置 */
body {
  margin: 0;
  padding: 0;
  background: #190754;
  font-family: "Segoe UI", Tahoma, Helvetica, Sans-Serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(0, 0, 0);
}

.setup-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* 模拟窗口外边框 */
.window-frame {
  width: 800px;
  height: 540px;
  border: 1px solid #717273;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

/* 标题栏 */
.title-bar {
  height: 30px;
  background-color: #d8d8d8;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}
.title {
  flex: 1;
}
.mini-icon {
  width: 14px;
  margin-right: 5px;
}
.window-controls .ctrl {
  padding: 0 10px;
  cursor: pointer;
  font-size: 16px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 300;
  text-align: left;
  width:100%;
}

/* 页面主体 */
.content {
  flex: 1;
  padding: 10px 40px;
  display: flex;
  flex-direction: column;
  align-items: left;
}

.logo-section {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}
/* 表单区域 */
.form-section {
  width: 100%;
  max-width: 500px;
}
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.form-group label {
  flex: 1;
  text-align: right;
  margin-right: 15px;
  font-size: 14px;
}
.form-group select {
  width: 320px;
  height: 25px;
  background: white;
  border: 1px solid #7a7a7a;
  padding-left: 5px;
}

.hint-text {
  margin-top: 60px;
  font-size: 13px;
}

/* 底部按钮区 */
.footer {
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.copyright {
  font-size: 11px;
  opacity: 0.8;
}
.next-btn {
  padding: 4px 30px;
  background-color: #e1e1e1;
  border: 1px solid #7a7a7a;
  color: #333;
  cursor: pointer;
}
.next-btn:hover {
  background-color: #cfcfcf;
}
.winBtnBasicHov-close {
  padding: 5px 16px;
  color: #333;
}
.winBtnBasicHov-std {
  padding: 5px 16px;
  color: #333;
}
.winBtnBasicHov-std:hover {
  background-color: #e1e1e1;
  color: #333;
}
.winBtnBasicHov-close:hover {
  background-color: #e81123;
  color: #fff;
}
</style>
