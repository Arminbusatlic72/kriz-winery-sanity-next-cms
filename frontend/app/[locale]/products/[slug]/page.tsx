// import type {Metadata, ResolvingMetadata} from 'next'
// import {notFound} from 'next/navigation'
// import {Suspense} from 'react'

// import CoverImage from '@/app/components/CoverImage'
// import PortableText from '@/app/components/PortableText'
// import {sanityFetch} from '@/sanity/lib/live'
// import {productPagesSlugs, productQuery} from '@/sanity/lib/queries'
// import {resolveOpenGraphImage} from '@/sanity/lib/utils'
// import {getLocalizedValue, getLocalizedBlockContent} from '@/sanity/lib/utils'

// type Props = {
//   params: Promise<{slug: string; locale: string}>
// }

// /**
//  * Generate static params for all products
//  */
// export async function generateStaticParams() {
//   const {data} = await sanityFetch({
//     query: productPagesSlugs,
//     perspective: 'published',
//     stega: false,
//   })

//   // Flatten to array of objects with {slug, locale} for each language
//   const params: {slug: string; locale: string}[] = []
//   data.forEach((product: any) => {
//     if (product.slug?.en) params.push({slug: product.slug.en, locale: 'en'})
//     if (product.slug?.hr) params.push({slug: product.slug.hr, locale: 'hr'})
//   })
//   return params
// }

// /**
//  * Generate metadata for each product
//  */
// export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
//   const {slug, locale} = await props.params
//   const {data: product} = await sanityFetch({
//     query: productQuery,
//     params: {slug},
//     stega: false,
//   })

//   if (!product?._id) return {}

//   const previousImages = (await parent).openGraph?.images || []
//   const ogImage = resolveOpenGraphImage(product.productImage, locale)

//   // Use utility functions to get localized values
//   const title = getLocalizedValue(product.title, locale)
//   const description = getLocalizedValue(product.description, locale)

//   return {
//     title: title,
//     description: description,
//     openGraph: {
//       images: ogImage ? [ogImage, ...previousImages] : previousImages,
//     },
//   }
// }

// export default async function ProductPage(props: Props) {
//   const {slug, locale} = await props.params
//   const {data: product} = await sanityFetch({
//     query: productQuery,
//     params: {slug},
//   })

//   if (!product?._id) {
//     return notFound()
//   }

//   // Extract localized values using utility functions
//   const title = getLocalizedValue(product.title, locale)
//   const description = getLocalizedValue(product.description, locale)
//   const excerpt = getLocalizedValue(product.excerpt, locale)
//   const content = getLocalizedBlockContent(product.content, locale)
//   const imageAlt = getLocalizedValue(product.productImage?.alt, locale)
//   console.log('Product data:', product)
//   console.log('Locale:', locale)
//   console.log('Title:', getLocalizedValue(product.title, locale))
//   return (
//     <div className="container my-12 lg:my-24 grid gap-12">
//       <div>
//         <div className="pb-6 grid gap-6 mb-6 border-b border-gray-100 dark:border-gray-800">
//           <div className="max-w-3xl flex flex-col gap-6">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-7xl">
//               {title}
//             </h1>
//             {product.price && (
//               <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
//                 Price: {product.price} EUR
//               </p>
//             )}
//             {description && (
//               <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>
//             )}
//           </div>
//         </div>

//         <article className="gap-6 grid max-w-4xl">
//           <div>
//             {product.productImage && (
//               <CoverImage
//                 image={{
//                   ...product.productImage,
//                   alt: imageAlt,
//                 }}
//                 priority
//               />
//             )}
//           </div>

//           {excerpt && (
//             <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
//               <p className="text-lg text-gray-700 dark:text-gray-300 italic">{excerpt}</p>
//             </div>
//           )}

//           {content?.length > 0 && (
//             <PortableText className="max-w-2xl text-gray-800 dark:text-gray-200" value={content} />
//           )}

//           {/* Author information if available */}
//           {product.author && (
//             <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Created by {product.author.firstName} {product.author.lastName}
//               </p>
//             </div>
//           )}
//         </article>
//       </div>
//     </div>
//   )
// }

// 'use client'
import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'

import CoverImage from '@/app/components/CoverImage'
import PortableText from '@/app/components/PortableText'
import {sanityFetch} from '@/sanity/lib/live'
import {productPagesSlugs, productQuery} from '@/sanity/lib/queries'
import {
  resolveOpenGraphImage,
  getLocalizedValue,
  getLocalizedBlockContent,
} from '@/sanity/lib/utils'

type Props = {params: {slug: string}}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: productPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data.filter((p: any) => p.slug?.en).map((p: any) => ({slug: p.slug.en}))
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const {slug} = props.params
  const {data: product} = await sanityFetch({query: productQuery, params: {slug}})

  if (!product?._id) return {}

  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(product.productImage, 'en')

  return {
    title: getLocalizedValue(product.title, 'en'),
    description: getLocalizedValue(product.description, 'en'),
    openGraph: {images: ogImage ? [ogImage, ...previousImages] : previousImages},
  }
}

export default async function ProductPage({params}: Props) {
  const {slug} = params
  const {data: product} = await sanityFetch({query: productQuery, params: {slug}})

  if (!product?._id) return notFound()

  const title = getLocalizedValue(product.title, 'en')
  const description = getLocalizedValue(product.description, 'en')
  const excerpt = getLocalizedValue(product.excerpt, 'en')
  const content = getLocalizedBlockContent(product.content, 'en')
  const imageAlt = getLocalizedValue(product.productImage?.alt, 'en')

  return (
    <div className="container my-12 lg:my-24 grid gap-12">
      <h1 className="text-4xl font-bold">{title}</h1>
      {description && <p>{description}</p>}
      {product.productImage && (
        <CoverImage image={{...product.productImage, alt: imageAlt}} priority />
      )}
      {excerpt && <p className="italic">{excerpt}</p>}
      {content?.length > 0 && <PortableText value={content} />}
    </div>
  )
}
