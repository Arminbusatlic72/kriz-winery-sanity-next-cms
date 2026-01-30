import Link from 'next/link';
import  ProductImage  from '@/app/components/ProductImage';

interface Product {
  _id: string;
  slug: Record<string, string>;
  productImage: any;
  title: Record<string, string>;
}

interface ProductArchiveProps {
  products: Product[];
  locale: string;
}

export default function ProductArchive({ products, locale }: ProductArchiveProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {products?.length > 0 && products.map((product, index) => (
          <Link
            href={`/${locale}/products/${product.slug[locale]}`}
            key={product._id}
            className="group relative block"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Card Container */}
            <article className="relative overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-neutral-200/50 dark:hover:shadow-neutral-950/50">
              
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <ProductImage
                  image={product.productImage}
                  priority={index < 6}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover Indicator */}
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                  <svg 
                    className="w-5 h-5 text-neutral-900 dark:text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-medium text-neutral-900 dark:text-white tracking-tight line-clamp-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300">
                  {product.title[locale]}
                </h3>
                
                {/* Animated Underline */}
                <div className="mt-4 h-0.5 w-0 bg-neutral-900 dark:bg-white group-hover:w-12 transition-all duration-500 ease-out" />
              </div>
              
              {/* Border Accent */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-neutral-200/50 dark:ring-neutral-800/50 group-hover:ring-neutral-900/20 dark:group-hover:ring-white/20 transition-all duration-500" />
            </article>
          </Link>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}