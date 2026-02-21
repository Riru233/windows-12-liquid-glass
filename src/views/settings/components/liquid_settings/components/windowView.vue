<template>
  <div id="contentbar">
    <div class="sidebar">
      <!-- 登录信息 -->
      <div style="display: flex; flex-direction: row; gap: 10px">
        <div
          style="
            background-color: #def;
            height: 54px;
            width: 54px;
            border: #ccc 1px solid;
            border-radius: 50%;
            justify-content: center;
            align-items: center;
            display: flex;
            font-size: 28px;
            color: #5af;
          "
        >
          #
        </div>
        <div
          style="display: flex; flex-direction: column; justify-content: center"
        >
          <div style="font-size: 14px; font-weight: bold">
            Microsoft Developer #5
          </div>
          <div style="font-size: 12px">john@microsoft.com</div>
        </div>
      </div>
      <br />
      <!-- 主页 -->
      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 10px 0 10px 10px;
          align-items: center;
        "
      >
        <div style="width: 16px; height: 16px">
          <img src="/public/icons/shell32_51380.png" alt="" />
        </div>
        <div style="font-size: 15px">Home</div>
      </div>
      <!-- 系统 -->

      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 10px 0 10px 10px;
          align-items: center;
        "
      >
        <div style="width: 16px; height: 16px">
          <img src="/public/settings/System.webp" alt="" />
        </div>
        <div style="font-size: 15px">System</div>
      </div>
      <!-- 蓝牙和其他设备 -->
      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 10px 0 10px 10px;
          align-items: center;
        "
      >
        <div style="width: 16px; height: 16px">
          <img src="/public/settings/Bluetooth & devices.webp" alt="" />
        </div>
        <div style="font-size: 15px">Bluetooth & devices</div>
      </div>
      <!-- 网络和因特网 -->
      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 10px 0 10px 10px;
          align-items: center;
        "
      >
        <div style="width: 16px; height: 16px">
          <img src="/public/settings/Network & internet.webp" alt="" />
        </div>
        <div style="font-size: 15px">Network & internet</div>
      </div>
      <!-- 个性化 -->
      <div
        style="
          display: flex;
          flex-direction: row;
          padding: 10px 0 10px 10px;
          background-color: #fffa;
          border-radius: 10px;
          align-items: center;
        "
      >
        <div
          style="
            background-color: #4af;
            height: 20px;
            width: 4px;
            border-radius: 2px;
            margin-left: -10px;
            margin-right: 4px;
          "
        ></div>
        <div style="width: 16px; height: 16px; margin-right: 10px">
          <img src="/public/settings/Personalisation.webp" alt="" />
        </div>
        <div style="font-size: 15px">Personalisation</div>
      </div>
      <!-- 应用 -->
      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 10px 0 10px 10px;
          align-items: center;
        "
      >
        <div style="width: 16px; height: 16px">
          <img src="/public/settings/Apps.webp" alt="" />
        </div>
        <div style="font-size: 15px">Apps</div>
      </div>
      <!-- 账户 -->
      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 10px 0 10px 10px;
          align-items: center;
        "
      >
        <div style="width: 16px; height: 16px">
          <img src="/public/settings/Accounts.webp" alt="" />
        </div>
        <div style="font-size: 15px">Accounts</div>
      </div>
      <!-- 时间和语言 -->
      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 10px 0 10px 10px;
          align-items: center;
        "
      >
        <div style="width: 16px; height: 16px">
          <img src="/public/settings/Time & language.webp" alt="" />
        </div>
        <div style="font-size: 15px">Time & language</div>
      </div>
      <!-- 游戏 -->
      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 10px 0 10px 10px;
          align-items: center;
        "
      >
        <div style="width: 16px; height: 16px">
          <img src="/public/settings/Gaming.webp" alt="" />
        </div>
        <div style="font-size: 15px">Gaming</div>
      </div>
      <!-- 辅助功能 -->
      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 10px 0 10px 10px;
          align-items: center;
        "
      >
        <div style="width: 16px; height: 16px">
          <img src="/public/settings/Accessibility.png" alt="" />
        </div>
        <div style="font-size: 15px">Accessibility</div>
      </div>
      <!-- 安全和隐私 -->
      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 10px 0 10px 10px;
          align-items: center;
        "
      >
        <div style="width: 16px; height: 16px">
          <img src="/public/settings/Privacy & security.webp" alt="" />
        </div>
        <div style="font-size: 15px">Privacy & security</div>
      </div>
      <!-- Windows Update -->
      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 10px 0 10px 10px;
          align-items: center;
        "
      >
        <div style="width: 16px; height: 16px">
          <img src="/public/settings/Windows Update.webp" alt="" />
        </div>
        <div style="font-size: 15px">Windows Update</div>
      </div>
    </div>
    <div class="content">
      <div
        style="
          font-size: 24px;
          display: flex;
          margin: 10px 0;
          flex-direction: row;
          gap: 0.5em;
        "
      >
        <div style="color: rgb(92, 92, 92)">Personalisation ></div>
        <div style="color: #000">Appearence</div>
      </div>
      <div
        style="height: calc(100% - 92px); overflow-y: scroll"
        class="overflow"
      >
        <!-- 预览 -->
        <div>
          <div
            style="
              width: 320px;
              height: 180px;
              border: #000 5px solid;
              border-radius: 20px;
              background: url(&quot;/public/imgbeta12.png&quot;) no-repeat
                center center;
              background-size: cover;
              margin: 10px 10px;
              position: relative;
            "
          >
            <div
              style="
                background-color: #fffa;
                backdrop-filter: blur(20px);
                width: 90px;
                height: 120px;
                z-index: 200px;
                margin-left: 220px;
                margin-top: 40px;
                border-radius: 10px;
                color: #555;
              "
            >
              <div
                style="margin-left: 10px; padding-top: 10px; line-height: 0.8em"
              >
                ————
              </div>
              <div style="margin-left: 10px; line-height: 0.8em">————</div>
              <div style="margin-left: 10px; line-height: 0.8em">————</div>
              <div style="margin-left: 10px; line-height: 0.8em">———</div>
              <div
                style="
                  margin-left: 55px;
                  margin-top: 30px;
                  border-radius: 10px;
                  width: 25px;
                  height: 10px;
                  background-color: #4af;
                "
              ></div>
            </div>
          </div>
        </div>
        <!-- 选择样式 -->
        <div
          style="
            height: 60px;
            border-radius: 5px;
            background-color: #fffc;
            margin: 10px 10px;
            border: solid 1px #cccc;
          "
          class="flex-lr"
        >
          <div class="icons">
            <svg
              class="icon"
              style="
                width: 24px;
                height: 24px;
                vertical-align: middle;
                fill: currentColor;
                overflow: hidden;
              "
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10418"
            >
              <path
                d="M245.333333 85.333333a32 32 0 0 0-32 32v490.666667a96 96 0 0 0 96 96H405.333333v128a106.666667 106.666667 0 1 0 213.333334 0v-128h96A96 96 0 0 0 810.666667 608V117.333333a32 32 0 0 0-32-32H245.333333z m32 384V149.333333h256v74.752a32 32 0 1 0 64 0V149.333333h42.666667v117.376a32 32 0 1 0 64 0V149.333333h42.666667V469.333333h-469.333334z m0 138.666667V533.333333h469.333334v74.666667a32 32 0 0 1-32 32h-128a32 32 0 0 0-32 32v160a42.666667 42.666667 0 0 1-85.333334 0v-160a32 32 0 0 0-32-32h-128a32 32 0 0 1-32-32z"
                p-id="10419"
              ></path>
            </svg>
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              flex: 1;
              justify-content: center;
            "
          >
            <div style="color: #000; font-size: 14px">Select a mode</div>
            <div style="color: #555; font-size: 12px">
              Change colors of Windows and apps
            </div>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              height: 10px;
              align-items: center;
              border-radius: 5px;
              background-color: #fffc;
              border-bottom: 1px solid #ddd;
              outline: #ddd 1px solid;
              padding: 10px 10px;
              width: 100px;
              margin: 0 10px;
            "
          >
            <div style="color: #000; font-size: 14px">Custom</div>
            <div style="flex-grow: 1"></div>
            <svg
              class="icon"
              width="12"
              height="12"
              style="margin: 0"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="51718"
            >
              <path
                d="M180.053333 361.386667a32 32 0 0 1 45.226667 0L512 648.106667l286.72-286.72a32 32 0 1 1 45.226667 45.226666l-309.333334 309.333334a32 32 0 0 1-45.226666 0L180.053333 406.613333a32 32 0 0 1 0-45.226666z"
                p-id="51719"
                fill="#888"
              ></path>
            </svg>
          </div>
          <div>
            <svg
              class="icon"
              width="14"
              height="14"
              style="margin: 0 10px 0 0"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="51718"
            >
              <path
                d="M180.053333 361.386667a32 32 0 0 1 45.226667 0L512 648.106667l286.72-286.72a32 32 0 1 1 45.226667 45.226666l-309.333334 309.333334a32 32 0 0 1-45.226666 0L180.053333 406.613333a32 32 0 0 1 0-45.226666z"
                p-id="51719"
                fill="#666"
              ></path>
            </svg>
          </div>
        </div>
        <!-- 拟态玻璃设置 -->
        <div
          style="
            border-radius: 5px;
            background-color: #fffc;
            border: solid 1px #cccc;
            margin: 10px 10px;
          "
          class="flex-ud"
        >
          <!-- 头 -->
          <div style="height: 60px" class="flex-lr">
            <div class="icons">
              <svg
                class="icon"
                style="
                  width: 24px;
                  height: 24px;
                  vertical-align: middle;
                  fill: currentColor;
                  overflow: hidden;
                "
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10418"
              >
                <path
                  d="M602.24 246.72a17.28 17.28 0 0 0-11.84-16.32l-42.88-14.4A90.56 90.56 0 0 1 490.24 160l-14.4-42.88a17.28 17.28 0 0 0-32 0L428.8 160a90.56 90.56 0 0 1-57.28 57.28l-42.88 14.4a17.28 17.28 0 0 0 0 32l42.88 14.4a90.56 90.56 0 0 1 57.28 57.28l14.4 42.88a17.28 17.28 0 0 0 32 0l14.4-42.88a90.56 90.56 0 0 1 57.28-57.28l42.88-14.4a17.28 17.28 0 0 0 12.48-16.96z m301.12 221.76l-48.32-16a101.44 101.44 0 0 1-64-64l-16-48.32a19.2 19.2 0 0 0-36.8 0l-16 48.32a101.44 101.44 0 0 1-64 64l-48.32 16a19.2 19.2 0 0 0 0 36.8l48.32 16a101.44 101.44 0 0 1 64 64l16 48.32a19.2 19.2 0 0 0 36.8 0l16-48.32a101.44 101.44 0 0 1 64-64l48.32-16a19.2 19.2 0 0 0 0-36.8z m-376.64 195.52l-64-20.8a131.84 131.84 0 0 1-83.52-83.52l-20.8-64a25.28 25.28 0 0 0-47.68 0l-20.8 64a131.84 131.84 0 0 1-82.24 83.52l-64 20.8a25.28 25.28 0 0 0 0 47.68l64 20.8a131.84 131.84 0 0 1 83.52 83.84l20.8 64a25.28 25.28 0 0 0 47.68 0l20.8-64a131.84 131.84 0 0 1 83.52-83.52l64-20.8a25.28 25.28 0 0 0 0-47.68z"
                  fill="currentColor"
                  p-id="3963"
                ></path>
              </svg>
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                flex: 1;
                justify-content: center;
              "
            >
              <div style="color: #000; font-size: 14px">
                Select appearence texture
              </div>
              <div style="color: #555; font-size: 12px">
                Change global texture of appearence such as transparent or
                opaque
              </div>
            </div>
            <div
              style="
                display: flex;
                flex-direction: row;
                height: 10px;
                align-items: center;
                border-radius: 5px;
                background-color: #fffc;
                border-bottom: 1px solid #ddd;
                outline: #ddd 1px solid;
                padding: 10px 10px;
                width: 100px;
                margin: 0 10px;
              "
            >
              <div style="color: #000; font-size: 14px">Crystal Acrylic</div>
              <div style="flex-grow: 1"></div>
              <svg
                class="icon"
                width="12"
                height="12"
                style="margin: 0"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="51718"
              >
                <path
                  d="M180.053333 361.386667a32 32 0 0 1 45.226667 0L512 648.106667l286.72-286.72a32 32 0 1 1 45.226667 45.226666l-309.333334 309.333334a32 32 0 0 1-45.226666 0L180.053333 406.613333a32 32 0 0 1 0-45.226666z"
                  p-id="51719"
                  fill="#888"
                ></path>
              </svg>
            </div>
            <div>
              <svg
                class="icon"
                width="14"
                height="14"
                style="margin: 0 10px 0 0"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="51718"
              >
                <path
                  d="M180.053333 662.613333a32 32 0 0 0 45.226667 0L512 375.893333l286.72 286.72a32 32 0 1 0 45.226667-45.226666l-309.333334-309.333334a32 32 0 0 0-45.226666 0l-309.333334 309.333334a32 32 0 0 0 0 45.226666z"
                  p-id="17827"
                ></path>
              </svg>
            </div>
          </div>
          <!-- 水晶亚克力可读性设置 -->
          <div class="flex-lr" style="height: 70px; border-top: #ccc 1px solid">
            <div class="icons">
              <div style="width: 24px"></div>
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                flex: 1;
                justify-content: center;
              "
            >
              <div style="color: #000; font-size: 14px">Acrylic Mask</div>
              <div style="color: #555; font-size: 12px">
                You can choose cloudy, hue or transparent texture to balance
                glass texture and readability
              </div>
            </div>
            <div
              style="
                display: flex;
                flex-direction: row;
                height: 10px;
                align-items: center;
                border-radius: 5px;
                background-color: #fffc;
                border-bottom: 1px solid #ddd;
                outline: #ddd 1px solid;
                padding: 10px 10px;
                width: 100px;
                margin: 0 10px;
              "
            >
              <div style="color: #000; font-size: 14px">None</div>
              <div style="flex-grow: 1"></div>
              <svg
                class="icon"
                width="12"
                height="12"
                style="margin: 0"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="51718"
              >
                <path
                  d="M180.053333 361.386667a32 32 0 0 1 45.226667 0L512 648.106667l286.72-286.72a32 32 0 1 1 45.226667 45.226666l-309.333334 309.333334a32 32 0 0 1-45.226666 0L180.053333 406.613333a32 32 0 0 1 0-45.226666z"
                  p-id="51719"
                  fill="#888"
                ></path>
              </svg>
            </div>
            <div>
              <div style="width:24px;"></div>
            </div>
          </div>
          <!-- 水晶亚克力模糊度 -->
          <div class="flex-lr" style="height: 48px; border-top: #ccc 1px solid">
            <div class="icons">
              <div style="width: 24px"></div>
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                flex: 1;
                justify-content: center;
              "
            >
              <div style="color: #000; font-size: 14px">
                The blurriness of Acrylic
              </div>
              <div style="color: #555; font-size: 12px">
                You can adjust the blurriness of Acrylic to balance ensure
                readability
              </div>
            </div>
            <div
              style="
                display: flex;
                flex-direction: row;
                height: 10px;
                align-items: center;
                border-radius: 5px;
                background-color: #fffc;
                border-bottom: 1px solid #ddd;
                outline: #ddd 1px solid;
                padding: 10px 10px;
                width: 100px;
                margin: 0 10px;
              "
            >
              <div style="color: #000; font-size: 14px">Tiny</div>
              <div style="flex-grow: 1"></div>
              <svg
                class="icon"
                width="12"
                height="12"
                style="margin: 0"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="51718"
              >
                <path
                  d="M180.053333 361.386667a32 32 0 0 1 45.226667 0L512 648.106667l286.72-286.72a32 32 0 1 1 45.226667 45.226666l-309.333334 309.333334a32 32 0 0 1-45.226666 0L180.053333 406.613333a32 32 0 0 1 0-45.226666z"
                  p-id="51719"
                  fill="#888"
                ></path>
              </svg>
            </div>
            <div>
              <div style="width:24px;"></div>
            </div>
          </div>
        </div>
        <!-- 色调 -->
        <div
          style="
            height: 60px;
            border-radius: 5px;
            background-color: #fffc;
            margin: 10px 10px;
            border: solid 1px #cccc;
          "
          class="flex-lr"
        >
          <div class="icons">
            <svg
              class="icon"
              style="
                width: 24px;
                height: 24px;
                vertical-align: middle;
                fill: currentColor;
                overflow: hidden;
              "
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10418"
            >
              <path
                d="M163.797333 249.941333c125.44-167.082667 385.28-215.68 570.197334-100.693333 182.613333 113.493333 249.770667 331.818667 174.933333 536.618667-70.613333 193.408-256.682667 269.994667-390.784 172.714666-50.218667-36.437333-69.717333-82.133333-79.104-156.330666l-4.522667-42.112-1.92-16.981334c-5.248-39.850667-13.269333-57.685333-30.08-67.072-22.826667-12.714667-38.058667-13.013333-68.053333-1.408l-14.976 6.229334-7.637333 3.328c-43.264 18.773333-72.021333 25.386667-108.416 17.749333l-8.533334-2.005333-6.997333-2.005334c-118.997333-36.864-136.618667-198.272-24.106667-348.032z m41.984 286.549334l5.248 1.578666 5.717334 1.28c18.730667 3.712 34.730667 0.64 61.312-10.325333l25.685333-10.965333c51.285333-21.034667 84.693333-23.04 129.962667 2.133333 39.125333 21.845333 54.4 55.381333 62.165333 113.493333l2.261333 19.584 2.346667 22.698667 2.005333 18.005333c7.338667 58.069333 20.693333 89.173333 53.248 112.810667 97.066667 70.4 236.117333 13.184 293.12-142.890667 64.682667-177.152 7.424-363.264-148.650666-460.330666-156.8-97.450667-379.690667-55.722667-485.248 84.778666-88.533333 117.888-77.653333 225.28-9.173334 248.149334z m478.933334-85.077334a53.333333 53.333333 0 1 1 102.997333-27.605333 53.333333 53.333333 0 0 1-102.997333 27.605333z m21.077333 148.821334a53.333333 53.333333 0 1 1 103.04-27.605334 53.333333 53.333333 0 0 1-103.04 27.605334zM600.32 323.285333a53.333333 53.333333 0 1 1 103.04-27.605333 53.333333 53.333333 0 0 1-103.04 27.605333z m-1.194667 383.914667a53.333333 53.333333 0 1 1 102.997334-27.605333 53.333333 53.333333 0 0 1-102.997334 27.605333z m-149.205333-425.386667a53.333333 53.333333 0 1 1 103.04-27.562666 53.333333 53.333333 0 0 1-103.04 27.562666z"
                p-id="18696"
              ></path>
            </svg>
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              flex: 1;
              justify-content: center;
            "
          >
            <div style="color: #000; font-size: 14px">Colour</div>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              height: 10px;
              align-items: center;
              border-radius: 5px;
              background-color: #fffc;
              border-bottom: 1px solid #ddd;
              outline: #ddd 1px solid;
              padding: 10px 10px;
              width: 100px;
              margin: 0 10px;
            "
          >
            <div style="color: #000; font-size: 14px">Auto</div>
            <div style="flex-grow: 1"></div>
            <svg
              class="icon"
              width="12"
              height="12"
              style="margin: 0"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="51718"
            >
              <path
                d="M180.053333 361.386667a32 32 0 0 1 45.226667 0L512 648.106667l286.72-286.72a32 32 0 1 1 45.226667 45.226666l-309.333334 309.333334a32 32 0 0 1-45.226666 0L180.053333 406.613333a32 32 0 0 1 0-45.226666z"
                p-id="51719"
                fill="#888"
              ></path>
            </svg>
          </div>
          <div>
            <svg
              class="icon"
              width="14"
              height="14"
              style="margin: 0 10px 0 0"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="51718"
            >
              <path
                d="M180.053333 361.386667a32 32 0 0 1 45.226667 0L512 648.106667l286.72-286.72a32 32 0 1 1 45.226667 45.226666l-309.333334 309.333334a32 32 0 0 1-45.226666 0L180.053333 406.613333a32 32 0 0 1 0-45.226666z"
                p-id="51719"
                fill="#666"
              ></path>
            </svg>
          </div>
        </div>
        <!-- 相关设置 -->
        <div
          style="
            color: #000;
            font-weight: 600;
            font-size: 14px;
            margin: 20px 0 0 10px;
          "
        >
          Related Settings
        </div>
        <!-- 高对比度主题 -->
        <div
          style="
            height: 60px;
            border-radius: 5px;
            background-color: #fffc;
            margin: 10px 10px;
            border: solid 1px #cccc;
          "
          class="flex-lr"
        >
          <div class="icons">
            <svg
              class="icon"
              style="
                width: 24px;
                height: 24px;
                vertical-align: middle;
                fill: currentColor;
                overflow: hidden;
              "
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10418"
            >
              <path
                d="M512 938.666667c235.648 0 426.666667-191.018667 426.666667-426.666667S747.648 85.333333 512 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667z m0-64v-725.333334a362.666667 362.666667 0 0 1 0 725.333334z"
                p-id="18806"
              ></path>
            </svg>
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              flex: 1;
              justify-content: center;
            "
          >
            <div style="color: #000; font-size: 14px">High-contrast theme</div>
            <div style="color: #555; font-size: 12px">
              Color themes suitable for amblyopia and strong light sensitivity
            </div>
          </div>
          <div>
            <svg
              class="icon"
              width="14"
              height="14"
              style="margin: 0 10px 0 0"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="51718"
            >
              <path
                d="M361.386667 180.053333a32 32 0 0 0 0 45.226667L648.106667 512l-286.72 286.72a32 32 0 1 0 45.226666 45.226667l309.333334-309.333334a32 32 0 0 0 0-45.226666L406.613333 180.053333a32 32 0 0 0-45.226666 0z"
                p-id="18300"
              ></path>
            </svg>
          </div>
        </div>
        <!-- 相关支持 -->
        <div
          style="
            color: #000;
            font-weight: 600;
            font-size: 14px;
            margin: 20px 0 0 10px;
          "
        >
          Related Support
        </div>
        <!-- 选择样式 -->
        <div
          style="
            height: 60px;
            border-radius: 5px;
            background-color: #fffc;
            margin: 10px 10px;
            border: solid 1px #cccc;
          "
          class="flex-lr"
        >
          <div class="icons">
            <svg
              class="icon"
              style="
                width: 24px;
                height: 24px;
                vertical-align: middle;
                fill: currentColor;
                overflow: hidden;
              "
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10418"
            >
