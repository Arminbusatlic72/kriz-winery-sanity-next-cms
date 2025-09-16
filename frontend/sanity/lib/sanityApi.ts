import {client} from '@/sanity/lib/client' // Adjust path to your sanity client
import {urlForImage} from '@/sanity/lib/utils'
import {
  productsQuery,
  productBySlugQuery,
  productQuery,
  featuredProductsQuery,
} from '@/sanity/lib/queries' // Adjust path to your queries
import {localizeProduct, localizeProducts, LocalizedProduct, RawProduct} from '@/sanity/lib/utils' // Adjust path to your localization utils

// Fetch all products with localization
export const getProducts = async (language: string = 'en'): Promise<LocalizedProduct[]> => {
  try {
    const products: RawProduct[] = await client.fetch(productsQuery)
    return localizeProducts(products, language)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Fetch single product by slug with localization
export const getProductBySlug = async (
  slug: string,
  language: string = 'en',
): Promise<LocalizedProduct | null> => {
  try {
    const product: RawProduct | null = await client.fetch(productQuery, {slug})
    if (!product) return null
    return localizeProduct(product, language)
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
}

// Fetch featured products (you'll need to add a 'featured' boolean field to your schema)
export const getFeaturedProducts = async (language: string = 'en'): Promise<LocalizedProduct[]> => {
  try {
    const products: RawProduct[] = await client.fetch(featuredProductsQuery)
    return localizeProducts(products, language)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

// Keep your existing slug queries as they don't need localization
export const getAllProductSlugs = async (): Promise<{slug: {en?: string; hr?: string}}[]> => {
  try {
    return await client.fetch(
      `*[_type == "product" && (defined(slug.en.current) || defined(slug.hr.current))]{"slug": {"en": slug.en.current, "hr": slug.hr.current}}`,
    )
  } catch (error) {
    console.error('Error fetching product slugs:', error)
    return []
  }
}

// Helper function to get all possible slugs for static generation
export const getAllProductSlugsByLanguage = async (language: string): Promise<string[]> => {
  try {
    const slugField = language === 'hr' ? 'slug.hr.current' : 'slug.en.current'
    const result = await client.fetch(
      `*[_type == "product" && defined(${slugField})]{"slug": ${slugField}}`,
    )
    return result.map((item: {slug: string}) => item.slug).filter(Boolean)
  } catch (error) {
    console.error('Error fetching product slugs by language:', error)
    return []
  }
}

// Utility functions for images
export const getOptimizedImageUrl = (
  source: any,
  width?: number,
  height?: number,
  quality: number = 80,
): string => {
  return (
    urlForImage(source)
      ?.width(width || 800)
      .height(height || 600)
      .quality(quality)
      .url() || ''
  )
}

// Simple image URL (no optimization)
export const getImageUrl = (source: any): string => {
  return urlForImage(source)?.url() || ''
}
