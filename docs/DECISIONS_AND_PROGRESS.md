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

## 2026-11-02: favicons from real logos and portal rebuild

Favicons
- `pnpm icons` (`scripts/build-brand-icons.mjs`) now builds every favicon from the original files in `logos/`, so icons can be regenerated when a logo changes.
- SIRYUS: the double star taken from the Siryus Creative Media Ltd vector master, with strokes thickened so it reads at 16px. It sits on a white tile so it works in light and dark browser tabs.
- SIRYUS A.M: the coloured app-tile mark cropped from `SIRYUS-A.M-PNG-coloured.png`. This replaces an invented "A" letterform SVG, which was deleted.
- SIGNAL.: the approved `logos/SIGNAL/signal-favicon-*` exports. This replaces an invented SVG shape, which was deleted.
- ARC. Creatives: the dark-background logo (white "arc.") on ARC's near-black. The earlier icon had white lettering on a transparent background, which disappeared in light tabs.
- Each site ships `favicon.ico` (16/32/48), `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` and, except ARC, `site.webmanifest`.

SIRYUS portal
- The header uses the real Siryus Creative Media Ltd lockup (`brand/siryus/lockup-black.png`) instead of typed text.
- Every shard uses the same slant offset, so the gaps stay parallel when one expands.
- Each card shows its real mark above the name in that brand's own typeface: Cenzo (A.M), Unbounded (ARC.), DM Serif Display (SIGNAL.). PAVO Create uses Sora and shows no logo until PAVO Create supplies one. `NEEDS CONFIRMATION`: PAVO Create typeface.
- ARC. now uses its dark-background logo straight on the image, so "arc." is legible.
- Card numbers were removed because the four worlds are not a sequence. "Enter a different world." was removed as a standalone line.
- The carousel images change in a left-to-right ripple. Small progress ticks in each brand's accent show the carousel position.
- Hover or keyboard focus widens one world and turns the other three greyscale. The footer shows the destination domain.
- Responsive layouts: 4 interlocked shards (1100px and up), a 2 x 2 interlock (700 to 1099px), and 4 diagonal bands that fill a phone screen.
- Reduced motion shows one still image per world with no entrance motion.
- `og.png` and social meta were added.

Known issues, not changed
- ARC broken links: resolved later the same day (see below).
- Resolved later the same day: see "Fixes, 404 pages and more parent doodles".

## 2026-11-02: user corrections and parent decoration

- Subdomains corrected everywhere: SIRYUS A.M `artists.siryushub.com`, ARC. `collective.siryushub.com`, SIGNAL. `growth.siryushub.com` (portal links, app `site` configs and the route matrix).
- SIRYUS A.M now uses the white logo (`SIRYUS-A.M-PNG-WHITE.png`) for its favicon and portal mark, not the lime version.
- SIGNAL.'s period is circular, matching the approved lockups. The earlier "square period" rule in AGENTS.md and the docs was updated to match.
- The parent favicon is the Siryus Creative Media Ltd star, not the SIRYUS A.M hexagon. These are separate logos.
- Parent decoration: a dotted double orbit (echoing the double outline of the logo star) frames the worlds, a small SIRYUS star travels it every 80 seconds, four outline sparkles twinkle in the open space, and print crop marks frame the stage on tablet and desktop. All are decorative (`aria-hidden`), and reduced motion stops the travelling star and twinkles.

## 2026-11-02: fixes, 404 pages and more parent doodles

Fixes
- pnpm: the pinned pnpm 12.15.0 ships a native binary that its Windows launcher cannot start. `packageManager` is now `pnpm@11.25.0`, which reads the same lockfile (format 9.0). `pnpm install --frozen-lockfile`, `pnpm build` and `pnpm check` all pass, and the lockfile is unchanged.
- ARC. home links pointed to `/arc`, which does not exist on the standalone ARC. site. They now point to `/`, and the nav "Home" active state follows.
- ARC. primary bridge pill: a later override stripped its background and left dark text on a dark band (also visible on About). It now uses the ARC. accent colour, like the other pills. No other ARC. styling changed.
- A link check over every built page in all four apps reports no missing internal targets.

