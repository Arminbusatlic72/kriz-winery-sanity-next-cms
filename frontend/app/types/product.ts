type LocalizedFieldOrString = string | LocalizedField

interface LocalizedField {
  [key: string]: string
}

export interface LocalizedString extends LocalizedField {
  en: string
  hr: string
}

export interface LocalizedContent {
  en: any[] // Replace with your specific block content type
  hr: any[]
  [key: string]: any[] // Index signature for content
}

export interface ImageAsset {
  _ref: string
  _type: 'reference'
}

export interface ProductImage {
  alt: LocalizedString
  asset: ImageAsset
  _type?: 'image'
}

export interface ProductSlug {
  en: string
  hr: string
  _type?: 'slug'
}

export interface Product {
  _id: string
  author: null
  content: LocalizedContent
  date: string
  description: LocalizedString
  excerpt: LocalizedString | null
  price: number
  productImage: ProductImage
  slug: ProductSlug
  title: LocalizedString
}
