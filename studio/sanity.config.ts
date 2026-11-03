import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'h16wl0pr'
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'

export default defineConfig({
  name: 'siryus-am',
  title: 'SIRYUS A.M Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      // Artists are split by relationship so the roster and the alumni list are easy to manage.
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Artists')
              .child(
                S.list()
                  .title('Artists')
                  .items([
                    S.listItem().title('Managed artists').child(S.documentList().title('Managed artists').filter('_type == "artist" && (relationship == "current" || !defined(relationship))')),
                    S.listItem().title('Distribution artists').child(S.documentList().title('Distribution artists').filter('_type == "artist" && relationship == "distributed"')),
                    S.listItem().title('Alumni').child(S.documentList().title('Alumni').filter('_type == "artist" && relationship == "alumni"')),
                    S.listItem().title('All artists').child(S.documentTypeList('artist')),
                  ]),
              ),
            S.documentTypeListItem('release').title('Releases'),
            ...S.documentTypeListItems().filter((item) => !['artist', 'release'].includes(item.getId() ?? '')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
