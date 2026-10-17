<template>
  <section id="stack" aria-labelledby="stack-title" class="section stack">
    <div class="container">
      <header class="stack__header">
        <h2 id="stack-title" class="stack__title">
          Les outils de mon quotidien, regroupés par usage.
        </h2>
      </header>

      <div class="stack__groups">
        <section
          v-for="(group, index) in stackGroups"
          :key="group.label"
          :aria-labelledby="`stack-group-${index}`"
          class="stack__group"
        >
          <h3 :id="`stack-group-${index}`" class="stack__label">{{ group.label }}</h3>
          <ul class="stack__items" role="list">
            <li v-for="item in group.items" :key="item" class="stack__item">{{ item }}</li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { stackGroups } from '@/data/stack'
</script>

<style scoped>
.stack {
  padding-block-start: 0;
}

.stack__header {
  display: grid;
  gap: var(--space-m);
  margin-block-end: var(--space-xl);
}

.stack__title {
  max-inline-size: 24ch;
  font-size: var(--step-3);
  line-height: var(--leading-snug);
}

.stack__groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
  gap: var(--space-l) var(--space-m);
}

.stack__group {
  display: grid;
  align-content: start;
  gap: var(--space-s);
  padding-block-start: var(--space-s);
  border-block-start: 2px solid var(--text);
}

.stack__label {
  font-family: var(--font-sans);
  font-size: var(--step--1);
  font-weight: 600;
  letter-spacing: 0;
  color: var(--accent);
}

.stack__items {
  display: grid;
  gap: 0.15rem;
  margin: 0;
}

.stack__item {
  inline-size: fit-content;
  font-size: var(--step-1);
}

@media (width >= 80em) {
  .stack__groups {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
</style>
