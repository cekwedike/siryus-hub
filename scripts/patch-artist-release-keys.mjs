// One-off: add missing `_key` on each release object for existing artist documents.
// Uses the same SANITY_TOKEN and .env.local loading as seed-artists.mjs.
// Run: npm run patch:artist-keys

import { createClient } from '@sanity/client'
import { randomUUID } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = join(__dirname, '..', '.env.local')
if (existsSync(envPath)) {
  const text = readFileSync(envPath, 'utf8')
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq <= 0) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('Missing SANITY_TOKEN. Add it to .env.local or your environment.')
  process.exit(1)
}

const client = createClient({
  projectId: 'h16wl0pr',
  dataset: 'production',
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function main() {
  const rows = await client.fetch(
    `*[_type == "artist" && defined(releases)]{ _id, name, releases }`
  )
  let patched = 0
  for (const row of rows) {
    if (!Array.isArray(row.releases) || row.releases.length === 0) continue
    const needsKey = row.releases.some((r) => r && typeof r === 'object' && !r._key)
    if (!needsKey) continue
    const releases = row.releases.map((r) =>
      r && typeof r === 'object' && !r._key ? { _key: randomUUID(), ...r } : r
    )
    await client.patch(row._id).set({ releases }).commit()
    console.log(`Patched releases keys: ${row.name ?? row._id}`)
    patched += 1
  }
  if (patched === 0) {
    console.log('No artist documents needed release keys.')
  } else {
    console.log(`Done. Patched ${patched} document(s).`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