404 pages (each site's own design)
- SIRYUS: "This star isn't on our map." in Marcellus, with the same orbit and doodles, links to the four worlds in their brand fonts, and a way back home. Marked `noindex`.
- SIRYUS A.M: "This track isn't on the record." with a spinning record and a numbered tracklist of real pages, in A.M's Cenzo, blue, coral and yellow.
- SIGNAL.: "Signal lost." with broadcast rings rippling from the round red dot, plus editorial page rows in DM Serif Display.
- ARC. Creatives: "Lost, but not for long." It reuses ARC.'s own hero, glass panel and bridge pills, and gets the same reveal script as other ARC. pages.

Parent refinements
- Shared parts moved into `components/Head.astro`, `components/Cosmos.astro` and `data/worlds.ts`, so the homepage and 404 stay in sync.
- New doodles: a constellation that draws in, a ringed planet, a crescent moon and an occasional shooting star. The inner orbit now draws itself on load. Phones keep the moon and sparkles only. Reduced motion shows every line already drawn, with nothing moving.

Still waiting on the user
- PAVO Create logo, typeface and product imagery. The card uses Sora and stock photos until then.

## 2026-11-02: production SEO

- Every site now has a canonical URL on its own host, Open Graph and Twitter tags, a 1200 x 630 share image, `robots.txt` pointing to its sitemap, `_headers` with security and caching rules, and `noindex` on 404 pages and `*.pages.dev` previews.
- Share images are designed per brand and rendered by `pnpm og` (`scripts/build-og-images.mjs`) with each brand's fonts, logo, photography and copy. ARC. articles and events use their own Sanity cover image, requested as JPEG.
- Structured data: SIRYUS describes Siryus Creative Media Ltd with SIRYUS A.M, ARC. Creatives and SIGNAL. as brands. PAVO Create is left out, so no ownership is claimed. A.M and SIGNAL. each describe their organization, with Siryus Creative Media Ltd as parent, plus their WebSite.
- ARC. canonical, schema and share URLs moved from `www.siryushub.com/arc` to `collective.siryushub.com`. Its "Back to" links now go to `siryushub.com` and read "Back to SIRYUS".
- ARC. had been building without Sanity settings and showed developer placeholder text on Journal, Events, FAQ and Supporters. `apps/arc/.env.local` now holds the public Sanity identifiers, and ARC. builds 28 pages, including 14 articles and 2 events. Long CMS excerpts are trimmed to about 160 characters for meta tags only.
- Old `www.siryushub.com` URLs have 301s in `apps/siryus/public/_redirects`. ARC.'s `_redirects` now holds only rules for its own host.
- Privacy, terms and cookie pages were carried over word for word to `siryushub.com`, kept `noindex` and out of the sitemap, and linked from every site's footer. ARC.'s newsletter collects email addresses, so these must stay live.
- Thin page descriptions on A.M and SIGNAL. were rewritten.

NEEDS CONFIRMATION before the apex moves
- The three old A.M blog articles have no new home yet. They redirect to the A.M Journal page, which loses their individual search ranking unless the articles are rebuilt on `artists.siryushub.com`.
- Old `/contact` and `/services` redirect to the SIRYUS homepage.
- The legal text dates from March 2025 and names Nigeria as the place of incorporation. Owner review is needed.

## 2026-11-02: first Cloudflare Pages deployment

- Deployed by direct upload to the SIRYUS Cloudflare account (siryus.marketing). Projects: `siryus-hub` (siryus-hub-2i3.pages.dev), `siryus-artists`, `siryus-growth` and `siryus-collective` (each at `<name>.pages.dev`). No custom domains or DNS records were changed.
- This machine has a `CLOUDFLARE_ACCOUNT_ID` variable for a different account. Pass `CLOUDFLARE_ACCOUNT_ID=0d135b4b04c36b381108243eb7828b8c` when deploying SIRYUS.
- All apps now build `page.html` files with `trailingSlash: 'never'`. Cloudflare serves `/about` directly, and links, canonicals and sitemaps all use the same slash-free URL. Before this, ARC. canonicals pointed at URLs that redirected.
- Verified live: pages return 200, unknown paths return the custom 404 with status 404, legacy URLs 301 to their new homes, and every `pages.dev` response carries `X-Robots-Tag: noindex`.

## 2026-11-02: A.M and SIGNAL. rebuilt, custom domains live

Domains and builds
- The user connected `siryushub.com`, `www`, `artists.`, `growth.` and `collective.` to the four Pages projects. All verified live.
- The Git-connected `siryus-hub` build failed: it ran `npm run build` at the root and published the legacy root `dist`. Changed to build command `pnpm --filter @siryus/hub build`, output `apps/siryus/dist`.
- `siryus-artists`, `siryus-growth` and `siryus-collective` are direct-upload projects, which Cloudflare cannot connect to Git. `.github/workflows/deploy-sites.yml` builds and deploys whichever of them changed on push to `main`, by hand from the Actions tab, or on a Sanity `repository_dispatch` (`sanity-publish`). It needs the repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

SIRYUS A.M (artists.siryushub.com), rebuilt
- Positioned as music management and a creative collective, not only artist management. Services follow the user's distribution agreement (Annex A and B) without prices: distribution, artist profiles, release strategy, playlist pitching with no placement promises, content strategy, marketing plans, campaign management, reports, artist branding, production with Jlinez, career sessions, and management by invitation. Promises published: artists keep their masters, no hidden fees, artists approve budgets, artists see the numbers.
- Identity from the approved business card and logo: charcoal `#313131`, lime `#d1f344`, white; Cenzo display and Montserrat body (both self-hosted woff2); hexagons and the waveform badge as motifs.
- Content comes from the A.M Sanity project (`h16wl0pr`, the `studio/` folder): roster (Max Prodigy and Jlinez only), projects (Indiba Project Series, The Abditory Sessions; Acoustic Rwanda excluded), and the three A.M journal posts, each with its own page. `studio/` now defaults to that project ID.
- Artist photos: the Sanity portraits did not match the artists' official Spotify profiles, so the site uses the Spotify profile images (self-hosted, see IMAGE_CREDITS.md). NEEDS CONFIRMATION: replace with approved press photos and update Sanity.
- The collective's own releases and profiles (Spotify, Audiomack, YouTube, Instagram @siryus.am, TikTok, X) were verified live and appear on Home and Projects. The business card's `siryus_am` Instagram handle is wrong; `siryus.am` is correct.
- Old siryushub.com artist, project and A.M post URLs now 301 to their exact new pages.

SIGNAL. (growth.siryushub.com), rebuilt
- Graphite, warm stone and red; DM Serif Display (echoing the serif wordmark) with Inter. Brand doc suggested Sora; changed because the approved wordmark is a serif. A transparent light-background lockup is generated from the approved reference by colour-to-alpha in `pnpm icons`.
- The Paths drawn as a once-only convergence animation. Marketing photography from Unsplash replaced the generic workshop images, at the user's request.
- No case studies are claimed; the Work page lists the problems SIGNAL. takes on. Insights redirects home (302) until there is writing.

Shared
- `shared/astro/Return.astro`: a "Back to SIRYUS" strip and footer link with the SIRYUS star, styled per brand. ARC.'s existing links gained the star in ARC. orange.
- `shared/contact.ts`: Pages Function behind A.M and SIGNAL. contact forms. Sends through Mailjet from `noreply@siryushub.com`: a notification to the brand inbox (Reply-To the visitor) and a branded acknowledgement to the visitor (Reply-To the brand inbox). Honeypot and timing checks. Needs `MAILJET_API_KEY` and `MAILJET_SECRET_KEY` as secrets on `siryus-artists` and `siryus-growth`; until then it asks people to email instead.

Speed
- All fonts self-hosted as woff2 (Google Fonts removed from the hub). Hub, A.M and ARC. heavy photos re-encoded. Unused legacy files removed from the hub and ARC. apps (originals stay in the root `public/` and `src/`).
- Pages are wrapped in Cloudflare `email_off` markers so Email Obfuscation no longer injects a script.
- Lighthouse mobile, live A.M home: performance 65 to 78, accessibility 100, SEO 100. The largest remaining cost is Cloudflare's Bot Fight Mode JavaScript detection script (about 1.4 s of main-thread time), a zone setting for the owner to decide.

## 2026-11-02: A.M and SIGNAL. redesigned as standalone agency sites; legal rewritten

Owner feedback: the first rebuild felt bland and template-like, A.M used lime when the brand is white, the site was built around agreement terms instead of services, and Jlinez was wrongly presented as a producer for hire.

- SIRYUS A.M: black and white identity (white mark), Cenzo and Montserrat. Motion hero (hexagon portrait carousel, rotating waveform badge from the logo, equaliser, outlined A.M, SIRYUS orbit and sparkles), services marquee, hover-preview service list, packages, roster, the collective's releases, parallax features and a closing call to action. 26 pages: nine service pages, a packages page, a music page with the collective's Apple Music catalogue (Tarama, LAVO, Nyongorera, Me & You, and two features on LEVITATE), artists, projects, journal, about, Book a meeting, 404. Services follow Annex A plus distribution and management; no prices; every CTA is Book a meeting. Music scenes are licensed Unsplash photos shown in black and white, colour on hover.
- SIGNAL.: same agency structure in graphite, stone and red with DM Serif Display and Inter. Hero: The Paths draw in and the meeting point broadcasts rings, over the billboard photo and an outlined SIGNAL. wordmark. Six service pages, ways to work (project, campaign, partnership), approach, work, about, Book a meeting, 404.
- Shared motion in `shared/motion.ts`: word-split headline reveals, scroll reveals, parallax, scroll-linked hero fade and cursor-following previews. Content shows without JavaScript; a 2.5 s fallback reveals everything if the script fails; reduced motion turns it all off.
- Indiba: Winny Ezeme was a facilitator (winner of The Gospel Icons Africa 2023), not a participant. Writing to the live Sanity dataset was blocked in this session, so the A.M build corrects the two sentences in `apps/am/src/lib/sanity.ts`. NEEDS OWNER ACTION: make the same edit in the Studio.
- ARC. music page lists its releases from Apple Music (BAGAJIYA: The Remix Collection with Jlinez; Me & You with SIRYUS A.M and Jlinez) with Spotify and Apple Music links and official artwork.
- Hub: card hover rebuilt. Slanted gaps belong to no card, so moving between cards dropped the hover and the row flickered; a pointer controller now keeps the open card open until the pointer leaves the row. Photos keep one fixed size so they no longer rescale every frame, and the dimming filter runs on its own layer. The planet doodle moved clear of the legal links and footer text sits on paper so the orbiting star passes behind it.
- Privacy Policy, Terms of Use and Cookie Policy rewritten on the owner's request, based on an audit of what the sites actually collect: Mailjet contact forms, Formspree for the ARC. Letter, Cloudflare hosting and security cookies, ARC.'s theme in local storage, no advertising or cross-site tracking. Built on the Nigeria Data Protection Act 2023 with GDPR and UK GDPR rights, NDPC complaint route, retention periods, transfers, breach notice, governing law of Nigeria with FCT Abuja courts. NEEDS CONFIRMATION by a Nigerian lawyer before relying on it, including the ₦100,000 liability cap and the company's RC number and registered address, which are not stated.


## 2026-11-03: distinct agency designs, alumni, responsiveness, ARC. refresh
- Owner rules recorded: no pill buttons, no eyebrow labels above headings, no middle dots, A.M and SIGNAL. must not share a layout, SIGNAL. always written with its red full stop. Commits are made only when the owner asks.
- SIRYUS A.M rebuilt as "liner notes": white paper, black ink, Cenzo and Montserrat. Hero is a record sleeve (B&W artist portraits) with a spinning record sliding out on scroll and a "now playing" bar. Services read as a tracklist (Side A Release, Side B Grow, Side C Build); roster as stacked full-height panels; records sleeve out on hover. Only real photos of Max Prodigy, Jlinez and Hidaya Morgan.
- Alumni: new Studio fields on `artist` (relationship: current, alumni or hidden; alumniPeriod; alumniNote) and a Studio structure with Current roster and Alumni lists. The site reads them and falls back to Hidaya Morgan as alumna until the Studio is filled in. NEEDS OWNER ACTION: the Sanity CLI on this machine is signed in to an account without access to project h16wl0pr, so the schema could not be deployed or Hidaya's document updated. Run `npx sanity deploy` in `studio/` and set Hidaya Morgan to Alumni.
- SIGNAL. rebuilt as "front page": graphite, warm stone and red, DM Serif Display and Inter. Kinetic headline ("Make them listen. care. remember. act.") beside a moving wall of campaign photos, a manifesto that lights up word by word on scroll, a magazine grid of services, a red progress line through the approach, and a red closing page. The Paths animation was removed.
- Responsiveness: ARC. nav switches to its menu button below 1180px (the ten links wrapped before); ARC. content gutters widened; legal pages no longer overflow on phones and their tables stack into labelled rows; hub "Back to SIRYUS" squared off.
- ARC. refresh: rules applied (pill buttons squared, middle dots removed, hero eyebrow labels, glass panels and glow gradients removed, numbering on non-sequential lists removed). Home, About and Community made photo-led with much shorter copy; Community was rendering unstyled because it reused home-only classes, now fixed with a shared `arc-x.css`.
- Hub: SIGNAL. card full stop no longer wraps under the wordmark; A.M card accent is white and shows only A.M artists.
- www.siryushub.com: no DNS record exists after the custom domain was removed. NEEDS OWNER ACTION in Cloudflare (DNS record plus a redirect rule); the wrangler login has no zone permissions.
