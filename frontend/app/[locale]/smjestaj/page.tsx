import AccommodationLayout from '@/app/layouts/AccommodationLayout'
import {getTranslations} from 'next-intl/server'
import {getImagesFromDirectory} from '@/app/lib/get-images'
export default async function AccommodationPage() {
  const t = await getTranslations('Accommodation')
  const accommodationImages = getImagesFromDirectory('static/images/accommodation')

  return (
    <AccommodationLayout
      content={{
        title: t('title'),
        description: t('description'),
        amenities: t('amenities'),
        images: accommodationImages,
        btnText: t('btnText'),
        btnUrl: t('btnUrl'),
      }}
    />
  )
}
