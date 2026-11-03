// /llms.txt: a plain summary of ARC. Creatives for AI assistants and answer engines (llmstxt.org), built from the
// same Sanity content as the pages so articles and events stay current.
import type { APIRoute } from 'astro'
import { getAllArcPosts, getAllArcEvents } from '../lib/queriesArc'
import { getAllPosts } from '../lib/queries'
import { mergeArcPosts } from '../data/articleOwnership'

export const GET: APIRoute = async () => {
  const site = 'https://collective.siryushub.com'
  const [arcPosts, mainPosts, events] = await Promise.all([getAllArcPosts(), getAllPosts(), getAllArcEvents()])
  const posts = mergeArcPosts(arcPosts, mainPosts)
  const lines = [
    '# ARC. Creatives',
    '',
    '> ARC. Creatives (Ascent. Refuge. Collective.) is a community supporting Christian creatives across music, film, poetry, dance, design and performance as they grow in craft and faith, together. It is rooted in Nigeria and Rwanda, is part of SIRYUS (Siryus Creative Media Ltd), and is not a record label or agency. ARC. releases music through SIRYUS A.M.',
    '',
    '## Pages',
    '',
    `- [About](${site}/arc/about): why ARC. exists and the meaning of Ascent, Refuge and Collective.`,
    `- [Community](${site}/arc/community): who belongs and how to take part.`,
    `- [Events](${site}/arc/events): gatherings, worship nights and sessions.`,
    `- [Music](${site}/arc/music): ARC. Creatives releases, on Spotify and Apple Music.`,
    `- [Journal](${site}/arc/blog): articles on faith and creative work.`,
    `- [FAQ](${site}/arc/faq)`,
    `- [The ARC. Letter](${site}/arc/subscribe): email updates.`,
    '- Release your music: SIRYUS A.M handles distribution, marketing and management for Christian creatives (https://artists.siryushub.com/contact).',
    '',
    '## Events',
    '',
    ...events.map((e) => `- [${e.title}](${site}/arc/events/${e.slug?.current ?? ''})${e.startDateTime ? ` (${e.startDateTime.slice(0, 10)})` : ''}`),
    '',
    '## Journal',
    '',
    ...posts.map((p) => `- [${p.title}](${site}/arc/blog/${p.slug?.current ?? ''})`),
    '',
    '## Profiles',
    '',
    '- Instagram: https://www.instagram.com/wearearc.creatives/',
    '- YouTube: https://www.youtube.com/@wearearc.creatives',
    '- Spotify: https://open.spotify.com/artist/6JujQRVWUPspGwmKWo3cgp',
    '- Parent company: [SIRYUS](https://siryushub.com/llms.txt)',
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
