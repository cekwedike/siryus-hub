import type { SEO } from '../types/seo';
import { buildUrl } from './url';

/**
 * Generate SEO metadata for pages
 */
export function generateSEO(seo: SEO) {
  const siteName = import.meta.env.PUBLIC_SITE_NAME || 'SIRYUS Artist Management';
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://www.siryushub.com';

  return {
    title: seo.title,
    description: seo.description,
    canonical: seo.canonical || buildUrl(seo.path || ''),
    openGraph: {
      basic: {
        title: seo.openGraph?.title || seo.title,
        type: seo.openGraph?.type || 'website',
        image: seo.openGraph?.image || `${siteUrl}/images/og-default.jpg`,
        url: seo.openGraph?.url || buildUrl(seo.path || ''),
      },
      optional: {
        description: seo.openGraph?.description || seo.description,
        siteName: siteName,
      },
    },
    twitter: {
      card: seo.twitter?.card || 'summary_large_image',
      title: seo.twitter?.title || seo.title,
      description: seo.twitter?.description || seo.description,
      image: seo.twitter?.image || seo.openGraph?.image || `${siteUrl}/images/og-default.jpg`,
    },
  };
}
