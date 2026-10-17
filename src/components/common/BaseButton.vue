<template>
  <a
    v-if="href"
    class="btn"
    :class="[`btn--${variant}`]"
    :download="download === true ? '' : download || undefined"
    :href="href"
    :rel="external ? 'noopener noreferrer' : undefined"
    :target="external ? '_blank' : undefined"
  >
    <slot />
    <AppIcon v-if="icon" class="btn__icon" :name="icon" />
  </a>
  <button v-else class="btn" :class="[`btn--${variant}`]" type="button">
    <slot />
    <AppIcon v-if="icon" class="btn__icon" :name="icon" />
  </button>
</template>

<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import type { IconName } from './icons'

const {
  href,
  variant = 'primary',
  icon,
  download,
  // Boolean props already default to `false` in Vue.
  external,
} = defineProps<{
  href?: string
  variant?: 'primary' | 'secondary'
  icon?: IconName
  /** `true` for the bare attribute, a string to rename the file. */
  download?: boolean | string
  external?: boolean
}>()
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  min-block-size: 3.25rem;
  padding-inline: 1.5rem;
  border-radius: var(--radius-s);
  font-size: var(--step-0);
  font-weight: 560;
  line-height: 1;
  white-space: nowrap;
  transition:
    background-color var(--duration-s) var(--ease-out),
    color var(--duration-s) var(--ease-out),
    box-shadow var(--duration-s) var(--ease-out);
}

.btn:focus-visible {
  outline-offset: 4px;
  border-radius: var(--radius-s);
}

.btn--primary {
  color: var(--accent-contrast);
  background-color: var(--accent);
}

.btn--primary:hover {
  background-color: var(--accent-ink);
}

.btn--secondary {
  color: var(--text);
  box-shadow: inset 0 0 0 1px var(--border-strong);
}

.btn--secondary:hover {
  box-shadow: inset 0 0 0 1px var(--text);
}

.btn__icon {
  inline-size: 1.1em;
  block-size: 1.1em;
}
</style>
