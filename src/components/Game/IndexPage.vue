<template>
    <div class="indexBG">
        <GameLogo class="indexLogo" />
        <div class="middleBtn">
            <Button size="large" class="startBtn" @click="start">点击开始</Button> 
            <Button size="large" class="transferBtn" @click="transfer">请喝咖啡（kaspa）</Button> 
        </div>
        <div class="bottomBtn">
            <Button size="normal" class="rule" @click="(() => showRules = !showRules)">游戏规则</Button> 
            <Button size="normal" class="homepage" @click="gotoPerson">个人主页</Button> 
        </div>
    </div>
    <Popup v-model:show="showRules" :style="popupClass">规则内容</Popup>
    <transferPop :show="show" @popupClosed="handlePopupClosed" />
</template>

<script setup>
import { useRouter } from "vue-router";
import { Button, Popup } from "vant";
import transferPop from "./components/transferPop.vue";
import { ref } from "vue";
import GameLogo from "../GameLogo.vue"

const router = useRouter();
const showRules = ref(false)
const show = ref(false)
const popupClass = `{
    z-index = 2013;
    width: 80%;
    height: 60%;
    border-radius: 0.6rem;
    text-align: center;
}`

const start = () => {
    router.push({path: "/game"})
}

const transfer = () => {
    show.value = true
}

const gotoPerson = () => {
    router.push({ path: '/person' })
}

const handlePopupClosed = () => {
    show.value = false
}

</script>

<style scoped lang="scss">
.indexBG{
    .indexLogo{
        display: block;
        height: 2rem;
        margin: 1rem auto;
    }
    height: 100%;
    background: linear-gradient(
		180deg,
		rgba(117, 84, 160, 1) 7%,
		rgba(117, 84, 160, 1) 17%,
		rgba(106, 95, 168, 1) 29%,
		rgba(99, 103, 174, 1) 44%,
		rgba(87, 116, 184, 1) 66%,
		rgba(70, 135, 198, 1) 83%,
		rgba(44, 163, 219, 1) 96%,
		rgba(22, 188, 237, 1) 100%,
		rgba(0, 212, 255, 1) 100%
    );
    position: relative;
    overflow: hidden;
    .middleBtn{
        width: 8rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: .75rem;
        position: absolute;
        .startBtn,.transferBtn {
            width: 8rem;
            margin-bottom: .8rem;
        }
    }
    .startBtn, .rule, .homepage, .transferBtn{
        color: white;
        box-shadow: -.027rem .1rem .75rem 0rem rgba(0,0,0,0.75);
		background: rgba(0, 0, 0, 0.4);
        border: none;
        border-radius: .4rem;
    }
    .rule{
        width: 3rem;
    }
    .homepage{
        width: 3rem;
    }
    .bottomBtn{
        position: absolute;
        left: 50%;
        width: 8rem;
        top: 80%;
        transform: translateX(-50%);
        display: flex;
        justify-content: space-between;
    }
}
</style>