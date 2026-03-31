import { defineField, defineType } from 'sanity'

const platformOptions = [
  { title: 'YouTube', value: 'YouTube' },
  { title: 'Instagram', value: 'Instagram' },
  { title: 'Vimeo', value: 'Vimeo' },
  { title: 'TikTok', value: 'TikTok' },
  { title: 'Other', value: 'Other' },
]

const categoryOptions = [
  { title: 'Music Video', value: 'Music Video' },
  { title: 'Behind the Scenes', value: 'Behind the Scenes' },
  { title: 'Live Performance', value: 'Live Performance' },
  { title: 'Campaign Content', value: 'Campaign Content' },
  { title: 'Artist Reel', value: 'Artist Reel' },
  { title: 'Other', value: 'Other' },
]

export default defineType({
  name: 'studioContent',
  title: 'Studio Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist or Project Name',
      type: 'string',
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: platformOptions.map(({ title, value }) => ({ title, value })),
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'embedUrl',
      title: 'Embed URL',
      type: 'url',
      description: 'Paste the full video or reel URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: categoryOptions.map(({ title, value }) => ({ title, value })),
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Feature this on the Studio page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      platform: 'platform',
      media: 'thumbnail',
    },
    prepare({ title, platform, media }) {
      return {
        title: title ?? 'Untitled',
        subtitle: platform,
        media,
      }
    },
  },
})
