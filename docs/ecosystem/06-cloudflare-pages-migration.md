# Cloudflare Pages migration

## Target build

The site is static. The expected Cloudflare Pages settings are:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm build` |
| Output directory | `dist` |
| Node version | A supported version compatible with Astro 6, pinned consistently |

Astro static output does not need a server adapter. In an approved implementation phase, remove the Vercel adapter import and package, then verify the build. Keep `public/_redirects`, which Astro copies into `dist` for Cloudflare Pages.

## Phase 1 package foundation decision

- Use one pnpm workspace for the Astro application, `studio/`, and `studio-arc/`.
- Keep one shared `pnpm-lock.yaml` at the repository root.
- Pin pnpm 12.15.0 through the root `packageManager` field for consistent local and CI installs.
- Allow dependency build scripts only for `esbuild` and `sharp`, which are required by the current Astro and Sanity dependency graph.
- Exclude generated site, Vercel, and Studio build outputs from Astro's TypeScript diagnostics.
- Generate root and ARC blog detail routes plus ARC event detail routes at build time with `getStaticPaths()` so every route remains compatible with static output.
- Keep Astro output static with no deployment adapter.
- Keep `vercel.json` during the rollback window, using pnpm install and build commands.

## Prerequisites

- Approve conversion to one pnpm lockfile for each intentionally separate package.
- Record every Vercel environment variable and build setting without copying secret values into documentation.
- Confirm the GitHub repository and production branch.
- Confirm whether the two Sanity studios are deployed separately and where.
- Capture current production screenshots, headers, redirects, forms, analytics, and canonical URLs.

## Safe sequence

1. Make the documentation-approved code changes in a worktree or branch.
2. Run local install, checks, build, and browser QA.
3. Connect the Git repository to a new Cloudflare Pages project.
4. Add non-secret and secret environment variables in Cloudflare.
5. Deploy a preview branch and test its `pages.dev` address.
6. Associate the custom domain through the Pages custom-domain flow. Do not create only a manual CNAME and skip association.
7. Verify SSL issuance, redirects, headers, Sanity images, analytics, forms, and canonical URLs.
8. Cut traffic over only after explicit approval.
9. Keep the Vercel project available for rollback during the observation period.
10. Remove the domain from Vercel only after Cloudflare production is stable and the user approves.

## Preview and production rules

- Branch previews must not be indexed. Use provider controls or headers, not only a page meta tag.
- Preview builds use preview-safe canonical URLs or no indexable canonicals.
- Production uses `https://www.siryushub.com` or the separately approved apex choice consistently.
- Never expose Sanity write tokens or provider API tokens in build logs.

## Rollback

Before cutover, record the previous Vercel domain configuration and DNS values. If Cloudflare production fails materially, restore the previous routing, verify HTTPS, and retest the homepage plus critical routes. Do not delete the Vercel project during the rollback window.

## Decommission checklist

After the agreed observation period: confirm Cloudflare is stable, export useful Vercel logs or settings, remove the custom domain from Vercel, disable obsolete deploy hooks, and remove obsolete Vercel packages or config only with approval.
