// HOW TO RUN THIS SCRIPT:
// 1. Go to sanity.io/manage
// 2. Click your siryus-hub project
// 3. Go to API tab
// 4. Click Add API token
// 5. Name it: seed-script
// 6. Set permissions to Editor
// 7. Copy the token
// 8. Create a .env.local entry:
//    SANITY_TOKEN=your_token_here
// 9. Run: npm run seed:team
// 10. Check your Sanity Studio to confirm

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

const projectId = 'h16wl0pr'
const dataset = 'production'
const token = process.env.SANITY_TOKEN

if (!token) {
  console.error('Missing SANITY_TOKEN. Add it to .env.local or your environment.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const members = [
  {
    _type: 'teamMember',
    name: 'Chidiebere Ekwedike',
    slug: { current: 'chidiebere-ekwedike' },
    role: 'Founder, Siryus Creative Media Ltd',
    responsibilities:
      'Copywriter, front-end developer, and talent manager. Cheedii started Siryus to bridge the gap between creative talent and the business side of the industry. Based in Kigali. Rooted in Nigeria.',
    initials: 'CE',
    order: 1,
    founder: true,
    active: true,
  },
  {
    _type: 'teamMember',
    name: 'Maryann Ugwu',
    slug: { current: 'maryann-ugwu' },
    role: 'Vice President',
    responsibilities:
      'Supports executive leadership, aligns departments with company priorities, and helps steer long-term growth, partnerships, and strategic initiatives.',
    initials: 'MU',
    order: 2,
    founder: false,
    active: true,
  },
  {
    _type: 'teamMember',
    name: 'Iwejuo Francis',
    slug: { current: 'iwejuo-francis' },
    role: 'COO',
    responsibilities:
      'Runs day-to-day operations, internal processes, and cross-team coordination so delivery stays on schedule and quality stays consistent across projects.',
    initials: 'IF',
    order: 3,
    founder: false,
    active: true,
  },
  {
    _type: 'teamMember',
    name: 'Michelle Lawal',
    slug: { current: 'michelle-lawal' },
    role: 'CFO',
    responsibilities:
      'Owns financial planning, budgeting, and reporting, and keeps the company financially sound and compliant as we grow.',
    initials: 'ML',
    order: 4,
    founder: false,
    active: true,
  },
  {
    _type: 'teamMember',
    name: 'Onochie Igboerika',
    slug: { current: 'onochie-igboerika' },
    role: 'Creative Director',
    responsibilities:
      'Sets creative direction and quality bars across campaigns and productions, and guides visual and narrative work so output matches the Siryus standard.',
    initials: 'OI',
    order: 5,
    founder: false,
    active: true,
  },
  {
    _type: 'teamMember',
    name: 'Opeyemi Lawal',
    slug: { current: 'opeyemi-lawal' },
    role: 'Media and Marketing Lead',
    responsibilities:
      'Leads media strategy, campaigns, and channel execution for brands and artists, and connects creative ideas to reach, engagement, and growth.',
    initials: 'OL',
    order: 6,
    founder: false,
    active: true,
  },
  {
    _type: 'teamMember',
    name: 'Ailemen Esther',
    slug: { current: 'ailemen-esther' },
    role: 'Legal Lead',
    responsibilities:
      'Handles contracts, compliance, legal risk, and protects the company and artists in deals, rights, and partnerships.',
    initials: 'AE',
    order: 7,
    founder: false,
    active: true,
  },
  {
    _type: 'teamMember',
    name: 'Beza Peace Rachel',
    slug: { current: 'beza-peace-rachel' },
    role: 'Collaborations and Partnerships',
    responsibilities:
      'Builds and manages partnerships, collaborations, and sponsor relationships that fit the brand and open new opportunities for artists and the business.',
    initials: 'BR',
    order: 8,
    founder: false,
    active: true,
  },
]

async function main() {
  for (const doc of members) {
    const slug = doc.slug.current
    const existing = await client.fetch(
      `*[_type == "teamMember" && slug.current == $slug][0]._id`,
      { slug }
    )
    if (existing) {
      console.log(`Skip "${doc.name}": slug "${slug}" already exists`)
      continue
    }
    await client.create(doc)
    console.log(`Created team member "${doc.name}" (${slug})`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
