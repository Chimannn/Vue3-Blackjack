<template>
    <span
      class="bank"
      :class="{ 'is-increasing': isIncreasing }"
    >
      <GameCoin :class="{ 'is-spinning': isIncreasing }" />
      <small>&times;</small>
      <span class="number">{{ gameStore.bank }}</span>
    </span>
</template>

<script setup>
import GameCoin from './GameCoin.vue'
import { game } from "@/stores/game"
import { reactive, watch, toRefs } from 'vue'
const gameStore = game()

const state = reactive({
  isIncreasing: false
})

const { isIncreasing } = toRefs(state)

watch(
  () => gameStore.bank,
  (current, previous)=> {
    if (current > previous) {
      const { startingBank, minimumBet } = gameStore.settings
      if (previous === 0 && current === startingBank - minimumBet) return // do not animate starting bank
      if (current > previous) state.isIncreasing = true
      setTimeout(() => { state.isIncreasing = false }, 1000)
    }
  }
)
</script>

<style lang="scss" scoped>
.bank {
  background: rgba(0, 0, 0, 0.1);
  height: 1rem;
  display: inline-flex;
  padding: .18rem;
  justify-content: center;
  align-items: center;
  border-radius: .7rem;
  font-weight: 500;
  font-size: .74rem;
  transition: all 0.2s ease;
  color: $gold;
}
.bank small {
  font-size: .5rem;
  font-weight: 300;
  margin: 0.1rem;
}
.bank.is-increasing {
  background: rgba(0, 0, 0, 0.2);
}
.bank .number {
  transition: all 0.2s ease;
}
.bank.is-increasing .number {
  transform: scale(1.1);
}
.is-spinning {
  animation: spin 1s ease;
  transform-origin: center;
  transform-box: fill-box;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
@keyframes spin {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(2160deg);
  }
}
</style>
