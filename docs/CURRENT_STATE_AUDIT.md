# Current State Audit

Audit date: 2026-11-02  
Branch: `phase-1-pnpm-static-foundation`  
Scope: Phase 0 only. No application code, content, routes, assets, CMS data, deployment settings, or DNS records were changed.

## Executive summary

The repository is a working Astro 6 static site with one web application and two separate Sanity Studio packages. It builds successfully and already contains an initial parent SIRYUS gateway, a substantial legacy SIRYUS A.M experience, and the most complete independent brand implementation under `/arc/*`.

The current site is not ready for release against the approved ecosystem specification. The new parent gateway contains a critical ownership error by calling PAVO a SIRYUS product. It also uses an unapproved hero line, treats SIGNAL. as undefined despite the supplied brand direction, and has a broken mobile composition in the saved 2026-11-01 proof. Legacy routes still present SIRYUS as a broad agency, duplicate articles across multiple canonical URLs, mix brand navigation, and retain design patterns that the project rules prohibit. Cloudflare static routing files now exist, but the repository contains no committed Wrangler or Cloudflare Pages project configuration and no live Cloudflare state was verified.

Phase 1 should repair the parent facts and mobile layout first, establish one authoritative route registry, and stop duplicate content from being built and indexed. It should not restructure the repository or delete legacy content.

## Evidence and inspection boundary

Inspected:

- `AGENTS.md` and every Markdown file in `docs/`, including `docs/CODEX_MASTER_PROMPT.md`.
- Current branch, working tree, recent commits, tracked-file inventory, package files, Astro configuration, Vercel configuration, Cloudflare static files, source routes, components, layouts, styles, public assets, logos, scripts, both Sanity Studios, schemas, clients, queries, and environment variable names.
- Generated `dist/` output after a fresh frozen pnpm install and production build.
- Saved desktop and mobile homepage evidence in `artifacts/siryus-home-desktop-final.png` and `artifacts/siryus-home-mobile-final.png`.

Not inspected or changed:

- Secret values in `.env.local` were not read. Only variable names were listed.
- No Sanity dataset export or draft inventory was performed. That requires a protected export path and should precede CMS migration.
- No Cloudflare dashboard, DNS zone, Pages project, Vercel dashboard, Formspree dashboard, analytics account, or live deployment was accessed.
- The public site and external DSP profiles were not used as sources in this audit. Live availability and ownership remain `NEEDS CONFIRMATION` where noted.
- Browser interaction was not rerun in Phase 0. The visual findings use the checked-in screenshots and source inspection. A current Playwright pass is required after the first approved repair.

## Git and repository state

- The working tree was clean before the audit and remained clean after install and validation.
- `HEAD` is `aa349e2` on `phase-1-pnpm-static-foundation`, three commits ahead of `main` at `c54d9a7`.
- Recent branch work added the pnpm workspace, the Indiba historical note, and public security/cache headers.
- The branch is already the isolation point for this work. No additional branch or checkpoint was created because Phase 0 only adds the two requested audit documents. Obtain approval before a commit.
- Ignored local directories include `.vercel/` and `.wrangler/`; neither exposed a readable committed project configuration during this audit.

## Technical baseline

| Area | Current state | Assessment |
|---|---|---|
| Web framework | Astro `^6.1.1`, strict TypeScript, static output | KEEP |
| Package manager | `pnpm@12.15.0`, root workspace includes `studio` and `studio-arc` | KEEP |
| Web build | `astro build` to `dist/` | KEEP |
| Primary CMS | `studio/`, Sanity 5, schemas for posts, artists, projects, studio content, team | KEEP, then type and ownership audit |
| ARC CMS | `studio-arc/`, separate Sanity 5 config and ARC schemas | KEEP |
| Hosting config | `vercel.json` still present; `public/_redirects` and `public/_headers` added | INVESTIGATE before Cloudflare cutover |
| Cloudflare project config | No committed `wrangler.toml`, `wrangler.json`, Pages Functions, or project manifest | MISSING / NEEDS CONFIRMATION |
| Canonical host | `https://www.siryushub.com` in Astro and most source | NEEDS CONFIRMATION against DNS and desired apex strategy |
| Forms | Formspree endpoints in parent contact, shared footer newsletter, and ARC subscribe | VERIFY consent, ownership, success/error behavior, spam handling |
| Analytics/ads | Base layout contains legacy Google Ads integration from `main` history | INVESTIGATE consent, necessity, and brand scope |

## What has already been implemented correctly

### Foundation

