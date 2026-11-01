# QA and acceptance

## Required automated checks

Run from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm lint:max-lines
pnpm check
pnpm build
pnpm preview
```

The repository currently has no general lint script. Report that limitation instead of claiming full lint coverage. If the approved pnpm migration has not happened yet, do not invent a lockfile or delete npm lockfiles without approval.

## Browser matrix

Use Playwright against the production build at about 390 px and 1440 px. Also inspect any width where the four-card grid or navigation changes.

Test:

- all four cards and their exact labels
- PAVO reaches `https://pavocreate.com/`
- SIGNAL. has no dead or invented link
- parent navigation contains no more than approved items
- keyboard order, visible focus, skip link, headings, and landmarks
- touch targets, wrapping, overflow, image crops, and content order
- reduced-motion behavior
- light and dark themes only if both remain supported
- 404 response and page
- approved redirects with status and final URL
- sitemap, robots rules, canonicals, social metadata, and structured data
- Sanity success, empty, and failure fallbacks
- no current-roster claim for Hidaya or Winny
- no Acoustic Rwanda card, result, sitemap entry, or fallback
- no eyebrow headers, pills, horizontal dividers, or em dashes in visible copy

## Performance and quality targets

- No console errors on core routes.
- No broken internal links or missing required images.
- Images have dimensions and suitable formats.
- Core content works without client JavaScript.
- Layout shift is not visible during ordinary loading.
- Accessibility checks have no serious or critical findings.
- The parent page explains the ecosystem without duplicating brand sites.

## Deployment acceptance

Production approval requires a passing Cloudflare preview, confirmed DNS backup, confirmed email tests, a documented rollback, and explicit user approval for the specific deployment. After launch, check analytics, 404s, form delivery, certificates, and email again.

