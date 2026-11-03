import { defineArrayMember, defineField, defineType } from 'sanity'

// An artist SIRYUS A.M works with. "Relationship" decides where they appear on artists.siryushub.com:
// managed artists get a full panel, distribution artists a list entry, alumni the Alumni section.
// Their full catalogue is read from Apple Music automatically using the Apple Music link.
const altField = defineField({ name: 'alt', title: 'Alternative text', description: 'Describe the photo for screen readers.', type: 'string' })

export default defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profile', default: true },
    { name: 'photos', title: 'Photos' },
    { name: 'links', title: 'Links' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', group: 'profile', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Web address', type: 'slug', group: 'profile', options: { source: 'name', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'relationship',
      title: 'Relationship with SIRYUS A.M',
      type: 'string',
      group: 'profile',
      options: {
        list: [
          { title: 'Managed artist (current roster)', value: 'current' },
          { title: 'Distribution artist (we release their music)', value: 'distributed' },
          { title: 'Alumni (worked with us before)', value: 'alumni' },
          { title: 'Hidden (not on the site)', value: 'hidden' },
        ],
        layout: 'radio',
      },
      initialValue: 'current',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alumniNote',
      title: 'What we did together',
      description: 'One short sentence, for example "Managed and distributed by SIRYUS A.M for a year."',
      type: 'string',
      group: 'profile',
      hidden: ({ document }) => document?.relationship !== 'alumni',
    }),
    defineField({
      name: 'alumniPeriod',
      title: 'When we worked together',
      description: 'Optional, for example "2024 to 2025".',
      type: 'string',
      group: 'profile',
      hidden: ({ document }) => document?.relationship !== 'alumni',
    }),
    defineField({ name: 'oneLiner', title: 'One line', description: 'Shown under their name.', type: 'string', group: 'profile', validation: (Rule) => Rule.required().max(120) }),
    defineField({ name: 'bioParagraph1', title: 'Bio', type: 'text', rows: 5, group: 'profile', validation: (Rule) => Rule.required() }),
    defineField({ name: 'bioParagraph2', title: 'Bio, second paragraph', type: 'text', rows: 5, group: 'profile' }),
    defineField({ name: 'genre', title: 'Genres', type: 'array', group: 'profile', of: [defineArrayMember({ type: 'string' })], options: { layout: 'tags' } }),
    defineField({ name: 'location', title: 'Country', type: 'string', group: 'profile' }),
    defineField({
      name: 'order',
      title: 'Position on the Artists page',
      description: 'Lower numbers show first.',
      type: 'number',
      group: 'profile',
    }),
    defineField({
      name: 'gallery',
      title: 'Photos',
      description: 'The first photo is the main portrait. Add as many as you like; replace them any time.',
      type: 'array',
      group: 'photos',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [altField] })],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'photo',
      title: 'Older main photo',
      description: 'Only used when Photos above is empty.',
      type: 'image',
      group: 'photos',
      options: { hotspot: true },
      fields: [altField],
    }),
    defineField({
      name: 'platforms',
      title: 'Profiles',
      description: 'Full links to their artist pages. The Apple Music link also loads their discography.',
      type: 'object',
      group: 'links',
      options: { columns: 2 },
      fields: [
        defineField({ name: 'spotify', title: 'Spotify', type: 'url' }),
        defineField({ name: 'appleMusic', title: 'Apple Music', type: 'url' }),
        defineField({ name: 'audiomack', title: 'Audiomack', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok', type: 'url' }),
        defineField({ name: 'x', title: 'X (Twitter)', type: 'url' }),
        defineField({ name: 'boomplay', title: 'Boomplay', type: 'url' }),
      ],
    }),
  ],
  orderings: [{ title: 'Position on the Artists page', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', relationship: 'relationship', location: 'location', media: 'gallery.0', photo: 'photo' },
    prepare: ({ title, relationship, location, media, photo }) => ({
      title,
      subtitle: [{ alumni: 'Alumni', hidden: 'Hidden', distributed: 'Distribution artist' }[relationship as string] ?? 'Managed artist', location].filter(Boolean).join(', '),
      media: media ?? photo,
    }),
  },
})
