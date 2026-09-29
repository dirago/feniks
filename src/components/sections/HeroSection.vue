<template>
  <section id="top" ref="root" aria-labelledby="hero-title" class="hero">
    <div aria-hidden="true" class="hero__sheets">
      <div class="hero__sheet hero__sheet--a">
        <span class="hero__sheet-dim hero__sheet-dim--x"><span class="mono">210</span></span>
        <span class="hero__sheet-dim hero__sheet-dim--y"><span class="mono">297</span></span>
      </div>
      <div class="hero__sheet hero__sheet--b" />
      <div class="hero__sheet hero__sheet--c" />
    </div>

    <div class="hero__grid">
      <p class="hero__eyebrow" data-hero-fade="eyebrow">
        <span class="hero__eyebrow-name">{{ profile.name }}</span>
        <span class="hero__eyebrow-role mono">{{ profile.role }}</span>
      </p>

      <h1 id="hero-title" class="hero__title">
        <span class="hero__line" data-hero-line><span>Senior Frontend</span></span>
        <span class="hero__line hero__line--accent" data-hero-line>
          <span><em class="accent-serif">Freelance</em></span>
        </span>
      </h1>

      <div class="hero__aside">
        <p class="hero__lead">
          J’aide les équipes produit et tech à concevoir, structurer et faire évoluer des
          applications frontend robustes, maintenables et centrées utilisateurs.
        </p>

        <ul class="hero__facts mono" data-hero-fade="body" role="list">
          <li>{{ profile.focus }}</li>
          <li>{{ profile.location }}</li>
        </ul>

        <div class="hero__actions" data-hero-fade="body">
          <BaseButton :href="mailto()" icon="arrow-right" magnetic>Me contacter</BaseButton>
          <BaseButton download :href="profile.cvUrl" icon="download" variant="secondary">
            Télécharger mon CV
          </BaseButton>
          <a
            class="hero__linkedin link"
            :href="profile.linkedinUrl"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
            <AppIcon name="arrow-up-right" />
            <span class="visually-hidden">(nouvel onglet)</span>
          </a>
        </div>
      </div>
    </div>

    <a class="hero__scroll mono" data-hero-fade="body" href="#expertise">
      <span aria-hidden="true" class="hero__scroll-line" />
      Expertise
    </a>
  </section>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { mailto, profile } from '@/config/profile'
import { DURATION, EASE } from '@/config/motion'
import { useGsap } from '@/composables/useGsap'
import { gsap } from '@/animations/gsap'
import BaseButton from '@/components/common/BaseButton.vue'
import AppIcon from '@/components/common/AppIcon.vue'

const root = useTemplateRef<HTMLElement>('root')

useGsap(root, ({ root: hero, conditions }) => {
  if (!conditions.motion) return

  const intro = gsap.timeline({ defaults: { ease: EASE.out } })
  intro
    .fromTo('.hero__sheets', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.4 }, 0)
    .to('[data-hero-fade="eyebrow"]', { autoAlpha: 1, duration: DURATION.reveal }, 0.05)
    .to('[data-hero-line] > span', { y: 0, duration: DURATION.mask, stagger: 0.1 }, 0.1)
    // The lead paragraph is the LCP element: it moves, but is never transparent.
    .from('.hero__lead', { y: 18, duration: DURATION.reveal }, 0.4)
    .fromTo(
      '[data-hero-fade="body"]',
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: DURATION.reveal, stagger: 0.08 },
      0.45,
    )
    .fromTo(
      '.hero__sheet-dim',
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: EASE.inOut, stagger: 0.15 },
      0.6,
    )

  // Sheets drift a few pixels as the hero scrolls away — a hint of depth.
  gsap
    .timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    })
    .to('.hero__sheet--a', { yPercent: -8, rotate: -5.5 }, 0)
    .to('.hero__sheet--b', { yPercent: -16, rotate: 5 }, 0)
    .to('.hero__sheet--c', { yPercent: -10 }, 0)
})
</script>

<style scoped>
.hero {
  position: relative;
  display: grid;
  min-block-size: 100svh;
  padding-block: calc(var(--nav-height) + var(--space-l)) var(--space-l);
  overflow: clip;
  isolation: isolate;
}

.hero__grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: auto 1fr auto;
  column-gap: var(--space-m);
  inline-size: var(--container);
  margin-inline: auto;
}

.hero__eyebrow {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 1.25rem;
  max-inline-size: none;
}

.hero__eyebrow-name {
  font-size: var(--step-1);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.hero__eyebrow-role {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
}

.hero__title {
  grid-column: 1 / -1;
  align-self: center;
  margin-block: var(--space-l) var(--space-l);
  font-size: var(--step-hero);
  font-weight: 620;
  font-stretch: 88%;
  line-height: 0.86;
  letter-spacing: -0.055em;
  text-wrap: nowrap;
}

.hero__line {
  display: block;
  overflow: clip;
  overflow-clip-margin: 0.12em;
  padding-block-end: 0.06em;
}

.hero__line > span {
  display: inline-block;
}

.hero__line--accent {
  padding-inline-start: 0.62em;
}

.hero__line--accent .accent-serif {
  font-size: 1.08em;
  letter-spacing: -0.035em;
  line-height: 0.8;
}

.hero__aside {
  grid-column: 1 / -1;
  display: grid;
  gap: var(--space-m);
  align-content: end;
}

.hero__lead {
  font-size: var(--step-1);
  line-height: 1.5;
  color: var(--text-soft);
  max-inline-size: 36ch;
}

.hero__facts {
  display: grid;
  gap: 0.4rem;
  margin: 0;
  color: var(--text-muted);
}

.hero__facts li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.hero__facts li::before {
  content: '';
  inline-size: 0.35rem;
  aspect-ratio: 1;
  background-color: var(--accent);
  transform: rotate(45deg);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2xs) var(--space-xs);
  margin-block-start: var(--space-2xs);
}

