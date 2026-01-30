

import {client} from '@/sanity/lib/client'
import {categoriesQuery, postsByCategoryQuery} from '@/sanity/lib/queries'

import Link from 'next/link'
import ProductImage from '@/app/components/ProductImage'
import {LocalizedField} from '@/sanity/lib/utils'
import CoverImage from '@/app/components/CoverImage'

/** Types */
type Params = Promise<{locale: 'en' | 'hr'; category: string}>

interface Props {
  params: Params
}

interface Category {
  _id: string
  slug: {en: string; hr: string}
  title: {en: string; hr: string}
}

interface Post {
  _id: string
  slug: string | string[]
  title: string | string[] // 👈 allow string[]
  excerpt?: string | string[] | null // 👈 allow string[] | null
  coverImage?: any
}

/** ISR */
export const revalidate = 60

/** Static params */
export async function generateStaticParams() {
  const categories: Category[] = await client.fetch(categoriesQuery)
  const locales: Array<'en' | 'hr'> = ['en', 'hr']

  return locales.flatMap((locale) =>
    categories.map((cat) => ({
      locale,
      category: cat.slug[locale],
    })),
  )
}

/** Metadata */
export async function generateMetadata({params}: Props) {
  const {locale, category} = await params // ✅ must await here
  const categories: Category[] = await client.fetch(categoriesQuery)
  const activeCategory = categories.find((c) => c.slug[locale] === category)

  return {
    title: activeCategory ? `${activeCategory.title[locale]} | Blog` : 'Blog',
  }
}

/** Page */
export default async function CategoryPage({params}: Props) {
  const {locale, category} = await params
  const posts: Post[] = await client.fetch(postsByCategoryQuery, {locale, category})
  const categories: Category[] = await client.fetch(categoriesQuery)
  const activeCategory = categories.find((c) => c.slug[locale] === category)

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Back Navigation - Sophisticated & Small */}
      <Link 
        href={`/${locale}/postovi`} 
        className="group inline-flex items-center text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors"
      >
        <span className="mr-3 h-[1px] w-6 bg-gray-200 group-hover:bg-black dark:bg-neutral-800 dark:group-hover:bg-white transition-all" />
        {locale === 'en' ? 'Back to Journal' : 'Povratak na Journal'}
      </Link>

      {/* Category Header */}
      <header className="mt-12 mb-20 max-w-4xl">
        <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold block mb-4">
          {locale === 'en' ? 'Browsing Category' : 'Kategorija'}
        </span>
        <h1 className="font-strangelove text-6xl sm:text-7xl md:text-8xl text-gray-950 dark:text-white leading-[0.85] tracking-tighter">
          {activeCategory ? activeCategory.title[locale] : category}
        </h1>
        <div className="mt-8 h-[1px] w-24 bg-black dark:bg-white" />
      </header>

      {posts?.length > 0 ? (
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20"
          aria-label="Blog posts grid"
        >
          {posts.map((post) => (
            <article key={post._id} className="group cursor-pointer">
              <Link href={`/${locale}/postovi/${post.slug}`}>
                {/* Image: Use your fixed CoverImage with the taller aspect ratio */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-50 dark:bg-neutral-900">
                  <CoverImage
                    image={post.coverImage}
                    priority
                    className="transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                </div>

                <div className="mt-8">
                  {/* The Signature Divider */}
                  <div className="h-[1px] w-full bg-neutral-100 dark:bg-neutral-800 transition-colors duration-500 group-hover:bg-black dark:group-hover:bg-white" />
                  
                  <div className="mt-6 space-y-3">
                    <h2 className="text-xl font-light tracking-tight text-gray-900 dark:text-neutral-100">
                      {post.title}
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-sm leading-relaxed text-gray-500 dark:text-neutral-400 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Minimalist Link Trigger */}
                    <div className="pt-4 flex items-center space-x-2">
                       <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Read Entry</span>
                       <span className="h-[1px] w-4 bg-black dark:bg-white transition-all duration-300 group-hover:w-8" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className="py-24 border-t border-neutral-100 dark:border-neutral-900 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 italic">
            {locale === 'en'
              ? 'No entries found in this collection.'
              : 'Nema zapisa u ovoj kolekciji.'}
          </p>
        </section>
      )}
    </main>
  )
}