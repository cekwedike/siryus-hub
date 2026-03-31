import type { PortableTextBlock } from '@portabletext/types'

const trailingSpace = /\s$/
const leadingSpace = /^\s/

function isPortableTextBlock(node: unknown): node is PortableTextBlock {
  if (!node || typeof node !== 'object') return false
  const n = node as Record<string, unknown>
  if (typeof n._type !== 'string' || n._type[0] === '@') return false
  if ('markDefs' in n && n.markDefs) {
    const defs = n.markDefs
    if (!Array.isArray(defs) || !defs.every((d) => d && typeof (d as { _key?: string })._key === 'string')) {
      return false
    }
  }
  if (!Array.isArray(n.children)) return false
  return (n.children as unknown[]).every(
    (child) => child && typeof child === 'object' && '_type' in (child as object)
  )
}

function isPortableTextSpan(span: unknown): span is { _type: 'span'; text: string } {
  return (
    !!span &&
    typeof span === 'object' &&
    (span as { _type?: string })._type === 'span' &&
    typeof (span as { text?: string }).text === 'string'
  )
}

/**
 * Plain text from Portable Text blocks (read time / previews).
 * Mirrors @portabletext/toolkit `toPlainText` for standard block + span content.
 */
export function portableTextToPlainText(
  blocks: PortableTextBlock[] | null | undefined
): string {
  if (!blocks?.length) return ''
  let text = ''
  blocks.forEach((current, index) => {
    if (!isPortableTextBlock(current)) return
    let pad = false
    current.children.forEach((span) => {
      if (isPortableTextSpan(span)) {
        if (
          pad &&
          text &&
          !trailingSpace.test(text) &&
          !leadingSpace.test(span.text)
        ) {
          text += ' '
        }
        text += span.text
        pad = false
      } else {
        pad = true
      }
    })
    if (index !== blocks.length - 1) text += '\n\n'
  })
  return text
}
