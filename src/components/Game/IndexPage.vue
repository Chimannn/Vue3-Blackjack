<template>
    <div class="indexBG">
        <GameLogo />

        <Button size="large" class="startBtn" @click="start">点击开始</Button> 
        <Button size="normal" class="rule">游戏规则</Button> 
        <Button size="normal" class="homepage" @click="gotoPerson">个人主页</Button> 
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { Button } from "vant";
import GameLogo from "../GameLogo.vue"

const router = useRouter();

const start = () => {
    // document.getElementsByTagName("html")[0].style.fontSize = "16px"
    router.push({path: "/game"})
}

const gotoPerson = () => {
    router.push({ path: '/person' })
}

</script>

<style scoped lang="scss">
.indexBG{
    width: 100vw;
    height: 100vh;
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
    .startBtn{
        width: 8rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: .75rem;
    }
    .startBtn, .rule, .homepage{
        position: absolute;
        color: white;
        box-shadow: -.027rem .1rem .75rem 0rem rgba(0,0,0,0.75);
		background: rgba(0, 0, 0, 0.4);
        border: none;
        border-radius: .4rem;
    }
    .rule{
        width: 3rem;
        top: 80%;
        left: 1rem;
    }
    .homepage{
        width: 3rem;
        top: 80%;
        right: 1rem;
    }
}
</style>