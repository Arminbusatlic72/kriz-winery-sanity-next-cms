'use client'

import Image from 'next/image'

interface MainImageProps {
  src: string
  onClick: () => void
  alt?: string
}

export default function MainImage({src, onClick, alt = 'Main accommodation'}: MainImageProps) {
  return (
    <button
      type="button"
      className="relative h-96 w-full overflow-hidden shadow-md cursor-pointer group"
      onClick={onClick}
      aria-label="View main accommodation image"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 66vw"
        className="object-cover transition-opacity duration-300 group-hover:opacity-90"
        priority
      />
    </button>
  )
}
