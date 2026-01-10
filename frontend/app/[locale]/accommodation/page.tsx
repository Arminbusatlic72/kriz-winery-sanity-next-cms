import AccommodationLayout from '@/app/layouts/AccommodationLayout'
import {getTranslations} from 'next-intl/server'
import {getImagesFromDirectory} from '@/app/lib/get-images'

type Props = {
  params: Promise<{slug: string; locale: string}>
}
export default async function AccommodationPage({params}: Props) {
  const {locale} = await params

  const t = await getTranslations('Accommodation')
  const accommodationImages = getImagesFromDirectory('static/images/accommodation')

  return (
    <AccommodationLayout
      content={{
        title: t('title'),
        description: t.rich('description', {
          p: (chunks) => <p>{chunks}</p>,
          outro: (chunks) => <span className="font-semibold">{chunks}</span>
        }),
        amenities: t('amenities'),
        amenitiesTitle: t('amenitiesTitle'),
        images: accommodationImages,
        btnText: t('btnText'),
        btnUrl: t('btnUrl'),
      }}
      locale={locale}
    />
  )
}
