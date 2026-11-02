import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string | undefined
const dataset = import.meta.env.PUBLIC_SANITY_DATASET as string | undefined

export const sanityClient = projectId?.trim() && dataset?.trim()
  ? createClient({
      projectId: projectId.trim(),
      dataset: dataset.trim(),
      useCdn: false,
      apiVersion: '2026-03-01',
      perspective: 'published',
    })
  : null

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null

export function urlFor(source: SanityImageSource) {
  if (!builder) throw new Error('sanityClient not configured')
  return builder.image(source)
}

/** Blog/list cover: works with expanded GROQ (asset.url) or reference-only images. */
export function blogCoverImageUrl(
  source: SanityImageSource | null | undefined,
  width: number,
  height?: number
): string | null {
  if (!source) return null
  return imageUrlFromProjectImage(
    source as Parameters<typeof imageUrlFromProjectImage>[0],
    width,
    height
  )
}

/**
 * Resolve a project/cover image field after GROQ: prefer ref + image URL API for sizing; else tweak CDN url.
 */
export function imageUrlFromProjectImage(
  image: { asset?: { url?: string; _id?: string; _ref?: string } | null } | null | undefined,
  width: number,
  height?: number
): string | null {
  if (!image?.asset) return null
  const a = image.asset
  const ref =
    (typeof a._ref === 'string' && a._ref.length > 0 ? a._ref : null) ??
    (typeof a._id === 'string' && a._id.length > 0 ? a._id : null)
  if (ref) {
    try {
      const src = { _type: 'image', asset: { _ref: ref, _type: 'reference' } } as SanityImageSource
      let chain = urlFor(src).width(width).fit('crop').auto('format')
      if (height != null) chain = chain.height(height)
      return chain.url()
    } catch {
      /* fall through to url */
    }
  }
  if (typeof a.url === 'string' && a.url.length > 0) {
    try {
      const u = new URL(a.url)
      if (u.hostname.includes('sanity.io') || u.hostname.includes('cdn.sanity')) {
        u.searchParams.set('w', String(width))
        u.searchParams.set('auto', 'format')
        if (height != null) u.searchParams.set('h', String(height))
        u.searchParams.set('fit', 'crop')
        return u.toString()
      }
    } catch {
      return a.url
    }
    return a.url
  }
  return null
}
