# Decisions and progress

Last updated: 2026-11-02

## Superseding direction: independent brand applications

The user rejected the combined visual system and explicitly approved a repository split. This decision supersedes the earlier single-app migration decision below.

- `apps/siryus`, `apps/am`, `apps/signal` and `apps/arc` are independent pnpm workspace applications.
- Root `pnpm dev` opens SIRYUS. Brand commands are `pnpm dev:hub`, `pnpm dev:am`, `pnpm dev:signal` and `pnpm dev:arc`.
- ARC was copied mechanically so its approved visual design remains intact.
- The old root application remains as migration evidence until every legacy route and Sanity query is reconciled. Nothing was deleted.
- SIRYUS now opens directly into four clickable image shards.
- SIRYUS A.M now has a bright music-editorial system with an independent font pairing and route set.
- SIGNAL. now has an independent premium agency system with Services, Approach, Work, Insights, About and Contact pages.
- No commit, deployment or DNS change was made.

## Current implementation state

The rebuild is continuing on `phase-1-pnpm-static-foundation`. Changes remain uncommitted by explicit user instruction. No deployment or DNS change has been made.

## Decisions applied

- Keep one Astro static application for the current migration stage. Separate brand layouts and tokens provide visual isolation without a risky repository split.
- Keep both Sanity Studios and their schemas. No dataset merge, schema deletion, or content mutation has been performed.
- Use `/am` as the working local SIRYUS A.M destination until `artists.siryushub.com` is verified.
- Use `/signal` as a local preview route until `growth.siryushub.com` is verified. It is not a claim that the subdomain is live.
- Keep ARC. Creatives under `/arc` and add `/arc/music` without changing its Studio or article slugs.
- Link PAVO Create directly to `https://pavocreate.com` as a separate external company. Do not create `/pavo`.
- Keep old content files in place during migration. Mark legacy generic routes noindex and use the Cloudflare redirect manifest rather than deleting source content.
- Keep motion progressive. Content is visible on first paint, without JavaScript, and with reduced motion enabled.
- Do not load Google Analytics or Microsoft Clarity in the rebuilt parent and new brand shells until consent and current tracking requirements are approved.

## Completed work

### Phase 0

- Created `CURRENT_STATE_AUDIT.md`.
- Created `ROUTE_MIGRATION_MATRIX.md`.
- Recorded current build, route, CMS, design, SEO, form, asset, and deployment risks.

### Parent SIRYUS

- Applied the approved headline `Different worlds. One creative universe.`
- Corrected PAVO Create ownership and external-link behavior.
- Replaced the undefined SIGNAL. card with the approved storytelling-led identity and a working local preview.
- Added parent Open Graph and Twitter image metadata.
- Repaired the mobile hero overlap.
- Added contact privacy consent and removed the internal PAVO enquiry option.
- Updated the legal footer name.

### SIRYUS A.M

- Added a distinct `/am` experience with independent navigation, typography, color, motion, roster, service, project, music, insight, and contact paths.
- Kept the current managed roster limited to Max Prodigy and Jlinez.
- Preserved existing artist, project, music, and article routes while the full path migration is staged.
- Kept playlist and distribution language free from guarantees.

### ARC. Creatives

- Preserved the independent ARC route family, Studio, events, stories, community, supporters, FAQ, and newsletter.
- Added a Music & Projects destination.
- Added the missing ARC Letter navigation state.
- Fixed ARC pagination generation by including ARC-owned articles from the primary dataset.
- Removed visible eyebrow treatments and rounded text pills from the shared ARC editorial system.
- Removed unverified founding date and location claims from the ARC homepage structured data and copy.
- Changed primary navigation naming to `ARC. Creatives`.

### SIGNAL. by SIRYUS

- Added a full local preview at `/signal`.
- Used the supplied Paths identity, graphite, warm stone, and red direction.
- Built the approved story, strategy, campaign, email/CRM, content, and measurement structure.
- Used an honest work section instead of fabricated clients, results, or case studies.

### SEO, routing, media, and quality

- Removed manual sitemap `customPages` duplication.
- Excluded legacy redirected route families from the generated sitemap.
- Expanded the Cloudflare redirect manifest with verified historical aliases.
- Marked duplicate legacy blog, service, community, and SIRYUS A.M landing routes noindex while source content remains preserved.
- Added `IMAGE_CREDITS.md` and documented unverified rights instead of assuming licenses.
- Fixed all Astro check hints.
- Confirmed the rebuilt parent, A.M, and SIGNAL. pages have one H1 and no mobile horizontal overflow at 390 pixels.

## Still requires external confirmation

- Final apex versus `www` canonical host.
- Cloudflare Pages or Workers project configuration and preview hostname. Current Astro 6 guidance says the Cloudflare adapter no longer targets Pages, while this static build does not need an adapter.
- DNS, email records, Pages project settings, environment variables, and Sanity CORS. None were changed.
- Sanity exports, drafts, document IDs, and media rights inventory.
- Verified ARC. Creatives and SIRYUS A.M DSP profile URLs.
- PAVO Create company-level logo. The stored PAVO files appear to be product marks.
- Formspree delivery, recipient ownership, newsletter audience segmentation, and production consent records.
- Final public decision for the Hidaya Morgan archive and Acoustic Rwanda 301 versus 410 behavior.
- Legal approval for privacy, cookie, and terms updates.

## Release boundary

The repository can be built and previewed locally. Production release remains blocked until the external confirmations above are resolved and the user explicitly approves a specific deployment and DNS plan.
# Decisions and progress

## 2026-11-02: independent brand applications

- The prior combined root application did not create enough distance between the brands.
- `apps/siryus`, `apps/am`, `apps/signal` and `apps/arc` are now independent pnpm workspace applications.
- Root `pnpm dev` opens SIRYUS. Brand-specific commands are `pnpm dev:hub`, `pnpm dev:am`, `pnpm dev:signal` and `pnpm dev:arc`.
- ARC was copied mechanically so its approved design remains available without visual restyling.
- The former root application remains in place as migration evidence until every legacy route and Sanity query is reconciled. It has not been deleted.
- No commit, deployment or DNS change was made.

## Design correction

- SIRYUS now opens directly into four clickable image shards.
- SIRYUS A.M now uses a bright music-editorial system with its own font pairing and routes.
- SIGNAL. now has a premium light agency system and separate Services, Approach, Work, Insights, About and Contact pages.
- No grey text is part of the three new systems.
