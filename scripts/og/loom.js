// Standalone port of src/components/sections/HeroLoom.vue for the static
// renders: weaves `lines` into `canvas` as a satin figure on a twill ground.
async function weave(canvas, { lines, cell, colors, weight = 640, margin = 4 }) {
  const family = '"Funnel Display"'
  await document.fonts.load(`${weight} 100px ${family}`)

  const cols = Math.floor(canvas.clientWidth / cell)
  const probe = document.createElement('canvas').getContext('2d')
  probe.font = `${weight} 100px ${family}`
  const widest = Math.max(...lines.map((line) => probe.measureText(line).width))
  const fontSize = Math.floor((100 * (cols - margin * 2)) / widest)
  probe.font = `${weight} ${fontSize}px ${family}`
  const metrics = lines.map((line) => probe.measureText(line))
  const ascent = Math.ceil(Math.max(...metrics.map((m) => m.actualBoundingBoxAscent)))
  const descent = Math.ceil(Math.max(...metrics.map((m) => m.actualBoundingBoxDescent)))
  const gap = Math.round(fontSize * 0.08)
  const rows = margin * 2 + lines.length * (ascent + descent) + (lines.length - 1) * gap

  const bitmap = document.createElement('canvas')
  bitmap.width = cols
  bitmap.height = rows
  const draw = bitmap.getContext('2d')
  draw.font = probe.font
  lines.forEach((line, i) => draw.fillText(line, margin, margin + ascent + i * (ascent + descent + gap)))
  const alpha = draw.getImageData(0, 0, cols, rows).data

  const dpr = window.devicePixelRatio || 1
  canvas.style.height = `${rows * cell}px`
  canvas.width = cols * cell * dpr
  canvas.height = rows * cell * dpr
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  const warpWidth = cell * 0.55
  const thread = cell * 0.82
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cell
      const y = row * cell
      const figure = alpha[(row * cols + col) * 4 + 3] > 110
      const weft = figure ? (col * 3 + row) % 8 !== 0 : (col + row) % 4 === 0
      if (weft) {
        ctx.fillStyle = figure ? colors.figure : colors.ground
        ctx.fillRect(x, y + (cell - thread) / 2, cell, thread)
      } else {
        ctx.fillStyle = colors.warp
        ctx.fillRect(x + (cell - warpWidth) / 2, y, warpWidth, cell)
      }
    }
  }
}
