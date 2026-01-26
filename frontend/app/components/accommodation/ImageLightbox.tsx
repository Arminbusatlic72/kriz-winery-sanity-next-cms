'use client'

import {useCallback, useEffect} from 'react'
import Image from 'next/image'

interface ImageLightboxProps {
  images: string[]
  selectedIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function ImageLightbox({
  images,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onPrev()
      else if (e.key === 'ArrowRight') onNext()
    },
    [selectedIndex, onClose, onPrev, onNext],
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

  if (selectedIndex === null) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-pointer"
      onClick={onClose}
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

        <button
          type="button"
          className="absolute -top-12 right-0 text-3xl text-white p-2 hover:bg-white/10 rounded cursor-pointer transition-colors"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          ✕
        </button>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
    </div>
  )
}
