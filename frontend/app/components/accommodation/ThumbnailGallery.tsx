'use client'

import { useState, useCallback, memo } from 'react'
import Image from 'next/image'
import ImageLightbox from './ImageLightbox'

interface ThumbnailGalleryProps {
  images: string[]
  onThumbnailClick?: (index: number) => void
}

const ThumbnailItem = memo(({ 
  src, 
  index, 
  onClick 
}: { 
  src: string; 
  index: number; 
  onClick: (index: number) => void 
}) => (
  <button
    type="button"
    className="relative h-48 w-full overflow-hidden shadow-md cursor-pointer group"
    onClick={() => onClick(index)}
    aria-label={`View image ${index + 1}`}
  >
    <Image
      src={src}
      alt={`Accommodation image ${index + 1}`}
      fill
      sizes="(max-width: 1024px) 100vw, 33vw"
      className="object-cover transition-opacity duration-300 group-hover:opacity-90"
    />
  </button>
))

ThumbnailItem.displayName = 'ThumbnailItem'

export default function ThumbnailGallery({ images, onThumbnailClick }: ThumbnailGalleryProps) {
  const [showAll, setShowAll] = useState(false)
  const displayImages = showAll ? images : images.slice(0, 2)

  const toggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className={`flex flex-col gap-4 ${showAll ? 'max-h-[100%]' : 'max-h-[380px] overflow-hidden'}`}>
        {displayImages.map((src, idx) => (
          <ThumbnailItem
            key={`thumb-${idx}`}
            src={src}
            index={idx}
            onClick={onThumbnailClick || (() => {})}
          />
        ))}
      </div>

      {/* Show All/Less Button */}
      {images.length > 2 && (
        <button
          type="button"
          className="mt-4 cursor-pointer relative inline-block no-underline font-medium group py-3 px-6"
          onClick={toggleShowAll}
          aria-expanded={showAll}
        >
          <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-white"></span>
          <span className="absolute inset-0 w-full h-full bg-white border border-black group-hover:bg-indigo-50 dark:bg-gray-900 dark:border-white dark:group-hover:bg-gray-800"></span>
          <span className="relative text-black dark:text-white">
            {showAll ? 'Show less' : `Show all images (${images.length})`}
          </span>
        </button>
      )}
    </div>
  )
}