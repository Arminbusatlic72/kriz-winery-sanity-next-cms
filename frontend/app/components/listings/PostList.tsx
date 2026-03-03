import LoadMorePosts from '@/app/components/listings/LoadMorePosts'
import {getInitialPostsPage} from '@/app/lib/listing-data'
import type {Locale} from '@/app/lib/listing-types'

type PostListProps = {
  locale: Locale
  pathPrefix: 'posts' | 'postovi'
}

export default async function PostList({locale, pathPrefix}: PostListProps) {
  const initialPage = await getInitialPostsPage(locale)

  if (initialPage.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border-t border-gray-100 py-24 dark:border-neutral-800">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 dark:text-neutral-400">
          No archives found
        </p>
      </div>
    )
  }

  return (
    <LoadMorePosts
      initialItems={initialPage.items}
      initialHasMore={initialPage.hasMore}
      initialNextOffset={initialPage.nextOffset}
      locale={locale}
      pathPrefix={pathPrefix}
    />
  )
}
