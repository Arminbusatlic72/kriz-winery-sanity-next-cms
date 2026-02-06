import { Image } from 'next-sanity/image'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlForImage } from '@/sanity/lib/utils'
import { stegaClean } from '@sanity/client/stega'

interface ProductImageProps {
  image: any
  alt?: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  locale?: string
}

export default function ProductImage({
  image,
  alt,
  width,
  height,
  priority = false,
  className = '',
  locale = 'en',
}: ProductImageProps) {
  if (!image?.asset?._ref) return null

  const { width: originalWidth, height: originalHeight } = getImageDimensions(image)

  // Cache-busting
  const updatedAt = image._updatedAt || image._createdAt || Date.now()
  const imageUrl = `${urlForImage(image)?.url()}?v=${encodeURIComponent(updatedAt)}`

  // Proper alt string
  const altText =
    typeof alt === 'string'
      ? alt
      : typeof image.alt === 'string'
      ? image.alt
      : image.alt?.[locale] || 'Product image'

  return (
    <Image
      className={`object-cover ${className}`}
      src={imageUrl as string}
      alt={stegaClean(altText)}
      width={width || originalWidth}
      height={height || originalHeight}
      priority={priority}
    />
  )
}
