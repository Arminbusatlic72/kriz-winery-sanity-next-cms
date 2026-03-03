import Link from 'next/link'
import ProductImage from '@/app/components/ProductImage'
import type {Locale, PostListItem} from '@/app/lib/listing-types'

type PostCardProps = {
  item: PostListItem
  locale: Locale
  index: number
  pathPrefix: 'posts' | 'postovi'
}

export default function PostCard({item, locale, index, pathPrefix}: PostCardProps) {
  return (
    <article className="group relative">
      <Link href={`/${locale}/${pathPrefix}/${item.slug}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-50 dark:bg-neutral-900">
          <ProductImage
            image={item.coverImage}
            alt={item.title}
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={60}
            className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
          />
        </div>

        <div className="mt-8">
          <div className="h-[1px] w-full bg-gray-100 transition-colors duration-500 group-hover:bg-black dark:bg-neutral-800 dark:group-hover:bg-neutral-500" />

          <header className="mt-6 flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              {item.category?.title && (
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-600 dark:text-neutral-400">
                  {item.category.title}
                </span>
              )}
              <span className="h-[1px] w-4 bg-gray-200" />
              <time
                className="text-[10px] uppercase tracking-[0.15em] text-gray-600 dark:text-neutral-400"
                dateTime={item.date}
              >
                {new Date(item.date).getFullYear()}
              </time>
            </div>

            <h2 className="text-lg font-light leading-snug tracking-tight text-gray-900 dark:text-neutral-100">
              {item.title}
            </h2>
          </header>
        </div>
      </Link>
    </article>
  )
}
