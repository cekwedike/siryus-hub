# SIRYUS ecosystem: mandatory instructions for Codex

Read this file and every document in `docs/` **before changing code**. This repository has an existing Astro implementation and two Sanity Studio folders. The task is to audit, repair, and iteratively evolve the real project, **not** to start over blindly.

## Source of truth and priority
1. Explicit, most recent user instructions.
2. This `AGENTS.md` and the approved docs in `docs/`.
3. Verified current repository code and content, including Sanity schemas and migrations.
4. Public website for comparison, not as a substitute for repository inspection.
5. Existing README, which documents *old* positioning and styles. Do not mistake legacy design for approved design.

If a requirement conflicts, surface it clearly. Never silently invent or replace facts. Preserve all non-conflicting user work. Label uncertain details `NEEDS CONFIRMATION` in audit notes and use a safe, functional fallback.

## First action: inspect and diagnose
Before implementation, inspect `git status`, branch, package files, Astro config, `src/pages`, components, layouts, styles, `public`, redirects, `studio`, `studio-arc`, Sanity config, environment variable names, Cloudflare Pages configuration, and current deployed routes if access is available. Read all current docs and any pre-existing `AGENTS.md`. Assess which requested changes were already implemented, implemented incorrectly, or not started. Create `docs/CURRENT_STATE_AUDIT.md` with evidence, file paths, route inventory, blockers, tests and a repair plan. DO NOT overwrite an existing AGENTS.md without reconciling its instructions.

Make a backup branch or commit before significant refactors. Never delete original content/assets without reviewing and documenting their replacements. Never expose `.env.local`, tokens, API keys, secrets, private personal data, or production credentials. Do not push changes or change DNS/deployment without explicit approval.

## Non-negotiable identities
- The public **parent brand is `SIRYUS`**, not `Siryus Creative Media Ltd` as the homepage or navbar brand. Footer may say `© 2026 Siryus Creative Media Ltd`. Legal entity in About/Legal as appropriate. Parent positioning: **“Different worlds. One creative universe.”** Parent domain: `siryushub.com`.
- **SIRYUS A.M**: artist management, artist marketing, artist development, distribution, playlisting (no guaranteed placement claims), artist-growth kit, music and collective projects, including **Indiba Project Series**. Only **Max Prodigy** and **Jlinez** are *current* managed artists. **Hidaya Morgan** is an alumnus/legacy relationship (managed in the past for one year), not current. **Winny Ezeme** is a potential future signee, not signed. SIRYUS A.M has a DSP identity and its own editorial content and Sanity Studio.
- **ARC. Creatives** (always spell the full brand correctly): a faith-rooted multidisciplinary creative collective, “Ascent. Refuge. Collective.” Do not call it a generic marketing agency or music label. Preserve and respect its blog, Sanity Studio, events, people, community, supporters and its own music releases/DSP identity. Its audience includes Christian creatives across disciplines. Do not imply the parent is entirely faith-specific.
- **SIGNAL. by SIRYUS**: distinct marketing and growth agency, with **storytelling central to its approach**. Not just music marketing. Offer confirmed disciplines such as strategy, campaigns, email/CRM, content and copy, growth and storytelling; avoid unsupported performance guarantees. Approved reference logo is “The Paths” symbol and SIGNAL. wordmark ending in a **square**, not circular period. Palette **graphite, warm stone, red**. See `docs/BRAND_SIGNAL.md`; available SVG/PNG derivatives in `logos/signal/` require review against original artwork before final trademark/production use.
- **PAVO Create**: separate company and external destination at `https://pavocreate.com`. It gets one card/link from the SIRYUS parent, with clear external-navigation behavior. **PAVO is a product inside PAVO Create**, not a company/brand replacement for PAVO Create. Do not create a SIRYUS child website or `/pavo` subsite. ATLAS and MusicSim can be discussed as proposed PAVO Create products only where confirmed. Do not claim a legal parent/subsidiary relation.
- **Acoustic Rwanda**: remove entirely from the *new* public ecosystem, home, navigation, menus, search and public cards. Identify old URL first and put an intentional redirect or 410 plan in the migration manifest; do not silently leave a 404 or accidentally redirect to an unrelated project.

## Visual and writing hard rules
- Each brand must be genuinely independent in identity: **distinct palette, typography, imagery, shapes, motion, tone and nav**, while interoperating through subtle SIRYUS attribution. Do NOT apply SIGNAL. colors to SIRYUS, A.M or ARC. Do not arbitrarily recolor their approved logos.
- **Less is more**: premium, high-craft, editorial, intentional, spacious, responsive. Strong typography, custom composition, purposeful motion, visual storytelling and large curated brand imagery. Avoid generic template appearance, AI-vibe gradients, purple/amber combinations, neon overload, gratuitous glassmorphism, identical pill buttons/card grids everywhere, and decorative animation that harms usability. The old morphism.css is historical, not a design mandate. Treat Bending Spoons as high-level inspiration only, never copy its layout, content, visual assets or interaction verbatim.
- Use **relevant licensed stock images** or original approved media with documented source/usage rights. Do not fabricate photos of team members, artists, events or projects. Meaningful alt text, adequate contrast, responsive crops, correct attribution when required. Avoid watermarked, low-quality or irrelevant stock. Prefer actual brand/project media where provided.
- Motion graphics: subtle, purposeful reveals, transforms, editorial transitions and interactive feedback. Respect `prefers-reduced-motion`, battery/performance, keyboard, screen readers and no-JS behavior. Do not build an entire navigation model around animation.
- Copy: conversational, simple, human, clear and confident; target roughly grade 6–7 readability unless a legal/technical section requires more detail. Avoid corporate filler, inflated claims and **em dashes** in written copy. Avoid horizontal-rule decorations in editorial copy. Do not claim text has passed an AI detector. Write authentic articles grounded in real experience or sourced facts.
- For code tasks provide **complete runnable implementations**, not partial snippets or placeholder `TODO` code presented as finished. Use TypeScript carefully, small maintainable components, semantic HTML, CSS tokens, no unnecessary packages. Follow conventions found in repo, fix lint/types/build failures, and explain every notable decision.

## Technical and operational invariants
- Preserve **Astro** and existing content, use static output unless proven insufficient. Do not switch to Next.js or radically restructure into monorepo until a clear, tested migration is warranted. Repo includes `studio/` and `studio-arc/`: retain both until their content/queries are verified.
- Current DNS on **Cloudflare**; hosting moving from **Vercel** to **Cloudflare Pages**. Validate whether migration was already done before making changes. All sites should preview successfully before DNS cutover. Keep email DNS untouched: Cloudflare Routing MX, SPF, Mailjet DKIM, DMARC, verification records. Do not delete or overwrite DNS records outside approved web-hosting changes.
- Respect canonical domains, old URLs, redirect mapping, SEO and existing subscriber consent. Do not break real contact forms, Sanity queries, webhook handlers, analytics or legal pages.
- No deployment to production, DNS change, destructive migration, legal policy rewrite or email campaign send without explicit approval.

## Work process
1. Produce current-state audit and change matrix.
2. Implement one small phase at a time, with files touched and rationale.
3. Validate with `npm run build`, existing lint/test commands, type checks if available, visual checks at mobile/tablet/desktop, link crawl, accessibility and reduced-motion tests.
4. Show the result and discrepancies before continuing to another phase. Do not mark unverified work as done.
5. Record decisions and progress in `docs/DECISIONS_AND_PROGRESS.md`.

See docs in numeric order and use `docs/CODEX_MASTER_PROMPT.md` for the full implementation specification.
