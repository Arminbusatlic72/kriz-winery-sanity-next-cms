// import {DocumentTextIcon} from '@sanity/icons'
// import {format, parseISO} from 'date-fns'
// import {defineField, defineType} from 'sanity'

// /**
//  * Post schema.  Define and edit the fields for the 'post' content type.
//  * Learn more: https://www.sanity.io/docs/schema-types
//  */

// export const product = defineType({
//   name: 'product',
//   title: 'Product',
//   icon: DocumentTextIcon,
//   type: 'document',
//   fields: [
//     defineField({
//       name: 'title',
//       title: 'Title',
//       type: 'string',
//       validation: (rule) => rule.required(),
//     }),
//     defineField({
//       name: 'slug',
//       title: 'Slug',
//       type: 'slug',
//       description: 'A slug is required for the post to show up in the preview',
//       options: {
//         source: 'title',
//         maxLength: 96,
//         isUnique: (value, context) => context.defaultIsUnique(value, context),
//       },
//       validation: (rule) => rule.required(),
//     }),
//     defineField({
//       name: 'description',
//       title: 'Description',
//       type: 'string',
//     }),
//     defineField({
//       name: 'price',
//       title: 'Price',
//       type: 'number',
//       validation: (rule) => rule.required().min(0),
//     }),
//     defineField({
//       name: 'content',
//       title: 'Content',
//       type: 'blockContent',
//     }),
//     defineField({
//       name: 'excerpt',
//       title: 'Excerpt',
//       type: 'text',
//     }),
//     defineField({
//       name: 'productImage',
//       title: 'Product Image',
//       type: 'image',
//       options: {
//         hotspot: true,
//         aiAssist: {
//           imageDescriptionField: 'alt',
//         },
//       },
//       fields: [
//         {
//           name: 'alt',
//           type: 'string',
//           title: 'Alternative text',
//           description: 'Important for SEO and accessibility.',
//           validation: (rule) => {
//             // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
//             return rule.custom((alt, context) => {
//               if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
//                 return 'Required'
//               }
//               return true
//             })
//           },
//         },
//       ],
//       validation: (rule) => rule.required(),
//     }),
//     defineField({
//       name: 'date',
//       title: 'Date',
//       type: 'datetime',
//       initialValue: () => new Date().toISOString(),
//     }),
//     defineField({
//       name: 'author',
//       title: 'Author',
//       type: 'reference',
//       to: [{type: 'person'}],
//     }),
//   ],
//   // List preview configuration. https://www.sanity.io/docs/previews-list-views
//   preview: {
//     select: {
//       title: 'title',
//       authorFirstName: 'author.firstName',
//       authorLastName: 'author.lastName',
//       date: 'date',
//       media: 'coverImage',
//     },
//     prepare({title, media, authorFirstName, authorLastName, date}) {
//       const subtitles = [
//         authorFirstName && authorLastName && `by ${authorFirstName} ${authorLastName}`,
//         date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
//       ].filter(Boolean)

//       return {title, media, subtitle: subtitles.join(' ')}
//     },
//   },
// })

import {DocumentTextIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

/**
 * Internationalized Product schema with support for multiple languages
 */

// Helper function to create localized string fields
const localizedString = (name: string, title: string, required: boolean = false) => {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      {
        name: 'en',
        title: 'English',
        type: 'string',
        validation: required ? (rule) => rule.required() : undefined,
      },
      {
        name: 'hr',
        title: 'Croatian',
        type: 'string',
      },

      // Add more languages as needed
    ],
    validation: required ? (rule) => rule.required() : undefined,
  })
}

// Helper function for localized text fields
const localizedText = (name: string, title: string) => {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      {
        name: 'en',
        title: 'English',
        type: 'text',
      },
      {
        name: 'hr',
        title: 'Croatian',
        type: 'text',
      },
    ],
  })
}

// Helper function for localized block content
const localizedBlockContent = (name: string, title: string) => {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      {
        name: 'en',
        title: 'English',
        type: 'blockContent',
      },
      {
        name: 'hr',
        title: 'Croatian',
        type: 'blockContent',
      },
    ],
  })
}

export const product = defineType({
  name: 'product',
  title: 'Product',
  icon: DocumentTextIcon,
  type: 'document',
  fields: [
    // Localized title field (required)
    localizedString('title', 'Title', true),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English Slug',
          type: 'slug',
          options: {source: 'title.en', maxLength: 96},
          validation: (rule) => rule.required(),
        },
        {
          name: 'hr',
          title: 'Croatian Slug',
          type: 'slug',
          options: {source: 'title.hr', maxLength: 96},
          validation: (rule) => rule.required(),
        },
      ],
    }),

    // Localized description
    localizedString('description', 'Description'),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),

    // Localized content
    localizedBlockContent('content', 'Content'),

    // Localized excerpt
    localizedText('excerpt', 'Excerpt'),

    defineField({
      name: 'productImage',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        // Localized alt text for accessibility
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'object',
          description: 'Important for SEO and accessibility.',
          fields: [
            {
              name: 'en',
              title: 'English',
              type: 'string',
            },

            {
              name: 'hr',
              title: 'Croatian',
              type: 'string',
            },
          ],
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.productImage as any)?.asset?._ref && !alt?.en) {
                return 'English alt text is required when image is present'
              }
              return true
            })
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
    }),
  ],

  preview: {
    select: {
      title: 'title.en', // Use English title for preview
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      date: 'date',
      media: 'productImage',
    },
    prepare({title, media, authorFirstName, authorLastName, date}) {
      const subtitles = [
        authorFirstName && authorLastName && `by ${authorFirstName} ${authorLastName}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return {title, media, subtitle: subtitles.join(' ')}
    },
  },
})
