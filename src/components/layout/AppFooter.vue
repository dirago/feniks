<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__name">
        <strong>{{ profile.name }}</strong>
        <span>{{ profile.role }} - {{ profile.status }}</span>
      </p>
      <p class="footer__meta mono">
        <span>© {{ year }}</span>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { profile } from '@/config/profile'

const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  padding-block: var(--space-l) calc(var(--space-l) + env(safe-area-inset-bottom));
  border-block-start: 1px solid var(--hairline);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-s) var(--space-l);
}

.footer__name {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  font-size: var(--step--1);
  color: var(--text-muted);
}

.footer__name strong {
  font-weight: 600;
  color: var(--text);
}

.footer__meta {
  display: flex;
  gap: var(--space-m);
  color: var(--text-muted);
}

@media (width < 48em) {
  /* Keep clear of the floating mobile menu. */
  .footer {
    padding-block-end: calc(6rem + env(safe-area-inset-bottom));
  }
}
</style>
