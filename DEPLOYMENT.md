# Siryus Hub - Deployment Checklist

## Pre-Deployment

### 1. Configuration
- [ ] Update site URL in `astro.config.mjs`
- [ ] Replace logo placeholder with actual logo
- [ ] Verify home page route (currently redirects to `/`)
- [ ] Test all text variations display correctly
- [ ] Confirm timing settings (10s default)
- [ ] Update brand colors if needed

### 2. Content Review
- [ ] Check spelling in rotating text
- [ ] Verify "Click To Enter" text is appropriate
- [ ] Review logo size and positioning
- [ ] Test on actual devices (not just browser DevTools)

### 3. Performance
- [ ] Run `npm run build` successfully
- [ ] Check bundle size (should be < 50KB)
- [ ] Verify no console errors
- [ ] Test page load speed (< 1s on good connection)
- [ ] Confirm animations run at 60fps

### 4. Cross-Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

### 5. Responsive Testing
- [ ] Desktop (1920px, 1440px, 1024px)
- [ ] Tablet (iPad, Surface, 768px)
- [ ] Mobile (iPhone, Android, 375px, 414px)
- [ ] Ultra-wide (2560px+)

### 6. Accessibility Testing
- [ ] Keyboard navigation works (Tab + Enter)
- [ ] Focus states visible
- [ ] Reduced motion setting respected
- [ ] Screen reader friendly (test with NVDA/JAWS)
- [ ] Color contrast meets WCAG AA standards

### 7. Functionality Testing
- [ ] Auto-transition after 10 seconds
- [ ] Click anywhere skips to home
- [ ] Any keypress skips to home
- [ ] Text rotates through all 4 options
- [ ] A & M only appear with "SIRYUS"
- [ ] No double-transitions possible
- [ ] Redirect URL is correct

---

## Build for Production

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Build
```bash
npm run build
```

Expected output: `dist/` directory created

### Step 3: Preview Locally
```bash
npm run preview
```

Test at: `http://localhost:4321`

---

## Deployment Options

### Option A: Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

2. **Configure Build**
   - Framework Preset: Astro
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Test live URL

**Vercel CLI Alternative:**
```bash
npm install -g vercel
vercel
```

---

### Option B: Netlify

1. **Drag and Drop**
   - Build locally: `npm run build`
   - Go to [netlify.com](https://netlify.com)
   - Drag `dist/` folder to deploy

**OR Git Integration:**
   - Connect repository
   - Build command: `npm run build`
   - Publish directory: `dist`

**Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

### Option C: GitHub Pages

1. **Create Build Script**
   
Add to `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

2. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

3. **Deploy**
```bash
npm run deploy
```

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: gh-pages branch
   - Save

---

### Option D: Cloudflare Pages

1. **Connect Repository**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Create project
   - Connect Git repository

2. **Build Settings**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 18 or 20

3. **Deploy**
   - Click "Save and Deploy"
   - Wait for build completion

---

## Post-Deployment

### 1. Smoke Test
- [ ] Visit splash screen URL
- [ ] Verify all animations work
- [ ] Test auto-transition (wait 10 seconds)
- [ ] Test click to skip
- [ ] Test keyboard skip
- [ ] Check mobile view
- [ ] Verify logo appears correctly
- [ ] Confirm redirect to home works

### 2. Performance Check
- [ ] Run Google Lighthouse audit
  - Target: Performance > 90
  - Target: Accessibility > 90
  - Target: Best Practices > 90
- [ ] Check Core Web Vitals
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

### 3. SEO (Optional for splash screen)
- [ ] Add meta description if indexable
- [ ] Consider `noindex` for splash screen
- [ ] Ensure proper redirect timing for SEO

### 4. Analytics (Optional)
- [ ] Add Google Analytics tracking
- [ ] Track auto-transition vs. skip rate
- [ ] Monitor average time on splash
- [ ] Check bounce rate from home page

### 5. Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor server logs
- [ ] Check for 404 errors
- [ ] Verify CDN caching works

---

## Environment-Specific URLs

### Development
```
Local: http://localhost:4321/splash
```

### Staging
```
Vercel: https://siryus-hub-staging.vercel.app/splash
Netlify: https://staging--siryus-hub.netlify.app/splash
```

### Production
```
Your domain: https://yourdomain.com/splash
```

---

## Rollback Plan

If issues occur after deployment:

### Vercel
1. Go to project dashboard
2. Click "Deployments"
3. Find previous working deployment
4. Click "..." → "Promote to Production"

### Netlify
1. Go to Deploys tab
2. Find previous deploy
3. Click "Publish deploy"

### GitHub Pages
1. Revert commit in repository
2. Re-run deploy script

### Manual
1. Keep backup of working `dist/` folder
2. Replace deployed files with backup

---

## Common Issues & Solutions

### Issue: Animations not smooth
**Solution:** 
- Check GPU acceleration is enabled
- Reduce particle count in production
- Test on actual devices, not emulators

### Issue: Redirect doesn't work
**Solution:**
- Verify home page exists at correct route
- Check JavaScript errors in console
- Ensure no ad blockers interfering

### Issue: Text cuts off on mobile
**Solution:**
- Adjust `clamp()` values in CSS
- Test on real devices
- Check viewport meta tag is present

### Issue: Slow page load
**Solution:**
- Optimize logo image size
- Enable CDN caching
- Minimize CSS if needed
- Check network waterfall in DevTools

### Issue: Skip not working
**Solution:**
- Verify event listeners attached
- Check for JavaScript errors
- Test keyboard focus works

---

## Maintenance Schedule

### Weekly
- [ ] Check error logs
- [ ] Monitor performance metrics
- [ ] Verify uptime

### Monthly
- [ ] Update Astro version
- [ ] Run security audit: `npm audit`
- [ ] Review analytics data
- [ ] Test on new browser versions

### Quarterly
- [ ] Review and update content
- [ ] A/B test timing changes
- [ ] Optimize animations based on data
- [ ] Update dependencies

---

## Support Contacts

**Hosting Issues:**
- Vercel: support@vercel.com
- Netlify: support@netlify.com
- GitHub: support@github.com

**Technical Questions:**
- Astro Discord: discord.gg/astro
- Astro Docs: docs.astro.build

---

## Final Checklist

Before launching:
- [ ] All pre-deployment checks complete
- [ ] Build runs without errors
- [ ] Local preview looks correct
- [ ] Cross-browser testing passed
- [ ] Responsive testing passed
- [ ] Accessibility testing passed
- [ ] Performance benchmarks met
- [ ] Deployment successful
- [ ] Post-deployment smoke test passed
- [ ] Monitoring set up
- [ ] Rollback plan documented
- [ ] Team notified of launch

---

## Success Criteria

Your splash screen is ready when:
✅ Loads in < 1 second
✅ Animations run at 60fps
✅ Auto-transitions after 10s
✅ Skip functionality works (click & keyboard)
✅ Mobile responsive
✅ Accessible to all users
✅ No console errors
✅ Lighthouse score > 90

---

**Ready to deploy? Run `npm run build` and choose your hosting platform!** 🚀
