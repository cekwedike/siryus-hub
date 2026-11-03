# PAVO Brand Assets

This package contains the refined PAVO product brand assets.

## Included
- Horizontal logos in PNG, JPEG, and SVG formats
- Monochrome logo variants
- App icon exports
- Favicons in common sizes + favicon.ico + SVG wrapper
- "Made with PAVO" watermark exports
- Brand preview sheet

## Color references
- Navy: #0A0F1A
- Cyan: #00E5D4
- White: #FFFFFF
- Gray: #9CA3AF

## Folders
- `logos/` — primary wordmark exports
- `icons/` — app icon exports
- `favicons/` — favicon and app-icon sizes
- `watermarks/` — Made with PAVO assets
- `preview/` — presentation previews

## SVG quality note
The SVG files in `logos/svg`, `icons/svg`, and `watermarks/svg` are **SVG wrappers containing embedded raster images**. They are not editable vector contours and should not be enlarged without limits.

The `true-vector-svg/` folder contains **real SVG path-based redraws** of the PAVO wordmark, app icon, and Made with PAVO watermark. These are scalable and editable, but are approximations using a different typeface rather than pixel-identical tracings of the approved concept. Their rendered counterparts are in `true-vector-png/`. For exact professional master vectors, manually refine these paths against the approved original design.
