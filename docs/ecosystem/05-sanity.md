# Sanity plan

## Current state

The repository contains a main Studio in `studio/` and an ARC Studio in `studio-arc/`. The main Studio hardcodes a project ID and `production` dataset. ARC reads its project and dataset from environment variables. Public queries use separate main and ARC clients.

## Recommended near-term approach

Keep the studios separate during the parent-site redesign. A Studio consolidation is a different project and should not be bundled into the visual rebuild. Sanity supports multiple workspaces, but that option should be chosen only after permissions, editorial ownership, and schemas are reviewed.

## Content ownership

- Parent doorway card data should start in typed repository data because it changes rarely and includes pending states.
- SIRYUS A.M artists, projects, and articles can remain in the main Sanity project after roster correction.
- ARC. Creatives content remains in the ARC Sanity project.
- PAVO content is not copied into this repository.
- SIGNAL. receives no schema until its content needs are approved.

## Environment variables

Document names only, with empty values in `.env.example`:

```dotenv
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=
PUBLIC_SANITY_ARC_PROJECT_ID=
PUBLIC_SANITY_ARC_DATASET=
PUBLIC_CANONICAL_ORIGIN=
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=
SANITY_STUDIO_ARC_PROJECT_ID=
SANITY_STUDIO_ARC_DATASET=
```

Do not put write tokens in public variables. Store deployment and webhook secrets only in the provider environment or supported credential store.

## Required implementation checks

- Confirm the CORS allowlist includes only required local, preview, and production origins.
- Confirm both public clients can query without a token if the datasets are intentionally public.
- Confirm unpublished drafts never appear on production.
- Review fallback content so stale artists or Acoustic Rwanda cannot reappear when Sanity is unavailable.
- Decide whether published Sanity changes trigger a Cloudflare Pages build hook.
- Scope webhook permissions and rotate any old Vercel-only hook secrets after cutover.

## Schema migration safety

Export a dataset backup before destructive schema or document changes. Prefer additive schema changes, migration scripts with dry runs, and explicit document IDs. Do not bulk delete or mutate production documents without a reviewed plan and user approval.

