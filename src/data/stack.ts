import type { StackGroup } from '@/types/content'

export const stackGroups: readonly StackGroup[] = [
  { label: 'Core', items: ['Vue.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS'] },
  {
    label: 'Vue ecosystem',
    items: [
      'Composition API',
      'Pinia',
      'Vue Router',
      'VeeValidate',
      'Vitest',
      'Vue Test Utils',
      'Nuxt',
    ],
  },
  {
    label: 'UI',
    items: ['Storybook', 'SCSS', 'Design Systems', 'Responsive Design', 'Accessibility'],
  },
  {
    label: 'Engineering',
    items: ['Architecture hexagonale', 'TDD', 'Git', 'CI/CD', 'ESLint', 'Prettier', 'Stylelint'],
  },
  { label: 'Experience', items: ['React', 'Jest', 'Cypress', 'Styled Components'] },
]
