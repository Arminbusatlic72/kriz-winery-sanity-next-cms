export const revalidate = 60

import type {Metadata} from 'next'
import {Suspense} from 'react'
import WineryLayout from '@/app/layouts/WineryLayout'
import {getTranslations} from 'next-intl/server'
import wineryHeaderImage from '@/public/static/images/winery/Vinarija-Kriz-272.jpg'
import winerySectionImage from '@/public/static/images/winery/Mile-u-Krizu.jpg'
import winerySectionImage1 from '@/public/static/images/winery/Vinarija-Kriz-215.jpg'
import cellarHeaderImage from '@/public/static/images/cellar/cellar-header.jpg'
import cellarHeaderImage1 from '@/public/static/images/cellar/cellar-header1.jpg'
import ProductList from '@/app/components/listings/ProductList'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations('Winery')

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'hr' ? '/hr/vinarija' : '/en/winery',
      languages: {
        en: '/en/winery',
        hr: '/hr/vinarija',
      },
    },
  }
}

export default async function VineyardsPage({params}: PageProps) {
  const {locale} = await params
  const t = await getTranslations('Winery')

  return (
    <section>
      <WineryLayout
        title={t('title')}
        headerImage={wineryHeaderImage}
        sectionImage={winerySectionImage}
        sectionImage1={winerySectionImage1}
        description={t('description')}
        text1={t('section1.text')}
        text2={t('section2.text')}
        title2={t('title2')}
        text21={t('section21.text')}
        text22={t('section22.text')}
        text23={t('section23.text')}
        headerCellarImage={cellarHeaderImage}
        headerCellarImage1={cellarHeaderImage1}
      />

      <div className="space-y-2 pt-6 pb-8 md:space-y-5 mt-5">
        <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
          {t('productsTitle')}
        </h2>
      </div>

      <Suspense
        fallback={
          <section className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({length: 6}).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-md bg-gray-100 dark:bg-neutral-900"
              />
            ))}
          </section>
        }
      >
        <ProductList locale={locale === 'hr' ? 'hr' : 'en'} pathPrefix="proizvodi" />
      </Suspense>
    </section>
  )
}
