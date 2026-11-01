# Sanity plan

## Current state after local hardening

The repository contains a SIRYUS A.M Studio in `studio/` and an ARC. Creatives Studio in `studio-arc/`. Both Studios now read project and dataset identifiers from their own `SANITY_STUDIO_` environment variables. Public queries use separate main and ARC clients with an explicit `2026-03-01` API version and the `published` perspective.

## Recommended near-term approach

Keep the studios separate during the parent-site redesign. A Studio consolidation is a different project and should not be bundled into the visual rebuild. Sanity supports multiple workspaces, but that option should be chosen only after permissions, editorial ownership, and schemas are reviewed.

Official Sanity guidance checked on 1 November 2026 confirms that Studio variables exposed to bundled Studio code must use the `SANITY_STUDIO_` prefix and must never contain secrets. It also confirms that `published` excludes drafts and version documents, and that workspaces are useful when multiple teams, datasets, or regions should share one deployed Studio. Separate editorial ownership remains the stronger reason to keep these two Studios independent.

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
SANITY_TOKEN=
SANITY_ARC_TOKEN=
```

Do not put write tokens in public variables. Store deployment and webhook secrets only in the provider environment or supported credential store.

## Required implementation checks

- Confirm the CORS allowlist includes only required local, preview, and production origins.
- Confirm both public clients can query without a token if the datasets are intentionally public.
- Confirm unpublished drafts never appear on production.
- Review fallback content so stale artists or Acoustic Rwanda cannot reappear when Sanity is unavailable.
- Decide whether published Sanity changes trigger a Cloudflare Pages build hook.
- Scope webhook permissions and rotate any old Vercel-only hook secrets after cutover.

## Local changes completed

- `studio/` is labelled SIRYUS A.M Studio and no longer hardcodes its project ID.
- `studio-arc/` is labelled ARC. Creatives Studio and no longer falls back to the SIRYUS A.M project variables.
- The frontend clients explicitly request published documents.
- `.env.example` contains names with empty values only.
- No schema, document, dataset, project, CORS origin, or hosted Studio was changed.

## Schema migration safety

Export a dataset backup before destructive schema or document changes. Prefer additive schema changes, migration scripts with dry runs, and explicit document IDs. Do not bulk delete or mutate production documents without a reviewed plan and user approval.
