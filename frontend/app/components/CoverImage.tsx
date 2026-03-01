import {stegaClean} from '@sanity/client/stega'
import Image from 'next/image'
import {getImageDimensions} from '@sanity/asset-utils'
import {urlForImage} from '@/sanity/lib/utils'

interface CoverImageProps {
  image: any
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
}

export default function CoverImage(props: CoverImageProps) {
  const {
    image: source,
    priority,
    className,
    sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1280px',
    quality = 85,
  } = props

  if (!source?.asset?._ref) {
    return null
  }

  const dimensions = source?.asset?.metadata?.dimensions || source?.metadata?.dimensions
  const fallbackDimensions = getImageDimensions(source)
  const width = dimensions?.width || fallbackDimensions.width || 1280
  const height = dimensions?.height || fallbackDimensions.height || 720

  const src = urlForImage(source)
    ?.width(width)
    .height(height)
    .fit('crop')
    .crop('focalpoint')
    .focalPoint(source.hotspot?.x ?? 0.5, source.hotspot?.y ?? 0.5)
    .auto('format')
    .url()

  if (!src) {
    return null
  }

  const blurDataURL = source?.asset?.metadata?.lqip || source?.metadata?.lqip

  return (
    <div className="relative h-full w-full">
      <Image
        fill
        className={`object-cover ${className || ''}`}
        alt={stegaClean(source?.alt) || ''}
        src={src}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL || undefined}
      />
    </div>
  )
}
