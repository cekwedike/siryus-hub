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
    images: ['/images/artists/max-prodigy.webp', '/images/artists/jlinez-studio.webp', '/images/artists/max-prodigy-hands.webp'],
  },
  {
    id: 'arc',
    name: 'ARC. Creatives',
    note: 'A community supporting Christian creatives.',
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
    images: ['/images/portal/signal-billboards.webp', '/images/portal/signal-camera.webp', '/images/portal/signal-billboard-night.webp'],
  },
  {
    id: 'pavo',
    name: 'PAVO Create',
    note: 'A technology company building software and digital products.',
    href: 'https://pavocreate.com',
    domain: 'pavocreate.com',
    external: true,
    logo: { src: '/brand/pavo/symbol.svg', width: 450, height: 440 },
    images: ['/images/portal/pavo-code.webp', '/images/portal/pavo-laptop.webp', '/images/portal/pavo-devices.webp'],
  },
]
