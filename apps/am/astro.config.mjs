import {defineConfig} from 'astro/config';import sitemap from '@astrojs/sitemap';export default defineConfig({site:'https://artists.siryushub.com',output: 'static',
  // Clean URLs without trailing slashes, matching how Cloudflare Pages serves page.html files.
  trailingSlash: 'never',
  build: { format: 'file' },integrations:[sitemap()]})
