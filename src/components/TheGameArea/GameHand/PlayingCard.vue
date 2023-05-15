<template>
  <div
    class="card"
    :class="{ 'face-down': isFaceDown }"
  >
    <div class="front">
      <div class="top-corner">
        <PlayingCardValue :value="card.value" :suit="card.suit" />
        <PlayingCardSuit :suit="card.suit" />
      </div>
    </div>
    <div class="back" />
  </div>
</template>

<script setup>
import PlayingCardValue from './PlayingCardValue.vue'
import PlayingCardSuit from './PlayingCardSuit.vue'

const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  isFaceDown: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: inline-block;
  width: 2rem;
  max-width: 180PX;
  height: 3rem;
  max-height: 270PX;
  margin: 0.05rem;
  transition: all 0.2s ease;
}
.card .front, .card .back {
  border-radius: 0.18rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  backface-visibility: hidden;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}
.card .front {
  background-image: url('../../../assets/card-front.svg');
  background-color: $secondary-color;
}
.card .back {
  background-image: url('../../../assets/card-back.svg');
  transform: rotateY(-180deg);
  background-color: $red;
}
.card.face-down .back {
  transform: rotateY(0deg);
}
.card.face-down .front {
  transform: rotateY(180deg);
}
.card .top-corner {
  position: absolute;
  text-align: center;
  top: .2rem;
  left: .05rem;
  width: .7rem;
  height: 1.3rem;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: stretch;
}
</style>
