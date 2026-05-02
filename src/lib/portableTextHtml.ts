import { toHTML } from '@portabletext/to-html'
import type { PortableTextBlock } from '@portabletext/types'
import { blogCoverImageUrlArc } from './sanityArc'
import { urlFor } from './sanity'

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

export function portableTextToBlogHtml(blocks: PortableTextBlock[] | null | undefined): string {
  if (!blocks?.length) return ''
  return toHTML(blocks, {
    components: {
      marks: {
        link: ({ children, value }) => {
          const href = typeof value?.href === 'string' ? escapeAttr(value.href) : ''
          const isExternal = value?.href?.startsWith('http')
          if (isExternal) {
            return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="blog-link blog-link--external">${children}</a>`
          }
          return `<a href="${href}" class="blog-link">${children}</a>`
        },
      },
      types: {
        image: ({ value }) => {
          if (!value?.asset) return ''
          const src = urlFor(value).width(900).url()
          const alt = typeof value.alt === 'string' ? value.alt : ''
          return `<figure class="blog-post-body__figure"><img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" loading="lazy" decoding="async" width="900" /></figure>`
        },
        divider: ({ value }) => {
          if (value?.style === 'dotted') return '<hr class="blog-divider blog-divider--dotted" />'
          if (value?.style === 'wide') return '<hr class="blog-divider blog-divider--wide" />'
          return '<hr class="blog-divider" />'
        },
      },
    },
  })
}

/** Portable Text from the ARC Sanity project (correct CDN for embedded images). */
export function portableTextToArcHtml(blocks: PortableTextBlock[] | null | undefined): string {
  if (!blocks?.length) return ''
  return toHTML(blocks, {
    components: {
      marks: {
        link: ({ children, value }) => {
          const href = typeof value?.href === 'string' ? escapeAttr(value.href) : ''
          const isExternal = value?.href?.startsWith('http')
          if (isExternal) {
            return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="blog-link blog-link--external">${children}</a>`
          }
          return `<a href="${href}" class="blog-link">${children}</a>`
        },
      },
      types: {
        image: ({ value }) => {
          if (!value?.asset) return ''
          const src = blogCoverImageUrlArc(value, 900)
          if (!src) return ''
          const alt = typeof value.alt === 'string' ? value.alt : ''
          return `<figure class="blog-post-body__figure"><img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" loading="lazy" decoding="async" width="900" /></figure>`
        },
        divider: ({ value }) => {
          if (value?.style === 'dotted') return '<hr class="blog-divider blog-divider--dotted" />'
          if (value?.style === 'wide') return '<hr class="blog-divider blog-divider--wide" />'
          return '<hr class="blog-divider" />'
        },
      },
    },
  })
}
