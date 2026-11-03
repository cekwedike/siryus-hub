// One-off clean-up of the SIRYUS A.M dataset (h16wl0pr), agreed with the owner on 2026-11-03.
// A full backup was exported first to Desktop/SIRYUS/sanity-backups-2026-11-03/am-production.tar.gz.
//
// Run from studio/:  npx sanity exec scripts/cleanup-2026-11.mjs --with-user-token
// Run studio-arc/scripts/move-arc-posts.mjs first. The five ARC. articles are only removed from this dataset
// once they exist in ARC.'s own dataset, so nothing disappears from the ARC. blog.
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })
const arcSlugs = [
  'monetizing-creativity-earn-living-passion',
  'mastering-time-management-for-creatives',
  'building-an-online-portfolio-that-pops',
  'building-your-brand-as-a-creative',
  'collaboration-in-creative-industries',
]
const amSlugs = ['what-independent-artists-get-wrong-about-marketing', 'copyright-vs-intellectual-property', 'how-mental-health-impacts-your-art']
const span = (text) => [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }]
const tx = client.transaction()

// 1. Old content that no site uses: Acoustic Rwanda, the Studio Content entry and the old Team Member entries.
const old = await client.fetch('*[(_type == "project" && slug.current == "acoustic-rwanda") || _type in ["studioContent", "teamMember"]]._id')
old.forEach((id) => tx.delete(id))
console.log('removing old documents:', old.length)

// 2. The ARC. articles, only if ARC. already has them.
const arcCheck = new URL('https://qi12mdx6.api.sanity.io/v2024-01-01/data/query/production')
arcCheck.searchParams.set('query', 'count(*[_type == "blogPost" && slug.current in $slugs])')
arcCheck.searchParams.set('$slugs', JSON.stringify(arcSlugs))
const inArc = (await (await fetch(arcCheck)).json()).result
if (inArc === arcSlugs.length) {
  const ids = await client.fetch('*[_type == "blogPost" && slug.current in $slugs]._id', { slugs: arcSlugs })
  ids.forEach((id) => tx.delete(id))
  console.log('removing ARC. articles now in the ARC. dataset:', ids.length)
} else {
  console.log(`keeping the ARC. articles: only ${inArc} of ${arcSlugs.length} are in the ARC. dataset. Run move-arc-posts.mjs first.`)
}

// 3. The A.M journal posts get the new switch, so the site no longer needs a hard-coded list.
const amPosts = await client.fetch('*[_type == "blogPost" && slug.current in $slugs]._id', { slugs: amSlugs })
amPosts.forEach((id) => tx.patch(id, { set: { showOnAm: true } }))

// 4. Artists: relationships, links, the alumni note, and legacy fields the site no longer uses.
const artists = Object.fromEntries((await client.fetch('*[_type == "artist"]{_id, "slug": slug.current}')).map((a) => [a.slug, a._id]))
const legacy = ['active', 'featured', 'managementLabel', 'releases']
const patches = {
  'max-prodigy': { set: { relationship: 'current', order: 1, 'platforms.instagram': 'https://www.instagram.com/iammaxprodigy' } },
  jlinez: { set: { relationship: 'current', order: 2 } },
  'hidaya-morgan': {
    set: {
      relationship: 'alumni',
      alumniNote: 'Managed and distributed by SIRYUS A.M for a year.',
      bioParagraph2: 'Her breakout song I Hate You showed an artist who could turn raw emotion into something you play on repeat. Since then she has released Lodestar, Don\'t Let Me Go with Max Prodigy, Nyongorera, and Biransetsa. Beyond music, Hidaya works as a journalist and content creator, using every medium to tell stories that matter. SIRYUS A.M managed and distributed her music for a year.',
    },
  },
  'winny-ezeme': { set: { relationship: 'hidden' } },
}
for (const [slug, patch] of Object.entries(patches)) {
  if (!artists[slug]) continue
  tx.patch(artists[slug], { ...patch, unset: legacy })
}

// 5. Indiba: the owner's corrections, written into the Studio text itself.
const indiba = await client.fetch('*[_type == "project" && slug.current == "indiba-project-series"][0]{_id, longDescription}')
if (indiba) {
  const blocks = indiba.longDescription.flatMap((b) => {
    const text = (b.children ?? []).map((c) => c.text).join('')
    if (text.startsWith('The series has also drawn international recognition')) return []
    if (text.startsWith('The facilitators who poured into that first cohort'))
      return [{ ...b, markDefs: [], children: span('The first cohort learned from people who have done the work. Winny Ezeme, winner of The Gospel Icons Africa 2023, spoke on branding as an artist. Marlon Grigsby, an author, coach and renowned CISO who is CEO of Sentry IT Group, a CIO advisory in the USA, led a session on goal-setting as a creative. Eddie Hatitye, Executive Director of the Music In Africa Foundation, and hip-hop legend Dana Dane took the artists through the music business. Bob Ngene covered music marketing. Julz Ossom, Kofi Black and Ritadeviolinist worked with the artists on stage performance.') }]
    if (text.startsWith('The first cohort of the Indiba Project Series brought together'))
      return [{ ...b, markDefs: [], children: span(text.replace('Hidaya Morgan, Max Prodigy, Winny Ezeme, Couronne,', 'Hidaya Morgan, Max Prodigy, Couronne,')) }]
    if (text.startsWith('Vocalists, producers, instrumentalists.'))
      return [{ ...b, markDefs: [], children: span('Vocalists, producers, instrumentalists. Any independent artist ready to grow their craft and do the work that turns talent into a sustainable career.') }]
    return [b]
  })
  tx.patch(indiba._id, {
    set: {
      longDescription: blocks,
      description: 'The Indiba Project Series is where independent African artists come to build. Not just music. Careers. Each edition brings together a curated group of rising artists for collaborative recording sessions, direct mentorship, and a structured release campaign with real strategy behind it. Artists who have come through the series include Hidaya Morgan, Max Prodigy, Couronne, Aine Arsene and Chriss D.',
    },
  })
}

const result = await tx.commit()
console.log('done:', result.results.length, 'changes')
