// import Link from 'next/link'

// import {sanityFetch} from '@/sanity/lib/live'
// import {morePostsQuery, allPostsQuery} from '@/sanity/lib/queries'
// import {Post as PostType, AllPostsQueryResult} from '@/sanity.types'
// import DateComponent from '@/app/components/Date'
// import OnBoarding from '@/app/components/Onboarding'
// import Avatar from '@/app/components/Avatar'
// import {createDataAttribute} from 'next-sanity'

// const Post = ({post}: {post: AllPostsQueryResult[number]}) => {
//   const {_id, title, slug, excerpt, date, author} = post

//   const attr = createDataAttribute({
//     id: _id,
//     type: 'post',
//     path: 'title',
//   })
// const authorForAvatar = post.author
//   ? {
//       firstName: post.author.firstName,
//       lastName: post.author.lastName,
//       picture: post.author.picture
//         ? {
//             alt: post.author.picture.alt ?? null,
//             asset: post.author.picture.asset
//               ? {
//                   _id: post.author.picture.asset._id,
//                   url: post.author.picture.asset.url ?? null, // <-- convert undefined to null
//                   metadata: post.author.picture.asset.metadata
//                     ? {
//                         lqip: post.author.picture.asset.metadata.lqip ?? null,
//                         dimensions: post.author.picture.asset.metadata.dimensions
//                           ? {
//                               width: post.author.picture.asset.metadata.dimensions.width ?? 0,
//                               height: post.author.picture.asset.metadata.dimensions.height ?? 0,
//                             }
//                           : undefined,
//                       }
//                     : undefined,
//                 }
//               : undefined,
//           }
//         : undefined,
//     }
//   : null
//   return (
//     <article
//       data-sanity={attr()}
//       key={_id}
//       className="border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col justify-between transition-colors hover:bg-white relative"
//     >
//       <Link className="hover:text-brand underline transition-colors" href={`/posts/${slug}`}>
//         <span className="absolute inset-0 z-10" />
//       </Link>
//       <div>
//         <h3 className="text-2xl font-bold mb-4 leading-tight">{title}</h3>

//         <p className="line-clamp-3 text-sm leading-6 text-gray-600 max-w-[70ch]">{excerpt}</p>
//       </div>
//       <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
//         {author && author.firstName && author.lastName && (
//           <div className="flex items-center">
//             <Avatar person={author} small={true} />
//           </div>
//         )}
//         <time className="text-gray-500 text-xs font-mono" dateTime={date}>
//           <DateComponent dateString={date} />
//         </time>
//       </div>
//     </article>
//   )
// }

// const Posts = ({
//   children,
//   heading,
//   subHeading,
// }: {
//   children: React.ReactNode
//   heading?: string
//   subHeading?: string
// }) => (
//   <div>
//     {heading && (
//       <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
//         {heading}
//       </h2>
//     )}
//     {subHeading && <p className="mt-2 text-lg leading-8 text-gray-600">{subHeading}</p>}
//     <div className="pt-6 space-y-6">{children}</div>
//   </div>
// )

// export const MorePosts = async ({skip, limit}: {skip: string; limit: number}) => {
//   const {data} = await sanityFetch({
//     query: morePostsQuery,
//     params: {skip, limit},
//   })

//   if (!data || data.length === 0) {
//     return null
//   }

//   return (
//     <Posts heading={`Recent Posts (${data?.length})`}>
//       {data?.map((post: any) => (
//         <Post key={post._id} post={post} />
//       ))}
//     </Posts>
//   )
// }

// export const AllPosts = async () => {
//   const {data} = await sanityFetch({query: allPostsQuery})

//   if (!data || data.length === 0) {
//     return <OnBoarding />
//   }

//   return (
//     <Posts
//       heading="Recent Posts"
//       subHeading={`${data.length === 1 ? 'This blog post is' : `These ${data.length} blog posts are`} populated from your Sanity Studio.`}
//     >
//       {data.map((post: any) => (
//         <Post key={post._id} post={post} />
//       ))}
//     </Posts>
//   )
// }

