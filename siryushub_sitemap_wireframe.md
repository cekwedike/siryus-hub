# siryushub.com — Wireframe-Level Sitemap

> **Authoritative sitemap for rebuilding siryushub.com**  
> This file defines the **routing, hierarchy, and ownership** of every page.  
> Intended for use with **VS Code, Copilot, frontend frameworks, and CMS integration**.

---

## ROOT CONTEXT

**Domain:** `https://www.siryushub.com`

**Platform role:**  
The official digital platform of **SIRYUS Artist Management (SIRYUS A.M)**, owned and operated by **Siryus Creative Media Ltd**.

---

## 1. GLOBAL / SYSTEM ROUTES

These routes exist independently of branding and appear across the site.

```
/
├── 404
├── sitemap
├── privacy-policy
├── terms-of-use
├── cookie-policy
└── faq
```

### Notes
- `404` → Custom branded error page
- `sitemap` → Human‑readable sitemap page (XML auto-generated separately)
- Legal pages are owned by **Siryus Creative Media Ltd**

---

## 2. PRIMARY NAVIGATION ROUTES

These routes appear in the **main header navigation**.

```
/
├── home
├── about
├── services
├── projects
├── artists
├── community
├── blog
└── contact
```

> `home` maps directly to `/`

---

## 3. HOME

```
/
```

**Owner:** SIRYUS Artist Management  
**Purpose:** Ecosystem overview + conversion

Contains:
- Brand hierarchy explanation
- Services snapshot
- Projects preview
- Community CTA
- Blog highlights

---

## 4. ABOUT (CORPORATE + ECOSYSTEM)

```
/about
```

### Internal anchor sections
```
/about#siryus-am
/about#siryus-creative-hub
/about#siryus-creative-media
```

**Purpose:**
- Trust & legitimacy
- Ownership clarity
- Brand architecture explanation

---

## 5. SERVICES (SIRYUS A.M)

```
/services
```

### Service anchors / optional subroutes
```
/services#artist-management
/services#marketing-promotion
/services#distribution-rights
/services#creative-development
```

**Owner:** SIRYUS Artist Management  
**Rule:** No Siryus Hub content on this route.

---

## 6. PROJECTS (CREATIVE OUTPUT)

### 6.1 Projects Index
```
/projects
```

### 6.2 Individual Project Pages
```
/projects/indiba-project-series
/projects/artist-spotlight-eps
/projects/abditory-sessions
/projects/apartment-sessions
```

### Rules
- All projects are **SIRYUS A.M initiatives**
- Each project may have a status flag:
  - Active
  - Coming Soon
  - Archived
- All releases link to DSPs under **SIRYUS A.M**

---

## 7. ARTISTS

### 7.1 Artist Directory
```
/artists
```

### 7.2 Individual Artist Pages
```
/artists/hidaya-morgan
/artists/max-prodigy
/artists/couronne
```

Each artist page includes:
- Bio
- Media embeds
- Associated projects
- Links to DSPs & social platforms

---

## 8. COMMUNITY (SIRYUS CREATIVE HUB)

```
/community
```

### Optional future subroutes
```
/community/join
/community/guidelines
/community/network
```

**Branding rule:**
- Siryus Creative Hub logo appears here
- Clearly labeled as: *A division of SIRYUS Artist Management*

---

## 9. BLOG / RESOURCES (HEADLESS WORDPRESS)

### 9.1 Blog Index
```
/blog
```

### 9.2 Blog Categories
```
/blog/category/music-business
/blog/category/creative-careers
/blog/category/marketing
/blog/category/productivity
```

### 9.3 Blog Posts
```
/blog/{post-slug}
```

Example:
```
/blog/monetizing-your-creativity
```

### CMS Notes
- WordPress used as **headless CMS**
- Frontend consumes content via REST or GraphQL
- Blog templates are custom-built
- SEO handled on frontend

---

## 10. CONTACT

```
/contact
```

Contains:
- Contact form
- Business email(s)
- Labeled social links

---

## 11. FOOTER-ONLY ROUTES

These routes are accessible from the footer, not the main header.

```
/faq
/privacy-policy
/terms-of-use
/cookie-policy
/sitemap
```

---

## 12. BRAND OWNERSHIP MAP

| Route | Brand Owner |
|-----|------------|
| `/` | SIRYUS Artist Management |
| `/services` | SIRYUS Artist Management |
| `/projects/*` | SIRYUS Artist Management |
| `/artists/*` | SIRYUS Artist Management |
| `/blog/*` | SIRYUS Artist Management |
| `/community` | Siryus Creative Hub |
| `/about` | Siryus Creative Media Ltd |
| Legal pages | Siryus Creative Media Ltd |

---

## 13. HEADER & FOOTER RULES

### Header
- Logo: **SIRYUS A.M**
- Navigation: primary routes only

### Footer
- All three brands listed with names
- Legal ownership displayed
- Social accounts labeled by brand

---

## VALIDATION CHECKLIST

- No duplicate routes
- No orphan pages
- Clear brand ownership
- SEO-safe structure
- CMS-compatible
- Analytics & tracking friendly

---

**End of sitemap definition.**

