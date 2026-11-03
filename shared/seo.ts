// One source of truth for who SIRYUS is, read by all four sites' structured data (JSON-LD). Search engines and AI
// assistants use it to connect the company, its worlds and its founder. Nothing here is shown on the pages.
//
// People: only the founder is described. Team members change over time, so they are deliberately not listed here;
// search engines take current roles from LinkedIn and similar public profiles. To strengthen the link between this
// site and those profiles, add their URLs to `founderProfiles` and `siryusProfiles` below (for example the founder's
// LinkedIn page and the company's LinkedIn page). Every site picks them up on the next build.

export const founderProfiles: string[] = []
export const siryusProfiles: string[] = []

export const ids = {
  siryus: 'https://siryushub.com/#organization',
  founder: 'https://siryushub.com/#founder',
  pavo: 'https://pavocreate.com/#organization',
  am: 'https://artists.siryushub.com/#organization',
  signal: 'https://growth.siryushub.com/#organization',
  arc: 'https://collective.siryushub.com/#organization',
} as const

const withProfiles = <T extends object>(node: T, profiles: string[]) => (profiles.length ? { ...node, sameAs: profiles } : node)

export const founder = withProfiles(
  {
    '@type': 'Person',
    '@id': ids.founder,
    name: 'Chidiebere Ekwedike',
    jobTitle: 'Founder and CEO',
    worksFor: [{ '@id': ids.siryus }, { '@id': ids.pavo }],
  },
  founderProfiles,
)

export const siryus = withProfiles(
  {
    '@type': 'Organization',
    '@id': ids.siryus,
    name: 'Siryus Creative Media Ltd',
    legalName: 'Siryus Creative Media Ltd',
    alternateName: ['SIRYUS', 'Siryus Hub'],
    url: 'https://siryushub.com/',
    logo: 'https://siryushub.com/icon-512.png',
    slogan: 'Different Worlds. One Creative Universe.',
    description: 'Siryus Creative Media Ltd is a creative company in Abuja, Nigeria. It runs SIRYUS A.M (music management and a creative collective), SIGNAL. (story-led marketing and growth) and ARC. Creatives (a community supporting Christian creatives).',
    email: 'contact@siryushub.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Abuja', addressCountry: 'NG' },
    areaServed: 'Worldwide',
    founder: { '@id': ids.founder },
    subOrganization: [{ '@id': ids.am }, { '@id': ids.signal }, { '@id': ids.arc }],
  },
  siryusProfiles,
)

// PAVO Create is a separate company with the same founder. No parent or subsidiary relationship is stated.
export const pavo = {
  '@type': 'Organization',
  '@id': ids.pavo,
  name: 'PAVO Create',
  url: 'https://pavocreate.com/',
  founder: { '@id': ids.founder },
}

// Nodes every site includes so references to the parent company and founder resolve on the page itself.
export const parentNodes = [siryus, founder]
