import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const projectId =
  process.env.SANITY_STUDIO_ARC_PROJECT_ID || 'qi12mdx6'
const dataset =
  process.env.SANITY_STUDIO_ARC_DATASET ?? 'production'

export default defineConfig({
  name: 'arc-studio',
  title: 'ARC. Creatives Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      // The order follows the site: journal, events, music, then the supporting pages.
      structure: (S) =>
        S.list()
          .title('ARC. Creatives')
          .items([
            S.documentTypeListItem('blogPost').title('Journal'),
            S.documentTypeListItem('arcEvent').title('Events'),
            S.documentTypeListItem('arcRelease').title('Releases'),
            S.divider(),
            S.documentTypeListItem('arcSupporter').title('Supporters'),
            S.documentTypeListItem('arcFaqItem').title('FAQ'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
