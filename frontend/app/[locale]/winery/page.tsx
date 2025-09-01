import WineryLayout from '../layouts/WineryLayout'
import {sanityFetch} from '@/sanity/lib/live'
import {productsQuery} from '@/sanity/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import ProductImage from '@/app/components/ProductImage'
import CoverImage from '@/app/components/CoverImage'
import {urlForImage} from '@/sanity/lib/utils'
export default async function VineyardsPage() {
  // Fetch products from Sanity
  const {data: products} = await sanityFetch({
    query: productsQuery,
  })

  const vineyardsContent = {
    title: 'Our Vineyards',
    headerImage: '/static/images/winery/Vinarija-Kriz-272.jpg',
    content:
      'Welcome to our winery. We produce high-quality wines using traditional methods combined with modern techniques.',
    sectionImage: '/static/images/winery/Vinarija-Kriz-51.jpg',
    sectionImage1: '/static/images/winery/Vinarija-Kriz-215.jpg',
  }

  return (
    <WineryLayout content={vineyardsContent}>
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.length > 0 ? (
          products.map((product: any) => (
            <div key={product.currentSlug} className="border rounded-lg p-4 shadow-md">
              <CoverImage image={product.productImage} priority />
              <h3 className="text-xl font-semibold mt-4">{product.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
              <div className="flex justify-end">
                <Link
                  href={`/products/${product.currentSlug}`}
                  className="text-brand underline mt-2 block cursor-pointer group"
                >
                  <span className="inline-flex items-center transition-transform duration-200 group-hover:translate-x-1">
                    View Product
                    <svg
                      className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </section>
    </WineryLayout>
  )
}
