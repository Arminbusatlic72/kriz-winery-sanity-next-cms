import Link from 'next/link'
import ProductImage from '@/app/components/ProductImage'
import type {Locale, ProductListItem} from '@/app/lib/listing-types'

type ProductCardProps = {
  item: ProductListItem
  locale: Locale
  index: number
  pathPrefix: 'products' | 'proizvodi'
}

export default function ProductCard({item, locale, index, pathPrefix}: ProductCardProps) {
  return (
    <Link
      href={`/${locale}/${pathPrefix}/${item.slug}`}
      className="group flex flex-col"
      prefetch={index < 4}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50 dark:bg-neutral-900">
        <ProductImage
          image={item.productImage}
          alt={item.title}
          priority={index < 2}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          quality={80}
        />
      </div>

      <div className="mt-6">
        <div className="h-[1px] w-full bg-gray-200 dark:bg-neutral-800 transition-all duration-500 group-hover:bg-black dark:group-hover:bg-white" />

        <div className="mt-4 flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-gray-950 dark:text-white">
            {item.title}
          </h3>

          <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 11L11 1M11 1H1M11 1V11"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
