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
  },
  {
    id: 'pavo',
    name: 'PAVO',
    description:
      'A creative platform that helps teams plan, make, and manage their content in one place.',
    actionLabel: 'Visit PAVO',
    href: 'https://pavocreate.com/',
    linkKind: 'external',
    state: 'available',
    image: null,
    imageAlt: '',
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
  },
]
