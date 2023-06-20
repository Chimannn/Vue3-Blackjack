<template lang="">
    <div class="purseBG">
        <div class="title">Wallet</div>
        <div class="returnImg" @click="returnPerson">
            <img src="@/../public/purseImg/return.png" alt="">
        </div>
        <div class="creditCard">
            <div class="creditDiv">
                <div class="creditFont">Credit</div>
                <span class="creditSpan" @click="changeCreditType">
                    <span ref="openBtn" class="openBtn btn"></span>
                    <span ref="closeBtn" class="closeBtn btn"></span>
                </span>
            </div>
            <div class="bottom">
                <div class="bottomFont">**** 1234 4321 1234</div>
                <div class="bottomDate">03/26</div>
            </div>
        </div>
        <div class="balanceCard">
            <div class="balanceFont">Current balance</div>
            <div class="balanceValue">$123,123.131</div>
        </div>
        <div class="creditBtn">
            <span class="send">send</span>
            <span class="invest">Invest</span>
        </div>
        <div class="transaction">
            <div class="titleDiv">
                <div class="titleTrans">Transaction</div>
                <div class="date">Last 4 days</div>
            </div>
        </div>
        <div class="scrollDiv">
            <template v-for="item in transactionRecord">
                <div class="scrollItem">
                    <span class="icon">{{ item.currencyTitle == "Bitcoin" ? "B" : "E"  }}</span>
                    <span class="titleSpan">
                        <div class="scrollTitle">
                            <span>{{ item.currencyTitle }}</span>
                            <span>${{ item.value }}</span>
                        </div>
                        <div class="type">{{ item.type }}</div>
                    </span>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup> 
import router from "@/router";
import { ref, reactive } from "vue";

    const openBtn = ref()
    const closeBtn = ref()

    let changeFlag = ref(true)
    let creditType = ref(true)
    const transactionRecord = reactive([
        {
            currencyTitle: "Bitcoin",
            value: "88,223",
            type: "send"
        },
        {
            currencyTitle: "Ethereum",
            value: "3,211",
            type: "invest"
        },{
            currencyTitle: "Bitcoin",
            value: "2,110",
            type: "send"
        },
        {
            currencyTitle: "Ethereum",
            value: "223",
            type: "invest"
        }
    ])


    const changeCreditType = () => {
        if(!changeFlag) return 

        changeFlag = false
        setTimeout(()=>{
            changeFlag = true
        },950)

        if(creditType){
            toChange(openBtn,closeBtn)
        }else{
            toChange(closeBtn,openBtn)
        }
        creditType = !creditType

    }
    const toChange = (left,right) => {
        left.value.style.animationName = "toRight"
        right.value.style.animationName = "toLeft"
    }

    const returnPerson = () => {
        router.push({ path: "/person" })
    }
</script>

