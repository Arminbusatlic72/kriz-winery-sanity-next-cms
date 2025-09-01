import {defineRouting} from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'hr'],

  // Used when no locale matches
  defaultLocale: 'en',
})
