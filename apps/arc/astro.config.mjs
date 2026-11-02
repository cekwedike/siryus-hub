import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://collective.siryushub.com',
  output: 'static',
  // Clean URLs without trailing slashes, matching how Cloudflare Pages serves page.html files.
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => {
        const url = new URL(page)
        const path = url.pathname.replace(/\/+$/, '') || '/'
        return ![
          '/home',
          '/blog',
          '/community',
          '/services',
          '/siryus-am',
        ].some((legacyPath) => path === legacyPath || path.startsWith(`${legacyPath}/`))
      },
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  vite: {
    define: {
      'process.env.PUBLIC_SANITY_PROJECT_ID': JSON.stringify(
        process.env.PUBLIC_SANITY_PROJECT_ID
      ),
      'process.env.PUBLIC_SANITY_DATASET': JSON.stringify(
        process.env.PUBLIC_SANITY_DATASET
      ),
      'process.env.PUBLIC_SANITY_ARC_PROJECT_ID': JSON.stringify(
        process.env.PUBLIC_SANITY_ARC_PROJECT_ID
      ),
      'process.env.PUBLIC_SANITY_ARC_DATASET': JSON.stringify(
        process.env.PUBLIC_SANITY_ARC_DATASET
      ),
      'process.env.PUBLIC_CANONICAL_ORIGIN': JSON.stringify(
        process.env.PUBLIC_CANONICAL_ORIGIN
      ),
    },
  },
})
