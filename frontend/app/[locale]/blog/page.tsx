import type {Metadata} from 'next'
import {Suspense} from 'react'
import {getTranslations} from 'next-intl/server'
import blogImage from '@/public/static/images/blog/blog.jpg'
import Link from 'next/link'
import BlogLayout from '@/app/layouts/BlogLayout'
import {Popover, PopoverButton, PopoverPanel} from '@headlessui/react'
import {getLocalizedCategories} from '@/app/lib/listing-data'
import PostList from '@/app/components/listings/PostList'

type Props = {
  params: Promise<{locale: string}>
}

export const revalidate = 60

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations('Blog')

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'hr' ? '/hr/postovi' : '/en/blog',
      languages: {
        en: '/en/blog',
        hr: '/hr/postovi',
      },
    },
  }
}

export default async function BlogPage({params}: Props) {
  const {locale} = await params
  const t = await getTranslations('Blog')
  const categories = await getLocalizedCategories(locale)

  return (
    <BlogLayout
      content={{
        title: t('title'),
        description: t('description'),
        image: blogImage,
        imageAlt: 'Vineyard view with mountains in the background',
      }}
    >
      <div className="container my-12 lg:my-24 grid grid-cols-1 lg:grid-cols-4 md:gap-6 p">
        {/* Left Sidebar: Categories */}
        <Popover className="relative w-full mb-2">
          <aside
            className="col-span-1 border border-gray-200 dark:border-white/10 p-4 shadow-lg bg-white dark:bg-gray-900"
            aria-labelledby="categories-heading"
          >
            {/* Popover Button */}
            <PopoverButton
              className="w-full text-left focus:outline-none cursor-pointer"
              aria-expanded="false"
              aria-controls="categories-list"
            >
              <span
                id="categories-heading"
                className="text-2xl font-bold  text-gray-900 dark:text-white"
              >
                {t('categories')}
              </span>
            </PopoverButton>

            {/* Categories Navigation */}
            <nav aria-labelledby="categories-heading ">
              <PopoverPanel
                id="categories-list"
                transition
                className="mt-4 p-2 divide-y divide-gray-200 dark:divide-white/10 rounded-lg bg-gray-50 dark:bg-gray-800/80 text-sm transition-transform duration-200 ease-in-out data-closed:-translate-y-1 data-closed:opacity-0"
                role="menu"
                aria-orientation="vertical"
              >
                {categories?.length > 0 ? (
                  <ul className="flex flex-col gap-0">
                    {categories.map((category) => (
                      <li key={category._id}>
                        <Link
                          href={
                            locale === 'hr'
                              ? `/${locale}/postovi/kategorija/${category.slug}`
                              : `/${locale}/posts/category/${category.slug}`
                          }
                          className="block rounded-lg px-4 py-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
                          role="menuitem"
                          aria-label={`Browse ${category.title} category`}
                        >
                          <span className="text-gray-700 dark:text-white/70 dark:hover:text-white font-medium">
                            {category.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-2 text-gray-500 dark:text-white/50 italic" role="status">
                    No categories available
                  </div>
                )}
              </PopoverPanel>
            </nav>
          </aside>
        </Popover>

        {/* Main Content: Blog Posts */}
        <main className="col-span-3" aria-labelledby="posts-heading">
          <h2 id="posts-heading" className="sr-only">
            Blog Posts
          </h2>

          <Suspense
            fallback={
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Blog posts loading">
                {Array.from({length: 4}).map((_, index) => (
                  <div key={index} className="h-72 animate-pulse rounded-md bg-gray-100 dark:bg-neutral-900" />
                ))}
              </section>
            }
          >
            <PostList
              locale={locale === 'hr' ? 'hr' : 'en'}
              pathPrefix={locale === 'hr' ? 'postovi' : 'posts'}
            />
          </Suspense>
        </main>
      </div>
    </BlogLayout>
  )
}
