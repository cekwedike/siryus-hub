import{defineConfig}from'astro/config';import sitemap from'@astrojs/sitemap';export default defineConfig({site:'https://growth.siryushub.com',output:'static',integrations:[sitemap()]})
