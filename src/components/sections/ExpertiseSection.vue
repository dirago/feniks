<template>
  <section
    id="expertise"
    ref="root"
    aria-labelledby="expertise-title"
    class="section expertise"
    :class="{ 'is-scrolly': isScrolly }"
  >
    <div class="container expertise__grid">
      <header class="expertise__intro">
        <p class="section-label">Expertise</p>
        <h2 id="expertise-title" class="display expertise__title">
          <SplitLines :lines="['Je construis des frontends', 'pensés pour durer.']">
            <template #line-1>pensés pour <em class="accent-serif">durer.</em></template>
          </SplitLines>
        </h2>
        <p class="expertise__intro-text">
          Des applications frontend complexes, from scratch comme sur des produits existants, de la
          conception technique jusqu’à l’implémentation.
        </p>

        <div aria-hidden="true" class="expertise__progress">
          <span class="expertise__counter mono">
            <span class="expertise__counter-current">{{ counter }}</span>
            <span class="expertise__counter-total">/ {{ pad(expertises.length) }}</span>
          </span>
          <span class="expertise__progress-label mono">{{ expertises[activeIndex]?.title }}</span>
        </div>
      </header>

      <div class="expertise__panels">
        <span aria-hidden="true" class="expertise__rail" />
        <ol class="expertise__list" role="list">
          <li
            v-for="(item, index) in expertises"
            :key="item.id"
            class="panel"
            :class="{ 'is-active': activeIndex === index }"
          >
            <article :aria-labelledby="`expertise-${item.id}`" class="panel__body">
              <p aria-hidden="true" class="panel__num">
                <span class="panel__num-inner">{{ pad(index + 1) }}</span>
              </p>
              <h3 :id="`expertise-${item.id}`" class="panel__title">
                <span class="panel__title-inner">{{ item.title }}</span>
              </h3>
              <p class="panel__text">{{ item.description }}</p>
              <ul :aria-label="`Mots-clés ${item.title}`" class="tag-list panel__tags">
                <li v-for="keyword in item.keywords" :key="keyword" class="tag">{{ keyword }}</li>
              </ul>
              <span aria-hidden="true" class="panel__line" />
            </article>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { expertises } from '@/data/expertises'
import { EASE } from '@/config/motion'
import { useGsap } from '@/composables/useGsap'
import { gsap, ScrollTrigger } from '@/animations/gsap'
import { fadeUp, maskReveal, staggerIn } from '@/animations/reveal'
import SplitLines from '@/components/common/SplitLines.vue'

const root = useTemplateRef<HTMLElement>('root')
const activeIndex = ref(0)
const isScrolly = ref(false)
const pad = (n: number) => String(n).padStart(2, '0')
const counter = computed(() => pad(activeIndex.value + 1))

useGsap(
  root,
  ({ conditions }) => {
    if (!conditions.motion) return

    const panels = gsap.utils.toArray<HTMLElement>('.panel')

    panels.forEach((panel, index) => {
      // Entrance — number, title, copy and keywords, once.
      gsap
        .timeline({ scrollTrigger: { trigger: panel, start: 'top 80%', once: true } })
        .add(maskReveal(panel.querySelector('.panel__num-inner'), { duration: 1.1 }), 0)
        .add(maskReveal(panel.querySelector('.panel__title-inner')), 0.08)
        .add(fadeUp(panel.querySelector('.panel__text')), 0.2)
        .add(staggerIn(panel.querySelectorAll('.tag')), 0.3)

      // Active state (desktop): the panel under the reading line is highlighted.
      if (conditions.desktop) {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) activeIndex.value = index
          },
        })
      }
    })

    if (!conditions.desktop) return

    isScrolly.value = true
    gsap.fromTo(
      '.expertise__rail',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.expertise__panels',
          start: 'top 55%',
          end: 'bottom 55%',
          scrub: 0.6,
        },
      },
    )
    gsap.from('.expertise__intro-text', {
      autoAlpha: 0,
      y: 20,
      duration: 0.9,
      ease: EASE.out,
      scrollTrigger: { trigger: '.expertise__intro-text', start: 'top 85%', once: true },
    })

    return () => {
      isScrolly.value = false
    }
  },
  { defer: true },
)
</script>

<style scoped>
.expertise__grid {
  display: grid;
  gap: var(--space-2xl);
}

.expertise__intro {
  display: grid;
  gap: var(--space-m);
  align-content: start;
}

.expertise__title {
  margin-block-start: var(--space-2xs);
}

.expertise__intro-text {
  max-inline-size: 38ch;
  font-size: var(--step-1);
  line-height: 1.5;
  color: var(--text-muted);
}

.expertise__progress,
.expertise__rail {
  display: none;
}

