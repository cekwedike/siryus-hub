import { defineArrayMember, defineField, defineType } from 'sanity'

// A release shown on artists.siryushub.com/music: SIRYUS A.M's own records (the collective) and records it
// appears on. Add a new one here and the site picks it up on the next publish, with no code changes.
export default defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'credit',
      title: 'Artist credit',
      description: 'As it appears on the platforms, for example "SIRYUS A.M featuring Jlinez and ARC. Creatives".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Where it shows',
      type: 'string',
      options: {
        list: [
          { title: 'Our release (Releases section)', value: 'release' },
          { title: 'We feature on it (Also featured on)', value: 'feature' },
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
