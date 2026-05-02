import { defineField, defineType } from 'sanity'

const categoryOptions = [
  { title: 'Church', value: 'Church' },
  { title: 'Studio', value: 'Studio' },
  { title: 'Organization', value: 'Organization' },
  { title: 'Individual', value: 'Individual' },
]

export default defineType({
  name: 'arcSupporter',
  title: 'ARC Supporter',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
        layout: 'radio',
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      media: 'logo',
      featured: 'featured',
    },
    prepare({ title, category, media, featured }) {
      return {
        title: title ?? 'Untitled',
        subtitle: [featured ? 'Featured' : null, category].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
