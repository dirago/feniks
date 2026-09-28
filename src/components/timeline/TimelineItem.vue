<template>
  <li
    :id="`mission-${experience.id}`"
    class="t-item"
    :class="{ 'is-active': active, 'is-dimmed': dimmed, 'is-featured': experience.featured }"
    data-timeline-item
  >
    <article :aria-labelledby="`mission-${experience.id}-title`" class="t-item__article">
      <span aria-hidden="true" class="t-item__ghost">{{ experience.startYear }}</span>
      <span aria-hidden="true" class="t-item__tick" />

      <p class="t-item__period mono">{{ experience.period }}</p>

      <h3 :id="`mission-${experience.id}-title`" class="t-item__company">
        <span class="t-item__company-inner">{{ experience.company }}</span>
      </h3>

      <dl class="t-item__meta">
        <div class="t-item__meta-row t-item__meta-row--role">
          <dt>Rôle</dt>
          <dd>
            <template v-if="experience.previousRole">
              <span class="t-item__role-from">{{ experience.previousRole }}</span>
              <span aria-label="puis" class="t-item__role-arrow">→</span>
            </template>
            <span class="t-item__role">{{ experience.role }}</span>
          </dd>
        </div>
        <div v-if="experience.product" class="t-item__meta-row">
          <dt>Produit</dt>
          <dd>{{ experience.product }}</dd>
        </div>
        <div class="t-item__meta-row">
          <dt>Contexte</dt>
          <dd>{{ experience.type }}</dd>
        </div>
        <div class="t-item__meta-row">
          <dt>Secteur</dt>
          <dd>{{ experience.sector }}</dd>
        </div>
      </dl>

      <ul class="t-item__desc" role="list">
        <li v-for="line in experience.description" :key="line">{{ line }}</li>
      </ul>

      <div class="t-item__impact">
        <p class="t-item__impact-label mono">Impact</p>
        <p class="t-item__impact-text">{{ experience.impact }}</p>
      </div>

      <ul :aria-label="`Stack ${experience.company}`" class="tag-list t-item__stack">
        <li v-for="tech in experience.stack" :key="tech" class="tag">{{ tech }}</li>
      </ul>
    </article>
  </li>
</template>

<script setup lang="ts">
import type { Experience } from '@/types/content'

defineProps<{
  experience: Experience
  active: boolean
  /** Another mission is being read: recede, while staying readable (AA). */
  dimmed?: boolean
}>()
</script>

<style scoped>
.t-item {
  position: relative;
  padding-block: var(--space-xl);
}

.t-item__article {
  --pad-top: 0px;
  --tick-start: calc(var(--track-pad) * -1);

  position: relative;
  display: grid;
  gap: var(--space-s);
}

/* Receding is done with colour, not opacity, so contrast stays compliant. */
.t-item__company,
.t-item__meta dd,
.t-item__desc,
.t-item__impact-text,
.t-item__ghost {
  transition:
    color 700ms var(--ease-out),
    -webkit-text-stroke-color 700ms var(--ease-out),
    opacity 700ms var(--ease-out);
}

.is-dimmed .t-item__company {
  color: var(--text-faint);
}

.is-dimmed .t-item__desc,
.is-dimmed .t-item__impact-text,
.is-dimmed .t-item__meta dd,
.is-dimmed .t-item__meta-row--role dd {
  color: var(--text-muted);
}

.is-dimmed .t-item__ghost {
  opacity: 0.4;
}

/* Giant outlined start year floating behind the mission. */
.t-item__ghost {
  position: absolute;
  inset-block-start: -0.18em;
  inset-inline-end: 0;
  z-index: -1;
  font-size: clamp(6rem, 3rem + 14vw, 17rem);
  font-weight: 700;
  font-stretch: 80%;
  line-height: 1;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1px var(--outline-text);
  pointer-events: none;
  user-select: none;
}

/* Tick crossing the axis — grows when the mission becomes active. */
.t-item__tick {
  position: absolute;
  inset-block-start: calc(var(--pad-top) + 0.6em);
  inset-inline-start: var(--tick-start);
  inline-size: calc(var(--tick-start) * -1 - 0.75rem);
  block-size: 1px;
  background-color: var(--border-strong);
  transform-origin: 0 50%;
  transition: background-color 600ms var(--ease-out);
}

