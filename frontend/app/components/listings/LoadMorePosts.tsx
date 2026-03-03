'use client'

import {useCallback, useEffect, useRef, useState} from 'react'
import PostCard from '@/app/components/listings/PostCard'
import type {Locale, PostListItem} from '@/app/lib/listing-types'

type LoadMoreResponse = {
  items: PostListItem[]
  hasMore: boolean
  nextOffset: number
}

type LoadMorePostsProps = {
  initialItems: PostListItem[]
  initialHasMore: boolean
  initialNextOffset: number
  locale: Locale
  pathPrefix: 'posts' | 'postovi'
}

export default function LoadMorePosts({
  initialItems,
  initialHasMore,
  initialNextOffset,
  locale,
  pathPrefix,
}: LoadMorePostsProps) {
  const [items, setItems] = useState<PostListItem[]>(initialItems)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [nextOffset, setNextOffset] = useState(initialNextOffset)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const inFlightRef = useRef(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const loadMore = useCallback(async () => {
    if (!hasMore || inFlightRef.current) return

    inFlightRef.current = true
    setIsLoading(true)
    setError(null)

    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const response = await fetch(`/api/posts?locale=${locale}&offset=${nextOffset}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const payload = (await response.json()) as LoadMoreResponse

      setItems((currentItems) => {
        const knownIds = new Set(currentItems.map((item) => item._id))
        const nextItems = payload.items.filter((item) => !knownIds.has(item._id))
        return [...currentItems, ...nextItems]
      })
      setHasMore(payload.hasMore)
      setNextOffset(payload.nextOffset)
    } catch (unknownError) {
      if (unknownError instanceof DOMException && unknownError.name === 'AbortError') {
        return
      }

      setError('Could not load more posts. Please try again.')
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null
      }
      inFlightRef.current = false
      setIsLoading(false)
    }
  }, [hasMore, locale, nextOffset])

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!error && entries.some((entry) => entry.isIntersecting)) {
          void loadMore()
        }
      },
      {
        rootMargin: '300px 0px',
      },
    )

    observer.observe(sentinelRef.current)

    return () => {
      observer.disconnect()
    }
  }, [error, hasMore, loadMore])

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  return (
    <>
      <section className="grid grid-cols-1 gap-x-4 gap-y-20 md:grid-cols-2">
        {items.map((item, index) => (
          <PostCard
            key={item._id}
            item={item}
            locale={locale}
            index={index}
            pathPrefix={pathPrefix}
          />
        ))}
      </section>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => void loadMore()}
            disabled={isLoading}
            className="rounded-md border border-gray-300 px-5 py-2 text-xs uppercase tracking-[0.2em] text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-900"
          >
            {isLoading ? 'Loading...' : error ? 'Retry' : 'Load More'}
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />
    </>
  )
}