import Link from 'next/link'

import {sanityFetch} from '@/sanity/lib/live'
import {morePostsQuery, allPostsQuery} from '@/sanity/lib/queries'
import {AllPostsQueryResult} from '@/sanity.types'
import DateComponent from '@/app/components/Date'
import OnBoarding from '@/app/components/Onboarding'
import Avatar from '@/app/components/Avatar'
import {createDataAttribute} from 'next-sanity'
type Locale = 'en' | 'hr'
const Post = ({post, locale}: {post: AllPostsQueryResult[number]; locale: Locale}) => {
  const {_id, title, slug, excerpt, date, author} = post

  const attr = createDataAttribute({
    id: _id,
    type: 'post',
    path: 'title',
  })
  const localizedTitle =
    title && typeof title === 'object'
      ? (title[locale] ?? title['en'] ?? 'Untitled')
      : typeof title === 'string'
        ? title
        : 'Untitled'
  const localizedSlug =
    slug && typeof slug === 'object'
      ? (slug?.[locale] ?? slug ?? 'untitled-slug')
      : typeof slug === 'string'
        ? slug
        : 'untitled-slug'

  const localizedExcerpt =
    excerpt && typeof excerpt === 'object' ? (excerpt[locale] ?? excerpt['en']) : (excerpt ?? '')

  // ✅ normalize author for Avatar
  const authorForAvatar = author
    ? {
        firstName: author.firstName ?? null,
        lastName: author.lastName ?? null,
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
    : null

  return (
    <article
      data-sanity={attr()}
      key={_id}
      className="border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col justify-between transition-colors hover:bg-white relative"
    >
      <Link
        className="hover:text-brand underline transition-colors"
        href={`/${locale}/posts/${localizedSlug}`}
      >
        <span className="absolute inset-0 z-10" />
      </Link>
      <div>
        <h3 className="text-2xl font-bold mb-4 leading-tight">{localizedTitle}</h3>
        {localizedExcerpt && (
          <p className="line-clamp-3 text-sm leading-6 text-gray-600 max-w-[70ch]">
            {localizedExcerpt}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        {authorForAvatar && authorForAvatar.firstName && authorForAvatar.lastName && (
          <div className="flex items-center">
            {/* ✅ now using normalized object */}
            <Avatar person={authorForAvatar} small />
          </div>
        )}
        <time className="text-gray-500 text-xs font-mono" dateTime={date}>
          <DateComponent dateString={date} />
        </time>
      </div>
    </article>
  )
}

const Posts = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode
  heading?: string
  subHeading?: string
}) => (
  <div>
    {heading && (
      <h3 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">{heading}</h3>
    )}
    {subHeading && <p className="mt-2 text-lg leading-8 text-gray-600">{subHeading}</p>}
    <div className="pt-6 space-y-6">{children}</div>
  </div>
)

export const MorePosts = async ({
  skip,
  limit,
  locale,
}: {
  skip: string
  limit: number
  locale: 'en' | 'hr'
}) => {
  const {data} = await sanityFetch({
    query: morePostsQuery,
    params: {skip, limit},
  })

  if (!data || data.length === 0) {
    return null
  }

  return (
    <Posts heading={`Recent Posts (${data?.length})`}>
      {data?.map((post: any) => (
        <Post key={post._id} post={post} locale={locale as 'en' | 'hr'} />
      ))}
    </Posts>
  )
}

export const AllPosts = async ({locale}: {locale: string}) => {
  const {data} = await sanityFetch({query: allPostsQuery})

  if (!data || data.length === 0) {
    return <OnBoarding />
  }

  return (
    <Posts
      heading="Recent Posts"
      subHeading={`${
        data.length === 1 ? 'This blog post is' : `These ${data.length} blog posts are`
      } populated from your Sanity Studio.`}
    >
      {data.map((post: any) => (
        <Post key={post._id} post={post} locale={locale as 'en' | 'hr'} />
      ))}
    </Posts>
  )
}
