# Image and asset register

Last reviewed: 2026-11-02

This register covers images currently used by the rebuilt parent, SIRYUS A.M, ARC. Creatives, and SIGNAL. experiences. A file being present in the repository is not proof of a transferable stock-photo license. Do not add a new public image until its source and usage rights are recorded here.

| Asset group | Current use | Source status | Required action |
|---|---|---|---|
| `public/images/logo/` | SIRYUS identity and favicons | Existing project assets | Preserve originals. Confirm the preferred public parent lockup before final production export. |
| `public/images/background/siryus-am*` | SIRYUS A.M marks and atmosphere | Existing project assets | Treated as user-supplied brand material. Preserve original files and verify final crop on each viewport. |
| `public/images/artists/max-prodigy.webp` | Max Prodigy profile | Existing project media | Confirm photographer/owner approval before a new campaign or third-party reuse. |
| `public/images/hero/jlinez.webp` | Jlinez profile and hero media | Existing project media | Confirm photographer/owner approval before a new campaign or third-party reuse. |
| `public/arc/*` | ARC. Creatives pages, events, faith and community imagery | Existing project media, individual licenses not documented | `NEEDS CONFIRMATION`: identify original source, photographer, subject consent, and reuse terms for every photograph. Do not claim a stock subject is an ARC member. |
| `public/brand/signal/*` | SIGNAL. by SIRYUS identity | Copied from repository `logos/SIGNAL/` working exports | Development use only. Compare against the approved reference board and replace with a verified outlined master before trademark or production use. |
| `public/brand/pavo/product-mark.png` | PAVO product mark shown inside the external PAVO Create card | Copied from repository `logos/PAVO Create/PAVO/` | The stored asset is a PAVO product mark, not confirmed as the PAVO Create company logo. Keep the card text explicit and replace the mark when a company-level asset is approved. |
| Sanity image assets | Artist, project, post, event, supporter, and studio content | Managed in current Sanity datasets | Preserve asset references and alt text during migration. Record rights in the relevant document before publishing new media. |

## Rules for new media

- Prefer real approved project, artist, event, and campaign media.
- Record source URL, creator, license, download date, intended placement, and any attribution requirement.
- Do not use watermarked images.
- Do not use generated people as real team members, artists, clients, or event attendees.
- Export responsive AVIF or WebP derivatives while preserving the approved source master.
- Provide useful alt text for informative images and empty alt text for decorative images.
# Image credits

## Existing project media

- SIRYUS A.M artist portraits use the supplied repository files in `public/images/artists` and `public/images/hero`.
- ARC. Creatives uses the supplied repository files in `public/arc`. Its approved design and image selection were not changed.
- PAVO Create uses the supplied product mark in `public/brand/pavo`.

## SIGNAL. and SIRYUS portal photography

The current local build uses Unsplash image delivery URLs while final owned campaign photography is being selected. Unsplash permits free commercial use under its license. Keep the source record with the project and replace any image if the final brand review rejects it.

- Strategy workshop and open publication: `https://images.unsplash.com/photo-1553484771-371a605b060b`
- Campaign planning by hand: `https://images.unsplash.com/photo-1529119513315-c7c361862fc7`
- Creative work wall: `https://images.unsplash.com/photo-1545235617-9465d2a55698`

License: `https://unsplash.com/license`

### Self-hosted portal copies (2026-11-02)

The SIRYUS portal cards no longer hotlink Unsplash. `scripts/fetch-portal-photos.mjs` stores WebP copies in `apps/siryus/public/images/portal/`:

- `signal-workshop.webp`, `signal-planning.webp`, `signal-wall.webp`: the three SIGNAL. photos listed above.
- `pavo-code.webp`: `https://images.unsplash.com/photo-1555066931-4365d14bab8c`
- `pavo-laptop.webp`: `https://images.unsplash.com/photo-1516321318423-f06f85e504b3`
- `pavo-devices.webp`: `https://images.unsplash.com/photo-1551650975-87deedd944c3`

PAVO Create imagery is placeholder stock until PAVO Create supplies its own product media.

## SIGNAL. by SIRYUS (growth.siryushub.com)
Self-hosted in `apps/signal/public/images/` at 800 and 1600 px wide. All are free to use under the Unsplash License (checked 2026-11-02); attribution is not required but recorded here.

| File | Subject | Photographer | Source |
|---|---|---|---|
| billboard-night | Blank lit billboard at a bus stop at night | Patrick Robert Doyle | https://unsplash.com/photos/csDVMvtsS50 |
| chalkboard | Two people mapping a brand strategy on a chalkboard | Vitaly Gariev | https://unsplash.com/photos/xNMveo-61Us |
| video-camera | Camera operator filming content | Kyle Loftus | https://unsplash.com/photos/DqmXihYx5UE |
| london-billboard | Digital billboards at Piccadilly Circus | Eleni Afiontzi | https://unsplash.com/photos/gLU8GZpHtRA |
| sticky-wall | Team planning with sticky notes on a glass wall | Vitaly Gariev | https://unsplash.com/photos/TSyD0nGc0Bs |
| camera-cap | Photographer at work outdoors | Muhammad-Taha Ibrahim | https://unsplash.com/photos/UOIk3LZoR9k |

## SIRYUS A.M artist photos (updated 2026-11-03)
On the owner's instruction, SIRYUS A.M shows only real photos of its artists: Max Prodigy and Jlinez (current roster) and Hidaya Morgan (alumna). The stock "scenes" set (singer-stage, condenser-mic, crowd-lights and the rest) was removed.

Files in `apps/am/public/images/artists/{slug}-{n}-640.webp` (plus `-1200` where the source allowed), copied from each artist's official profiles to promote artists SIRYUS A.M manages or managed:

| File | Source |
|---|---|
| max-prodigy-1 | Spotify artist profile 5DEI5M3s5NAhk2AloQlNKb |
| max-prodigy-2 | Apple Music artist image (id 1540379359) |
| max-prodigy-3 | A.M Sanity artist photo |
| jlinez-1 | Apple Music artist image (id 1540379360) |
| jlinez-2 | A.M Sanity artist photo |
| jlinez-3 | Spotify artist profile 1IG4PSCy1OokQbRYILUrnN |
| hidaya-morgan-1 | Apple Music artist image (id 1714798790) |
| hidaya-morgan-2 | A.M Sanity artist photo |
| hidaya-morgan-3 | Spotify artist profile 67Vu6E8FcRU2I531Atn6Zr |

The hub card for A.M (`apps/siryus/public/images/artists/`) uses max-prodigy.webp, jlinez-studio.webp and max-prodigy-hands.webp from the same set. Replace with approved press photos when available.

Release artwork in `apps/am/public/images/releases/` and `apps/arc/public/arc/releases/` is the official cover art from Apple Music, used to promote SIRYUS A.M and ARC. Creatives' own releases.


## Indiba Project Series facilitator posters (2026-11-03)
`apps/am/public/images/indiba/{name}-600.webp` and `-1000.webp`, made from the owner's original 9000 px session posters ("Indiba Sessions Facilitators" folder): Winny Ezeme, Marlon Grigsby, Eddie Hatitye, Dana Dane, Bob Ngene, Julz Ossom, Kofi Black, Ritadeviolinist. SIRYUS A.M brand material.

## Discography artwork
Cover art on artist pages loads from Apple Music's image CDN via the public iTunes lookup API, used to promote each artist's own releases.
