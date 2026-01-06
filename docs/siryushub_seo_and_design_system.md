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
- Dark-themed aesthetic
- High contrast readability

---

## 7. COLOR PALETTE (OFFICIAL BRAND COLORS)

### Theme Approach
**Dark Theme:** The website uses a dark background aesthetic with bright accent colors for visual impact and modern appeal.

### Primary Colors

**Brand Yellow (Primary Accent)**
- `#D1DF4B` - rgb(209, 223, 75)
- Usage: Primary CTAs, key highlights, brand moments
- Variable name: `primary`

**Light Yellow (Secondary Accent)**
- `#D5DD85` - rgb(213, 221, 133)
- Usage: Secondary highlights, hover states, subtle accents
- Variable name: `primary-light`

### Background Colors

**Deep Black (Primary Background)**
- `#1B1B1E` - rgb(27, 27, 30)
- Usage: Main background, hero sections, cards
- Variable name: `background`

**Charcoal (Secondary Background)**
- `#323836` - rgb(50, 56, 54)
- Usage: Card backgrounds, sections, elevated surfaces
- Variable name: `background-elevated`

### Text Colors

**Off-White (Primary Text)**
- `#F5F9E9` - rgb(245, 249, 233)
- Usage: Headings, body text, primary content
- Variable name: `text-primary`

**Gray (Muted Text)**
- `#949BA0` - rgb(148, 155, 160)
- Usage: Secondary text, captions, meta information
- Variable name: `text-muted`

### Color Usage Rules

1. **Backgrounds:** Use `#1B1B1E` as primary, `#323836` for elevation/cards
2. **Text:** Use `#F5F9E9` for primary content, `#949BA0` for secondary
3. **Accents:** Use `#D1DF4B` for CTAs and key elements, `#D5DD85` for hover states
4. **Contrast:** Maintain WCAG AA standards (4.5:1 minimum for text)
5. **Brightness:** Yellow accents pop against dark backgrounds

---

## 8. TYPOGRAPHY

### Font Family

**Primary Typeface:** Aeonik

- **Font:** Aeonik (sans-serif)
- **Variants:** Regular, Medium, Bold, Black
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif
- **Load:** Via Google Fonts or self-hosted

### Font Weights

- **Regular (400):** Body text, paragraphs, descriptions
- **Medium (500):** Emphasized text, subheadings
- **Bold (700):** Section titles (H2, H3), buttons, important labels
- **Black (900):** Page titles (H1), hero headings, major impact moments

### Typography Scale

**Headings:**
- **H1:** 48px - 64px (font-weight: 900) - Hero titles
- **H2:** 36px - 48px (font-weight: 700) - Section titles
- **H3:** 24px - 32px (font-weight: 700) - Subsection titles
- **H4:** 20px - 24px (font-weight: 700) - Card titles

**Body Text:**
- **Large:** 18px - 20px (font-weight: 400) - Intro paragraphs, important content
- **Regular:** 16px - 18px (font-weight: 400) - Standard body text
- **Small:** 14px - 16px (font-weight: 400) - Captions, meta info
- **Tiny:** 12px - 14px (font-weight: 400) - Labels, footnotes

### Line Height

- **Headings:** 1.2 - 1.3
- **Body text:** 1.6 - 1.8
- **Small text:** 1.5

### Letter Spacing

- **Headings:** -0.02em (tighter for impact)
- **Body text:** 0 (default)
- **Uppercase text:** 0.05em - 0.1em (wider for readability)

### Hierarchy Rules

1. H1 appears once per page
2. H2 introduces major sections
3. H3 introduces subsections
4. Body text uses regular weight
5. Use `#F5F9E9` for primary headings
6. Use `#949BA0` for secondary/muted text

---

## 9. SPACING SYSTEM

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

### Buttons

**Primary Button:**
- Background: `#D1DF4B` (brand yellow)
- Text: `#1B1B1E` (dark for contrast)
- Font weight: 700 (Bold)
- Border radius: 4px - 8px
- Padding: 12px 24px (desktop), 10px 20px (mobile)
- Hover: Background `#D5DD85`, slight scale transform

**Secondary Button:**
- Background: `transparent`
- Border: 2px solid `#F5F9E9`
- Text: `#F5F9E9`
- Font weight: 700 (Bold)
- Same sizing as primary
- Hover: Background `#323836`, border `#D1DF4B`

**Text Button:**
- No background or border
- Text: `#D1DF4B`
- Font weight: 500 (Medium)
- Underline on hover

### Cards

