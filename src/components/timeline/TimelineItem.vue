<template>
  <li
    :id="`mission-${experience.id}`"
    class="t-item"
    :class="{ 'is-active': active, 'is-dimmed': dimmed, 'is-featured': experience.featured }"
    data-timeline-item
  >
    <article :aria-labelledby="`mission-${experience.id}-title`" class="t-item__article">
      <span aria-hidden="true" class="t-item__tick" />

      <p class="t-item__period meta">{{ experience.period }}</p>

      <h3 :id="`mission-${experience.id}-title`" class="t-item__company">
        {{ experience.company }}
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
        <p class="t-item__impact-label">Impact</p>
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
.t-item__impact-text {
  transition: color 700ms var(--ease-out);
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

/* Weft thread crossing the axis — takes the accent when the mission is read. */
.t-item__tick {
  position: absolute;
  inset-block-start: calc(var(--pad-top) + 0.6em);
  inset-inline-start: var(--tick-start);
  inline-size: calc(var(--tick-start) * -1 - 0.75rem);
  block-size: 2px;
  background-color: var(--border-strong);
  transform-origin: 0 50%;
  transition: background-color 600ms var(--ease-out);
}

.is-active .t-item__tick {
  background-color: var(--accent);
}

.t-item__company {
  font-size: var(--step-5);
  font-weight: 560;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-display);
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
  font-size: var(--step--1);
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
  font-weight: 400;
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
  block-size: 2px;
  background-color: var(--accent-soft);
}

.t-item__impact {
  display: grid;
  gap: 0.35rem;
  max-inline-size: var(--measure);
  margin-block-start: var(--space-2xs);
  padding-inline-start: var(--space-s);
  border-inline-start: 2px solid var(--accent);
}

.t-item__impact-label {
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--accent);
}

.t-item__impact-text {
  font-weight: 500;
  color: var(--text);
}

.t-item__stack {
  margin-block-start: var(--space-3xs);
}

/* ---- Featured mission: a raised panel laid across the axis ----------------- */
.is-featured .t-item__article {
  --pad-top: var(--space-l);

  padding: var(--space-l) var(--space-m);
  border-radius: var(--radius-m);
  background-color: var(--surface-elevated);
  box-shadow: inset 0 0 0 1px var(--border);
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
