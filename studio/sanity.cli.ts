import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'h16wl0pr',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  vite: (config) => ({
    ...config,
    server: {
      ...config.server,
      strictPort: false,
    },
  }),
})
