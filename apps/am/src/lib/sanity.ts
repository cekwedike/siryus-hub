// Build-time reads from the SIRYUS A.M Sanity dataset (the same content the old siryushub.com used).
// Project ID and dataset are public values; override them with PUBLIC_SANITY_* env vars if they change.
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'h16wl0pr'
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production'

// Who appears where. The Studio's "Relationship" field decides this once it is filled in; until then these
// lists apply. Max Prodigy and Jlinez are the current roster. Hidaya Morgan is an alumna: SIRYUS A.M managed
// and distributed her music for a year. Winny Ezeme is not signed and stays off the site.
export const rosterSlugs = ['max-prodigy', 'jlinez']
export const alumniSlugs = ['hidaya-morgan']
const alumniNotes: Record<string, string> = { 'hidaya-morgan': 'Managed and distributed by SIRYUS A.M for a year.' }
// Posts written for artists. The other posts in the dataset belong to ARC. Creatives.
export const journalSlugs = [
  'what-independent-artists-get-wrong-about-marketing',
  'copyright-vs-intellectual-property',
  'how-mental-health-impacts-your-art',
]
export const projectSlugs = ['indiba-project-series', 'the-abditory-sessions']

export async function query<T>(groq: string, params: Record<string, unknown> = {}): Promise<T> {
  const url = new URL(`https://${projectId}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}`)
  url.searchParams.set('query', groq)
  for (const [key, value] of Object.entries(params)) url.searchParams.set(`$${key}`, JSON.stringify(value))
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sanity query failed (${res.status}): ${groq.slice(0, 80)}`)
  return (await res.json()).result as T
}

export type ImageRef = { asset?: { _ref: string }; alt?: string } | string

// Official artist photos, self-hosted from each artist's Spotify, Apple Music and Sanity profiles (checked
// 2026-11-03). The first is the main portrait. Files: /images/artists/{slug}-{n}-640.webp, plus -1200 where
// the source was large enough. These are the only people pictured on the site.
export const artistPhotos: Record<string, { src: string; large?: string; alt: string }[]> = {
  'max-prodigy': [
    { src: '/images/artists/max-prodigy-1-640.webp', alt: 'Max Prodigy in profile, wearing dark glasses and an embroidered cap' },
    { src: '/images/artists/max-prodigy-2-640.webp', large: '/images/artists/max-prodigy-2-1200.webp', alt: 'Max Prodigy covering his face with both hands in low light' },
    { src: '/images/artists/max-prodigy-3-640.webp', alt: 'Max Prodigy looking up in a dark room' },
  ],
  jlinez: [
    { src: '/images/artists/jlinez-2-640.webp', large: '/images/artists/jlinez-2-1200.webp', alt: 'Jlinez seated in a cream shirt in the studio' },
    { src: '/images/artists/jlinez-1-640.webp', alt: 'Jlinez in a cream shirt against a dark backdrop' },
    { src: '/images/artists/jlinez-3-640.webp', alt: 'Jlinez in a navy top against a white wall' },
  ],
  'hidaya-morgan': [
    { src: '/images/artists/hidaya-morgan-1-640.webp', alt: 'Hidaya Morgan, close portrait with one arm raised' },
    { src: '/images/artists/hidaya-morgan-2-640.webp', large: '/images/artists/hidaya-morgan-2-1200.webp', alt: 'Hidaya Morgan posing with her arm above her head' },
    { src: '/images/artists/hidaya-morgan-3-640.webp', alt: 'Hidaya Morgan in a green and white jacket' },
  ],
}
export const photosOf = (slug: string) => artistPhotos[slug] ?? []

// Graded 4:5 portraits for the roster panels: cropped to the subject, more contrast, deeper blacks, light sharpening
// (generated from the sharpest available source of each photo above).
export const panelPhotos: Record<string, { src: string; srcset: string; width: number; height: number; alt: string }> = {
  'max-prodigy': { src: '/images/artists/max-prodigy-panel-800.webp', srcset: '/images/artists/max-prodigy-panel-800.webp 512w', width: 512, height: 640, alt: 'Max Prodigy in profile, wearing dark glasses and an embroidered cap' },
  jlinez: { src: '/images/artists/jlinez-panel-800.webp', srcset: '/images/artists/jlinez-panel-800.webp 800w, /images/artists/jlinez-panel-1400.webp 920w', width: 800, height: 1000, alt: 'Jlinez seated in a cream shirt in the studio' },
  'hidaya-morgan': { src: '/images/artists/hidaya-morgan-panel-800.webp', srcset: '/images/artists/hidaya-morgan-panel-800.webp 800w, /images/artists/hidaya-morgan-panel-1400.webp 1220w', width: 800, height: 1000, alt: 'Hidaya Morgan posing with her arm above her head' },
}

// Turns an image reference into a resized CDN URL. Sanity serves WebP or AVIF when the browser supports it.
export function img(ref: ImageRef | undefined, width: number, height?: number): string | undefined {
  if (typeof ref === 'string' && ref.startsWith('/')) return ref
  const id = typeof ref === 'string' ? ref : ref?.asset?._ref
  if (!id) return undefined
  const [, hash, size, format] = id.split('-')
  const url = new URL(`https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${size}.${format}`)
  url.searchParams.set('w', String(width))
  if (height) {
    url.searchParams.set('h', String(height))
    url.searchParams.set('fit', 'crop')
  }
  url.searchParams.set('q', '72')
  url.searchParams.set('auto', 'format')
  return url.href
}

export function srcset(ref: ImageRef | undefined, widths: number[], ratio?: number): string | undefined {
  if (typeof ref === 'string' && ref.startsWith('/')) return undefined
  return widths.map((w) => `${img(ref, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`).join(', ')
}

export type Artist = {
  name: string
  slug: string
  oneLiner?: string
  bioParagraph1?: string
  bioParagraph2?: string
  genre?: string[]
  location?: string
  photo?: ImageRef
  platforms?: Record<string, string>
  releases?: { title: string; year?: string; spotifyUrl?: string }[]
  relationship?: 'current' | 'distributed' | 'alumni' | 'hidden'
  gallery?: ImageRef[]
  alumniPeriod?: string
  alumniNote?: string
}

export type Project = {
  title: string
  slug: string
  excerpt?: string
  status?: string
  year?: string
  category?: string
  tags?: string[]
  coverImage?: ImageRef
  galleryImages?: ImageRef[]
  longDescription?: Block[]
  description?: string
  registrationOpen?: boolean
  registrationClosedText?: string
  albums?: Release[]
}

export type Post = {
  title: string
  slug: string
  excerpt?: string
  seoDescription?: string
  publishedAt: string
  category?: string
  author?: string
  coverImage?: ImageRef
  body?: Block[]
  showOnAm?: boolean
}

const artistFields = '..., "slug": slug.current'
// Links confirmed by the owner that are not yet in the Studio. Studio values always win.
const platformExtras: Record<string, Record<string, string>> = {
  'max-prodigy': { instagram: 'https://www.instagram.com/iammaxprodigy' },
}

export type Shot = { src: string; large?: string; alt: string }

// Photos for an artist. Images added under "More photos" in the Studio take priority, so new artists need no code.
// Otherwise the curated set above is used, then the Studio's main photo.
export function shotsOf(artist: Artist): Shot[] {
  const fromStudio = (artist.gallery ?? [])
    .map((ref) => ({ src: img(ref, 640, 640)!, large: img(ref, 1200, 1200), alt: (typeof ref === 'object' && ref.alt) || artist.name }))
    .filter((shot) => shot.src)
  if (fromStudio.length) return fromStudio
  const curated = photosOf(artist.slug)
  if (curated.length) return curated
  const main = artist.photo && img(artist.photo, 640, 640)
  return main ? [{ src: main, large: img(artist.photo, 1200, 1200), alt: artist.name }] : []
}

// The 4:5 portrait on the Artists page: first Studio gallery photo, then the graded local portrait, then the main photo.
export function portraitOf(artist: Artist) {
  const ref = artist.gallery?.[0]
  if (ref) return { src: img(ref, 800, 1000)!, srcset: `${img(ref, 800, 1000)} 800w, ${img(ref, 1200, 1500)} 1200w`, width: 800, height: 1000, alt: (typeof ref === 'object' && ref.alt) || artist.name }
  if (panelPhotos[artist.slug]) return panelPhotos[artist.slug]
  const main = artist.photo ? img(artist.photo, 800, 1000) : undefined
  return main ? { src: main, srcset: `${main} 800w`, width: 800, height: 1000, alt: artist.name } : undefined
}

const withPhoto = (artist: Artist) => ({
  ...artist,
  platforms: { ...platformExtras[artist.slug], ...artist.platforms },
  bioParagraph2: artist.bioParagraph2 && correctText(artist.bioParagraph2),
})

export const getRoster = async () =>
  (await query<Artist[]>(`*[_type == "artist" && (relationship == "current" || (!defined(relationship) && slug.current in $slugs))] | order(coalesce(order, 999) asc) { ${artistFields} }`, { slugs: rosterSlugs })).map(withPhoto)

// Artists SIRYUS A.M distributes but does not manage. Set "Distribution artist" in the Studio to list someone here.
export const getDistributed = async () =>
  (await query<Artist[]>(`*[_type == "artist" && relationship == "distributed"] | order(coalesce(order, 999) asc, name asc) { ${artistFields} }`)).map(withPhoto)

export const getAlumni = async () =>
  (await query<Artist[]>(`*[_type == "artist" && (relationship == "alumni" || (!defined(relationship) && slug.current in $slugs))] | order(coalesce(order, 999) asc) { ${artistFields} }`, { slugs: alumniSlugs }))
    .map(withPhoto)
    .map((a) => ({ ...a, alumniNote: a.alumniNote ?? alumniNotes[a.slug] ?? 'A past SIRYUS A.M artist.' }))

// Corrections confirmed by the owner on 2026-11-02 that are not yet made in the Studio. Winny Ezeme was a
// facilitator in the first Indiba cohort, not one of its artists, and won The Gospel Icons Africa 2023.
// Once the Studio text is fixed these replacements simply stop matching.
const corrections: [string, string][] = [
  ['Hidaya Morgan, Max Prodigy, Winny Ezeme, Couronne,', 'Hidaya Morgan, Max Prodigy, Couronne,'],
  ['Winny Ezeme, Gospel Icons Africa Season 1 winner, contributed her story and voice to the cohort as both artist and facilitator.', 'Winny Ezeme, winner of The Gospel Icons Africa 2023, joined as a facilitator and shared her journey as a gospel artist with the cohort.'],
  // Hidaya Morgan's Studio bio still reads as if she is on the roster.
  ['She is managed by SIRYUS A.M.', 'SIRYUS A.M managed and distributed her music for a year.'],
]
const correctText = (text: string) => corrections.reduce((t, [from, to]) => t.replace(from, to), text)

// Whole paragraphs replaced or removed, matched by how they start. The owner corrected the Indiba facilitators on
// 2026-11-03: the Studio text had the wrong roles and topics. Replace the Studio paragraphs and these stop matching.
const paragraphOverrides: [string, string | null][] = [
  ['The facilitators who poured into that first cohort',
    'The first cohort learned from people who have done the work. Winny Ezeme, winner of The Gospel Icons Africa 2023, spoke on branding as an artist. Marlon Grigsby, an author, coach and renowned CISO who is CEO of Sentry IT Group, a CIO advisory in the USA, led a session on goal-setting as a creative. Eddie Hatitye, Executive Director of the Music In Africa Foundation, and hip-hop legend Dana Dane took the artists through the music business. Bob Ngene covered music marketing. Julz Ossom, Kofi Black and Ritadeviolinist worked with the artists on stage performance.'],
  ['The series has also drawn international recognition', null],
  ['Vocalists, producers, instrumentalists.', 'Vocalists, producers, instrumentalists. Any independent artist ready to grow their craft and do the work that turns talent into a sustainable career.'],
]
const correct = (blocks: Block[] = []) =>
  blocks.flatMap((b) => {
    const text = (b.children ?? []).map((c) => c.text).join('')
    const override = paragraphOverrides.find(([start]) => text.startsWith(start))
    if (override) return override[1] === null ? [] : [{ ...b, children: [{ text: override[1] }] }]
    return [{ ...b, children: b.children?.map((c) => ({ ...c, text: correctText(c.text) })) }]
  })

export const getProjects = async () =>
  (await query<Project[]>(`*[_type == "project" && slug.current in $slugs] | order(featured desc) { ..., "slug": slug.current, "albums": albums[]-> }`, { slugs: projectSlugs }))
    .map((p) => ({ ...p, longDescription: p.longDescription && correct(p.longDescription) }))

// Journal posts: any post with "Show on the SIRYUS A.M journal" switched on, plus the three original A.M posts
// (older posts in this dataset belong to ARC. Creatives and have no switch set).
export const getPosts = () =>
  query<Post[]>(`*[_type == "blogPost" && defined(slug.current) && showOnAm != false && (showOnAm == true || slug.current in $slugs)] | order(publishedAt desc) { ..., "slug": slug.current }`, { slugs: journalSlugs })

export const POSTS_PER_PAGE = 9

// Minimal Portable Text renderer for the block types these documents use: paragraphs, h2/h3, bold,
// italics, links, bullet lists and images. Dividers become spacing; editorial copy avoids rule lines.
export type Block = {
  _type: string
  _key?: string
  style?: string
  listItem?: 'bullet' | 'number'
  children?: { text: string; marks?: string[] }[]
  markDefs?: { _key: string; _type: string; href?: string }[]
  asset?: { _ref: string }
  alt?: string
}

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function spans(block: Block): string {
  return (block.children ?? [])
    .map((span) => {
      let html = escape(span.text).replace(/\n/g, '<br/>')
      for (const mark of span.marks ?? []) {
        if (mark === 'strong') html = `<strong>${html}</strong>`
        else if (mark === 'em') html = `<em>${html}</em>`
        else {
          const def = block.markDefs?.find((d) => d._key === mark)
          if (def?.href) {
            const external = /^https?:/.test(def.href) && !def.href.includes('siryushub.com')
            html = `<a href="${escape(def.href)}"${external ? ' target="_blank" rel="noopener"' : ''}>${html}</a>`
          }
        }
      }
      return html
    })
    .join('')
}

export function toHtml(blocks: Block[] = []): string {
  let html = ''
  let list: string | null = null
  for (const block of blocks) {
    const listTag = block.listItem === 'number' ? 'ol' : block.listItem ? 'ul' : null
    if (list && list !== listTag) {
      html += `</${list}>`
      list = null
    }
    if (block._type === 'image') {
      const src = img(block, 1200)
      if (src) html += `<figure><img src="${src}" alt="${escape(block.alt ?? '')}" loading="lazy" decoding="async"/></figure>`
      continue
    }
    if (block._type !== 'block') continue
    const text = spans(block)
    if (!text.trim()) continue
    if (listTag) {
      if (!list) html += `<${(list = listTag)}>`
      html += `<li>${text}</li>`
    } else if (block.style === 'h2' || block.style === 'h3' || block.style === 'h4') {
      html += `<h2>${text}</h2>`
    } else if (block.style === 'blockquote') {
      html += `<blockquote>${text}</blockquote>`
    } else {
      html += `<p>${text}</p>`
    }
  }
  if (list) html += `</${list}>`
  return html
}

export function plain(blocks: Block[] = []): string {
  return blocks.map((b) => (b.children ?? []).map((c) => c.text).join('')).join(' ')
}

export const date = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })


// Every release an artist has on Apple Music, read at build time from Apple's public lookup API using the ID in
// the artist's Apple Music link. New releases appear on the next build with no Studio or code changes.
export type Disc = { title: string; format: string; year: string; date: string; cover: string; apple: string }
const discCache = new Map<string, Promise<Disc[]>>()
export function discographyOf(artist: Artist): Promise<Disc[]> {
  const id = artist.platforms?.appleMusic?.match(/(\d{6,})(?:\?.*)?$/)?.[1]
  if (!id) return Promise.resolve([])
  if (!discCache.has(id)) {
    discCache.set(id, (async () => {
      try {
        const res = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=album&limit=200`)
        if (!res.ok) return []
        const seen = new Set<string>()
        return ((await res.json()).results as Record<string, string>[])
          .filter((r) => r.wrapperType === 'collection')
          .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
          .map((r) => {
            const format = / - Single$/.test(r.collectionName) ? 'Single' : / - EP$/.test(r.collectionName) ? 'EP' : 'Album'
            return {
              title: r.collectionName.replace(/ - (Single|EP)$/, ''),
              format,
              year: r.releaseDate.slice(0, 4),
              date: r.releaseDate.slice(0, 10),
              cover: r.artworkUrl100.replace(/\/\d+x\d+bb\./, '/300x300bb.'),
              apple: r.collectionViewUrl.split('?')[0],
            }
          })
          .filter((d) => (seen.has(d.title.toLowerCase()) ? false : (seen.add(d.title.toLowerCase()), true)))
      } catch {
        return []
      }
    })())
  }
  return discCache.get(id)!
}