.hero__linkedin {
  margin-inline-start: 0.5rem;
}

.hero__scroll {
  display: none;
}

.hero__sheets {
  position: absolute;

  /* On very wide screens the sheets stay close to the content column. */
  inset-block: 0;
  inset-inline: max(0px, (100% - var(--container-max)) / 2 - 10rem);
  z-index: -1;
  pointer-events: none;
}

.hero__sheet {
  position: absolute;
  aspect-ratio: 210 / 297;
  border-radius: var(--radius-xs);
  background-color: var(--surface-elevated);
  box-shadow: var(--paper-edge), var(--shadow-paper);
}

/* Graph paper — a nod to technical drawings. */
.hero__sheet--a {
  inset-block-start: 14%;
  inset-inline-end: -18%;
  inline-size: clamp(14rem, 34vw, 38rem);
  rotate: -4deg;
  background-image:
    linear-gradient(var(--hairline) 1px, transparent 1px),
    linear-gradient(90deg, var(--hairline) 1px, transparent 1px),
    linear-gradient(color-mix(in srgb, var(--hairline) 45%, transparent) 1px, transparent 1px),
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--hairline) 45%, transparent) 1px,
      transparent 1px
    );
  background-size:
    40px 40px,
    40px 40px,
    8px 8px,
    8px 8px;
  background-position: -1px -1px;
  opacity: 0.9;
}

.hero__sheet--b {
  inset-block-start: 15%;
  inset-inline-end: 17%;
  inline-size: clamp(9rem, 17vw, 19rem);
  rotate: 7deg;
  opacity: 0.75;
}

.hero__sheet--c {
  inset-block-end: -42%;
  inset-inline-start: -9%;
  inline-size: clamp(12rem, 24vw, 26rem);
  rotate: -12deg;
  opacity: 0.55;
}

/* Dimension lines, like on a blueprint. */
.hero__sheet-dim {
  position: absolute;
  display: grid;
  place-items: center;
  color: var(--text-muted);
  transform-origin: 0 50%;
}

.hero__sheet-dim::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 0 solid var(--accent);
  opacity: 0.7;
}

.hero__sheet-dim--x {
  inset-inline: 0;
  inset-block-start: -1.75rem;
  block-size: 0.6rem;
}

.hero__sheet-dim--x::before {
  border-inline-width: 1px;
  background: linear-gradient(var(--accent), var(--accent)) center / 100% 1px no-repeat;
}

.hero__sheet-dim--y {
  inset-block: 0;
  inset-inline-start: -1.75rem;
  inline-size: 0.6rem;
  transform-origin: 50% 0;
}

.hero__sheet-dim--y::before {
  border-block-width: 1px;
  background: linear-gradient(var(--accent), var(--accent)) center / 1px 100% no-repeat;
}

.hero__sheet-dim .mono {
  position: relative;
  padding: 0.1rem 0.4rem;
  font-size: 0.65rem;
  background-color: var(--surface);
}

.hero__sheet-dim--y .mono {
  rotate: -90deg;
}

/* ---- Below desktop: the headline sits right above the copy ------------------ */
@media (width < 64em) {
  .hero__title {
    align-self: end;
  }
}

/* ---- Tablet --------------------------------------------------------------- */
@media (width >= 40em) {
  .hero__aside {
    grid-column: 1 / span 9;
  }
}

/* ---- Desktop: headline spans, aside anchors bottom-right ------------------ */
@media (width >= 64em) {
  .hero__title {
    margin-block: var(--space-m) var(--space-l);
  }

  .hero__aside {
    grid-column: 7 / -1;
    grid-row: 3;
    padding-inline-start: var(--space-m);
    border-inline-start: 1px solid var(--hairline);
  }

  .hero__sheet--a {
    inset-inline-end: -6%;
    inset-block-start: 17%;
  }

  .hero__scroll {
    grid-row: 3;
    position: absolute;
    inset-block-end: var(--space-xl);
    inset-inline-start: max(var(--gutter), (100% - var(--container-max)) / 2);
    display: inline-flex;
    align-items: center;
    gap: 0.9rem;
    color: var(--text-muted);
    transition: color var(--duration-s) var(--ease-out);
  }

  .hero__scroll:hover {
    color: var(--text);
  }

  .hero__scroll-line {
    position: relative;
    inline-size: 1px;
    block-size: 3.5rem;
    overflow: hidden;
    background-color: var(--hairline);
  }

  .hero__scroll-line::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--accent);
    animation: scroll-cue 2.4s var(--ease-in-out) infinite;
  }
}

@media (width >= 100em) {
  .hero__aside {
    grid-column: 8 / -1;
  }
}

@keyframes scroll-cue {
  0% {
    transform: translateY(-100%);
  }

  55%,
  100% {
    transform: translateY(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__scroll-line::after {
    animation: none;
    transform: none;
    opacity: 0.4;
  }
}
</style>
