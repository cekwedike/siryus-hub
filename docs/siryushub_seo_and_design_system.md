# siryushub.com — SEO Metadata Templates and Design System

This document combines **SEO metadata standards**, **structured data schemas**, and the **design system foundations** for rebuilding **siryushub.com**.

It is intended to be the final reference needed before active development begins.

---

## PART A: SEO METADATA AND STRUCTURED DATA

---

## 1. GLOBAL SEO PRINCIPLES

These rules apply to every indexable page on siryushub.com:

1. One unique title per page
2. One unique meta description per page
3. Titles between 50–60 characters
4. Descriptions between 140–160 characters
5. Primary keyword appears once in the title
6. Branding appended consistently
7. No keyword stuffing

---

## 2. GLOBAL TITLE AND DESCRIPTION FORMAT

### Title Template

```
{Primary Page Intent} | SIRYUS Artist Management
```

### Description Template

```
Clear summary of the page content, written for humans, including one primary keyword and natural supporting terms.
```

---

## 3. PAGE-LEVEL SEO METADATA TEMPLATES

### Home

**Title:**  
SIRYUS Artist Management | Supporting Independent Artists

**Description:**  
SIRYUS Artist Management supports independent artists through management, marketing, collaboration, and creative development.

---

### About

**Title:**  
About SIRYUS Artist Management | Our Story and Structure

**Description:**  
Learn about SIRYUS Artist Management, its mission, community division, and parent company, Siryus Creative Media Ltd.

---

### Services

**Title:**  
Artist Management and Music Marketing Services | SIRYUS A.M

**Description:**  
Professional artist management, music marketing, distribution guidance, and creative development for independent artists.

---

### Projects

**Title:**  
Creative Projects by SIRYUS Artist Management

**Description:**  
Explore collaborative music and creative projects developed and released by SIRYUS Artist Management.

---

### Project Detail Page

**Title Template:**  
{Project Name} | Creative Project by SIRYUS A.M

**Description Template:**  
Overview of the project, participating artists, and creative purpose under SIRYUS Artist Management.

---

### Artists

**Title:**  
Independent Artists | SIRYUS Artist Management

**Description:**  
Discover independent artists working with SIRYUS Artist Management across music and creative disciplines.

---

### Artist Detail Page

**Title Template:**  
{Artist Name} | Artist Profile | SIRYUS A.M

**Description Template:**  
Profile of {Artist Name}, an independent artist collaborating with SIRYUS Artist Management.

---

### Community

**Title:**  
Siryus Creative Hub | Community for Independent Creatives

**Description:**  
The Siryus Creative Hub connects independent artists and creative professionals across the world.

---

### Blog Index

**Title:**  
Blog for Independent Artists | SIRYUS Artist Management

**Description:**  
Insights, guidance, and reflections for independent artists and creative professionals.

---

### Blog Post

**Title Template:**  
{Post Title} | SIRYUS Artist Management

**Description Template:**  
Summary of the blog post content written for independent artists and creatives.

---

### Contact

**Title:**  
Contact SIRYUS Artist Management

**Description:**  
Get in touch with SIRYUS Artist Management to discuss collaboration, services, or general inquiries.

---

## 4. OPEN GRAPH AND SOCIAL METADATA

### Required Tags

- og:title
- og:description
- og:type
- og:url
- og:image

### Rules

- Use consistent brand imagery
- Square image for social previews
- Text visible and readable

---

## 5. STRUCTURED DATA SCHEMAS

### Organization Schema

Used site-wide.

Key properties:
- name: SIRYUS Artist Management
- parentOrganization: Siryus Creative Media Ltd
- url: https://www.siryushub.com
- sameAs: social links

---

### CreativeWork Schema

Used for projects.

Key properties:
- name
- description
- creator
- datePublished

---

### MusicGroup Schema

Used for artist pages.

Key properties:
- name
- genre
- sameAs

---

### BlogPosting Schema

Used for blog posts.

Key properties:
- headline
- author
- datePublished
- image

---

### BreadcrumbList Schema

Used for navigation hierarchy.

---

## PART B: DESIGN SYSTEM AND UI TOKENS

---

## 6. DESIGN SYSTEM PHILOSOPHY

The SIRYUS design system prioritizes:

- Clarity over decoration
- Emotion through restraint
- Strong typography
- Intentional motion
- Consistent spacing

---

## 7. TYPOGRAPHY

### Font Usage

- Primary font: Defined in brand kit
- Headings: Bold or semi-bold
- Body text: Regular

### Hierarchy

- H1: Page identity
- H2: Section titles
- H3: Subsections
- Body: Content

---

## 8. SPACING SYSTEM

Use an 8-point spacing scale:

- 4px
- 8px
- 16px
- 24px
- 32px
- 48px
- 64px

Margins and padding must follow this scale.

---

## 9. LAYOUT GRID

- Desktop: 12-column grid
- Tablet: 8-column grid
- Mobile: 4-column grid

Content max width defined in brand kit.

---

## 10. COMPONENT STYLING RULES

- Buttons: Clear hierarchy between primary and secondary
- Cards: Subtle elevation or border
- Links: Visually distinct
- Forms: Simple and accessible

---

## 11. MOTION AND INTERACTION

### Motion Rules

- Motion must serve clarity
- Use entrance animations sparingly
- Avoid looping animations
- Respect reduced motion preferences

### Tools

- Framer Motion for page transitions
- CSS transitions for simple interactions

---

## 12. ACCESSIBILITY BASELINE

- Sufficient color contrast
- Keyboard navigation support
- Semantic HTML
- Descriptive labels

---

## FINAL VALIDATION CHECKLIST

- SEO templates consistent
- Structured data defined
- Design tokens clear
- Brand alignment preserved
- Ready for immediate development

---

End of SEO and design system definition.

