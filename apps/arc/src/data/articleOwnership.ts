export const SIRYUS_AM_ARTICLE_SLUGS = [
  'what-independent-artists-get-wrong-about-marketing',
  'copyright-vs-intellectual-property',
  'how-mental-health-impacts-your-art',
] as const

export const ARC_ARTICLE_SLUGS = [
  'monetizing-creativity-earn-living-passion',
  'mastering-time-management-for-creatives',
  'building-an-online-portfolio-that-pops',
  'building-your-brand-as-a-creative',
  'collaboration-in-creative-industries',
] as const

export function isSiryusAmArticle(slug: string): boolean {
  return (SIRYUS_AM_ARTICLE_SLUGS as readonly string[]).includes(slug)
}

export function isArcArticle(slug: string): boolean {
  return (ARC_ARTICLE_SLUGS as readonly string[]).includes(slug)
}

/**
 * ARC. posts from ARC.'s own dataset, plus ARC. articles still stored in the A.M dataset. Once an article has been
 * moved to ARC.'s dataset (studio-arc/scripts/move-arc-posts.mjs) the ARC. copy wins and the old one is skipped.
 */
export function mergeArcPosts<T extends { slug?: { current?: string } }>(arcPosts: T[], mainPosts: T[]): T[] {
  const seen = new Set(arcPosts.map((post) => post.slug?.current))
  return [...arcPosts, ...mainPosts.filter((post) => isArcArticle(post.slug?.current ?? '') && !seen.has(post.slug?.current))]
}
