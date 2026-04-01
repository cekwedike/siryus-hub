import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'https://www.siryushub.com',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/studio') &&
        !page.includes('/api') &&
        !page.includes('/privacy-policy') &&
        !page.includes('/terms-of-use') &&
        !page.includes('/cookie-policy'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://www.siryushub.com/',
        'https://www.siryushub.com/home',
        'https://www.siryushub.com/about',
        'https://www.siryushub.com/services',
        'https://www.siryushub.com/siryus-am',
        'https://www.siryushub.com/artists',
        'https://www.siryushub.com/artists/max-prodigy',
        'https://www.siryushub.com/artists/hidaya-morgan',
        'https://www.siryushub.com/artists/jlinez',
        'https://www.siryushub.com/artists/winny-ezeme',
        'https://www.siryushub.com/community',
        'https://www.siryushub.com/blog',
        'https://www.siryushub.com/studio',
        'https://www.siryushub.com/projects',
        'https://www.siryushub.com/projects/indiba-project-series',
        'https://www.siryushub.com/projects/acoustic-rwanda',
        'https://www.siryushub.com/projects/the-abditory-sessions',
        'https://www.siryushub.com/contact',
        'https://www.siryushub.com/faq',
      ],
    }),
  ],
  build: {
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
    },
  },
})
