import {sanityFetch} from '@/sanity/lib/live'
import {postsQuery, categoriesQuery} from '@/sanity/lib/queries'
import {getTranslations} from 'next-intl/server'
import blogImage from '@/public/static/images/blog/blogImg.jpg'
import Link from 'next/link'
import BlogLayout from '@/app/layouts/BlogLayout'
import ProductImage from '@/app/components/ProductImage'
import {Popover, PopoverButton, PopoverPanel, Button} from '@headlessui/react'

type Props = {
  params: {locale: string}
}

export default async function BlogPage({params}: Props) {
  const {locale} = params
  const t = await getTranslations('Posts')

  // Fetch posts and categories concurrently
  const [{data: posts}, {data: categories}] = await Promise.all([
    sanityFetch({query: postsQuery}),
    sanityFetch({query: categoriesQuery}),
  ])
  console.log(posts)
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
                className="text-2xl uppercase font-bold  text-gray-900 dark:text-white"
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
                    {categories.map((category: any) => (
                      <li key={category._id}>
                        <Link
                          href={`/${locale}/posts/category/${category.slug[locale]}`}
                          className="block rounded-lg px-4 py-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
                          role="menuitem"
                          aria-label={`Browse ${category.title[locale]} category`}
                        >
                          <span className="text-gray-700 dark:text-white/70 dark:hover:text-white font-medium">
                            {category.title[locale]}
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
          <h1 id="posts-heading" className="sr-only">
            Blog Posts
          </h1>

          {posts?.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Blog posts grid">
              {posts.map((post: any) => (
                <article
                  key={post._id}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition bg-white dark:bg-gray-900"
                >
                  <Link
                    href={`/${locale}/posts/${post.slug[locale]}`}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
                    aria-label={`Read article: ${post.title[locale]}`}
                  >
                    {post.coverImage && (
                      <figure className="mb-4">
                        <ProductImage
                          image={post.coverImage}
                          priority
                          alt={post.title[locale] || 'Blog post cover image'}
                        />
                      </figure>
                    )}

                    <header>
                      {post.category?.title && (
                        <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3  text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                          {post.category.title[locale]}
                        </Button>
                      )}
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {post.title[locale]}
                      </h2>
                    </header>

                    {post.excerpt && (
                      <div className="mt-2">
                        <p className="text-gray-700 dark:text-gray-400 line-clamp-3">
                          {post.excerpt[locale]}
                        </p>
                      </div>
                    )}
                  </Link>
                </article>
              ))}
            </section>
          ) : (
            <section
              className="flex items-center justify-center py-12"
              role="status"
              aria-live="polite"
            >
              <p className="text-gray-600 dark:text-gray-400 text-center">
                No posts available at the moment.
              </p>
            </section>
          )}
        </main>
      </div>
    </BlogLayout>
  )
}
