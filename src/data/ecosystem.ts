export type EcosystemCardId = 'siryus-am' | 'arc-creatives' | 'signal' | 'pavo-create'

export type EcosystemCard = {
  id: EcosystemCardId
  name: string
  description: string
  actionLabel: string
  href: string | null
  linkKind: 'internal' | 'external' | 'none'
  state: 'available' | 'pending'
  image: string | null
  imageAlt: string
  mark: string | null
  markAlt: string
  externalLabel?: string
}

export const ecosystemCards: EcosystemCard[] = [
  {
    id: 'siryus-am',
    name: 'SIRYUS A.M',
    description:
      'Artist management for Max Prodigy and Jlinez, built around steady careers and clear creative direction.',
    actionLabel: 'Explore SIRYUS A.M',
    href: '/am',
    linkKind: 'internal',
    state: 'available',
    image: '/images/background/siryus-am.png',
    imageAlt: '',
    mark: '/images/logo/light/siryus-logo-light.png',
    markAlt: 'SIRYUS Artist Management',
  },
  {
    id: 'arc-creatives',
    name: 'ARC. Creatives',
    description:
      'A faith-rooted community where independent Christian creatives can connect, learn, and make stronger work.',
    actionLabel: 'Visit ARC. Creatives',
    href: '/arc',
    linkKind: 'internal',
    state: 'available',
    image: '/arc/hero-section.webp',
    imageAlt: '',
    mark: '/arc/arc-logo.png',
    markAlt: 'ARC. Creatives',
  },
  {
    id: 'signal',
    name: 'SIGNAL. by SIRYUS',
    description: 'A storytelling-led marketing and growth agency for brands, companies, and organizations.',
    actionLabel: 'Explore SIGNAL.',
    href: '/signal',
    linkKind: 'internal',
    state: 'available',
    image: null,
    imageAlt: '',
    mark: '/brand/signal/wordmark.png',
    markAlt: 'SIGNAL. by SIRYUS',
  },
  {
    id: 'pavo-create',
    name: 'PAVO Create',
    description: 'A separate software company building focused digital products and experiences.',
    actionLabel: 'Visit PAVO Create',
    href: 'https://pavocreate.com',
    linkKind: 'external',
    state: 'available',
    image: null,
    imageAlt: '',
    mark: null,
    markAlt: '',
    externalLabel: 'Opens pavocreate.com',
  },
]
