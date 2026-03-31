// Patch existing Indiba project in Sanity by slug.
// Requires SANITY_TOKEN in .env.local (Editor).
// Run: npm run update:indiba

import { createClient } from '@sanity/client'
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

const description =
  'A music incubator for independent African artists. Collaborative recording, mentorship and structured releases that have already launched real careers across Africa. Home of the Indiba Volume album series.'

const excerpt =
  'A music incubator for independent African artists. Collaborative recording, mentorship and structured releases. Home of the Indiba Volume album series.'

async function main() {
  const doc = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{ _id }`,
    { slug: 'indiba-project-series' }
  )
  if (!doc?._id) {
    console.error('No project found with slug "indiba-project-series".')
    process.exit(1)
  }
  await client.patch(doc._id).set({ description, excerpt }).commit()
  console.log('Updated Indiba project description and excerpt.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
