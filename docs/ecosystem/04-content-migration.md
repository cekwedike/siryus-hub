# Content migration

## Migration rule

Inventory first, assign ownership second, migrate third, redirect fourth, and delete only after explicit approval. A route marked for retirement is not permission to remove its source file or CMS content.

## Content states

Use one state for every page and Sanity document:

- `keep`: remains public at the same URL.
- `rewrite`: remains public but needs corrected positioning or copy.
- `move`: belongs to another brand destination.
- `archive`: kept for historical value without a current relationship claim.
- `hold`: not public yet.
- `retire`: removed from discovery and redirected after approval.

## Known classifications

| Content | State | Required treatment |
|---|---|---|
| Max Prodigy | keep | Present as currently managed |
| Jlinez | keep | Present as currently managed |
| Hidaya | archive | Label as legacy only if the user approves public archive copy |
| Winny | hold | Do not show as currently managed |
| Acoustic Rwanda | retire | Remove from cards, sitemap, queries, and fallback data; approve redirect before route removal |
| ARC. Creatives pages | keep | Maintain separate brand identity |
| PAVO material | move | Link to pavocreate.com, do not duplicate |
| SIGNAL. | hold | Pending identity and destination |

## Inventory worksheet

Before code changes, create a table covering every file in `src/pages/`, every relevant static asset, every fallback item, and every Sanity document. Record current URL, brand owner, state, target URL, redirect, SEO title, content owner, and approval status.

## SEO preservation

- Capture current indexed URLs and their canonical targets.
- Keep useful titles, descriptions, and image alt text when the underlying claim remains true.
- Replace stale structured data and roster references.
- Update internal links before redirects go live.
- Keep redirects for at least one full search indexing cycle and preferably longer.
- Review analytics for unexpected 404s after launch.

## Asset handling

Do not delete legacy photos or logos during the first implementation. Move approved archive assets only after their references are known. Optimize copied images without overwriting originals until visual QA passes.

