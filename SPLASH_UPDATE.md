# Splash Screen Update - Vertical Layout (A-SIRYUS-M)

## What Changed

### Layout Structure
**BEFORE:** Horizontal layout (A — SIRYUS — M)
**AFTER:** Vertical stack layout matching reference screenshot:

```
        A         ← Top (large letter, 200-250px)
        ↓
     SIRYUS       ← Middle (rotating text, 60-80px)
        ↓
        M         ← Bottom (large letter, 200-250px)
```

### Visual Updates

1. **Logo Placeholder**
   - Changed from purple gradient box to simple white border
   - Text changed from "SIRYUS A.M" to "LOGO"
   - Size: 150px wide, positioned 40-50px from edges
   - More minimal, matches reference aesthetic

2. **Letter Styling**
   - Increased size: 200-250px (responsive)
   - Pure white color with white glow (no colored gradients)
   - Tighter spacing between A-text-M
   - Negative margins for compact vertical stack

3. **Text Animation**
   - Font size increased to 60-80px range
   - Maintains 4-text rotation system
   - A & M still only visible with "SIRYUS"
   - All text is solid white (no color effects)

4. **Click To Enter**
   - Made more subtle and smaller
   - Changed to lowercase
   - Reduced opacity (0.6 instead of 0.9)
   - Slower blink animation (3s instead of 2s)

### Key Features Maintained

✅ 10-second auto-transition
✅ Click anywhere to skip
✅ Press any key to skip
✅ Text rotation (SIRYUS → SIRYUS HUB → Siryus Creative Media Ltd → Siryus Community)
✅ A & M only appear with "SIRYUS"
✅ Background particle animations
✅ Responsive design
✅ Accessibility features

## Testing

Run the dev server:
```powershell
npm run dev
```

Visit: `http://localhost:4321/splash`

### What You Should See

1. **Initial Load:**
   - Logo placeholder in top left
   - Large "A" at top center
   - "SIRYUS" in middle
   - Large "M" at bottom center
   - All elements vertically stacked
   - Subtle "click to enter" at bottom

2. **After 2.5 seconds:**
   - A and M fade out
   - Text changes to "SIRYUS HUB"

3. **After 5 seconds:**
   - Text changes to "Siryus Creative Media Ltd"

4. **After 7.5 seconds:**
   - Text changes to "Siryus Community"

5. **After 10 seconds:**
   - OR when you click/press key
   - Fades to home page

## Customization

### Adjust Letter Sizes
```css
/* In splash.astro, line ~218 */
.large-letter {
  font-size: clamp(10rem, 25vw, 16rem); /* Change these values */
}
```

### Adjust Text Size
```css
/* In splash.astro, line ~251 */
.rotating-text {
  font-size: clamp(3rem, 7vw, 5rem); /* Change these values */
}
```

### Adjust Vertical Spacing
```css
/* In splash.astro, line ~208 */
.center-content {
  gap: 1rem; /* Change this value (0.5rem = tighter, 2rem = looser) */
}
```

### Change Logo Text
```html
<!-- In splash.astro, line ~19 -->
<div class="logo-box">LOGO</div>
<!-- Change "LOGO" to your text, or replace entire div with <img> tag -->
```

## Visual Concept

The layout creates **"A SIRYUS M"** vertically when "SIRYUS" is displayed, which phonetically sounds like "awesome" - matching the creative concept from the reference screenshot's "H + CREATIVE + TECH = MAGIC + X" layout pattern.

---

**Status:** ✅ Complete and ready to test
**File:** `src/pages/splash.astro`
**No additional dependencies needed**
