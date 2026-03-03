


import {ReactNode} from 'react'
import {StaticImageData} from 'next/image'
import Image from 'next/image'

interface BlogContent {
  title: string
  description: string
  image?: string | StaticImageData
  imageAlt?: string
}

interface Props {
  children?: ReactNode
  content: BlogContent
}

export default function BlogLayout({content, children}: Props) {
  const {title, description, image, imageAlt} = content

  return (
  

    <div className="min-h-screen bg-white dark:bg-neutral-950">
  <div className="container mx-auto sm:px-6 lg:px-8">
    {/* Header Section */}
    <div className="pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Changed Grid Ratio: Text takes 2 columns, Image takes 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        
        {/* Left: Text Content (Narrower for better readability) */}
        <div className="lg:col-span-2 space-y-8 order-1 lg:order-1">
         

          <div className="space-y-6">
           <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
          {title}
        </h2>
            
          
            
            <p className="text-base md:text-lg text-gray-500 dark:text-neutral-400 leading-relaxed font-light">
              {description}
            </p>
          </div>
        </div>

        {/* Right: Wider Image Section */}
        {image && (
          <div className="lg:col-span-3 order-2 lg:order-2">
            <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-2xl">
              <Image 
                src={image} 
                alt={imageAlt || 'Blog featured image'} 
                fill 
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-[2s] ease-out hover:scale-105" 
                priority
                fetchPriority="high"
              />
              
              {/* Subtle Overlay for depth */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5" />
            </div>
            
            
          </div>
        )}
      </div>
    </div>
    
  
    {/* Blog Posts Grid Section */}
    {children && (
      <section className="pb-16 lg:pb-24 border-t border-neutral-100 dark:border-neutral-900 pt-16">
        {children}
      </section>
    )}
    
  </div>
</div>
  )
}