<path d="M146.816 424.746667a210.176 210.176 0 0 0 265.941333 323.029333l181.589334 181.632a32.981333 32.981333 0 0 0 49.877333-42.965333l-3.2-3.712-179.968-179.968a210.218667 210.218667 0 0 0-314.24-278.016z m366.293333-339.498667c-202.922667 0-372.736 141.610667-416.042666 331.392a252.245333 252.245333 0 0 1 95.36-74.24A363.733333 363.733333 0 0 1 379.989333 174.506667l-4.565333 7.424c-22.954667 38.101333-41.429333 85.802667-54.4 139.946666 21.290667 2.133333 42.24 6.997333 62.506667 14.506667 26.965333-112.128 77.781333-187.093333 129.578666-187.093333l4.906667 0.213333c54.016 4.949333 106.154667 90.368 130.389333 213.162667h-213.248a254.08 254.08 0 0 1 66.133334 63.957333l156.757333 0.042667a809.557333 809.557333 0 0 1-5.802667 213.333333h-112.853333a251.52 251.52 0 0 1-12.757333 35.925333l-5.504 11.605334-5.205334 9.770666 6.741334 6.698667h115.84c-8.661333 31.957333-19.242667 60.501333-31.232 84.693333l47.146666 47.232c20.992-36.608 38.058667-81.408 50.346667-131.84l116.138667-0.085333a364.245333 364.245333 0 0 1-159.317334 139.093333l9.6 9.514667 5.333334 5.973333c9.386667 12.629333 14.677333 26.666667 16.128 40.661334A426.752 426.752 0 0 0 939.818667 512c0-235.690667-191.061333-426.752-426.709334-426.752z m-115.712 386.133333a144.213333 144.213333 0 1 1-203.946666 203.946667 144.213333 144.213333 0 0 1 203.946666-203.946667zM722.432 426.666667l143.274667-0.042667 0.341333 1.28c6.4 27.008 9.813333 55.125333 9.813333 84.053333a361.813333 361.813333 0 0 1-23.253333 128l-135.424 0.085334c6.101333-40.533333 9.301333-83.541333 9.301333-128.042667 0-29.184-1.365333-57.728-4.053333-85.333333z m-76.245333-252.202667l0.981333 0.341333A363.946667 363.946667 0 0 1 843.776 362.666667h-130.090667c-13.354667-74.794667-36.693333-139.861333-67.498666-188.16z" p-id="18905"></path>
            </svg>
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              flex: 1;
              justify-content: center;
            "
          >
            <div style="color: #000; font-size: 14px">Colour Help</div>
          </div>
          <div>
            <svg
              class="icon"
              width="14"
              height="14"
              style="margin: 0 10px 0 0"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="51718"
            >
              <path
                d="M180.053333 361.386667a32 32 0 0 1 45.226667 0L512 648.106667l286.72-286.72a32 32 0 1 1 45.226667 45.226666l-309.333334 309.333334a32 32 0 0 1-45.226666 0L180.053333 406.613333a32 32 0 0 1 0-45.226666z"
                p-id="51719"
                fill="#666"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
@import "tailwindcss";

* {
  box-sizing: unset;
}

p {
  margin: 0;
}
.content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.sidebar {
  width: 260px;
  overflow-y: scroll;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 5px 15px;
  color: #000;
}

.icons {
  margin: 10px;
  color: #555;
}
.flex-lr {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.flex-ud {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#contentbar {
  display: flex;
  flex-direction: row;
  height: 100%;
  max-height: 100%;
}
</style>
