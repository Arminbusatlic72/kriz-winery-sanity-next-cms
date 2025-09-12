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

type Props = {
  params: Promise<{slug: string; locale: string}>
}

export async function generateStaticParams({params}: Props) {
  const {data} = await sanityFetch({
    query: productPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data.filter((p: any) => p.slug?.en).map((p: any) => ({slug: p.slug.en}))
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const {slug} = await props.params
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
  const {slug} = await params
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
