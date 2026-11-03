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
  relationship?: 'current' | 'alumni' | 'hidden'
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
}

const artistFields = '..., "slug": slug.current'
const withPhoto = (artist: Artist) => ({ ...artist, photo: photosOf(artist.slug)[0]?.src ?? artist.photo, bioParagraph2: artist.bioParagraph2 && correctText(artist.bioParagraph2) })

export const getRoster = async () =>
  (await query<Artist[]>(`*[_type == "artist" && (relationship == "current" || (!defined(relationship) && slug.current in $slugs))] | order(coalesce(order, 999) asc) { ${artistFields} }`, { slugs: rosterSlugs })).map(withPhoto)

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
const correct = (blocks: Block[] = []) =>
  blocks.map((b) => ({ ...b, children: b.children?.map((c) => ({ ...c, text: correctText(c.text) })) }))

export const getProjects = async () =>
  (await query<Project[]>(`*[_type == "project" && slug.current in $slugs] | order(featured desc) { ..., "slug": slug.current }`, { slugs: projectSlugs }))
    .map((p) => ({ ...p, longDescription: p.longDescription && correct(p.longDescription) }))

export const getPosts = () =>
  query<Post[]>(`*[_type == "blogPost" && slug.current in $slugs] | order(publishedAt desc) { ..., "slug": slug.current }`, { slugs: journalSlugs })

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
