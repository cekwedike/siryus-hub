import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Your Astro configuration
  site: 'https://siryushub.com', // Update with your actual domain
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
