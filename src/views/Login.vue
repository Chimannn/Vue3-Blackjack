<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-title">
        <GameLogo class="indexLogo" />
      </div>
      <div class="login-form">
        <div class="login-form-item">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="11" y="4" width="26" height="40" rx="3" fill="none" stroke="#333" stroke-width="4" />
            <path d="M22 10L26 10" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20 38H28" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <input v-model="form.username" type="text" name="phone" autocomplete="off" placeholder="请输入手机号" />
        </div>
        <div class="login-form-item">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill="white" fill-opacity="0.01" />
            <rect x="6" y="22" width="36" height="22" rx="2" fill="none" stroke="#333" stroke-width="4"
              stroke-linejoin="round" />
            <path d="M14 22V14C14 8.47715 18.4772 4 24 4C29.5228 4 34 8.47715 34 14V22" stroke="#333" stroke-width="4"
              stroke-linecap="round" stroke-linejoin="round" />
            <path d="M24 30V36" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <input v-model="form.password" type="password" name="password" autocomplete="off" placeholder="请输入密码" />
        </div>
      </div>
      <div class="login-forget">
        <span>忘记密码？</span>
      </div>
      <Button block type="primary" @click="onLogin" class="loginBtn">登录</Button>
      <!-- <div class="login-other">
        <Divider>其他登陆方式</Divider>
        <ul>
          <li>
            <Button size="small" @click="Dialog({ message: '点击微信' })">微信</Button>
          </li>
          <li>
            <Button size="small" @click="Dialog({ message: '点击淘宝' })">淘宝</Button>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script setup name="Login">
import { reactive } from "vue";
import { Button, Divider, Dialog } from "vant";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import GameLogo from "@/components/GameLogo.vue"

const router = useRouter();
const userStore = useUserStore();

const form = reactive({
  username: "",
  password: "",
});

function onLogin() {

  userStore.Login(form).then((response) => {
    router.push({path: '/home'})
  }).catch((err) => {
    Dialog.alert({message: err});
  })

}
</script>

<style scoped lang="scss">

.login-container {
  position: relative;
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

// .login-header {
//     width: 355px;
//     height: 220px;
//     background: #1989fa;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-top: -20px;
//     padding: 0px 10px;

//     svg {
//         height: 220px;
//     }
// }

.login-content {
    top: 3rem;
    width: 8rem;
    max-width: 350PX;
    height: auto;
    overflow: hidden;
    position: absolute;
    left: 50%;
    color: white;
    box-shadow: -.027rem .1rem .75rem 0rem rgba(0,0,0,0.75);
    background: rgba(0, 0, 0, 0.4);
    border: none;
    border-radius: .4rem;
    padding: .5rem;
    top: 45%;
    transform: translate(-50%, -50%);
}

.login-title {
    letter-spacing: 3px;
    margin-bottom: .5rem;
    text-align: center;
}

.login-form {
    height: auto;
    overflow: hidden;

    &-item {
        height: 45px;
        max-height: 45PX;
        background: #f1f1f1;
        margin-bottom: 15px;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        padding-right: 30px;

        input {
            height: 30px;
            max-height: 30PX;
            width: 100%;
            padding: 0 .4rem;
            background: none;
            color: #999999;
            font-size: 15px;
            border: none;
        }
    }
}

.login-forget {
    text-align: right;
    font-size: 11px;
    color: #1989fa !important;
    margin-bottom: .3rem;
}
.loginBtn{
  width: 100%;
  max-height: 50PX;
}
// .login-other {
//     margin-top: 50px;

//     ul {
//         display: flex;
//         width: 100%;
//         justify-content: center;
//         align-items: center;
//         li{
//             margin: 0px 5px;
//         }
//     }
// }

}
</style>