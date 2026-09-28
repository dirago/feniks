import { EASE, type MotionConditions } from '@/config/motion'
import { gsap, ScrollTrigger } from './gsap'
import { fadeUp, maskReveal, staggerIn } from './reveal'

interface TimelineAnimationOptions {
  root: HTMLElement
  conditions: MotionConditions
  onActive: (index: number) => void
}

/**
 * Scroll narration of the career timeline. Must run inside `useGsap` so every
 * trigger is scoped and reverted with the component.
 *
 * Budget: 1 scrubbed progress timeline + per mission 1 activation trigger,
 * 1 entrance timeline and (desktop) 1 parallax tween.
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

  // Axis, range bar and warm light all follow the reading progress.
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
    .fromTo('.timeline__warmth', { autoAlpha: 0 }, { autoAlpha: 1 }, 0)

  items.forEach((item) => {
    const q = gsap.utils.selector(item)

    gsap
      .timeline({ scrollTrigger: { trigger: item, start: 'top 78%', once: true } })
      .fromTo(q('.t-item__tick'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: EASE.inOut }, 0)
      .add(fadeUp(q('.t-item__period')), 0.05)
      .add(maskReveal(q('.t-item__company-inner'), { duration: 1.1 }), 0.1)
      .add(fadeUp(q('.t-item__meta')), 0.25)
      .add(fadeUp(q('.t-item__desc > li'), { stagger: 0.07 }), 0.3)
      .add(fadeUp(q('.t-item__impact')), 0.45)
      .add(staggerIn(q('.tag')), 0.5)

    if (conditions.desktop) {
      gsap.fromTo(
        q('.t-item__ghost'),
        { yPercent: 25 },
        {
          yPercent: -25,
          ease: 'none',
          scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }
  })
}
