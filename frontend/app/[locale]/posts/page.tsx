import {sanityFetch} from '@/sanity/lib/live'
import {postsQuery, categoriesQuery} from '@/sanity/lib/queries'
import {getTranslations} from 'next-intl/server'
import blogImage from '@/public/static/images/blog/blogImg.jpg'
import Link from 'next/link'
import BlogLayout from '@/app/layouts/BlogLayout'
import ProductImage from '@/app/components/ProductImage'
import {Popover, PopoverButton, PopoverPanel, Button} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
type Props = {
  params: Promise<{locale: string}>
}

export default async function BlogPage({params}: Props) {
  const {locale} = await params
  const t = await getTranslations('Posts')

  // Fetch posts and categories concurrently
  const [{data: posts}, {data: categories}] = await Promise.all([
    sanityFetch({query: postsQuery}),
    sanityFetch({query: categoriesQuery}),
  ])

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
              <ChevronDownIcon className="h-4 w-4 text-gray-400 transition-transform duration-300 group-data-[open]:rotate-180" />
            </PopoverButton>

            <PopoverPanel
              static
              className="mt-6 flex flex-col space-y-3 lg:block lg:opacity-100"
            >
              <nav className="flex flex-col space-y-4">
                {categories?.map((category: any) => (
                  <Link
                    key={category._id}
                    href={`/${locale}/posts/category/${category.slug[locale]}`}
                    className="group flex items-center text-[11px] uppercase tracking-widest text-gray-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  >
                    <span className="mr-2 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-4 dark:bg-white" />
                    {category.title[locale]}
                  </Link>
                ))}
              </nav>
            </PopoverPanel>
          </div>
        </Popover>
      </aside>

      {/* Main Grid */}
      <main className="col-span-3">
        {posts?.length > 0 ? (
          <section className="grid grid-cols-1 gap-x-4 gap-y-20 md:grid-cols-2">
            {posts.map((post: any) => (
              <article key={post._id} className="group relative">
                <Link href={`/${locale}/posts/${post.slug[locale]}`} className="block">
                  
                  {/* Image: Editorial Ratio */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-50 dark:bg-neutral-900">
                    <ProductImage
                      image={post.coverImage}
                      priority
                      className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>

                  <div className="mt-8">
                    {/* The Divider Line */}
                    <div className="h-[1px] w-full bg-gray-100 transition-colors duration-500 group-hover:bg-black dark:bg-neutral-800 dark:group-hover:bg-neutral-500" />

                    <header className="mt-6 flex flex-col space-y-3">
                      <div className="flex items-center space-x-3">
                        {post.category?.title && (
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                            {post.category.title[locale]}
                          </span>
                        )}
                        <span className="h-[1px] w-4 bg-gray-200" />
                        <span className="text-[10px] uppercase tracking-[0.15em] text-gray-300">
                           {/* Add date here if you have it */}
                           {new Date().getFullYear()} 
                        </span>
                      </div>

                      <h2 className="text-lg font-light leading-snug tracking-tight text-gray-900 dark:text-neutral-100">
                        {post.title[locale]}
                      </h2>
                    </header>

                    
                    {/* Subtle "Open" indicator */}
                    <div className="mt-6 flex items-center group/arrow">
  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-950 dark:text-white">
    Read Article
  </span>
  
  {/* Minimalist Sliding Arrow */}
  <div className="ml-3 transition-transform duration-300 ease-out group-hover/arrow:translate-x-2">
    <svg 
      width="18" 
      height="8" 
      viewBox="0 0 18 8" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-gray-950 dark:stroke-white"
    >
      <path 
        d="M14 1L17 4L14 7M0 4H17" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  </div>
</div>
                  </div>
                </Link>
              </article>
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center border-t border-gray-100 py-24 dark:border-neutral-800">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">No archives found</p>
          </div>
        )}
      </main>
    </div>
    </BlogLayout>
  )
}
