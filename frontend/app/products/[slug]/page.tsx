import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'

import CoverImage from '@/app/components/CoverImage'
import PortableText from '@/app/components/PortableText'
import {sanityFetch} from '@/sanity/lib/live'
import {productPagesSlugs, productQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

type Props = {
  params: Promise<{slug: string}>
}

/**
 * Generate static params for all products
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: productPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for each product
 */
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: product} = await sanityFetch({
    query: productQuery,
    params,
    stega: false,
  })

  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(product?.productImage)

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const [{data: product}] = await Promise.all([sanityFetch({query: productQuery, params})])

  if (!product?._id) {
    return notFound()
  }

  return (
    <div className="container my-12 lg:my-24 grid gap-12">
      <div>
        <div className="pb-6 grid gap-6 mb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl flex flex-col gap-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-7xl">
              {product.title}
            </h1>
            {product.price && (
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Price: {product.price} EUR
              </p>
            )}
          </div>
        </div>
        <article className="gap-6 grid max-w-4xl">
          <div>{product?.productImage && <CoverImage image={product.productImage} priority />}</div>
          {product.content?.length && (
            <PortableText
              className="max-w-2xl text-gray-800 dark:text-gray-200"
              value={product.content}
            />
          )}
        </article>
      </div>
    </div>
  )
}
