# ARC. Creatives Studio

Content for collective.siryushub.com: the journal, events, releases, supporters and FAQ. It uses its own Sanity
project (`qi12mdx6`, dataset `production`), separate from the SIRYUS A.M Studio in `../studio`.

## Run it

```bash
cd studio-arc
pnpm install
pnpm dev          # http://localhost:3333
npx sanity deploy # publish the hosted Studio after schema changes
```

The project ID defaults to `qi12mdx6`; set `SANITY_STUDIO_ARC_PROJECT_ID` / `SANITY_STUDIO_ARC_DATASET` in
`.env.local` only to point at a different project.

## How content reaches the site

The site is static (Astro on Cloudflare Pages). A Sanity webhook sends a `sanity-publish` event to GitHub, which runs
`.github/workflows/deploy-sites.yml` to rebuild and deploy ARC. and SIRYUS A.M. Publishing in the Studio updates the
site in about two to three minutes.

## Releases

The music page combines ARC. Creatives' Apple Music catalogue (automatic), the Releases added here (for Spotify and
other links, notes, track lists, or releases Apple does not list under ARC., such as features), and a short built-in
list. Entries with the same title are merged.

## Scripts

`scripts/move-arc-posts.mjs` is a one-off that copies the five ARC. articles from the A.M dataset into this one.
