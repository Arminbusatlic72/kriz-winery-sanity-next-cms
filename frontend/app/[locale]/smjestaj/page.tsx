import AccommodationLayout from '@/app/layouts/AccommodationLayout'
import {getTranslations} from 'next-intl/server'
import {getImagesFromDirectory} from '@/app/lib/get-images'

type AccommodationPageProps = {
  params: Promise<{locale: string}>
}
export default async function AccommodationPage({params}: AccommodationPageProps) {
  const {locale} = await params

  const t = await getTranslations('Accommodation')
  const accommodationImages = getImagesFromDirectory('static/images/accommodation')

  return (
    <AccommodationLayout
      content={{
        title: t('title'),
        description: t('description'),
        amenitiesTitle: t('amenitiesTitle'),
        amenities: t('amenities'),
        images: accommodationImages,
        btnText: t('btnText'),
        btnUrl: t('btnUrl'),
      }}
      locale={locale}
    />
  )
}
