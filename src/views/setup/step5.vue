<template>
  <SetupFrame>
    <div class="content">
      <h1>Product key</h1>

      <div style="font-size: 13px">
        <p>
          The product key should be with the box the DVD came in or on your
          email receipt.
        </p>
        <p>It looks similar to this: XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</p>
      </div>
      <br />
      <div
        class="product-key-input-wrapper"
        @click="hideWarn"
        style="
          display: flex;
          justify-content: center;
          margin-bottom: 25px;
          flex-direction: column;
          font-size: 13px;
        "
      >
        <p>Enter Product key:</p>
        <div
          class="input-container"
          style="position: relative; flex: 1; max-width: 400px; display: flex"
        >
          <input
            type="text"
            :value="productKey"
            @input="handleInput"
            placeholder="Dashes will be added automatically."
            maxlength="29"
            style="
              height: 24px;
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
            style="width: 24px; height: 24px; margin: 3px 0 0 10px"
          >
            <path
              d="m853.45333,183a96,96 0 0 1 96,96l0,405.54667a96,96 0 0 1 -96,96l-661.12,0a96,96 0 0 1 -96,-96l0,-405.54667a96,96 0 0 1 96,-96l661.12,0zm0,64l-661.12,0a32,32 0 0 0 -32,32l0,405.54667c0,17.664 14.336,32 32,32l661.12,0a32,32 0 0 0 32,-32l0,-405.54667a32,32 0 0 0 -32,-32zm-106.45333,341.33333a32,32 0 0 1 4.352,63.70134l-4.352,0.29866l-448,0a32,32 0 0 1 -4.352,-63.70133l4.352,-0.29867l448,0zm-32,-149.33333a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm-255.78667,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm-128,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm256,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm-320.21333,-128a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm127.78667,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm128,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm128,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333zm128,0a42.66667,42.66667 0 1 1 0,85.33333a42.66667,42.66667 0 0 1 0,-85.33333z"
              p-id="8880"
              fill="#ababab"
            />
          </svg>
        </div>

        <div
          style="color: red"
          :style="stat.alert ? { opacity: 1 } : { opacity: 0 }"
        >
          Please enter a valid product key.
        </div>
      </div>
    </div>
    <div class="textbtn-content">
      <button
        @click="router.push('/setup/step6')"
        style="
          color: #0078d7;
          background-color: #fff0;
          border: none;
          cursor: pointer;
          text-align: left;
        "
      >
        <u>I</u> don't have a product key
      </button>
      <button
        style="
          color: #0078d7;
          background-color: #fff0;
          border: none;
          cursor: pointer;
          text-align: left;
        "
      >
        <u>P</u>rivacy Statement
      </button>
    </div>
    <div class="footer">
      <img src="/public/microsoft.png" alt="" style="height: 16px" />
      <div class="textbtn"><u>S</u>upport</div>
      <div class="textbtn"><u>L</u>egal</div>
      <div style="flex-grow: 1"></div>
      <button class="fillbtn" @click="router.push('/setup/step3')">
        <u>B</u>ack
      </button>
      <button class="fillbtnnext" @click="verify"><u>N</u>ext</button>
    </div>
  </SetupFrame>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, ref, nextTick } from "vue";
import SetupFrame from "@/components/setup/frame.vue";
const router = useRouter();

const productKey = ref("");
const stat = reactive({
  alert: false,
});

// 字符串仿真

const handleInput = (e) => {
  const input = e.target;
  // 记录当前光标位置
  let cursorPosition = input.selectionStart;
  let originalValue = input.value;

  // 1. 强制转大写并过滤非法字符（仅保留字母数字）
  let rawValue = originalValue.toUpperCase().replace(/[^A-Z0-9]/g, '');

  // 2. 限制总长度为 25 个有效字符 (5串 * 5字符)
  rawValue = rawValue.substring(0, 25);

  // 3. 核心格式化逻辑：每 5 个字符后自动补全横杠
  // 这同时也处理了删除逻辑：如果删除了某串首字符，由于 rawValue 减少，join('-') 会自动重新排列横杠
  const segments = rawValue.match(/.{1,5}/g);
  const formattedValue = segments ? segments.join('-') : rawValue;

  // 4. 计算光标修正偏移量
  // 如果输入后自动补了横杠，或者删除了字符导致横杠变动，需要调整光标防止跳到末尾
  const diff = formattedValue.length - originalValue.length;
  
  productKey.value = formattedValue;

  // 5. 在 DOM 更新后恢复光标位置
  nextTick(() => {
    const newPosition = cursorPosition + diff;
    input.setSelectionRange(newPosition, newPosition);
  });
};

// 认证
const verify = () => {
  if (productKey.value === "") {
    stat.alert = true;
    return;
  }
  if (productKey !== "FB12A-DE7B2-A921F-C8E7D-E31E0") {
    stat.alert = true;
    return;
  }
  router.push("/setup/step6");
};

const hideWarn = () => {
  stat.alert = false;
};
</script>
