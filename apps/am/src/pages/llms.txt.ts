// /llms.txt: a plain summary of SIRYUS A.M for AI assistants and answer engines (llmstxt.org). Built at the same
// time as the pages from the Studio and Apple Music, so artists, releases and articles stay current.
import type { APIRoute } from 'astro'
import { services, packages } from '../data/services'
import { profiles } from '../lib/collective'
import { appleCatalog, getRoster, getDistributed, getAlumni, getProjects, getPosts } from '../lib/sanity'

export const GET: APIRoute = async () => {
  const site = 'https://artists.siryushub.com'
  const [roster, distributed, alumni, projects, posts, records] = await Promise.all([getRoster(), getDistributed(), getAlumni(), getProjects(), getPosts(), appleCatalog('1800520219')])
  const artist = (a: { name: string; slug: string; oneLiner?: string }) => `- [${a.name}](${site}/artists/${a.slug})${a.oneLiner ? `: ${a.oneLiner}` : ''}`
  const lines = [
    '# SIRYUS A.M',
    '',
    '> SIRYUS A.M is a music management company and creative collective based in Abuja, Nigeria, working with artists across Africa. It plans releases, distributes music, pitches to playlists, builds content and runs marketing for independent artists, and releases its own records as a collective. It is part of SIRYUS (Siryus Creative Media Ltd) and releases the music of ARC. Creatives.',
    '',
    '## Services',
    '',
    ...services.map((s) => `- [${s.name}](${site}/services/${s.slug}): ${s.line}`),
    ...packages.map((p) => `- [${p.name}](${site}/packages): ${p.line}`),
    '',
    'There are no published prices: every engagement starts with a meeting and a written plan. Playlist placement is never guaranteed.',
    '',
    '## Managed artists',
    '',
    ...roster.map(artist),
    ...(distributed.length ? ['', '## Distribution artists', '', ...distributed.map(artist)] : []),
    ...(alumni.length ? ['', '## Alumni', '', ...alumni.map((a) => `${artist(a)} ${a.alumniNote ?? ''}`.trim())] : []),
    '',
    '## Releases by SIRYUS A.M',
    '',
    ...records.map((r) => `- ${r.title} (${r.format}, ${r.year}), ${r.credit}: ${r.apple}`),
    `- All music: ${site}/music`,
    '',
    '## Projects',
    '',
    ...projects.map((p) => `- [${p.title}](${site}/projects/${p.slug})${p.excerpt ? `: ${p.excerpt}` : ''}`),
    '',
    '## Journal',
    '',
    ...posts.map((p) => `- [${p.title}](${site}/journal/${p.slug})`),
    '',
    '## Contact and profiles',
    '',
    `- [Book a meeting](${site}/contact) or email management@siryushub.com`,
    ...profiles.map(([label, url]) => `- ${label}: ${url}`),
    '- Parent company: [SIRYUS](https://siryushub.com/llms.txt)',
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
