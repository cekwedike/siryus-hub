// /llms.txt: a plain summary of SIGNAL. for AI assistants and answer engines (llmstxt.org), built from the
// same service data as the pages.
import type { APIRoute } from 'astro'
import { services, engagements } from '../data/services'

export const GET: APIRoute = () => {
  const site = 'https://growth.siryushub.com'
  const lines = [
    '# SIGNAL. by SIRYUS',
    '',
    '> SIGNAL. is a story-led marketing and growth agency from SIRYUS (Siryus Creative Media Ltd, Abuja, Nigeria). It finds the story people care about, shapes the strategy and builds campaigns that move people to act. It works with growing brands, companies, organisations and creators, not only music.',
    '',
    '## Services',
    '',
    ...services.map((s) => `- [${s.name}](${site}/services/${s.slug}): ${s.short}`),
    '',
    '## Ways to work together',
    '',
    ...engagements.map((e) => `- ${e.name}: ${e.line}`),
    '',
    'Scope and price are agreed in writing after a meeting. SIGNAL. does not promise guaranteed results.',
    '',
    '## Pages',
    '',
    `- [Approach](${site}/approach): how a project runs, from listening to learning and sharpening.`,
    `- [Work](${site}/work): the kinds of problems SIGNAL. is built to solve. Client work is shared only with permission.`,
    `- [About](${site}/about)`,
    `- [Book a meeting](${site}/contact): or email signal@siryushub.com`,
    '',
    '## Part of SIRYUS',
    '',
    '- [SIRYUS](https://siryushub.com/llms.txt): the parent company and its other worlds.',
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
