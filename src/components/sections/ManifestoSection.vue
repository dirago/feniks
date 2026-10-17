<template>
  <section id="manifeste" aria-labelledby="manifesto-title" class="section manifesto">
    <div class="container">
      <h2 id="manifesto-title" class="manifesto__statement">
        La qualité d’un frontend ne se mesure pas au nombre de composants produits.
      </h2>

      <p class="manifesto__answer">
        Elle se mesure à sa capacité à évoluer sans devenir un problème.
      </p>

      <ul class="manifesto__principles" role="list">
        <li v-for="principle in principles" :key="principle.title" class="principle">
          <h3 class="principle__title">{{ principle.title }}</h3>
          <p class="principle__text">{{ principle.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { principles } from '@/data/principles'
</script>

<style scoped>
.manifesto__statement {
  max-inline-size: 20ch;
  font-size: var(--step-5);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-display);
}

.manifesto__answer {
  max-inline-size: 24ch;
  margin-block-start: var(--space-l);
  margin-inline-start: auto;
  font-family: var(--font-display);
  font-size: var(--step-3);
  font-weight: 420;
  line-height: 1.15;
  letter-spacing: var(--tracking-title);
  color: var(--accent);
}

.manifesto__principles {
  display: grid;
  margin: var(--space-3xl) 0 0;
  border-block-start: 1px solid var(--hairline);
}

.principle {
  display: grid;
  gap: var(--space-2xs) var(--space-l);
  padding-block: var(--space-m);
  border-block-end: 1px solid var(--hairline);
}

.principle__title {
  font-size: var(--step-2);
}

.principle__text {
  color: var(--text-soft);
}

@media (width >= 48em) {
  .principle {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    align-items: baseline;
    padding-block: var(--space-l);
  }

  .principle__text {
    font-size: var(--step-1);
    line-height: 1.5;
  }
}
</style>
