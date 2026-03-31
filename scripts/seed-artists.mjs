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
// 9. Run: npm run seed:artists
// 10. Check your Sanity Studio to confirm

import { createClient } from '@sanity/client'
import { randomUUID } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Every object in a Sanity array must have a unique `_key` (Studio + real-time). */
function addKeysToReleases(releases) {
  return releases.map((item) => ({ _key: randomUUID(), ...item }))
}

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

const artists = [
  {
    _type: 'artist',
    name: 'Max Prodigy',
    slug: { current: 'max-prodigy' },
    genre: ['Hip Hop', 'Rap', 'Afropop'],
    location: 'Nigeria',
    oneLiner:
      'Where street storytelling meets melody. Rap that actually says something.',
    bioParagraph1:
      'Max Prodigy is a Nigerian rapper, singer and songwriter whose sound refuses to stay in one lane. He blends rap, Afropop and reggae into something that feels personal every time. His music tells stories about real life, real growth and real emotions. Not just punchlines. Not just vibes. Music that actually means something.',
    bioParagraph2:
      'Raised on the music of Dave, J. Cole and M.I Abaga, Max brings a lyrical depth to his work that sets him apart in the Nigerian independent scene. His song Dream Killers, written during the EndSARS protests, showed what he is capable of when the stakes are real. Better Man, his 2024 release, is proof that the craft keeps growing. He is managed by SIRYUS A.M and distributed globally via The Orchard.',
    managementLabel: 'SIRYUS A.M Artist',
    releases: [
      {
        title: 'Nobody feat. Juuru',
        year: '2025',
        spotifyUrl: 'https://open.spotify.com/artist/5DEI5M3s5NAhk2AloQlNKb',
      },
      {
        title: 'Better Man',
        year: '2024',
        spotifyUrl: 'https://open.spotify.com/artist/5DEI5M3s5NAhk2AloQlNKb',
      },
      {
        title: 'Dream Killers',
        spotifyUrl: 'https://open.spotify.com/artist/5DEI5M3s5NAhk2AloQlNKb',
      },
      {
        title: 'She Knows',
        spotifyUrl: 'https://open.spotify.com/artist/5DEI5M3s5NAhk2AloQlNKb',
      },
      {
        title: 'Tarama with SIRYUS A.M',
        year: '2024',
        spotifyUrl: 'https://open.spotify.com/artist/5DEI5M3s5NAhk2AloQlNKb',
      },
    ],
    platforms: {
      spotify: 'https://open.spotify.com/artist/5DEI5M3s5NAhk2AloQlNKb',
      youtube: 'https://www.youtube.com/channel/UCOdo-xHtsagIRKBiexPysrw',
      appleMusic: 'https://music.apple.com/us/artist/max-prodigy/1540379359',
    },
    featured: true,
    active: true,
    order: 1,
  },
  {
    _type: 'artist',
    name: 'Hidaya Morgan',
    slug: { current: 'hidaya-morgan' },
    genre: ['Jazz', 'R&B', 'Dance'],
    location: 'Rwanda',
    oneLiner:
      'Award-winning voice. Fearless creative. The future of Rwandan music.',
    bioParagraph1:
      'Hidaya Morgan is not easy to put in a box and she does not want to be. The Rwandan singer, songwriter, journalist and content creator blends jazz, R&B and dance into a sound that feels like it belongs entirely to her. She won the third edition of Art Rwanda Ubuhanzi, one of Rwanda\'s most respected national talent competitions, and has been building on that foundation ever since.',
    bioParagraph2:
      'Her breakout song I Hate You showed an artist who could turn raw emotion into something you play on repeat. Since then she has released Lodestar, Don\'t Let Me Go with Max Prodigy, Nyongorera, and Biransetsa. Beyond music, Hidaya works as a journalist and content creator, using every medium to tell stories that matter. She is managed by SIRYUS A.M.',
    managementLabel: 'SIRYUS A.M Artist',
    releases: [
      {
        title: 'Biransetsa / You Got Me',
        year: '2025',
        spotifyUrl: 'https://open.spotify.com/artist/67Vu6E8FcRU2I531Atn6Zr',
      },
      {
        title: 'Nyongorera',
        year: '2025',
        spotifyUrl: 'https://open.spotify.com/artist/67Vu6E8FcRU2I531Atn6Zr',
      },
      {
        title: "Don't Let Me Go feat. Max Prodigy",
        year: '2025',
        spotifyUrl: 'https://open.spotify.com/artist/67Vu6E8FcRU2I531Atn6Zr',
      },
      {
        title: 'Lodestar',
        year: '2024',
        spotifyUrl: 'https://open.spotify.com/artist/67Vu6E8FcRU2I531Atn6Zr',
      },
      {
        title: 'I Hate You',
        year: '2023',
        spotifyUrl: 'https://open.spotify.com/artist/67Vu6E8FcRU2I531Atn6Zr',
      },
    ],
    platforms: {
      spotify: 'https://open.spotify.com/artist/67Vu6E8FcRU2I531Atn6Zr',
      youtube: 'https://www.youtube.com/channel/UCowQyD4KyR5jrpj_wTUvKMA',
      appleMusic: 'https://music.apple.com/ke/artist/hidaya-morgan/1714798790',
      instagram: 'https://www.instagram.com/hidayamorgan',
    },
    featured: true,
    active: true,
    order: 2,
  },
  {
    _type: 'artist',
    name: 'Jlinez',
    slug: { current: 'jlinez' },
    genre: ['Afrogospel', 'Afrobeats'],
    location: 'Nigeria',
    oneLiner:
      'Faith, fire, and Afrobeats. Gospel that reaches across languages and borders.',
    bioParagraph1:
      'Jlinez, born Jesse Joseph Wakili, is a Nigerian gospel artist, producer and songwriter doing something genuinely different in the afrogospel space. He moves between Hausa, Pidgin English and English in the same song, reaching listeners across West Africa and the diaspora without asking anyone to translate the feeling. His music carries messages of faith, perseverance and spiritual warfare, wrapped in Afrobeat rhythms that hit before the words even register.',
    bioParagraph2:
      'His releases Bagajiya and Siyona show an artist who understands that worship does not have to be quiet to be sincere. As both an artist and a producer, Jlinez builds every project from the ground up. His goal is simple: inspire believers to stand firm in their faith and proclaim the gospel with boldness. He is distributed globally via The Orchard and managed by SIRYUS A.M.',
    managementLabel: 'SIRYUS A.M Artist',
    releases: [
      {
        title: 'Bagajiya',
        year: '2025',
        spotifyUrl: 'https://open.spotify.com/artist/1IG4PSCy1OokQbRYILUrnN',
      },
      {
        title: 'Siyona',
        spotifyUrl: 'https://open.spotify.com/artist/1IG4PSCy1OokQbRYILUrnN',
      },
    ],
    platforms: {
      spotify: 'https://open.spotify.com/artist/1IG4PSCy1OokQbRYILUrnN',
      youtube: 'https://www.youtube.com/@jlinezz',
      appleMusic: 'https://music.apple.com/us/artist/jlinez/1540379360',
      instagram: 'https://www.instagram.com/jlinez1',
      audiomack: 'https://audiomack.com/jlinez',
    },
    featured: false,
    active: true,
    order: 3,
  },
  {
    _type: 'artist',
    name: 'Winny Ezeme',
    slug: { current: 'winny-ezeme' },
    genre: ['Gospel', 'Worship'],
    location: 'Enugu, Nigeria',
    oneLiner:
      'Gospel Icons Africa Season 1 winner. A voice built for purpose.',
    bioParagraph1:
      'Winny Ezeme is a Nigerian gospel artist, worship leader and songwriter from Udenu, Enugu State with a heart for revival, healing and intimacy with God. She won the first season of Gospel Icons Africa, a national competition that put her voice in front of the country and confirmed what people around her already knew. Her journey started in the choir at Platform of Grace Church where she spent a decade learning that music is not just performance. It is connection.',
    bioParagraph2:
      'Every song she releases is rooted in real encounters and deep surrender. Her debut single You Reign is a bold declaration of faith built on something personal, not a formula. Inspired by gospel heavyweights like Sinach, Mercy Chinwo and Nathaniel Bassey, Winny is not chasing trends. She is building something that lasts. She is managed by SIRYUS A.M.',
    managementLabel: 'SIRYUS A.M Artist',
    releases: [
      {
        title: 'You Reign',
        year: '2025',
      },
    ],
    platforms: {
      youtube: 'https://www.youtube.com/@WinnyEzeme',
    },
    featured: false,
    active: true,
    order: 4,
  },
]

async function main() {
  for (const doc of artists) {
    const slug = doc.slug.current
    const existing = await client.fetch(
      `*[_type == "artist" && slug.current == $slug][0]._id`,
      { slug }
    )
    if (existing) {
      console.log(`Skip "${doc.name}": slug "${slug}" already exists`)
      continue
    }
    const payload = {
      ...doc,
      releases: doc.releases ? addKeysToReleases(doc.releases) : undefined,
    }
    await client.create(payload)
    console.log(`Created artist "${doc.name}" (${slug})`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
