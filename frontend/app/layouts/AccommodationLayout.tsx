



// 'use client'

// import {ReactNode, useState, useCallback, useEffect} from 'react'
// import Image from 'next/image'
// import Link from 'next/link'

// interface Accommodation {
//   title: string
//   description: ReactNode
//   amenitiesTitle: string
//   amenities: string
//   images: string[]
//   btnText: string
//   btnUrl: string
// }

// interface Props {
//   children?: ReactNode
//   content: Accommodation
//   locale: string
// }

// export default function AccommodationLayout({content, children, locale}: Props) {
//   const {title, description, amenitiesTitle, amenities, images, btnUrl, btnText} = content
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
//   const [showAll, setShowAll] = useState(false)

//   const thumbnails = images.slice(1)
//   const displayThumbnails = showAll ? thumbnails : thumbnails.slice(0, 2)

//   const handleKeyDown = useCallback(
//     (e: KeyboardEvent) => {
//       if (selectedIndex === null) return

//       if (e.key === 'Escape') {
//         setSelectedIndex(null)
//       } else if (e.key === 'ArrowLeft') {
//         setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length)
//       } else if (e.key === 'ArrowRight') {
//         setSelectedIndex((prev) => (prev! + 1) % images.length)
//       }
//     },
//     [selectedIndex, images.length],
//   )

//   useEffect(() => {
//     if (selectedIndex !== null) {
//       document.addEventListener('keydown', handleKeyDown)
//       document.body.style.overflow = 'hidden'
//     }

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown)
//       document.body.style.overflow = 'unset'
//     }
//   }, [selectedIndex, handleKeyDown])

//   const prevImage = useCallback(
//     (e?: React.MouseEvent) => {
//       e?.stopPropagation()
//       setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length)
//     },
//     [images.length],
//   )

//   const nextImage = useCallback(
//     (e?: React.MouseEvent) => {
//       e?.stopPropagation()
//       setSelectedIndex((prev) => (prev! + 1) % images.length)
//     },
//     [images.length],
//   )

//   const closeLightbox = useCallback(() => {
//     setSelectedIndex(null)
//   }, [])

//   const openImage = useCallback((index: number) => {
//     setSelectedIndex(index)
//   }, [])

//   const toggleShowAll = useCallback(() => {
//     setShowAll((prev) => !prev)
//   }, [])

//   const localizedBtnUrl = `/${locale}${btnUrl.startsWith('/') ? btnUrl : '/' + btnUrl}`

//   return (
//     <div className="divide-y divide-gray-200 dark:divide-gray-700">
//       {/* Header */}
//       <div className="space-y-2 pt-6 pb-5 lg:pb-8 md:space-y-5">
//         <h1 className="font-strangelove text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
//           {title}
//         </h1>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 gap-4 pt-8 lg:grid-cols-3 lg:gap-6">
//         {/* Left Column - Main Image & Content */}
//         <div className="flex flex-col gap-6 lg:col-span-2">
//           {/* Main Image */}
//           {images[0] && (
//             <button
//               type="button"
//               className="relative h-96 w-full overflow-hidden shadow-md cursor-pointer group"
//               onClick={() => openImage(0)}
//               aria-label="View main accommodation image"
//             >
//               <Image
//                 src={images[0]}
//                 alt="Main accommodation"
//                 fill
//                 sizes="(max-width: 1024px) 100vw, 66vw"
//                 className="object-cover transition-opacity duration-300 group-hover:opacity-90"
//                 priority
//               />
//             </button>
//           )}

//           {/* Description & Amenities */}
//           <div className="prose dark:prose-invert max-w-none">
//             <div className="mb-4 text-lg text-gray-700 dark:text-gray-300">{description}</div>

//             {amenities && (
//               <>
//                 <h2 className="mb-2 text-2xl font-semibold">{amenitiesTitle}</h2>
//                 <p className="mb-4 text-gray-700 dark:text-gray-300">{amenities}</p>
//               </>
//             )}

//             {/* CTA Button */}
//             <Link
//               href={localizedBtnUrl}
//               className="cursor-pointer relative inline-block no-underline font-medium group py-3 px-6"
//             >
//               <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-white"></span>
//               <span className="absolute inset-0 w-full h-full bg-white border border-black group-hover:bg-indigo-50 dark:bg-gray-900 dark:border-white dark:group-hover:bg-gray-800"></span>
//               <span className="relative text-black dark:text-white">{btnText}</span>
//             </Link>

