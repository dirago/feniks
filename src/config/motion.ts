export const EASE = {
  out: 'power3.out',
  inOut: 'power2.inOut',
} as const

export const DURATION = {
  micro: 0.18,
  reveal: 0.7,
  mask: 1,
} as const

export const MEDIA = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktop: '(min-width: 64em) and (prefers-reduced-motion: no-preference)',
  finePointer: '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
} as const

export type MotionConditions = { [K in keyof typeof MEDIA]: boolean }
