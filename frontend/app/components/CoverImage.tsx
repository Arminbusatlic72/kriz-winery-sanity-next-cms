import {stegaClean} from '@sanity/client/stega'
import {Image} from 'next-sanity/image'
import {getImageDimensions} from '@sanity/asset-utils'
import {urlForImage} from '@/sanity/lib/utils'

interface CoverImageProps {
  image: any
  priority?: boolean
  className?: string
}

export default function CoverImage(props: CoverImageProps) {
  const {image: source, priority, className} = props
  
  const image = source?.asset?._ref ? (
    <Image
      // Using 'fill' is the key here
      fill 
      className={`object-cover ${className || ''}`}
      alt={stegaClean(source?.alt) || ''}
      src={urlForImage(source)?.url() as string}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  ) : null

  // Ensure the wrapper div is h-full and w-full
  return <div className="relative h-full w-full">{image}</div>
}