//             {children && <div className="mt-6">{children}</div>}
//           </div>
//         </div>

//         {/* Right Column - Thumbnail Gallery */}
//         <div className="flex flex-col">
//           <div
//             className={`flex flex-col gap-4 ${
//               showAll ? 'max-h-[100%] overflow-y-auto' : 'max-h-[380px] overflow-hidden'
//             }`}
//           >
//             {displayThumbnails.map((src, idx) => (
//               <button
//                 key={idx}
//                 type="button"
//                 className="relative h-48 w-full overflow-hidden shadow-md cursor-pointer group"
//                 onClick={() => openImage(idx + 1)}
//                 aria-label={`View image ${idx + 2}`}
//               >
//                 <Image
//                   src={src}
//                   alt={`Accommodation image ${idx + 2}`}
//                   fill
//                   sizes="(max-width: 1024px) 100vw, 33vw"
//                   className="object-cover transition-opacity duration-300 group-hover:opacity-90"
//                 />
//               </button>
//             ))}
//           </div>

//           {/* Show All/Less Button */}
//           {thumbnails.length > 2 && (
//             <button
//               type="button"
//               className="my-5 cursor-pointer relative inline-block no-underline font-medium group py-3 px-6"
//               onClick={toggleShowAll}
//               aria-expanded={showAll}
//               aria-label={showAll ? 'Show less images' : `Show all ${thumbnails.length} images`}
//             >
//               <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-white"></span>
//               <span className="absolute inset-0 w-full h-full bg-white border border-black group-hover:bg-indigo-50 dark:bg-gray-900 dark:border-white dark:group-hover:bg-gray-800"></span>
//               <span className="relative text-black dark:text-white">
//                 {showAll ? 'Show less' : `Show all images (${thumbnails.length})`}
//               </span>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Modal Lightbox */}
//       {selectedIndex !== null && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-pointer"
//           onClick={closeLightbox}
//           role="dialog"
//           aria-label="Image lightbox"
//           aria-modal="true"
//         >
//           <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
//             <Image
//               src={images[selectedIndex]}
//               alt={`Accommodation image ${selectedIndex + 1}`}
//               width={1200}
//               height={800}
//               sizes="90vw"
//               className="max-h-[90vh] max-w-[90vw] object-contain"
//               priority
//             />
            
//             {/* Close Button */}
//             <button
//               type="button"
//               className="absolute -top-12 right-0 text-3xl text-white p-2 hover:bg-white/10 rounded cursor-pointer transition-colors"
//               onClick={closeLightbox}
//               aria-label="Close lightbox"
//             >
//               ✕
//             </button>
//           </div>

//           {/* Navigation Arrows */}
//           {images.length > 1 && (
//             <>
//               <button
//                 type="button"
//                 className="absolute left-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors cursor-pointer"
//                 onClick={prevImage}
//                 aria-label="Previous image"
//               >
//                 ‹
//               </button>
//               <button
//                 type="button"
//                 className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors cursor-pointer"
//                 onClick={nextImage}
//                 aria-label="Next image"
//               >
//                 ›
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }






// 'use client'

// import {ReactNode, useState, useCallback, useEffect} from 'react'
// import Image from 'next/image'
// import Link from 'next/link'

// interface Accommodation {
//   title: string
//   description: ReactNode
//   amenitiesTitle: string
//   amenities: string
//   images: string[]
//   btnText: string
//   btnUrl: string
// }

// interface Props {
//   children?: ReactNode
//   content: Accommodation
//   locale: string
// }

// // Simple SVG icons as components
// const BedIcon = () => (
//   <svg
//     className="
//       w-5 h-5
//       transition
//       duration-200
//       ease-out
//       text-gray-600 dark:text-gray-300
//       group-hover:text-primary
//       group-hover:scale-110
//     "
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M3 12h18M3 12v7a2 2 0 002 2h14a2 2 0 002-2v-7M3 12V9a2 2 0 012-2h14a2 2 0 012 2v3M8 12V9m8 3V9"
//     />
//   </svg>
// )

// const WifiIcon = () => (
//   <svg
//     className="
//       w-5 h-5
//       transition
//       duration-200
//       ease-out
//       text-gray-600 dark:text-gray-300
//       group-hover:text-primary
//       group-hover:scale-110
//     "
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
//     />
//   </svg>
// )


