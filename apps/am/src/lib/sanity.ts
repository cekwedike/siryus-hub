// Build-time reads from the SIRYUS A.M Sanity dataset (the same content the old siryushub.com used).
// Project ID and dataset are public values; override them with PUBLIC_SANITY_* env vars if they change.
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'h16wl0pr'
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production'

// Only these two artists are currently managed. Hidaya Morgan (alumna) and Winny Ezeme (not signed) stay off the roster.
export const rosterSlugs = ['max-prodigy', 'jlinez']
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

// Each artist's photo comes from their official Spotify profile (checked 2026-11-02) and is self-hosted.
// The portraits stored in Sanity did not match those profiles, so these take priority.
const officialPhotos: Record<string, string> = {
  'max-prodigy': '/images/artists/max-prodigy.webp',
  jlinez: '/images/artists/jlinez.webp',
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
export const getRoster = async () =>
  (await query<Artist[]>(`*[_type == "artist" && slug.current in $slugs] | order(coalesce(order, 999) asc) { ${artistFields} }`, { slugs: rosterSlugs }))
    .map((artist) => ({ ...artist, photo: officialPhotos[artist.slug] ?? artist.photo }))

// Corrections confirmed by the owner on 2026-11-02 that are not yet made in the Studio. Winny Ezeme was a
// facilitator in the first Indiba cohort, not one of its artists, and won The Gospel Icons Africa 2023.
// Once the Studio text is fixed these replacements simply stop matching.
const corrections: [string, string][] = [
  ['Hidaya Morgan, Max Prodigy, Winny Ezeme, Couronne,', 'Hidaya Morgan, Max Prodigy, Couronne,'],
  ['Winny Ezeme, Gospel Icons Africa Season 1 winner, contributed her story and voice to the cohort as both artist and facilitator.', 'Winny Ezeme, winner of The Gospel Icons Africa 2023, joined as a facilitator and shared her journey as a gospel artist with the cohort.'],
]
const correct = (blocks: Block[] = []) =>
  blocks.map((b) => ({ ...b, children: b.children?.map((c) => ({ ...c, text: corrections.reduce((t, [from, to]) => t.replace(from, to), c.text) })) }))

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
