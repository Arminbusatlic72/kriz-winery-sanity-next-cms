

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

    return (
     
  <>
  <div className="min-h-screen bg-white dark:bg-neutral-950">
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-20">
      
      {/* Header: Centered & Focused */}
      <header className="max-w-4xl mx-auto text-center mb-16 lg:mb-24">
        <div className="space-y-8">
          {/* Subtle Category/Date Label */}
          <div className="flex items-center justify-center space-x-4">
             <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
               Insight
             </span>
             <span className="h-[1px] w-8 bg-gray-200 dark:bg-neutral-800" />
             <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
                {post.date ? new Date(post.date).toLocaleDateString(locale) : 'Archive'}
             </span>
          </div>

          <h1 className="font-strangelove text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-950 dark:text-white leading-[0.9] tracking-tight">
            {title}
          </h1>

          {excerpt && (
            <p className="text-lg md:text-xl text-gray-500 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light italic">
              {excerpt}
            </p>
          )}

          {/* Minimalist Author Info */}
          {authorForAvatar && (
            <div className="pt-6 flex justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <Avatar person={authorForAvatar} />
            </div>
          )}
        </div>
      </header>

      {/* Hero Image: Wide & Cinematic */}
      <div className="max-w-6xl mx-auto mb-16 lg:mb-24 px-0 lg:px-4">
        {post.coverImage && (
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-2xl">
            <CoverImage 
              image={{...post.coverImage, alt: imageAlt}} 
              priority 
              className="object-cover transition-transform duration-[2s] scale-100 hover:scale-105"
            />
          </div>
        )}
      </div>

      {/* Main Content: Clean Typography, No "Box" */}
      <div className="max-w-3xl mx-auto">
        {content?.length > 0 && (
          <div className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-strangelove prose-headings:font-normal prose-headings:tracking-tight
            prose-p:text-gray-600 dark:prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:font-light
            prose-a:text-black dark:prose-a:text-white prose-a:decoration-gray-300 hover:prose-a:decoration-black
            selection:bg-neutral-100 dark:selection:bg-neutral-800">
            <CustomPortableText value={content} />
          </div>
        )}
      </div>

    </article>
  </div>

  {/* Related Posts: Refined Divider & Grid */}
  <aside className="border-t border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-950" aria-label="Related posts">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      <div className="flex items-center justify-between mb-12 lg:mb-16">
        <h2 className="font-strangelove text-4xl lg:text-5xl text-gray-950 dark:text-white">
          Continue Reading
        </h2>
        <div className="hidden md:block h-[1px] flex-grow mx-8 bg-neutral-100 dark:bg-neutral-800" />
      </div>

      <Suspense fallback={<div className="h-64 animate-pulse bg-neutral-50 dark:bg-neutral-900" />}>
        <div className="opacity-90 hover:opacity-100 transition-opacity duration-500">
          <MorePosts skip={post._id} limit={2} locale={locale as 'en' | 'hr'} />
        </div>
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
