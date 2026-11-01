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
| Hidaya | archive | Keep a clearly labelled legacy page outside current roster and management queries |
| Winny | hold | Do not show as currently managed |
| Acoustic Rwanda | retire | Remove from public discovery and redirect `/projects/acoustic-rwanda` to `/projects`; retain source, assets, and Sanity documents |
| ARC. Creatives pages | keep | Maintain separate brand identity |
| PAVO material | move | Link to pavocreate.com, do not duplicate |
| SIGNAL. | hold | Pending identity and destination |

## Inventory worksheet

Before code changes, create a table covering every file in `src/pages/`, every relevant static asset, every fallback item, and every Sanity document. Record current URL, brand owner, state, target URL, redirect, SEO title, content owner, and approval status.

## Proposed `/community` to ARC. Creatives mapping

No item below has been moved or redirected. This map requires item-level approval first.

| Current item | Proposed ARC. Creatives destination | Treatment | Approval |
|---|---|---|---|
| Hero invitation and community promise | `/arc/community` introduction | Rewrite in ARC. Creatives voice and remove the SIRYUS-wide ownership claim | Pending |
| Real Conversations | `/arc/community` principle | Keep the idea with faith-rooted context | Pending |
| Shared Resources | `/arc/resources` or a future resources section | Hold until a real resource library and owner exist | Pending |
| Mutual Growth | `/arc/community` principle | Keep and rewrite for ARC. Creatives | Pending |
| Audience list for musicians, marketers, producers, founders, photographers, and designers | `/arc/community` audience section | Narrow to the approved ARC. Creatives audience | Pending |
| Follow Siryus and reach out steps | ARC. Creatives community call to action | Replace with approved ARC. Creatives channels and action only when confirmed | Pending |
| Generic Instagram join links | No automatic destination | Hold because the current link points to `siryus.am`, not an approved ARC. Creatives community channel | Pending |

After approval, keep `/community` available until the ARC. Creatives destination is complete. Then add a permanent redirect and archive the old presentation without deleting its source until separately approved.

## Proposed root article ownership

No article URL has been moved and no redirect has been added. The parent site should not retain a general journal, but each assignment below requires approval.

| Current article | Proposed owner | Reason | Approval |
|---|---|---|---|
| `/blog/what-independent-artists-get-wrong-about-marketing` | SIRYUS A.M | Directly supports music artist career and release strategy | Pending |
| `/blog/copyright-vs-intellectual-property` | SIRYUS A.M | Focuses on rights knowledge for independent artists | Pending |
| `/blog/how-mental-health-impacts-your-art` | SIRYUS A.M | Artist wellbeing and sustainable career support | Pending |
| `/blog/monetizing-creativity-earn-living-passion` | ARC. Creatives | Broad creative-practice and income topic beyond managed music artists | Pending |
| `/blog/mastering-time-management-for-creatives` | ARC. Creatives | Broad practical guidance for creatives | Pending |
| `/blog/building-an-online-portfolio-that-pops` | ARC. Creatives | Portfolio guidance fits a cross-discipline creative community | Pending |
| `/blog/building-your-brand-as-a-creative` | ARC. Creatives | Broad brand-building guidance for independent creatives | Pending |
| `/blog/collaboration-in-creative-industries` | ARC. Creatives | Community and cross-discipline collaboration topic | Pending |

If approved, preserve each existing URL until its new brand URL is built, reviewed, and ready for a permanent redirect.

## SEO preservation

- Capture current indexed URLs and their canonical targets.
- Keep useful titles, descriptions, and image alt text when the underlying claim remains true.
- Replace stale structured data and roster references.
- Update internal links before redirects go live.
- Keep redirects for at least one full search indexing cycle and preferably longer.
- Review analytics for unexpected 404s after launch.

## Asset handling

Do not delete legacy photos or logos during the first implementation. Move approved archive assets only after their references are known. Optimize copied images without overwriting originals until visual QA passes.