export type Release = {
  title: string
  credit: string
  kind: 'release' | 'feature'
  format?: string
  releaseDate: string
  cover?: ImageRef
  spotify?: string
  appleMusic?: string
  audiomack?: string
  youtube?: string
  otherLinks?: { label: string; url: string }[]
}

// Releases added in the Studio. When there are none yet the site falls back to the list in lib/collective.ts.
export const getReleases = () => query<Release[]>(`*[_type == "release"] | order(releaseDate desc)`)

// Links for a release, in the order listeners expect.
export const linksOf = (r: Release) =>
  [
    ['Spotify', r.spotify],
    ['Apple Music', r.appleMusic],
    ['Audiomack', r.audiomack],
    ['YouTube', r.youtube],
    ...(r.otherLinks ?? []).map((l) => [l.label, l.url]),
  ].filter((l): l is [string, string] => Boolean(l[1]))

// Facilitator posters from the first Indiba cohort, self-hosted at 600 and 1000 px. Images added to the project's
// gallery in the Studio show alongside these.
export const indibaFacilitators = [
  ['winny-ezeme', 'Winny Ezeme'],
  ['marlon-grigsby', 'Marlon Grigsby'],
  ['eddie-hatitye', 'Eddie Hatitye'],
  ['dana-dane', 'Dana Dane'],
  ['bob-ngene', 'Bob Ngene'],
  ['julz-ossom', 'Julz Ossom'],
  ['kofi-black', 'Kofi Black'],
  ['ritadeviolinist', 'Ritadeviolinist'],
].map(([file, name]) => ({ src: `/images/indiba/${file}-600.webp`, large: `/images/indiba/${file}-1000.webp`, alt: `${name}, Indiba Project Series facilitator` }))
