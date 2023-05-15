<template>
  <div class="controls-row">
    <div class="controls">
      <GameButton
        action="doubleDown"
        :is-enabled="canDoubleDown && isPlayerTurn"
      />
      <GameButton
        action="split"
        :is-enabled="canSplit && isPlayerTurn"
      />
      <TheBank />
      <GameButton
        action="stand"
        :is-enabled="isPlayerTurn"
      />
      <GameButton
        action="hit"
        :is-enabled="isPlayerTurn"
      />
    </div>
  </div>
</template>

<script setup>
import GameButton from './GameButton.vue'
import TheBank from './TheBank.vue'
import { game } from "@/stores/game"
import { computed } from 'vue'

const gameStore = game()

const isDealing = computed(() => gameStore.isDealing)
const activeHandIndex = computed(() => gameStore.activeHandIndex)

const isPlayerTurn = computed(()=>{
  return !isDealing.value && activeHandIndex.value > 0
})

const canSplit = computed(() => gameStore.canSplit)
const canDoubleDown = computed(() => gameStore.canDoubleDown)
</script>

<style scoped>
.controls-row {
  text-align: center;
}
.controls {
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .2rem;
}
</style>
