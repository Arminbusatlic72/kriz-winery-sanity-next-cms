'use client'

import {ReactNode} from 'react'
import Image from 'next/image'

interface AboutContent {
  title: string
  description: ReactNode
  images: string[]
}

interface Props {
  children?: ReactNode
  content: AboutContent
}

export default function AboutLayout({content, children}: Props) {
  const {title, description, images} = content

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Header */}
      <div className="space-y-2 pt-6 pb-5 lg:pb-8 md:space-y-5">
        <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
          {title}
        </h2>
      </div>

      {/* Main Content */}
      <div className="items-start space-y-8 pt-8 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
        {/* Text */}
       <div className="md:sticky md:top-24 self-start">
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            {description}
          </div>
      </div>

        {/* Images */}
        <div className="grid grid-cols-1 gap-4">
          {images.map((src, idx) => (
            <div key={idx} className="relative h-90 w-full overflow-hidden shadow-lg">
              <Image src={src} alt={`About image ${idx + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Optional children */}
      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}