<style lang="scss">
    .purseBG {
        background: rgb(30, 30, 30);
        height: 100%;
        overflow: auto;
        position: relative;
        .returnImg{
            position: absolute;
            top: 1rem;
            right: .48rem;
            img{
                width: .5rem;
            }
        }
        .title{
            position: absolute;
            top: 1rem;
            left: .48rem;
            height: .76rem;
            font-family: Lato;
            font-size: .64rem;
            font-weight: bold;
            color: #F1F1F1;
        }
        .creditCard{
            box-sizing: border-box;
            position: absolute;
            top: 2.56rem;
            left: 50%;
            transform: translateX(-50%);
            width: calc( 100% - .96rem );
            height: 3.9rem;
            border-radius: .48rem;
            padding: .48rem;
            background: linear-gradient(154deg, #343434 -2%, #010101 105%);
            .creditDiv{
                display: flex;
                justify-content: space-between;
                .creditFont{
                    font-family: Lato;
                    font-size: .4rem;
                    font-weight: bold;
                    line-height: .48rem;
                    color: #F1F1F1;;
                }
                .creditSpan{
                    position: relative;
                    .btn{
                        display: block;
                        width: .48rem;
                        height: .48rem;
                        background-repeat: no-repeat;
                        background-size: contain;
                        position: absolute;
                        animation-duration: 0.9s;
                        animation-fill-mode: forwards;
                    }
                    .openBtn{
                        right: .24rem;
                        background-image: url("@/../public/purseImg/creditBtn1.png");
                    }
                    .closeBtn{
                        right: 0rem;
                        background-image: url("@/../public/purseImg/creditBtn2.png");
                    }
                }   

            }
            .bottom{
                display: flex;
                justify-content: space-between;
                position: absolute;
                bottom: .48rem;
                left: 50%;
                transform: translateX(-50%);
                width: calc( 100% - .96rem );
                .bottomFont{
                    font-family: Lato;
                    font-size: .28rem;
                    font-weight: 500;
                    line-height: .336rem;
                    letter-spacing: 0;
                    color: #8C8C8C;
                }
                .bottomDate{
                    font-family: Lato;
                    font-size: .32rem;
                    font-weight: bold;
                    line-height: .384rem;
                    letter-spacing: 0;
                    color: #F1F1F1;
                }
            }
        }
        .balanceCard{
            box-sizing: border-box;
            position: absolute;
            top: 6.9rem;
            left: .48rem;
            .balanceFont{
                font-family: Lato;
                font-size: .28rem;
                font-weight: 500;
                line-height: .338rem;
                letter-spacing: 0;
                color: #8C8C8C;
            }
            .balanceValue{
                margin-top: .24rem;
                font-family: Lato;
                font-size: .64rem;
                font-weight: bold;
                line-height: .768rem;
                letter-spacing: 0;
                color: #F1F1F1;
            }
        }
        .creditBtn{
            position: absolute;
            top: 8.72rem;
            left: .48rem;
            color: #fff;
            font-family: Lato;
            font-size: .32rem;
            font-weight: bold;
            text-align: center;
            display: flex;
            letter-spacing: 0px;
            width: calc(100% - 0.96rem);
            justify-content: space-between;
            .send{
                display: inline-block;
                box-shadow: -8px -8px 12px 0px rgba(39, 39, 44, 0.48),8px 8px 16px 0px rgba(4, 4, 4, 0.8),inset -2px -2px 2px 0px rgba(61, 16, 124, 0.64),inset 2px 2px 2px 0px #9D6AE3;
                width: 4.1rem;
                height: .96rem;
                border-radius: .48rem;
                background: #9142FF;
                line-height: .96rem;
            }
            .invest{
                display: inline-block;
                box-shadow: -8px -8px 12px 0px rgba(39, 39, 44, 0.48),8px 8px 16px 0px rgba(4, 4, 4, 0.8),inset -2px -2px 2px 0px rgba(9, 94, 68, 0.64),inset 2px 2px 2px 0px #6DFFD3;
                width: 4.1rem;
                height: .96rem;
                border-radius: .48rem;
                background: #00D092;
                line-height: .96rem;
            }
        }
        .transaction{
            top: 11rem;
            left: 50%;
            transform: translateX(-50%);
            width: calc( 100% - 1.4rem );
            position: absolute;
            .titleDiv{
                font-family: Lato;
                display: flex;
                justify-content: space-between;
                .titleTrans{
                    color: #F1F1F1;
                    font-size: .4rem;
                    font-weight: bold;
                    line-height: .48rem;
                }
                .date{
                    color: #8C8C8C;
                    font-size: .28rem;
                    font-weight: 500;
                    line-height: .336rem;
                }
            }
        }
        .scrollDiv{
            top: 11.9rem;
            left: 50%;
            transform: translateX(-50%);
            width: calc( 100% - 1.4rem );
            position: absolute;
            padding-bottom: 1rem;
            .scrollItem{
                margin-top: .7rem;
                display: flex;
                justify-content:space-between;
                color: #fff;
                width: 7.32rem;
                height: 1.92rem;
                border-radius: .48rem;
                padding: .48rem;
                background-color: #1e1e1e;
                box-shadow: -8px -8px 12px 0px rgba(39, 39, 44, 0.48),8px 8px 16px 0px rgba(4, 4, 4, 0.8),inset -2px -2px 2px 0px rgba(4, 4, 4, 0.64),inset 2px 2px 2px 0px rgba(39, 39, 44, 0.56);
                .titleSpan{
                    width: 100%;
                    margin-left: 0.5rem;
                    .scrollTitle{
                        width: 100%;
                        font-family: Lato;
                        font-size: .32rem;
                        font-weight: bold;
                        line-height: .384rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .type{
                        float: right;
                        font-size: .28rem;
                        color: #9142FF;
                        margin-top: 1rem;
                    }
                }
            }
        }
    }

    @keyframes toRight {
        from {
            right: 0.24rem;
            z-index: 2;
            filter: brightness(100%);
        }
        to {
            right: 0rem;
            z-index: 1;
            filter: brightness(50%);
        }
    }
    @keyframes toLeft {
        from {
            right: 0rem;
            z-index: 1;
            filter: brightness(50%);
        }
        to {
            right: 0.24rem;
            z-index: 2;
            filter: brightness(100%);
        }
    }
</style>