'use client'

import {ReactNode} from 'react'
import Image from 'next/image'

interface WineryLayoutProps {
  title: string
  headerImage: string
  sectionImage: string
  sectionImage1?: string
  description: string
  text1: string
  text2?: string
  title2: string
  text21: string
  text22: string
  text23: string
  children?: ReactNode
  headerCellarImage: string
  headerCellarImage1: string
}

export default function WineryLayout({
  
  title,
  headerImage,
  sectionImage,
  sectionImage1,
  description,
  text1,
  text2,
  title2,
  text21,
  text22,
  text23,
  headerCellarImage,
  headerCellarImage1,
  children,
}: WineryLayoutProps) {
  
  return (
    <>
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Title */}
      <div className="space-y-2 pt-6 pb-5 lg:pb-8 md:space-y-5">
        <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
          {title}
        </h2>
      </div>

      {/* Header Image */}
      {headerImage && (
      <div className="relative mb-8 h-100 w-full overflow-hidden shadow-md">
        <Image src={headerImage} alt="Header" fill className="object-cover" />
      </div>)}

      <p className="text-gray-700 dark:text-gray-300 pb-5 mb-5 lg:pb-8 lg:mb-8">{description}</p>

      {/* Text & Images Section */}
      <div className="items-center xl:grid xl:grid-cols-2 xl:gap-x-8 pb-5 md:pb-8">
        {/* Image Left */}
        <div className="relative mb-6 h-90 w-full overflow-hidden shadow-md xl:mb-0">
          <Image src={sectionImage} alt="Section" fill className="object-cover" />
        </div>

        {/* Text Right */}
        <div className="prose dark:prose-invert max-w-none pb-5 sm:pb-8 xl:pl-6">
          <p className="text-gray-700 dark:text-gray-300 md:pb-0">{text1}</p>
        </div>

        {text2 && (
          <div className="prose dark:prose-invert max-w-none pb-5 sm:pb-8 xl:pl-6">
            <p className="text-gray-700 dark:text-gray-300">{text2}</p>
          </div>
        )}
        

        <div className="relative mb-6 h-90 w-full overflow-hidden shadow-md xl:mb-0">
          <Image
            src={sectionImage1 || '/static/images/fallback.jpg'}
            alt="Section"
            fill
            className="object-cover" />
        </div>
           <div className="flex items-center gap-3">
          <Image
            src="/static/images/footer/slowFoodFarm.jpg"
            alt="Slow Food Certified"
            width={100}
            height={40}
          />
          <Image
            src="/static/images/footer/eu-organic.png"
            alt="EU Organic Certified"
            width={100}
            height={40}
          />
        </div>
      </div>

      {children && <div className="mt-6">{children}</div>}
    </div>
    <section className="space-y-2 pt-6 pb-8 md:space-y-5 mt-5">
        <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">{title2}</h2>
         {headerCellarImage && (
    <div className="relative mb-8 h-100 w-full overflow-hidden shadow-md">
    <Image
      src={headerCellarImage}
      alt="Header Cellar"
      fill
      sizes="100vw"
      className="object-cover"
    />
  </div>
)}
        <p>{text21}</p>
        <p>{text22}</p>
        <p>{text23}</p>
          <div className="relative mb-8 h-100 w-full overflow-hidden shadow-md">
    <Image
      src={headerCellarImage1}
      alt="Header Cellar"
      fill
      sizes="100vw"
      className="object-cover"
    />
  </div>
      </section>
    </>
  )
}
