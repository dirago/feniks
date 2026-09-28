export const profile = {
  name: 'Raphaël Di Rago',
  role: 'Senior / Lead Frontend',
  status: 'Freelance',
  email: 'rdirago@feniks.fr',
  location: 'Lyon · Saint-Étienne · Remote',
  focus: 'Vue.js · TypeScript · Software Craftsmanship · Design Systems',
  linkedinUrl: 'https://www.linkedin.com/in/rapha%C3%ABl-di-rago-400b79112',
  cvUrl: '/CV_RDR_FENIKS.pdf',
  siteUrl: 'https://www.feniks.fr',
} as const

export const mailto = (subject?: string): string =>
  subject
    ? `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${profile.email}`
