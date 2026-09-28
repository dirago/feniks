<template>
  <section
    id="parcours"
    ref="root"
    aria-labelledby="parcours-title"
    class="section timeline"
    :class="{ 'is-scrolly': isScrolly }"
  >
    <div aria-hidden="true" class="timeline__warmth" />

    <div class="container">
      <header class="timeline__header">
        <p class="section-label">Parcours</p>
        <h2 id="parcours-title" class="display timeline__title">
          <SplitLines :lines="['Presque 10 ans', 'à construire des produits.']">
            <template #line-1>à construire des <em class="accent-serif">produits.</em></template>
          </SplitLines>
        </h2>
        <p class="timeline__intro">
          Six missions freelance, des sites internationaux de Michelin à une plateforme SaaS
          construite from scratch.
        </p>
      </header>

      <div class="timeline__body">
        <aside aria-label="Progression du parcours" class="timeline__aside">
          <div aria-hidden="true" class="timeline__now">
            <p class="timeline__year"><TimelineYear v-if="active" :year="active.startYear" /></p>
            <p class="timeline__now-end mono">→ {{ active?.endYear }}</p>
            <p class="timeline__now-company">{{ active?.company }}</p>
            <p class="timeline__now-role">
              <template v-if="active?.previousRole">
                <span class="timeline__now-from">{{ active.previousRole }}</span>
                <span class="timeline__now-arrow">→</span>
              </template>
              {{ active?.role }}
            </p>
          </div>

          <div aria-hidden="true" class="timeline__range mono">
            <span>{{ firstYear }}</span>
            <span class="timeline__range-bar"><span class="timeline__range-fill" /></span>
            <span>{{ lastYear }}</span>
          </div>

          <nav aria-label="Missions" class="timeline__index">
            <ol role="list">
              <li v-for="(experience, index) in experiences" :key="experience.id">
                <a
                  :aria-current="index === activeIndex ? 'step' : undefined"
                  :href="`#mission-${experience.id}`"
                >
                  <span class="timeline__index-year mono">{{ experience.startYear }}</span>
                  {{ experience.company }}
                </a>
              </li>
            </ol>
          </nav>
        </aside>

        <div class="timeline__track">
          <span aria-hidden="true" class="timeline__axis">
            <span class="timeline__axis-fill" />
          </span>
          <ol class="timeline__list" role="list">
            <TimelineItem
              v-for="(experience, index) in experiences"
              :key="experience.id"
              :active="index === activeIndex"
              :dimmed="isScrolly && index !== activeIndex"
              :experience="experience"
            />
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { experiences } from '@/data/experiences'
import { useGsap } from '@/composables/useGsap'
import { createTimelineAnimations } from '@/animations/timeline'
import SplitLines from '@/components/common/SplitLines.vue'
import TimelineItem from './TimelineItem.vue'
import TimelineYear from './TimelineYear.vue'

const root = useTemplateRef<HTMLElement>('root')
const activeIndex = ref(0)
const isScrolly = ref(false)

// `experiences` is never empty; the fallback only satisfies strict indexing.
const active = computed(() => experiences[activeIndex.value] ?? experiences[0])
const firstYear = experiences[0]?.startYear
const lastYear = experiences.at(-1)?.endYear

useGsap(
  root,
  ({ root: el, conditions }) => {
    createTimelineAnimations({
      root: el,
      conditions,
      onActive: (index) => (activeIndex.value = index),
    })
    isScrolly.value = conditions.motion
    return () => (isScrolly.value = false)
  },
  { defer: true },
)
</script>

<style scoped>
.timeline {
  isolation: isolate;
}

/* A warmer wash builds up as the career unfolds. */
.timeline__warmth {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(60% 30% at 0% 35%, var(--light-warm), transparent 70%),
    radial-gradient(50% 30% at 100% 80%, var(--light-cool), transparent 70%);
  pointer-events: none;
}

.motion-ok .timeline__warmth {
  opacity: 0;
  visibility: hidden;
}

.timeline__header {
  display: grid;
  gap: var(--space-m);
  margin-block-end: var(--space-2xl);
}

.timeline__intro {
  max-inline-size: 42ch;
  font-size: var(--step-1);
  line-height: 1.5;
  color: var(--text-muted);
}

.timeline__body {
  --track-pad: clamp(1.75rem, 1rem + 3vw, 4.5rem);

  position: relative;
  display: grid;
}

