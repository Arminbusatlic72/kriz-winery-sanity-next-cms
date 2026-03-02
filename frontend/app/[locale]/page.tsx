
import {getTranslations} from 'next-intl/server'

import HomeLayout from '@/app/layouts/HomeLayout'

export default async function Page() {
  // const t = useTranslations('Home')
  const t = await getTranslations('Home')
  return (
    <HomeLayout title={t('title')} description={t('description')} />

   
  )
}
