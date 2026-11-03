import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'genre',
      title: 'Genre Tags',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'oneLiner',
      title: 'One Line Bio',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'bioParagraph1',
      title: 'Bio Paragraph 1',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bioParagraph2',
      title: 'Bio Paragraph 2',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      readOnly: false,
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'managementLabel',
      title: 'Management Label',
      type: 'string',
      initialValue: 'SIRYUS A.M Artist',
    }),
    defineField({
      name: 'releases',
      title: 'Releases',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
            }),
            defineField({
              name: 'spotifyUrl',
              title: 'Spotify URL',
              type: 'url',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'platforms',
      title: 'Platforms',
      type: 'object',
      fields: [
        defineField({ name: 'spotify', title: 'Spotify', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
        defineField({ name: 'appleMusic', title: 'Apple Music', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'audiomack', title: 'Audiomack', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok', type: 'url' }),
      ],
    }),
    defineField({
      name: 'relationship',
      title: 'Relationship with SIRYUS A.M',
      description: 'Current roster shows on the Artists page. Alumni shows in the Alumni section for artists we have worked with before. Hidden keeps the profile off the site.',
      type: 'string',
      options: {
        list: [
          { title: 'Current roster', value: 'current' },
          { title: 'Alumni (worked with us before)', value: 'alumni' },
          { title: 'Hidden', value: 'hidden' },
        ],
        layout: 'radio',
      },
      initialValue: 'current',
    }),
    defineField({
      name: 'alumniPeriod',
      title: 'When we worked together',
      description: 'For example "2024 to 2025".',
      type: 'string',
      hidden: ({ document }) => document?.relationship !== 'alumni',
    }),
    defineField({
      name: 'alumniNote',
      title: 'What we did together',
      description: 'One short sentence, for example "Managed and distributed by SIRYUS A.M for a year."',
      type: 'text',
      rows: 2,
      hidden: ({ document }) => document?.relationship !== 'alumni',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Active on Roster',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order on Roster Page',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      relationship: 'relationship',
      location: 'location',
      media: 'photo',
    },
    prepare: ({ title, relationship, location, media }) => ({
      title,
      subtitle: [relationship === 'alumni' ? 'Alumni' : relationship === 'hidden' ? 'Hidden' : 'Current roster', location].filter(Boolean).join(', '),
      media,
    }),
  },
})
