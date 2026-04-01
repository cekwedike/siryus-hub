# Pushing to GitHub for Vercel Deployment

## First time setup

1. Go to github.com and create a new
   repository called siryus-hub
2. Set it to Private
3. Do not initialise with README
4. Copy the repository URL

Then run these commands in your terminal
from the project root:

git init
git add .
git commit -m "Initial commit: Siryus Hub"
git branch -M main
git remote add origin YOUR_GITHUB_URL
git push -u origin main

## Connect to Vercel

1. Go to vercel.com and sign in with GitHub
2. Click Add New Project
3. Import your siryus-hub repository
4. Vercel auto-detects Astro. Confirm:
   Framework: Astro
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
5. Click Environment Variables and add:
   PUBLIC_SANITY_PROJECT_ID = h16wl0pr
   PUBLIC_SANITY_DATASET = production
6. Click Deploy
7. Wait for the first build to complete

## Connect your custom domain

1. In Vercel project settings click Domains
2. Add: www.siryushub.com
3. Also add: siryushub.com (non-www)
4. Vercel will show you DNS records to add

## Update DNS on Hostinger

1. Log in to Hostinger hPanel
2. Go to Domains
3. Click Manage on siryushub.com
4. Click DNS Zone
5. Find the A record pointing to
   Hostinger servers and delete it
6. Add a new A record:
   Type: A
   Name: @
   Points to: 76.76.21.21
   TTL: 3600
7. Find or add a CNAME record:
   Type: CNAME
   Name: www
   Points to: cname.vercel-dns.com
   TTL: 3600
8. Leave all MX records completely
   untouched. Your email will keep
   working.
9. DNS changes take up to 48 hours
   to propagate globally but usually
   faster.

## After deployment

- Visit https://www.siryushub.com
  and confirm the site loads
- Test the contact form and confirm
  you receive an email at
  management@siryushub.com
- Set up the Sanity webhook following
  WEBHOOK_SETUP.md
