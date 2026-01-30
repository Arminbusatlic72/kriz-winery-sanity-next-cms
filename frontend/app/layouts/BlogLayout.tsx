// 'use client'

// import {ReactNode} from 'react'
// import {StaticImageData} from 'next/image'
// import Image from 'next/image'

// interface BlogContent {
//   title: string
//   description: string
//   image?: string | StaticImageData
//   imageAlt?: string
// }

// interface Props {
//   children?: ReactNode
//   content: BlogContent
// }

// export default function BlogLayout({content, children}: Props) {
//   const {title, description, image, imageAlt} = content

//   return (
//     <div className="divide-y divide-gray-200 dark:divide-gray-700">
//       {/* Header Section */}
//       <div className="pt-6 pb-8 md:pt-10 md:pb-12">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
//           {/* Left: Text (2/3) */}
//           <div className="md:col-span-2 space-y-4">
//             <h2 className="font-strangelove text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
//               {title}
//             </h2>
//             <p className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
//               {description}
//             </p>
//           </div>

//           {/* Right: Image (1/3) */}
//           {image && (
//             <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg">
//               <Image src={image} alt={imageAlt || 'Blog image'} fill className="object-cover" />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Full-Width Children Section */}
//       {children && <section className="w-full mt-12">{children}</section>}
//     </div>
//   )
// }



'use client'

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
    // <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
    //   <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
    //     {/* Header Section */}
    //     <div className="pt-16 pb-12 md:pt-24 md:pb-16">
    //       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            
    //         {/* Left: Text Content */}
    //         <div className="lg:col-span-3 space-y-6">
    //           <h2 className="font-strangelove text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 leading-tight">
    //             {title}
    //           </h2>
    //           <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
    //           <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
    //             {description}
    //           </p>
    //         </div>

    //         {/* Right: Featured Image */}
    //         {image && (
    //           <div className="lg:col-span-2 relative">
    //             <div className="relative aspect-square overflow-hidden  shadow-l bg-gray-100 dark:bg-gray-800 group">
    //               <Image 
    //                 src={image} 
    //                 alt={imageAlt || 'Blog featured image'} 
    //                 fill 
    //                 className="object-cover transition-transform duration-700 group-hover:scale-110" 
    //                 priority
    //               />
    //               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    //             </div>
    //             {/* Decorative blur element */}
    //             <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-40"></div>
    //           </div>
    //         )}
    //       </div>
    //     </div>

    //     {/* Blog Posts Grid Section */}
    //     {children && (
    //       <section className="pb-16 lg:pb-24">
    //         {children}
    //       </section>
    //     )}
        
    //   </div>
    // </div>

    <div className="min-h-screen bg-white dark:bg-neutral-950">
  <div className="container mx-auto sm:px-6 lg:px-8">
    {/* Header Section */}
    <div className="pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Changed Grid Ratio: Text takes 2 columns, Image takes 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        
        {/* Left: Text Content (Narrower for better readability) */}
        <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
         

          <div className="space-y-6">
           <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
          {title}
        </h2>
            
            {/* <div className="h-[1px] w-16 bg-black dark:bg-white"></div> */}
            
            <p className="text-base md:text-lg text-gray-500 dark:text-neutral-400 leading-relaxed font-light">
              {description}
            </p>
          </div>
        </div>

        {/* Right: Wider Image Section */}
        {image && (
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-2xl">
              <Image 
                src={image} 
                alt={imageAlt || 'Blog featured image'} 
                fill 
                className="object-cover transition-transform duration-[2s] ease-out hover:scale-105" 
                priority
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