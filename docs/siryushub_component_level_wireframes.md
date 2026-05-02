# siryushub.com: Component-Level Page Wireframes

This document defines the **component architecture, layout structure, and reusable UI blocks** for rebuilding **siryushub.com**.

It is written so that a **developer or designer can build the site directly** without ambiguity, while remaining faithful to the SIRYUS brand and future scalability.

---

## 1. GLOBAL LAYOUT COMPONENTS

These components appear across the entire site.

---

### 1.1 Root Layout

**Component:** `RootLayout`

**Structure:**
```
<RootLayout>
  <Header />
  <MainContent />
  <Footer />
</RootLayout>
```

Responsibilities:
- Inject global metadata
- Load fonts
- Apply theme tokens
- Load analytics scripts

---

### 1.2 Header

**Component:** `Header`

**Position:** Fixed or sticky (desktop), static (mobile)

**Elements (left to right):**
- SIRYUS A.M logo
- Primary navigation
- Call to action button

**Navigation Items:**
- Home
- About
- Services
- Projects
- Artists
- Community
- Blog
- Contact

**Behavior:**
- Mobile collapses into menu drawer
- Active route highlighted

---

### 1.3 Footer

**Component:** `Footer`

**Sections:**

1. Brand Group
   - SIRYUS Artist Management logo and description
   - Siryus Creative Hub logo and description
   - Siryus Creative Media Ltd logo and description

2. Navigation Links
   - Home
   - About
   - Services
   - Projects
   - Artists
   - Community
   - Blog
   - Contact

3. Support and Legal
   - FAQ
   - Privacy Policy
   - Terms of Use
   - Cookie Policy

4. Social Links
   - YouTube
   - Instagram
   - X
   - Facebook
   - TikTok

5. Copyright
   - © Siryus Creative Media Ltd

---

## 2. PAGE-SPECIFIC WIREFRAMES

---

## 2.1 HOME PAGE

**Layout Order:**

```
HeroSection
AboutPreview
ServicesPreview
ProjectsPreview
CommunityPreview
BlogPreview
CallToAction
```

### HeroSection

Elements:
- Primary headline
- Supporting paragraph
- Primary CTA button
- Secondary CTA button
- Background visual or motion element

---

### AboutPreview

Elements:
- Section heading
- Short descriptive text
- Link to About page

---

### ServicesPreview

Elements:
- Section heading
- Four service cards
- Link to Services page

---

### ProjectsPreview

Elements:
- Section heading
- Project cards or carousel
- Link to Projects page

---

### CommunityPreview

Elements:
- Section heading
- Description
- Community CTA

---

### BlogPreview

Elements:
- Section heading
- Latest blog posts (3)
- Link to Blog

---

### CallToAction

Elements:
- Short motivating statement
- Primary CTA

---

## 2.2 ABOUT PAGE

**Layout Order:**

```
PageHeader
StorySection
MissionVision
DivisionBreakdown
ParentCompany
```

### PageHeader

Elements:
- Page title
- Intro paragraph

---

### StorySection

Elements:
- Narrative content block

---

### MissionVision

Elements:
- Mission statement card
- Vision statement card

---

### DivisionBreakdown

Elements:
- SIRYUS A.M block
- Siryus Creative Hub block

---

### ParentCompany

Elements:
- Siryus Creative Media Ltd description

---

## 2.3 SERVICES PAGE

**Layout Order:**

```
PageHeader
ServicesGrid
ProcessOverview
CallToAction
```

### ServicesGrid

Elements:
- Service cards with title and description

---

### ProcessOverview

Elements:
- Step based explanation of working process

---

## 2.4 PROJECTS PAGE

**Layout Order:**

```
PageHeader
ProjectsGrid
ProjectStatusLegend
```

### ProjectsGrid

Elements:
- Project cards
- Status labels

---

## 2.5 PROJECT DETAIL PAGE

**Layout Order:**

```
ProjectHero
ProjectDescription
MediaSection
CreditsSection
RelatedProjects
```

---

## 2.6 ARTISTS PAGE

**Layout Order:**

```
PageHeader
ArtistsGrid
```

### ArtistsGrid

Elements:
- Artist cards
- Filter or search (optional)

---

## 2.7 ARTIST DETAIL PAGE

**Layout Order:**

```
ArtistHero
BioSection
MediaEmbeds
AssociatedProjects
ExternalLinks
```

---

## 2.8 COMMUNITY PAGE

**Layout Order:**

```
PageHeader
CommunityIntro
BenefitsGrid
JoinCTA
```

---

## 2.9 BLOG INDEX

**Layout Order:**

```
PageHeader
FeaturedPost
PostsGrid
Pagination
```

---

## 2.10 BLOG POST PAGE

**Layout Order:**

```
PostHeader
PostContent
AuthorBox
RelatedPosts
```

---

## 2.11 CONTACT PAGE

**Layout Order:**

```
PageHeader
ContactForm
ContactDetails
```

---

## 2.12 SYSTEM PAGES

### 404 Page

Elements:
- Error message
- Navigation link back to home

---

## 3. REUSABLE UI COMPONENTS

- Button
- Card
- SectionHeader
- GridLayout
- Badge
- CTABlock

All components must be responsive and accessible.

---

## 4. DESIGN AND MOTION GUIDELINES

- Animations must enhance clarity
- Avoid excessive motion
- Use motion for entrances and focus
- Respect user motion preferences

---

## FINAL VALIDATION

- Clear layout for every page
- Reusable components defined
- Scales across devices
- Matches brand hierarchy
- Ready for design and development

---

End of component-level wireframe definition.

