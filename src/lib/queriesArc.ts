import { sanityArcClient, sanityArcConfigured } from './sanityArc'
import type {
  ArcEventDetail,
  ArcEventSummary,
  BlogPostDetail,
  BlogPostSummary,
} from './queries'

const listFields = `
  _id,
  title,
  slug,
  author,
  publishedAt,
  excerpt,
  coverImage {
    _type,
    hotspot,
    crop,
    alt,
    asset->{
      _id,
      _type,
      _ref,
      url
    }
  },
  category,
  featured,
  "bodyText": array::join(body[_type == "block"].children[_type == "span"].text, " ")
`

const allPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc, _createdAt desc) { ${listFields} }`

const featuredPostsQuery = `*[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3] { ${listFields} }`

const postBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  ${listFields},
  body,
  seoTitle,
  seoDescription
}`

export async function getAllArcPosts(): Promise<BlogPostSummary[]> {
  if (!sanityArcConfigured || !sanityArcClient) return []
  try {
    const rows = await sanityArcClient.fetch<BlogPostSummary[]>(allPostsQuery)
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

export async function getArcPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  if (!sanityArcConfigured || !sanityArcClient || !slug?.trim()) return null
  try {
    const row = await sanityArcClient.fetch<BlogPostDetail | null>(postBySlugQuery, { slug })
    return row ?? null
  } catch {
    return null
  }
}

export async function getFeaturedArcPosts(): Promise<BlogPostSummary[]> {
  if (!sanityArcConfigured || !sanityArcClient) return []
  try {
    const rows = await sanityArcClient.fetch<BlogPostSummary[]>(featuredPostsQuery)
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

const eventListFields = `
  _id,
  title,
  slug,
  startDateTime,
  endDateTime,
  format,
  locationName,
  excerpt,
  coverImage {
    _type,
    hotspot,
    crop,
    alt,
    asset->{
      _id,
      _type,
      _ref,
      url
    }
  },
  featured,
  "bodyText": array::join(body[_type == "block"].children[_type == "span"].text, " ")
`

const allEventsQuery = `*[_type == "arcEvent"] { ${eventListFields} }`

const featuredEventsQuery = `*[_type == "arcEvent" && featured == true] { ${eventListFields} }`

const eventBySlugQuery = `*[_type == "arcEvent" && slug.current == $slug][0] {
  ${eventListFields},
  locationAddress,
  locationUrl,
  onlineUrl,
  body,
  registrationUrl,
  seoTitle,
  seoDescription
}`

/** Upcoming first (soonest first), then past (most recent first). */
export function sortArcEventsForListing(events: ArcEventSummary[]): ArcEventSummary[] {
  const now = Date.now()
  const upcoming = events
    .filter((e) => new Date(e.startDateTime).getTime() >= now)
    .sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime())
  const past = events
    .filter((e) => new Date(e.startDateTime).getTime() < now)
    .sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime())
  return [...upcoming, ...past]
}

export async function getAllArcEvents(): Promise<ArcEventSummary[]> {
  if (!sanityArcConfigured || !sanityArcClient) return []
  try {
    const rows = await sanityArcClient.fetch<ArcEventSummary[]>(allEventsQuery)
    if (!Array.isArray(rows)) return []
    return sortArcEventsForListing(rows)
  } catch {
    return []
  }
}

export async function getArcEventBySlug(slug: string): Promise<ArcEventDetail | null> {
  if (!sanityArcConfigured || !sanityArcClient || !slug?.trim()) return null
  try {
    const row = await sanityArcClient.fetch<ArcEventDetail | null>(eventBySlugQuery, { slug })
    return row ?? null
  } catch {
    return null
  }
}

/** Featured hero: first featured event after listing sort (upcoming preferred). */
export async function getFeaturedArcEvent(): Promise<ArcEventSummary | null> {
  if (!sanityArcConfigured || !sanityArcClient) return null
  try {
    const rows = await sanityArcClient.fetch<ArcEventSummary[]>(featuredEventsQuery)
    if (!Array.isArray(rows) || rows.length === 0) return null
    const sorted = sortArcEventsForListing(rows)
    return sorted[0] ?? null
  } catch {
    return null
  }
}
