<template>
    <div class="game">
      <TheStars />
      <TheSidebar />
      <TheGameArea />
      <TheMenuButton />
      <TheTitleScreen v-if="gameStore.isTitleShowing" />
    </div>
  </template>
  
  <script setup>
  import TheTitleScreen from '@/components/TheTitleScreen.vue'
  import TheSidebar from '@/components/TheSidebar.vue'
  import TheStars from '@/components/TheGameArea/TheStars.vue'
  import TheGameArea from '../TheGameArea.vue'
  import TheMenuButton from '@/components/TheMenuButton.vue'
  import { game } from "@/stores/game"
  const gameStore = game()
  </script>
  
  <style lang="scss">
  .game {
    display: flex;
    flex-flow: row nowrap;
  }
  .game {
    background: $primary-color;
    font-family: 'Helvetica', 'Arial', sans-serif;
  }
  :focus {
    outline: 0 !important;
  }
  * {
    user-select: none;
  }
  .text-red {
    color: #E04030;
  }
  .text-secondary-color {
    color: rgb(12, 36, 48);
  }
  .text-gold {
    color: #E1AE0F;
  }
  .text-white {
    color: $white;
  }
  </style>