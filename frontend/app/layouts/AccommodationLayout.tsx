// 'use client'

// import {ReactNode, useState} from 'react'
// import Image from 'next/image'

// interface Accommodation {
//   title: string
//   description: string
//   amenities: string
//   images: string[]
//   btnText: string
//   btnUrl: string
// }

// interface Props {
//   children?: ReactNode
//   content: Accommodation
// }

// export default function AccommodationLayout({content, children}: Props) {
//   const {title, description, amenities, images, btnUrl, btnText} = content

//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
//   const [showAll, setShowAll] = useState(false)

//   // First image is big, rest are smaller thumbnails
//   const mainImage = images[0]
//   const thumbnails = showAll ? images.slice(1) : images.slice(1, 3)

//   const prevImage = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
//     }
//   }

//   const nextImage = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((selectedIndex + 1) % images.length)
//     }
//   }

//   return (
//     <div className="divide-y divide-gray-200 dark:divide-gray-700">
//       {/* Header */}
//       <div className="space-y-2 pt-6 pb-8 md:space-y-5">
//         <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
//           {title}
//         </h2>
//       </div>

//       {/* Main Gallery Layout */}
//       <div className="grid grid-cols-1 gap-4 pt-8 lg:grid-cols-3 lg:gap-6">
//         {/* Left - Big Image */}
//         {mainImage && (
//           <div
//             role="button"
//             tabIndex={0}
//             className="relative h-96 w-full overflow-hidden shadow-md cursor-pointer lg:col-span-2"
//             onClick={() => setSelectedIndex(0)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') setSelectedIndex(0)
//             }}
//           >
//             <Image src={mainImage} alt="Main accommodation" fill className="object-cover" />
//           </div>
//         )}

//         {/* Right - Thumbnails */}
//         <div className="flex flex-col gap-4">
//           {thumbnails.map((src, idx) => (
//             <div
//               key={idx + 1}
//               role="button"
//               tabIndex={0}
//               className="relative h-46 w-full overflow-hidden shadow-md cursor-pointer hover:opacity-80"
//               onClick={() => setSelectedIndex(idx + 1)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') setSelectedIndex(idx + 1)
//               }}
//             >
//               <Image src={src} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
//             </div>
//           ))}

//           {images.length > 4 && (
//             <button
//               className="mt-2 mb-2 w-full  bg-black px-4 py-2 text-white! hover:bg-gray-800"
//               onClick={() => setShowAll(!showAll)}
//             >
//               {showAll ? 'Show less' : 'Show all images'}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Description & Details */}
//       <div className="prose dark:prose-invert max-w-none pt-8 pb-8">
//         <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">{description}</p>

//         {amenities.length > 0 && (
//           <>
//             <h3 className="mb-2 text-2xl font-semibold">Amenities</h3>
//             <p className="mb-4 text-gray-700 dark:text-gray-300">{amenities}</p>
//           </>
//         )}

//         <a
//           href={btnUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block bg-black px-6 py-3 text-white no-underline shadow-md transition hover:bg-gray-800"
//         >
//           {btnText}
//         </a>

//         {children && <div className="mt-6">{children}</div>}
//       </div>

//       {/* Modal Lightbox */}
//       {selectedIndex !== null && (
//         <div
//           role="button"
//           tabIndex={0}
//           className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black"
//           onClick={() => setSelectedIndex(null)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' || e.key === ' ') {
//               setSelectedIndex(null)
//             }
//           }}
//         >
//           <div className="relative flex h-auto max-h-[90%] w-auto max-w-5xl items-center justify-center">
//             <Image
//               src={images[selectedIndex]}
//               alt={`Enlarged image ${selectedIndex + 1}`}
//               width={1200}
//               height={800}
//               className="shadow-lg"
//             />
//             <button
//               className="absolute top-2 right-2 text-3xl text-white"
//               onClick={() => setSelectedIndex(null)}
//             >
//               ✕
//             </button>
//           </div>
//           <button
//             className="absolute top-1/2 left-2 -translate-y-1/2 rounded bg-black/30 px-3 py-2 text-3xl text-white hover:bg-black/50"
//             onClick={(e) => {
//               e.stopPropagation()
//               prevImage()
//             }}
//           >
//             ‹
//           </button>
//           <button
//             className="absolute top-1/2 right-2 -translate-y-1/2 rounded bg-black/30 px-3 py-2 text-3xl text-white hover:bg-black/50"
//             onClick={(e) => {
//               e.stopPropagation()
//               nextImage()
//             }}
//           >
//             ›
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

'use client'