// const KitchenIcon = () => (
//   <svg
//     className="
//       w-5 h-5
//       transition
//       duration-200
//       ease-out
//       text-gray-600 dark:text-gray-300
//       group-hover:text-primary
//       group-hover:scale-110
//     "
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={2}
//     viewBox="0 0 24 24"
//   >
//     <path d="M4 3v7a2 2 0 002 2v9" />
//     <path d="M8 3v7a2 2 0 01-2 2" />
//     <path d="M14 3v18" />
//     <path d="M18 3v6a3 3 0 01-3 3" />
//   </svg>
// )







// const BarbecueIcon = () => (
//   <svg
//     className="
//       w-5 h-5
//       transition
//       duration-200
//       ease-out
//       text-gray-600 dark:text-gray-300
//       group-hover:text-primary
//       group-hover:scale-110
//     "
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
//     />
//   </svg>
// )

// const CarIcon = () => (
//   <svg
//     className="
//       w-5 h-5
//       transition
//       duration-200
//       ease-out
//       text-gray-600 dark:text-gray-300
//       group-hover:text-primary
//       group-hover:scale-110
//     "
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h6m-5-3h4M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
//     />
//   </svg>
// )

// // Amenity icon mapping for both English and Croatian
// const getAmenityIcon = (amenity: string): ReactNode => {
//   const lowerAmenity = amenity.toLowerCase()
  
//   // Bedroom / Spavaća soba
//   if (lowerAmenity.includes('bedroom') || lowerAmenity.includes('bed') || 
//       lowerAmenity.includes('spavać') || lowerAmenity.includes('soba')) {
//     return <BedIcon />
//   }
//   // Wi-Fi
//   if (lowerAmenity.includes('wi-fi') || lowerAmenity.includes('wifi')) {
//     return <WifiIcon />
//   }
//   // Kitchen / Kuhinja
//   if (lowerAmenity.includes('kitchen') || lowerAmenity.includes('kuhinja')) {
//     return <KitchenIcon />
//   }
//   // Terrace / Barbecue / Terasa / Roštilj
//   if (lowerAmenity.includes('terrace') || lowerAmenity.includes('barbecue') || 
//       lowerAmenity.includes('terasa') || lowerAmenity.includes('roštilj')) {
//     return <BarbecueIcon />
//   }
//   // Parking
//   if (lowerAmenity.includes('parking')) {
//     return <CarIcon />
//   }
  
//   // Default checkmark icon
//   return (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//     </svg>
//   )
// }

// export default function AccommodationLayout({content, children, locale}: Props) {
//   const {title, description, amenitiesTitle, amenities, images, btnUrl, btnText} = content
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
//   const [showAll, setShowAll] = useState(false)

//   const thumbnails = images.slice(1)
//   const displayThumbnails = showAll ? thumbnails : thumbnails.slice(0, 2)

//   // Parse amenities into array
//   const amenitiesList = amenities.split(',').map(a => a.trim())

//   const handleKeyDown = useCallback(
//     (e: KeyboardEvent) => {
//       if (selectedIndex === null) return

//       if (e.key === 'Escape') {
//         setSelectedIndex(null)
//       } else if (e.key === 'ArrowLeft') {
//         setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length)
//       } else if (e.key === 'ArrowRight') {
//         setSelectedIndex((prev) => (prev! + 1) % images.length)
//       }
//     },
//     [selectedIndex, images.length],
//   )

//   useEffect(() => {
//     if (selectedIndex !== null) {
//       document.addEventListener('keydown', handleKeyDown)
//       document.body.style.overflow = 'hidden'
//     }

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown)
//       document.body.style.overflow = 'unset'
//     }
//   }, [selectedIndex, handleKeyDown])

//   const prevImage = useCallback(
//     (e?: React.MouseEvent) => {
//       e?.stopPropagation()
//       setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length)
//     },
//     [images.length],
//   )

//   const nextImage = useCallback(
//     (e?: React.MouseEvent) => {
//       e?.stopPropagation()
//       setSelectedIndex((prev) => (prev! + 1) % images.length)
//     },
//     [images.length],
//   )

//   const closeLightbox = useCallback(() => {
//     setSelectedIndex(null)
//   }, [])

//   const openImage = useCallback((index: number) => {
//     setSelectedIndex(index)
//   }, [])

//   const toggleShowAll = useCallback(() => {
//     setShowAll((prev) => !prev)
//   }, [])

//   const localizedBtnUrl = `/${locale}${btnUrl.startsWith('/') ? btnUrl : '/' + btnUrl}`

