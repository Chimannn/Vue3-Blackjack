<template>
    <Popup v-model:show="showPopup" class="pop" closeable @close="onPopupClose">
        <div class="popup">
            <span>Kaspa</span>
            <canvas ref="qrcode" />
        </div>
    </Popup>
</template>
    
<script setup>
import { Popup } from "vant";
import { onActivated, onMounted, ref, watch} from "vue";
import QRCode from "qrcode"

const qrcode = ref(null)

const generateQRCode = async () => {
    console.log(123);
    const url = 'https://www.baidu.com';
    const canvas = qrcode.value;
    await QRCode.toCanvas(canvas, url, {
        width: 300,
        margin: 3,
    });
}

const props = defineProps({
    show: Boolean
})

const emit = defineEmits(['popupClosed'])

const showPopup = ref(props.show)

const onPopupClose = () => {
    showPopup.value = false
    emit('popupClosed')
}

watch(()=>props.show, (newVal) => {
    showPopup.value = newVal
    if(newVal){
        generateQRCode()
    }
})

</script>
    
<style scoped  lang="scss" >
.pop {
    border-radius: 0.6rem;
    width: 80%;
    height: 60%;
    div {
        text-align: center;
    }
}
</style>