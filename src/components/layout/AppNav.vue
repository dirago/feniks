<template>
  <header class="nav" :class="{ 'is-scrolled': isScrolled, 'is-past-hero': isPastHero }">
    <div class="nav__inner">
      <a class="nav__brand" href="#top">
        <span aria-hidden="true">RDR<span class="nav__brand-dot">.</span></span>
        <span class="visually-hidden">{{ profile.name }}, retour en haut de page</span>
      </a>

      <nav aria-label="Navigation principale" class="nav__menu">
        <ul ref="list" class="nav__links" role="list">
          <li v-for="link in links" :key="link.id">
            <a
              ref="linkEls"
              :aria-current="activeId === link.id ? 'location' : undefined"
              class="nav__link"
              :href="`#${link.id}`"
            >
              <span class="nav__link-label">{{ link.label }}</span>
            </a>
          </li>
          <li aria-hidden="true" class="nav__indicator" :style="indicatorStyle" />
        </ul>
      </nav>

      <ThemeSwitch class="nav__theme" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, shallowRef, useTemplateRef, watch } from 'vue'
import { useIntersectionObserver, useResizeObserver, useWindowScroll } from '@vueuse/core'
import { profile } from '@/config/profile'
import ThemeSwitch from '@/components/common/ThemeSwitch.vue'

const links = [
  { id: 'expertise', label: 'Expertise' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'contact', label: 'Contact' },
] as const

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 8)
const viewportHeight = ref(0)
const isPastHero = computed(() => viewportHeight.value > 0 && y.value > viewportHeight.value * 0.55)

/* ---- Active section ------------------------------------------------------ */
const activeId = ref<string | null>(null)
const sections = shallowRef<HTMLElement[]>([])

useIntersectionObserver(
  sections,
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) activeId.value = entry.target.id
    }
  },
  // A thin band across the middle of the viewport decides which section is current.
  { rootMargin: '-45% 0px -54% 0px' },
)

/* ---- Sliding indicator --------------------------------------------------- */
const list = useTemplateRef<HTMLElement>('list')
const linkEls = useTemplateRef<HTMLAnchorElement[]>('linkEls')
const indicator = ref({ x: 0, width: 0 })
const activeIndex = computed(() => links.findIndex((link) => link.id === activeId.value))

// Measured on the label, not the link: the bar never runs into the padding
// (nor, on mobile, past the rounded ends of the floating pill).
function measure(): void {
  const link = linkEls.value?.[activeIndex.value]
  const label = link?.querySelector<HTMLElement>('.nav__link-label')
  if (link && label) {
    indicator.value = { x: link.offsetLeft + label.offsetLeft, width: label.offsetWidth }
  }
}

useResizeObserver(list, measure)
watch(activeIndex, measure, { flush: 'post' })

const indicatorStyle = computed(() => ({
  transform: `translateX(${indicator.value.x}px) scaleX(${indicator.value.width})`,
  opacity: activeIndex.value >= 0 ? 1 : 0,
}))

onMounted(() => {
  viewportHeight.value = window.innerHeight
  sections.value = Array.from(document.querySelectorAll<HTMLElement>('main > section[id]'))
})
</script>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  block-size: var(--nav-height);
}

/* Frosted surface lives on a pseudo-element: `backdrop-filter` on the header
   itself would trap the fixed mobile menu inside it. */
.nav::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--nav-surface);
  backdrop-filter: blur(14px) saturate(1.2);
  border-block-end: 1px solid var(--border);
  opacity: 0;
  transition: opacity var(--duration-m) var(--ease-out);
}

.nav.is-scrolled::before {
  opacity: 1;
}

.nav__inner {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-m);
  inline-size: var(--container);
  block-size: 100%;
  margin-inline: auto;
}

.nav__brand {
  display: inline-flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-inline-end: auto;
  font-size: var(--step-2);
  font-weight: 650;
  letter-spacing: -0.04em;
}

.nav__brand-dot {
  color: var(--accent);
}

.nav__brand:focus-visible {
  outline-offset: 6px;
}

.nav__links {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
}

.nav__link {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  min-block-size: 2.75rem;
  padding-inline: 1rem;
  border-radius: var(--radius-pill);
  font-size: var(--step--1);
  font-weight: 500;
  color: var(--text-soft);
  transition: color var(--duration-s) var(--ease-out);
}

.nav__link:hover,
.nav__link[aria-current] {
  color: var(--text);
}

.nav__link:focus-visible {
  border-radius: var(--radius-pill);
}

/* A 1px-wide bar scaled to the active link width — transform only. */
.nav__indicator {
  position: absolute;
  inset-block-end: 0.35rem;
  inset-inline-start: 0;
  inline-size: 1px;
  block-size: 1.5px;
  background-color: var(--accent);
  transform-origin: 0 50%;
  transition:
    transform 550ms var(--ease-in-out),
    opacity var(--duration-s) var(--ease-out);
  pointer-events: none;
}

/* ---- Small screens: links become a floating pill at the thumb zone ---------- */
@media (width < 48em) {
  .nav__links {
    position: fixed;
    inset-block-end: max(1rem, env(safe-area-inset-bottom));
    inset-inline-start: 50%;
    padding: 0.3rem;
    border-radius: var(--radius-pill);
    background-color: var(--nav-surface);
    backdrop-filter: blur(14px) saturate(1.2);
    box-shadow:
      inset 0 0 0 1px var(--border),
      var(--shadow-lift);
    transform: translate(-50%, 140%);
    opacity: 0;
    transition:
      transform 600ms var(--ease-out),
      opacity var(--duration-s) var(--ease-out);
  }

  .is-past-hero .nav__links,
  .nav__links:focus-within {
    transform: translate(-50%, 0);
    opacity: 1;
  }

  .nav__indicator {
    inset-block-end: 0.55rem;
  }
}

@media (width >= 80em) {
  .nav__links {
    gap: 0.5rem;
  }
}
</style>