//   return (
//     <div className="divide-y divide-gray-200 dark:divide-gray-700">
//       {/* Header */}
//       <div className="space-y-2 pt-6 pb-5 lg:pb-8 md:space-y-5">
//         <h2 className="font-strangelove text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
//           {title}
//         </h2>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 gap-4 pt-8 lg:grid-cols-3 lg:gap-6">
//         {/* Left Column - Main Image & Content */}
//         <div className="flex flex-col gap-6 lg:col-span-2">
//           {/* Main Image */}
//           {images[0] && (
//             <button
//               type="button"
//               className="relative h-96 w-full overflow-hidden shadow-md cursor-pointer group"
//               onClick={() => openImage(0)}
//               aria-label="View main accommodation image"
//             >
//               <Image
//                 src={images[0]}
//                 alt="Main accommodation"
//                 fill
//                 sizes="(max-width: 1024px) 100vw, 66vw"
//                 className="object-cover transition-opacity duration-300 group-hover:opacity-90"
//                 priority
//               />
//             </button>
//           )}

//           {/* Description & Amenities */}
//           <div className="prose dark:prose-invert max-w-none">
//             <div className="mb-4 text-lg text-gray-700 dark:text-gray-300">{description}</div>

//             {amenities && (
//               <div className="mb-6 not-prose">
//                 <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">{amenitiesTitle}</h2>
//                 {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {amenitiesList.map((amenity, idx) => (
//                     <div 
//                       key={idx}
//                       className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
//                     >
//                       <div className="flex-shrink-0 text-gray-900 dark:text-gray-100">
//                         {getAmenityIcon(amenity)}
//                       </div>
//                       <span className="text-gray-700 dark:text-gray-300">{amenity}</span>
//                     </div>
//                   ))}
//                 </div> */}

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//   {amenitiesList.map((amenity, idx) => (
//     <div
//       key={idx}
//       className="
//         group
//         flex items-center gap-3 p-3
//          border
//         bg-gray-50 dark:bg-gray-800
//         border-gray-200 dark:border-gray-700

//         transition
//         duration-200
//         ease-out

//         hover:bg-white dark:hover:bg-gray-750
//         hover:border-primary/40
//         hover:-translate-y-0.5
//         hover:shadow-sm
//       "
//     >
//       <div className="flex-shrink-0">
//         {getAmenityIcon(amenity)}
//       </div>

//       <span
//         className="
//           text-gray-700 dark:text-gray-300
//           transition-colors
//           group-hover:text-gray-900 dark:group-hover:text-white
//         "
//       >
//         {amenity}
//       </span>
//     </div>
//   ))}
// </div>

//               </div>
//             )}

//             {/* CTA Button */}
//             <Link
//               href={localizedBtnUrl}
//               className="cursor-pointer relative inline-block no-underline font-medium group py-3 px-6"
//             >
//               <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-white"></span>
//               <span className="absolute inset-0 w-full h-full bg-white border border-black group-hover:bg-indigo-50 dark:bg-gray-900 dark:border-white dark:group-hover:bg-gray-800"></span>
//               <span className="relative text-black dark:text-white">{btnText}</span>
//             </Link>

//             {children && <div className="mt-6">{children}</div>}
//           </div>
//         </div>

//         {/* Right Column - Thumbnail Gallery */}
//         <div className="flex flex-col">
//           <div
//             className={`flex flex-col gap-4 ${
//               showAll ? 'max-h-[100%] overflow-y-auto' : 'max-h-[380px] overflow-hidden'
//             }`}
//           >
//             {displayThumbnails.map((src, idx) => (
//               <button
//                 key={idx}
//                 type="button"
//                 className="relative h-48 w-full overflow-hidden shadow-md cursor-pointer group"
//                 onClick={() => openImage(idx + 1)}
//                 aria-label={`View image ${idx + 2}`}
//               >
//                 <Image
//                   src={src}
//                   alt={`Accommodation image ${idx + 2}`}
//                   fill
//                   sizes="(max-width: 1024px) 100vw, 33vw"
//                   className="object-cover transition-opacity duration-300 group-hover:opacity-90"
//                 />
//               </button>
//             ))}
//           </div>

