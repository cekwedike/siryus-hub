// /llms.txt: a plain summary of SIRYUS for AI assistants and answer engines (llmstxt.org). Built from the same data
// as the site, so it stays in step with the pages.
import type { APIRoute } from 'astro'
import { worlds } from '../data/worlds'

export const GET: APIRoute = () => {
  const lines = [
    '# SIRYUS',
    '',
    '> SIRYUS (Siryus Creative Media Ltd) is a creative company based in Abuja, Nigeria. Its line is "Different Worlds. One Creative Universe." siryushub.com is the doorway to its worlds: SIRYUS A.M, ARC. Creatives and SIGNAL. PAVO Create is a separate company shown alongside them.',
    '',
    '## Company',
    '',
    '- Legal name: Siryus Creative Media Ltd, registered in Nigeria, head office in Abuja.',
    '- Founder and CEO: Chidiebere Ekwedike, who is also the founder and CEO of PAVO Create.',
    '- Previously known online as Siryus Hub, at www.siryushub.com.',
    '- Contact: contact@siryushub.com',
    '',
    '## Worlds',
    '',
    ...worlds.map((w) => `- [${w.name}${w.period ? '.' : ''}](${w.href}/): ${w.note}${w.external ? ' A separate company with the same founder.' : ''}`),
    '',
    '## More detail',
    '',
    '- [SIRYUS A.M summary](https://artists.siryushub.com/llms.txt)',
    '- [SIGNAL. summary](https://growth.siryushub.com/llms.txt)',
    '- [ARC. Creatives summary](https://collective.siryushub.com/llms.txt)',
    '',
    '## Policies',
    '',
    '- [Privacy Policy](https://siryushub.com/privacy-policy)',
    '- [Terms of Use](https://siryushub.com/terms-of-use)',
    '- [Cookie Policy](https://siryushub.com/cookie-policy)',
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
