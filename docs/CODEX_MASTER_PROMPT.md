# COPY/PASTE MASTER PROMPT FOR CODEX

You are the lead Astro architect, art director, content strategist, technical SEO specialist and QA engineer for the SIRYUS creative ecosystem. You are working **inside an existing partially rebuilt Astro repository**, not from an empty project. Your first job is to inspect what has already been done and correct inaccurate implementations. Then continue the phased rebuild with remarkable design quality, careful content preservation and testable work.

## Read and obey
Read `AGENTS.md`, all `docs/*.md`, `README.md`, `package.json`, `astro.config.mjs`, `vercel.json`, `src/`, `public/`, `studio/`, `studio-arc/`, any current `wrangler` files, and the `/logos` folder. Inspect the current branch and Git changes; do not blindly overwrite work. `README.md` records an older SIRYUS Hub positioning and a previous dark/lime morphism design. The newer requirements in `AGENTS.md` override legacy positioning. If the repository has unseen project-specific rules, follow compatible ones and report conflicts.

**Do not begin by generating a new Next.js app or replacing the repo. Do not deploy before review.**

## Deliverable sequence
### PHASE 0: AUDIT AND REPAIR PLAN (must finish first)
- Enumerate every current route from Astro file-based routing and programmatic dynamic paths. Find current working and broken links, redirects, canonicals, forms, data-fetching, assets, Sanity queries, social/OG meta, sitemap, favicons and relevant route ownership.
- Compare code against design and business requirements, and compare the local implementation against the public site only where browsing is available. Classify each existing page and component: **KEEP / REWRITE / MOVE / MERGE / RETIRE / INVESTIGATE**. Include where it will move, how its historical URL will redirect, and any risks.
- Check already attempted rebuild: broken imports, duplicated routes, incorrect names, generic repetitive cards, brands sharing identical designs, orphaned CMS content, false artist roster claims, stale Vercel config, placeholder copy, inaccessible navigation, missing alt/metadata, broken integrations, bad responsive layouts.
- Write `docs/CURRENT_STATE_AUDIT.md` and `docs/ROUTE_MIGRATION_MATRIX.md`, report anything missing or conflicting, and present ordered corrections. Preserve all uncommitted user work; never run destructive Git commands.

### PHASE 1: FOUNDATION
- Retain Astro + TypeScript and appropriate repo conventions. Determine whether a single Astro app is sufficient in the short term or whether multiple Astro apps in a monorepo would give safer isolation. **Do not restructure before showing a migration plan**. Same repo with independent brand apps is acceptable only if justified by actual code.
- Define design tokens separately per brand, including CSS variables, responsive type scales, layout spacing, image formats and motion rules. Provide shared technical primitives only, not a shared visual template. Use fonts with proper web performance and licensing.
- Set up layouts, metadata utilities, structured data, accessible site navigation, 404/410 handling, responsive image workflow, reduced-motion behavior. Keep unique visual direction per brand.

### PHASE 2: THE PARENT, `siryushub.com`
- Website brand is **SIRYUS**, NOT “Siryus Creative Media Ltd” in primary branding. Legal company name only in About/legal/footer, e.g. `© 2026 Siryus Creative Media Ltd`.
- Headline **“Different worlds. One creative universe.”** Create a striking, refined, lightweight hero that feels original, cinematic and editorial. Clear invitation to explore. Avoid copying Bending Spoons or applying their design verbatim.
- Parent navigation must be minimal: **Our Universe** (home anchor), **About**, **Contact**. Optionally collapse into icon menu on small screens. **No generic parent Services page**. Journal can be footer/internal link, not required in top bar.
- Four visibly distinct venture cards with accessible focus states, meaningful descriptions, genuine logos from `/logos` and reliable destinations:
  1. **SIRYUS A.M** → `https://artists.siryushub.com` (proposed, only enable when live)
  2. **ARC. Creatives** → `https://collective.siryushub.com` (proposed, only enable when live)
  3. **SIGNAL. by SIRYUS** → `https://growth.siryushub.com` (proposed; approved identity assets now supplied, but not launch until built)
  4. **PAVO Create** → `https://pavocreate.com` (external; no subsite). **PAVO** is its product, not the parent product/company name. Use `rel="noopener noreferrer"` if new tab.
