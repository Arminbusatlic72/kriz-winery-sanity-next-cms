import 'server-only'

import {cache} from 'react'
import {client} from '@/sanity/lib/client'
import {
  paginatedPostsQuery,
  paginatedProductsQuery,
  localizedCategoriesQuery,
} from '@/sanity/lib/queries'
import type {Locale, PostListItem, ProductListItem, CategoryListItem} from '@/app/lib/listing-types'

export const LIST_PAGE_SIZE = 8
export const LIST_REVALIDATE_SECONDS = 120

function normalizeLocale(input: string): Locale {
  return input === 'hr' ? 'hr' : 'en'
}

async function getPostsPageInternal({
  locale,
  offset,
  limit = LIST_PAGE_SIZE,
}: {
  locale: string
  offset: number
  limit?: number
}) {
  const safeLocale = normalizeLocale(locale)
  const safeOffset = Math.max(0, offset)
  const safeLimit = Math.min(Math.max(1, limit), 24)

  const rows = await client.fetch<PostListItem[]>(
    paginatedPostsQuery,
    {
      locale: safeLocale,
      offset: safeOffset,
      end: safeOffset + safeLimit + 1,
    },
    {
      next: {
        revalidate: LIST_REVALIDATE_SECONDS,
        tags: ['posts-list', `posts-list-${safeLocale}`],
      },
    },
  )

  const items = rows.slice(0, safeLimit)

  return {
    items,
    hasMore: rows.length > safeLimit,
    nextOffset: safeOffset + items.length,
  }
}

async function getProductsPageInternal({
  locale,
  offset,
  limit = LIST_PAGE_SIZE,
}: {
  locale: string
  offset: number
  limit?: number
}) {
  const safeLocale = normalizeLocale(locale)
  const safeOffset = Math.max(0, offset)
  const safeLimit = Math.min(Math.max(1, limit), 24)

  const rows = await client.fetch<ProductListItem[]>(
    paginatedProductsQuery,
    {
      locale: safeLocale,
      offset: safeOffset,
      end: safeOffset + safeLimit + 1,
    },
    {
      next: {
        revalidate: LIST_REVALIDATE_SECONDS,
        tags: ['products-list', `products-list-${safeLocale}`],
      },
    },
  )

  const items = rows.slice(0, safeLimit)

  return {
    items,
    hasMore: rows.length > safeLimit,
    nextOffset: safeOffset + items.length,
  }
}

export const getInitialPostsPage = cache(async (locale: string) =>
  getPostsPageInternal({
    locale,
    offset: 0,
  }),
)

export const getInitialProductsPage = cache(async (locale: string) =>
  getProductsPageInternal({
    locale,
    offset: 0,
  }),
)

export async function getPostsPage(locale: string, offset: number, limit?: number) {
  return getPostsPageInternal({locale, offset, limit})
}

export async function getProductsPage(locale: string, offset: number, limit?: number) {
  return getProductsPageInternal({locale, offset, limit})
}

export const getLocalizedCategories = cache(async (locale: string) => {
  const safeLocale = normalizeLocale(locale)

  return client.fetch<CategoryListItem[]>(
    localizedCategoriesQuery,
    {locale: safeLocale},
    {
      next: {
        revalidate: LIST_REVALIDATE_SECONDS,
        tags: ['posts-categories', `posts-categories-${safeLocale}`],
      },
    },
  )
})
