import createImageUrlBuilder from '@sanity/image-url'
import {Link} from '@/sanity.types'
import {dataset, projectId, studioUrl} from '@/sanity/lib/api'
import {createDataAttribute, CreateDataAttributeProps} from 'next-sanity'
import {getImageDimensions} from '@sanity/asset-utils'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  const imageRef = source?.asset?._ref
  const crop = source.crop

  // get the image's og dimensions
  const {width, height} = getImageDimensions(imageRef)

  if (Boolean(crop)) {
    // compute the cropped image's area
    const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)))

    const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)))

    // compute the cropped image's position
    const left = Math.floor(width * crop.left)
    const top = Math.floor(height * crop.top)

    // gather into a url
    return imageBuilder?.image(source).rect(left, top, croppedWidth, croppedHeight).auto('format')
  }

  return imageBuilder?.image(source).auto('format')
}

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url()
  if (!url) return
  return {url, alt: image?.alt as string, width, height}
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: Link | undefined) {
  if (!link) return null

  // If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
  if (!link.linkType && link.href) {
    link.linkType = 'href'
  }

  switch (link.linkType) {
    case 'href':
      return link.href || null
    case 'page':
      if (link?.page && typeof link.page === 'string') {
        return `/${link.page}`
      }
    case 'post':
      if (link?.post && typeof link.post === 'string') {
        return `/posts/${link.post}`
      }
    default:
      return null
  }
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config)
}
// Type definitions for your localized product data
export interface LocalizedField {
  en?: string
  hr?: string
  [key: string]: string | undefined
}

export interface LocalizedSlug {
  en?: string
  hr?: string
  [key: string]: string | undefined
}

export interface LocalizedBlockContent {
  en?: any[]
  hr?: any[]
  [key: string]: any[] | undefined // Added this line
}

export interface RawProduct {
  _id: string
  title: LocalizedField | string
  description: LocalizedField
  price: number
  content?: LocalizedBlockContent
  excerpt?: LocalizedField
  productImage: {
    asset: any
    alt: LocalizedField
  }
  slug: LocalizedSlug
  date: string
  author?: {
    firstName: string
    lastName: string
  }
}
export type LocalizedFieldOrString = LocalizedField | string | null | undefined

export interface LocalizedProduct {
  _id: string
  title: LocalizedField | string
  description: string
  price: number
  content?: any[]
  excerpt?: string
  productImage: {
    asset: any
    alt: string
  }
  currentSlug: string
  slug: LocalizedSlug // Keep the full slug object for routing
  date: string
  author?: {
    firstName: string
    lastName: string
  }
}

export const getLocalizedValue = (
  field: LocalizedFieldOrString,
  language: string,
  fallbackLanguage: string = 'en',
): string => {
  if (!field) return ''
  if (typeof field === 'string') return field
  return (
    field[language as keyof LocalizedField] || field[fallbackLanguage as keyof LocalizedField] || ''
  )
}

export const getLocalizedSlug = (
  slug: {en?: string; hr?: string; [key: string]: string | undefined},
  locale: string,
) => {
  return slug[locale] || slug.en || ''
}

export function getAllLocalizedSlugs(slug: any) {
  if (!slug) return {}

  return {
    en: slug.en?.current ?? '',
    hr: slug.hr?.current ?? '',
  }
}
// Helper function to get localized block content with fallback

type BlockContent = any[]

// Accepts either localized object or raw block array
export const getLocalizedBlockContent = (
  content: LocalizedBlockContent | BlockContent | null | undefined,
  language: string,
  fallbackLanguage: string = 'en',
): any[] => {
  if (!content) return []

  // If it's a localized object (has keys 'en' or 'hr')
  if (typeof content === 'object' && !Array.isArray(content)) {
    return (
      (content as LocalizedBlockContent)[language] ||
      (content as LocalizedBlockContent)[fallbackLanguage] ||
      []
    )
  }

  // Already a raw block array
  if (Array.isArray(content)) return content

  return []
}
// Transform raw product data to localized product
export const localizeProduct = (product: RawProduct, language: string): LocalizedProduct => {
  return {
    _id: product._id,
    title: getLocalizedValue(product.title, language),
    description: getLocalizedValue(product.description, language),
    price: product.price,
    content: product.content ? getLocalizedBlockContent(product.content, language) : undefined,
    excerpt: getLocalizedValue(product.excerpt, language),
    productImage: {
      asset: product.productImage.asset,
      alt: getLocalizedValue(product.productImage.alt, language),
    },
    currentSlug: getLocalizedSlug(product.slug, language),
    slug: product.slug,
    date: product.date,
    author: product.author,
  }
}

// Transform array of products
export const localizeProducts = (products: RawProduct[], language: string): LocalizedProduct[] => {
  return products.map((product) => localizeProduct(product, language))
}