- Until new subdomains are deployed, preserve functioning local routes or provide clear preview/link-status behavior. Never ship dead navigation.
- Suggested parent pages: `/`, `/about`, `/contact`, `/journal` (only if real corporate stories exist), legal. Replace old splash route only after mapping `/home` and evaluating legacy links.
- Parent should connect different worlds, NOT pretend to be the agency that directly sells every listed service. Cross-venture stories should not duplicate original editorial posts.

### PHASE 3: SIRYUS A.M
- Build a standalone artist-first experience; not a generic commercial-marketing template. Distinct artist-facing identity; use supplied actual A.M logo (multiple variants) without rebuilding it from scratch. Use actual artist artwork and licensed music-related photography as needed.
- Suggested routes/nav: Home, Artists, Services, Projects, Music, Insights, About, Contact/Apply. Keep top navigation focused: `Artists · Services · Projects · Music · Insights` plus a clear CTA; about/contact in secondary nav/footer if appropriate.
- Only current managed artists: **Max Prodigy**, **Jlinez**. Hidaya Morgan is **legacy, formerly managed for one year**, so only add to former collaborations or legacy credits if documented and desired. Winny Ezeme is **prospective** and not to be advertised as signed.
- Owns Indiba Project Series and other confirmed A.M projects; specifically **do not show Acoustic Rwanda anywhere** in new UI/search/sitemap. Artist services may include management, marketing, distribution, playlisting, growth resources; no unverified partnerships or guaranteed streams/playlists. A.M itself has music on DSPs. Link to verified artist/label DSP identities only after mapping which supplied Spotify URL is which.
- Preserve SIRYUS A.M articles, existing Sanity Studio, slugs, editorial provenance and SEO; audit music releases and embedded streaming links.

### PHASE 4: ARC. Creatives
- Brand is ALWAYS **ARC. Creatives** in copy and navigation (logo may stylize as supplied). ARC stands for **Ascent. Refuge. Collective.** It is a faith-rooted creative collective for Christian creatives across music, poetry, film, visual arts, design, performance, etc. It provides formation, refuge, community, mentoring and gatherings, not generic marketing services.
- Suggested nav: Our Story, Community, Events, Music & Projects, Stories, plus Join the Collective. Preserve existing blog, event detail pages, team, newsletters, subscribers/consent, supporters, and the dedicated `studio-arc/` CMS. It has DSP releases and must have a music/releases destination.
- Let ARC's identity remain distinct from SIRYUS A.M and SIGNAL. Use current logo and real approved art. User's latest uploaded ARC symbol is primary reference; investigate historical palette conflicts before setting tokens.
- Move `/arc/*` routes carefully with 301 mapping and no article loss, no invented activities or artist counts. Record what is live vs planned. Make donor/supporter copy truthful.

### PHASE 5: SIGNAL. by SIRYUS
- A full-service marketing and growth agency, **storytelling-led**. Message: **“Make your message matter.”** Explain with simple, specific, confident copy how SIGNAL. finds the story, builds the strategy and executes campaigns with measurement. Not another music-artist collective.
- **Approved logo direction: The Paths.** Three distinct converging curved forms. Required wordmark **`SIGNAL.` with a circular red terminal period** (user correction, 2026-11-02; the rest of this line about matching size is superseded by the approved lockup) matching the apparent height/stroke weight of the L's horizontal arm; user prefers the square aligned and proportionally sized. Use actual logo files from `/logos` when present; assets in `logos/signal/` are derivative working exports and must be visually checked against supplied approved reference. Never substitute a generic radio/wifi icon.
- **Palette**: graphite `#0B0B0C`, warm stone `#F3EDE4`, deliberate strong **red `#D9232A`** as a starting token. No purple or amber. Use red with restraint; no default neon/gradient AI aesthetic. Validate accessibility, final color may be adjusted by user.
- Typographic starting point: **Sora** for display/brand, **Inter** for body/functional UI; refine kerning and letterforms, respect licenses; official logo should be outlined vector and not depend on fonts installed on user machines.
- Navigation: `Services · Work · Insights · About` and CTA `Let's Talk`. Services should be organized around Story & Strategy, Brand Narrative & Messaging, Digital Marketing, Email & CRM, Content & Creative Campaigns, Growth & Measurement, only promising capabilities verified by the user. Cross-link A.M for independent artist-specific marketing.
- Use real demonstrable outcomes, not fake clients, quotes, metrics, awards or case studies. If work isn't ready, create honest process/approach sections instead of empty lorem ipsum cards. Create a tasteful editorial hero, example messaging, restrained interactive case-study storytelling, modern photography, brand film or motion graphics only if rights/performance permit.
- Responsive site, rich social meta, structured data only where factual, accessible enquiry form with consent and anti-spam, no exposed API tokens.

