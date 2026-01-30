import type {Metadata, ResolvingMetadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {cache} from 'react'
import CoverImage from '@/app/components/CoverImage'
import PortableText from '@/app/components/PortableText'
import {sanityFetch} from '@/sanity/lib/live'
import {productPagesSlugs, productQuery} from '@/sanity/lib/queries'
import {
  resolveOpenGraphImage,
  getLocalizedValue,
  getLocalizedBlockContent,
} from '@/sanity/lib/utils'
import type {Product} from '@/app/types/product'

type Props = {
  params: Promise<{slug: string; locale: string}>
}

// Cache the product fetch to avoid duplicate requests
const getCachedProduct = cache(async (slug: string) => {
  const {data: product} = await sanityFetch({
    query: productQuery,
    params: {slug},
  })
  return product as Product | null
})

export async function generateStaticParams(): Promise<{slug: string}[]> {
  try {
    const {data} = await sanityFetch({
      query: productPagesSlugs,
      perspective: 'published',
      stega: false,
    })

    const products = data as Product[]

    return products.filter((p: Product) => p.slug?.hr).map((p: Product) => ({slug: p.slug.hr}))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  try {
    const {slug, locale} = await props.params

    // Use cached function to avoid duplicate fetch
    const typedProduct = await getCachedProduct(slug)

    if (!typedProduct?._id) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      }
    }

    const [previousImages, ogImage] = await Promise.all([
      parent.then((p) => p.openGraph?.images || []),
      Promise.resolve(resolveOpenGraphImage(typedProduct.productImage)),
    ])

    const title = getLocalizedValue(typedProduct.title, locale)
    const description = getLocalizedValue(typedProduct.description, locale)

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        images: ogImage ? [ogImage, ...previousImages] : previousImages,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ogImage ? [ogImage.url] : undefined,
      },
      alternates: {
        canonical: `/${locale}/products/${slug}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {}
  }
}

export default async function ProductPage({params}: Props) {
  try {
    const {slug, locale} = await params

    // Use cached function to avoid duplicate fetch
    const typedProduct = await getCachedProduct(slug)

    if (!typedProduct?._id) {
      notFound()
    }

    // Batch all localization calls for better performance
    const localizedData = {
      title: getLocalizedValue(typedProduct.title, locale),
      description: getLocalizedValue(typedProduct.description, locale),
      excerpt: getLocalizedValue(typedProduct.excerpt, locale),
      content: getLocalizedBlockContent(typedProduct.content, locale),
      imageAlt: getLocalizedValue(typedProduct.productImage?.alt, locale),
    }

    return (


    <div className="min-h-screen bg-white dark:bg-neutral-950">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
    
    {/* Product Grid: Image and Info on the same row */}
    <div className="grid lg:grid-cols-10 gap-12 lg:gap-20 items-start">
      
      {/* Left: Dominant Image (6 columns) */}
      {typedProduct.productImage && (
        <div className="lg:col-span-6">
          <section 
            aria-label="Product image"
            className="relative aspect-[4/5] md:aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-xl"
          >
            <CoverImage
              image={{...typedProduct.productImage, alt: localizedData.imageAlt}}
              priority
              className="object-cover transition-transform duration-[2s] hover:scale-105"
            />
          </section>
        </div>
      )}

      {/* Right: Product Details (4 columns) */}
      <div className="lg:col-span-4 space-y-12">
        
        {/* Header */}
        <header className="space-y-6 pt-4">
          <div className="flex items-center space-x-4">
             <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold">
               Križ winery products {new Date().getFullYear()}
             </span>
          </div>

          <h1 className="font-strangelove text-5xl sm:text-6xl lg:text-7xl text-gray-950 dark:text-white leading-[0.9] tracking-tighter">
            {localizedData.title}
          </h1>

          {/* Minimalist Divider */}
          <div className="h-[1px] w-12 bg-black dark:bg-white"></div>
        </header>

        {/* Excerpt (The "Short Story" of the product) */}
        {localizedData.excerpt && (
          <section aria-label="Product excerpt">
            <p className="text-lg text-gray-500 dark:text-neutral-400 leading-relaxed font-light italic border-l-2 border-neutral-100 dark:border-neutral-800 pl-6">
              {localizedData.excerpt}
            </p>
          </section>
        )}

        {/* Main Content (Integrated here instead of below) */}
        {localizedData.content?.length > 0 && (
          <section aria-label="Product details" className="pt-4">
            <div className="prose prose-sm dark:prose-invert max-w-none 
              prose-p:text-gray-600 dark:prose-p:text-neutral-400 prose-p:leading-relaxed
              prose-headings:font-strangelove prose-headings:text-2xl
              prose-strong:text-black dark:prose-strong:text-white">
              <PortableText value={localizedData.content} />
            </div>
          </section>
        )}

        {/* Minimalist Action / Back Button */}
        <div className="pt-8">
          <Link 
            href={`/${locale}/vinarija`}
            className="group flex items-center space-x-3 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <span className="h-[1px] w-8 bg-gray-200 group-hover:bg-black dark:bg-neutral-800 dark:group-hover:bg-white transition-all group-hover:w-12" />
            <span>see all our products</span>
          </Link>
        </div>
      </div>
    </div>
  </div>

  {/* Structured Data (Keep for SEO, even if UI is hidden) */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': localizedData.title,
        'image': typedProduct.productImage ? resolveOpenGraphImage(typedProduct.productImage)?.url : undefined,
      }),
    }}
  />
</div>
    )
  } catch (error) {
    console.error('Error rendering product page:', error)
    notFound()
  }
}