import {ReactNode, useState, useCallback, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Accommodation {
  title: string
  description: string
  amenities: string
  images: string[]
  btnText: string
  btnUrl: string
}

interface Props {
  children?: ReactNode
  content: Accommodation
}

export default function AccommodationLayout({content, children}: Props) {
  const {title, description, amenities, images, btnUrl, btnText} = content
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  // Memoize the thumbnails calculation
  const thumbnails = images.slice(1)
  const displayThumbnails = showAll ? thumbnails : thumbnails.slice(0, 2)

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      if (e.key === 'Escape') {
        setSelectedIndex(null)
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length)
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev! + 1) % images.length)
      }
    },
    [selectedIndex, images.length],
  )

  useEffect(() => {
    if (selectedIndex !== null) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedIndex, handleKeyDown])

  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length)
    },
    [images.length],
  )

  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      setSelectedIndex((prev) => (prev! + 1) % images.length)
    },
    [images.length],
  )

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  const openImage = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const toggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev)
  }, [])

  // Generate placeholder data URL (simple gray placeholder)
  const generatePlaceholder = (width: number = 800, height: number = 600) => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23f3f4f6'/%3E%3C/svg%3E`
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Header */}
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h2 className="font-strangelove text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
          {title}
        </h2>
      </div>

      {/* Main Gallery Layout */}
      <div className="grid grid-cols-1 gap-4 pt-8 lg:grid-cols-3 lg:gap-6">
        {/* Left - Big Image + Text */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {images[0] && (
            <div
              role="button"
              tabIndex={0}
              className="relative h-96 w-full overflow-hidden shadow-md cursor-pointer bg-black opacity-100 z-10 transition-opacity duration-300 hover:opacity-40"
              onClick={() => openImage(0)}
              onKeyDown={(e) => e.key === 'Enter' && openImage(0)}
              aria-label="View main accommodation image"
            >
              <Image
                src={images[0]}
                alt="Main accommodation"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                placeholder="blur"
                blurDataURL={generatePlaceholder()}
                className="object-cover"
                priority // Load first image immediately
              />
            </div>
          )}

          {/* Description & Details */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">{description}</p>

            {amenities && (
              <>
                <h3 className="mb-2 text-2xl font-semibold">Amenities</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">{amenities}</p>
              </>
            )}

            {/* <a
              href={btnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black px-6 py-3 text-white no-underline shadow-md transition-colors hover:bg-gray-800"
            >
              {btnText}
            </a> */}
            <Link
              href="#"
              className="cursor-pointer relative inline-block no-underline font-medium group py-3 px-6"
            >
              <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-white"></span>
              <span className="absolute inset-0 w-full h-full bg-white border border-black group-hover:bg-indigo-50 dark:bg-gray-900 dark:border-white dark:group-hover:bg-gray-800"></span>
              <span className="relative text-black dark:text-white"> {btnText}</span>
            </Link>

            {children && <div className="mt-6">{children}</div>}
          </div>
        </div>

        {/* Right - Scrollable Thumbnails */}
        <div className="flex flex-col">
          <div
            className={`flex flex-col gap-4 ${
              showAll ? 'max-h-[100%] overflow-y-auto' : 'max-h-[380px] overflow-hidden'
            }`}
          >
            {displayThumbnails.map((src, idx) => (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                className="relative h-48 w-full overflow-hidden shadow-md cursor-pointer  bg-black opacity-100 z-10 transition-opacity duration-300 hover:opacity-40"
                onClick={() => openImage(idx + 1)}
                onKeyDown={(e) => e.key === 'Enter' && openImage(idx + 1)}
                aria-label={`View thumbnail ${idx + 2}`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${idx + 2}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={generatePlaceholder()}
                  className="object-cover"
                  loading="lazy" // Lazy load thumbnails
                />
              </div>
            ))}
          </div>

          {thumbnails.length > 2 && (
            <button
              className="my-5 cursor-pointer relative inline-block no-underline font-medium group py-3 px-6"
              onClick={toggleShowAll}
              aria-expanded={showAll}
            >
              <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-white"></span>
              <span className="absolute inset-0 w-full h-full bg-white border border-black group-hover:bg-indigo-50 dark:bg-gray-900 dark:border-white dark:group-hover:bg-gray-800"></span>
              <span className="relative text-black dark:text-white">
                {showAll ? 'Show less' : `Show all images (${thumbnails.length})`}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Modal Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image lightbox"
          aria-modal="true"
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={images[selectedIndex]}
              alt={`Enlarged image ${selectedIndex + 1}`}
              width={1200}
              height={800}
              sizes="90vw"
              className="max-h-[90vh] max-w-[90vw] object-contain"
              priority
            />
            <button
              className="absolute -top-12 right-0 text-3xl text-white p-2 hover:bg-white/10 rounded"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </div>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors"
                onClick={prevImage}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors"
                onClick={nextImage}
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
