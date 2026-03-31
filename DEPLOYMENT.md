# Deploying Siryus Hub to Hostinger

## Build the site
Run: npm run build
Output folder: dist/

## Upload to Hostinger
1. Log in to Hostinger hPanel
2. Go to File Manager or use FTP
3. Navigate to public_html/
4. Delete existing files (keep .htaccess if Hostinger created one)
5. Upload all contents of the dist/ folder to public_html/
6. Make sure .htaccess is uploaded too

## Environment variables
The site uses PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET. These are baked into the static build so no server config needed.

## After uploading
Visit https://www.siryushub.com and confirm:
- Splash screen loads at root URL
- Clicking advances to /home
- All nav links work
- /blog loads (may show empty state if no posts)
- /studio loads

## Updating content
Content managed in Sanity (blog posts, artists, studio content, projects) requires a rebuild and redeploy after changes.

Run: npm run build
Then re-upload the dist/ folder to Hostinger.

## Custom domain
Domain is already configured at Hostinger.
No additional DNS changes needed.
