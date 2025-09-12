// import {DocumentTextIcon} from '@sanity/icons'
// import {format, parseISO} from 'date-fns'
// import {defineField, defineType} from 'sanity'

// /**
//  * Post schema.  Define and edit the fields for the 'post' content type.
//  * Learn more: https://www.sanity.io/docs/schema-types
//  */

// export const post = defineType({
//   name: 'post',
//   title: 'Post',
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
//       name: 'coverImage',
//       title: 'Cover Image',
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

// --- Helpers (same as in news schema) ---
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
    ],
    validation: required ? (rule) => rule.required() : undefined,
  })
}

const localizedText = (name: string, title: string) => {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      {name: 'en', title: 'English', type: 'text'},
      {name: 'hr', title: 'Croatian', type: 'text'},
    ],
  })
}

const localizedBlockContent = (name: string, title: string) => {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      {name: 'en', title: 'English', type: 'blockContent'},
      {name: 'hr', title: 'Croatian', type: 'blockContent'},
    ],
  })
}

// --- Post Schema ---
export const post = defineType({
  name: 'post',
  title: 'Post',
  icon: DocumentTextIcon,
  type: 'document',
  fields: [
    // Localized title
    localizedString('title', 'Title', true),

    // Localized slug
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

    // Localized content
    localizedBlockContent('content', 'Content'),

    // Localized excerpt
    localizedText('excerpt', 'Excerpt'),

    // Cover image with localized alt
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {imageDescriptionField: 'alt'},
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'object',
          description: 'Important for SEO and accessibility.',
          fields: [
            {name: 'en', title: 'English', type: 'string'},
            {name: 'hr', title: 'Croatian', type: 'string'},
          ],
          validation: (rule) =>
            rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt?.en) {
                return 'English alt text is required when image is present'
              }
              return true
            }),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),

    // Date
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    // Author reference
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
    }),
  ],

  preview: {
    select: {
      title: 'title.en', // show English title by default in Studio
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      date: 'date',
      media: 'coverImage',
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
