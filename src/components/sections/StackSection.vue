<template>
  <section id="stack" aria-labelledby="stack-title" class="section stack">
    <div class="container">
      <header class="stack__header">
        <p class="section-label">Stack</p>
        <h2 id="stack-title" class="stack__title" data-reveal>
          Les outils de mon quotidien, <span class="stack__title-muted">regroupés par usage.</span>
        </h2>
      </header>

      <div class="stack__groups">
        <section
          v-for="(group, index) in stackGroups"
          :key="group.label"
          :aria-labelledby="`stack-group-${index}`"
          class="stack__group"
          data-reveal
        >
          <h3 :id="`stack-group-${index}`" class="stack__label mono">{{ group.label }}</h3>
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
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.stack__title-muted {
  color: var(--text-muted);
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
  border-block-start: 1px solid var(--text);
  transition: opacity var(--duration-m) var(--ease-out);
}

.stack__label {
  font-size: var(--step--2);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  color: var(--accent-ink);
}

.stack__items {
  display: grid;
  gap: 0.15rem;
  margin: 0;
}

.stack__item {
  inline-size: fit-content;
  font-size: var(--step-1);
  font-weight: 480;
  letter-spacing: -0.015em;
  transition:
    transform var(--duration-s) var(--ease-out),
    color var(--duration-s) var(--ease-out);
}

/* Hovering a group quiets the others; hovering an item nudges it. */
@media (hover: hover) and (width >= 64em) {
  .stack__groups:has(.stack__group:hover) .stack__group:not(:hover) {
    opacity: 0.45;
  }

  .stack__item:hover {
    color: var(--accent-ink);
    transform: translateX(4px);
  }
}

@media (width >= 80em) {
  .stack__groups {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
</style>
