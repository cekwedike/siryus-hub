import { defineField, defineType } from 'sanity'

const formatOptions = [
  { title: 'In person', value: 'in-person' },
  { title: 'Online', value: 'online' },
  { title: 'Hybrid', value: 'hybrid' },
]

export default defineType({
  name: 'arcEvent',
  title: 'ARC Event',
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
      name: 'startDateTime',
      title: 'Starts',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDateTime',
      title: 'Ends',
      type: 'datetime',
      description: 'Optional. Used for duration and calendar semantics.',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: formatOptions.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
      initialValue: 'in-person',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locationName',
      title: 'Venue / location label',
      type: 'string',
      description: 'Short label shown in listings (e.g. studio name, “Zoom”, city).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locationAddress',
      title: 'Address or details',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'locationUrl',
      title: 'Map or venue link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'onlineUrl',
      title: 'Online meeting link',
      type: 'url',
      description: 'Stream, Zoom, or RSVP page for virtual attendance.',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
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
      name: 'body',
      title: 'Details',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration or tickets URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title override',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO meta description',
      type: 'string',
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
      title: 'title',
      start: 'startDateTime',
      media: 'coverImage',
      format: 'format',
    },
    prepare({ title, start, media, format }) {
      const when = start
        ? new Date(start).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
          })
        : ''
      return {
        title: title ?? 'Untitled event',
        subtitle: [format, when].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
