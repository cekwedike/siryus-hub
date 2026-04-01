# Sanity Webhook Setup for Auto Rebuild

When you publish content in Sanity Studio,
this webhook tells Vercel to rebuild the
site automatically so changes appear live
within 2 minutes.

## Step 1: Get your Vercel Deploy Hook URL

1. Go to vercel.com and open your project
2. Click Settings
3. Click Git in the left sidebar
4. Scroll to Deploy Hooks
5. Click Create Hook
6. Name it: Sanity Publish
7. Select your main branch
8. Click Create Hook
9. Copy the URL it generates
   It looks like:
   https://api.vercel.com/v1/integrations/deploy/xxx

## Step 2: Add the webhook in Sanity

1. Go to sanity.io/manage
2. Open the siryus-hub project
3. Click API in the top navigation
4. Click Webhooks
5. Click Create webhook
6. Fill in:
   Name: Vercel Rebuild
   URL: paste your Vercel deploy hook URL
   Dataset: production
   Trigger on: Create, Update, Delete
   Filter: leave empty (triggers on all content)
   HTTP method: POST
   HTTP Headers: leave empty
7. Click Save

## Step 3: Test it

1. Go to your Sanity Studio
2. Open any document and make a small change
3. Publish the change
4. Go to Vercel dashboard and click Deployments
5. You should see a new deployment starting
   within 30 seconds

From now on every time you publish anything
in Sanity Studio, the live site rebuilds
and updates automatically. No manual
rebuilds needed.
