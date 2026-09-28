import { nextTick, readonly, ref, type Ref } from 'vue'
import { THEME_STORAGE_KEY, type Theme } from '@/config/theme'

const DARK_QUERY = '(prefers-color-scheme: dark)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const THEME_COLORS: Record<Theme, string> = { light: '#f1ebe1', dark: '#161412' }

const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark'

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(stored) ? stored : null
  } catch {
    return null
  }
}

function storeTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Storage unavailable (private mode, blocked cookies): the choice lasts for the session.
  }
}

/** Stored choice first, then the OS preference. Mirrors the inline script in index.html. */
function resolveInitialTheme(): Theme {
  return readStoredTheme() ?? (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light')
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
}

interface Origin {
  x: number
  y: number
}

let theme: Ref<Theme> | undefined

function createThemeState(): Ref<Theme> {
  const state = ref<Theme>(resolveInitialTheme())
  applyTheme(state.value)

  // Follow the OS while the visitor has not expressed a preference.
  window.matchMedia(DARK_QUERY).addEventListener('change', (event) => {
    if (readStoredTheme()) return
    state.value = event.matches ? 'dark' : 'light'
    applyTheme(state.value)
  })

  return state
}

export function useTheme() {
  theme ??= createThemeState()
  const state = theme

  function commit(next: Theme): void {
    state.value = next
    applyTheme(next)
  }

  /** Switch theme; `origin` (viewport px) is where the circular reveal starts. */
  function setTheme(next: Theme, origin?: Origin): void {
    if (next === state.value) return
    storeTheme(next)

    const root = document.documentElement
    const reduceMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches

    if (!('startViewTransition' in document) || reduceMotion) {
      root.classList.add('theme-switching')
      commit(next)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          root.classList.remove('theme-switching')
        })
      })
      return
    }

    const transition = document.startViewTransition(async () => {
      commit(next)
      await nextTick()
    })

    const x = origin?.x ?? window.innerWidth
    const y = origin?.y ?? 0
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 750,
            easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      .catch(() => {
        // Transition skipped (e.g. tab hidden): the theme is already applied.
      })
  }

  function toggleTheme(origin?: Origin): void {
    setTheme(state.value === 'dark' ? 'light' : 'dark', origin)
  }

  return { theme: readonly(state), setTheme, toggleTheme }
}
