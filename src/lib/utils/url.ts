/**
 * Generate slug from string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Build absolute URL
 */
export function buildUrl(path: string): string {
  const base = import.meta.env.PUBLIC_SITE_URL || 'https://www.siryushub.com';
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Check if URL is external
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Get canonical URL for page
 */
export function getCanonicalUrl(path: string): string {
  return buildUrl(path).replace(/\/$/, ''); // Remove trailing slash
}
