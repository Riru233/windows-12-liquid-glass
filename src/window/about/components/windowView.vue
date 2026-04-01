<template>
    <div id="contentbar">
        <div style="margin: 10px 70px; color: #000; font-size: 12px;line-height: 1.8em;">
            <p>Microsoft Windows</p>
            <p>版本 26H2（系统内部版本：29900.2620）</p>
            <p>© 微软公司。保留所有权利。</p>
            <br />
            <p>
                Windows 12 专业工作站版 操作系统及其用户界面受美国和其他国家/地区的商标法和其他待颁布的知识产权法保护。
            </p>
            <br /><br /><br />
            <p>
                根据
                <a style="color:#008cff;text-decoration: underline;">微软公司 软件许可条款</a>
                准许如下用户使用本产品:
            </p><br />
            <p style="padding-left: 2em">微软 用户</p>
            <p style="padding-left: 2em">组织名称</p>
        </div>
    </div>
</template>
<script setup></script>
<style scoped>
p {
    margin: 0;
}

#contentbar {
    margin: 0 1px 1px;
    width: calc(100% - 2px);
    border-radius: 8px;
    max-height: calc(100% - 8px);
    flex: 1;
    background-color: #fffa;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(58, 58, 58, 0.333) 0px 0px 20px 1px;
    border-top: solid 2px #ffffffaa;
    border-bottom: solid 1px #ffffffaa;
    outline: solid #6663 1px;
}
</style>