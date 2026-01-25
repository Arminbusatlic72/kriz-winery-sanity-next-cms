



'use client'

import {ReactNode, useState, useCallback, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Accommodation {
  title: string
  description: ReactNode
  amenitiesTitle: string
  amenities: string
  images: string[]
  btnText: string
  btnUrl: string
}

interface Props {
  children?: ReactNode
  content: Accommodation
  locale: string
}

export default function AccommodationLayout({content, children, locale}: Props) {
  const {title, description, amenitiesTitle, amenities, images, btnUrl, btnText} = content
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const thumbnails = images.slice(1)
  const displayThumbnails = showAll ? thumbnails : thumbnails.slice(0, 2)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      if (e.key === 'Escape') {
        setSelectedIndex(null)
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length)
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev! + 1) % images.length)
      }
    },
    [selectedIndex, images.length],
  )

  useEffect(() => {
    if (selectedIndex !== null) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedIndex, handleKeyDown])

  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length)
    },
    [images.length],
  )

  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      setSelectedIndex((prev) => (prev! + 1) % images.length)
    },
    [images.length],
  )

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  const openImage = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const toggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev)
  }, [])

  const localizedBtnUrl = `/${locale}${btnUrl.startsWith('/') ? btnUrl : '/' + btnUrl}`

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Header */}
      <div className="space-y-2 pt-6 pb-5 lg:pb-8 md:space-y-5">
        <h1 className="font-strangelove text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
          {title}
        </h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 pt-8 lg:grid-cols-3 lg:gap-6">
        {/* Left Column - Main Image & Content */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Main Image */}
          {images[0] && (
            <button
              type="button"
              className="relative h-96 w-full overflow-hidden shadow-md cursor-pointer group"
              onClick={() => openImage(0)}
              aria-label="View main accommodation image"
            >
              <Image
                src={images[0]}
                alt="Main accommodation"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                priority
              />
            </button>
          )}

          {/* Description & Amenities */}
          <div className="prose dark:prose-invert max-w-none">
            <div className="mb-4 text-lg text-gray-700 dark:text-gray-300">{description}</div>

            {amenities && (
              <>
                <h2 className="mb-2 text-2xl font-semibold">{amenitiesTitle}</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">{amenities}</p>
              </>
            )}

            {/* CTA Button */}
            <Link
              href={localizedBtnUrl}
              className="cursor-pointer relative inline-block no-underline font-medium group py-3 px-6"
            >
              <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-white"></span>
              <span className="absolute inset-0 w-full h-full bg-white border border-black group-hover:bg-indigo-50 dark:bg-gray-900 dark:border-white dark:group-hover:bg-gray-800"></span>
              <span className="relative text-black dark:text-white">{btnText}</span>
            </Link>

            {children && <div className="mt-6">{children}</div>}
          </div>
        </div>

        {/* Right Column - Thumbnail Gallery */}
        <div className="flex flex-col">
          <div
            className={`flex flex-col gap-4 ${
              showAll ? 'max-h-[100%] overflow-y-auto' : 'max-h-[380px] overflow-hidden'
            }`}
          >
            {displayThumbnails.map((src, idx) => (
              <button
                key={idx}
                type="button"
                className="relative h-48 w-full overflow-hidden shadow-md cursor-pointer group"
                onClick={() => openImage(idx + 1)}
                aria-label={`View image ${idx + 2}`}
              >
                <Image
                  src={src}
                  alt={`Accommodation image ${idx + 2}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                />
              </button>
            ))}
          </div>

          {/* Show All/Less Button */}
          {thumbnails.length > 2 && (
            <button
              type="button"
              className="my-5 cursor-pointer relative inline-block no-underline font-medium group py-3 px-6"
              onClick={toggleShowAll}
              aria-expanded={showAll}
              aria-label={showAll ? 'Show less images' : `Show all ${thumbnails.length} images`}
            >
              <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-white"></span>
              <span className="absolute inset-0 w-full h-full bg-white border border-black group-hover:bg-indigo-50 dark:bg-gray-900 dark:border-white dark:group-hover:bg-gray-800"></span>
              <span className="relative text-black dark:text-white">
                {showAll ? 'Show less' : `Show all images (${thumbnails.length})`}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Modal Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-pointer"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image lightbox"
          aria-modal="true"
        >
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[selectedIndex]}
              alt={`Accommodation image ${selectedIndex + 1}`}
              width={1200}
              height={800}
              sizes="90vw"
              className="max-h-[90vh] max-w-[90vw] object-contain"
              priority
            />
            
            {/* Close Button */}
            <button
              type="button"
              className="absolute -top-12 right-0 text-3xl text-white p-2 hover:bg-white/10 rounded cursor-pointer transition-colors"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors cursor-pointer"
                onClick={prevImage}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors cursor-pointer"
                onClick={nextImage}
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}