/* ---- Panels ---------------------------------------------------------------- */
.expertise__list {
  display: grid;
  gap: var(--space-s);
  margin: 0;
}

.panel__body {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: var(--space-m);
  row-gap: var(--space-s);
  padding: var(--space-l) var(--space-m);
  border-radius: var(--radius-m);
  background-color: var(--surface-elevated);
  box-shadow: var(--paper-edge), var(--shadow-paper);
  overflow: hidden;
  transition:
    background-color 700ms var(--ease-out),
    box-shadow 700ms var(--ease-out),
    transform 700ms var(--ease-out);
}

.panel__num {
  grid-row: span 2;
  overflow: clip;
  font-family: var(--font-mono);
  font-size: var(--step-3);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--accent);
}

.panel__num-inner,
.panel__title-inner {
  display: inline-block;
}

.panel__title {
  overflow: clip;
  overflow-clip-margin: 0.1em;
  font-size: var(--step-3);
  line-height: 1.05;
  letter-spacing: -0.035em;
}

.panel__text {
  grid-column: 2;
  color: var(--text-soft);
}

.panel__tags {
  grid-column: 2;
  margin-block-start: var(--space-2xs);
}

.panel__line {
  position: absolute;
  inset-inline: 0;
  inset-block-end: 0;
  block-size: 2px;
  background-color: var(--accent);
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 1.1s var(--ease-in-out);
}

@media (width < 40em) {
  .panel__body {
    grid-template-columns: 1fr;
    padding: var(--space-m) var(--space-s);
  }

  .panel__num {
    grid-row: auto;
    font-size: var(--step-2);
  }

  .panel__text,
  .panel__tags {
    grid-column: 1;
  }
}

/* ---- Desktop: sticky statement on the left, panels scroll on the right ----- */
@media (width >= 64em) {
  .expertise__grid {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: var(--space-2xl) var(--space-xl);
  }

  .expertise__intro {
    position: sticky;
    inset-block-start: calc(var(--nav-height) + var(--space-xl));
    align-self: start;
  }

  .expertise__progress {
    display: flex;
    align-items: baseline;
    gap: var(--space-s);
    margin-block-start: var(--space-l);
    padding-block-start: var(--space-s);
    border-block-start: 1px solid var(--hairline);
  }

  .expertise__counter {
    display: inline-flex;
    gap: 0.4rem;
    color: var(--text-muted);
  }

  .expertise__counter-current {
    color: var(--text);
  }

  .expertise__progress-label {
    color: var(--accent-ink);
  }

  .expertise__panels {
    position: relative;
    padding-inline-start: var(--space-l);
    border-inline-start: 1px solid var(--hairline);
  }

  .expertise__list {
    gap: 0;
  }

  /* Progress through the four axes, drawn over the left hairline. */
  .expertise__rail {
    display: block;
    position: absolute;
    inset-block: 0;
    inset-inline-start: -1px;
    inline-size: 1px;
    background-color: var(--accent);
    transform: scaleY(0);
    transform-origin: 50% 0;
  }

  .panel {
    min-block-size: 62vh;
    display: grid;
    align-items: center;
  }

  .panel__body {
    grid-template-columns: 7rem 1fr;
    padding: var(--space-xl) var(--space-l);
  }

  .panel__num {
    font-size: var(--step-5);
    font-weight: 200;
  }

  .panel__title {
    font-size: var(--step-4);
  }

  /* Scroll-driven mode: inactive panels lie flat on the desk, the active one lifts. */
  .is-scrolly .panel__body {
    background-color: transparent;
    box-shadow: none;
  }

  /* Receding through colour rather than opacity keeps contrast compliant. */
  .is-scrolly .panel:not(.is-active) :is(.panel__num, .panel__title) {
    color: var(--text-faint);
  }

  .is-scrolly .panel:not(.is-active) .panel__text {
    color: var(--text-muted);
  }

  .is-scrolly .panel:not(.is-active) .tag {
    box-shadow: inset 0 0 0 1px transparent;
  }

  .is-scrolly .panel.is-active .panel__body {
    background-color: var(--surface-elevated);
    box-shadow: var(--paper-edge), var(--shadow-lift);
    transform: translateX(-0.5rem);
  }

  .is-scrolly .panel.is-active .panel__line {
    transform: scaleX(1);
  }
}

@media (width >= 64em) and (prefers-reduced-motion: no-preference) {
  .panel__body {
    transition:
      background-color 700ms var(--ease-out),
      box-shadow 700ms var(--ease-out),
      transform 700ms var(--ease-out);
  }

  .panel__num,
  .panel__title,
  .panel__text {
    transition: color 700ms var(--ease-out);
  }
}
</style>
