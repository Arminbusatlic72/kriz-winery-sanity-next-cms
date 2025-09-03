'use client'

import {ReactNode, useState} from 'react'
import Image from 'next/image'

interface Accommodation {
  title: string
  description: string
  amenities: string
  images: string[]
  btnText: string
  btnUrl: string
}

interface Props {
  children?: ReactNode
  content: Accommodation
}

export default function AccommodationLayout({content, children}: Props) {
  const {title, description, amenities, images, btnUrl, btnText} = content

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const displayedImages = showAll ? images : images.slice(0, 2)

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
    }
  }

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length)
    }
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Header */}
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
          {title}
        </h2>
      </div>

      {/* Main Content */}
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        {/* Left - Images */}
        <div className="flex flex-col items-center space-x-2 pt-8">
          {displayedImages.map((src, idx) => (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              className="relative mb-4 h-48 w-full cursor-pointer overflow-hidden shadow-md hover:opacity-80"
              onClick={() => setSelectedIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSelectedIndex(idx)
              }}
            >
              <Image src={src} alt={`Accommodation ${idx + 1}`} fill className="object-cover" />
            </div>
          ))}

          {images.length > 3 && (
            <button
              className="mt-2 w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show less' : 'Show all images'}
            </button>
          )}
        </div>

        {/* Right - Details */}
        <div className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2">
          <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">{description}</p>

          {amenities.length > 0 && (
            <>
              <h3 className="mb-2 text-2xl font-semibold">Amenities</h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">{amenities}</p>
            </>
          )}

          <a
            href={btnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black px-6 py-3 text-white! no-underline shadow-md transition hover:bg-gray-800"
          >
            {btnText}
          </a>

          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>

      {/* Modal Lightbox */}
      {selectedIndex !== null && (
        <div
          role="button"
          tabIndex={0}
          className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black"
          onClick={() => setSelectedIndex(null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSelectedIndex(null)
            }
          }}
        >
          <div className="relative flex h-auto max-h-[90%] w-auto max-w-5xl items-center justify-center">
            <Image
              src={images[selectedIndex]}
              alt={`Enlarged accommodation image ${selectedIndex + 1}`}
              width={1200}
              height={800}
              className="shadow-lg"
            />
            <button
              className="absolute top-2 right-2 text-3xl text-white"
              onClick={() => setSelectedIndex(null)}
            >
              ✕
            </button>
          </div>
          <button
            className="absolute top-1/2 left-2 -translate-y-1/2 rounded bg-black/30 px-3 py-2 text-3xl text-white hover:bg-black/50"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
          >
            ‹
          </button>
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded bg-black/30 px-3 py-2 text-3xl text-white hover:bg-black/50"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
