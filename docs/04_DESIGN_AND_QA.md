# Design and QA standards

## Art direction
“Less is more.” Four worlds should NOT look like color-shifted copies of one template. Shared code may exist, shared *appearance* must not dominate. Design for premium craft: a purposeful typographic hierarchy, generous negative space, refined transitions, distinct compositions, high quality authentic images and precise alignment.

## Brand separation
- SIRYUS parent: sophisticated creative umbrella, approved parent logo, editorial hero and immersive but simple four-brand discovery. Parent lime motif only where part of original asset.
- SIRYUS A.M: music-centric, emotionally expressive and artist-focused. Use approved A.M logo and real covers/roster media. Do not copy parent layout.
- ARC. Creatives: warm, human, faith-rooted, communal, editorial. Use approved ARC. Creatives orange pattern/logo; do not force SIGNAL. red or A.M lime into ARC.
- SIGNAL.: graphite, warm stone and red; sharply art-directed, editorial and strategic; Paths symbol and circular red period. Storytelling core. No purple, amber or generic neon gradient look.
- PAVO Create: independent external site and branding; only a respectful branded card on SIRYUS. Do not recolor PAVO Create without its official assets.

## Photography and motion
- Prefer authentic artist photos, album art, approved portraits, events, real campaign work.
- Where gaps exist, license suitable stock photos. Save source link, photographer, license/usage conditions and intended purpose in an `IMAGE_CREDITS.md`. Never use watermarked images or claim stock photo portrays actual members.
- Use AVIF/WebP where possible, responsive images/srcset, explicit width/height to prevent CLS. Protect text contrast over photos.
- Motion: restrained reveals, staggered editorial entrance, hover response, image transitions. Avoid scrolling hijack, endless bouncing, layout shift and animation-dependent navigation. Respect reduced motion and no-JS.

## Quality gates
- Mobile first, 320px and up; test 360, 768, 1024, 1440 and larger. No horizontal scroll.
- Semantic structure, one H1, predictable heading outline, ARIA only as needed, accessible menu/focus, alt text, keyboard paths, form error/success states, proper labels and contrast AA.
- Fast page load, optimized assets, local or appropriately hosted fonts, avoid large dependency stacks, progressive enhancement.
- Each page: unique metadata, canonical, Open Graph image, social preview, JSON-LD only where factually correct.
- Verify deep routes, Spotify/DSP links, CMS content, 301/410 logic, XML sitemap, robots.txt, 404, newsletters and contact forms.
- Do not expose any secrets, fictional business contact data, invented outcomes or unapproved team listings.
