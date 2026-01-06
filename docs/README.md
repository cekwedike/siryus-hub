# SIRYUS Hub Website — Complete Project Documentation

> **Official documentation for siryushub.com rebuild**  
> A comprehensive website for SIRYUS Artist Management (SIRYUS A.M), the Siryus Creative Hub community division, and parent company Siryus Creative Media Ltd.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Brand Architecture](#brand-architecture)
3. [Technology Stack](#technology-stack)
4. [Site Structure](#site-structure)
5. [Content Guidelines](#content-guidelines)
6. [Design System](#design-system)
7. [SEO Strategy](#seo-strategy)
8. [Component Architecture](#component-architecture)
9. [Development Roadmap](#development-roadmap)
10. [Deployment Guide](#deployment-guide)
11. [Maintenance and Support](#maintenance-and-support)

---

## Project Overview

### Purpose

siryushub.com is the official digital platform for **SIRYUS Artist Management**, an artist management and marketing agency that works with independent artists to develop their careers through strategy, collaboration, and opportunity.

### Key Objectives

- Provide clear information about SIRYUS Artist Management services and mission
- Showcase creative projects and managed artists
- Build and grow the Siryus Creative Hub community
- Share insights and resources through blog content
- Convert visitors into clients and community members
- Establish brand authority in the independent artist management space

### Target Audiences

**Primary:**
- Independent musicians, songwriters, and producers
- Creative professionals building independent careers

**Secondary:**
- Creative collaborators and partners
- Cultural organizations
- Industry professionals
- Platforms seeking partnerships

---

## Brand Architecture

### Three Core Brands

The website represents three interconnected entities with distinct roles:

#### 1. SIRYUS Artist Management (SIRYUS A.M)

**Role:** The primary brand and service provider  
**Function:** Artist management, marketing, distribution guidance, creative development  
**Website Presence:** Most prominent throughout the site (Home, Services, Projects, Artists, Blog)

#### 2. Siryus Creative Hub

**Role:** The community division  
**Function:** Connecting independent creatives, fostering collaboration, building network  
**Website Presence:** Dedicated Community page, referenced on About page  
**Relationship:** A division of SIRYUS Artist Management

#### 3. Siryus Creative Media Ltd

**Role:** Parent company providing legal structure  
**Function:** Strategic oversight, legal framework, international operations  
**Website Presence:** Explained on About page, footer copyright, legal pages  
**Location:** Incorporated in Nigeria, operating internationally

### Brand Hierarchy Rules

- **Header navigation:** SIRYUS A.M logo only
- **Footer:** All three brands listed with descriptions
- **About page:** Clear explanation of all three entities and relationships
- **Services page:** SIRYUS A.M only (no Hub content)
- **Community page:** Siryus Creative Hub prominently featured with "division of SIRYUS A.M" label
- **Legal pages:** Siryus Creative Media Ltd ownership
- **Copyright:** © Siryus Creative Media Ltd

---

## Technology Stack

### Frontend Framework

**Primary:** Astro 4+

**Why Astro:**
- Content-focused architecture perfect for artist management website
- Superior performance with minimal JavaScript
- Excellent static site generation
- Simple deployment to traditional hosting (Hostinger)
- Seamless headless WordPress integration
- Future-proof and scalable

### Supporting Technologies

- **React 18:** For interactive components (forms, mobile menu, animations)
- **TypeScript:** Required for type safety and better developer experience
- **Tailwind CSS:** Utility-first CSS framework matching brand design system
- **Motion One:** Lightweight animation library for intentional motion
- **View Transitions API:** Smooth page transitions

### CMS Strategy

**WordPress (Headless)**

- WordPress installed on subdomain (`cms.siryushub.com`) or Hostinger subdirectory
- Frontend consumes content via WordPress REST API or WPGraphQL
- Blog posts, categories, and content managed in WordPress
- No WordPress theming used — all templates built in Astro
- Editorial flexibility with familiar WordPress interface

### Architecture

```
WordPress CMS (cms.siryushub.com)
        ↓ REST API / GraphQL
Astro Static Site (www.siryushub.com)
        ↓ Build Process
Static Files (Hostinger public_html)
```

### Hosting

**Platform:** Hostinger  
**Deployment Method:** Static file hosting  
**Domain:** https://www.siryushub.com

**Benefits:**
- Extremely fast page loads
- No server management required
- Cost-effective traditional hosting
- Simple deployment workflow

---

## Site Structure

### Primary Navigation Routes

```
/                    — Home (ecosystem overview)
/about               — About (brand architecture, mission, company info)
/services            — Services (artist management offerings)
/projects            — Projects (creative initiatives index)
/projects/[slug]     — Individual project pages
/artists             — Artists (managed artists directory)
/artists/[slug]      — Individual artist profiles
/community           — Community (Siryus Creative Hub)
/blog                — Blog (insights for independent artists)
/blog/[slug]         — Individual blog posts
/blog/category/[slug] — Blog category pages
/contact             — Contact (inquiry form and details)
```

### System and Legal Routes

```
/404                 — Custom error page
/sitemap             — Human-readable sitemap
/faq                 — Frequently asked questions
/privacy-policy      — Privacy policy
/terms-of-use        — Terms of use
/cookie-policy       — Cookie policy
```

### URL Structure Rules

1. Lowercase only
2. Hyphen-separated words
3. No trailing slashes in canonical URLs
4. Human-readable and descriptive
5. One primary intent per URL
6. No keyword stuffing
7. Clear brand ownership

**Examples:**
- ✅ `/projects/indiba-project-series`
- ✅ `/artists/hidaya-morgan`
- ✅ `/blog/monetizing-your-creativity`
- ❌ `/Projects/IndibaProjectSeries`
- ❌ `/artist_profile.php?id=123`

---

## Content Guidelines

### Brand Voice Characteristics

SIRYUS communicates in a tone that is:

- **Clear:** Easy to understand without jargon
- **Professional:** Credible and trustworthy
- **Human:** Approachable and relatable
- **Supportive:** Encouraging and helpful
- **Globally neutral:** Accessible across regions and cultures
- **Creative but grounded:** Inspiring without abstraction

### What the Voice Is

- Informative without being academic
- Encouraging without exaggeration
- Confident without arrogance
- Creative without excessive abstraction

### What the Voice Is Not

- Not corporate jargon heavy
- Not slang-driven or culturally exclusive
- Not overly ideological
- Not sales-focused or aggressive
- **No em dashes (—) anywhere**

### Content Writing Rules

1. Clearly state what SIRYUS Artist Management does on every core page
2. Clearly explain relationships between SIRYUS A.M, Siryus Creative Hub, and Siryus Creative Media Ltd
3. Avoid vague statements without explanation
4. Use full sentences and complete thoughts
5. Avoid exaggeration and unrealistic claims
6. No em dashes (use periods, commas, or colons instead)

### SEO Content Strategy

**Core Keyword Themes:**
- Artist management for independent artists
- Music marketing and promotion
- Creative collective for artists
- Independent artist development
- Music collaboration projects
- Artist community and creative hub

**SEO Writing Rules:**
- Keywords placed naturally within context
- Clear heading hierarchy (H1 → H2 → H3)
- Human readability prioritized over keyword density
- No keyword stuffing
- Geographic neutrality with African creative context where relevant

---

## Design System

### Design Philosophy

The SIRYUS design system prioritizes:

- **Clarity over decoration:** Content and purpose come first
- **Emotion through restraint:** Intentional use of space and motion
- **Strong typography:** Clear hierarchy and excellent readability
- **Intentional motion:** Animations serve clarity, not distraction
- **Consistent spacing:** Predictable, mathematical spacing system

### Typography

**Font Usage:**
- Primary font: Defined in brand style guide
- Headings: Bold or semi-bold weights
- Body text: Regular weight

**Hierarchy:**
- **H1:** Page identity (one per page)
- **H2:** Section titles
- **H3:** Subsections
- **Body:** Content paragraphs

### Spacing System

**8-Point Grid:**

All margins, padding, and spacing follow an 8-point scale:

- 4px (0.5 unit)
- 8px (1 unit)
- 16px (2 units)
- 24px (3 units)
- 32px (4 units)
- 48px (6 units)
- 64px (8 units)

### Layout Grid

- **Desktop:** 12-column grid
- **Tablet:** 8-column grid
- **Mobile:** 4-column grid

**Max content width:** Defined in brand kit (typically 1200-1400px)

### Color System

Colors defined in brand style guide. Usage rules:

- Consistent application across components
- Sufficient contrast for accessibility
- Brand colors for primary actions
- Neutral colors for content hierarchy

### Component Styling Principles

- **Buttons:** Clear hierarchy between primary and secondary
- **Cards:** Subtle elevation or border, not excessive shadows
- **Links:** Visually distinct from body text
- **Forms:** Simple, accessible, with clear error states
- **Icons:** Consistent size and visual weight

### Motion and Interaction Guidelines

**Motion Rules:**
- Motion must serve clarity and guide attention
- Use entrance animations sparingly
- Avoid looping animations (except loading states)
- Respect `prefers-reduced-motion` preference
- Smooth, purposeful transitions (200-400ms)

**Tools:**
- Motion One for complex animations
- CSS transitions for simple interactions
- View Transitions API for page navigation

### Accessibility Baseline

**Required Standards:**
- WCAG 2.1 AA compliance minimum
- Sufficient color contrast (4.5:1 for text)
- Keyboard navigation support throughout
- Semantic HTML structure
- Descriptive ARIA labels where needed
- Focus indicators on interactive elements
- Screen reader compatibility

---

## SEO Strategy

### Global SEO Principles

Applied to every indexable page:

1. One unique title per page (50-60 characters)
2. One unique meta description per page (140-160 characters)
3. Primary keyword appears once in the title
4. Consistent branding appended to titles
5. No keyword stuffing
6. Clean URL structure
7. Canonical tags on all pages
8. Open Graph and Twitter Card metadata

### Title Template Format

```
{Primary Page Intent} | SIRYUS Artist Management
```

**Examples:**
- `About SIRYUS Artist Management | Our Story and Structure`
- `Artist Management Services | SIRYUS A.M`
- `Creative Projects by SIRYUS Artist Management`

### Meta Description Format

```
Clear summary of page content, written for humans, including one primary keyword and natural supporting terms.
```

**Length:** 140-160 characters

### Page-Level SEO Templates

#### Home Page
**Title:** SIRYUS Artist Management | Supporting Independent Artists  
**Description:** SIRYUS Artist Management supports independent artists through management, marketing, collaboration, and strategic career development.  
**Keywords:** artist management, independent artists, creative collective

#### About Page
**Title:** About SIRYUS Artist Management | Our Story and Structure  
**Description:** Learn about SIRYUS Artist Management, its mission, community division, and parent company, Siryus Creative Media Ltd.  
**Keywords:** about SIRYUS, artist management company, Siryus Creative Media

#### Services Page
**Title:** Artist Management and Music Marketing Services | SIRYUS A.M  
**Description:** Professional artist management, music marketing, distribution guidance, and creative development for independent artists.  
**Keywords:** artist management services, music marketing, independent artist support

#### Projects Page
**Title:** Creative Projects by SIRYUS Artist Management  
**Description:** Explore collaborative music and creative projects developed and released by SIRYUS Artist Management.  
**Keywords:** music projects, creative collaborations, artist initiatives

#### Artists Page
**Title:** Independent Artists | SIRYUS Artist Management  
**Description:** Discover independent artists working with SIRYUS Artist Management across music and creative disciplines.  
**Keywords:** independent artists, managed artists, music artists

#### Community Page
**Title:** Siryus Creative Hub | Community for Independent Creatives  
**Description:** The Siryus Creative Hub connects independent artists and creative professionals across the world.  
**Keywords:** creative community, artist network, collaboration hub

#### Blog Page
**Title:** Blog for Independent Artists | SIRYUS Artist Management  
**Description:** Insights, guidance, and reflections for independent artists and creative professionals.  
**Keywords:** music industry blog, artist resources, creative careers

#### Contact Page
**Title:** Contact SIRYUS Artist Management  
**Description:** Get in touch with SIRYUS Artist Management to discuss collaboration, services, or general inquiries.  
**Keywords:** contact artist management, inquiry form

### Structured Data (Schema.org)

**Required Schema Types:**

#### Organization Schema (Site-wide)
```json
{
  "@type": "Organization",
  "name": "SIRYUS Artist Management",
  "alternateName": "SIRYUS A.M",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Siryus Creative Media Ltd"
  },
  "url": "https://www.siryushub.com",
  "sameAs": [
    "https://instagram.com/siryusam",
    "https://twitter.com/siryusam",
    "https://youtube.com/@siryusam"
  ]
}
```

#### CreativeWork Schema (Projects)
```json
{
  "@type": "CreativeWork",
  "name": "Project Name",
  "description": "Project description",
  "creator": {
    "@type": "Organization",
    "name": "SIRYUS Artist Management"
  },
  "datePublished": "YYYY-MM-DD"
}
```

#### MusicGroup Schema (Artists)
```json
{
  "@type": "MusicGroup",
  "name": "Artist Name",
  "genre": ["Genre 1", "Genre 2"],
  "sameAs": [
    "https://open.spotify.com/artist/...",
    "https://instagram.com/artist"
  ]
}
```

#### BlogPosting Schema (Blog Posts)
```json
{
  "@type": "BlogPosting",
  "headline": "Post Title",
  "author": {
    "@type": "Organization",
    "name": "SIRYUS Artist Management"
  },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "image": "image-url"
}
```

#### BreadcrumbList Schema (Navigation)
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.siryushub.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Projects",
      "item": "https://www.siryushub.com/projects"
    }
  ]
}
```

### Open Graph and Social Metadata

**Required Tags:**
- `og:title` — Page title
- `og:description` — Page description
- `og:type` — Type (website, article, profile)
- `og:url` — Canonical URL
- `og:image` — Social preview image (1200x630px)
- `og:site_name` — "SIRYUS Artist Management"

**Twitter Card Tags:**
- `twitter:card` — "summary_large_image"
- `twitter:title` — Page title
- `twitter:description` — Page description
- `twitter:image` — Social preview image
- `twitter:site` — "@siryusam"

### Sitemap and Robots

**XML Sitemap:** Auto-generated at `/sitemap.xml`  
**Robots.txt:** Allow full crawl of public pages

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://www.siryushub.com/sitemap.xml
```

---

## Component Architecture

### Global Layout Components

#### RootLayout
Wrapper for entire application.

**Responsibilities:**
- Inject global metadata
- Load fonts
- Apply theme tokens
- Load analytics scripts

#### Header
Fixed or sticky navigation component.

**Elements:**
- SIRYUS A.M logo (left)
- Primary navigation links (center/right)
- Call-to-action button (right)
- Mobile menu toggle

**Navigation Items:**
- Home, About, Services, Projects, Artists, Community, Blog, Contact

**Behavior:**
- Mobile collapses into drawer menu
- Active route highlighted
- Smooth transitions

#### Footer
Site-wide footer with comprehensive information.

**Sections:**

1. **Brand Group:**
   - SIRYUS Artist Management logo + description
   - Siryus Creative Hub logo + description
   - Siryus Creative Media Ltd logo + description

2. **Navigation Links:**
   - All primary pages

3. **Support and Legal:**
   - FAQ, Privacy Policy, Terms of Use, Cookie Policy

4. **Social Links:**
   - YouTube, Instagram, X (Twitter), Facebook, TikTok

5. **Copyright:**
   - © Siryus Creative Media Ltd

### Page-Specific Components

#### Home Page Components
- `HeroSection` — Primary headline, CTAs, background visual
- `AboutPreview` — Short intro with link to About
- `ServicesPreview` — Four service cards with link to Services
- `ProjectsPreview` — Project highlights with link to Projects
- `CommunityPreview` — Community description with CTA
- `BlogPreview` — Latest 3 blog posts with link to Blog
- `CallToAction` — Final conversion section

#### About Page Components
- `PageHeader` — Page title and intro
- `StorySection` — Brand narrative
- `MissionVision` — Mission and vision statements
- `DivisionBreakdown` — SIRYUS A.M and Hub explanations
- `ParentCompany` — Siryus Creative Media Ltd info

#### Services Page Components
- `PageHeader` — Services introduction
- `ServicesGrid` — Service cards with descriptions
- `ProcessOverview` — How we work explanation
- `CallToAction` — Contact CTA

#### Projects Page Components
- `PageHeader` — Projects introduction
- `ProjectsGrid` — Project cards with status badges
- `ProjectStatusLegend` — Status definitions

#### Project Detail Components
- `ProjectHero` — Project title, image, metadata
- `ProjectDescription` — Detailed overview
- `MediaSection` — Embedded audio/video
- `CreditsSection` — Contributors and roles
- `RelatedProjects` — Similar projects

#### Artists Page Components
- `PageHeader` — Artists introduction
- `ArtistsGrid` — Artist cards with images
- `FilterBar` — Optional filtering by genre/status

#### Artist Detail Components
- `ArtistHero` — Name, image, genre, links
- `BioSection` — Artist biography
- `MediaEmbeds` — Spotify/YouTube embeds
- `AssociatedProjects` — Projects they've participated in
- `ExternalLinks` — Social media, streaming platforms

#### Community Page Components
- `PageHeader` — Community introduction
- `CommunityIntro` — What is Siryus Creative Hub
- `BenefitsGrid` — Benefits of joining
- `JoinCTA` — How to join

#### Blog Components
- `FeaturedPost` — Hero-style featured post
- `PostsGrid` — Grid of post cards
- `PostCard` — Individual post preview
- `Pagination` — Page navigation
- `PostHeader` — Post title, date, author
- `PostContent` — Formatted post body
- `AuthorBox` — Author information
- `RelatedPosts` — Similar content

#### Contact Page Components
- `PageHeader` — Contact introduction
- `ContactForm` — Form with validation (React component)
- `ContactDetails` — Email, social links

### Reusable UI Components

**Component Library:**

- `Button` — Primary, secondary, ghost variants
- `Card` — Content container with optional hover effects
- `SectionHeader` — Consistent section titles
- `GridLayout` — Responsive grid wrapper
- `Badge` — Status indicators (Active, Coming Soon, etc.)
- `CTABlock` — Reusable call-to-action section
- `AnimatedSection` — Fade-in on scroll wrapper
- `FadeIn` — Entrance animation component

**Component Requirements:**
- Fully typed with TypeScript
- Accessible (ARIA labels, keyboard navigation)
- Responsive across all breakpoints
- Support variants and states
- Motion-safe animations (respect prefers-reduced-motion)

---

## Development Roadmap

### Phase 1: Project Setup & Environment (0% → 15%)

**Tasks:**
- Install Node.js, Git, VS Code
- Initialize Astro project with TypeScript
- Install core dependencies (React, Tailwind, Motion)
- Configure project files (astro.config, tailwind.config, tsconfig)
- Set up Git repository

**Validation:**
- Project runs with `npm run dev`
- TypeScript configured correctly
- Tailwind CSS working
- Build succeeds with `npm run build`

---

### Phase 2: Core Infrastructure & Routing (15% → 30%)

**Tasks:**
- Create folder structure (pages, components, lib, types, public)
- Set up routing for all pages
- Create BaseLayout with metadata
- Build Header and Footer components
- Implement mobile menu
- Create utility functions (metadata, URL helpers, date formatting, class names)

**Validation:**
- All routes accessible
- Global layout components render on all pages
- Navigation functional
- Mobile menu works
- Utilities export correctly

---

### Phase 3: Design System & UI Components (30% → 45%)

**Tasks:**
- Configure Tailwind design tokens (colors, spacing, typography, breakpoints)
- Build reusable UI components (Button, Card, SectionHeader, Badge, CTABlock, GridLayout)
- Implement animation system with Motion One
- Set up View Transitions for page navigation
- Respect prefers-reduced-motion

**Validation:**
- Design tokens accessible in components
- All UI components render correctly
- Props and variants work as expected
- TypeScript types enforced
- Animations smooth and performant
- Accessibility tested

---

### Phase 4: Page Development (45% → 65%)

**Tasks:**
- Build Home page with all sections
- Build About page with brand hierarchy
- Build Services page with service grid
- Build Projects index and detail pages
- Build Artists index and detail pages
- Build Community page
- Build Contact page with form
- Build system pages (404, FAQ, legal pages)

**Validation:**
- All pages render correctly
- Content matches documentation
- Responsive on all breakpoints
- CTAs functional
- Forms validate properly
- Navigation works across all pages

---

### Phase 5: CMS Integration & Dynamic Content (65% → 75%)

**Tasks:**
- Set up WordPress headless CMS on Hostinger
- Configure WordPress for API access (REST or GraphQL)
- Create WordPress API client
- Create type definitions for posts
- Implement data fetching functions
- Build Blog index, post detail, and category pages
- Implement static generation for blog posts
- Set up content collections in Astro

**Validation:**
- WordPress accessible and configured
- API calls successful
- Blog pages render WordPress content
- Pagination works
- Categories filter correctly
- Static generation optimized

---

### Phase 6: SEO & Analytics Implementation (75% → 85%)

**Tasks:**
- Add SEO metadata to all pages
- Generate dynamic metadata for blog/projects/artists
- Add Open Graph and Twitter Card tags
- Configure canonical URLs
- Implement structured data schemas
- Generate XML sitemaps
- Create robots.txt
- Set up Google Analytics 4
- Add Google Search Console verification
- Configure cookie consent banner
- Implement accessibility features

**Validation:**
- All pages have unique titles and descriptions
- Structured data validates (Google Rich Results Test)
- Sitemap accessible and complete
- Analytics tracking in real-time
- Cookie consent working
- WCAG 2.1 AA compliance
- Lighthouse accessibility score 95+

---

### Phase 7: Testing & Optimization (85% → 95%)

**Tasks:**
- Optimize images (Astro Image component, lazy loading)
- Minimize JavaScript bundle size
- Enable compression and caching headers
- Test on Chrome, Firefox, Safari, Edge
- Test on mobile browsers (iOS Safari, Chrome Android)
- Test responsive design at all breakpoints
- Content review for accuracy
- Check all links work
- Security audit (API keys, form validation, dependencies)
- SEO final audit

**Performance Targets:**
- Lighthouse Performance Score: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

**Validation:**
- Performance metrics meet targets
- Cross-browser compatible
- Fully responsive
- Content accurate
- No security vulnerabilities
- SEO audit passed

---

### Phase 8: Deployment & Launch (95% → 100%)

**Tasks:**
- Create production environment variables
- Configure WordPress for production
- Test production build locally
- Backup existing Hostinger site
- Remove old Hostinger AI Builder site
- Deploy Astro static site to Hostinger
- Configure .htaccess for routing
- Set up SSL certificate (HTTPS)
- Configure redirects from old URLs
- Submit sitemap to Google Search Console
- Verify analytics tracking
- Complete site walkthrough
- Create maintenance documentation

**Validation:**
- Site live at https://www.siryushub.com
- HTTPS working
- All pages accessible
- Old URLs redirect correctly
- Search engines notified
- Analytics recording data
- Forms working in production
- No critical errors

---

### Timeline Estimates

**Realistic Timeline (Full-Time Developer):**
- Phase 1: 1-2 days
- Phase 2: 3-5 days
- Phase 3: 5-7 days
- Phase 4: 10-15 days
- Phase 5: 5-7 days
- Phase 6: 3-5 days
- Phase 7: 5-7 days
- Phase 8: 2-3 days

**Total: 34-51 days (5-8 weeks)**

*Adjust based on team size and availability.*

---

## Deployment Guide

### Pre-Deployment Preparation

1. **Environment Variables**

Create production `.env` file:

```bash
PUBLIC_SITE_URL=https://www.siryushub.com
WORDPRESS_API_URL=https://cms.siryushub.com/wp-json/wp/v2
PUBLIC_GA_ID=G-XXXXXXXXXX
PUBLIC_GSC_VERIFICATION=verification-code
```

2. **Build Production Bundle**

```bash
npm run build
```

This generates static files in the `dist/` folder.

3. **Test Locally**

```bash
npm run preview
```

Verify everything works in production mode.

---

### Hostinger Deployment Steps

#### Method 1: FTP Upload (Recommended)

1. **Connect to Hostinger via FTP:**
   - Use FileZilla or similar FTP client
   - Host: ftp.siryushub.com
   - Username: Your Hostinger FTP username
   - Password: Your Hostinger FTP password

2. **Upload Files:**
   - Navigate to `public_html` directory on server
   - Upload all contents from `dist/` folder (not the folder itself)
   - Ensure `.htaccess` file is included

3. **Configure .htaccess (if needed):**

Create or update `.htaccess` for clean URLs:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Force HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # Force www
  RewriteCond %{HTTP_HOST} !^www\.
  RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # Serve existing files/directories, otherwise route to index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /index.html [L]
</IfModule>
```

4. **Verify Deployment:**
   - Visit https://www.siryushub.com
   - Test all major pages
   - Check navigation
   - Test forms
   - Verify analytics tracking

#### Method 2: Hostinger File Manager

1. Log in to Hostinger control panel
2. Open File Manager
3. Navigate to `public_html`
4. Upload `dist/` contents via file manager
5. Set permissions if needed (755 for directories, 644 for files)

---

### WordPress CMS Setup (Headless)

#### Option 1: Subdomain Installation

1. **Create Subdomain:**
   - In Hostinger, create subdomain: `cms.siryushub.com`
   - Point to separate directory (e.g., `public_html/cms`)

2. **Install WordPress:**
   - Use Hostinger Auto Installer or manual installation
   - Configure database credentials
   - Complete WordPress setup wizard

3. **Configure for Headless:**
   - Install WPGraphQL plugin (if using GraphQL)
   - Or use WordPress REST API (built-in)
   - Install Yoast SEO or Rank Math
   - Configure CORS headers

Add to WordPress `.htaccess` or `wp-config.php`:

```php
header("Access-Control-Allow-Origin: https://www.siryushub.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
```

4. **Create Content:**
   - Set up categories (Music Business, Marketing, Creative Careers, Productivity)
   - Create initial blog posts
   - Configure permalinks: `/%postname%/`

#### Option 2: Subdirectory Installation

1. Install WordPress in `public_html/cms` directory
2. Access at `www.siryushub.com/cms`
3. Follow same configuration steps as Option 1
4. Update API URL in frontend `.env`

---

### SSL Certificate

**Hostinger includes free SSL certificates:**

1. Log in to Hostinger control panel
2. Navigate to SSL section
3. Enable SSL for siryushub.com
4. Wait 10-15 minutes for activation
5. Verify HTTPS works: https://www.siryushub.com

---

### Post-Deployment Checklist

- [ ] Site accessible at https://www.siryushub.com
- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] www enforced (non-www redirects to www)
- [ ] All pages load correctly
- [ ] Navigation works throughout
- [ ] Forms submit successfully
- [ ] Blog posts display from WordPress
- [ ] Images load correctly
- [ ] Analytics tracking (check Google Analytics real-time)
- [ ] Search Console sitemap submitted
- [ ] Social media previews work (test with Facebook Debugger, Twitter Card Validator)
- [ ] Mobile responsive
- [ ] Cross-browser compatible
- [ ] Lighthouse scores meet targets
- [ ] No console errors

---

### Redirects from Old Site

If migrating from existing site, set up 301 redirects in `.htaccess`:

```apache
# Redirect old service pages to new services page
Redirect 301 /old-services https://www.siryushub.com/services
Redirect 301 /old-about https://www.siryushub.com/about

# Redirect old blog URLs to new structure
RedirectMatch 301 ^/blog/(\d{4})/(\d{2})/(.*)$ https://www.siryushub.com/blog/$3
```

---

## Maintenance and Support

### Daily Monitoring (First 30 Days)

- [ ] Check error logs in Hostinger control panel
- [ ] Monitor Google Analytics for traffic and issues
- [ ] Test contact form submissions (check inbox)
- [ ] Check site uptime

### Weekly Tasks

- [ ] Review performance metrics (Lighthouse, PageSpeed Insights)
- [ ] Check Google Search Console for crawl errors
- [ ] Monitor user feedback and inquiries
- [ ] Review analytics data for insights
- [ ] Backup website files and database

### Monthly Tasks

- [ ] Update dependencies (`npm update`)
- [ ] Review and optimize performance
- [ ] Update content as needed (blog posts, projects, artists)
- [ ] Full site backup (files + WordPress database)
- [ ] Security audit (`npm audit`)
- [ ] Review SEO performance in Search Console

### Content Updates

#### Adding a New Blog Post

1. Log in to WordPress (cms.siryushub.com/wp-admin)
2. Create new post
3. Write content with proper formatting
4. Add featured image (1200x630px)
5. Set category
6. Configure SEO metadata (Yoast/Rank Math)
7. Publish
8. Trigger rebuild of frontend (if not auto-deployed)

#### Adding a New Project

1. Update project content in Astro source code
2. Create new file: `/src/pages/projects/project-slug.astro`
3. Add project to projects index page
4. Include project metadata (title, description, status, date)
5. Add images to `/public/images/projects/`
6. Rebuild and deploy

#### Adding a New Artist

1. Create new file: `/src/pages/artists/artist-name.astro`
2. Add artist to artists index page
3. Include artist information (bio, genre, links, image)
4. Add profile image to `/public/images/artists/`
5. Embed Spotify/YouTube links
6. Link to associated projects
7. Rebuild and deploy

### Troubleshooting Guide

#### Site Not Loading

- Check Hostinger uptime status
- Verify DNS settings
- Check SSL certificate status
- Review .htaccess for errors
- Check file permissions (755/644)

#### Forms Not Submitting

- Verify form action endpoint
- Check API keys in environment variables
- Test with browser developer tools
- Check spam filter settings
- Review server error logs

#### WordPress API Not Working

- Verify WordPress site is accessible
- Check CORS headers configuration
- Test API endpoint directly in browser
- Review API credentials
- Check WordPress plugin compatibility

#### Performance Issues

- Run Lighthouse audit to identify issues
- Check image optimization
- Review bundle size
- Enable caching headers
- Optimize database queries (WordPress)

### Backup Strategy

#### Automated Backups

Use Hostinger's built-in backup feature:
- Weekly full site backups
- Database backups included
- Restore available through control panel

#### Manual Backups

**Files:**
```bash
# Download via FTP or Hostinger File Manager
# Backup: public_html directory
```

**WordPress Database:**
```bash
# Export via phpMyAdmin in Hostinger
# Or use WordPress backup plugin
```

**Version Control:**
```bash
# Commit and push to GitHub regularly
git add .
git commit -m "Update content/features"
git push origin main
```

### Support Resources

**Documentation:**
- This README (comprehensive reference)
- Individual documentation files in `/docs` folder
- Astro documentation: https://docs.astro.build
- Tailwind CSS documentation: https://tailwindcss.com/docs
- WordPress REST API documentation: https://developer.wordpress.org/rest-api/

**Hostinger Support:**
- Live chat available 24/7
- Knowledge base: https://support.hostinger.com
- Email support

**Developer Resources:**
- GitHub Issues (for bug tracking)
- Stack Overflow (for technical questions)
- Astro Discord community

---

## Key Success Factors

1. **Follow Documentation:** All specifications exist in supporting documents — use them as authoritative reference
2. **Test Continuously:** Test after each phase completion, don't wait until the end
3. **Commit Regularly:** Use Git for version control throughout development
4. **Focus on Quality:** Don't rush through phases, ensure each is complete
5. **Validate Everything:** Use validation checkpoints provided in roadmap
6. **Reference Source Documents:** Always verify against the 6 core documentation files
7. **Brand Consistency:** Maintain clear brand hierarchy throughout
8. **User-Centric Design:** Prioritize clarity, accessibility, and user experience

---

## Supporting Documentation Files

This README synthesizes information from these detailed documents in `/docs`:

1. **`siryusam_content_tone_and_site_copy.md`**  
   Complete website copy, messaging framework, and brand voice guidelines

2. **`siryushub_build_roadmap.md`**  
   Step-by-step development roadmap from 0% to 100% with validation checkpoints

3. **`siryushub_component_level_wireframes.md`**  
   Component architecture, layout structure, and reusable UI blocks

4. **`siryushub_seo_and_design_system.md`**  
   SEO metadata templates, structured data schemas, and design system foundations

5. **`siryushub_sitemap_wireframe.md`**  
   Site structure, routing hierarchy, and brand ownership map

6. **`siryushub_tech_stack_and_deployment.md`**  
   Technology decisions, CMS strategy, and hosting approach

7. **`siryushub_url_structure_and_seo_slugs.md`**  
   URL structure, SEO-friendly slugs, canonical rules, and indexing guidance

**Additional Resources:**
- `Siryus Hub.pdf` — Original project brief
- `Siryus Style Guide.pdf` — Visual brand guidelines

---

## Project Status

**Current Phase:** Ready for development  
**Completion:** 0% (Documentation complete, implementation pending)  
**Next Steps:** Begin Phase 1 (Project Setup & Environment)

---

## Contact Information

**Project Owner:** Siryus Creative Media Ltd  
**Website:** https://www.siryushub.com (under development)  
**Email:** contact@siryushub.com (to be configured)

---

## License and Copyright

© 2024-2026 Siryus Creative Media Ltd. All rights reserved.

This project and all associated documentation, code, content, and brand assets are proprietary to Siryus Creative Media Ltd and protected by copyright law.

**Unauthorized use, reproduction, or distribution is prohibited.**

---

## Revision History

- **Version 1.0** — January 6, 2026 — Initial comprehensive README created from all documentation sources
- Documentation reflects complete project requirements ready for development phase

---

**End of Documentation**

*This README is comprehensive, actionable, and serves as the single source of truth for the siryushub.com rebuild project.*
