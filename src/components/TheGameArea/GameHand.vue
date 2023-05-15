<template>
  <div
    class="game-hand"
    :class="handClasses"
  >
  <transition-group name="deal" tag="div" class="cards">
      <PlayingCard
        v-for="(card, i) in hand.cards"
        :key="i"
        :card="card"
        :isFaceDown="card.isFaceDown"
      />
  </transition-group>
  <HandTotal :index="index" />
  <HandBet :hand="hand" />
  <HandResult :result="toResultString(hand.result)" />
  </div>
</template>

<script setup>
import blackjack from '../../lib/blackjack'
import { computed } from 'vue'
import PlayingCard from './GameHand/PlayingCard.vue'
import HandResult from './GameHand/HandResult.vue'
import HandTotal from './GameHand/HandTotal.vue'
import HandBet from './GameHand/HandBet.vue'
import { game } from "@/stores/game";

const gameStore = game()

const props = defineProps({
  hand: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})


const isActiveHand = computed(() => {
  return gameStore.activeHandIndex === props.index
})
const isInactiveHand = computed(() => {
  return gameStore.isSplit && ! isActiveHand.value && gameStore.activeHandIndex && props.index > 0
})
const handClasses = computed(() => {
  let classes = []
  if (isActiveHand.value && props.index > 0) classes.push('is-active')
  if (gameStore.isSplit && props.index > 0) classes.push('is-split')
  if (props.index === 0) classes.push('is-dealer')
  if (isInactiveHand.value) classes.push('is-inactive')
  return classes
})

const isSplit = computed(() => {
  return gameStore.isSplit()
})

const toResultString = (resultValue) => {
  for (const key in blackjack.results) {
    if (blackjack.results[key] === resultValue) return resultValue
  }
}

</script>

<style scoped>
.game-hand {
  position: relative;
  transition: transform 0.2s ease;
}
.game-hand.is-dealer, .game-hand.is-split {
  transform: scale(0.9);
}
.game-hand.is-active, .game-hand.is-split.is-active {
  position: absolute;
  max-width: 55%;
  transform: scale(1.3);
  z-index: 100;
}
.game-hand.is-split {
  transition: scale 0s;
}
.game-hand.is-inactive {
  opacity: 0.3;
  transform: translateY(-4rem);
}
.cards {
  min-height: 3.29rem;
  min-width: 3.5rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}
.deal-enter-active {
  animation: deal 0.3s;
}
.deal-leave-active {
  animation: deal 0.3s reverse;
}
.is-split .deal-leave-active {
  animation-duration: 0;
}
@keyframes deal {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
