import type { MotionConditions } from '@/config/motion'
import { gsap, ScrollTrigger } from './gsap'

interface TimelineAnimationOptions {
  root: HTMLElement
  conditions: MotionConditions
  onActive: (index: number) => void
}

/**
 * Scroll narration of the career timeline. Must run inside `useGsap` so every
 * trigger is scoped and reverted with the component.
 *
 * Budget: 1 scrubbed progress timeline + 1 activation trigger per mission.
 */
export function createTimelineAnimations({
  root,
  conditions,
  onActive,
}: TimelineAnimationOptions): void {
  const items = gsap.utils.toArray<HTMLElement>('[data-timeline-item]', root)

  // Which mission is under the reading line. Kept with reduced motion too:
  // it drives the sticky year and the index, which are content, not decoration.
  items.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 60%',
      end: 'bottom 60%',
      onToggle: (self) => {
        if (self.isActive) onActive(index)
      },
    })
  })

  if (!conditions.motion) return

  // Axis and range bar follow the reading progress.
  gsap
    .timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.timeline__track',
        start: 'top 60%',
        end: 'bottom 60%',
        scrub: 0.6,
      },
    })
    .fromTo('.timeline__axis-fill', { scaleY: 0 }, { scaleY: 1 }, 0)
    .fromTo(
      '.timeline__range-fill',
      conditions.desktop ? { scaleY: 0 } : { scaleX: 0 },
      conditions.desktop ? { scaleY: 1 } : { scaleX: 1 },
      0,
    )
}
