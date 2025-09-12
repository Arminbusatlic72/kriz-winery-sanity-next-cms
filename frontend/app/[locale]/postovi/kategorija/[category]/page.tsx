import {client} from '@/sanity/lib/client'
import {categoriesQuery, postsByCategoryQuery} from '@/sanity/lib/queries'
import Link from 'next/link'

interface Props {
  params: {locale: 'en' | 'hr'; category: string}
}

export const revalidate = 60 // ISR (1 min) — adjust as needed

// Generate static params for all locale+category combinations
export async function generateStaticParams() {
  const categories = await client.fetch(categoriesQuery)
  const locales: Array<'en' | 'hr'> = ['en', 'hr']

  return locales.flatMap((locale) =>
    categories.map((cat: any) => ({
      locale,
      category: cat.slug[locale], // 👈 pick localized slug
    })),
  )
}

// Optional: add SEO metadata
export async function generateMetadata({params}: Props) {
  const categories = await client.fetch(categoriesQuery)
  const category = categories.find((c: any) => c.slug[params.locale] === params.category)

  return {
    title: category ? `${category.title[params.locale]} | Blog` : 'Blog',
  }
}

export default async function CategoryPage({params}: Props) {
  const {locale, category} = params
  console.log(params)
  const posts = await client.fetch(postsByCategoryQuery, {
    locale,
    category, // this is already the localized slug (en/hr)
  })

  const categories = await client.fetch(categoriesQuery)
  const activeCategory = categories.find((c: any) => c.slug[locale] === category)

  return (
    <main className="mx-auto max-w-3xl py-8">
      <Link href={`/${locale}/posts`} className="text-sm underline">
        ← {locale === 'en' ? 'All posts' : 'Svi članci'}
      </Link>

      <h1 className="mt-4 text-2xl font-bold">
        {activeCategory ? activeCategory.title[locale] : category}
      </h1>

      {posts?.length ? (
        <ul className="mt-6 space-y-4">
          {posts.map((p: any) => (
            <li key={p._id} className="p-4 border rounded-lg">
              <Link
                href={`/${locale}/posts/${p.slug}`}
                className="text-lg font-semibold hover:underline"
              >
                {p.title}
              </Link>
              {p.excerpt && <p className="text-sm mt-1">{p.excerpt}</p>}
              {p.publishedAt && (
                <div className="text-xs mt-2 text-gray-500">
                  {new Date(p.publishedAt).toLocaleDateString(locale)}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-gray-600">
          {locale === 'en' ? 'No posts in this category.' : 'Nema članaka u ovoj kategoriji.'}
        </p>
      )}
    </main>
  )
}
