<template>
  <section id="contact" aria-labelledby="contact-title" class="section contact">
    <div class="container">
      <p class="section-label">Contact</p>

      <h2 id="contact-title" class="contact__title">
        <SplitLines :lines="['Construisons quelque chose', 'de solide.']">
          <template #line-1>de <em class="accent-serif">solide.</em></template>
        </SplitLines>
      </h2>

      <div class="contact__grid">
        <div class="contact__primary" data-reveal>
          <BaseButton :href="mailto()" icon="arrow-right" magnetic>Me contacter</BaseButton>
          <div class="contact__email">
            <a class="contact__email-link" :href="mailto()">{{ profile.email }}</a>
            <CopyEmailButton :email="profile.email" />
          </div>
        </div>

        <ul class="contact__links" data-reveal role="list">
          <li>
            <a class="link" :href="profile.linkedinUrl" rel="noopener noreferrer" target="_blank">
              LinkedIn
              <AppIcon name="arrow-up-right" />
              <span class="visually-hidden">(nouvel onglet)</span>
            </a>
          </li>
          <li>
            <a class="link" download :href="profile.cvUrl">
              Télécharger mon CV
              <AppIcon name="download" />
            </a>
          </li>
          <li class="contact__location mono">{{ profile.location }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { mailto, profile } from '@/config/profile'
import BaseButton from '@/components/common/BaseButton.vue'
import CopyEmailButton from '@/components/common/CopyEmailButton.vue'
import SplitLines from '@/components/common/SplitLines.vue'
import AppIcon from '@/components/common/AppIcon.vue'
</script>

<style scoped>
.contact {
  padding-block-end: var(--space-2xl);
}

.contact__title {
  margin-block: var(--space-l) var(--space-xl);
  font-size: var(--step-6);
  font-weight: 620;
  font-stretch: 88%;
  line-height: 0.92;
  letter-spacing: -0.055em;
}

.contact__grid {
  display: grid;
  gap: var(--space-xl);
  padding-block-start: var(--space-l);
  border-block-start: 1px solid var(--hairline);
}

.contact__primary {
  display: grid;
  gap: var(--space-m);
  justify-items: start;
}

.contact__email {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs) var(--space-s);
}

.contact__email-link {
  font-size: var(--step-2);
  font-weight: 500;
  letter-spacing: -0.02em;
  text-decoration: underline;
  text-decoration-color: var(--border-strong);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
  transition: text-decoration-color var(--duration-s) var(--ease-out);
  overflow-wrap: anywhere;
}

.contact__email-link:hover {
  text-decoration-color: var(--accent);
}

.contact__links {
  display: grid;
  gap: 0.25rem;
  align-content: start;
  margin: 0;
}

.contact__location {
  margin-block-start: var(--space-s);
  color: var(--text-muted);
}

@media (width >= 64em) {
  .contact__title {
    font-size: clamp(4.5rem, 0.6rem + 7vw, 12rem);
  }

  .contact__grid {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  }

  .contact__links {
    justify-self: end;
    min-inline-size: 16rem;
  }
}
</style>
