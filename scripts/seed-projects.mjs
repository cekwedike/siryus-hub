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
// 9. Run: npm run seed:projects
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

const projects = [
  {
    _type: 'project',
    title: 'The Indiba Project Series',
    slug: { current: 'indiba-project-series' },
    category: 'Artist Development',
    projectType: 'Ongoing Initiative',
    year: 'Ongoing',
    status: 'Active',
    featured: true,
    artist: 'SIRYUS A.M',
    registrationOpen: false,
    registrationButtonText: 'Apply Now',
    registrationClosedText:
      'The Indiba Project Series is not currently open for applications. When the next edition opens, the application link will appear right here. Follow us on Instagram to be the first to know.',
    excerpt:
      'A music incubator for independent African artists. Collaborative recording, mentorship and structured releases that have already launched real careers across Africa.',
    description:
      'The Indiba Project Series is where independent African artists come to build. Not just music. Careers. Each edition brings together a curated group of rising artists for collaborative recording sessions, direct mentorship, and a structured release campaign with real strategy behind it. Artists who have come through the series include Hidaya Morgan, Max Prodigy, Couronne, Aine Arsene and Chriss D. The series has drawn international recognition including acknowledgment from hip-hop legend Dana Dane.',
    tags: ['Artist Development', 'Mentorship', 'Collaboration', 'Pan-African', 'Music Incubator'],
  },
  {
    _type: 'project',
    title: 'Acoustic Rwanda',
    slug: { current: 'acoustic-rwanda' },
    category: 'Live Performance',
    projectType: 'Seasonal Event',
    year: 'Coming Soon',
    status: 'Coming Soon',
    featured: true,
    artist: 'SIRYUS A.M',
    registrationOpen: false,
    registrationButtonText: 'Register Interest',
    registrationClosedText:
      'Acoustic Rwanda is not yet open for registrations. Drop your details via our contact page and we will reach out when tickets and artist applications open.',
    excerpt:
      'A live music series spotlighting raw unplugged performances from independent artists in intimate venues across Rwanda. Real music, no filters.',
    description:
      'Acoustic Rwanda is a live music experience built around one idea. Strip everything back and let the music speak. No heavy production. No industry politics. Just independent artists, their instruments, and an audience that actually listens. The series will bring intimate unplugged performances to carefully selected venues across Kigali and Rwanda, creating a space where emerging artists can connect with real audiences in the most direct way possible. For artists, it is a platform to perform without the noise. For audiences, it is a chance to discover the next wave of African music before it gets big. Acoustic Rwanda is coming. If you are an artist who wants to perform or a venue interested in hosting, reach out now.',
    tags: ['Live Music', 'Acoustic', 'Rwanda', 'Independent Artists', 'Events', 'Kigali'],
  },
  {
    _type: 'project',
    title: 'The Abditory Sessions',
    slug: { current: 'the-abditory-sessions' },
    category: 'Content Series',
    projectType: 'Series',
    year: 'Coming Soon',
    status: 'Coming Soon',
    featured: false,
    artist: 'SIRYUS A.M',
    registrationOpen: false,
    registrationButtonText: 'Nominate an Artist',
    registrationClosedText:
      'The Abditory Sessions is in production. If you know an independent artist whose story deserves to be told, send us their name via the contact page.',
    excerpt:
      'Deep-dive conversations with independent artists about the journey, the craft, and what it actually takes to build a career in music. Unfiltered and unscripted.',
    description:
      'The Abditory Sessions is a long-form content series dedicated to the stories that do not make it into the press release. Every independent artist has a version of events that is more honest than their bio. The real decisions, the hard periods, the moments that changed everything. That is what The Abditory Sessions is built to capture. Each episode features a single artist in an extended conversation, going deep into their creative process, their career journey, and their perspective on what it means to make music independently in Africa today. No hot takes. No highlight reels. Just the real story. The series is currently in production. If you want to be notified when the first episode drops, follow Siryus on social media or reach out directly.',
    tags: ['Interviews', 'Storytelling', 'Independent Artists', 'Content Series', 'African Music', 'Behind the Scenes'],
  },
]

async function main() {
  for (const doc of projects) {
    const slug = doc.slug.current
    const existing = await client.fetch(`*[_type == "project" && slug.current == $slug][0]._id`, {
      slug,
    })
    if (existing) {
      console.log(`Skip "${doc.title}": slug "${slug}" already exists`)
      continue
    }
    await client.create(doc)
    console.log(`Created project "${doc.title}" (${slug})`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
