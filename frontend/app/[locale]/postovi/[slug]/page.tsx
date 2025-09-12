// 'use client'
import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'

import Avatar from '@/app/components/Avatar'
import CoverImage from '@/app/components/CoverImage'
import PortableText from '@/app/components/PortableText'
import {MorePosts} from '@/app/components/Posts'
import {sanityFetch} from '@/sanity/lib/live'
import {postPagesSlugs, postsQuery} from '@/sanity/lib/queries'
import {
  resolveOpenGraphImage,
  getLocalizedValue,
  getLocalizedBlockContent,
} from '@/sanity/lib/utils'

type Props = {
  params: Promise<{slug: string; locale: 'en' | 'hr'}>
}

// --- Generate static paths for Next.js ---
export async function generateStaticParams({params}: Props) {
  const {data} = await sanityFetch({
    query: postPagesSlugs,
    perspective: 'published',
    stega: false,
  })

  // Flatten for both locales
  return data
    .flatMap((post: any) => [
      {slug: post.slug?.en, locale: 'en'},
      {slug: post.slug?.hr, locale: 'hr'},
    ])
    .filter(Boolean)
}

// --- Generate metadata for the page ---
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const {slug, locale} = await props.params
  const {data: post} = await sanityFetch({query: postsQuery, params: {slug}})

  if (!post?._id) return {}

  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(post.coverImage, locale)

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{name: `${post.author.firstName} ${post.author.lastName}`}]
        : [],
    title: getLocalizedValue(post.title, locale),
    description: getLocalizedValue(post.excerpt, locale),
    openGraph: {images: ogImage ? [ogImage, ...previousImages] : previousImages},
  }
}

// --- Post Page Component ---
export default async function PostPage({params}: Props) {
  const {slug, locale} = await params
  const {data: post} = await sanityFetch({query: postsQuery, params: {slug}})

  if (!post?._id) return notFound()

  const title = getLocalizedValue(post.title, locale)
  const excerpt = getLocalizedValue(post.excerpt, locale)
  const content = getLocalizedBlockContent(post.content, locale)
  const category = getLocalizedValue(post.category?.title, locale)
  const imageAlt = getLocalizedValue(post.coverImage?.alt, locale)

  return (
    <>
      <div className="container my-12 lg:my-24 grid gap-12">
        <div>
          <div className="pb-6 grid gap-6 mb-6 border-b border-gray-100">
            <div className="max-w-3xl flex flex-col gap-6">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                {title}
              </h2>
            </div>
            <div className="max-w-3xl flex gap-4 items-center">
              {post.author && post.author.firstName && post.author.lastName && (
                <Avatar person={post.author} date={post.date} />
              )}
            </div>
          </div>
          <article className="gap-6 grid max-w-4xl">
            {post.coverImage && <CoverImage image={{...post.coverImage, alt: imageAlt}} priority />}
            {excerpt && <p className="italic">{excerpt}</p>}
            {category && <p className="text-sm text-gray-500 mt-4">Category: {category}</p>}
            {content?.length > 0 && <PortableText value={content} />}
          </article>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container py-12 lg:py-24 grid gap-12">
          <aside>
            <MorePosts skip={post._id} limit={2} />
          </aside>
        </div>
      </div>
    </>
  )
}
