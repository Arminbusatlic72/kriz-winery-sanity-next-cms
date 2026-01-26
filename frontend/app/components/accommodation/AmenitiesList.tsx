'use client'

import AmenityItem from './AmenityItem'

interface AmenitiesListProps {
  amenitiesTitle: string
  amenities: string
}

export default function AmenitiesList({amenitiesTitle, amenities}: AmenitiesListProps) {
  const amenitiesList = amenities.split(',').map((a) => a.trim())

  return (
    <div className="mb-6 not-prose">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {amenitiesTitle}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {amenitiesList.map((amenity, idx) => (
          <AmenityItem key={`${amenity}-${idx}`} amenity={amenity} />
        ))}
      </div>
    </div>
  )
}
