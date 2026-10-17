<template>
  <section id="contact" aria-labelledby="contact-title" class="section contact">
    <div class="container">
      <h2 id="contact-title" class="contact__title">Construisons quelque chose de solide.</h2>

      <div class="contact__grid">
        <div class="contact__primary">
          <BaseButton :href="mailto()">Me contacter</BaseButton>
          <div class="contact__email">
            <a class="contact__email-link" :href="mailto()">{{ profile.email }}</a>
            <CopyEmailButton :email="profile.email" />
          </div>
        </div>

        <ul class="contact__links" role="list">
          <li>
            <a class="link" :href="profile.linkedinUrl" rel="noopener noreferrer" target="_blank">
              LinkedIn
              <span class="visually-hidden">(nouvel onglet)</span>
            </a>
          </li>
          <li>
            <a class="link" download :href="profile.cvUrl">
              Télécharger mon CV
              <AppIcon name="download" />
            </a>
          </li>
          <li class="contact__location meta">{{ profile.location }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { mailto, profile } from '@/config/profile'
import BaseButton from '@/components/common/BaseButton.vue'
import CopyEmailButton from '@/components/common/CopyEmailButton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
</script>

<style scoped>
.contact {
  padding-block-end: var(--space-2xl);
}

.contact__title {
  max-inline-size: 16ch;
  margin-block-end: var(--space-xl);
  font-size: var(--step-5);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-display);
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
}

@media (width >= 64em) {
  .contact__grid {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  }

  .contact__links {
    justify-self: end;
    min-inline-size: 16rem;
  }
}
</style>
