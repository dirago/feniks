<template>
  <div ref="frame" aria-hidden="true" class="loom">
    <canvas ref="canvas" class="loom__canvas" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { MEDIA } from '@/config/motion'

/**
 * A name woven like a Lyon damask: the figure is a plum satin, the ground a
 * faint 1/3 twill, the warp runs vertically through everything. On load the
 * shuttle weaves it row by row; under the pointer, figure threads lift in gold.
 */
const { lines } = defineProps<{ lines: { wide: string[]; narrow: string[] } }>()

const frame = useTemplateRef<HTMLElement>('frame')
const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

const FONT_FAMILY = '"Funnel Display Variable"'
const FONT_WEIGHT = 640
const WEAVE_DURATION = 1600
const LIFT_RADIUS = 7

// What shows on top at each crossing.
const WARP = 0
const GROUND = 1
const FIGURE = 2

interface Palette {
  warp: string
  ground: string
  figure: string
  lift: string
}

let cols = 0
let rows = 0
let cell = 6
let grid: Uint8Array = new Uint8Array(0)
let palette: Palette | undefined
let ctx: CanvasRenderingContext2D | null = null

let ready = false
let progress = 1 // weaving progress, 0 → 1
let pointer = { col: 0, row: 0 }
let hovering = false
let lift = 0 // 0 → 1, eased toward `hovering`
let frameId = 0

function readPalette(): Palette {
  const style = getComputedStyle(document.documentElement)
  const read = (name: string) => style.getPropertyValue(name).trim()
  return {
    warp: read('--loom-warp'),
    ground: read('--loom-ground'),
    figure: read('--loom-figure'),
    lift: read('--loom-lift'),
  }
}

/** Rasterises the name at one pixel per cell, then assigns a weave to each cell. */
function buildGrid(width: number): void {
  cell = width >= 640 ? 4 : 3
  cols = Math.floor(width / cell)

  const text = cols >= 150 ? lines.wide : lines.narrow
  const margin = 4
  const probe = document.createElement('canvas').getContext('2d')
  if (!probe) return

  probe.font = `${FONT_WEIGHT} 100px ${FONT_FAMILY}`
  const widest = Math.max(...text.map((line) => probe.measureText(line).width))
  const fontSize = Math.floor((100 * (cols - margin * 2)) / widest)
  probe.font = `${FONT_WEIGHT} ${fontSize}px ${FONT_FAMILY}`

  const metrics = text.map((line) => probe.measureText(line))
  const ascent = Math.ceil(Math.max(...metrics.map((m) => m.actualBoundingBoxAscent)))
  const descent = Math.ceil(Math.max(...metrics.map((m) => m.actualBoundingBoxDescent)))
  const lineGap = Math.round(fontSize * 0.08)
  rows = margin * 2 + text.length * (ascent + descent) + (text.length - 1) * lineGap

  const bitmap = document.createElement('canvas')
  bitmap.width = cols
  bitmap.height = rows
  const draw = bitmap.getContext('2d', { willReadFrequently: true })
  if (!draw) return

  draw.font = probe.font
  draw.fillStyle = '#000'
  text.forEach((line, index) => {
    draw.fillText(line, margin, margin + ascent + index * (ascent + descent + lineGap))
  })
  const alpha = draw.getImageData(0, 0, cols, rows).data

  grid = new Uint8Array(cols * rows)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const inFigure = (alpha[(row * cols + col) * 4 + 3] ?? 0) > 110
      // Satin figure: long weft floats, tied down by the warp every 8th
      // step. Twill ground: weft shows on one diagonal in four.
      grid[row * cols + col] = inFigure
        ? (col * 3 + row) % 8 === 0
          ? WARP
          : FIGURE
        : (col + row) % 4 === 0
          ? GROUND
          : WARP
    }
  }
}

function resize(): void {
  const el = canvas.value
  const box = frame.value
  if (!el || !box) return

  buildGrid(box.clientWidth)
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  el.style.width = `${cols * cell}px`
  el.style.height = `${rows * cell}px`
  el.width = Math.round(cols * cell * dpr)
  el.height = Math.round(rows * cell * dpr)
  ctx = el.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  render()
}

