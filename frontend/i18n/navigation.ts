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
} satisfies Record<string, string | Record<(typeof locales)[number], string>>

export const {Link, useRouter, usePathname} = createNavigation({locales, pathnames})
