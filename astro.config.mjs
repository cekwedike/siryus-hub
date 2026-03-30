import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://www.siryushub.com',
  output: 'static',
  integrations: [sitemap()],
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
