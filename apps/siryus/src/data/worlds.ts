export type World = {
  id: string
  name: string
  period?: boolean
  note: string
  href: string
  domain: string
  external?: boolean
  logo?: { src: string; width: number; height: number }
  images: string[]
}

export const worlds: World[] = [
  {
    id: 'am',
    name: 'SIRYUS A.M',
    note: 'Music management, distribution and marketing for independent artists.',
    href: 'https://artists.siryushub.com',
    domain: 'artists.siryushub.com',
    logo: { src: '/brand/am/tile.png', width: 360, height: 333 },
    images: ['/images/hero/siryus-violin.webp', '/images/artists/max-prodigy.webp', '/images/artists/jlinez.webp'],
  },
  {
    id: 'arc',
    name: 'ARC. Creatives',
    note: 'Ascent. Refuge. Collective.',
    href: 'https://collective.siryushub.com',
    domain: 'collective.siryushub.com',
    logo: { src: '/brand/arc/logo-on-dark.svg', width: 73, height: 77 },
    images: ['/images/portal/arc-worship.webp', '/images/portal/arc-mic.webp', '/images/portal/arc-hands.webp'],
  },
  {
    id: 'signal',
    name: 'SIGNAL',
    period: true,
    note: 'Story-led marketing and growth for brands.',
    href: 'https://growth.siryushub.com',
    domain: 'growth.siryushub.com',
    logo: { src: '/brand/signal/symbol.png', width: 425, height: 355 },
    images: ['/images/portal/signal-workshop.webp', '/images/portal/signal-planning.webp', '/images/portal/signal-wall.webp'],
  },
  {
    id: 'pavo',
    name: 'PAVO Create',
    note: 'The software company behind PAVO, MusicSim, ATLAS and Trackr.',
    href: 'https://pavocreate.com',
    domain: 'pavocreate.com',
    external: true,
    images: ['/images/portal/pavo-code.webp', '/images/portal/pavo-laptop.webp', '/images/portal/pavo-devices.webp'],
  },
]
