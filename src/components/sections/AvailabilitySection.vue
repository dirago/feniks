<template>
  <section id="disponibilite" aria-labelledby="availability-title" class="availability">
    <div class="container">
      <div class="availability__sheet" data-reveal>
        <p class="availability__label mono">Mission freelance</p>
        <h2 id="availability-title" class="availability__title">
          Vous avez un frontend à construire, moderniser ou remettre sur de bons rails&nbsp;?
        </h2>
        <p class="availability__text">
          Je peux intervenir ponctuellement ou rejoindre une équipe sur une mission longue durée.
        </p>
        <BaseButton
          class="availability__cta"
          :href="mailto('Mission frontend — premier échange')"
          magnetic
        >
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

.availability__sheet {
  position: relative;
  display: grid;
  gap: var(--space-m);
  justify-items: start;
  padding: var(--space-xl) var(--space-m);
  border-radius: var(--radius-xs);
  background-color: var(--surface-elevated);
  box-shadow: var(--paper-edge), var(--shadow-lift);
}

/* A second sheet peeking out underneath. */
.availability__sheet::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background-color: var(--surface-raised);
  box-shadow: var(--shadow-paper);
  rotate: -1.2deg;
  translate: 0.2rem 0.5rem;
}

.availability__label {
  color: var(--accent-ink);
}

.availability__title {
  max-inline-size: 20ch;
  font-size: var(--step-4);
  line-height: 1.02;
  letter-spacing: -0.04em;
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
  .availability__sheet {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    align-items: end;
    column-gap: var(--space-xl);
    padding: var(--space-2xl) var(--space-xl);
  }

  .availability__label,
  .availability__title {
    grid-column: 1;
  }

  .availability__text {
    grid-column: 2;
    grid-row: 2;
  }

  .availability__cta {
    grid-column: 2;
    grid-row: 3;
  }
}
</style>
