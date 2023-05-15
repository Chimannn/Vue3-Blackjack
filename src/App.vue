<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style>
@media (max-height: 768px) {
  html {
  font-size: calc(35PX + 0.5vh) !important;
  }
}

@media (min-width: 768px) {
  html {
  font-size: 70PX !important;
  }
}

@media (min-width: 1900px) {
  html {
  font-size: 88PX !important;
  }
}
</style>