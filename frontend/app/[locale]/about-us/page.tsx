import AboutLayout from '@/app/layouts/AboutLayout'
import {getTranslations} from 'next-intl/server'
import {getImagesFromDirectory} from '@/app/lib/get-images'

export default async function AboutPage() {
  const t = await getTranslations('AboutUs')
  const aboutImages = getImagesFromDirectory('static/images/about')

  return (
    <AboutLayout
      content={{
        title: t('title'),
        description: t.rich('description', {
          p: (chunks) => <p>{chunks}</p>
        }),
        images: aboutImages,
      }}
    />
  )
}
