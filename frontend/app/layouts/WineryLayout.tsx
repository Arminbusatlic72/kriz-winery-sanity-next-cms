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
  text21:string
  text22:string
  text23:string
  children?: ReactNode
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
      <div className="relative mb-8 h-72 w-full overflow-hidden shadow-md">
        <Image src={headerImage} alt="Header" fill className="object-cover" />
      </div>

      <p className="text-gray-700 dark:text-gray-300 pb-5 mb-5 lg:pb-8 lg:mb-8">{description}</p>

      {/* Text & Images Section */}
      <div className="items-center xl:grid xl:grid-cols-2 xl:gap-x-8 pb-5 md:pb-8">
        {/* Image Left */}
        <div className="relative mb-6 h-64 w-full overflow-hidden shadow-md xl:mb-0">
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

        <div className="relative mb-6 h-64 w-full overflow-hidden shadow-md xl:mb-0">
          <Image
            src={sectionImage1 || '/static/images/fallback.jpg'}
            alt="Section"
            fill
            className="object-cover" />
        </div>
      </div>

      {children && <div className="mt-6">{children}</div>}
    </div>
    <section className="space-y-2 pt-6 pb-8 md:space-y-5 mt-5">
        <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">{title2}</h2>
        <p>{text21}</p>
        <p>{text22}</p>
        <p>{text23}</p>
      </section>
    </>
  )
}
