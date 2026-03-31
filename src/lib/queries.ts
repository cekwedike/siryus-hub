import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url'
import { sanityClient } from './sanity'

export interface BlogPostSlug {
  current: string
}

/** Fields shared by list and featured queries */
export interface BlogPostSummary {
  _id: string
  title: string
  slug: BlogPostSlug
  author: string
  publishedAt: string
  excerpt: string
  coverImage: SanityImageSource | null
  category: string | null
  featured: boolean | null
}

export interface BlogPostDetail extends BlogPostSummary {
  body: PortableTextBlock[] | null
  seoTitle: string | null
  seoDescription: string | null
}

const listFields = `
  _id,
  title,
  slug,
  author,
  publishedAt,
  excerpt,
  coverImage,
  category,
  featured
`

const allPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) { ${listFields} }`

const featuredPostsQuery = `*[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3] { ${listFields} }`

const postBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  ${listFields},
  body,
  seoTitle,
  seoDescription
}`

export async function getAllPosts(): Promise<BlogPostSummary[]> {
  try {
    const rows = await sanityClient.fetch<BlogPostSummary[]>(allPostsQuery)
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  if (!slug?.trim()) return null
  try {
    const row = await sanityClient.fetch<BlogPostDetail | null>(postBySlugQuery, { slug })
    return row ?? null
  } catch {
    return null
  }
}

export async function getFeaturedPosts(): Promise<BlogPostSummary[]> {
  try {
    const rows = await sanityClient.fetch<BlogPostSummary[]>(featuredPostsQuery)
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

export interface StudioContentSlug {
  current: string
}

export interface StudioContentItem {
  _id: string
  title: string
  slug: StudioContentSlug
  artist: string | null
  platform: string
  embedUrl: string
  thumbnail: SanityImageSource | null
  category: string
  publishedAt: string
  featured: boolean | null
  description: string | null
}

const studioListFields = `
  _id,
  title,
  slug,
  artist,
  platform,
  embedUrl,
  thumbnail,
  category,
  publishedAt,
  featured,
  description
`

const allStudioQuery = `*[_type == "studioContent"] | order(publishedAt desc) { ${studioListFields} }`

const featuredStudioQuery = `*[_type == "studioContent" && featured == true] | order(publishedAt desc) [0...4] { ${studioListFields} }`

export async function getAllStudioContent(): Promise<StudioContentItem[]> {
  try {
    const rows = await sanityClient.fetch<StudioContentItem[]>(allStudioQuery)
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

export async function getFeaturedStudioContent(): Promise<StudioContentItem[]> {
  try {
    const rows = await sanityClient.fetch<StudioContentItem[]>(featuredStudioQuery)
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

export interface ArtistSlug {
  current: string
}

export interface ArtistRelease {
  title: string
  year?: string | null
  spotifyUrl?: string | null
}

export interface ArtistPlatforms {
  spotify?: string | null
  youtube?: string | null
  appleMusic?: string | null
  instagram?: string | null
  audiomack?: string | null
  tiktok?: string | null
}

const artistListFields = `
  _id,
  name,
  slug,
  genre,
  location,
  oneLiner,
  photo,
  featured,
  order
`

const artistFullFields = `
  _id,
  name,
  slug,
  genre,
  location,
  oneLiner,
  bioParagraph1,
  bioParagraph2,
  photo,
  managementLabel,
  releases[]{ title, year, spotifyUrl },
  platforms,
  featured,
  active,
  order
`

const allArtistsQuery = `*[_type == "artist" && active == true] | order(coalesce(order, 999) asc, name asc) { ${artistListFields} }`

const featuredArtistsQuery = `*[_type == "artist" && active == true && featured == true] | order(coalesce(order, 999) asc, name asc) { ${artistListFields} }`

const artistBySlugQuery = `*[_type == "artist" && slug.current == $slug][0] { ${artistFullFields} }`

export interface ArtistSummary {
  _id: string
  name: string
  slug: ArtistSlug
  genre: string[] | null
  location: string
  oneLiner: string
  photo: SanityImageSource | null
  featured: boolean | null
  order: number | null
}

export interface ArtistDetail extends ArtistSummary {
  bioParagraph1: string
  bioParagraph2: string
  managementLabel: string | null
  releases: ArtistRelease[] | null
  platforms: ArtistPlatforms | null
  active: boolean | null
}

export async function getAllArtists(): Promise<ArtistSummary[]> {
  try {
    const rows = await sanityClient.fetch<ArtistSummary[]>(allArtistsQuery)
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

export async function getArtistBySlug(slug: string): Promise<ArtistDetail | null> {
  if (!slug?.trim()) return null
  try {
    const row = await sanityClient.fetch<ArtistDetail | null>(artistBySlugQuery, { slug })
    return row ?? null
  } catch {
    return null
  }
}

export async function getFeaturedArtists(): Promise<ArtistSummary[]> {
  try {
    const rows = await sanityClient.fetch<ArtistSummary[]>(featuredArtistsQuery)
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

const projectListFields = `
  _id,
  title,
  slug,
  category,
  description,
  coverImage,
  tags,
  year,
  status,
  artist,
  featured,
  excerpt,
  projectType,
  longDescription,
  galleryImages,
  registrationOpen,
  registrationUrl,
  registrationButtonText,
  registrationClosedText
`

/** Dereferenced image shape from getProjectBySlug (direct CDN URLs for hero and gallery). */
export interface ProjectSanityImageDeref {
  asset?: { _id: string; url?: string } | null
  alt?: string | null
}

const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  description,
  coverImage {
    asset->{
      _id,
      url
    },
    alt
  },
  tags,
  year,
  status,
  artist,
  featured,
  excerpt,
  projectType,
  longDescription,
  galleryImages[] {
    asset->{
      _id,
      url
    },
    alt
  },
  registrationOpen,
  registrationUrl,
  registrationButtonText,
  registrationClosedText,
  publishedAt
}`

const allProjectsQuery = `*[_type == "project"] | order(year desc, publishedAt desc) { ${projectListFields} }`

const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(year desc, publishedAt desc) [0...3] { ${projectListFields} }`

export interface ProjectSummary {
  _id: string
  title: string
  slug: { current: string }
  category: string
  description: string
  coverImage: SanityImageSource | null
  tags: string[] | null
  year: string
  status: string
  artist: string | null
  featured: boolean | null
  excerpt: string | null
  projectType: string | null
  longDescription: PortableTextBlock[] | null
  galleryImages: SanityImageSource[] | null
  registrationOpen: boolean | null
  registrationUrl: string | null
  registrationButtonText: string | null
  registrationClosedText: string | null
}

export interface ProjectDetail extends Omit<ProjectSummary, 'coverImage' | 'galleryImages'> {
  publishedAt: string | null
  coverImage: SanityImageSource | ProjectSanityImageDeref | null
  galleryImages: ProjectSanityImageDeref[] | null
}

export async function getAllProjects(): Promise<ProjectSummary[]> {
  try {
    const rows = await sanityClient.fetch<ProjectSummary[]>(allProjectsQuery)
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  if (!slug?.trim()) return null
  try {
    const row = await sanityClient.fetch<ProjectDetail | null>(projectBySlugQuery, { slug })
    return row ?? null
  } catch {
    return null
  }
}

export async function getFeaturedProjects(): Promise<ProjectSummary[]> {
  try {
    const rows = await sanityClient.fetch<ProjectSummary[]>(featuredProjectsQuery)
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

export interface TeamMemberSlug {
  current: string
}

export interface TeamMember {
  _id: string
  name: string
  slug: TeamMemberSlug
  role: string
  responsibilities: string
  photo: SanityImageSource | null
  initials: string
  order: number
  founder: boolean
}

const teamMemberFields = `
  _id,
  name,
  slug,
  role,
  responsibilities,
  photo {
    _type,
    hotspot,
    crop,
    asset->{
      _id,
      _type,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    }
  },
  initials,
  order,
  founder
`

const allTeamMembersQuery = `*[_type == "teamMember" && active == true] | order(founder desc, order asc) { ${teamMemberFields} }`

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  try {
    const rows = await sanityClient.fetch<TeamMember[]>(allTeamMembersQuery)
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}
