<template>
  <section id="top" aria-labelledby="hero-title" class="hero">
    <div class="hero__inner">
      <HeroLoom
        class="hero__loom"
        :lines="{ wide: [profile.name], narrow: ['Raphaël', 'Di Rago'] }"
      />

      <h1 id="hero-title" class="hero__title">
        <span class="visually-hidden">{{ profile.name }}, </span>Senior frontend freelance
      </h1>

      <div class="hero__aside">
        <p class="hero__lead">
          J’aide les équipes produit et tech à concevoir, structurer et faire évoluer des
          applications frontend robustes, maintenables et centrées utilisateurs.
        </p>
        <p class="meta">{{ profile.focus }}. {{ profile.location }}.</p>

        <div class="hero__actions">
          <BaseButton :href="mailto()">Me contacter</BaseButton>
          <BaseButton download :href="profile.cvUrl" icon="download" variant="secondary">
            Télécharger mon CV
          </BaseButton>
          <a class="link" :href="profile.linkedinUrl" rel="noopener noreferrer" target="_blank">
            LinkedIn
            <span class="visually-hidden">(nouvel onglet)</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { mailto, profile } from '@/config/profile'
import BaseButton from '@/components/common/BaseButton.vue'
import HeroLoom from './HeroLoom.vue'
</script>

<style scoped>
.hero {
  display: grid;
  min-block-size: 100svh;
  padding-block: calc(var(--nav-height) + var(--space-l)) var(--space-xl);
}

.hero__inner {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: 1fr auto;
  column-gap: var(--space-m);
  row-gap: var(--space-l);
  inline-size: var(--container);
  margin-inline: auto;
}

.hero__loom {
  grid-column: 1 / -1;
  align-self: center;
}

.hero__title {
  grid-column: 1 / -1;
  font-size: var(--step-4);
  font-weight: 520;
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-display);
}

.hero__aside {
  grid-column: 1 / -1;
  display: grid;
  gap: var(--space-s);
}

.hero__lead {
  font-size: var(--step-1);
  line-height: 1.5;
  color: var(--text-soft);
  max-inline-size: 40ch;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2xs) var(--space-s);
  margin-block-start: var(--space-xs);
}

@media (width >= 64em) {
  .hero__title {
    grid-column: 1 / span 5;
    align-self: start;
  }

  .hero__aside {
    grid-column: 7 / -1;
  }
}
</style>
