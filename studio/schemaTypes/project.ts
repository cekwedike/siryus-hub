import { defineArrayMember, defineField, defineType } from 'sanity'

// A SIRYUS A.M project such as the Indiba Project Series. Every published project gets a page on
// artists.siryushub.com/projects. Fields are grouped into tabs so the everyday ones come first.
const categoryList = ['Artist Development', 'Release Campaign', 'Creative Production', 'Content Series', 'Live Performance', 'Other']
const statusList = ['Active', 'Completed', 'Coming Soon']

const altField = defineField({ name: 'alt', title: 'Alternative text', description: 'Describe the image for screen readers.', type: 'string' })

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'story', title: 'Story', default: true },
    { name: 'media', title: 'Images' },
    { name: 'details', title: 'Details' },
    { name: 'applications', title: 'Applications' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'story', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Web address', type: 'slug', group: 'story', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'excerpt',
      title: 'Short summary',
      description: 'One or two sentences for the Projects page and link previews.',
      type: 'text',
      rows: 2,
      group: 'story',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'longDescription',
      title: 'Full story',
      type: 'array',
      group: 'story',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL', validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }) }],
              },
            ],
          },
        }),
        defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [altField] }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Plain summary (fallback)',
      description: 'Used only if the full story is empty.',
      type: 'text',
      rows: 3,
      group: 'story',
    }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'image', group: 'media', options: { hotspot: true }, fields: [altField] }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery',
      description: 'Photos and artwork from the project. Add new ones any time.',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [altField] })],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'albums',
      title: 'Albums and releases',
      description: 'For example the collaborative album each Indiba cohort records. Add it under Releases first, then pick it here.',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'release' }] })],
    }),
    defineField({ name: 'category', title: 'Category', type: 'string', group: 'details', options: { list: categoryList, layout: 'dropdown' } }),
    defineField({ name: 'status', title: 'Status', type: 'string', group: 'details', options: { list: statusList, layout: 'radio', direction: 'horizontal' } }),
    defineField({ name: 'year', title: 'Year started', type: 'string', group: 'details' }),
    defineField({ name: 'featured', title: 'Show first on the Projects page', type: 'boolean', group: 'details', initialValue: false }),
    defineField({ name: 'registrationOpen', title: 'Applications are open', type: 'boolean', group: 'applications', initialValue: false }),
    defineField({
      name: 'registrationUrl',
      title: 'Application link',
      description: 'Where the Apply button goes. Leave empty to use the SIRYUS A.M contact form.',
      type: 'url',
      group: 'applications',
      hidden: ({ document }) => !document?.registrationOpen,
    }),
    defineField({
      name: 'registrationButtonText',
      title: 'Apply button text',
      description: 'Defaults to "Apply now".',
      type: 'string',
      group: 'applications',
      hidden: ({ document }) => !document?.registrationOpen,
    }),
    defineField({
      name: 'registrationClosedText',
      title: 'Message while applications are closed',
      type: 'text',
      rows: 3,
      group: 'applications',
      hidden: ({ document }) => Boolean(document?.registrationOpen),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'coverImage' },
  },
})
