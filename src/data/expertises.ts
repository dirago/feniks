import type { Expertise } from '@/types/content'

export const expertises: readonly Expertise[] = [
  {
    id: 'engineering',
    title: 'Frontend Engineering',
    description:
      'Applications frontend robustes et fortement typées avec JavaScript, TypeScript et Vue.js. Conception de composants complexes, gestion d’état, routing, intégration d’API et structuration de codebases capables d’évoluer dans la durée.',
    keywords: ['Vue 3', 'TypeScript', 'Composition API', 'Pinia', 'Vue Router', 'Nuxt', 'React'],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    description:
      'Conception et évolution d’architectures frontend sur des produits from scratch comme sur des applications existantes. Séparation claire des responsabilités et recherche permanente de maintenabilité et de testabilité.',
    keywords: [
      'Architecture hexagonale',
      'Clean Architecture',
      'Software Craftsmanship',
      'Domain boundaries',
    ],
  },
  {
    id: 'ui',
    title: 'UI Engineering',
    description:
      'Conception de composants réutilisables et de Design Systems capables d’assurer cohérence visuelle, accessibilité et réutilisabilité à l’échelle d’un produit.',
    keywords: ['Design Systems', 'Storybook', 'HTML', 'CSS', 'SCSS', 'Responsive', 'WCAG', 'RGAA'],
  },
  {
    id: 'quality',
    title: 'Quality & Lead',
    description:
      'Mise en place des standards frontend, stratégies de tests, conventions et processus permettant aux équipes de faire évoluer leurs produits sans sacrifier la qualité.',
    keywords: [
      'Vitest',
      'Vue Test Utils',
      'Jest',
      'Cypress',
      'TDD',
      'Code Review',
      'CI/CD',
      'Mentorat',
    ],
  },
]
