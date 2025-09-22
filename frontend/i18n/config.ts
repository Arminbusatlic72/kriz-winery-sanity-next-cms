// i18n/config.ts
export const pathnames = {
  '/': {
    en: '/',
    hr: '/',
  },
  '/about': {
    en: '/about',
    hr: '/o-nama',
  },
  '/winery': {
    en: '/winery',
    hr: '/vinarija',
  },
  '/accommodation': {
    en: '/accommodation',
    hr: '/smjestaj',
  },
  '/contact': {
    en: '/contact',
    hr: '/kontaktirajte-nas',
  },
  '/blog': {
    en: '/posts',
    hr: '/postovi',
  },
  '/posts/[slug]': {
    en: '/posts/[slug]',
    hr: '/postovi/[slug]',
  },
  '/posts/category/[category]': {
    en: '/posts/category/[category]',
    hr: '/postovi/kategorija/[category]',
  },
} as const
