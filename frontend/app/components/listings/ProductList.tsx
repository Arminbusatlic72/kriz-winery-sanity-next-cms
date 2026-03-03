import LoadMoreProducts from '@/app/components/listings/LoadMoreProducts'
import {getInitialProductsPage} from '@/app/lib/listing-data'
import type {Locale} from '@/app/lib/listing-types'

type ProductListProps = {
  locale: Locale
  pathPrefix: 'products' | 'proizvodi'
}

export default async function ProductList({locale, pathPrefix}: ProductListProps) {
  const initialPage = await getInitialProductsPage(locale)

  if (initialPage.items.length === 0) {
    return (
      <div className="col-span-full border-t border-gray-100 pt-10 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-400">Inventory Empty</p>
      </div>
    )
  }

  return (
    <LoadMoreProducts
      initialItems={initialPage.items}
      initialHasMore={initialPage.hasMore}
      initialNextOffset={initialPage.nextOffset}
      locale={locale}
      pathPrefix={pathPrefix}
    />
  )
}
