'use client'

import {ReactNode} from 'react'
import Image from 'next/image'

interface Vineyards {
  title: string
  headerImage: string
  content: string
  sectionImage: string
  sectionImage1?: string
}

interface Props {
  children?: ReactNode
  content: Vineyards
}

export default function WineryLayout({content, children}: Props) {
  const {title, headerImage, content: text, sectionImage, sectionImage1} = content

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Title */}
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
          {title}
        </h2>
      </div>

      {/* Header Image */}
      <div className="relative mb-8 h-72 w-full overflow-hidden shadow-md">
        <Image src={headerImage} alt="Header" fill className="object-cover" />
      </div>

      {/* Text right / Image left section */}
      <div className="items-center xl:grid xl:grid-cols-2 xl:gap-x-8">
        {/* Image Left */}
        <div className="relative mb-6 h-64 w-full overflow-hidden shadow-md xl:mb-0">
          <Image src={sectionImage} alt="Section" fill className="object-cover" />
        </div>

        {/* Text Right */}
        <div className="prose dark:prose-invert max-w-none xl:pl-6">
          <p className="text-gray-700 dark:text-gray-300">{text}</p>
        </div>
        <div className="prose dark:prose-invert max-w-none xl:pl-6">
          <p className="text-gray-700 dark:text-gray-300">{text}</p>
        </div>
        <div className="relative mb-6 h-64 w-full overflow-hidden shadow-md xl:mb-0">
          <Image
            src={sectionImage1 || '/static/images/fallback.jpg'}
            alt="Section"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}
