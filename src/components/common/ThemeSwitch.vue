<template>
  <button
    :aria-checked="isDark"
    class="theme-switch"
    :data-state="theme"
    role="switch"
    type="button"
    @click="onClick"
  >
    <span class="visually-hidden">Thème sombre</span>
    <span aria-hidden="true" class="theme-switch__track">
      <span class="theme-switch__thumb" />

      <span class="theme-switch__option theme-switch__option--light">
        <svg class="sun" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
          <circle class="sun__core" cx="12" cy="12" r="4" />
          <g class="sun__rays" stroke-linecap="round">
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2" />
            <path d="M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
          </g>
        </svg>
        <span class="theme-switch__label">Light</span>
      </span>

      <span class="theme-switch__option theme-switch__option--dark">
        <svg class="moon" viewBox="0 0 24 24">
          <mask id="moon-cut">
            <rect fill="#fff" height="24" width="24" />
            <circle class="moon__cut" cx="17" cy="8" fill="#000" r="6.5" />
          </mask>
          <circle cx="12" cy="12" fill="currentColor" mask="url(#moon-cut)" r="7.5" />
        </svg>
        <span class="theme-switch__label">Dark</span>
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
const isDark = computed(() => theme.value === 'dark')

function onClick(event: MouseEvent): void {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
}
</script>

<style scoped>
.theme-switch {
  --pad: 0.3rem;
  --height: 2.9rem;

  position: relative;
  display: inline-flex;
  border-radius: var(--radius-pill);
  -webkit-tap-highlight-color: transparent;
}

.theme-switch:focus-visible {
  border-radius: var(--radius-pill);
}

.theme-switch__track {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  block-size: var(--height);
  padding: var(--pad);
  border-radius: var(--radius-pill);
  background-color: var(--surface-sunken);
  box-shadow:
    inset 0 1px 2px rgb(0 0 0 / 8%),
    inset 0 0 0 1px var(--border);
  transition:
    background-color var(--duration-s) var(--ease-out),
    box-shadow var(--duration-s) var(--ease-out);
}

.theme-switch:hover .theme-switch__track {
  box-shadow:
    inset 0 1px 2px rgb(0 0 0 / 8%),
    inset 0 0 0 1px var(--border-strong);
}

/* Paper puck sliding between the two options. */
.theme-switch__thumb {
  position: absolute;
  inset-block: var(--pad);
  inset-inline-start: var(--pad);
  inline-size: calc(50% - var(--pad));
  border-radius: var(--radius-pill);
  background: linear-gradient(180deg, var(--surface-elevated), var(--surface-raised));
  box-shadow:
    var(--paper-edge),
    0 1px 2px rgb(40 25 10 / 12%),
    0 4px 12px -4px rgb(40 25 10 / 25%);
  transition: transform 520ms var(--ease-in-out);
}

[data-state='dark'] .theme-switch__thumb {
  transform: translateX(100%);
}

.theme-switch:active .theme-switch__thumb {
  transition-duration: 320ms;
  scale: 0.96;
}

.theme-switch__option {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  block-size: 100%;
  padding-inline: 0.75rem;
  color: var(--text-muted);
  transition: color var(--duration-s) var(--ease-out);
}

[data-state='light'] .theme-switch__option--light,
[data-state='dark'] .theme-switch__option--dark {
  color: var(--text);
}

.theme-switch__label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.sun,
.moon {
  inline-size: 1.15rem;
  block-size: 1.15rem;
  overflow: visible;
}

/* Sun: rays retract and turn when inactive. */
.sun__rays {
  transform-origin: 12px 12px;
  transition:
    transform 620ms var(--ease-out),
    opacity var(--duration-s) var(--ease-out);
}

.sun__core {
  transform-origin: 12px 12px;
  transition: transform 620ms var(--ease-out);
}

[data-state='dark'] .sun__rays {
  transform: rotate(-45deg) scale(0.78);
  opacity: 0.75;
}

[data-state='dark'] .sun__core {
  transform: scale(0.85);
}

/* Moon: the carving disc slides in when active — full disc → crescent. */
.moon {
  transition: transform 620ms var(--ease-out);
}

.moon__cut {
  transition: transform 620ms var(--ease-out);
}

/* Inactive: a thinner bite, turned away. */
[data-state='light'] .moon__cut {
  transform: translate(2.5px, -2.5px);
}

[data-state='light'] .moon {
  transform: rotate(-30deg) scale(0.9);
}

@media (width < 40em) {
  .theme-switch {
    --height: 2.75rem;
  }

  .theme-switch__label {
    display: none;
  }

  .theme-switch__option {
    inline-size: 2.6rem;
    padding-inline: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .theme-switch__thumb,
  .sun__rays,
  .sun__core,
  .moon,
  .moon__cut {
    transition-duration: 1ms;
  }
}
</style>
