import { onBeforeUnmount, onMounted, type ShallowRef } from 'vue'
import { useEventListener } from '@vueuse/core'
import { EASE, MEDIA } from '@/config/motion'
import { gsap } from '@/animations/gsap'

interface MagneticOptions {
  /** Share of the pointer offset applied to the element. */
  strength?: number
  /** Hard cap, in px. */
  max?: number
}

/**
 * Subtle magnetic pull toward the pointer. Fine pointers only, disabled when
 * reduced motion is requested. Uses `transform` exclusively.
 */
export function useMagnetic(
  target: Readonly<ShallowRef<HTMLElement | null>>,
  { strength = 0.2, max = 6 }: MagneticOptions = {},
): void {
  let stop: (() => void) | undefined

  onMounted(() => {
    const el = target.value
    if (!el || !window.matchMedia(MEDIA.finePointer).matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: EASE.out })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: EASE.out })
    const clamp = gsap.utils.clamp(-max, max)

    const stopMove = useEventListener(el, 'pointermove', (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      xTo(clamp((event.clientX - (rect.left + rect.width / 2)) * strength))
      yTo(clamp((event.clientY - (rect.top + rect.height / 2)) * strength))
    })
    const stopLeave = useEventListener(el, 'pointerleave', () => {
      xTo(0)
      yTo(0)
    })

    stop = () => {
      stopMove()
      stopLeave()
      gsap.killTweensOf(el)
      gsap.set(el, { clearProps: 'transform' })
    }
  })

  onBeforeUnmount(() => stop?.())
}