//           {/* Show All/Less Button */}
//           {thumbnails.length > 2 && (
//             <button
//               type="button"
//               className="my-5 cursor-pointer relative inline-block no-underline font-medium group py-3 px-6"
//               onClick={toggleShowAll}
//               aria-expanded={showAll}
//               aria-label={showAll ? 'Show less images' : `Show all ${thumbnails.length} images`}
//             >
//               <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-white"></span>
//               <span className="absolute inset-0 w-full h-full bg-white border border-black group-hover:bg-indigo-50 dark:bg-gray-900 dark:border-white dark:group-hover:bg-gray-800"></span>
//               <span className="relative text-black dark:text-white">
//                 {showAll ? 'Show less' : `Show all images (${thumbnails.length})`}
//               </span>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Modal Lightbox */}
//       {selectedIndex !== null && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-pointer"
//           onClick={closeLightbox}
//           role="dialog"
//           aria-label="Image lightbox"
//           aria-modal="true"
//         >
//           <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
//             <Image
//               src={images[selectedIndex]}
//               alt={`Accommodation image ${selectedIndex + 1}`}
//               width={1200}
//               height={800}
//               sizes="90vw"
//               className="max-h-[90vh] max-w-[90vw] object-contain"
//               priority
//             />
            
//             {/* Close Button */}
//             <button
//               type="button"
//               className="absolute -top-12 right-0 text-3xl text-white p-2 hover:bg-white/10 rounded cursor-pointer transition-colors"
//               onClick={closeLightbox}
//               aria-label="Close lightbox"
//             >
//               ✕
//             </button>
//           </div>

//           {/* Navigation Arrows */}
//           {images.length > 1 && (
//             <>
//               <button
//                 type="button"
//                 className="absolute left-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors cursor-pointer"
//                 onClick={prevImage}
//                 aria-label="Previous image"
//               >
//                 ‹
//               </button>
//               <button
//                 type="button"
//                 className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-3 text-2xl text-white hover:bg-black/50 transition-colors cursor-pointer"
//                 onClick={nextImage}
//                 aria-label="Next image"
//               >
//                 ›
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }




'use client'

import { ReactNode, useState, useCallback, useEffect } from 'react'

import MainImage from '@/app/components/accommodation/MainImage'
import ThumbnailGallery from '@/app/components/accommodation/ThumbnailGallery'
import ImageLightbox from '@/app/components/accommodation/ImageLightbox'
import AmenitiesList from '@/app/components/accommodation/AmenitiesList'
import CTALink from '@/app/components/accommodation/CTALink'

interface Accommodation {
  title: string
  description: ReactNode
  amenitiesTitle: string
  amenities: string
  images: string[]
  btnText: string
  btnUrl: string
}

interface Props {
  children?: ReactNode
  content: Accommodation
  locale: string
}

export default function AccommodationLayout({ content, children, locale }: Props) {
  const { title, description, amenitiesTitle, amenities, images, btnUrl, btnText } = content
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  
  const localizedBtnUrl = `/${locale}${btnUrl.startsWith('/') ? btnUrl : '/' + btnUrl}`
  const thumbnails = images.slice(1)

  const openImage = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length)
  }, [images.length])

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev! + 1) % images.length)
  }, [images.length])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === null) return
    if (e.key === 'Escape') closeLightbox()
    else if (e.key === 'ArrowLeft') prevImage()
    else if (e.key === 'ArrowRight') nextImage()
  }, [selectedIndex, closeLightbox, prevImage, nextImage])

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

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Header */}
      <div className="space-y-2 pt-6 pb-5 lg:pb-8 md:space-y-5">
        <h2 className="font-strangelove text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
          {title}
        </h2>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 pt-8 lg:grid-cols-3 lg:gap-6">
        {/* Left Column - Main Image & Content */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Main Image */}
          {images[0] && (
            <MainImage 
              src={images[0]} 
              onClick={() => openImage(0)}
            />
          )}

          {/* Description & Amenities */}
          <div className="prose dark:prose-invert max-w-none">
            <div className="mb-4 text-lg text-gray-700 dark:text-gray-300">
              {description}
            </div>

            {amenities && (
              <AmenitiesList 
                amenitiesTitle={amenitiesTitle} 
                amenities={amenities} 
              />
            )}

            {/* CTA Button */}
            <CTALink href={localizedBtnUrl}>
              {btnText}
            </CTALink>

            {children && <div className="mt-6">{children}</div>}
          </div>
        </div>

        {/* Right Column - Thumbnail Gallery */}
        <div className="lg:col-span-1">
          <ThumbnailGallery 
            images={thumbnails}
            onThumbnailClick={(index) => openImage(index + 1)}
          />
        </div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={images}
        selectedIndex={selectedIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </div>
  )
}