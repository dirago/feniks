<template>
  <a class="skip-link" href="#contenu">Aller au contenu</a>
  <AppBackground />
  <AppNav />
  <main id="contenu" ref="main" tabindex="-1">
    <HeroSection />
    <ExpertiseSection />
    <TimelineSection />
    <ManifestoSection />
    <StackSection />
    <AvailabilitySection />
    <ContactSection />
  </main>
  <AppFooter />
</template>

<script setup lang="ts">
import { useTemplateRef, watchEffect } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'
import { useGsap } from '@/composables/useGsap'
import { ScrollTrigger } from '@/animations/gsap'
import { fadeUp, maskReveal } from '@/animations/reveal'
import AppBackground from '@/components/layout/AppBackground.vue'
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ExpertiseSection from '@/components/sections/ExpertiseSection.vue'
import TimelineSection from '@/components/timeline/TimelineSection.vue'
import ManifestoSection from '@/components/sections/ManifestoSection.vue'
import StackSection from '@/components/sections/StackSection.vue'
import AvailabilitySection from '@/components/sections/AvailabilitySection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

// `motion-ok` gates the CSS initial states of revealed elements; keep it in
// sync if the OS setting changes while the page is open.
const reducedMotion = usePreferredReducedMotion()
watchEffect(() => {
  document.documentElement.classList.toggle('motion-ok', reducedMotion.value !== 'reduce')
})

const main = useTemplateRef<HTMLElement>('main')

// Page-wide reveals: two batched observers instead of one trigger per element.
useGsap(
  main,
  ({ conditions }) => {
    if (!conditions.motion) return

    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      once: true,
      onEnter: (elements) => fadeUp(elements, { stagger: 0.08 }),
    })

    ScrollTrigger.batch('[data-split]', {
      start: 'top 85%',
      once: true,
      onEnter: (elements) => {
        for (const element of elements) maskReveal(element.querySelectorAll('.split-line__inner'))
      },
    })
  },
  { defer: true },
)
</script>

<style scoped>
.skip-link {
  position: fixed;
  inset-block-start: 0.75rem;
  inset-inline-start: 0.75rem;
  z-index: 100;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-pill);
  font-weight: 550;
  color: var(--surface-elevated);
  background-color: var(--text);
  transform: translateY(-200%);
  transition: transform var(--duration-s) var(--ease-out);
}

.skip-link:focus-visible {
  transform: none;
}

main:focus {
  outline: none;
}
</style>
