// SIRYUS A.M as a recording collective: its own artist profile and releases on the streaming services.
// Profiles verified live and releases checked against Apple Music on 2026-11-02.
export const profiles = [
  ['Spotify', 'https://open.spotify.com/artist/2EG2NnuWqrFQauR3T8Jfpo'],
  ['Apple Music', 'https://music.apple.com/us/artist/siryus-a-m/1800520219'],
  ['Audiomack', 'https://audiomack.com/siryus-am'],
  ['YouTube', 'https://www.youtube.com/@siryus-am'],
  ['Instagram', 'https://www.instagram.com/siryus.am'],
  ['TikTok', 'https://www.tiktok.com/@siryus.a.m'],
  ['X', 'https://x.com/siryus_am'],
] as const

export const spotify = profiles[0][1]

export const releases = [
  {
    title: 'Me & You',
    credit: 'SIRYUS A.M featuring Jlinez and ARC. Creatives',
    type: 'Single',
    date: '2026-07-24',
    cover: '/images/releases/me-and-you.webp',
    apple: 'https://music.apple.com/us/album/me-you-feat-jlinez-arc-creatives-single/6789002497',
  },
  {
    title: 'Nyongorera',
    credit: 'Hidaya Morgan and SIRYUS A.M',
    type: 'Single',
    date: '2025-05-09',
    cover: '/images/releases/nyongorera.webp',
    apple: 'https://music.apple.com/us/album/nyongorera-single/1805985014',
  },
  {
    title: 'LAVO',
    credit: 'SIRYUS A.M featuring Couronne.',
    type: 'Single',
    date: '2025-03-14',
    cover: '/images/releases/lavo.webp',
    apple: 'https://music.apple.com/us/album/lavo-feat-couronne-single/1800520194',
  },
  {
    title: 'Tarama',
    credit: 'SIRYUS A.M featuring Max Prodigy, Hidaya Morgan, Aine Arsene, Chriss D and Couronne.',
    type: 'Single',
    date: '2024-11-01',
    cover: '/images/releases/tarama.webp',
    apple: 'https://music.apple.com/us/album/tarama-feat-max-prodigy-hidaya-morgan-aine-arsene-chriss/1781492731',
  },
]

// Appearances on releases by artists on the roster.
const levitate = [
  ['Spotify', 'https://open.spotify.com/album/6RT13UExYo2oQPYUr1gkMZ'],
  ['Apple Music', 'https://music.apple.com/us/album/levitate-ep/1844929785'],
] as const
export const features = [
  { title: 'B.A.N.S (Boys Are Not Smiling)', credit: 'Max Prodigy featuring SIRYUS A.M, from the LEVITATE EP (2025)', links: levitate },
  { title: 'Happiness Is Free', credit: 'Max Prodigy featuring ALU Choir and SIRYUS A.M, from the LEVITATE EP (2025)', links: levitate },
] as const

export const year = (d: string) => d.slice(0, 4)
