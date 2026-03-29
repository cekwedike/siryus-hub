# Quick Start Guide - Siryus Hub Splash Screen

## ⚡ Get Running in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ View Your Splash Screen
Open browser to: **http://localhost:4321/splash**

---

## 🎬 What You'll See

- Large **A** and **M** letters that float and pulse
- Text rotating through 4 variations every 2.5 seconds
- Animated background particles
- "Click To Enter" prompt at bottom
- Auto-redirect to home after 10 seconds

---

## ⌨️ Controls

- **Click anywhere** → Skip to home immediately
- **Press any key** → Skip to home immediately
- **Wait 10 seconds** → Auto-redirect to home

---

## 🎨 Common Customizations

### Change Auto-Redirect Time
In `src/pages/splash.astro`, line 466:
```javascript
const TRANSITION_DELAY = 10000; // Change to desired milliseconds
```

### Change Text Display Time
Line 467:
```javascript
const TEXT_DISPLAY_DURATION = 2500; // Change to desired milliseconds
```

### Change Destination Page
Line 538:
```javascript
window.location.href = '/'; // Change to '/home' or your route
```

### Update Rotating Text
Lines 470-475:
```javascript
const textOptions = [
  { text: 'SIRYUS', showLetters: true },
  { text: 'SIRYUS HUB', showLetters: false },
  { text: 'Siryus Creative Media Ltd', showLetters: false },
  { text: 'Siryus Community', showLetters: false }
];
```

### Change Brand Colors
Look for these hex codes in the CSS and replace:
- `#4F46E5` (Indigo blue)
- `#7C3AED` (Purple)

---

## 🖼️ Add Your Logo

1. Place logo in `public/` folder (e.g., `public/logo.svg`)
2. Replace line 18-20 in `splash.astro`:

```html
<!-- Before -->
<div class="logo-box">SIRYUS A.M</div>

<!-- After -->
<img src="/logo.svg" alt="SIRYUS A.M logo" style="width: 180px; height: auto;" />
```

---

## 🚀 Deploy to Production

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deploy
Upload the `dist/` folder to your hosting provider (Vercel, Netlify, etc.)

---

## 📝 File Locations

| What | Where |
|------|-------|
| Splash screen | `src/pages/splash.astro` |
| Home page | `src/pages/index.astro` |
| Config | `astro.config.mjs` |
| Logo assets | `public/` folder |

---

## 🆘 Quick Fixes

**Splash doesn't auto-redirect?**
- Check that `src/pages/index.astro` exists
- Check browser console for errors

**Animations choppy?**
- Close other browser tabs
- Check if "reduce motion" is enabled in OS settings

**Can't skip with keyboard?**
- Click on the page first to focus it
- Try pressing Space or Enter key

---

## 📚 Need More Help?

Check the full `README.md` for detailed documentation.

---

**Ready to customize? Open `src/pages/splash.astro` and start editing!** 🎨