/* ---- Aside — compact sticky bar on small screens ---------------------------- */
.timeline__aside {
  position: sticky;
  inset-block-start: calc(var(--nav-height) + 0.5rem);
  z-index: 2;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.25rem var(--space-s);
  margin-block-end: var(--space-m);
  padding: 0.65rem 1rem;
  border-radius: var(--radius-m);
  background-color: var(--nav-surface);
  backdrop-filter: blur(14px) saturate(1.2);
  box-shadow:
    inset 0 0 0 1px var(--border),
    var(--shadow-paper);
}

.timeline__now {
  display: contents;
}

.timeline__year {
  grid-row: span 2;
  font-size: var(--step-3);
  font-weight: 620;
  letter-spacing: -0.04em;
  color: var(--accent);
}

.timeline__now-end {
  display: none;
}

.timeline__now-company {
  font-weight: 600;
  line-height: 1.2;
}

.timeline__now-role {
  font-size: var(--step--1);
  line-height: 1.3;
  color: var(--text-muted);
}

.timeline__now-arrow {
  margin-inline: 0.3em;
  color: var(--accent);
}

.timeline__range {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-block-start: 0.35rem;
  color: var(--text-muted);
  font-size: 0.65rem;
}

.timeline__range-bar {
  position: relative;
  flex: 1;
  block-size: 1px;
  background-color: var(--hairline);
}

.timeline__range-fill {
  position: absolute;
  inset: 0;
  background-color: var(--accent);
  transform-origin: 0 50%;
}

.timeline__index {
  display: none;
}

/* ---- Track & axis ---------------------------------------------------------- */
.timeline__track {
  position: relative;
  padding-inline-start: var(--track-pad);
}

.timeline__axis {
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: 1px;
  background-color: var(--hairline);
}

.timeline__axis-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, var(--accent-soft), var(--accent));
  transform-origin: 50% 0;
}

.timeline__list {
  margin: 0;
}

/* ---- Desktop: sticky narration column ------------------------------------- */
@media (width >= 64em) {
  .timeline__body {
    grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
    column-gap: var(--space-xl);
  }

  .timeline__aside {
    inset-block-start: calc(var(--nav-height) + var(--space-l));
    align-self: start;
    grid-template-columns: auto 1fr;
    gap: var(--space-l) var(--space-m);
    margin: 0;
    padding: 0;
    background: none;
    backdrop-filter: none;
    box-shadow: none;
  }

  .timeline__now {
    grid-column: 2;
    display: grid;
    gap: var(--space-2xs);
  }

  .timeline__year {
    grid-row: auto;
    font-size: clamp(5rem, 2rem + 6vw, 10.5rem);
    font-weight: 640;
    font-stretch: 85%;
    line-height: 0.9;
    letter-spacing: -0.06em;
    color: var(--text);
  }

  .timeline__now-end {
    display: block;
    color: var(--accent-ink);
  }

  .timeline__now-company {
    margin-block-start: var(--space-s);
    font-size: var(--step-2);
    letter-spacing: -0.02em;
  }

  .timeline__now-role {
    font-size: var(--step-0);
  }

  /* Vertical 2017 ↓ 2026 gauge on the left of the narration. */
  .timeline__range {
    grid-column: 1;
    grid-row: 1 / span 2;
    flex-direction: column;
    align-self: stretch;
    margin: 0;
    font-size: var(--step--2);
  }

  .timeline__range-bar {
    inline-size: 1px;
    block-size: auto;
  }

  .timeline__range-fill {
    transform-origin: 50% 0;
  }

  .timeline__index {
    grid-column: 2;
    display: block;
  }

  .timeline__index ol {
    display: grid;
    margin: 0;
    border-block-start: 1px solid var(--hairline);
  }

  .timeline__index a {
    display: flex;
    align-items: baseline;
    gap: var(--space-s);
    padding-block: 0.55rem;
    border-block-end: 1px solid var(--hairline);
    font-size: var(--step--1);
    color: var(--text-muted);
    transition:
      color var(--duration-s) var(--ease-out),
      padding var(--duration-m) var(--ease-out);
  }

  .timeline__index a:hover {
    color: var(--text);
  }

  .timeline__index a[aria-current] {
    padding-inline-start: 0.75rem;
    font-weight: 560;
    color: var(--text);
    box-shadow: inset 2px 0 0 var(--accent);
  }

  .timeline__index-year {
    color: var(--text-muted);
  }
}

@media (width >= 64em) and (height < 46em) {
  .timeline__index {
    display: none;
  }
}
</style>