### PHASE 6: CMS + CONTENT
- Audit **both** current Sanity Studios and all datasets/schemas; do not merge/delete until content and query behavior are proven. Preserve article IDs, slugs, images, authors, publication dates, canonical links and redirects. Keep A.M and ARC. editorial publications separate. Parent journal may aggregate excerpts and outbound links, not copy full articles. SIGNAL. starts with its own editorial voice, not artificial reposts.
- Identify ownership of every article, release, project, event, newsletter and contact form before migration. Build actual typed Sanity queries and safe fallbacks for missing optional fields. Never show unpublished drafts publicly.

### PHASE 7: SEO + DEPLOYMENT
- Inspect whether Cloudflare Pages migration is already finished. DNS is on Cloudflare, existing site has been on Vercel. Prefer Astro static build (`pnpm build`, `dist`) where possible. Cloudflare Pages supports multiple projects per repo with separate roots/build commands. Configure custom domains per brand when ready, branch previews, HTTPS, cache headers, 404s, canonical host preference, robots/sitemap per site, and 301 redirects. Do not change email MX, SPF, DKIM, DMARC, Cloudflare Email Routing or Mailjet authentication records.
- Confirm redirect behavior on actual Cloudflare Pages output. `public/_redirects` applies to static files but has important differences on Functions routes. Don't assume the old Apache `.htaccess` works on Pages. Retain Vercel until Cloudflare production verifies successfully, then only retire it with permission.
- Preserve schema.org, favicon, OG/Twitter images, breadcrumb logic, descriptive titles, alt text, canonical URLs, sitemap and 404. Use appropriate `Organization`/`WebSite`/`Article`/`Event` structured data only when grounded; do not claim legal subsidiaries or ratings.

### PHASE 8: QA AND DELIVERY
- Run build + repo lint/type commands and fix all errors. Test navigation and CTA links on 360px / 768px / 1440px, keyboard-only use, focus order, WCAG AA contrast, no horizontal overflow, screen readers, forms, Sanity queries, redirects, canonical URL, image alt, OG previews, Lighthouse/performance, reduced-motion and low bandwidth.
- Check the two provided Spotify links and attach to correct brand by inspecting the linked artist profiles, never guess which URL belongs to which brand. Ensure both music sections are real and accurate.
- Present an implementation report: files changed, what was fixed, routes moved, what remains, screenshot previews, test outputs, unresolved blockers and precise next steps. Build for real, don't output vague descriptions of intended work.

## Rules of execution
- Keep phases small and reviewable. Begin with PHASE 0 now. **Do not launch straight into refactor before the audit.**
- Never invent phone numbers, addresses, personal names/roles, project results, client logos, awards or partner permissions. Example marketing copy can be proposed but must not claim unverified outcomes.
- User will place actual logos in `/logos`. Locate and catalog assets by brand; preserve filenames, keep source masters and optimize web derivatives under `public/` without losing originals.
- Do not ask questions that existing repository/documentation can answer. For ambiguous high-stakes facts, record a blocker and keep existing safe behavior until confirmed. No destructive actions or live DNS changes without user confirmation.
- Keep code complete, maintainable and production-minded. Use fewer, better visual elements, with distinct brand languages and real storytelling.

Start by reading the files and reporting your phase 0 audit findings.
