# Existing site, route migration and Sanity preservation

## Confirmed historical structure from README, not a full repository inspection
- `/` uses `src/pages/index.astro` as splash.
- `/home` uses `src/pages/home.astro` with existing nav/hero/explore/footer.
- Historical pages include `/services`, `/siryus-am`, `/projects`, `/contact`, `/about`, `/community`, `/reels`, `/blog`, `/artists`, `/artists/max-prodigy`, `/artists/hidaya-morgan`, legal, FAQ, sitemap. README may be stale; inspect current tree.
- Two folders `studio/`, `studio-arc/` are visible. Their internal configurations, dataset mapping and deployment must be discovered, not assumed.
- Existing `public/_redirects` and `public/.htaccess`; latter is Apache-only, not Cloudflare Pages behavior.
- Existing `src/styles/brand-tokens.css`, `src/styles/morphism.css`, `src/layouts/BaseLayout.astro` reflect old visual system. They are reuse candidates, not non-negotiable style references.

## Migration decision framework
- `/` becomes parent SIRYUS hero and venture gateway; verify existing splash logic before replacing. Redirect `/home` to `/` only once complete.
- `/services`: replace parent service catalogue with direct venture discovery/referral; redirect old links carefully.
- `/siryus-am` and artist pages: migrate to A.M, preserving deep-link profiles and accurate roster.
- `/arc/*`: migrate all ARC-specific routes to collective site with article/event slug parity where possible.
- `/blog/*`: classify EACH article by editorial owner (parent journal, A.M insights or ARC stories). Preserve original authors/dates. Only publish one canonical full article and use summaries on hub.
- Indiba belongs to A.M.
- Acoustic Rwanda: remove all UI, assets referenced in UI, search entries, sitemap; decide old URL redirect vs 410 based on actual legacy backlink value. Do not promote it again.
- `/artists/hidaya-morgan`: do not show as managed current roster; preserve legacy article/profile only if factually labeled, or redirect if retired.
- Legal routes: keep accessible and review for accurate current data collection, cookies, analytics, Cloudflare services and policies; legal updates need owner review.

## CMS safeguards
- Export/backup all datasets before migration, including drafts and media references. Keep content IDs and image references unless intentionally migrated.
- Audit Studio configs and schema names; identify existing queries/hooks and webhook secret names (never print values).
- Maintain both existing studios initially. Do not merge datasets or overwrite production Sanity data without explicit approval.
- Implement typed query results, graceful empty states and safe image URLs.
- Document content inventory with `canonical_old_url`, `new_url`, `owner_brand`, `sanity_document_id`, `publication_status`, `redirect_status`, `notes`.
- Ensure ARC and A.M editorial posts retain independent attribution and newsletter consent.
