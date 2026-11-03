// ARC. Creatives as a structured-data entity, output on every page next to any page-specific schema
// (articles, events, FAQ). The parent company and founder come from shared/seo.ts.
import { ids, parentNodes } from '../../../../shared/seo'

export const arcOrganization = {
  '@type': ['Organization', 'MusicGroup'],
  '@id': ids.arc,
  name: 'ARC. Creatives',
  alternateName: ['ARC.', 'ARC', 'Ascent. Refuge. Collective.'],
  url: 'https://collective.siryushub.com/',
  logo: 'https://collective.siryushub.com/arc/arc-logo.png',
  slogan: 'Ascent. Refuge. Collective.',
  description: 'ARC. Creatives is a community supporting Christian creatives across music, film, poetry, dance, design and performance as they grow in craft and faith, together. Based in Nigeria and Rwanda.',
  areaServed: 'Worldwide',
  parentOrganization: { '@id': ids.siryus },
  sameAs: [
    'https://www.instagram.com/wearearc.creatives/',
    'https://www.youtube.com/@wearearc.creatives',
    'https://open.spotify.com/artist/6JujQRVWUPspGwmKWo3cgp',
    'https://music.apple.com/us/artist/arc-creatives/6789002500',
  ],
}

export const arcGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    arcOrganization,
    { '@type': 'WebSite', '@id': 'https://collective.siryushub.com/#website', name: 'ARC. Creatives', url: 'https://collective.siryushub.com/', publisher: { '@id': ids.arc } },
    ...parentNodes,
  ],
}
