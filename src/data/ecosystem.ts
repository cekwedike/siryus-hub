export type EcosystemCardId = 'siryus-am' | 'arc-creatives' | 'pavo' | 'signal'

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
}

export const ecosystemCards: EcosystemCard[] = [
  {
    id: 'siryus-am',
    name: 'SIRYUS A.M',
    description:
      'Artist management for Max Prodigy and Jlinez, built around steady careers and clear creative direction.',
    actionLabel: 'Explore SIRYUS A.M',
    href: '/siryus-am',
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
    id: 'pavo',
    name: 'PAVO',
    description: 'A SIRYUS product in development. Its identity and direction will be shared later.',
    actionLabel: 'PAVO is taking shape',
    href: null,
    linkKind: 'none',
    state: 'pending',
    image: null,
    imageAlt: '',
    mark: null,
    markAlt: '',
  },
  {
    id: 'signal',
    name: 'SIGNAL.',
    description: 'A new part of the SIRYUS ecosystem. Its direction is still taking shape.',
    actionLabel: 'SIGNAL. is taking shape',
    href: null,
    linkKind: 'none',
    state: 'pending',
    image: null,
    imageAlt: '',
    mark: null,
    markAlt: '',
  },
]
