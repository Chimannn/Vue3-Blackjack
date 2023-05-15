<template>
    <main
      @click="closeDrawer"
      :class="{ 'is-dimmed': showDrawer }"
      class="game-area"
    >
      <section class="dealer-side">
        <GameHand
          v-if="hands.length"
          :hand="hands[0]"
          :index="0"
        />
      </section>
      <section class="player-side">
        <template v-for="(hand, i) in hands">
          <GameHand
            :key ="i"
            v-if="i > 0"
            :hand="hand"
            :index="i"
          /> 
        </template>
      </section>
      <TheGameOverButton v-if="isGameOver" />
      <TheControls :class="{ 'no-pointer-events': showDrawer }" />
    </main>
  </template>
  
  <script setup>
  import GameHand from './TheGameArea/GameHand.vue'
  import { computed } from 'vue'
  import TheGameOverButton from './TheGameArea/TheGameOverButton.vue'
  import TheControls from './TheGameArea/TheControls.vue'
  import { game } from "@/stores/game";

  const gameStore = game()

  const activeHandIndex = computed(() => gameStore.activeHandIndex)
  const hands = computed(() => gameStore.hands)
  const showDrawer = computed(() => gameStore.showDrawer)
  const isGameOver = computed(() => gameStore.isGameOver)

  const closeDrawer = () => {
    gameStore.toggleDrawer({show:false})
  }
  </script>
  
  <style scoped>
  .game-area {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    z-index: 50;
  }
  .is-dimmed {
    opacity: 0.5;
  }
  .no-pointer-events {
    pointer-events: none;
  }
  .dealer-side {
    margin-top: .02rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    min-height: 3.29rem;
  }
  .player-side {
    flex: 1 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
  }
  </style>
  