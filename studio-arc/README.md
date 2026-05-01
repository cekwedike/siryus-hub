# ARC Blog — Sanity Studio

This Studio connects to a **separate Sanity project** from the main Siryus Hub CMS. Only `blogPost` documents are defined here.

## Setup

1. Create a new project (or dataset) at [sanity.io/manage](https://www.sanity.io/manage).
2. Copy `.env.example` to `.env.local` in this folder and set:
   - `SANITY_STUDIO_ARC_PROJECT_ID`
   - `SANITY_STUDIO_ARC_DATASET` (usually `production`)
3. Install and run:

```bash
cd studio-arc
npm install
npm run dev
```

4. In the **site** repo root `.env` / Vercel env, set the Astro-facing variables (see root `.env.example`):
   - `PUBLIC_SANITY_ARC_PROJECT_ID` — same project ID as above
   - `PUBLIC_SANITY_ARC_DATASET` — same dataset name

The public site reads ARC posts at `/arc/blog` using those `PUBLIC_*` variables.
