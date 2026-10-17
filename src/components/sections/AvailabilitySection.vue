<template>
  <section id="disponibilite" aria-labelledby="availability-title" class="availability">
    <div class="container">
      <div class="availability__panel">
        <h2 id="availability-title" class="availability__title">
          Vous avez un frontend à construire, moderniser ou remettre sur de bons rails&nbsp;?
        </h2>
        <p class="availability__text">
          Je peux intervenir ponctuellement ou rejoindre une équipe sur une mission longue durée.
        </p>
        <BaseButton class="availability__cta" :href="mailto('Mission frontend - premier échange')">
          Parlons de votre projet
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { mailto } from '@/config/profile'
import BaseButton from '@/components/common/BaseButton.vue'
</script>

<style scoped>
.availability {
  padding-block: var(--space-xl) var(--section-space);
}

.availability__panel {
  display: grid;
  gap: var(--space-m);
  justify-items: start;
  padding: var(--space-xl) var(--space-m);
  border-radius: var(--radius-m);
  background-color: var(--surface-elevated);
  box-shadow: inset 0 0 0 1px var(--border);
}

.availability__title {
  max-inline-size: 20ch;
  font-size: var(--step-4);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-display);
}

.availability__text {
  font-size: var(--step-1);
  line-height: 1.5;
  color: var(--text-soft);
  max-inline-size: 40ch;
}

.availability__cta {
  margin-block-start: var(--space-2xs);
}

@media (width >= 64em) {
  .availability__panel {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    align-items: end;
    column-gap: var(--space-xl);
    padding: var(--space-2xl) var(--space-xl);
  }

  .availability__title {
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  .availability__text {
    grid-column: 2;
    grid-row: 1;
  }

  .availability__cta {
    grid-column: 2;
    grid-row: 2;
  }
}
</style>
