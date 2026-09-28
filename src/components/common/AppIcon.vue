<template>
  <svg
    aria-hidden="true"
    class="icon"
    fill="none"
    focusable="false"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="1.6"
    viewBox="0 0 24 24"
  >
    <path :d="iconPaths[name]" />
  </svg>
</template>

<script setup lang="ts">
import { type IconName, iconPaths } from './icons'

defineProps<{ name: IconName }>()
</script>

<style scoped>
.icon {
  inline-size: 1.15em;
  block-size: 1.15em;
  flex: none;
}
</style>
