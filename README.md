# Siryus Hub

Static marketing site for **Siryus Hub** and **SIRYUS A.M** — the public face of Siryus Creative Media Ltd’s work supporting independent creatives (management, marketing, community, and resources). Built with [Astro](https://astro.build/) as a fully static export (`output: 'static'`), deployed like any static host (Netlify-style `_redirects`, Apache `.htaccess` on Hostinger, etc.).

---

## Vision

- **Purpose:** Present the Siryus ecosystem clearly: who we are, what SIRYUS A.M offers, how to explore artists and projects, and how to get in touch — without duplicating a full product app.
- **Audience:** Independent artists, collaborators, partners, and fans landing from social or search.
- **Tone:** Bold, dark-first UI with lime accent (`#d1df4b`), glass/clay/neu/skeuo surfaces (see `src/styles/morphism.css`), and a cinematic `/home` experience separate from lightweight legal/marketing inner pages.
- **Non-goals:** This repo is not a CMS, dashboard, or authenticated product; content is in-repo Astro pages and components.

---

## What the codebase is today

### Entry and main experiences

| Route | File | Role |
|--------|------|------|
| `/` | `src/pages/index.astro` | Splash / brand entry; transitions or skip to `/home`. Styles: `src/styles/splash.css`. |
| `/home` | `src/pages/home.astro` | Primary marketing homepage: `Navigation`, `Sidebar`, `HeroSection`, `ExploreSection`, `Footer`. Imports `brand-tokens.css`, `morphism.css`. Client theme + parallax in page script. |

### Marketing + legal (shared layout)

Most inner pages use **`src/layouts/BaseLayout.astro`**: `SimpleSiteNav`, main slot wrapped in **`morph-surface morph-surface--glass`**, `SiteFooterLegal`. Shared styles: `src/styles/marketing-layout.css` + `morphism.css`.

Representative routes:

- `/services`, `/siryus-am`, `/projects`, `/contact`, `/about`, `/community`, `/reels`, `/blog`, `/artists`, `/artists/max-prodigy`, `/artists/hidaya-morgan`
- Legal: `/privacy-policy`, `/terms-of-use`, `/cookie-policy`, `/faq`, `/sitemap`
- `/404` — custom not found

### Design system (high level)

- **`src/styles/brand-tokens.css`** — Background, surface, accent, gradients.
- **`src/styles/morphism.css`** — Shared morphism utilities: `nav-glass`, `morph-surface--glass`, `morph-clay-card`, `morph-skeuo-frame`, `morph-neu-*`, `morph-footer-glass`, hero helpers; includes `body.light-theme` overrides.
- **`src/components/BrandWordmark.astro`** — Wordmark variants for nav, footer, marketing.
- Home-specific sections live under `src/components/` (`HeroSection`, `ExploreSection`, `Footer`, `Navigation`, `Sidebar`, etc.).

### Redirects (legacy URLs)

- **`public/_redirects`** — Netlify-style 301s (e.g. old builder paths).
- **`public/.htaccess`** — Apache equivalents for Hostinger-style hosting.
- Notable: `/hybrid` → `/projects`, **`/brief` → `/services`** (the old “Project brief” page was removed in favor of the Services page and nav label **SERVICES**).

### SEO

- **`@astrojs/sitemap`** — `site` in `astro.config.mjs` is `https://www.siryushub.com`; sitemap emitted at build.

### Scripts and tooling

- `npm run build` / `npm run dev` / `npm run preview`
- `npm run lint:max-lines` — guards file length under `src/` (see `package.json`)

---

## Project structure (abbreviated)

```
siryus-hub/
├── public/                 # Static assets, _redirects, .htaccess, fonts, images
├── src/
│   ├── components/         # UI sections (home footer, nav, explore grid, etc.)
│   ├── layouts/            # BaseLayout (marketing shell)
│   ├── pages/              # File-based routes (*.astro)
│   ├── styles/             # brand-tokens, morphism, marketing-layout, splash
│   └── scripts/            # Splash-related TS where used
├── docs/                   # Additional internal / spec material (optional)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Local development

**Requirements:** Node 18+ (or 20+).

```bash
npm install
npm run dev
```

- Splash: `http://localhost:4321/`
- Home: `http://localhost:4321/home`

```bash
npm run build
npm run preview
```

---

## What happened to “Brief”?

The former **`/brief`** page was a short page titled “Project brief” — tips on what to include when starting a project (goals, timeline, references) with a link to **Contact**. That overlapped **Services** and **Contact**, so the route was **removed**. Primary nav, sidebar, and the Explore grid now point to **`/services`** instead; old **`/brief`** URLs **301 redirect to `/services`**.

---

## Further reading

- Deeper product or migration notes may live under `docs/` (e.g. `docs/README.md`).
- For splash-only behavior (timers, text rotation), see inline comments and scripts in `src/pages/index.astro` and `src/styles/splash.css`.

---

Maintained as part of the Siryus Hub web presence (Siryus Creative Media Ltd).
