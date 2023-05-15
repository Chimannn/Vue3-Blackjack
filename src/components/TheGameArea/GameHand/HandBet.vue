<template>
  <transition-group
    name="coin"
    tag="div"
    class="hand-bet"
    :class="{ 'is-win': isWin, 'is-loss': isLoss }"
  >
    <GameCoin
      v-for="(bet, i) in hand.bets"
      :key="i"
      class="hand-coin"
    />
  </transition-group>
</template>

<script setup>
import GameCoin from '../GameCoin.vue'
import blackjack from '@/lib/blackjack'
const { PUSH, BUST, BLACKJACK, WIN, LOSE } = blackjack.results
import { computed } from "vue"

const props = defineProps({
  hand: {
    type: Object,
    required: true
  }
})

const isLoss = computed(()=>{
  return [LOSE, BUST].includes(props.hand.result)
})

const isWin = computed(()=>{
  return [PUSH, WIN, BLACKJACK].includes(props.hand.result)
})

</script>

<style scoped>
.hand-bet {
  position: absolute;
  /* bottom: -.92rem; */
  left: 0;
  width: 100%;
  text-align: center;
}
.hand-bet .hand-coin {
  margin: 0.02rem;
  transition: all 0.3s ease-in;
}
.coin-leave-to, .is-win .coin-enter {
  transform: translateY(-50vh);
  opacity: 0;
}
.coin-enter, .is-win .coin-leave-to {
  transform: translateY(50vh);
  opacity: 0;
}
</style>
