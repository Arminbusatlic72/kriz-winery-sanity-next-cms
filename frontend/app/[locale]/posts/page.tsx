import {Suspense} from 'react'
import {getTranslations} from 'next-intl/server'
import blogImage from '@/public/static/images/blog/blog.jpg'
import Link from 'next/link'
import BlogLayout from '@/app/layouts/BlogLayout'
import {Popover, PopoverButton, PopoverPanel} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {getLocalizedCategories} from '@/app/lib/listing-data'
import PostList from '@/app/components/listings/PostList'
type Props = {
  params: Promise<{locale: string}>
}

export const revalidate = 120

export default async function BlogPage({params}: Props) {
  const {locale} = await params
  const t = await getTranslations('Posts')
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
     <div className="container mx-auto  my-12 lg:my-24 grid grid-cols-1 lg:grid-cols-4 gap-x-12 gap-y-16">
      
      {/* Sidebar: Clean & Floating */}
      <aside className="col-span-1">
        <Popover className="relative lg:sticky lg:top-24">
          <div className="group">
            <PopoverButton className="flex w-full items-center justify-between border-b border-gray-100 pb-4 outline-none dark:border-neutral-800">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-950 dark:text-white">
                {t('categories')}
              </span>
              <ChevronDownIcon className="h-4 w-4 text-gray-600 dark:text-neutral-400 transition-transform duration-300 group-data-[open]:rotate-180" />
            </PopoverButton>

            <PopoverPanel
              static
              className="mt-6 flex flex-col space-y-3 lg:block lg:opacity-100"
            >
              <nav className="flex flex-col space-y-4">
                {categories?.map((category) => (
                  <Link
                    key={category._id}
                    href={`/${locale}/posts/category/${category.slug}`}
                    className="group flex items-center text-[11px] uppercase tracking-widest text-gray-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  >
                    <span className="mr-2 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-4 dark:bg-white" />
                    {category.title}
                  </Link>
                ))}
              </nav>
            </PopoverPanel>
          </div>
        </Popover>
      </aside>

      {/* Main Grid */}
      <main className="col-span-3">
        <Suspense
          fallback={
            <section className="grid grid-cols-1 gap-x-4 gap-y-20 md:grid-cols-2">
              {Array.from({length: 4}).map((_, index) => (
                <div key={index} className="h-72 animate-pulse rounded-md bg-gray-100 dark:bg-neutral-900" />
              ))}
            </section>
          }
        >
          <PostList locale={locale === 'hr' ? 'hr' : 'en'} pathPrefix="posts" />
        </Suspense>
      </main>
    </div>
    </BlogLayout>
  )
}
