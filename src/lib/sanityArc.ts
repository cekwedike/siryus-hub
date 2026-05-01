import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

const projectId = import.meta.env.PUBLIC_SANITY_ARC_PROJECT_ID as string | undefined
const dataset = import.meta.env.PUBLIC_SANITY_ARC_DATASET as string | undefined

const configured = Boolean(projectId?.trim() && dataset?.trim())

export const sanityArcConfigured = configured

export const sanityArcClient = configured
  ? createClient({
      projectId: projectId!.trim(),
      dataset: dataset!.trim(),
      useCdn: false,
      apiVersion: '2024-01-01',
    })
  : null

const builder = sanityArcClient ? imageUrlBuilder(sanityArcClient) : null

function urlForArc(source: SanityImageSource) {
  if (!builder) throw new Error('sanityArcClient not configured')
  return builder.image(source)
}

/** Blog/list cover for ARC Sanity project images. */
export function blogCoverImageUrlArc(
  source: SanityImageSource | null | undefined,
  width: number,
  height?: number
): string | null {
  if (!sanityArcClient || !source) return null
  return imageUrlFromArcProjectImage(
    source as Parameters<typeof imageUrlFromArcProjectImage>[0],
    width,
    height
  )
}

function imageUrlFromArcProjectImage(
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
      let chain = urlForArc(src).width(width).fit('crop').auto('format')
      if (height != null) chain = chain.height(height)
      return chain.url()
    } catch {
      /* fall through */
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
