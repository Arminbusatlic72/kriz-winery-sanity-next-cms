import '@/app/globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {toPlainText} from 'next-sanity'

import {setRequestLocale} from 'next-intl/server'
import {NextIntlClientProvider, hasLocale} from 'next-intl'
import {notFound} from 'next/navigation'
import {routing} from '@/i18n/routing'

import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import SectionContainer from '@/app/components/SectionContainer'
import * as demo from '@/sanity/lib/demo'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import ClientToaster from '@/app/components/ClientToaster'

import {ThemeProviders} from '../theme-providers'

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

type Props = {
  children: React.ReactNode
  params: Promise<{locale: string}>
}
export async function generateMetadata(): Promise<Metadata> {
  const fallbackSettings = {
    title: demo.title,
    description: demo.description,
    ogImage: undefined,
  }

  const settings = await Promise.race([
    sanityFetch({
      query: settingsQuery,
      stega: false,
    })
      .then((result) => result.data)
      .catch(() => fallbackSettings),
    new Promise<typeof fallbackSettings>((resolve) =>
      setTimeout(() => resolve(fallbackSettings), 2000),
    ),
  ])

  const title = settings?.title || demo.title
  const description = settings?.description || demo.description

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    icons: {
      icon: '/static/images/logo/kriz-favicon.jpg',
      shortcut: '/static/images/logo/kriz-favicon.jpg',
      apple: '/static/images/logo/kriz-favicon.jpg',
    },
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default async function RootLayout({children, params}: Props) {
  const {locale} = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)
  let messages
  try {
    messages = (await import(`@/messages/${locale}.json`)).default
  } catch {
    notFound()
  }

  const clientMessages = {
    nav: messages?.nav ?? [],
  }

  return (
    <html lang={locale} className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head></head>
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <SectionContainer>
            <section className="min-h-screen flex flex-col">
              <ClientToaster />
              <NextIntlClientProvider locale={locale} messages={clientMessages}>
                <Header locale={locale} navLinks={clientMessages.nav} />
                <main className="flex-grow">{children}</main>
                <Footer />
              </NextIntlClientProvider>
            </section>
          </SectionContainer>
          <SpeedInsights />
        </ThemeProviders>
      </body>
    </html>
  )
}
