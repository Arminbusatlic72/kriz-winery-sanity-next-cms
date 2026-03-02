'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'

interface LightboxImage {
  src: string
  blurDataURL?: string
  alt?: string
  width?: number
  height?: number
}

interface ImageLightboxProps {
  images: Array<string | LightboxImage>
  selectedIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

// Normalize to a consistent shape once, not on every render
function normalizeImage(image: string | LightboxImage, index: number): LightboxImage {
  if (typeof image === 'string') {
    return { src: image, alt: `Accommodation image ${index + 1}` }
  }
  return {
    ...image,
    alt: image.alt ?? `Accommodation image ${index + 1}`,
  }
}

export default function ImageLightbox({
  images,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) {
  // Use refs so handleKeyDown never needs to be recreated
  const onCloseRef = useRef(onClose)
  const onPrevRef = useRef(onPrev)
  const onNextRef = useRef(onNext)
  const isOpenRef = useRef(selectedIndex !== null)
  const savedOverflowRef = useRef<string>('')
  const dialogRef = useRef<HTMLDivElement>(null)

  // Keep refs in sync without causing re-renders or callback recreation
  useEffect(() => {
    onCloseRef.current = onClose
    onPrevRef.current = onPrev
    onNextRef.current = onNext
  })

  useEffect(() => {
    isOpenRef.current = selectedIndex !== null
  }, [selectedIndex])

  // Stable callback — never recreated
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpenRef.current) return
    if (e.key === 'Escape') onCloseRef.current()
    else if (e.key === 'ArrowLeft') onPrevRef.current()
    else if (e.key === 'ArrowRight') onNextRef.current()
  }, [])

  useEffect(() => {
    if (selectedIndex !== null) {
      // Save original value before overwriting
      savedOverflowRef.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
      // Move focus into the dialog for keyboard trap
      dialogRef.current?.focus()
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Restore exactly what was there before
      document.body.style.overflow = savedOverflowRef.current
    }
  }, [selectedIndex, handleKeyDown])

  if (selectedIndex === null) return null

  const current = normalizeImage(images[selectedIndex], selectedIndex)

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-label="Image lightbox"
      aria-modal="true"
      // tabIndex so the div can receive focus for the keyboard trap
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-pointer outline-none"
      onClick={onClose}
    >
      {/* Main image container — intrinsic aspect ratio from fill */}
      <div
        className="relative w-[90vw] h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={current.src} // force remount when src changes to avoid stale blur
          src={current.src}
          alt={current.alt!}
          fill
          sizes="90vw"
          quality={85}
          placeholder={current.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={current.blurDataURL}
          className="object-contain"
        />

        {/* Close button */}
        <button
          type="button"
         className="absolute top-2 right-2 md:-top-12 md:right-0 text-3xl text-white p-2 hover:bg-white/10 rounded cursor-pointer transition-colors"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          ✕
        </button>

        {/* Image counter — aria-live so screen readers announce navigation */}
        {images.length > 1 && (
          <p
            aria-live="polite"
            aria-atomic="true"
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/70 text-sm tabular-nums"
          >
            {selectedIndex + 1} / {images.length}
          </p>
        )}
      </div>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); onNext() }}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
    </div>
  )
}