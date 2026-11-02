import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// Legal pages are noindex, so they stay out of the sitemap.
const unlisted = /\/(privacy-policy|terms-of-use|cookie-policy)\/?$/

export default defineConfig({
  site: 'https://siryushub.com',
  output: 'static',
  integrations: [sitemap({ filter: (page) => !unlisted.test(page) })],
})
