'use client'

import Image from 'next/image'

interface MainImageProps {
  src: string | {src: string; blurDataURL?: string; alt?: string}
  onClick: () => void
  alt?: string
}

export default function MainImage({src, onClick, alt = 'Main accommodation'}: MainImageProps) {
  const imageSrc = typeof src === 'string' ? src : src.src
  const blurDataURL = typeof src === 'string' ? undefined : src.blurDataURL
  const imageAlt = typeof src === 'string' ? alt : (src.alt ?? alt)

  return (
    <button
      type="button"
      className="relative h-96 w-full overflow-hidden shadow-md cursor-pointer group border border-transparent transition-colors duration-300 hover:border-gray-300 dark:hover:border-gray-600"
      onClick={onClick}
      aria-label="View main accommodation image"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 66vw"
        quality={85}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        className="object-cover"
        priority
      />
    </button>
  )
}
