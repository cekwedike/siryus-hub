# Routes and navigation

## Parent-site navigation

Use one of these approved-size patterns:

1. Recommended: logo linked to Home, plus About and Contact.
2. Minimal: logo only in the header, with About and Contact in the footer.
3. No formal header: a clear site identity at the top and accessible About and Contact links in the footer.

Do not bring the current six-item brand navigation into the new parent doorway. Do not use a pill-shaped nav container.

## Proposed route ownership

| Route | Future role | Phase-one action |
|---|---|---|
| `/` | Ecosystem doorway | Replace only after preview approval |
| `/about` | Parent company and ecosystem explanation | Rewrite and keep |
| `/contact` | Parent contact or routing page | Clarify ownership and keep |
| `/siryus-am` | SIRYUS A.M landing | Keep, revise roster facts |
| `/artists` | Current managed roster | Keep only Max Prodigy and Jlinez as current |
| `/artists/max-prodigy` | Managed artist profile | Keep |
| `/artists/jlinez` | Managed artist profile | Keep |
| `/artists/hidaya-morgan` | Legacy profile | Remove from current roster, decide archive or redirect |
| `/artists/winny-ezeme` | Future profile | Do not present as current; hide or hold until approved |
| `/arc` and `/arc/*` | ARC. Creatives experience | Keep during phase one |
| `/projects/acoustic-rwanda` | Retired public content | Remove from discovery, then redirect after approval |
| `/home` | Current large homepage | Keep temporarily; decide redirect after launch approval |
| `/services`, `/projects`, `/community`, `/blog` | Existing mixed content | Inventory and assign to a brand before any retirement |
| legal routes | Parent legal obligations | Keep and update hosting or processor facts |
| `/studio` | Not currently a page route | Keep Studio deployment separate from public routing |

## Four card destinations

| Card | Label | Destination behavior |
|---|---|---|
| SIRYUS A.M | `Explore SIRYUS A.M` | Internal link to `/siryus-am` for phase one |
| ARC. Creatives | `Visit ARC. Creatives` | Internal link to `/arc` for phase one |
| PAVO | `Visit PAVO` | External link to `https://pavocreate.com/` |
| SIGNAL. | `SIGNAL. is taking shape` | Non-link pending state unless an approved destination exists |

External links must be visually and programmatically clear. If opening a new tab, state that for screen-reader users and use `rel="noopener noreferrer"`. Opening in the same tab is simpler and is the default recommendation.

## Redirect principles

- Map every retired URL to the closest useful destination.
- Use Cloudflare Pages `public/_redirects` for static redirects.
- Avoid redirect chains and loops.
- Preserve query strings where relevant.
- Return a real 404 for content with no meaningful replacement.
- Do not redirect all missing pages to Home.
- Test every redirect in preview and production.

## Sitemap and search

Remove retired and pending pages from `astro.config.mjs` custom sitemap entries only when their route decision is approved. The new sitemap must not claim that Hidaya or Winny is currently managed, and must not include Acoustic Rwanda.

