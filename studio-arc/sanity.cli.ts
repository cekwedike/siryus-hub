import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_ARC_PROJECT_ID || 'qi12mdx6',
    dataset: process.env.SANITY_STUDIO_ARC_DATASET ?? 'production',
  },
  vite: (config) => ({
    ...config,
    server: {
      ...config.server,
      strictPort: false,
    },
  }),
})
