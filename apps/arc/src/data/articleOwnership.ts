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
