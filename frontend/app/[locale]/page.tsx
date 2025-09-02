import {Suspense} from 'react'
import Link from 'next/link'
import {PortableText} from '@portabletext/react'
// import {useTranslations} from 'next-intl'

// import {AllPosts} from '@/app/components/Posts'
import {getTranslations} from 'next-intl/server'
import GetStartedCode from '@/app/components/GetStartedCode'
import SideBySideIcons from '@/app/components/SideBySideIcons'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

import HomeLayout from '@/app/layouts/HomeLayout'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })
  // const t = useTranslations('Home')
  const t = await getTranslations('Home')
  return (
    <HomeLayout title={t('title')} description={t('description')} />

    /* <div className="border-t border-gray-100 bg-gray-50 hello">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>{await AllPosts()}</Suspense>
          </aside>
        </div>
      </div> */
  )
}
