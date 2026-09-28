<template>
  <a
    v-if="href"
    ref="root"
    class="btn" :class="[`btn--${variant}`]"
    :download="download === true ? '' : download || undefined"
    :href="href"
    :rel="external ? 'noopener noreferrer' : undefined"
    :target="external ? '_blank' : undefined"
  >
    <span class="btn__label"><slot /></span>
    <span class="btn__icon" :data-icon="icon">
      <AppIcon :name="icon" />
      <AppIcon :name="icon" />
    </span>
  </a>
  <button v-else ref="root" class="btn" :class="[`btn--${variant}`]" type="button">
    <span class="btn__label"><slot /></span>
    <span class="btn__icon" :data-icon="icon">
      <AppIcon :name="icon" />
      <AppIcon :name="icon" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useMagnetic } from '@/composables/useMagnetic'
import AppIcon from './AppIcon.vue'
import type { IconName } from './icons'

const {
  href,
  variant = 'primary',
  icon = 'arrow-right',
  download,
  // Boolean props already default to `false` in Vue.
  external,
  magnetic,
} = defineProps<{
  href?: string
  variant?: 'primary' | 'secondary'
  icon?: IconName
  /** `true` for the bare attribute, a string to rename the file. */
  download?: boolean | string
  external?: boolean
  magnetic?: boolean
}>()

const root = useTemplateRef<HTMLElement>('root')
// Decided once at setup: a button does not become magnetic later on.
if (magnetic) useMagnetic(root)
</script>

<style scoped>
.btn {
  --btn-height: clamp(3.25rem, 3.05rem + 0.5vw, 3.75rem);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.1rem;
  min-block-size: var(--btn-height);
  padding-inline: 1.6rem 0.4rem;
  border-radius: var(--radius-pill);
  font-size: var(--step-0);
  font-weight: 550;
  letter-spacing: -0.01em;
  line-height: 1;
  white-space: nowrap;
  transition:
    background-color var(--duration-s) var(--ease-out),
    border-color var(--duration-s) var(--ease-out),
    color var(--duration-s) var(--ease-out),
    box-shadow var(--duration-s) var(--ease-out);
  will-change: transform;
}

.btn:focus-visible {
  outline-offset: 4px;
  border-radius: var(--radius-pill);
}

.btn--primary {
  color: var(--surface-elevated);
  background-color: var(--text);
  box-shadow: var(--shadow-paper);
}

.btn--primary:hover {
  box-shadow: var(--shadow-lift);
}

.btn--secondary {
  color: var(--text);
  background-color: transparent;
  box-shadow: inset 0 0 0 1px var(--border-strong);
}

.btn--secondary:hover {
  background-color: var(--surface-elevated);
  box-shadow:
    inset 0 0 0 1px var(--text),
    var(--shadow-paper);
}

/* Icon lives in a round chip; on hover the glyph slides out and a twin slides in. */
.btn__icon {
  position: relative;
  display: grid;
  place-items: center;
  inline-size: calc(var(--btn-height) - 0.8rem);
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  transition:
    transform var(--duration-s) var(--ease-out),
    background-color var(--duration-s) var(--ease-out);
}

.btn--primary .btn__icon {
  color: var(--accent-contrast);
  background-color: var(--accent);
}

[data-theme='dark'] .btn--primary .btn__icon {
  color: var(--char-950);
}

.btn--secondary .btn__icon {
  background-color: var(--surface-sunken);
}

.btn__icon > :deep(svg) {
  grid-area: 1 / 1;
  transition: transform var(--duration-m) var(--ease-out);
}

.btn__icon > :deep(svg:last-child) {
  transform: translate(-150%, 0);
}

.btn__icon[data-icon='download'] > :deep(svg:last-child) {
  transform: translate(0, -150%);
}

.btn__icon[data-icon='arrow-up-right'] > :deep(svg:last-child) {
  transform: translate(-150%, 150%);
}

@media (hover: hover) {
  .btn:hover .btn__icon {
    transform: translateX(2px);
  }

  .btn:hover .btn__icon > :deep(svg:first-child) {
    transform: translate(150%, 0);
  }

  .btn:hover .btn__icon[data-icon='download'] > :deep(svg:first-child) {
    transform: translate(0, 150%);
  }

  .btn:hover .btn__icon[data-icon='arrow-up-right'] > :deep(svg:first-child) {
    transform: translate(150%, -150%);
  }

  .btn:hover .btn__icon > :deep(svg:last-child) {
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn__icon > :deep(svg:last-child) {
    display: none;
  }

  .btn:hover .btn__icon > :deep(svg:first-child) {
    transform: none;
  }
}
</style>
