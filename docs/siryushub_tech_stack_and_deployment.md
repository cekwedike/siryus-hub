# siryushub.com: Tech Stack, CMS, and Hosting Decisions

This document defines the **recommended technology stack**, **CMS architecture**, and **deployment approach** for rebuilding **siryushub.com**.

The goal is to deliver a **future-proof, high-performance, design-forward website** that aligns with the SIRYUS brand and avoids technical debt.

---

## 1. CORE OBJECTIVES

The tech stack must:

1. Support advanced, modern UI and animation
2. Scale cleanly as content, artists, and projects grow
3. Integrate a headless CMS without friction
4. Remain stable on Hostinger hosting
5. Avoid lock-in and platform limitations
6. Be friendly to SEO and analytics tooling

---

## 2. FRAMEWORK DECISION

### Final Recommendation

**Primary Framework:** Astro

Astro is the optimal choice for siryushub.com due to its content-focused architecture, superior performance, and perfect compatibility with Hostinger static hosting.

---

## 3. ASTRO VS NEXT.JS (DECISION MATRIX)

| Criteria | Astro | Next.js |
|------|------|------|
| Static site generation | Excellent | Good |
| Headless WordPress | Excellent | Excellent |
| SEO control | Excellent | Excellent |
| Performance (speed) | Excellent | Good |
| Content-focused sites | Excellent | Good |
| Hostinger deployment | Excellent (static files) | Complex (Node.js) |
| JavaScript bundle size | Minimal | Larger |
| Learning curve | Moderate | Moderate |

**Conclusion:**
Astro provides superior performance and simpler deployment for content-heavy sites on traditional hosting.

---

## 4. FRONTEND STACK

### Core Technologies

- **Astro 4+**
- **React 18** (for interactive components only)
- **TypeScript** (required)
- **Tailwind CSS** (matches brand consistency and speed)
- **Motion One** (lightweight animations)
- **View Transitions API** (page transitions)

### Brand Design System

**Visual Theme:** Dark theme with high-contrast accents

**Typography:**
- **Font Family:** Aeonik (sans-serif)
- **Font Weights:** Regular (400), Medium (500), Bold (700), Black (900)
- **Loading Method:** Self-hosted or Google Fonts
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif

**Color Palette:**
- **Primary Accent:** `#D1DF4B` (Brand Yellow)
- **Secondary Accent:** `#D5DD85` (Light Yellow)
- **Background:** `#1B1B1E` (Deep Black)
- **Elevated Surface:** `#323836` (Charcoal)
- **Primary Text:** `#F5F9E9` (Off-White)
- **Muted Text:** `#949BA0` (Gray)

**Spacing:** 8-point grid system (4px, 8px, 16px, 24px, 32px, 48px, 64px)

### UI Philosophy

- Dark theme aesthetic for modern appeal
- Minimal but expressive design
- Motion used intentionally for engagement
- Strong typography hierarchy with Aeonik
- Grid-based layouts with consistent spacing
- White space respected for breathing room
- Partial hydration for optimal performance
- High-contrast yellow accents on dark backgrounds

---

## 5. CMS STRATEGY (BLOG AND CONTENT)

### CMS Choice

**WordPress (Headless)**

This allows:
- Editorial flexibility
- Familiar content management
- Easy writer onboarding
- Proven SEO tooling

---

### CMS Architecture

```
WordPress (Hostinger or separate subdomain)
        ↓ REST API
Astro Static Site (siryushub.com)
```

### Recommended Setup

- WordPress installed on:
  - `cms.siryushub.com` or
  - a Hostinger subdirectory

- Frontend consumes content via:
  - WordPress REST API (simpler)
  - WPGraphQL (optional, advanced)

---

## 6. BLOG IMPLEMENTATION DETAILS

- Blog templates built in Next.js
- WordPress controls:
  - Posts
  - Categories
  - SEO fields
- No WordPress theming used
- No page builders

**Result:**
You get WordPress power without WordPress limitations.

---

## 7. HOSTING AND DEPLOYMENT (HOSTINGER)

### Hosting Reality

You already own:
- Domain on Hostinger
- Hosting on Hostinger

Astro is perfectly compatible with Hostinger's static hosting.

---

### Deployment Process

#### Simple Static Deployment

- Build Astro site: `npm run build`
- Upload `dist` folder contents to `public_html`
- Configure .htaccess for clean URLs (if needed)
- Done!

**Benefits:**
- No Node.js server management
- Extremely fast loading
- Simple deployment workflow
- Standard web hosting compatible

---

## 8. HANDLING EXISTING SITE

### Safe Migration Path

1. Backup current Hostinger site
2. Remove AI Builder site
3. Deploy new Next.js app
4. Apply 301 redirects from old URLs
5. Submit updated sitemap to Google Search Console

No domain change required.

---

## 9. ANALYTICS AND EXISTING CUSTOM SCRIPTS

### Supported Integrations

You can safely re-add:

- Google Analytics
- Google Ads
- Google Search Console
- Meta Pixel
- Custom verification tags

### Implementation Method

- Add scripts via Next.js `metadata` or custom `<head>`
- Use environment variables for IDs
- Avoid inline script duplication

---

## 10. PERFORMANCE AND SEO SAFEGUARDS

- Server-side rendering for key pages
- Static generation for blog posts
- Image optimization via Next.js Image
- Automatic code splitting
- Sitemap and robots generation

---

## 11. FUTURE SCALABILITY

This stack supports:

- Artist dashboards
- Member-only areas
- Community features
- Multi-language support
- Regional expansion

No architectural changes required.

---

## 12. FINAL STACK SUMMARY

**Frontend:**
- Astro 4+
- React (for interactive components)
- TypeScript
- Tailwind CSS
- Motion One / View Transitions

**CMS:**
- Headless WordPress

**Hosting:**
- Hostinger (Static Hosting)

**SEO and Analytics:**
- Google Analytics
- Google Search Console
- Structured data

---

## FINAL VALIDATION

- No platform lock-in
- Design flexibility preserved
- SEO safe
- CMS friendly
- Hostinger compatible
- Brand aligned

---

End of tech stack and deployment definition.

