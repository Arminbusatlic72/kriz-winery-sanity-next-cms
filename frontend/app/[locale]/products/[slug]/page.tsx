import type {Metadata, ResolvingMetadata} from 'next'
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
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          
          {/* Product Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
            
            {/* Left Column - Image */}
            {typedProduct.productImage && (
              <div className="relative">
                <div className="sticky top-8">
                  <section 
                    aria-label="Product image"
                    className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-l group"
                  >
                    <CoverImage
                      image={{...typedProduct.productImage, alt: localizedData.imageAlt}}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </section>
                  
                  {/* Decorative blur element */}
                  <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-blue-200 dark:bg-blue-900  mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-40"></div>
                </div>
              </div>
            )}
      
            {/* Right Column - Product Info */}
            <div className="space-y-8">
              
              {/* Header */}
              <header className="space-y-4">
                <h1 className="font-strangelove text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  {localizedData.title}
                </h1>
                {localizedData.description && (
                  <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                    {localizedData.description}
                  </p>
                )}
              </header>
      
              {/* Price */}
              <aside 
                aria-label="Product pricing"
                className="py-6 border-y border-gray-200 dark:border-gray-800"
              >
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                  EUR {typedProduct.price}
                </p>
              </aside>
      
             {/* Excerpt */}
{localizedData.excerpt && (
  <section 
    aria-label="Product excerpt"
    className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700"
  >
    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
      "{localizedData.excerpt}"
    </p>
  </section>
)}
            </div>
          </div>
      
          {/* Product Content */}
          {localizedData.content?.length > 0 && (
            <section 
              aria-label="Product content"
              className="max-w-4xl"
            >
              <div className="bg-white dark:bg-gray-800  shadow-l p-8 lg:p-12 border border-gray-100 dark:border-gray-700">
               
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                  <PortableText value={localizedData.content} />
                </div>
              </div>
            </section>
          )}
      
        </div>
      
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              'name': localizedData.title,
              'description': localizedData.description,
              'image': typedProduct.productImage
                ? resolveOpenGraphImage(typedProduct.productImage)?.url
                : undefined,
              'offers': {
                '@type': 'Offer',
                'price': typedProduct.price,
                'priceCurrency': 'EUR',
                'availability': 'https://schema.org/InStock',
              },
            }),
          }}
        />
      </div>
      // <div className="container my-12 lg:my-24 grid gap-12">
      //   <header>
      //     <h1 className="text-4xl font-bold">{localizedData.title}</h1>
      //     {localizedData.description && (
      //       <p className="mt-4 text-lg text-gray-600">{localizedData.description}</p>
      //     )}
      //   </header>

      //   {typedProduct.productImage && (
      //     <section aria-label="Product image">
      //       <CoverImage
      //         image={{...typedProduct.productImage, alt: localizedData.imageAlt}}
      //         priority
      //       />
      //     </section>
      //   )}

      //   {localizedData.excerpt && (
      //     <section aria-label="Product excerpt">
      //       <p className="italic text-gray-700">{localizedData.excerpt}</p>
      //     </section>
      //   )}

      //   {localizedData.content?.length > 0 && (
      //     <section aria-label="Product content">
      //       <PortableText value={localizedData.content} />
      //     </section>
      //   )}

      //   <aside className="mt-4" aria-label="Product pricing">
      //     <p className="text-2xl font-semibold text-green-600">${typedProduct.price.toFixed(2)}</p>
      //   </aside>

      //   {/* Structured Data for SEO */}
      //   <script
      //     type="application/ld+json"
      //     dangerouslySetInnerHTML={{
      //       __html: JSON.stringify({
      //         '@context': 'https://schema.org',
      //         '@type': 'Product',
      //         'name': localizedData.title,
      //         'description': localizedData.description,
      //         'image': typedProduct.productImage
      //           ? resolveOpenGraphImage(typedProduct.productImage)?.url
      //           : undefined,
      //         'offers': {
      //           '@type': 'Offer',
      //           'price': typedProduct.price,
      //           'priceCurrency': 'USD',
      //           'availability': 'https://schema.org/InStock',
      //         },
      //       }),
      //     }}
      //   />
      // </div>
    )
  } catch (error) {
    console.error('Error rendering product page:', error)
    notFound()
  }
}
