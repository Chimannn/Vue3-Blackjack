<template>
  <transition name="pop">
    <span
      v-if="total"
      class="hand-total"
      :class="{ 'bust': total > 21, 'twenty-one': total === 21 }">
      {{ total }}
    </span>
  </transition>
</template>

<script setup>
import blackjack from '@/lib/blackjack'
import { computed } from "vue"
import { game } from "@/stores/game";

const gameStore = game()

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const total = computed(()=>{
  const hand = gameStore.hands[props.index]
  if (hand.cards.length < 2) return
  if (hand.cards.find(card => card.isFaceDown)) return
  return blackjack.score(hand.cards)
})
</script>

<style lang="scss" scoped>
.hand-total {
  display: inline-block;
  position: absolute;
  top: -.2rem;
  right: -.28rem;
  width: .7rem;
  height: .7rem;
  font-size: .34rem;
  font-weight: 600;
  line-height: .7rem;
  background: $white;
  border-radius: 50%;
  text-align: center;
  color: $secondary-color;
}
.bust {
  background: $red;
}
.twenty-one {
  background: $gold;
}
.pop-enter-active {
  transition: all 0.3s ease-out;
}
.pop-leave-active {
  transition: all 0.1s ease-in;
}
.pop-enter, .pop-leave-to {
  transform: scale(0) rotate(360deg);
}
</style>
