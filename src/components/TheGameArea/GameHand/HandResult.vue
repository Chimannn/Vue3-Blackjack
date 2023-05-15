<template>
  <transition name="balloon">
    <div
      v-if="result"
      class="hand-result"
    >
      <component :is="types[result - 1]"></component>
    </div>
  </transition>
</template>

<script setup>
import ResultBlackjack from './HandResult/ResultBlackjack.vue'
import ResultBust from './HandResult/ResultBust.vue'
import ResultLose from './HandResult/ResultLose.vue'
import ResultPush from './HandResult/ResultPush.vue'
import ResultWin from './HandResult/ResultWin.vue'

const props = defineProps({
  result: {
    type: Number,
    required: false,
  }
})

const types = [ResultBust, ResultWin, ResultLose, ResultPush, ResultBlackjack]

</script>

<style scoped>
.hand-result {
  position: absolute;
  width: 4rem;
  top: 1rem;
  /* left: calc(50% - 13rem); */
  left: calc(50% - 1.998rem);
  text-align: center;
}
.hand-result svg {
  width: 4rem;
}
.balloon-enter-active {
  animation: balloon-in ease-in-out 0.6s;
  transform-origin: 50% 100%;
}
.balloon-leave-active {
  transition: all 0.1s;
  transform-origin: 50% 100%;
}
.balloon-leave-to {
  transform: scale(0);
  opacity: 0;
}
@keyframes balloon-in {
  0% {
    transform: scale(0.00) skewX(0deg) rotate(-20deg);
  }
  40% {
    transform: scale(1.00) skewX(-5deg) rotate(10deg);
  }
  50% {
    transform: skewX(5deg) rotate(-5deg);
  }
  60% {
    transform: skewX(-4deg) rotate(3deg);
  }
  70% {
    transform: skewX(4deg) rotate(-1deg);
  }
  80% {
    transform: skewX(-3deg) rotate(0deg);
  }
  85% {
    transform: skewX(3deg);
  }
  90% {
    transform: skewX(-2deg);
  }
  95% {
    transform: skewX(2deg);
  }
  100% {
    transform: skewX(0deg);
  }
}
</style>
