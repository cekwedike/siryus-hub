# Siryus Hub Splash Screen - Technical Notes

## Implementation Details

### Architecture

The splash screen is built as a single Astro component (`splash.astro`) that contains:
- HTML structure
- Inline CSS for styling and animations
- Vanilla JavaScript for interactivity

This approach ensures:
- Zero external dependencies (except Astro itself)
- Fast loading times
- Easy maintenance
- No build complications

### Key Features Breakdown

#### 1. Text Rotation System
```javascript
const textOptions = [
  { text: 'SIRYUS', showLetters: true },    // A & M visible
  { text: 'SIRYUS HUB', showLetters: false },
  { text: 'Siryus Creative Media Ltd', showLetters: false },
  { text: 'Siryus Community', showLetters: false }
];
```

- Uses a state machine pattern
- Cycles through array every 2.5 seconds
- Synchronizes A/M letter visibility with text state
- Smooth fade transitions (600ms) between states

#### 2. Auto-Transition Logic
```javascript
// Set up auto-transition after 10 seconds
autoTransitionTimeout = setTimeout(transitionToHome, TRANSITION_DELAY);
```

- Single timeout set on initialization
- Cleared if user triggers early skip
- Prevents multiple transitions with `hasTransitioned` flag

#### 3. Skip Functionality
```javascript
document.body.addEventListener('click', transitionToHome);
document.addEventListener('keydown', transitionToHome);
```

- Global event listeners on body and document
- Triggers immediate transition on any interaction
- Removes listeners after transition to prevent memory leaks

#### 4. Animation System

**Large Letters (A & M):**
- `floatPulse` animation: 3s loop with vertical movement and scale
- `text-shadow` with multiple layers for glow effect
- Smooth opacity/transform transitions when hiding/showing

**Background Particles:**
- 5 circular divs with gradient backgrounds
- Each has unique size, position, and animation delay
- `float` animation: 20-30s loops with 3D-like movement
- Staggered delays create organic motion

**Gradient Overlay:**
- Radial gradient from center to edges
- Subtle pulsing animation (8s loop)
- Creates depth and focus on center content

**Text Glow:**
- Dynamic text-shadow animation
- Pulses between subtle and prominent glow
- 2s loop synchronized with content

#### 5. Responsive Design

Three main breakpoints:
- **Desktop** (1024px+): Full layout, large letters
- **Tablet** (768-1023px): Adjusted spacing, medium letters
- **Mobile** (< 768px): Stacked layout, smaller letters

Uses `clamp()` for fluid typography:
```css
font-size: clamp(8rem, 20vw, 15rem);
```

Benefits:
- Smooth scaling between breakpoints
- No sudden jumps
- Maintains proportions

#### 6. Accessibility Features

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

**Keyboard Navigation:**
- Body element made focusable (`tabindex="0"`)
- Focus outline for visibility
- Any keypress triggers transition

**Focus States:**
- Clear outline on body focus
- Maintains keyboard accessibility standards

### Performance Optimizations

1. **CSS-Only Animations**: Most effects use CSS animations (GPU-accelerated)
2. **Minimal JavaScript**: Only essential interactivity in JS
3. **No External Libraries**: Reduces bundle size and load time
4. **Inline Styles**: Eliminates additional HTTP requests
5. **Google Fonts Preconnect**: Faster font loading
6. **Static Assets**: Everything can be pre-rendered

### Browser Compatibility

Tested and compatible with:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

Uses modern CSS features:
- CSS Grid/Flexbox
- CSS Custom Properties could be added
- `clamp()` function
- `backdrop-filter` (if added)

Graceful degradation for older browsers:
- Animations disabled if not supported
- Layout remains functional
- Core functionality preserved

### Code Organization

The component is structured in logical sections:

1. **Astro Frontmatter** (lines 1-3): Server-side logic placeholder
2. **HTML Structure** (lines 5-60): Semantic markup
3. **CSS Styles** (lines 62-430): 
   - Reset & base styles
   - Layout components
   - Animation definitions
   - Responsive breakpoints
   - Accessibility overrides
