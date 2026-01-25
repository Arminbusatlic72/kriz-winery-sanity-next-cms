import WineryLayout from '@/app/layouts/WineryLayout'
import {sanityFetch} from '@/sanity/lib/live'
import {productsQuery} from '@/sanity/lib/queries'
import Link from 'next/link'
import ProductImage from '@/app/components/ProductImage'

import {getTranslations} from 'next-intl/server'
export default async function VineyardsPage({params}: {params: Promise<{locale: string}>}) {
  // Fetch products from Sanity
  const {locale} = await params
  const t = await getTranslations('Winery')
  const {data: products} = await sanityFetch({
    query: productsQuery,
  })

  return (
    <section>
      <WineryLayout
        title={t('title')}
        headerImage="/static/images/winery/Vinarija-Kriz-272.jpg"
        sectionImage="/static/images/winery/Vinarija-Kriz-51.jpg"
        sectionImage1="/static/images/winery/Vinarija-Kriz-215.jpg"
        description={t('description')}
        text1={t('section1.text')}
        text2={t('section2.text')}
        title2={t('title2')}
        text21={t('section21.text')}
        text22={t('section22.text')}
        text23={t('section23.text')}
        headerCellarImage="/static/images/cellar/cellar-header.jpg"
      />
      <div className="space-y-2 pt-6 pb-8 md:space-y-5 mt-5">
        <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
          {t('productsTitle')}
        </h2>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.length > 0 ? (
          products.map((product: any) => (
            <Link
              href={`/${locale}/products/${product.slug[locale]}`}
              key={product._id}
              className="border rounded-lg shadow-md"
            >
              <ProductImage image={product.productImage} priority className="w-full" />
              <h3 className="text-xl font-semibold px-4 mt-4">{product.title[locale]}</h3>
              {product.description && product.description[locale] && (
                <p className="text-gray-700 dark:text-gray-300 px-4 pb-4">
                  {product.description[locale]}
                </p>
              )}
            </Link>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </section>
    </section>
  )
}
