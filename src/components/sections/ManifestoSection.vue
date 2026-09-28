<template>
  <section id="manifeste" ref="root" aria-labelledby="manifesto-title" class="section manifesto">
    <div class="container">
      <p class="section-label">Façon de travailler</p>

      <h2 id="manifesto-title" class="manifesto__statement">
        <SplitLines
          :lines="[
            'La qualité d’un frontend',
            'ne se mesure pas au nombre',
            'de composants produits.',
          ]"
        />
      </h2>

      <p class="manifesto__answer">
        <template v-for="(word, index) in answerWords" :key="index">
          <span class="manifesto__word">{{ word }}</span
          >{{ index < answerWords.length - 1 ? ' ' : '' }}
        </template>
      </p>

      <ol class="manifesto__principles" role="list">
        <li v-for="(principle, index) in principles" :key="principle.title" class="principle">
          <span aria-hidden="true" class="principle__num mono">{{
            String(index + 1).padStart(2, '0')
          }}</span>
          <h3 class="principle__title">{{ principle.title }}</h3>
          <p class="principle__text">{{ principle.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { principles } from '@/data/principles'
import { useGsap } from '@/composables/useGsap'
import { gsap } from '@/animations/gsap'
import { fadeUp, revealWords } from '@/animations/reveal'
import SplitLines from '@/components/common/SplitLines.vue'

const answer = 'Elle se mesure à sa capacité à évoluer sans devenir un problème.'
// Only this sentence is split into words: it is scrubbed word by word.
const answerWords = answer.split(' ')

const root = useTemplateRef<HTMLElement>('root')

useGsap(
  root,
  ({ conditions }) => {
    if (!conditions.motion) return

    revealWords('.manifesto__word', {
      scrollTrigger: {
        trigger: '.manifesto__answer',
        start: 'top 82%',
        end: 'bottom 50%',
        scrub: 0.5,
      },
    })

    gsap.utils.toArray<HTMLElement>('.principle').forEach((principle) => {
      fadeUp(principle, {
        scrollTrigger: { trigger: principle, start: 'top 88%', once: true },
      })
    })
  },
  { defer: true },
)
</script>

<style scoped>
.manifesto {
  padding-block: var(--section-space);
}

.manifesto__statement {
  margin-block: var(--space-l) var(--space-xl);
  font-size: var(--step-5);
  font-weight: 600;
  font-stretch: 92%;
  line-height: 1;
  letter-spacing: var(--tracking-display);
}

.manifesto__answer {
  max-inline-size: 22ch;
  margin-inline-start: auto;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: var(--step-4);
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--accent);
}

.manifesto__word {
  color: color-mix(in srgb, var(--accent) calc(var(--lit, 1) * 100%), var(--text-faint));
}

.manifesto__principles {
  display: grid;
  margin: var(--space-3xl) 0 0;
  border-block-start: 1px solid var(--hairline);
}

.principle {
  position: relative;
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: var(--space-2xs) var(--space-s);
  padding-block: var(--space-m);
  border-block-end: 1px solid var(--hairline);
}

/* Accent rule that draws itself on hover. */
.principle::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  inset-block-end: -1px;
  block-size: 1px;
  background-color: var(--accent);
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 900ms var(--ease-out);
}

.principle__num {
  padding-block-start: 0.45em;
  color: var(--accent-ink);
}

.principle__title {
  font-size: var(--step-2);
  letter-spacing: -0.025em;
  transition: transform var(--duration-m) var(--ease-out);
}

.principle__text {
  grid-column: 2;
  color: var(--text-soft);
}

@media (hover: hover) {
  .principle:hover::after {
    transform: scaleX(1);
  }

  .principle:hover .principle__title {
    transform: translateX(4px);
  }
}

@media (width >= 48em) {
  .principle {
    grid-template-columns: 4rem minmax(0, 5fr) minmax(0, 7fr);
    align-items: baseline;
    padding-block: var(--space-l);
  }

  .principle__text {
    grid-column: 3;
    font-size: var(--step-1);
    line-height: 1.5;
  }
}

@media (width >= 64em) {
  .manifesto__statement {
    font-size: var(--step-6);
    line-height: 0.95;
  }

  .manifesto__answer {
    margin-block-start: calc(var(--space-l) * -1);
  }
}
</style>