- `package.json`, `pnpm-lock.yaml`, and `pnpm-workspace.yaml` now follow the pnpm-only requirement.
- `vercel.json` now uses `pnpm install --frozen-lockfile` and `pnpm build`.
- Astro remains static and the repository has not been replaced or converted into a new framework.
- Both Sanity Studios remain separate and retain distinct environment variable names.
- The web client uses the main Sanity project for A.M-era content and a separately configurable ARC client.
- Main artist queries restrict the active public roster to `max-prodigy` and `jlinez`.
- Hidaya Morgan's generated detail page is explicitly labelled as a legacy archive, and the Indiba detail page explains that historic participants are not current roster members.
- `/home` performs a 301 redirect to `/` at runtime.
- `public/_headers` includes basic security headers and cache rules.

### Parent gateway

- `src/pages/index.astro`, `src/layouts/EcosystemLayout.astro`, and `src/components/ecosystem/*` establish a small parent-specific shell rather than reusing the legacy agency layout.
- Parent navigation is already reduced to About and Contact.
- The homepage uses a direct four-card composition and provides visible focus styles.
- `src/pages/about.astro` and `src/pages/contact.astro` use the parent layout instead of the mixed legacy navigation.

### ARC. Creatives

- ARC has a distinct route family, layout, palette, typography, imagery, footer, queries, Studio, events, community, FAQ, supporters, subscription, and editorial pages.
- ARC is described as a faith-rooted community rather than a generic agency.
- ARC routes include skip navigation, menu state attributes, canonical metadata, social metadata, and JSON-LD.
- Five migrated ARC-owned articles build under `/arc/blog/*`.

## Critical incorrect implementations

### 1. PAVO ownership and naming are wrong

Files:

- `src/data/ecosystem.ts`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/index.astro`

The parent card and About page call PAVO “A SIRYUS product.” The approved relationship is PAVO Create as a separate external company at `https://pavocreate.com`, with PAVO as one product inside it. The contact form also offers PAVO as though it were an internal SIRYUS destination. This is the highest-priority factual repair.

Correction: show one `PAVO Create` external card with clear off-site behavior, use an approved PAVO Create asset if available, and remove PAVO from SIRYUS enquiry routing unless the user explicitly confirms shared handling.

### 2. Parent positioning and hero copy do not match the approved source

Files:

- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/data/ecosystem.ts`

The homepage H1 is `Ideas need the right home.` The mandatory parent line is `Different Worlds. One Creative Universe.` The current summary also frames SIRYUS as serving artists, creators, and creative teams without explaining the approved independent-world relationship. The About description repeats the incorrect PAVO relationship.

Correction: use the approved H1, revise the short supporting copy, and keep legal company naming to the footer, About, and legal contexts.

### 3. SIGNAL. is treated as undefined after its direction was approved

Files and assets:

- `src/data/ecosystem.ts`
- `src/pages/about.astro`
- `logos/SIGNAL/*`
- `docs/BRAND_SIGNAL.md`

The parent card says SIGNAL. is still taking shape and uses text instead of supplied identity assets. The repository now contains reference boards and derivative logo exports, and the brand direction, name, role, palette, and core promise are documented. The destination may remain pending, but the identity should not be described as undecided.

Correction: present `SIGNAL. by SIRYUS` accurately, use a reviewed supplied asset, distinguish “brand defined” from “site not launched,” and do not enable the proposed subdomain until it works.

### 4. Saved mobile evidence shows a blocking overlap

Evidence:

- `artifacts/siryus-home-mobile-final.png`
- `src/styles/ecosystem.css`

At the saved narrow viewport, the hero summary overlaps the H1 and becomes hard to read. Desktop spacing is strong but the mobile hero grid/positioning does not preserve a readable content order. This fails the mobile-first and no-overlap requirements.

Correction: rebuild the mobile hero flow as a single readable stack, then verify at 320, 360, 390, 768, 1024, and 1440 pixels with Playwright.

### 5. Canonical article duplication is built into `dist`

Files:

- `src/pages/blog/*`
- `src/pages/siryus-am/blog/*`
- `src/pages/arc/blog/*`
- `src/data/articleOwnership.ts`
- `public/_redirects`

All eight legacy articles are still generated under `/blog/*`, while three are also generated under `/siryus-am/blog/*` and five under `/arc/blog/*`. Every copy declares itself canonical. Cloudflare redirects may intercept the old URLs in production, but the duplicate HTML still exists, can behave differently on other hosts, and makes local/preview QA misleading.

Correction: create only one canonical full article per owner. Old `/blog/:slug` paths should be redirects, not independently generated canonical documents. Preserve IDs, dates, authors, and slugs during the move.

### 6. Sitemap output is inconsistent and contains duplicates

File: `astro.config.mjs`

The manual `customPages` list duplicates Astro-discovered URLs with non-trailing and trailing-slash variants. The generated sitemap also contains `/home/`, current Hidaya archive content, legacy parent services/projects routes, and other routes that need an explicit indexing decision. Legal pages are filtered from the XML sitemap even though they remain public.

Correction: replace manual `customPages` with a single approved route registry or rely on generated routes plus a precise filter. Exclude redirects, retired routes, duplicates, and any noindex archives.

### 7. A generated ARC link is broken

Files:

- `src/pages/arc/blog/index.astro`
- `src/pages/arc/blog/page/[page].astro`

The generated `/arc/blog` page links to `/arc/blog/page/2`, but no second ARC pagination page is emitted. The local output crawl found this as the only missing local `href` or `src` target.

Correction: render pagination only when the generated page count is greater than one, and verify pagination from actual combined ARC-owned content.

## Legacy architecture and design violations

### Mixed parent and A.M experience

Files:

- `src/layouts/BaseLayout.astro`
- `src/components/Navigation.astro`
- `src/components/SimpleSiteNav.astro`
- `src/components/Sidebar.astro`
- `src/components/Footer.astro`

The legacy base layout mixes parent, A.M, ARC, services, projects, studio, community, journal, social profiles, and newsletter paths. Parent-facing pages still inherit a large SIRYUS A.M social/footer identity. The approved architecture needs separate parent, A.M, and ARC navigation systems.

Disposition: keep the legacy system functional during migration, then MOVE A.M-owned pages into an A.M layout and retire the mixed layout from public parent routes.

### Parent presented as a broad agency

Files:

- `src/pages/services.astro`
- `src/pages/community.astro`
- `src/pages/studio.astro`
- `src/components/HeroSection.astro`
- `src/components/CreativeMediaSection.astro`
- `src/components/SiryusHubSection.astro`

These pages and components present SIRYUS as directly selling artist management, brand marketing, creative production, content strategy, and community services. The parent should be a clear gateway. Artist-facing work belongs to A.M, general marketing and growth belong to SIGNAL., ARC remains a collective, and PAVO Create remains external.

Disposition: MOVE verified A.M content, classify verified SIGNAL. capabilities before publishing them, and RETIRE the generic parent service catalogue through intentional redirects.

### Prohibited visual patterns remain widespread

Examples:

- Eyebrows: `src/components/SiryusHubSection.astro`, `src/pages/blog/index.astro`, `src/pages/arc/events/index.astro`, `src/styles/arc-blog.css`.
- Pills/badges: `src/components/Navigation.astro`, `src/components/SimpleSiteNav.astro`, `src/components/Footer.astro`, `src/pages/projects/[slug].astro`, `src/pages/arc/events/*`, `src/styles/arc-blog.css`.
- Legacy morphism/clay system: `src/styles/morphism.css`, legacy blog cards, community cards, and base-layout controls.
- Horizontal divider content type: `studio/schemaTypes/blogPost.ts` defines a `divider` object despite the no-divider rule.

Not every circular control is a prohibited pill. Icon-only controls may remain circular when justified. Text badges, rounded tag chips, pill navigation containers, and decorative divider content should be redesigned.

### Components and pages are too large

The line-length lint passes only because its ceiling is 1,500 lines. Several files are 600 to 1,082 lines, including `src/styles/blog.css`, `src/pages/arc.astro`, `src/pages/services.astro`, `src/pages/siryus-am.astro`, and multiple homepage/footer components. This is not an immediate build error, but it increases migration risk and makes brand boundaries harder to enforce.

Correction: split files only when touching their behavior in an approved phase. Do not perform a broad refactor solely for line count.

## Content and brand audit

| Brand/content area | Current state | Required action |
|---|---|---|
| SIRYUS parent | New minimal shell exists; wrong H1 and PAVO relationship; incomplete SIGNAL presentation | REWRITE facts and mobile composition |
| SIRYUS A.M roster | Query restricts active roster to Max Prodigy and Jlinez; Hidaya archive is labelled | KEEP safeguards; MOVE routes under approved A.M structure |
| Winny Ezeme | Appears only in historical Indiba fallback text in inspected source | KEEP only as verified historical participant, never current roster |
| Hidaya Morgan | Built as legacy archive and mentioned in historical Indiba context | INVESTIGATE index/noindex and final redirect policy |
| Acoustic Rwanda | No generated detail route; old path redirects to `/projects` | RETIRE, but decide 301 target versus 410 based on backlink/history evidence |
| Indiba Project Series | Builds with fallback and historical clarification | MOVE to A.M projects, preserve canonical history |
| ARC. Creatives | Strong independent route family; naming often shortens to `ARC` or `ARC.` | KEEP structure, correct full-brand usage and visual rule violations |
| SIGNAL. by SIRYUS | Assets and source-of-truth docs exist; no route or Studio | Parent card now, standalone phase later; no fake case studies |
| PAVO Create | PAVO product logos exist, but no confirmed PAVO Create company lockup was found | External card; asset suitability is `NEEDS CONFIRMATION` |

## Sanity and data flow audit

### Primary Studio

Files: `studio/sanity.config.ts`, `studio/schemaTypes/*`, `src/lib/sanity.ts`, `src/lib/queries.ts`.

- Studio name/title now identify SIRYUS A.M.
- Schemas cover `blogPost`, `artist`, `project`, `studioContent`, and `teamMember`.
- Artist queries explicitly constrain current roster slugs and require `active == true`.
- Several query functions catch failures and return empty arrays, while pages use local fallback content.
- Types are handwritten. There is no Sanity TypeGen script, generated query types, or schema extraction command.
- `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` are configured locally by name; token values were not inspected.
- The blog schema still allows a horizontal divider object and categories that mix A.M, community, and generic marketing ownership.

### ARC Studio

Files: `studio-arc/sanity.config.ts`, `studio-arc/schemaTypes/*`, `src/lib/sanityArc.ts`, `src/lib/queriesArc.ts`.

- Separate ARC configuration and schemas are preserved.
- ARC project variables are optional; they were not present by name in the inspected root `.env.local`.
- When ARC is not configured, ARC queries return empty arrays. ARC blog pages then pull owner-classified articles from the primary dataset.
- No ARC event details were emitted in the current build, and supporters/FAQ content may be fallback-only. Actual dataset counts and drafts remain unknown.

### CMS blockers before migration

1. Export both datasets, including drafts and asset references, with user approval and a secure destination.
2. Record document IDs and ownership for every post, event, supporter, FAQ, artist, project, release, studio item, and team member.
3. Add TypeGen and typed queries before changing schemas.
4. Confirm Sanity CORS origins for local, preview, Cloudflare Pages, and final subdomains.
5. Do not merge datasets or duplicate full articles into a parent journal.

## SEO and routing audit

- Static build emitted 49 HTML pages.
- `/home` builds a redirect document and is also present in the sitemap. Redirect URLs should not be indexed.
- `/blog/*` duplicates the new A.M and ARC article URLs.
- The sitemap has duplicate slash and non-slash entries because of `customPages`.
- `lastmod` is the build time for every entry rather than the content modification date.
- `public/_redirects` contains the first content-owner redirect map, but legacy `.htaccess` has additional historical aliases that Cloudflare will ignore.
- The Apache-only aliases are not fully copied into `_redirects`, so Cloudflare migration would lose routes such as `/max-prodigy`, `/hidaya-morgan`, `/siryus-blog`, and `/indiba-project-series`.
- `robots.txt` references the correct generated sitemap index and disallows `/studio/`, but `/studio` is a public creative-work page rather than the Sanity Studio. This directive is semantically misleading and may suppress a route that currently contains public content.
- Parent `EcosystemLayout` supplies canonical and basic Open Graph metadata but no OG image, Twitter title/description/image, or structured data.
- The 404 output has no canonical, which is acceptable, but its exact hosting behavior needs Cloudflare verification.

See `docs/ROUTE_MIGRATION_MATRIX.md` for the route-by-route disposition.

## Forms, integrations, and privacy

- Parent contact posts directly to Formspree endpoint `xbdpynod`.
- The legacy footer newsletter and ARC Letter both post to Formspree endpoint `xaqljrjb`. Sharing one endpoint may mix consent and brand audiences.
- ARC subscribe promises community updates and event announcements, while the legacy footer describes broader SIRYUS updates. Consent segmentation and data ownership are `NEEDS CONFIRMATION`.
- Form source includes honeypot fields and client success states, but live delivery, failure handling, accessibility announcements, and spam protections were not tested.
- Privacy copy says newsletter data is collected and not sold. Any material legal rewrite requires owner review.
- Social and email links are hard-coded across legacy components. Ownership and current validity require live verification before migration.

## Assets, imagery, and performance

- Approved/reference assets exist for SIRYUS, SIRYUS A.M, ARC, SIGNAL., and the PAVO product.
- No `IMAGE_CREDITS.md` exists. The repository does not document sources, photographers, licenses, or intended usage for stock/event imagery.
- ARC contains several large original-dimension JPEGs. File byte sizes are moderate, but responsive derivatives and explicit dimensions are inconsistent.
- Parent cards use fixed `1400x900` intrinsic dimensions even when the referenced source assets have different aspect ratios. This risks incorrect ratio reservation.
- The parent currently uses the PAVO and SIGNAL names as styled text instead of reviewed supplied assets.
- Google Fonts are loaded by the legacy layouts; font licensing and local-hosting strategy have not been documented.
- Motion code includes reduced-motion handling in parts of the legacy site, but the complete route set has not been tested for no-JS visibility, battery cost, or keyboard behavior.

## Validation results

Commands were executed with the pinned pnpm version through Corepack because `pnpm` was not directly available on the restricted PATH.

| Check | Result |
|---|---|
| `pnpm install --frozen-lockfile` | PASS, lockfile current across 3 workspace projects |
| `pnpm run lint:max-lines` | PASS, 91 files scanned, 1,500-line ceiling |
| `pnpm run check` | PASS with 0 errors and 3 TypeScript hints |
| `pnpm run build` | PASS, 49 pages generated, sitemap created |
| Generated internal target crawl | FAIL, `/arc/blog` links to missing `/arc/blog/page/2` |
| Desktop/mobile browser rerun | NOT RUN in Phase 0; checked-in screenshots inspected |

TypeScript hints:

- `src/layouts/ArcLayout.astro`: unused `inSubscribe`.
- `src/layouts/BaseLayout.astro`: inline `this.media` diagnostic hint.
- `src/scripts/splash.ts`: unused `currentOption`.

The passing build does not validate redirects, Formspree delivery, Cloudflare behavior, live Sanity drafts, accessibility, or visual correctness.

## Prioritized correction plan

### P0: factual and release blockers

1. Correct PAVO Create ownership, name, external link behavior, and contact routing in the parent data/pages.
2. Replace the parent H1 with `Different Worlds. One Creative Universe.` and use accurate supporting copy.
3. Present SIGNAL. by SIRYUS as defined but not yet launched, using a reviewed supplied identity asset.
4. Repair the parent mobile hero overlap and verify current desktop/mobile behavior in Playwright.
5. Remove the dead ARC pagination link.

### P1: route, canonical, and content ownership safety

1. Establish one typed route/redirect registry used by sitemap, navigation, and migration documentation.
2. Stop generating duplicate `/blog/*` article pages; keep redirects to the canonical A.M or ARC owner routes.
3. Add all verified legacy Apache aliases to Cloudflare `_redirects`, and decide Acoustic Rwanda 301 versus 410.
4. Remove redirect and retired routes from the sitemap; remove slash duplicates; use content dates where available.
5. Decide whether the Hidaya archive remains indexable or becomes a historical noindex/redirect destination.

### P2: brand separation without repository restructure

1. Introduce a dedicated A.M layout/navigation/footer and migrate verified A.M routes in small steps.
2. Keep ARC routes and Studio intact while correcting full-brand naming, pills, eyebrows, and missing music/DSP navigation.
3. Retire generic parent services/community/studio positioning only after each piece has a verified owner and redirect.
4. Keep SIGNAL. at parent-card level until its standalone route/application phase is approved.

### P3: CMS, forms, and media safeguards

1. Export and inventory both Sanity datasets before schema/content migration.
2. Add Sanity TypeGen and typed query results.
3. Verify Formspree delivery, consent language, audience segmentation, accessible error states, and privacy alignment.
4. Create `IMAGE_CREDITS.md`, document rights, and introduce responsive image derivatives without deleting masters.

### P4: Cloudflare preview and full QA

1. Confirm Pages project settings, build command, output, environment variables, preview hostname, canonical policy, and Sanity CORS.
2. Test `_redirects`, `_headers`, 404 behavior, cache rules, and preview robots behavior on an actual preview.
3. Run Playwright at 360, 768, 1024, and 1440 pixels plus keyboard, reduced-motion, form, link, canonical, and overflow checks.
4. Request explicit approval before any preview deployment, production cutover, DNS change, Vercel retirement, commit, or push.

## Phase 0 exit decision

Phase 0 documentation is complete when this audit and the route migration matrix are reviewed. The recommended next implementation slice is limited to the P0 parent gateway factual fixes, the mobile hero repair, and the ARC pagination guard. No repository restructure, CMS migration, deletion, deployment, or DNS work is recommended in that slice.
