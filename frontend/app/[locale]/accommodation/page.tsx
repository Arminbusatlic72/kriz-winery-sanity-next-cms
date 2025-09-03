import AccommodationLayout from '@/app/layouts/AccommodationLayout'
import {getTranslations} from 'next-intl/server'
export default async function AccommodationPage() {
  const t = await getTranslations('Accommodation')

  return (
    <AccommodationLayout
      content={{
        title: t('title'),
        description: t('description'),
        amenities: t('amenities'),
        images: [
          '/static/images/winery/Vinarija-Kriz-272.jpg',
          '/static/images/accommodation/_DSC7100.JPG',
          '/static/images/accommodation/_DSC7102.JPG',
          '/static/images/accommodation/_DSC7110.JPG',
          '/static/images/accommodation/_DSC7100.jpg',
          '/static/images/accommodation/_DSC7102.jpg',
          '/static/images/accommodation/_DSC7110.jpg',
        ],
        btnText: t('btnText'),
        btnUrl: t('btnUrl'),
      }}
    />
  )
}
