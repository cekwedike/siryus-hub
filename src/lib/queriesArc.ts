import { sanityArcClient, sanityArcConfigured } from './sanityArc'
import type { BlogPostDetail, BlogPostSummary } from './queries'

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
