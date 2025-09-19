// // import type {Metadata, ResolvingMetadata} from 'next'
// // import {notFound} from 'next/navigation'
// // import {Suspense} from 'react'

// // import Avatar from '@/app/components/Avatar'
// // import CoverImage from '@/app/components/CoverImage'
// // import {MorePosts} from '@/app/components/Posts'
// // import CustomPortableText from '@/app/components/PortableText'
// // import {sanityFetch} from '@/sanity/lib/live'
// // import {postPagesSlugs, postQuery} from '@/sanity/lib/queries'
// // import {
// //   resolveOpenGraphImage,
// //   getLocalizedBlockContent,
// //   getLocalizedValue,
// // } from '@/sanity/lib/utils'

// // type Props = {
// //   params: Promise<{slug: string; locale: string}>
// // }

// // /** Generate static params for Next.js App Router */
// // export async function generateStaticParams({params}: Props) {
// //   const {data} = await sanityFetch({query: postPagesSlugs, perspective: 'published', stega: false})
// //   return data
// // }

// // /** Generate SEO metadata */
// // export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
// //   const {slug, locale} = await props.params
// //   const {data: post} = await sanityFetch({query: postQuery, params: {slug}, stega: false})
// //   if (!post?._id) return {}

// //   const previousImages = (await parent).openGraph?.images || []
// //   const ogImage = resolveOpenGraphImage(post?.coverImage)

// //   return {
// //     authors:
// //       post?.author?.firstName && post?.author?.lastName
// //         ? [{name: `${post.author.firstName} ${post.author.lastName}`}]
// //         : [],
// //     title: getLocalizedValue(post.title, locale) || '',
// //     description: getLocalizedValue(post.excerpt, locale) || '',
// //     openGraph: {images: ogImage ? [ogImage, ...previousImages] : previousImages},
// //   }
// // }

// // /** Post Page Component */
// // export default async function PostPage({params}: Props) {
// //   const {slug, locale} = await params
// //   const {data: post} = await sanityFetch({query: postQuery, params: {slug}})

// //   if (!post?._id) return notFound()

// //   const title = getLocalizedValue(post.title, locale)
// //   const excerpt = getLocalizedValue(post.excerpt, locale)
// //   const content = getLocalizedBlockContent(post.content, locale)
// //   const imageAlt = getLocalizedValue(post.coverImage?.alt, locale)

// //   return (
// //     <>
// //       <div className="container my-12 lg:my-24 grid gap-12">
// //         <div>
// //           <div className="pb-6 grid gap-6 mb-6 border-b border-gray-100">
// //             <div className="max-w-3xl flex flex-col gap-6">
// //               <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
// //                 {title}
// //               </h2>
// //             </div>
// //             <div className="max-w-3xl flex gap-4 items-center">
// //               {post.author && post.author.firstName && post.author.lastName && (
// //                 <Avatar person={post.author} date={post.date ?? undefined} />
// //               )}
// //             </div>
// //           </div>

// //           <article className="gap-6 grid max-w-4xl">
// //             {post.coverImage && <CoverImage image={{...post.coverImage, alt: imageAlt}} priority />}
// //             {content?.length > 0 && <CustomPortableText value={content} />}
// //           </article>
// //         </div>
// //       </div>

// //       <div className="border-t border-gray-100 bg-gray-50">
// //         <div className="container py-12 lg:py-24 grid gap-12">
// //           <aside>
// //             <Suspense>{await MorePosts({skip: post._id, limit: 2})}</Suspense>
// //           </aside>
// //         </div>
// //       </div>
// //     </>
// //   )
// // }

// import type {Metadata, ResolvingMetadata} from 'next'
// import {notFound} from 'next/navigation'
// import {Suspense} from 'react'

// import Avatar from '@/app/components/Avatar'
// import CoverImage from '@/app/components/CoverImage'
// import {MorePosts} from '@/app/components/Posts'
// import CustomPortableText from '@/app/components/PortableText'
// import {sanityFetch} from '@/sanity/lib/live'
// import {postPagesSlugs, postQuery} from '@/sanity/lib/queries'
// import {
//   resolveOpenGraphImage,
//   getLocalizedBlockContent,
//   getLocalizedValue,
// } from '@/sanity/lib/utils'

// type Props = {
//   params: Promise<{slug: string; locale: string}>
// }
// type SanityAsset =
//   | {
//       _id: string
//       url: string | null
//       metadata?: {
//         lqip?: string | null
//         dimensions?: {width?: number; height?: number} | null
//       }
//     }
//   | null
//   | undefined

// /** Generate static params for Next.js App Router */
// export async function generateStaticParams({params}: Props) {
//   const {data} = await sanityFetch({query: postPagesSlugs, perspective: 'published', stega: false})
//   return data
// }

// /** Generate SEO metadata */
// export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
//   const {slug, locale} = await props.params
//   const {data: post} = await sanityFetch({query: postQuery, params: {slug}, stega: false})
//   if (!post?._id) return {}

