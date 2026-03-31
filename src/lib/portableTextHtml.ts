import { toHTML } from '@portabletext/to-html'
import type { PortableTextBlock } from '@portabletext/types'
import { urlFor } from './sanity'

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

export function portableTextToBlogHtml(blocks: PortableTextBlock[] | null | undefined): string {
  if (!blocks?.length) return ''
  return toHTML(blocks, {
    components: {
      types: {
        image: ({ value }) => {
          if (!value?.asset) return ''
          const src = urlFor(value).width(900).url()
          const alt = typeof value.alt === 'string' ? value.alt : ''
          return `<figure class="blog-post-body__figure"><img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" loading="lazy" decoding="async" width="900" /></figure>`
        },
      },
    },
  })
}
