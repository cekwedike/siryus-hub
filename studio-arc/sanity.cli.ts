import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_ARC_PROJECT_ID ?? '',
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
