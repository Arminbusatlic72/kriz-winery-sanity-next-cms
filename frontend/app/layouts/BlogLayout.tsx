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
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Header Section */}
      <div className="pt-6 pb-8 md:pt-10 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left: Text (2/3) */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-strangelove text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
              {title}
            </h2>
            <p className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              {description}
            </p>
          </div>

          {/* Right: Image (1/3) */}
          {image && (
            <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg">
              <Image src={image} alt={imageAlt || 'Blog image'} fill className="object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Full-Width Children Section */}
      {children && <section className="w-full mt-12">{children}</section>}
    </div>
  )
}
