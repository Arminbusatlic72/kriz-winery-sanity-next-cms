import { Image } from 'next-sanity/image'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlForImage } from '@/sanity/lib/utils'
import { stegaClean } from '@sanity/client/stega'

interface ProductImageProps {
  image: any
  alt?: string | string[]
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

export default function ProductImage({
  image,
  alt,
  width,
  height,
  priority = false,
  className = '',
}: ProductImageProps) {
  if (!image?.asset?._ref) return null

  // Fallback to original Sanity image dimensions if not provided
  const { width: originalWidth, height: originalHeight } = getImageDimensions(image)

  // Use _updatedAt for cache busting (fallback to _createdAt)
  const updatedAt = image._updatedAt || image._createdAt || Date.now()

  // Generate URL with cache-busting param
  const imageUrl = `${urlForImage(image)?.url()}?v=${encodeURIComponent(updatedAt)}`

  return (
    <Image
      className={`object-cover ${className}`}
      src={imageUrl as string}
      alt={stegaClean(alt || image.alt) || 'Product image'}
      width={width || originalWidth}
      height={height || originalHeight}
      priority={priority}
    />
  )
}
