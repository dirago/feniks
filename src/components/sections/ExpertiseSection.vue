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
        <h2 id="expertise-title" class="display">Je construis des frontends pensés pour durer.</h2>
        <p class="expertise__intro-text">
          Des applications frontend complexes, from scratch comme sur des produits existants, de la
          conception technique jusqu’à l’implémentation.
        </p>
      </header>

      <div class="expertise__panels">
        <span aria-hidden="true" class="expertise__rail" />
        <ul class="expertise__list" role="list">
          <li
            v-for="(item, index) in expertises"
            :key="item.id"
            class="panel"
            :class="{ 'is-active': activeIndex === index }"
          >
            <article :aria-labelledby="`expertise-${item.id}`" class="panel__body">
              <h3 :id="`expertise-${item.id}`" class="panel__title">{{ item.title }}</h3>
              <p class="panel__text">{{ item.description }}</p>
              <ul :aria-label="`Mots-clés ${item.title}`" class="tag-list">
                <li v-for="keyword in item.keywords" :key="keyword" class="tag">{{ keyword }}</li>
              </ul>
            </article>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { expertises } from '@/data/expertises'
import { useGsap } from '@/composables/useGsap'
import { gsap, ScrollTrigger } from '@/animations/gsap'

const root = useTemplateRef<HTMLElement>('root')
const activeIndex = ref(0)
const isScrolly = ref(false)

useGsap(
  root,
  ({ conditions }) => {
    if (!conditions.desktop) return

    // The panel under the reading line is the active one.
    gsap.utils.toArray<HTMLElement>('.panel').forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (self.isActive) activeIndex.value = index
        },
      })
    })

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

.expertise__intro-text {
  max-inline-size: 38ch;
  font-size: var(--step-1);
  line-height: 1.5;
  color: var(--text-muted);
}

.expertise__rail {
  display: none;
}

.expertise__list {
  display: grid;
  margin: 0;
  border-block-start: 1px solid var(--hairline);
}

.panel__body {
  display: grid;
  gap: var(--space-s);
  padding-block: var(--space-l);
  border-block-end: 1px solid var(--hairline);
}

.panel__title {
  font-size: var(--step-3);
  line-height: var(--leading-snug);
}

.panel__text {
  color: var(--text-soft);
}

/* ---- Desktop: sticky statement on the left, axes scroll on the right ------- */
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

  .expertise__panels {
    position: relative;
    padding-inline-start: var(--space-l);
    border-inline-start: 1px solid var(--hairline);
  }

  .expertise__list {
    border: 0;
  }

  /* A thread drawn down the left edge as the axes are read. */
  .expertise__rail {
    display: block;
    position: absolute;
    inset-block: 0;
    inset-inline-start: -1px;
    inline-size: 2px;
    background-color: var(--accent);
    transform: scaleY(0);
    transform-origin: 50% 0;
  }

  .panel {
    min-block-size: 56vh;
    display: grid;
    align-items: center;
  }

  .panel__body {
    border: 0;
  }

  .panel__title {
    font-size: var(--step-4);
  }

  /* Receding through colour rather than opacity keeps contrast compliant. */
  .is-scrolly .panel:not(.is-active) .panel__title {
    color: var(--text-faint);
  }

  .is-scrolly .panel:not(.is-active) .panel__text {
    color: var(--text-muted);
  }
}

@media (width >= 64em) and (prefers-reduced-motion: no-preference) {
  .panel__title,
  .panel__text {
    transition: color 700ms var(--ease-out);
  }
}
</style>
