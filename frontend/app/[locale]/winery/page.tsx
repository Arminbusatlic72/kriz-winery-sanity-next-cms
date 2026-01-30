export const revalidate = 60

import WineryLayout from '@/app/layouts/WineryLayout'
import {sanityFetch} from '@/sanity/lib/live'
import {productsQuery} from '@/sanity/lib/queries'
import Link from 'next/link'
import ProductImage from '@/app/components/ProductImage'
import {getTranslations} from 'next-intl/server'

// Define proper types
interface Product {
  _id: string
  slug: {
    [key: string]: string
  }
  productImage: any
  title: {
    [key: string]: string
  }
}

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function VineyardsPage({params}: PageProps) {
  // Await params as required in Next.js 15+
  const {locale} = await params
  
  // Fetch translations and data in parallel for better performance
  const [t, {data: products}] = await Promise.all([
    getTranslations('Winery'),
    sanityFetch({
      query: productsQuery,
    })
  ])

  return (
    <section>
      <WineryLayout
        title={t('title')}
        headerImage="/static/images/winery/Vinarija-Kriz-272.jpg"
        sectionImage="/static/images/winery/Mile-u-Krizu.jpg"
        sectionImage1="/static/images/winery/Vinarija-Kriz-215.jpg"
        description={t('description')}
        text1={t('section1.text')}
        text2={t('section2.text')}
        title2={t('title2')}
        text21={t('section21.text')}
        text22={t('section22.text')}
        text23={t('section23.text')}
        headerCellarImage="/static/images/cellar/cellar-header.jpg"
        headerCellarImage1="/static/images/cellar/cellar-header1.jpg"
      />
      
      <div className="space-y-2 pt-6 pb-8 md:space-y-5 mt-5">
        <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
          {t('productsTitle')}
        </h2>
      </div>
      
      <section className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {products?.length > 0 ? (
          products.map((product: Product, index: number) => (
            <Link
              href={`/${locale}/products/${product.slug[locale]}`}
              key={product._id}
              className="group flex flex-col"
              prefetch={true}
            >
              {/* Image Container with subtle zoom */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50 dark:bg-neutral-900">
                <ProductImage
                  image={product.productImage}
                  priority={index < 6}
                  className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>

              {/* Typography & Divider */}
              <div className="mt-6">
                {/* The "One-Line" Divider Improvement */}
                <div className="h-[1px] w-full bg-gray-200 dark:bg-neutral-800 transition-all duration-500 group-hover:bg-black dark:group-hover:bg-white" />
                
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-gray-950 dark:text-white">
                    {product.title[locale]}
                  </h3>
                  
                  {/* Minimalist Arrow Icon */}
                  <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full border-t border-gray-100 pt-10 text-center">
            <p className="text-xs uppercase tracking-widest text-gray-400">Inventory Empty</p>
          </div>
        )}
      </section>
    </section>
  )
}