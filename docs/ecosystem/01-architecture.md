# Architecture

## Goal

Make `siryushub.com` the clear front door to the SIRYUS ecosystem. It should explain the relationship between the parent company and its brands, then send each visitor to the right destination quickly.

## Recommended shape

```text
siryushub.com
├── SIRYUS A.M
│   ├── artist management pages
│   ├── Max Prodigy
│   └── Jlinez
├── ARC. Creatives
│   └── current ARC routes during this phase
├── PAVO
│   └── external: pavocreate.com
└── SIGNAL.
    └── pending destination and visual identity
```

The parent page should not repeat every service, artist, article, event, or project. Each card needs a plain description, a clear action, and an honest destination state.

## Runtime model

- Keep Astro static output unless a confirmed feature needs request-time rendering.
- A purely static Astro site does not require a server adapter. Removing `@astrojs/vercel` is an implementation task that needs approval and successful builds first.
- Build the parent doorway from Astro components and typed data.
- Keep JavaScript optional for core navigation.
- Fetch Sanity content at build time. Rebuild from an approved webhook when published content changes.

## Component boundaries

```text
src/
├── components/ecosystem/
│   ├── EcosystemHeader.astro
│   ├── EcosystemCard.astro
│   ├── EcosystemGrid.astro
│   └── EcosystemFooter.astro
├── data/
│   └── ecosystem.ts
├── layouts/
│   └── EcosystemLayout.astro
└── pages/
    ├── index.astro
    ├── about.astro
    └── contact.astro
```

This is a proposed target, not permission to move or delete current files. Reuse existing accessible parts when they fit the approved visual direction.

## Data contract for a card

Each card should have a stable ID, public name, short description, link, link type, availability state, approved image or mark, and accessible label. `SIGNAL.` must use a neutral placeholder treatment until approved assets exist.

## Security and privacy boundaries

- No secrets in `PUBLIC_*` variables. Astro exposes public variables to browser code.
- Read write tokens only from server-side build or webhook environments.
- Use read-only Sanity access for public build queries.
- Do not place contact form credentials in client code. Select a Cloudflare-compatible form path before implementing the form.
- Add security headers only after testing Studio, images, analytics, and external destinations against the content security policy.

## Decisions still requiring approval

- Whether `/` replaces the current splash immediately or after a preview period.
- Whether About and Contact appear in the top navigation or only in the footer.
- Whether SIRYUS A.M and ARC. Creatives remain under this domain long term or move to their own domains.
- The actual SIGNAL. destination, launch state, logo, colors, typography, and copy.

