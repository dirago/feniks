<template>
  <span aria-hidden="true" class="year">
    <span v-for="(digit, index) in digits" :key="index" class="year__digit">
      <span class="year__strip" :style="{ '--digit': digit }">
        <span v-for="n in 10" :key="n">{{ n - 1 }}</span>
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { year } = defineProps<{ year: number }>()
const digits = computed(() => String(year).split('').map(Number))
</script>

<style scoped>
.year {
  display: inline-flex;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.year__digit {
  display: inline-block;
  block-size: 1em;
  overflow: clip;
}

.year__strip {
  display: flex;
  flex-direction: column;
  transform: translateY(calc(var(--digit) * -10%));
  transition: transform 900ms var(--ease-in-out);
}

.year__strip > span {
  display: block;
  block-size: 1em;
}

@media (prefers-reduced-motion: reduce) {
  .year__strip {
    transition: none;
  }
}
</style>
