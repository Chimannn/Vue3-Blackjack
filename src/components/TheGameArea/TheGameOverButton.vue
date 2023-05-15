<template>
  <div class="game-over">
    <GameButton
      action="restart"
      :is-enabled="true"
    />
  </div>
</template>

<script setup>
import GameButton from '@/components/TheGameArea/GameButton.vue'
</script>

<style scoped>
.game-over {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
