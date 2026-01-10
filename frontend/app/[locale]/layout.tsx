import '@/app/globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {draftMode} from 'next/headers'
import {VisualEditing} from 'next-sanity/visual-editing'
import {toPlainText} from 'next-sanity'
import {Toaster} from 'sonner'

import {setRequestLocale} from 'next-intl/server'
import {NextIntlClientProvider, hasLocale} from 'next-intl'
import {notFound} from 'next/navigation'
import {routing} from '@/i18n/routing'

import DraftModeToast from '@/app/components/DraftModeToast'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import SectionContainer from '@/app/components/SectionContainer'
import * as demo from '@/sanity/lib/demo'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {handleError} from '../client-utils'

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
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  })
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

export default async function RootLayout({children, params}: Props) {
  const {isEnabled: isDraftMode} = await draftMode()
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

  return (
    <html lang={locale} className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head></head>
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <SectionContainer>
            <section className="min-h-screen flex flex-col">
              <Toaster />
              {isDraftMode && (
                <>
                  <DraftModeToast />
                  <VisualEditing />
                </>
              )}
              <SanityLive onError={handleError} />
              <NextIntlClientProvider locale={locale} messages={messages}>
                <Header locale={locale} />
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
