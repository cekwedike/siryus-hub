import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://www.siryushub.com',
  output: 'static',
  integrations: [react(), sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    define: {
      'process.env.PUBLIC_SANITY_PROJECT_ID': JSON.stringify(process.env.PUBLIC_SANITY_PROJECT_ID),
      'process.env.PUBLIC_SANITY_DATASET': JSON.stringify(process.env.PUBLIC_SANITY_DATASET),
    },
  },
})
