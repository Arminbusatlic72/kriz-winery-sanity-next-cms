import type {Metadata} from 'next'
import AccommodationLayout from '@/app/layouts/AccommodationLayout'
import {getTranslations} from 'next-intl/server'
import {getImagesFromDirectory} from '@/app/lib/get-images'

type AccommodationPageProps = {
  params: Promise<{locale: string}>
}

export async function generateMetadata({params}: AccommodationPageProps): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations('Accommodation')

  return {
    title: t('title'),
    description: t('amenities'),
    alternates: {
      canonical: locale === 'hr' ? '/hr/smjestaj' : '/en/accommodation',
      languages: {
        en: '/en/accommodation',
        hr: '/hr/smjestaj',
      },
    },
  }
}

export default async function AccommodationPage({params}: AccommodationPageProps) {
  const {locale} = await params

  const t = await getTranslations('Accommodation')
  const accommodationImages = getImagesFromDirectory('static/images/accommodation')

  return (
    <AccommodationLayout
      content={{
        title: t('title'),
        description: t.rich('description', {
          p: (chunks) => <p>{chunks}</p>,
          outro: (chunks) => <span className="font-semibold">{chunks}</span>,
        }),
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
