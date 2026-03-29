# Siryus Hub - Splash Screen

A modern, animated loading/splash screen for the Siryus Hub website built with Astro.

## 🎨 Features

- **Auto-transition**: Automatically redirects to home page after 10 seconds
- **Skip functionality**: Click anywhere or press any key to skip immediately
- **Animated text rotation**: Cycles through 4 brand variations:
  - "SIRYUS" (with A & M letters visible)
  - "SIRYUS HUB"
  - "Siryus Creative Media Ltd"
  - "Siryus Community"
- **Dynamic animations**: 
  - Floating/pulsing A & M letters
  - Animated background particles
  - Gradient overlays
  - Smooth fade transitions
- **Fully responsive**: Works on mobile, tablet, and desktop
- **Accessibility features**:
  - Keyboard navigation support
  - Reduced motion support for users with motion sensitivity
  - Focus states for accessibility

## 📁 Project Structure

```
siryus-hub/
├── src/
│   ├── pages/
│   │   ├── index.astro     # Splash / entry at `/` (redirects to `/home`)
│   │   └── home.astro      # Main marketing homepage at `/home`
│   ├── components/         # Shared sections (nav, hero, footer, etc.)
│   ├── styles/             # Extracted global/splash styles (if present)
│   └── scripts/            # Extracted client scripts (if present)
├── public/                 # Static assets (images, fonts, favicons)
├── docs/                   # Full site specification and roadmap
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Install dependencies:**

```bash
npm install
```

Or with yarn:
```bash
yarn install
```

Or with pnpm:
```bash
pnpm install
```

2. **Run the development server:**

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

Or with pnpm:
```bash
pnpm dev
```

3. **View the site:**

Open your browser and navigate to:
- Splash (entry): `http://localhost:4321/` (auto-advances or skip to `/home`)
- Main homepage: `http://localhost:4321/home`

4. **Build for production:**

```bash
npm run build
```

5. **Preview production build:**

```bash
npm run preview
```

## 🎯 Usage

### Entry flow

The splash experience lives at **`/`** ([`src/pages/index.astro`](src/pages/index.astro)). It transitions to **`/home`** ([`src/pages/home.astro`](src/pages/home.astro)) after a delay or when the user skips. To use the marketing page as the root URL instead, you can swap routes (e.g. move the splash to `/splash` and promote `home.astro` to `index.astro`) or add a server redirect in your host configuration.

### Customizing the Logo

The logo appears at the top-left of the splash screen. To replace it:

1. Add your logo image to the `public/` folder (e.g., `public/logo.svg`)
2. In `index.astro`, replace or adjust the logo markup in the `.logo-placeholder` section:

```html
<div class="logo-placeholder">
  <div class="logo-box">SIRYUS A.M</div>
</div>
```

With:

```html
<div class="logo-placeholder">
  <img src="/logo.svg" alt="SIRYUS A.M logo" class="logo-image" />
</div>
```

3. Update the CSS:

```css
.logo-image {
  width: 180px;
  height: auto;
}
```

### Adjusting Timing

In the `<script>` section of `index.astro` (or the extracted splash script module), you can modify:

```javascript
const TRANSITION_DELAY = 10000; // Change this value (in milliseconds)
const TEXT_DISPLAY_DURATION = 2500; // Time each text shows
```

### Changing the Destination URL

By default, the splash screen redirects to **`/home`**. To change this, find `transitionToHome()` and set:

```javascript
window.location.href = '/home'; // Your desired route
```

### Modifying Text Rotation

To add, remove, or change the rotating text options, edit the `textOptions` array:

```javascript
const textOptions = [
  { text: 'SIRYUS', showLetters: true },    // A & M visible
  { text: 'SIRYUS HUB', showLetters: false },
  { text: 'Your Custom Text', showLetters: false },
  // Add more options here
];
```

## 🎨 Customization

### Colors

The splash screen uses a purple gradient theme. To customize colors:

**Primary brand colors:**
```css
/* Find these in the <style> section */
background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
```

Replace `#4F46E5` (indigo) and `#7C3AED` (purple) with your brand colors.

**Glow effects:**
```css
text-shadow: 
  0 0 30px rgba(79, 70, 229, 0.8),
  0 0 60px rgba(124, 58, 237, 0.6);
```

### Font

The splash screen uses Google Fonts (Inter). To change the font:

1. Replace the Google Fonts link in the `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@700;900&display=swap" rel="stylesheet">
```

2. Update the CSS:
```css
font-family: 'YourFont', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Animation Speed

Adjust animation durations in the `@keyframes` sections:

```css
@keyframes floatPulse {
  /* Modify animation duration here */
}
```

Or change the animation property:
```css
animation: floatPulse 3s ease-in-out infinite; /* Change 3s to your preference */
```

## 📱 Responsive Breakpoints

- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: 479px and below

## ♿ Accessibility

The splash screen includes:
- `prefers-reduced-motion` media query support
- Keyboard navigation (Tab key + Enter to focus and skip)
- Focus indicators
- Semantic HTML structure
- Screen reader friendly

## 🐛 Troubleshooting

**Splash screen doesn't auto-transition:**
- Check browser console for JavaScript errors
- Ensure the home page route exists

**Text rotation not working:**
- Verify JavaScript is enabled in your browser
- Check for console errors

**Animations not showing:**
- Check if "prefers-reduced-motion" is enabled in your OS settings
- Verify CSS animations are supported in your browser

**Click to skip not working:**
- Check JavaScript console for errors
- Verify event listeners are properly attached

## 📦 Dependencies

- **Astro** (^6.x): Static site generator
- **@astrojs/sitemap**: XML sitemap generation for SEO
- **Google Fonts**: Loaded via CDN on the splash page; Aeonik (local) on `/home`

Run `npm run lint:max-lines` to ensure no file under `src/` exceeds 1500 lines.

## 🔮 Future Enhancements

Potential improvements you might consider:
- Add sound effects (toggle-able)
- Preload home page assets during splash screen
- Add loading progress bar
- Implement more complex particle systems
- Add 3D effects with Three.js or similar

## 📄 License

This project is part of the Siryus Hub website.

## 🤝 Support

For issues or questions, contact Siryus Creative Media Ltd.

---

Built with ❤️ using Astro
