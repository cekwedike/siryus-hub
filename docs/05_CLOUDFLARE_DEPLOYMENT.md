# Cloudflare Pages migration: safety-first deployment runbook

## Current known state
- Domain DNS is managed on Cloudflare.
- User reports site historically on Vercel and wants Cloudflare Pages. Migration may already be partly complete. Inspect real config and Cloudflare status before acting.
- README documents Astro `output: static`, `pnpm build`, and output `dist`.
- There is `vercel.json`, `public/_redirects`, Apache `.htaccess`, and potentially deployment secrets. The precise live config needs inspection.

## Architecture choice
Start by checking if repo remains one Astro app or was already split. Cloudflare Pages can host multiple projects against one repository by separate root/build commands and watch paths. Don't split unless a verified plan accounts for current routes, asset paths, deployment previews, and Sanity. For static Astro, the normal Pages build command is `pnpm build` and output directory is `dist` (adjust monorepo roots if necessary).

## Preflight
1. Backup/checkpoint Git; catalog current env **variable names only** and values separately in a secure manager.
2. Audit Astro output mode, adapter, image processing, any Pages Functions/server routes and current Vercel APIs. Static and SSR have different hosting needs.
3. Identify custom production host (`siryushub.com` vs `www.siryushub.com`) and canonical strategy. Confirm DNS host and redirects rather than assuming.
4. Check forms/webhooks, Sanity CORS/origins, preview URLs, Cloudflare environment variables, `_redirects`, `_headers`, error pages and cache rules.
5. Confirm `pages.dev` preview site works and test SEO robots/canonical behavior for previews.

## Cutover
1. Deploy preview; verify pages, CMS, media, forms, links, event/artist pages, OG metadata, mobile and HTTP behavior.
2. Add/validate custom domain in Cloudflare Pages as documented. Change **website-specific DNS only**, after reviewing current records and avoiding conflict. Do not delete zone or nameservers.
3. Preserve **Cloudflare Email Routing MX, SPF, Mailjet DKIM, DMARC and any verification TXT records**. Website migration must never disrupt inbound/outbound email.
4. Confirm HTTPS, apex/www canonical redirect, sitemap and full redirect list on production; monitor 404s and analytics.
5. After verification and explicit user consent, retire Vercel configuration/deployment. Retain rollback path.

## Redirect behavior
Cloudflare Pages supports `public/_redirects` for static resources. Rules do NOT run in the same way for Pages Functions. Audit every historical rule and test. `.htaccess` is not a Cloudflare Pages redirect mechanism. Avoid circular redirects and cross-domain redirect mistakes. Preserve SEO with appropriate 301s; use 410 for intentionally retired content if that is the SEO decision.

## Sources
- Astro: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- Redirects: https://developers.cloudflare.com/pages/configuration/redirects/
- Monorepos: https://developers.cloudflare.com/pages/configuration/monorepos/
- Build watch paths: https://developers.cloudflare.com/pages/configuration/build-watch-paths/
- Git integration: https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/

No live deployment or DNS editing without user authorization.
