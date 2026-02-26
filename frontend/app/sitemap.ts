import {MetadataRoute} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {pagesSlugs, postPagesSlugs, productPagesSlugs} from '@/sanity/lib/queries'

type SlugEntry = {slug?: string}
type LocalizedSlugEntry = {slug?: {en?: string; hr?: string}}

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
  const now = new Date()

  const [{data: pages}, {data: posts}, {data: products}] = await Promise.all([
    sanityFetch({query: pagesSlugs, stega: false}),
    sanityFetch({query: postPagesSlugs, stega: false}),
    sanityFetch({query: productPagesSlugs, stega: false}),
  ])

  const pageEntries = (pages ?? []) as SlugEntry[]
  const postEntries = (posts ?? []) as LocalizedSlugEntry[]
  const productEntries = (products ?? []) as LocalizedSlugEntry[]

  const staticLocalizedPaths = [
    {en: '/en', hr: '/hr'},
    {en: '/en/about-us', hr: '/hr/nasa-prica'},
    {en: '/en/winery', hr: '/hr/vinarija'},
    {en: '/en/accommodation', hr: '/hr/smjestaj'},
    {en: '/en/posts', hr: '/hr/postovi'},
    {en: '/en/contact', hr: '/hr/kontaktirajte-nas'},
    {en: '/en/products', hr: '/hr/proizvodi'},
  ]

  const sitemap: MetadataRoute.Sitemap = staticLocalizedPaths.map((route) => ({
    url: `${baseUrl}${route.en}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route.en === '/en' ? 1 : 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}${route.en}`,
        hr: `${baseUrl}${route.hr}`,
      },
    },
  }))

  for (const page of pageEntries) {
    if (!page?.slug) continue
    sitemap.push({
      url: `${baseUrl}/en/${page.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}/en/${page.slug}`,
          hr: `${baseUrl}/hr/${page.slug}`,
        },
      },
    })
  }

  for (const post of postEntries) {
    const enSlug = post?.slug?.en
    const hrSlug = post?.slug?.hr
    if (!enSlug && !hrSlug) continue

    sitemap.push({
      url: `${baseUrl}${enSlug ? `/en/posts/${enSlug}` : `/hr/postovi/${hrSlug}`}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          ...(enSlug ? {en: `${baseUrl}/en/posts/${enSlug}`} : {}),
          ...(hrSlug ? {hr: `${baseUrl}/hr/postovi/${hrSlug}`} : {}),
        },
      },
    })
  }

  for (const product of productEntries) {
    const enSlug = product?.slug?.en
    const hrSlug = product?.slug?.hr
    if (!enSlug && !hrSlug) continue

    sitemap.push({
      url: `${baseUrl}${enSlug ? `/en/products/${enSlug}` : `/hr/proizvodi/${hrSlug}`}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          ...(enSlug ? {en: `${baseUrl}/en/products/${enSlug}`} : {}),
          ...(hrSlug ? {hr: `${baseUrl}/hr/proizvodi/${hrSlug}`} : {}),
        },
      },
    })
  }

  return sitemap
}
