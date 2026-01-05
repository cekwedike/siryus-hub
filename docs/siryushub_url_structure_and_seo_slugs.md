# siryushub.com — URL Structure and SEO Slug Map

This document defines the **authoritative URL structure, SEO-friendly slugs, canonical rules, and indexing guidance** for rebuilding **siryushub.com**.

It is written to be used directly by developers, SEO specialists, and CMS integrators.

---

## 1. CORE URL PRINCIPLES

All URLs across siryushub.com follow these rules:

1. Lowercase only
2. Hyphen separated words
3. No trailing slashes in canonical URLs
4. Human readable and descriptive
5. One primary intent per URL
6. No keyword stuffing
7. Clear ownership by brand or division

---

## 2. DOMAIN AND CANONICAL SETTINGS

**Primary domain:**
```
https://www.siryushub.com
```

**Canonical rules:**
- All traffic forced to https
- www enforced
- One canonical per page
- Canonical tag required on all indexable pages

---

## 3. GLOBAL SYSTEM ROUTES

These routes support site functionality and legal requirements.

| Page | URL | Indexing | Notes |
|----|----|----|----|
| 404 | /404 | No index | Custom branded error page |
| Sitemap HTML | /sitemap | Index | Human readable sitemap |
| Privacy Policy | /privacy-policy | Index | Legal page |
| Terms of Use | /terms-of-use | Index | Legal page |
| Cookie Policy | /cookie-policy | Index | Legal page |
| FAQ | /faq | Index | Support content |

---

## 4. PRIMARY NAVIGATION URL MAP

These URLs appear in the main site navigation.

| Page | URL | SEO Intent |
|----|----|----|
| Home | / | Artist management overview |
| About | /about | Brand and company information |
| Services | /services | Artist services |
| Projects | /projects | Creative initiatives |
| Artists | /artists | Artist directory |
| Community | /community | Creative hub |
| Blog | /blog | Educational content |
| Contact | /contact | Business inquiries |

---

## 5. HOME PAGE

| Attribute | Value |
|----|----|
| URL | / |
| Canonical | https://www.siryushub.com/ |
| Indexing | Index |
| Primary Keyword | artist management for independent artists |
| Secondary Keywords | creative collective, music marketing |

---

## 6. ABOUT PAGE STRUCTURE

### Primary Page

| Attribute | Value |
|----|----|
| URL | /about |
| Indexing | Index |
| Primary Keyword | about SIRYUS Artist Management |

### Anchor Sections

```
/about#siryus-artist-management
/about#siryus-creative-hub
/about#siryus-creative-media
```

Anchors are not indexed separately and do not require canonical tags.

---

## 7. SERVICES URL STRUCTURE

### Services Index

| Attribute | Value |
|----|----|
| URL | /services |
| Indexing | Index |
| Primary Keyword | artist management services |

### Service Anchors

```
/services/artist-management
/services/music-marketing
/services/distribution-and-rights
/services/creative-development
```

**Routing rule:**
- Anchors may later be upgraded to standalone pages without URL conflict

---

## 8. PROJECTS URL STRUCTURE

### Projects Index

| Attribute | Value |
|----|----|
| URL | /projects |
| Indexing | Index |
| Primary Keyword | creative music projects |

### Individual Project Pages

| Project | URL | Status |
|----|----|----|
| Indiba Project Series | /projects/indiba-project-series | Active |
| Artist Spotlight EPs | /projects/artist-spotlight-eps | Active |
| The Abditory Sessions | /projects/abditory-sessions | Coming soon |
| Apartment Sessions | /projects/apartment-sessions | Coming soon |

**SEO rule:**
- Each project page has unique metadata and structured data

---

## 9. ARTISTS URL STRUCTURE

### Artists Index

| Attribute | Value |
|----|----|
| URL | /artists |
| Indexing | Index |
| Primary Keyword | independent artists |

### Individual Artist Pages

```
/artists/{artist-name}
```

**Slug rules:**
- Lowercase
- Hyphen separated
- Legal or stage name only

Example:
```
/artists/hidaya-morgan
```

---

## 10. COMMUNITY URL STRUCTURE

### Community Landing Page

| Attribute | Value |
|----|----|
| URL | /community |
| Indexing | Index |
| Primary Keyword | creative community for artists |

### Optional Future Routes

```
/community/join
/community/guidelines
/community/network
```

Future routes must inherit community branding and messaging.

---

## 11. BLOG URL STRUCTURE (HEADLESS CMS)

### Blog Index

| Attribute | Value |
|----|----|
| URL | /blog |
| Indexing | Index |
| Primary Keyword | blog for independent artists |

### Category Pages

```
/blog/category/{category-name}
```

Examples:
```
/blog/category/music-business
/blog/category/marketing
/blog/category/creative-careers
```

### Blog Post Pages

```
/blog/{post-slug}
```

Example:
```
/blog/monetizing-your-creativity
```

**CMS rules:**
- WordPress used as headless CMS
- Slugs defined in WordPress and enforced on frontend
- No date based URLs

---

## 12. CONTACT PAGE

| Attribute | Value |
|----|----|
| URL | /contact |
| Indexing | Index |
| Primary Keyword | contact artist management |

---

## 13. REDIRECT AND LEGACY URL HANDLING

### Redirect Rules

- All legacy Hostinger AI URLs redirected with 301 status
- No 302 redirects for permanent pages
- Old service pages mapped to /services

### Example

```
/services-independent-creatives → /services
```

---

## 14. INDEXING AND CRAWLING RULES

| Page Type | Indexing |
|----|----|
| Core pages | Index |
| Blog posts | Index |
| Legal pages | Index |
| 404 | No index |
| Admin or CMS routes | No index |

Robots.txt must allow full crawl of public pages.

---

## 15. STRUCTURED DATA GUIDELINES

Recommended schema types:

- Organization
- CreativeWork
- MusicGroup
- BlogPosting
- BreadcrumbList

Structured data must match visible content exactly.

---

## FINAL VALIDATION CHECKLIST

- No duplicate URLs
- Clean and readable slugs
- SEO friendly hierarchy
- CMS compatible
- Scalable for future expansion
- Brand ownership respected

---

End of URL and SEO slug definition.

