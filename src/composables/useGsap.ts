import { onBeforeUnmount, onMounted, type ShallowRef } from 'vue'
import { MEDIA, type MotionConditions } from '@/config/motion'
import { gsap } from '@/animations/gsap'

interface GsapSetupContext {
  root: HTMLElement
  conditions: MotionConditions
}

type GsapSetup = (context: GsapSetupContext) => (() => void) | undefined

/**
 * The only entry point components use to create GSAP animations.
 *
 * - Every tween / ScrollTrigger created inside `setup` is scoped to `root`
 *   (selector text like '.foo' resolves inside it).
 * - `setup` re-runs whenever a motion media query flips (resize, OS reduced
 *   motion toggle); the previous run is reverted first.
 * - Everything is reverted on unmount.
 */
export function useGsap(
  scope: Readonly<ShallowRef<HTMLElement | null>>,
  setup: GsapSetup,
  { defer = false }: UseGsapOptions = {},
): void {
  let mm: gsap.MatchMedia | undefined
  let cancelIdle: (() => void) | undefined

  function init(): void {
    const root = scope.value
    if (!root) return

    mm = gsap.matchMedia(root)
    mm.add({ ...MEDIA, any: 'all' }, (context) => {
      return setup({ root, conditions: context.conditions as MotionConditions })
    })
  }

  onMounted(() => {
    if (defer) cancelIdle = whenIdle(init)
    else init()
  })

  onBeforeUnmount(() => {
    cancelIdle?.()
    mm?.revert()
    mm = undefined
  })
}

interface UseGsapOptions {
  /**
   * Below-the-fold sections: build their triggers once the main thread is
   * idle, so the first paint and the hero intro are not competing with them.
   */
  defer?: boolean
}

const IDLE_TIMEOUT = 400

function whenIdle(callback: () => void): () => void {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout: IDLE_TIMEOUT })
    return () => {
      window.cancelIdleCallback(id)
    }
  }
  const id = setTimeout(callback, IDLE_TIMEOUT / 2)
  return () => {
    clearTimeout(id)
  }
}
