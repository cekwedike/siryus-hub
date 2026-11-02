// Builds every favicon and the parent portal brand marks from the original logo files in /logos.
// Run with: pnpm icons
import { mkdir, writeFile, copyFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const logos = join(root, 'logos')
const app = (name, ...parts) => join(root, 'apps', name, 'public', ...parts)
const clear = { r: 0, g: 0, b: 0, alpha: 0 }

async function out(file, data) {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, data)
}

// ICO container holding PNG frames (supported by every current browser).
function ico(frames) {
  const header = Buffer.alloc(6 + frames.length * 16)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(frames.length, 4)
  let offset = header.length
  frames.forEach(({ size, png }, i) => {
    const at = 6 + i * 16
    header.writeUInt8(size >= 256 ? 0 : size, at)
    header.writeUInt8(size >= 256 ? 0 : size, at + 1)
    header.writeUInt16LE(1, at + 4)
    header.writeUInt16LE(32, at + 6)
    header.writeUInt32LE(png.length, at + 8)
    header.writeUInt32LE(offset, at + 12)
    offset += png.length
  })
  return Buffer.concat([header, ...frames.map((f) => f.png)])
}

// Writes the standard icon set for one site from a square master image.
async function iconSet(site, master, { prefix = '', svg } = {}) {
  const png = (size) => sharp(master).resize(size, size, { fit: 'contain', background: clear }).png().toBuffer()
  const frames = await Promise.all([16, 32, 48].map(async (size) => ({ size, png: await png(size) })))
  await out(app(site, 'favicon.ico'), ico(frames))
  await out(app(site, `${prefix}favicon-32.png`), frames[1].png)
  await out(app(site, 'apple-touch-icon.png'), await png(180))
  await out(app(site, 'icon-192.png'), await png(192))
  await out(app(site, 'icon-512.png'), await png(512))
  if (svg) await out(app(site, 'favicon.svg'), svg)
}

// SIRYUS parent: the double star from the Siryus Creative Media Ltd vector master
// (logos/SIRYUS CREATIVE MEDIA/LOGO SVGS). Strokes are thickened so the mark holds at 16px.
const star = {
  outer: 'M843.2,501.06c-23.91,29.7-37.92,67.43-37.57,107.87l-6.45-3.89l-79.27,68.77l23.71-102.23l-89.9-54.14l104.56-9.04l23.71-102.23l40.91,96.64L843.2,501.06z',
  inner: 'M814.64,519.79c-12.4,15.41-19.68,34.99-19.5,55.98l-3.35-2.02l-41.13,35.69l12.3-53.05l-46.65-28.09l54.26-4.69l12.3-53.05l21.23,50.15L814.64,519.79z',
}
const siryusSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="578 370 340 340">
  <rect x="578" y="370" width="340" height="340" rx="64" fill="#ffffff"/>
  <g fill="none" stroke="#000000" stroke-linejoin="miter" stroke-miterlimit="10">
    <path d="${star.outer}" stroke-width="20"/>
    <path d="${star.inner}" stroke-width="12"/>
  </g>
</svg>
`
await iconSet('siryus', await sharp(Buffer.from(siryusSvg), { density: 600 }).png().toBuffer(), { svg: siryusSvg })
await out(app('siryus', 'brand', 'siryus', 'star.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="640 396 216 288" fill="none" stroke="currentColor" stroke-miterlimit="10"><path d="${star.outer}" stroke-width="10"/><path d="${star.inner}" stroke-width="4"/></svg>\n`)

// Parent lockup for the portal header, trimmed from the white master and inverted for light pages.
const lockup = await sharp(join(logos, 'SIRYUS CREATIVE MEDIA', 'LOGO PNGS', 'SIRYUS-WHITE-PNG.png')).trim().resize({ width: 1200 }).png().toBuffer()
await out(app('siryus', 'brand', 'siryus', 'lockup-white.png'), lockup)
await out(app('siryus', 'brand', 'siryus', 'lockup-black.png'), await sharp(lockup).negate({ alpha: false }).png().toBuffer())

// SIRYUS A.M: the white app-tile mark, cropped from the approved logo export.
const amTile = await sharp(join(logos, 'SIRYUS ARTIST MANAGEMENT', 'LOGO PNGS', 'SIRYUS-A.M-PNG-WHITE.png'))
  .extract({ left: 3230, top: 1390, width: 1220, height: 1130 }).png().toBuffer()
const amMark = await sharp(amTile).trim().png().toBuffer()
const amSquare = await sharp(amMark).resize(1024, 1024, { fit: 'contain', background: clear }).png().toBuffer()
await iconSet('am', amSquare)
await out(app('siryus', 'brand', 'am', 'tile.png'), await sharp(amMark).resize({ width: 360 }).png().toBuffer())

// SIGNAL.: approved raster favicon exports from logos/SIGNAL.
const signalIcon = join(logos, 'SIGNAL', 'signal-favicon-512.png')
await iconSet('signal', signalIcon)
await copyFile(join(logos, 'SIGNAL', 'signal-symbol-transparent.png'), app('siryus', 'brand', 'signal', 'symbol.png'))

// ARC. Creatives: the dark-background logo (white "arc.") on ARC's own near-black.
const arcSvg = app('arc', 'arc', 'arc-svg.svg')
const arcLogo = await sharp(arcSvg, { density: 1200 }).resize(760, 760, { fit: 'contain', background: clear }).png().toBuffer()
const arcSquare = await sharp({ create: { width: 1024, height: 1024, channels: 4, background: '#0a0908' } })
  .composite([{ input: arcLogo, gravity: 'center' }]).png().toBuffer()
await iconSet('arc', arcSquare)
await out(app('arc', 'favicon-arc.png'), await sharp(arcSquare).resize(512).png().toBuffer())
await copyFile(arcSvg, app('siryus', 'brand', 'arc', 'logo-on-dark.svg'))

console.log('Brand icons written for siryus, am, signal and arc. Social preview images are built by `pnpm og`.')