.t-item__tick::before {
  content: '';
  position: absolute;
  inset-block-start: -3px;
  inset-inline-start: -3px;
  inline-size: 7px;
  block-size: 7px;
  background-color: var(--surface);
  box-shadow: inset 0 0 0 1px var(--border-strong);
  rotate: 45deg;
  transition:
    background-color 600ms var(--ease-out),
    box-shadow 600ms var(--ease-out);
}

.is-active .t-item__tick {
  background-color: var(--accent);
}

.is-active .t-item__tick::before {
  background-color: var(--accent);
  box-shadow: inset 0 0 0 1px var(--accent);
}

.t-item__period {
  color: var(--accent-ink);
}

.t-item__company {
  overflow: clip;
  overflow-clip-margin: 0.1em;
  font-size: var(--step-5);
  font-weight: 620;
  font-stretch: 90%;
  line-height: 0.95;
  letter-spacing: -0.05em;
}

.t-item__company-inner {
  display: inline-block;
  padding-block-end: 0.05em;
}

.t-item__meta {
  display: grid;
  gap: 0.35rem;
  margin-block: var(--space-2xs) var(--space-3xs);
  padding-block: var(--space-xs);
  border-block: 1px solid var(--hairline);
}

.t-item__meta-row {
  display: grid;
  grid-template-columns: 6.5rem 1fr;
  gap: var(--space-s);
  align-items: baseline;
}

.t-item__meta dt {
  font-family: var(--font-mono);
  font-size: var(--step--2);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--text-muted);
}

.t-item__meta dd {
  margin: 0;
  font-size: var(--step--1);
  color: var(--text-soft);
}

.t-item__meta-row--role dd {
  font-size: var(--step-0);
  font-weight: 560;
  color: var(--text);
}

.t-item__role-from {
  color: var(--text-muted);
  font-weight: 450;
}

.t-item__role-arrow {
  margin-inline: 0.4em;
  color: var(--accent);
}

.t-item__desc {
  display: grid;
  gap: var(--space-2xs);
  margin: 0;
  color: var(--text-soft);
}

.t-item__desc li {
  position: relative;
  max-inline-size: var(--measure);
  padding-inline-start: 1.4rem;
}

.t-item__desc li::before {
  content: '';
  position: absolute;
  inset-block-start: 0.8em;
  inset-inline-start: 0;
  inline-size: 0.6rem;
  block-size: 1px;
  background-color: var(--accent);
}

.t-item__impact {
  display: grid;
  gap: 0.35rem;
  max-inline-size: var(--measure);
  margin-block-start: var(--space-2xs);
  padding: var(--space-s) var(--space-m);
  border-inline-start: 2px solid var(--accent);
  background-color: color-mix(in srgb, var(--surface-elevated) 65%, transparent);
  border-radius: 0 var(--radius-s) var(--radius-s) 0;
}

.t-item__impact-label {
  color: var(--accent-ink);
}

.t-item__impact-text {
  font-weight: 500;
  color: var(--text);
}

.t-item__stack {
  margin-block-start: var(--space-3xs);
}

/* ---- Featured mission: a sheet of paper laid across the axis --------------- */
.is-featured .t-item__article {
  --pad-top: var(--space-l);

  padding: var(--space-l) var(--space-m);
  border-radius: var(--radius-m);
  background-color: var(--surface-elevated);
  box-shadow: var(--paper-edge), var(--shadow-lift);
}

.is-featured .t-item__company {
  font-size: var(--step-6);
}

.is-featured .t-item__ghost {
  inset-block-start: auto;
  inset-block-end: -0.1em;
  inset-inline-end: var(--space-m);
}

@media (width >= 48em) {
  .is-featured .t-item__article {
    --pad-top: var(--space-xl);

    padding: var(--space-xl) var(--space-l);
  }
}

@media (width >= 80em) {
  /* The sheet is laid across the axis: it becomes the marker itself. */
  .is-featured .t-item__article {
    margin-inline-start: calc(var(--track-pad) * -1 - var(--space-m));
    padding-inline-start: calc(var(--space-m) + var(--space-l));
  }

  .is-featured .t-item__tick {
    display: none;
  }

  .is-featured .t-item__desc {
    grid-template-columns: 1fr 1fr;
    column-gap: var(--space-l);
  }

  .is-featured .t-item__desc li {
    max-inline-size: none;
  }
}
</style>
