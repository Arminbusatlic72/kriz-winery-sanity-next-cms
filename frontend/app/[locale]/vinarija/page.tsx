import WineryLayout from '@/app/layouts/WineryLayout'
import {sanityFetch} from '@/sanity/lib/live'
import {productsQuery} from '@/sanity/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import ProductImage from '@/app/components/ProductImage'
import CoverImage from '@/app/components/CoverImage'
import {urlForImage} from '@/sanity/lib/utils'
import {getTranslations} from 'next-intl/server'
export default async function VineyardsPage({params}: {params: {locale: string}}) {
  // Fetch products from Sanity
  const {locale} = params
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
        text1={t('section1.text')}
        text2={t('section2.text')}
      />
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.length > 0 ? (
          products.map((product: any) => (
            <Link
              href={`/${locale}/products/${product.slug[locale]}`}
              key={product._id}
              className="border rounded-lg p-4 shadow-md"
            >
              <CoverImage image={product.productImage} priority />
              <h3 className="text-xl font-semibold mt-4">{product.title[locale]}</h3>
              <p className="text-gray-700 dark:text-gray-300">{product.description[locale]}</p>
            </Link>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </section>
    </section>
  )
}