4. **JavaScript** (lines 432-580):
   - Configuration constants
   - DOM references
   - State management
   - Event handlers
   - Initialization

### Customization Guide

#### Adding More Text Variations
```javascript
// Just add to the array:
const textOptions = [
  // ... existing options
  { text: 'Your New Text', showLetters: false }
];
```

#### Changing Animation Speed
```css
/* Find the animation and change duration: */
.large-letter {
  animation: floatPulse 3s ease-in-out infinite;
  /*                    ^^ Change this value */
}
```

#### Adjusting Colors
Search for these hex codes in CSS:
- `#4F46E5` - Primary indigo
- `#7C3AED` - Secondary purple
- `#ffffff` - White text

Replace globally for consistent theming.

#### Modifying Particle Count
```html
<!-- Add/remove these in HTML: -->
<div class="particle particle-6"></div>
```

```css
/* Add corresponding styles: */
.particle-6 {
  width: 220px;
  height: 220px;
  /* ... position and animation */
}
```

### Known Limitations

1. **No Progress Bar**: Shows 10s countdown visually
2. **No Asset Preloading**: Doesn't preload home page
3. **Fixed Timing**: Text rotation timing is hardcoded
4. **No Sound**: No audio feedback (intentional for UX)
5. **Single Route**: Only redirects to one destination

### Future Enhancement Ideas

1. **Progress Indicator**: Add circular progress bar
2. **Dynamic Preloading**: Load home page assets during splash
3. **Sound Toggle**: Optional sound effects
4. **Theme Variants**: Dark/light mode support
5. **WebGL Effects**: Advanced particle systems
6. **Analytics**: Track skip rate vs. full view
7. **A/B Testing**: Test different timings/layouts
8. **Gesture Support**: Swipe up to skip on mobile

### Testing Checklist

- [ ] Auto-transition works after 10 seconds
- [ ] Click anywhere skips to home
- [ ] Any keypress skips to home
- [ ] Text rotates through all 4 options
- [ ] A & M appear only with "SIRYUS"
- [ ] Animations are smooth (60fps)
- [ ] Responsive on mobile/tablet/desktop
- [ ] Works with reduced motion enabled
- [ ] Keyboard navigation accessible
- [ ] No console errors
- [ ] Page loads quickly (< 1s)

### Deployment Notes

**Build Command:**
```bash
npm run build
```

**Output:**
- Static files in `dist/` directory
- Splash route: `/splash` or `/splash.html`
- Can be deployed to any static host

**Environment Variables:**
None required (fully static)

**Recommended Hosts:**
- Vercel (automatic Astro detection)
- Netlify (drag-and-drop deploy)
- GitHub Pages
- Cloudflare Pages

### Troubleshooting

**Issue: Animations choppy**
- Solution: Check GPU acceleration is enabled
- Solution: Reduce particle count
- Solution: Simplify animations in CSS

**Issue: Text cuts off on mobile**
- Solution: Adjust `clamp()` values in CSS
- Solution: Test on actual devices, not just DevTools

**Issue: Page flickers on transition**
- Solution: Preload home page styles
- Solution: Increase fade duration

**Issue: Skip not working**
- Solution: Check event listeners are attached
- Solution: Verify JavaScript is enabled
- Solution: Check for console errors

### Maintenance

**Regular Updates:**
- Update Astro version: `npm update astro`
- Test on new browser versions
- Optimize images if logo added
- Monitor Core Web Vitals

**Content Updates:**
- Text variations: Edit `textOptions` array
- Timing: Adjust constants at top of script
- Colors: Global search/replace hex codes

---

## Quick Reference

| Feature | Location | Line(s) |
|---------|----------|---------|
| Auto-transition timing | Script section | 466 |
| Text display duration | Script section | 467 |
| Text rotation options | Script section | 470-475 |
| Letter animations | CSS | 198-204 |
| Particle setup | CSS | 129-173 |
| Responsive breakpoints | CSS | 360-413 |
| Skip functionality | Script section | 552-558 |

---

Last Updated: January 9, 2026
Version: 1.0.0