function render(): void {
  if (!ctx || !palette) return
  const c = ctx
  // Weft is beaten tight (thick), warp stays fine so the figure reads.
  const warpWidth = cell * 0.55
  const warpInset = (cell - warpWidth) / 2
  const thread = cell * 0.82
  const inset = (cell - thread) / 2

  c.clearRect(0, 0, cols * cell, rows * cell)

  const warp = new Path2D()
  const ground = new Path2D()
  const figure = new Path2D()
  // Lifted threads are bucketed by intensity to keep a handful of fills.
  const lifted = [new Path2D(), new Path2D(), new Path2D()]

  // Rows woven so far; the fractional part is the shuttle's run across.
  const woven = progress * rows
  const shuttleRow = progress >= 1 ? rows : Math.floor(woven)
  const shuttleCol = Math.floor((woven - Math.floor(woven)) * cols)

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cell
      const y = row * cell
      const notYetWoven = row > shuttleRow || (row === shuttleRow && col > shuttleCol)
      const type = notYetWoven ? WARP : grid[row * cols + col]

      if (type === WARP) {
        warp.rect(x + warpInset, y, warpWidth, cell)
      } else if (type === GROUND) {
        ground.rect(x, y + inset, cell, thread)
      } else {
        figure.rect(x, y + inset, cell, thread)
        if (lift > 0) {
          const distance = Math.hypot(col - pointer.col, (row - pointer.row) * 1.4)
          const strength = (1 - distance / LIFT_RADIUS) * lift
          if (strength > 0) {
            lifted[Math.min(2, Math.floor(strength * 3))]?.rect(x, y + inset, cell, thread)
          }
        }
      }
    }
  }

  c.fillStyle = palette.warp
  c.fill(warp)
  c.fillStyle = palette.ground
  c.fill(ground)
  c.fillStyle = palette.figure
  c.fill(figure)
  c.fillStyle = palette.lift
  lifted.forEach((path, index) => {
    c.globalAlpha = (index + 1) / 3
    c.fill(path)
  })
  c.globalAlpha = 1

  // The shuttle: one gold cell running ahead of the weft.
  if (shuttleRow < rows) {
    c.fillStyle = palette.lift
    c.fillRect(shuttleCol * cell, shuttleRow * cell + inset, cell * 2, thread)
  }
}

/* ---- Animation loop: runs only while weaving or while the lift fades ------- */
let weaveStart = 0

function tick(now: number): void {
  frameId = 0
  let busy = false

  if (progress < 1) {
    const t = Math.min(1, (now - weaveStart) / WEAVE_DURATION)
    progress = 1 - (1 - t) ** 2
    busy = t < 1
  }

  const target = hovering ? 1 : 0
  if (lift !== target) {
    lift += (target - lift) * 0.18
    if (Math.abs(target - lift) < 0.02) lift = target
    busy = true
  }

  render()
  if (busy) schedule()
}

function schedule(): void {
  if (!frameId) frameId = requestAnimationFrame(tick)
}

function onPointerMove(event: PointerEvent): void {
  const rect = canvas.value?.getBoundingClientRect()
  if (!rect) return
  pointer = { col: (event.clientX - rect.left) / cell, row: (event.clientY - rect.top) / cell }
  hovering = true
  schedule()
}

function onPointerLeave(): void {
  hovering = false
  schedule()
}

/* ---- Lifecycle ------------------------------------------------------------- */
useResizeObserver(frame, () => {
  if (ready) resize()
})

const themeObserver = new MutationObserver(() => {
  palette = readPalette()
  render()
})

onMounted(async () => {
  palette = readPalette()
  themeObserver.observe(document.documentElement, { attributeFilter: ['data-theme'] })

  await document.fonts.load(`${FONT_WEIGHT} 100px ${FONT_FAMILY}`)
  ready = true
  if (matchMedia(MEDIA.motion).matches) {
    progress = 0
    weaveStart = performance.now()
    schedule()
  }
  resize()

  if (matchMedia(MEDIA.finePointer).matches) {
    frame.value?.addEventListener('pointermove', onPointerMove, { passive: true })
    frame.value?.addEventListener('pointerleave', onPointerLeave)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId)
  themeObserver.disconnect()
  frame.value?.removeEventListener('pointermove', onPointerMove)
  frame.value?.removeEventListener('pointerleave', onPointerLeave)
})
</script>

<style scoped>
.loom {
  inline-size: 100%;
}

.loom__canvas {
  display: block;
}
</style>
