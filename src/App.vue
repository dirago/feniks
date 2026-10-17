<template>
  <a class="skip-link" href="#contenu">Aller au contenu</a>
  <AppNav />
  <main id="contenu" tabindex="-1">
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
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ExpertiseSection from '@/components/sections/ExpertiseSection.vue'
import TimelineSection from '@/components/timeline/TimelineSection.vue'
import ManifestoSection from '@/components/sections/ManifestoSection.vue'
import StackSection from '@/components/sections/StackSection.vue'
import AvailabilitySection from '@/components/sections/AvailabilitySection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
</script>

<style scoped>
.skip-link {
  position: fixed;
  inset-block-start: 0.75rem;
  inset-inline-start: 0.75rem;
  z-index: 100;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-s);
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
