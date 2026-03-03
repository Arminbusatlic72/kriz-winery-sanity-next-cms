export type Locale = 'en' | 'hr'

export type PostListItem = {
  _id: string
  title: string
  slug: string
  excerpt: string
  date: string
  coverImage?: unknown
  category?: {
    title?: string
    slug?: string
  }
}

export type ProductListItem = {
  _id: string
  title: string
  slug: string
  excerpt: string
  productImage?: unknown
}

export type CategoryListItem = {
  _id: string
  title: string
  slug: string
}
