'use client'

import {ReactNode, useState, useCallback, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
  locale: string
}

export default function AccommodationLayout({content, children, locale}: Props) {
  const {title, description, amenities, images, btnUrl, btnText} = content
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

  const generatePlaceholder = (width: number = 800, height: number = 600) => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23f3f4f6'/%3E%3C/svg%3E`
  }
  const localizedBtnUrl = `/${locale}${btnUrl.startsWith('/') ? btnUrl : '/' + btnUrl}`
  console.log(locale)
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h2 className="font-strangelove text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 pt-8 lg:grid-cols-3 lg:gap-6">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {images[0] && (
            <div
              role="button"
              tabIndex={0}
              className="relative h-96 w-full overflow-hidden shadow-md cursor-pointer bg-black opacity-100 z-10 transition-opacity duration-300 hover:opacity-40"
              onClick={() => openImage(0)}
              onKeyDown={(e) => e.key === 'Enter' && openImage(0)}
              aria-label="View main accommodation image"
            >
              <Image
                src={images[0]}
                alt="Main accommodation"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                placeholder="blur"
                blurDataURL={generatePlaceholder()}
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">{description}</p>

            {amenities && (
              <>
                <h3 className="mb-2 text-2xl font-semibold">Amenities</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">{amenities}</p>
              </>
            )}

            <Link
              href={localizedBtnUrl}
              className="cursor-pointer relative inline-block no-underline font-medium group py-3 px-6"
            >
              <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-white"></span>
              <span className="absolute inset-0 w-full h-full bg-white border border-black group-hover:bg-indigo-50 dark:bg-gray-900 dark:border-white dark:group-hover:bg-gray-800"></span>
              <span className="relative text-black dark:text-white"> {btnText}</span>
            </Link>

            {children && <div className="mt-6">{children}</div>}
          </div>
        </div>

        <div className="flex flex-col">
          <div
            className={`flex flex-col gap-4 ${
              showAll ? 'max-h-[100%] overflow-y-auto' : 'max-h-[380px] overflow-hidden'
            }`}
          >
            {displayThumbnails.map((src, idx) => (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                className="relative h-48 w-full overflow-hidden shadow-md cursor-pointer  bg-black opacity-100 z-10 transition-opacity duration-300 hover:opacity-40"
                onClick={() => openImage(idx + 1)}
                onKeyDown={(e) => e.key === 'Enter' && openImage(idx + 1)}
                aria-label={`View thumbnail ${idx + 2}`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${idx + 2}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={generatePlaceholder()}
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {thumbnails.length > 2 && (
            <button
              className="my-5 cursor-pointer relative inline-block no-underline font-medium group py-3 px-6"
              onClick={toggleShowAll}
              aria-expanded={showAll}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image lightbox"
          aria-modal="true"
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={images[selectedIndex]}
              alt={`Enlarged image ${selectedIndex + 1}`}
              width={1200}
              height={800}
              sizes="90vw"
              className="max-h-[90vh] max-w-[90vw] object-contain"
              priority
            />
            <button
              className="absolute -top-12 right-0 text-3xl text-white p-2 hover:bg-white/10 rounded"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </div>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors"
                onClick={prevImage}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors"
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
