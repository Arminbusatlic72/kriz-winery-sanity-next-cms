// src/i18n/navigation.ts
import {createNavigation} from 'next-intl/navigation'

export const locales = ['en', 'hr'] as const

// Define your localized pathnames for static and dynamic pages
export const pathnames = {
  '/home': {
    en: '/home',
    hr: '/pocetna',
  },
  '/about': {
    en: '/about',
    hr: '/o-nama',
  },
  '/winery': {
    en: '/winery',
    hr: '/vinarija',
  },
  '/posts': {en: '/posts', hr: '/postovi'},
  '/accommodation': {
    en: '/accommodation',
    hr: '/smjestaj',
  },
  '/contact': {
    en: '/contact',
    hr: '/kontaktirajte-nas',
  },
  // Add the dynamic route for products
  '/products/[slug]': {
    en: '/products/[slug]',
    hr: '/proizvodi/[slug]',
  },
  '/posts/[slug]': {
    en: '/posts/[slug]',
    hr: '/postovi/[slug]',
  },
  '/posts/category/[category]': {
    en: '/posts/category/[category]',
    hr: '/postovi/kategorija/[category]',
  },
} satisfies Record<string, string | Record<(typeof locales)[number], string>>

export const {Link, useRouter, usePathname} = createNavigation({locales, pathnames})
