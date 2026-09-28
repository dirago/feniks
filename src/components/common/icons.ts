/** 24×24 stroke icons — kept textual and tiny on purpose. */
export const iconPaths = {
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  copy: 'M9 9h10v10H9zM5 15V5h10',
  check: 'M5 12.5 10 17.5 19 7',
} as const

export type IconName = keyof typeof iconPaths
