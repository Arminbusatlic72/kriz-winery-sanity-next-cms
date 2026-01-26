'use client'

import { useState, useCallback, memo } from 'react'
import Image from 'next/image'
import ImageLightbox from './ImageLightbox'

interface ImageGalleryProps {
  images: string[]
}

interface ThumbnailGalleryProps {
  thumbnails: string[]
  showAll: boolean
  onToggleShowAll: () => void
  onThumbnailClick: (index: number) => void
}

const ThumbnailGallery = memo(({ 
  thumbnails, 
  showAll, 
  onToggleShowAll, 
  onThumbnailClick 
}: ThumbnailGalleryProps) => {
  const displayThumbnails = showAll ? thumbnails : thumbnails.slice(0, 2)
  
  return (
    <div className="flex flex-col">
      <div className={`flex flex-col gap-4 ${showAll ? 'max-h-[100%]' : 'max-h-[380px] overflow-hidden'}`}>
        {displayThumbnails.map((src, idx) => (
          <button
            key={`thumb-${idx}`}
            type="button"
            className="relative h-48 w-full overflow-hidden shadow-md cursor-pointer group"
            onClick={() => onThumbnailClick(idx + 1)}
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

      {thumbnails.length > 2 && (
        <button
          type="button"
          className="my-5 cursor-pointer relative inline-block no-underline font-medium group py-3 px-6"
          onClick={onToggleShowAll}
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
  )
})

ThumbnailGallery.displayName = 'ThumbnailGallery'

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)
  const thumbnails = images.slice(1)

  const openImage = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length)
  }, [images.length])

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev! + 1) % images.length)
  }, [images.length])

  const toggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev)
  }, [])

  return (
    <>
      {/* Main Image */}
      {images[0] && (
        <button
          type="button"
          className="relative h-96 w-full overflow-hidden shadow-md cursor-pointer group lg:col-span-2"
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

      {/* Thumbnail Gallery */}
      <ThumbnailGallery
        thumbnails={thumbnails}
        showAll={showAll}
        onToggleShowAll={toggleShowAll}
        onThumbnailClick={openImage}
      />

      {/* Lightbox */}
      <ImageLightbox
        images={images}
        selectedIndex={selectedIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </>
  )
}