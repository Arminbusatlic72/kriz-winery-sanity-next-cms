import {client} from '@/sanity/lib/client'
import {categoriesQuery, postsByCategoryQuery} from '@/sanity/lib/queries'
import Link from 'next/link'
import ProductImage from '@/app/components/ProductImage' // ✅ adjust path if needed

interface Props {
  params: {locale: 'en' | 'hr'; category: string}
}

export const revalidate = 60

export async function generateStaticParams() {
  const categories = await client.fetch(categoriesQuery)
  const locales: Array<'en' | 'hr'> = ['en', 'hr']

  return locales.flatMap((locale) =>
    categories.map((cat: any) => ({
      locale,
      category: cat.slug[locale],
    })),
  )
}

export async function generateMetadata({params}: Props) {
  const categories = await client.fetch(categoriesQuery)
  const category = categories.find((c: any) => c.slug[params.locale] === params.category)

  return {
    title: category ? `${category.title[params.locale]} | Blog` : 'Blog',
  }
}

export default async function CategoryPage({params}: Props) {
  const {locale, category} = params
  const posts = await client.fetch(postsByCategoryQuery, {locale, category})
  const categories = await client.fetch(categoriesQuery)
  const activeCategory = categories.find((c: any) => c.slug[locale] === category)

  return (
    <main className="mx-auto max-w-5xl py-8 px-4">
      <Link href={`/${locale}/posts`} className="text-sm underline">
        ← {locale === 'en' ? 'All posts' : 'Svi članci'}
      </Link>

      <h1 className="mt-4 text-3xl font-bold">
        {activeCategory ? activeCategory.title[locale] : category}
      </h1>

      {posts?.length > 0 ? (
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          aria-label="Blog posts grid"
        >
          {posts.map((post: any) => (
            <article
              key={post._id}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition bg-white dark:bg-gray-900"
            >
              <Link
                href={`/${locale}/posts/${post.slug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
                aria-label={`Read article: ${post.title}`}
              >
                {post.coverImage && (
                  <figure className="mb-4">
                    <ProductImage
                      image={post.coverImage}
                      priority
                      alt={post.title || 'Blog post cover image'}
                    />
                  </figure>
                )}

                <header>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {post.title}
                  </h2>
                </header>

                {post.excerpt && (
                  <div className="mt-2">
                    <p className="text-gray-700 dark:text-gray-400 line-clamp-3">{post.excerpt}</p>
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
            {locale === 'en'
              ? 'No posts available at the moment.'
              : 'Nema članaka u ovoj kategoriji.'}
          </p>
        </section>
      )}
    </main>
  )
}
