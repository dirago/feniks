import { DURATION, EASE } from '@/config/motion'
import { gsap } from './gsap'

type Targets = gsap.TweenTarget

/** Lines sliding up from behind their mask (`.split-line` > `.split-line__inner`). */
export function maskReveal(targets: Targets, vars: gsap.TweenVars = {}): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    // `y: 0` also clears the CSS pre-hide transform GSAP reads as pixels.
    { yPercent: 105, y: 0 },
    { yPercent: 0, y: 0, duration: DURATION.mask, ease: EASE.out, stagger: 0.09, ...vars },
  )
}

/** Soft fade + rise, the default entrance for secondary content. */
export function fadeUp(targets: Targets, vars: gsap.TweenVars = {}): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 24 },
    { autoAlpha: 1, y: 0, duration: DURATION.reveal, ease: EASE.out, stagger: 0.06, ...vars },
  )
}

/**
 * Words lighting up one after another — meant to be scrubbed by scroll.
 * Tweens `--lit` (0 → 1); CSS maps it to a colour so the idle state keeps a
 * compliant contrast in both themes.
 */
export function revealWords(targets: Targets, vars: gsap.TweenVars = {}): gsap.core.Tween {
  return gsap.fromTo(targets, { '--lit': 0 }, { '--lit': 1, ease: 'none', stagger: 0.1, ...vars })
}

/** Tags / small items popping in with a short stagger. */
export function staggerIn(targets: Targets, vars: gsap.TweenVars = {}): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 10 },
    {
      autoAlpha: 1,
      y: 0,
      duration: DURATION.reveal * 0.8,
      ease: EASE.out,
      stagger: 0.035,
      ...vars,
    },
  )
}
