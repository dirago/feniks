<template>
  <span class="split" data-split>
    <template v-for="(line, index) in lines" :key="index">
      <span class="split-line">
        <span class="split-line__inner">
          <slot :name="`line-${index}`">{{ line }}</slot>
        </span>
      </span>
      ' '
    </template>
  </span>
</template>

<script setup lang="ts">
defineProps<{ lines: string[] }>()
</script>

<style scoped>
.split {
  display: block;
}

.split-line {
  display: block;
  overflow: clip;
  overflow-clip-margin: 0.2em;

  /* Room for descenders and serif italics inside the mask. */
  padding-block-end: 0.08em;
  margin-block-end: -0.08em;
}

.split-line__inner {
  display: inline-block;
}
</style>
