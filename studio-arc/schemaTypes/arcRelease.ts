import { defineArrayMember, defineField, defineType } from 'sanity'

// A release shown on collective.siryushub.com/arc/music. ARC. releases come out through SIRYUS A.M, so the
// platform credits read SIRYUS A.M. Add a new one here and the site picks it up on the next publish.
export default defineType({
  name: 'arcRelease',
  title: 'Release',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'credit',
      title: 'Artist credit',
      description: 'As it appears on the platforms, for example "Jlinez featuring ARC. Creatives".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Where it shows',
      type: 'string',
      options: {
        list: [
          { title: 'ARC. Creatives release', value: 'release' },
          { title: 'ARC. Creatives features on it', value: 'feature' },
        ],
        layout: 'radio',
      },
      initialValue: 'release',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: { list: ['Single', 'EP', 'Album'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'Single',
    }),
    defineField({ name: 'releaseDate', title: 'Release date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({ name: 'note', title: 'Short note', description: 'One or two sentences about the release.', type: 'text', rows: 2 }),
    defineField({ name: 'tracks', title: 'Track list', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'cover',
      title: 'Cover art',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alternative text', type: 'string' })],
    }),
    defineField({ name: 'spotify', title: 'Spotify link', type: 'url' }),
    defineField({ name: 'appleMusic', title: 'Apple Music link', type: 'url' }),
    defineField({ name: 'audiomack', title: 'Audiomack link', type: 'url' }),
    defineField({ name: 'youtube', title: 'YouTube link', type: 'url' }),
    defineField({
      name: 'otherLinks',
      title: 'Other links',
      description: 'Any other platform, for example Boomplay or Deezer.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Platform', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'url', title: 'Link', type: 'url', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'releaseDate', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'credit', media: 'cover', date: 'releaseDate' },
    prepare: ({ title, subtitle, media, date }) => ({ title, subtitle: [date?.slice(0, 4), subtitle].filter(Boolean).join(', '), media }),
  },
})
