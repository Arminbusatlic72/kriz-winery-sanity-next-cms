'use client'

import {ReactNode} from 'react'
import {BedIcon, WifiIcon, KitchenIcon, BarbecueIcon, CarIcon} from './AmenityIcons'

interface AmenityItemProps {
  amenity: string
}

const getAmenityIcon = (amenity: string): ReactNode => {
  const lowerAmenity = amenity.toLowerCase()

  if (
    lowerAmenity.includes('bedroom') ||
    lowerAmenity.includes('bed') ||
    lowerAmenity.includes('spavać') ||
    lowerAmenity.includes('soba')
  ) {
    return <BedIcon />
  }
  if (lowerAmenity.includes('wi-fi') || lowerAmenity.includes('wifi')) {
    return <WifiIcon />
  }
  if (lowerAmenity.includes('kitchen') || lowerAmenity.includes('kuhinja')) {
    return <KitchenIcon />
  }
  if (
    lowerAmenity.includes('terrace') ||
    lowerAmenity.includes('barbecue') ||
    lowerAmenity.includes('terasa') ||
    lowerAmenity.includes('roštilj')
  ) {
    return <BarbecueIcon />
  }
  if (lowerAmenity.includes('parking')) {
    return <CarIcon />
  }

  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function AmenityItem({amenity}: AmenityItemProps) {
  return (
    <div className="group flex items-center gap-3 p-3 border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition duration-200 ease-out hover:bg-white dark:hover:bg-gray-750 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex-shrink-0">{getAmenityIcon(amenity)}</div>
      <span className="text-gray-700 dark:text-gray-300 transition-colors group-hover:text-gray-900 dark:group-hover:text-white">
        {amenity}
      </span>
    </div>
  )
}
