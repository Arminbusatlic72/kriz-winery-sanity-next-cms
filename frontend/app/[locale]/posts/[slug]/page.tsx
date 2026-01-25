
import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'
import dynamic from 'next/dynamic'

import Avatar from '@/app/components/Avatar'
import CoverImage from '@/app/components/CoverImage'
import CustomPortableText from '@/app/components/PortableText'
import {sanityFetch} from '@/sanity/lib/live'
import {postPagesSlugs, postQuery} from '@/sanity/lib/queries'
import {
  resolveOpenGraphImage,
  getLocalizedBlockContent,
  getLocalizedValue,
} from '@/sanity/lib/utils'

// Dynamic import for MorePosts component (lazy loading)
const MorePosts = dynamic(
  () => import('@/app/components/Posts').then((mod) => ({default: mod.MorePosts})),
  {
    ssr: true,
    loading: () => <div className="animate-pulse h-64 bg-gray-200 rounded" />,
  },
)

type Props = {
  params: Promise<{slug: string; locale: string}>
}

type SanityAsset =
  | {
      _id: string
      url: string | null
      metadata?: {
        lqip?: string | null
        dimensions?: {width?: number; height?: number} | null
      }
    }
  | null
  | undefined

type NormalizedAuthor = {
  firstName: any
  lastName: any
  picture?: {
    alt: string | null
    asset?: {
      _id: string
      url: string | null
      metadata?: {
        lqip: string | null
        dimensions?: {width: number; height: number} | undefined
      }
    }
  }
} | null

/** Generate static params for Next.js App Router */
export async function generateStaticParams(): Promise<Array<{slug: string; locale: string}>> {
  try {
    const {data} = await sanityFetch({
      query: postPagesSlugs,
      perspective: 'published',
      stega: false,
    })

    if (!data) return []

    // If you only have one default locale or want to use a default
    const defaultLocale = 'en' // Replace with your default locale

    return data.map((item: {slug: string}) => ({
      slug: item.slug,
      locale: defaultLocale,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

/** Generate SEO metadata */
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  try {
    const {slug, locale} = await props.params
    const {data: post} = await sanityFetch({
      query: postQuery,
      params: {slug},
      stega: false,
    })

    if (!post?._id) return {}

    const previousImages = (await parent).openGraph?.images || []
    const ogImage = resolveOpenGraphImage(post?.coverImage)
    const title = getLocalizedValue(post.title, locale)
    const description = getLocalizedValue(post.excerpt, locale) || ''

    return {
      title,
      description,
      authors:
        post?.author?.firstName && post?.author?.lastName
          ? [{name: `${post.author.firstName} ${post.author.lastName}`}]
          : [],
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.date || undefined,
        authors:
          post?.author?.firstName && post?.author?.lastName
            ? [`${post.author.firstName} ${post.author.lastName}`]
            : [],
        images: ogImage ? [ogImage, ...previousImages] : previousImages,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ogImage ? [ogImage.url] : [],
      },
      alternates: {
        canonical: `/posts/${slug}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {}
  }
}

/** Normalize author data for Avatar component */
function normalizeAuthor(author: any): NormalizedAuthor {
  if (!author) return null

  return {
    firstName: author.firstName,
    lastName: author.lastName,
    picture: author.picture
      ? {
          alt: author.picture.alt ?? null,
          asset: author.picture.asset
            ? {
                _id: author.picture.asset._id,
                url: author.picture.asset.url ?? null,
                metadata: author.picture.asset.metadata
                  ? {
                      lqip: author.picture.asset.metadata.lqip ?? null,
                      dimensions: author.picture.asset.metadata.dimensions
                        ? {
                            width: author.picture.asset.metadata.dimensions.width ?? 0,
                            height: author.picture.asset.metadata.dimensions.height ?? 0,
                          }
                        : undefined,
                    }
                  : undefined,
              }
            : undefined,
        }
      : undefined,
  }
}

/** Post Page Component */
export default async function PostPage({params}: Props) {
  try {
    const {slug, locale} = await params
    const {data: post} = await sanityFetch({query: postQuery, params: {slug}})

    if (!post?._id) {
      notFound()
    }

    // Extract localized values
    const title = getLocalizedValue(post.title, locale)
    const excerpt = getLocalizedValue(post.excerpt, locale)
    const content = getLocalizedBlockContent(post.content, locale)
    const imageAlt = getLocalizedValue(post.coverImage?.alt, locale)

    // Normalize author data
    const authorForAvatar = normalizeAuthor(post.author)
    const skipId = post._id
    console.log('Post ID to skip in MorePosts:', skipId)
    return (
   
       <>
  <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      
      {/* Header Section */}
      <header className="max-w-4xl mx-auto mb-12 lg:mb-16">
        <div className="space-y-6 pb-8 border-b border-gray-200 dark:border-gray-800">
          
          {/* Title & Excerpt */}
          <div className="space-y-6">
            <h1 className="font-strangelove text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {title}
            </h1>
            {excerpt && (
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {excerpt}
              </p>
            )}
          </div>

          {/* Author Info */}
          {authorForAvatar && (
            <div className="pt-4">
              <Avatar person={authorForAvatar} date={post.date ?? null} />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-video overflow-hidden rounded shadow-l bg-gray-100 dark:bg-gray-800 group">
            <CoverImage 
              image={{...post.coverImage, alt: imageAlt}} 
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            {/* Decorative blur element */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-40"></div>
          </div>
        )}

        {/* Article Content */}
        {content?.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded shadow-l p-8 lg:p-12 border border-gray-100 dark:border-gray-700">
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <CustomPortableText value={content} />
            </div>
          </div>
        )}
      </div>

    </article>
  </div>

  {/* Related Posts Section */}
  <aside className="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950" aria-label="Related posts">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <h2 className="font-strangelove text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 lg:mb-12">
        More Articles
      </h2>
      <Suspense fallback={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded-3xl" />
          <div className="animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded-3xl" />
        </div>
      }>
        <MorePosts skip={post._id} limit={2} locale={locale as 'en' | 'hr'} />
      </Suspense>
    </div>
  </aside>
</>
     
    )
  } catch (error) {
    console.error('Error rendering post page:', error)
    notFound()
  }
}
