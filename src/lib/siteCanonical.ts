/**
 * Base origin for absolute canonicals and OG URLs.
 * Set PUBLIC_CANONICAL_ORIGIN when ARC (or the whole site) is served on a different primary domain.
 */
export function getCanonicalOrigin(): string {
  const raw = import.meta.env.PUBLIC_CANONICAL_ORIGIN as string | undefined
  const t = raw?.trim()
  if (t && /^https?:\/\//i.test(t)) return t.replace(/\/+$/, '')
  return 'https://www.siryushub.com'
}
