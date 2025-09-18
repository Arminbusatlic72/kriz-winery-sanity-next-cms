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
//     title: getLocalizedValue(post.title, locale) || '',
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
//               {post.author && post.author.firstName && post.author.lastName && (
//                 <Avatar person={post.author} date={post.date ?? undefined} />
//               )}
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

import Avatar from '@/app/components/Avatar'
import CoverImage from '@/app/components/CoverImage'
import {MorePosts} from '@/app/components/Posts'
import CustomPortableText from '@/app/components/PortableText'
import {sanityFetch} from '@/sanity/lib/live'
import {postPagesSlugs, postQuery} from '@/sanity/lib/queries'
import {
  resolveOpenGraphImage,
  getLocalizedBlockContent,
  getLocalizedValue,
} from '@/sanity/lib/utils'

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

/** Generate static params for Next.js App Router */
export async function generateStaticParams({params}: Props) {
  const {data} = await sanityFetch({query: postPagesSlugs, perspective: 'published', stega: false})
  return data
}

/** Generate SEO metadata */
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const {slug, locale} = await props.params
  const {data: post} = await sanityFetch({query: postQuery, params: {slug}, stega: false})
  if (!post?._id) return {}

  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(post?.coverImage)

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{name: `${post.author.firstName} ${post.author.lastName}`}]
        : [],
    title: getLocalizedValue(post.title, locale),
    description: getLocalizedValue(post.excerpt, locale) || '',
    openGraph: {images: ogImage ? [ogImage, ...previousImages] : previousImages},
  }
}

/** Post Page Component */
export default async function PostPage({params}: Props) {
  const {slug, locale} = await params
  const {data: post} = await sanityFetch({query: postQuery, params: {slug}})

  if (!post?._id) return notFound()

  const title = getLocalizedValue(post.title, locale)
  const excerpt = getLocalizedValue(post.excerpt, locale)
  const content = getLocalizedBlockContent(post.content, locale)
  const imageAlt = getLocalizedValue(post.coverImage?.alt, locale)

  // Author data
  const authorFirstName = getLocalizedValue(post.author?.firstName, locale)
  const authorLastName = getLocalizedValue(post.author?.lastName, locale)
  const authorPicture = post.author?.picture // picture is usually just an image object, no localization
  const authorAlt = getLocalizedValue(post.author?.picture?.alt, locale)

  function normalizePicture(picture: any) {
    if (!picture) return undefined

    const asset: SanityAsset = picture.asset
      ? {
          _id: picture.asset._id,
          url: picture.asset.url,
          metadata: picture.asset.metadata ?? undefined, // normalize null to undefined
        }
      : undefined

    return {
      alt: picture.alt ?? undefined,
      asset,
    }
  }
  // Inside your PostPage or where you render Avatar
  // Normalize author data for Avatar
  const authorForAvatar = post.author
    ? {
        firstName: post.author.firstName,
        lastName: post.author.lastName,
        picture: post.author.picture
          ? {
              alt: post.author.picture.alt ?? null,
              asset: post.author.picture.asset
                ? {
                    _id: post.author.picture.asset._id,
                    url: post.author.picture.asset.url ?? null, // <-- convert undefined to null
                    metadata: post.author.picture.asset.metadata
                      ? {
                          lqip: post.author.picture.asset.metadata.lqip ?? null,
                          dimensions: post.author.picture.asset.metadata.dimensions
                            ? {
                                width: post.author.picture.asset.metadata.dimensions.width ?? 0,
                                height: post.author.picture.asset.metadata.dimensions.height ?? 0,
                              }
                            : undefined,
                        }
                      : undefined,
                  }
                : undefined,
            }
          : undefined,
      }
    : null

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
              {authorForAvatar && <Avatar person={authorForAvatar} date={post.date ?? null} />}
            </div>
          </div>

          <article className="gap-6 grid max-w-4xl">
            {post.coverImage && <CoverImage image={{...post.coverImage, alt: imageAlt}} priority />}
            {content?.length > 0 && <CustomPortableText value={content} />}
          </article>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container py-12 lg:py-24 grid gap-12">
          <aside>
            <Suspense>{await MorePosts({skip: post._id, limit: 2})}</Suspense>
          </aside>
        </div>
      </div>
    </>
  )
}
