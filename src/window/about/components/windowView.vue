<template>
    <div id="contentbar">
        <div style="margin: 10px 40px; color: #000; font-size: 11px">
            <p>Microsoft Windows</p>
            <p>Version: 29835.1020</p>
            <p>© Microsoft Corporation. All rights reserved.</p>
            <br />
            <p>
                Windows 12 Pro operating system and its user
                interface are protected by trademark and other pending or
                existing intellectual property rights in the United States and
                other countries.
            </p>
            <br /><br /><br />
            <p>
                This product is licensed under the
                <a style="color:#008cff;text-decoration: underline;">Microsoft Software License Terms</a>
                to:
            </p>
            <p style="padding-left: 2em">Microsoft User</p>
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