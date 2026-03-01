import type {Metadata} from 'next'
import AboutLayout from '@/app/layouts/AboutLayout'
import {getTranslations} from 'next-intl/server'
import aboutImage1 from '@/public/static/images/about/Kriz-portreti-vinarija-2022-19.jpg'
import aboutImage2 from '@/public/static/images/about/Vinarija-Kriz-68.jpg'

type Props = {
  params: Promise<{locale: string}>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations('AboutUs')

  return {
    title: t('title'),
    description: t('section1.text'),
    alternates: {
      canonical: locale === 'hr' ? '/hr/nasa-prica' : '/en/about-us',
      languages: {
        en: '/en/about-us',
        hr: '/hr/nasa-prica',
      },
    },
  }
}

export default async function AboutPage() {
  const t = await getTranslations('AboutUs')
  const aboutImages = [aboutImage1, aboutImage2]

  return (
    <AboutLayout
      content={{
        title: t('title'),
        description: t.rich('description', {
          p: (chunks) => <p>{chunks}</p>,
        }),
        images: aboutImages,
      }}
    />
  )
}
