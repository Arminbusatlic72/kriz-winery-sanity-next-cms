import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

// Reuse your localizedString helper
export const category = defineType({
  name: 'category',
  title: 'Category',
  icon: TagIcon,
  type: 'document',
  fields: [
    // Localized category name
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {name: 'en', title: 'English', type: 'string'},
        {name: 'hr', title: 'Croatian', type: 'string'},
      ],
      validation: (rule) => rule.required(),
    }),

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
  ],
  preview: {
    select: {title: 'title.en'},
    prepare({title}) {
      return {title}
    },
  },
})
