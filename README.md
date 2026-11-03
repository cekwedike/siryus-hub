# SIRYUS

The websites of Siryus Creative Media Ltd: four static Astro sites in one pnpm workspace, hosted on Cloudflare Pages.

| Site | Folder | Address | Cloudflare Pages project |
|---|---|---|---|
| SIRYUS (hub) | `apps/siryus` | https://siryushub.com | `siryus-hub` (builds from Git) |
| SIRYUS A.M | `apps/am` | https://artists.siryushub.com | `siryus-artists` |
| SIGNAL. by SIRYUS | `apps/signal` | https://growth.siryushub.com | `siryus-growth` |
| ARC. Creatives | `apps/arc` | https://collective.siryushub.com | `siryus-collective` |

Content lives in two Sanity Studios: `studio/` (SIRYUS A.M, project `h16wl0pr`) and `studio-arc/` (ARC. Creatives,
project `qi12mdx6`). Shared code is in `shared/`: the "Back to SIRYUS" link, motion, the contact-form email handler
and `seo.ts`, the company and founder facts used in every site's structured data.

## Work on it

```bash
pnpm install
pnpm dev:hub        # or dev:am, dev:signal, dev:arc
pnpm build          # builds all four sites
pnpm studio         # A.M Studio; pnpm studio:arc for ARC.
```

## Deploys

- siryushub.com rebuilds when `main` is pushed.
- A.M, SIGNAL. and ARC. deploy through `.github/workflows/deploy-sites.yml`: on pushes that touch them, by hand from
  the Actions tab, and when content is published in either Studio (a Sanity webhook sends a `sanity-publish` event).
- The contact forms on A.M and SIGNAL. need the `MAILJET_API_KEY` and `MAILJET_SECRET_KEY` secrets on their Pages
  projects.

## Search

Each site serves `/sitemap-index.xml`, `/robots.txt` and `/llms.txt` (a plain summary for AI assistants, generated
from the same data as the pages). Old URLs from the previous siryushub.com are redirected in
`apps/siryus/public/_redirects`; see `docs/ROUTE_MIGRATION_MATRIX.md`.

## Docs

- `AGENTS.md`: rules for anyone, human or AI, changing this repository.
- `docs/DECISIONS_AND_PROGRESS.md`: what changed and why.
- `docs/IMAGE_CREDITS.md`: where every image comes from and the right to use it.
- `docs/BRAND_SIGNAL.md`: the SIGNAL. brand.
