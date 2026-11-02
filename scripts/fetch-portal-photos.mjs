// Downloads the Unsplash photos used on the parent portal and stores optimized WebP copies.
// Sources and license are recorded in docs/IMAGE_CREDITS.md. Run with: node scripts/fetch-portal-photos.mjs
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'apps', 'siryus', 'public', 'images', 'portal')
const photos = {
  'signal-workshop': 'photo-1553484771-371a605b060b',
  'signal-planning': 'photo-1529119513315-c7c361862fc7',
  'signal-wall': 'photo-1545235617-9465d2a55698',
  'pavo-code': 'photo-1555066931-4365d14bab8c',
  'pavo-laptop': 'photo-1516321318423-f06f85e504b3',
  'pavo-devices': 'photo-1551650975-87deedd944c3',
}

await mkdir(dir, { recursive: true })
for (const [name, id] of Object.entries(photos)) {
  const res = await fetch(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`)
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`)
  await sharp(Buffer.from(await res.arrayBuffer())).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 78 }).toFile(join(dir, `${name}.webp`))
  console.log(`saved ${name}.webp`)
}