//   const previousImages = (await parent).openGraph?.images || []
//   const ogImage = resolveOpenGraphImage(post?.coverImage)

//   return {
//     authors:
//       post?.author?.firstName && post?.author?.lastName
//         ? [{name: `${post.author.firstName} ${post.author.lastName}`}]
//         : [],
//     title: getLocalizedValue(post.title, locale),
//     description: getLocalizedValue(post.excerpt, locale) || '',
//     openGraph: {images: ogImage ? [ogImage, ...previousImages] : previousImages},
//   }
// }

// /** Post Page Component */
// export default async function PostPage({params}: Props) {
//   const {slug, locale} = await params
//   const {data: post} = await sanityFetch({query: postQuery, params: {slug}})

//   if (!post?._id) return notFound()

//   const title = getLocalizedValue(post.title, locale)
//   const excerpt = getLocalizedValue(post.excerpt, locale)
//   const content = getLocalizedBlockContent(post.content, locale)
//   const imageAlt = getLocalizedValue(post.coverImage?.alt, locale)

//   // Author data
//   const authorFirstName = getLocalizedValue(post.author?.firstName, locale)
//   const authorLastName = getLocalizedValue(post.author?.lastName, locale)
//   const authorPicture = post.author?.picture // picture is usually just an image object, no localization
//   const authorAlt = getLocalizedValue(post.author?.picture?.alt, locale)

//   function normalizePicture(picture: any) {
//     if (!picture) return undefined

//     const asset: SanityAsset = picture.asset
//       ? {
//           _id: picture.asset._id,
//           url: picture.asset.url,
//           metadata: picture.asset.metadata ?? undefined, // normalize null to undefined
//         }
//       : undefined

//     return {
//       alt: picture.alt ?? undefined,
//       asset,
//     }
//   }
//   // Inside your PostPage or where you render Avatar
//   // Normalize author data for Avatar
//   const authorForAvatar = post.author
//     ? {
//         firstName: post.author.firstName,
//         lastName: post.author.lastName,
//         picture: post.author.picture
//           ? {
//               alt: post.author.picture.alt ?? null,
//               asset: post.author.picture.asset
//                 ? {
//                     _id: post.author.picture.asset._id,
//                     url: post.author.picture.asset.url ?? null, // <-- convert undefined to null
//                     metadata: post.author.picture.asset.metadata
//                       ? {
//                           lqip: post.author.picture.asset.metadata.lqip ?? null,
//                           dimensions: post.author.picture.asset.metadata.dimensions
//                             ? {
//                                 width: post.author.picture.asset.metadata.dimensions.width ?? 0,
//                                 height: post.author.picture.asset.metadata.dimensions.height ?? 0,
//                               }
//                             : undefined,
//                         }
//                       : undefined,
//                   }
//                 : undefined,
//             }
//           : undefined,
//       }
//     : null

//   return (
//     <>
//       <div className="container my-12 lg:my-24 grid gap-12">
//         <div>
//           <div className="pb-6 grid gap-6 mb-6 border-b border-gray-100">
//             <div className="max-w-3xl flex flex-col gap-6">
//               <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
//                 {title}
//               </h2>
//             </div>
//             <div className="max-w-3xl flex gap-4 items-center">
//               {authorForAvatar && <Avatar person={authorForAvatar} date={post.date ?? null} />}
//             </div>
//           </div>

//           <article className="gap-6 grid max-w-4xl">
//             {post.coverImage && <CoverImage image={{...post.coverImage, alt: imageAlt}} priority />}
//             {content?.length > 0 && <CustomPortableText value={content} />}
//           </article>
//         </div>
//       </div>

//       <div className="border-t border-gray-100 bg-gray-50">
//         <div className="container py-12 lg:py-24 grid gap-12">
//           <aside>
//             <Suspense>{await MorePosts({skip: post._id, limit: 2})}</Suspense>
//           </aside>
//         </div>
//       </div>
//     </>
//   )
// }

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
        <article className="container my-12 lg:my-24 grid gap-12">
          <header>
            <div className="pb-6 grid gap-6 mb-6 border-b border-gray-100">
              <div className="max-w-3xl flex flex-col gap-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                  {title}
                </h1>
                {excerpt && <p className="text-xl text-gray-600 leading-relaxed">{excerpt}</p>}
              </div>
              <div className="max-w-3xl flex gap-4 items-center">
                {authorForAvatar && <Avatar person={authorForAvatar} date={post.date ?? null} />}
              </div>
            </div>
          </header>

          <div className="gap-6 grid max-w-4xl">
            {post.coverImage && <CoverImage image={{...post.coverImage, alt: imageAlt}} priority />}
            {content?.length > 0 && (
              <div className="prose prose-lg max-w-none">
                <CustomPortableText value={content} />
              </div>
            )}
          </div>
        </article>

        <aside className="border-t border-gray-100 bg-gray-50" aria-label="Related posts">
          <div className="container py-12 lg:py-24 grid gap-12 mx-4">
            <Suspense fallback={<div className="animate-pulse h-64 bg-gray-200 rounded" />}>
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
