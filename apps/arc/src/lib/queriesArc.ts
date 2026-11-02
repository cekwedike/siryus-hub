import { sanityArcClient, sanityArcConfigured } from './sanityArc'
import type {
  ArcEventDetail,
  ArcEventSummary,
  ArcFaqItem,
  ArcSupporter,
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
  comingSoon,
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
  const getStart = (e: ArcEventSummary) => {
    if (e.comingSoon) return null
    const raw = e.startDateTime
    if (!raw) return null
    const t = new Date(raw).getTime()
    return Number.isFinite(t) ? t : null
  }

  const datedUpcoming: ArcEventSummary[] = []
  const comingSoon: ArcEventSummary[] = []
  const datedPast: ArcEventSummary[] = []

  events.forEach((e) => {
    const t = getStart(e)
    if (t == null) {
      comingSoon.push(e)
      return
    }
    if (t >= now) datedUpcoming.push(e)
    else datedPast.push(e)
  })

  datedUpcoming.sort((a, b) => (getStart(a)! - getStart(b)!))
  datedPast.sort((a, b) => (getStart(b)! - getStart(a)!))
  comingSoon.sort((a, b) =>
    (a.title ?? '').localeCompare(b.title ?? '', undefined, { sensitivity: 'base' })
  )

  return [...datedUpcoming, ...comingSoon, ...datedPast]
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

const supporterFields = `
  _id,
  name,
  category,
  shortDescription,
  featured,
  logo {
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
  }
`

const allSupportersQuery = `*[_type == "arcSupporter"] { ${supporterFields} }`

export async function getAllArcSupporters(): Promise<ArcSupporter[]> {
  if (!sanityArcConfigured || !sanityArcClient) return []
  try {
    const rows = await sanityArcClient.fetch<ArcSupporter[]>(allSupportersQuery)
    if (!Array.isArray(rows)) return []
    return [...rows].sort((a, b) =>
      (a.name ?? '').localeCompare(b.name ?? '', undefined, { sensitivity: 'base' })
    )
  } catch {
    return []
  }
}

/*
  Seed copy for ARC Studio (arcFaqItem). Add as separate documents in order:

  1) Q: What is ARC?
     A: ARC stands for Ascent. Refuge. Collective. It is a faith-rooted creative community built to support, protect, and develop Christian creatives across every form of artistic expression. Not a label. Not a management company. A movement.

  2) Q: Who is ARC for?
     A: ARC is built exclusively for Christian creatives: musicians, producers, poets, spoken word artists, filmmakers, dancers, designers, and anyone creating from a place of genuine faith. If your work is rooted in your relationship with God and you are serious about your craft, you belong here.

  3) Q: Is ARC a label or management company?
     A: No. ARC does not sign artists or take a cut of your revenue. It is a community and ecosystem built to develop creatives, connect them to each other, and provide the structure and support that independent artists rarely have access to.

  4) Q: Where is ARC based?
     A: ARC has a founding presence in Nigeria and Rwanda. We operate online and grow globally, but our roots are planted in African creative soil.

  5) Q: How do I join?
     A: Start by subscribing to The ARC Letter at /arc/subscribe. That is where community updates, event announcements, and opportunities to get more involved are shared. From there, show up to sessions and collaboration labs when they open.

  6) Q: Is ARC only for established creatives?
     A: No. ARC is built for the overlooked and the independent, people who are serious about their craft but have not had the structure or support to grow. Formation before visibility is a core value here. You do not need to be established to belong.

  7) Q: What is Apartment Sessions?
     A: Apartment Sessions are intimate creative gatherings hosted in a rented space, bringing together 10 to 15 independent Christian creatives to make music together. Sessions are produced by Jlinez and music released through SIRYUS A.M and The Orchard. The first session is planned for mid-2026 in Kigali.

  8) Q: Who runs ARC?
     A: ARC was founded by Chidiebere Ekwedike and is operated under Siryus Creative Media Ltd, incorporated in Nigeria. The founding team of nine covers music, storytelling, design, marketing, spoken word, movement, and community management across Nigeria and Rwanda.

  9) Q: How is ARC funded?
     A: ARC is currently in its foundation phase and operates lean. Revenue will grow through events, merchandise, strategic partnerships, and in later stages, community membership. Financial support structures, when introduced, will focus exclusively on creative projects, not personal needs.
*/

const faqFields = `
  _id,
  question,
  order,
  answer
`

const allFaqItemsQuery = `*[_type == "arcFaqItem"] | order(coalesce(order, 9999) asc, _createdAt asc) {
  ${faqFields}
}`

export async function getAllArcFaqItems(): Promise<ArcFaqItem[]> {
  if (!sanityArcConfigured || !sanityArcClient) return []
  try {
    const rows = await sanityArcClient.fetch<ArcFaqItem[]>(allFaqItemsQuery)
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}
