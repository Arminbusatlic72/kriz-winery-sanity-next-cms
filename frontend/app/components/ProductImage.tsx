import Image from 'next/image'
import {getImageDimensions} from '@sanity/asset-utils'
import {urlForImage} from '@/sanity/lib/utils'
import {stegaClean} from '@sanity/client/stega'

interface ProductImageProps {
  image: any
  alt?: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  locale?: string
  sizes?: string
  quality?: number
}

export default function ProductImage({
  image,
  alt,
  width,
  height,
  priority = false,
  className = '',
  locale = 'en',
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quality = 85,
}: ProductImageProps) {
  if (!image?.asset?._ref) return null

  const {width: originalWidth, height: originalHeight} = getImageDimensions(image)
  const targetWidth = width || originalWidth
  const targetHeight = height || originalHeight

  const imageUrl = urlForImage(image)
    ?.width(targetWidth)
    .height(targetHeight)
    .fit('crop')
    .crop('focalpoint')
    .focalPoint(image.hotspot?.x ?? 0.5, image.hotspot?.y ?? 0.5)
    .auto('format')
    .url()

  if (!imageUrl) return null

  const altText =
    typeof alt === 'string'
      ? alt
      : typeof image.alt === 'string'
        ? image.alt
        : image.alt?.[locale] || 'Product image'

  const blurDataURL = image.metadata?.lqip || image?.asset?.metadata?.lqip

  return (
    <Image
      className={`object-cover ${className}`}
      src={imageUrl}
      alt={stegaClean(altText)}
      width={targetWidth}
      height={targetHeight}
      sizes={sizes}
      quality={quality}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL || undefined}
      priority={priority}
    />
  )
}
