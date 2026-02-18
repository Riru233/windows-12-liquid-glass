<template>
  <div class="setup-container">
    <div class="window-frame">
      <div class="title-bar">
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
          >
            <div class="winBtnBasicHov-std">
              <svg class="icon windowBtnStdBasic" viewBox="0 0 1024 1024">
                <path
                  d="M160.213333 533.333333h703.658667a32 32 0 0 0 0-64H160.213333a32 32 0 0 0 0 64z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div class="winBtnBasicHov-std">
              <svg class="icon windowBtnStdBasic" viewBox="0 0 1024 1024">
                <path
                  d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"
                  fill="#ccc"
                ></path>
              </svg>
            </div>
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

      <div class="content">
        <div class="logo-section">
          <div
            id="actionbar"
            style="
              height: 40px;
              text-align: center;
              width: 100%;
              margin: 10px 0;
              color: #fff;
              align-items: center;
              font-size: 32px;
              display: flex;
              flex-direction: row;
              justify-content: center;
              gap: 8px;
            "
          >
            <svg
              class="icon"
              viewBox="0 0 1024 1024"
              width="48px"
              height="48px"
            >
              <defs>
                <linearGradient
                  id="lg-about"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stop-color="#fffc" />
                  <stop offset="100%" stop-color="#fff6" />
                </linearGradient>
              </defs>
              <path
                d="M81.92 289.42336v207.79008h415.29344V81.92H81.92v207.50336z m444.86656 0v207.79008H942.08V81.92H526.78656v207.50336zM81.92 734.57664V942.08h415.29344V526.78656H81.92v207.79008z m444.86656 0V942.08H942.08V526.78656H526.78656v207.79008z"
                fill="url(#lg-about)"
              ></path>
            </svg>
            <div>Windows 12</div>
          </div>
        </div>

        <div class="form-section">
          <div class="form-group">
            <label>Languag<u>e</u> to install:</label>
            <select>
              <option>English (United States)</option>
            </select>
          </div>
          <div class="form-group">
            <label><u>T</u>ime and currency format:</label>
            <select>
              <option>Chinese (Simplified, China)</option>
            </select>
          </div>
          <div class="form-group">
            <label><u>K</u>eyboard or input method:</label>
            <select>
              <option>Microsoft Wubi</option>
            </select>
          </div>
        </div>

        <p class="hint-text">
          Enter your language and other preferences and click "Next" to
          continue.
        </p>

        <div class="footer">
          <div class="copyright">
            © Microsoft Corporation. All rights reserved.
          </div>
          <button class="next-btn" @click="router.push('/setup/step3')">
            Next
          </button>
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
  color: white;
}

.setup-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* 模拟窗口外边框 */
.window-frame {
  width: 750px;
  height: 550px;
  border: 1px solid #717273;
  background-color: #190754;
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

/* 页面主体 */
.content {
  flex: 1;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background-color: #cccccc;
  border-top: 2px #fffa solid;
  border-bottom: 1px #fffa solid;
  border-left: none;
  border-right: none;
  border-radius: 10px;
  outline: #666 solid 1px;
  color: #333;
  cursor: pointer;
}
.next-btn:hover {
  background-color: #aaaaaa;
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
