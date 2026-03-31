import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Resolve a project/cover image field after GROQ: prefer `asset.url`, else build with image URL API.
 */
export function imageUrlFromProjectImage(
  image: { asset?: { url?: string; _id?: string; _ref?: string } | null } | null | undefined,
  width: number,
  height?: number
): string | null {
  if (!image?.asset) return null
  const a = image.asset
  if (typeof a.url === 'string' && a.url.length > 0) return a.url
  const ref =
    (typeof a._ref === 'string' && a._ref.length > 0 ? a._ref : null) ??
    (typeof a._id === 'string' && a._id.length > 0 ? a._id : null)
  if (!ref) return null
  try {
    const src = { _type: 'image', asset: { _ref: ref, _type: 'reference' } } as SanityImageSource
    let chain = urlFor(src).width(width).fit('crop').auto('format')
    if (height != null) chain = chain.height(height)
    return chain.url()
  } catch {
    return null
  }
}
