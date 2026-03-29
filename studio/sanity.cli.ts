import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'h16wl0pr',
    dataset: 'production',
  },
  vite: (config) => ({
    ...config,
    server: {
      ...config.server,
      strictPort: false,
    },
  }),
})
