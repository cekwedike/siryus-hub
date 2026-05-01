import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_ARC_PROJECT_ID ?? ''
const dataset = process.env.SANITY_STUDIO_ARC_DATASET ?? 'production'

export default defineConfig({
  name: 'arc-studio',
  title: 'ARC Blog',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
