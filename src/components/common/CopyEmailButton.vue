<template>
  <button class="copy" :data-status="status" type="button" @click="copy">
    <span aria-hidden="true" class="copy__icon">
      <AppIcon :name="status === 'copied' ? 'check' : 'copy'" />
    </span>
    <span class="copy__text">
      <span class="copy__default">Copier mon email</span>
      <span aria-hidden="true" class="copy__feedback">{{ messages[status] }}</span>
    </span>
  </button>
  <span class="visually-hidden" role="status">{{ messages[status] }}</span>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const { email } = defineProps<{ email: string }>()

type Status = 'idle' | 'copied' | 'error'
const status = ref<Status>('idle')
const FEEDBACK_DURATION = 2200
let timer: ReturnType<typeof setTimeout> | undefined

const messages: Record<Status, string> = {
  idle: '',
  copied: 'Copié !',
  error: 'Copie impossible, sélectionnez l’adresse',
}

async function copy(): Promise<void> {
  try {
    await navigator.clipboard.writeText(email)
    status.value = 'copied'
  } catch {
    status.value = 'error'
  }
  clearTimeout(timer)
  timer = setTimeout(() => (status.value = 'idle'), FEEDBACK_DURATION)
}

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<style scoped>
.copy {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  min-block-size: 2.75rem;
  padding: 0.4rem 1rem 0.4rem 0.45rem;
  border-radius: var(--radius-pill);
  font-size: var(--step--1);
  font-weight: 500;
  color: var(--text-soft);
  box-shadow: inset 0 0 0 1px var(--border);
  transition:
    box-shadow var(--duration-s) var(--ease-out),
    color var(--duration-s) var(--ease-out),
    background-color var(--duration-s) var(--ease-out);
}

.copy:hover {
  color: var(--text);
  background-color: var(--surface-elevated);
  box-shadow: inset 0 0 0 1px var(--border-strong);
}

.copy__icon {
  display: grid;
  place-items: center;
  inline-size: 2rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--surface-sunken);
  transition:
    background-color var(--duration-s) var(--ease-out),
    color var(--duration-s) var(--ease-out),
    transform var(--duration-s) var(--ease-out);
}

[data-status='copied'] .copy__icon {
  color: var(--accent-contrast);
  background-color: var(--accent-ink);
  transform: scale(1.06);
}

.copy__text {
  display: grid;
}

.copy__default,
.copy__feedback {
  grid-area: 1 / 1;
  transition:
    opacity var(--duration-s) var(--ease-out),
    transform var(--duration-s) var(--ease-out);
}

.copy__feedback {
  opacity: 0;
  transform: translateY(40%);
}

[data-status='copied'] .copy__feedback,
[data-status='error'] .copy__feedback {
  opacity: 1;
  transform: none;
}

[data-status='copied'] .copy__default,
[data-status='error'] .copy__default {
  opacity: 0;
  transform: translateY(-40%);
}

[data-status='copied'] .copy__feedback {
  color: var(--accent-ink);
}
</style>
