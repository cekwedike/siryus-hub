# SIRYUS ecosystem implementation pack

This pack turns the current multi-page site into a clear plan for a minimal SIRYUS ecosystem doorway while protecting existing content and services during migration.

## Read in this order

1. [Architecture](01-architecture.md)
2. [Routes and navigation](02-routes-and-navigation.md)
3. [Brand distinctions](03-brand-distinctions.md)
4. [Content migration](04-content-migration.md)
5. [Sanity plan](05-sanity.md)
6. [Cloudflare Pages migration](06-cloudflare-pages-migration.md)
7. [DNS and email protection](07-dns-and-email-protection.md)
8. [QA and acceptance](08-qa-and-acceptance.md)
9. [Phased Codex prompts](09-phased-codex-prompts.md)

## Source-of-truth decisions

- `siryushub.com` becomes a small parent-site doorway.
- The main choice is four brand cards: SIRYUS A.M, ARC. Creatives, PAVO, and SIGNAL.
- PAVO is external and opens `https://pavocreate.com/`.
- SIGNAL. can appear as a restrained pending card, but no logo or invented brand system may be created.
- The parent navigation should contain at most Home, About, and Contact. A no-navigation landing treatment is also acceptable if About and Contact remain reachable in the footer.
- Existing routes stay in place until content is inventoried, redirects are approved, and the new destinations are ready.
- No code, route, content, or DNS record is deleted as part of this documentation phase.

## Current repository facts observed on 1 November 2026

- Astro 6.1.1 with static output.
- `@astrojs/vercel` is still imported and configured.
- Two Sanity studios exist: `studio/` and `studio-arc/`.
- The main Studio currently hardcodes its project ID and dataset. ARC reads environment variables.
- The root and main Studio have `package-lock.json`; `studio-arc/` has its own package manifest.
- The route tree includes the parent site, SIRYUS A.M, artists, projects, blog, and a large ARC section.
- `astro.config.mjs` still lists Hidaya, Winny, and Acoustic Rwanda in sitemap custom pages.
- Git was clean on `main` when this pack was prepared.

## Definition of done for the future implementation

The work is complete only when the approved route plan is implemented, content is migrated without loss, the Cloudflare preview passes the QA matrix, email DNS is unchanged, production cutover is approved, and a rollback path is still available.