**Standard Card:**
- Background: `#323836` (elevated charcoal)
- Border: 1px solid `rgba(245, 249, 233, 0.1)` (subtle off-white)
- Border radius: 8px - 12px
- Padding: 24px - 32px
- Shadow: Optional subtle shadow for depth
- Hover: Border color `#D1DF4B`, slight lift transform

**Feature Card:**
- Same as standard with accent border-top (4px solid `#D1DF4B`)

### Links

**Body Links:**
- Color: `#D1DF4B`
- Underline: On hover
- Font weight: 500 (Medium)

**Navigation Links:**
- Color: `#F5F9E9`
- Active state: `#D1DF4B`
- Hover: `#D5DD85`

### Forms

**Input Fields:**
- Background: `#1B1B1E`
- Border: 1px solid `#949BA0`
- Text: `#F5F9E9`
- Placeholder: `#949BA0`
- Focus: Border `#D1DF4B`, glow effect
- Border radius: 4px
- Padding: 12px 16px

**Labels:**
- Color: `#F5F9E9`
- Font weight: 500 (Medium)
- Margin bottom: 8px

**Error States:**
- Border: Red `#EF4444`
- Error text: Red `#EF4444`

**Success States:**
- Border: Green `#10B981`
- Success text: Green `#10B981`

### Sections

**Background Alternation:**
- Use `#1B1B1E` and `#323836` alternately for visual rhythm
- Hero sections: `#1B1B1E`
- Content sections: Alternate as needed

**Dividers:**
- Color: `rgba(245, 249, 233, 0.1)`
- Height: 1px
- Margin: 48px - 64px vertical

---

## 11. MOTION AND INTERACTION

### Motion Rules

- Motion must serve clarity
- Use entrance animations sparingly
- Avoid looping animations
- Respect reduced motion preferences
- Favor opacity and transform over layout-shifting animations
- Keep animations under 300ms for interactions
- Use 500-800ms for page transitions

### Animation Types

**Entrance Animations:**
- Fade in + slide up (20px)
- Duration: 600ms
- Easing: ease-out
- Stagger children by 100ms

**Hover States:**
- Scale: 1.02 - 1.05
- Duration: 200ms
- Easing: ease-in-out
- Add subtle glow on brand yellow elements

**Page Transitions:**
- Fade crossfade between pages
- Duration: 400ms
- Use Astro View Transitions API

### Tools

- Motion One for advanced animations
- Astro View Transitions for page navigation
- CSS transitions for simple interactions

---

## 12. ACCESSIBILITY BASELINE

- **Color Contrast:** Minimum WCAG AA (4.5:1 for text)
  - `#F5F9E9` on `#1B1B1E` = 15.7:1 ✓
  - `#D1DF4B` on `#1B1B1E` = 10.2:1 ✓
  - `#949BA0` on `#1B1B1E` = 5.8:1 ✓
- **Keyboard Navigation:** Full support for tab navigation
- **Semantic HTML:** Proper heading hierarchy, ARIA labels
- **Focus Indicators:** Visible focus states with `#D1DF4B` outline
- **Descriptive Labels:** All form fields and buttons
- **Alt Text:** All images and icons
- **Motion:** Respect `prefers-reduced-motion`

---

## 13. RESPONSIVE BREAKPOINTS

```javascript
breakpoints: {
  'mobile': '320px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px'
}
```

### Design Adaptations

**Mobile (< 768px):**
- Single column layouts
- H1: 32px - 40px
- Body: 16px
- Padding: 16px - 24px

**Tablet (768px - 1024px):**
- 2-column grids
- H1: 40px - 48px
- Body: 16px - 18px
- Padding: 24px - 32px

**Desktop (> 1024px):**
- Multi-column grids (3-4 columns)
- H1: 48px - 64px
- Body: 18px
- Padding: 32px - 48px

---

## 14. TAILWIND CONFIGURATION REFERENCE

```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D1DF4B',
          light: '#D5DD85'
        },
        background: {
          DEFAULT: '#1B1B1E',
          elevated: '#323836'
        },
        text: {
          primary: '#F5F9E9',
          muted: '#949BA0'
        }
      },
      fontFamily: {
        sans: ['Aeonik', 'system-ui', '-apple-system', 'sans-serif']
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
        black: '900'
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '96': '96px',
        '128': '128px'
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '64px'
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'lg': '12px',
        'xl': '16px'
      }
    }
  }
}
```

---

## FINAL VALIDATION CHECKLIST

- SEO templates consistent
- Structured data defined
- Design tokens clear
- Brand alignment preserved
- Ready for immediate development

---

End of SEO and design system definition.

