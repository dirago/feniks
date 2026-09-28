<template>
  <div ref="root" aria-hidden="true" class="bg">
    <div class="bg__light" />
    <div class="bg__halo" />
    <div class="bg__grain" />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useGsap } from '@/composables/useGsap'
import { gsap } from '@/animations/gsap'

const root = useTemplateRef<HTMLElement>('root')

// Warm spotlight trailing the pointer — desktop fine pointers only.
useGsap(root, ({ root: el, conditions }) => {
  if (!conditions.finePointer) return

  const halo = el.querySelector<HTMLElement>('.bg__halo')
  if (!halo) return

  const xTo = gsap.quickTo(halo, 'x', { duration: 1.1, ease: 'power3.out' })
  const yTo = gsap.quickTo(halo, 'y', { duration: 1.1, ease: 'power3.out' })
  const onMove = (event: PointerEvent) => {
    xTo(event.clientX)
    yTo(event.clientY)
  }

  gsap.set(halo, { x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 })
  gsap.to(halo, { autoAlpha: 1, duration: 1.2, delay: 0.6 })
  window.addEventListener('pointermove', onMove, { passive: true })
  return () => {
    window.removeEventListener('pointermove', onMove)
  }
})
</script>

<style scoped>
.bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

/* Late-afternoon light falling from the top-left, a cooler bounce bottom-right. */
.bg__light {
  position: absolute;
  inset: -10%;
  background:
    radial-gradient(60% 55% at 12% 0%, var(--light-warm), transparent 70%),
    radial-gradient(50% 50% at 100% 100%, var(--light-cool), transparent 70%);
  transition: opacity var(--duration-m) var(--ease-out);
}

.bg__halo {
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  inline-size: 44rem;
  aspect-ratio: 1;
  margin: -22rem 0 0 -22rem;
  border-radius: 50%;
  background: radial-gradient(closest-side, var(--halo), transparent);
  opacity: 0;
  visibility: hidden;
  will-change: transform;
}

.bg__grain {
  position: absolute;
  inset: 0;
  opacity: var(--grain-opacity);
  mix-blend-mode: var(--grain-blend);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 220px;
}

[data-theme='dark'] .bg__grain {
  filter: invert(1);
}
</style>
