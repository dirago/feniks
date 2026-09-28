export interface Experience {
  id: string
  company: string
  /** Product built during the mission, when it differs from the company name. */
  product?: string
  role: string
  /** Role held at the start of the mission, when it evolved during it. */
  previousRole?: string
  type: string
  period: string
  startYear: number
  endYear: number
  sector: string
  description: string[]
  stack: string[]
  impact: string
  featured?: boolean
}

export interface Expertise {
  id: string
  title: string
  description: string
  keywords: string[]
}

export interface Principle {
  title: string
  description: string
}

export interface StackGroup {
  label: string
  items: string[]
}
