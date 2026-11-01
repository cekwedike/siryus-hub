# Phased Codex prompts

Run one phase at a time. Start a new Codex chat for each large phase and attach this whole documentation pack. Do not combine implementation and production deployment in one approval.

## Phase 0: audit and inventory

```text
Read AGENTS.md and every file in docs/ecosystem/. Inspect the live repository and git status. Do not edit code. Create a complete route, component, content, Sanity, asset, redirect, environment-variable-name, and deployment inventory. Classify every public route with the states from 04-content-migration.md. Flag contradictions and decisions that need my approval. Use current official Astro, Sanity, Cloudflare, and Vercel docs. Do not reveal secret values.
```

Exit: reviewed inventory and approved route classifications.

## Phase 1: pnpm and deployment foundation

```text
Read AGENTS.md and docs/ecosystem/. Inspect current changes. Prepare the smallest safe plan to standardize this repository on pnpm and remove the Vercel adapter from the static Astro build. Do not delete package-lock.json, edit deployment settings, commit, push, or deploy until I approve those exact actions. After approval, use pnpm only and run the configured checks and build. Report the missing general lint script.
```

Exit: reproducible static `dist/` build with approved pnpm files.

## Phase 2: parent doorway

```text
Implement the parent doorway defined in docs/ecosystem/. Preserve existing brand routes. Build four accessible cards for SIRYUS A.M, ARC. Creatives, PAVO, and SIGNAL. PAVO must link to https://pavocreate.com/. SIGNAL. must stay visually neutral and must not have an invented logo, brand system, promise, or dead link. Use at most Home, About, and Contact in the parent navigation, or the approved no-nav option. Apply all design and copy hard rules. Do not remove the old homepage or routes without approval.
```

Exit: approved desktop and mobile preview of the doorway.

## Phase 3: content correction and migration

```text
Apply the approved content inventory. Present only Max Prodigy and Jlinez as currently managed by SIRYUS A.M. Treat Hidaya as legacy and Winny as future exactly as approved. Remove Acoustic Rwanda from public discovery, fallback data, queries, and sitemap entries, but ask before deleting its page, assets, or Sanity documents. Add approved redirects only after showing the map. Preserve SEO value and working features.
```

Exit: factual route and content audit passes.

## Phase 4: Sanity hardening

```text
Review the two Sanity studios and clients against 05-sanity.md and current official Sanity docs. Keep the studios separate unless I approve consolidation. Move configuration to environment variables where appropriate, with empty keys only in examples. Audit CORS, public query access, draft behavior, fallbacks, and build hooks. Do not migrate or delete production documents without a backup plan and explicit approval.
```

Exit: documented and tested content paths with no exposed secrets.

## Phase 5: full QA

```text
Run the complete checklist in 08-qa-and-acceptance.md against the production build. Use Playwright at about 390 px and 1440 px and at layout breakpoints. Test keyboard use, reduced motion, external links, redirects, metadata, 404s, Sanity fallbacks, and forbidden design patterns. Fix in-scope issues, then rerun affected checks. Do not deploy.
```

Exit: evidence-backed QA report and approved preview.

## Phase 6: Cloudflare Pages preview

```text
Using 06-cloudflare-pages-migration.md and current official Cloudflare docs, prepare a Cloudflare Pages preview from the approved branch. List environment variable names but never print values. Do not change production DNS. Verify the pages.dev preview, headers, redirects, forms, analytics, canonicals, and noindex behavior. Ask before any external change that is not already approved.
```

Exit: passing Pages preview and cutover checklist.

## Phase 7: production cutover

```text
Do not proceed without my explicit approval for this production deployment. Re-read 06-cloudflare-pages-migration.md and 07-dns-and-email-protection.md. Back up the DNS zone, confirm mail records are unchanged, associate the custom domain through Cloudflare Pages, and run website and email verification. Keep Vercel available for rollback. Stop and roll back if mail or critical routes fail.
```

Exit: stable Cloudflare production, working email, and confirmed rollback window.

## Phase 8: decommission Vercel

```text
After the agreed observation period, audit Cloudflare production and the rollback record. Show exactly what Vercel domain, hooks, variables, packages, and files would be removed. Do not remove or delete anything until I explicitly approve the list. Preserve any records needed for audit or rollback.
```

Exit: user-approved cleanup only.
