'use client'

import {useState, useEffect, Fragment, useMemo, useCallback} from 'react'
import {Menu, MenuButton, MenuItem, MenuItems, Transition} from '@headlessui/react'
import {useParams as useNextParams} from 'next/navigation'
import {usePathname, useRouter} from '@/i18n/navigation'
import BritishFlag from '@/app/components/language-icons/BritishFlag'
import CroatianFlag from '@/app/components/language-icons/CroatianFlag'

interface LocalizedSlugs {
  _type: 'product' | 'post' | 'category'
  en: string
  hr: string
}

type PageType = 'product' | 'post' | 'category' | 'other'
type Locale = 'en' | 'hr'

const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useNextParams()

  const currentLocale = params.locale as Locale
  const slug = params.slug as string | undefined
  const categorySlug = params.category as string | undefined

  const [localizedSlugs, setLocalizedSlugs] = useState<LocalizedSlugs | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Memoized page type detection
  const pageInfo = useMemo(() => {
    const isProductPage = pathname.startsWith('/products') || pathname.startsWith('/proizvodi')
    const isPostPage = pathname.startsWith('/posts') || pathname.startsWith('/postovi')
    const isCategoryPage =
      pathname.startsWith('/posts/category/') || pathname.startsWith('/postovi/kategorija')

    let pageType: PageType = 'other'
    let activeSlug: string | undefined = undefined

    if (isProductPage) {
      pageType = 'product'
      activeSlug = slug
    } else if (isPostPage && !isCategoryPage) {
      pageType = 'post'
      activeSlug = slug
    } else if (isCategoryPage) {
      pageType = 'category'
      activeSlug = categorySlug
    }

    return {
      pageType,
      activeSlug,
      needsLocalization: activeSlug && pageType !== 'other',
    }
  }, [pathname, slug, categorySlug])

  // Memoized path builder
  const getTargetPath = useCallback(
    (pageType: PageType, newLocale: Locale, targetSlug: string): string => {
      const paths = {
        product: {
          en: `/products/${targetSlug}`,
          hr: `/proizvodi/${targetSlug}`,
        },
        post: {
          en: `/posts/${targetSlug}`,
          hr: `/postovi/${targetSlug}`,
        },
        category: {
          en: `/posts/category/${targetSlug}`,
          hr: `/postovi/kategorija/${targetSlug}`,
        },
      }

      return paths[pageType as keyof typeof paths]?.[newLocale] || `/${targetSlug}`
    },
    [],
  )

  // Fetch localized slugs with better error handling
  useEffect(() => {
    if (!pageInfo.needsLocalization) {
      setLocalizedSlugs(null)
      setError(null)
      return
    }

    let isCancelled = false

    const fetchLocalizedSlugs = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/localized-slug?slug=${encodeURIComponent(pageInfo.activeSlug!)}&type=${pageInfo.pageType}`,
        )

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const data: LocalizedSlugs = await response.json()

        if (!isCancelled) {
          setLocalizedSlugs(data)
        }
      } catch (err) {
        if (!isCancelled) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error'
          console.error('Error fetching localized slugs:', errorMessage)
          setError(errorMessage)
          setLocalizedSlugs(null)
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    fetchLocalizedSlugs()

    // Cleanup function to prevent memory leaks
    return () => {
      isCancelled = true
    }
  }, [pageInfo.needsLocalization, pageInfo.activeSlug, pageInfo.pageType])

  // Optimized language change handler
  const changeLanguage = useCallback(
    (newLocale: Locale) => {
      if (!pageInfo.needsLocalization || !localizedSlugs) {
        // Fallback navigation for pages without localized content
        router.replace(
          {pathname, params: params as Record<string, string | string[]>},
          {locale: newLocale},
        )
        return
      }

      const targetSlug = localizedSlugs[newLocale]

      if (!targetSlug) {
        console.warn(`No ${newLocale} slug found, falling back to current path`)
        router.replace(
          {pathname, params: params as Record<string, string | string[]>},
          {locale: newLocale},
        )
        return
      }

      const targetPath = getTargetPath(pageInfo.pageType, newLocale, targetSlug)
      router.replace(targetPath, {locale: newLocale})
    },
    [pageInfo, localizedSlugs, pathname, params, router, getTargetPath],
  )

  // Determine if buttons should be disabled
  const shouldDisableButton = pageInfo.needsLocalization && (loading || !!error)

  // Flag component mapping
  const FlagIcon = currentLocale === 'en' ? BritishFlag : CroatianFlag

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center space-x-2 transition-colors duration-200"
        disabled={shouldDisableButton}
      >
        <FlagIcon width={24} height={16} />
        {loading && (
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary-500" />
        )}
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
          <div className="p-1">
            <MenuItem>
              {({active}) => (
                <button
                  className={`${
                    active ? 'bg-primary-600 text-white' : 'text-gray-900 dark:text-gray-100'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={() => changeLanguage('en')}
                  disabled={shouldDisableButton}
                  aria-label="Switch to English"
                >
                  <BritishFlag width={20} height={14} />
                  <span className="ml-3">English</span>
                </button>
              )}
            </MenuItem>

            <MenuItem>
              {({active}) => (
                <button
                  className={`${
                    active ? 'bg-primary-600 text-white' : 'text-gray-900 dark:text-gray-100'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={() => changeLanguage('hr')}
                  disabled={shouldDisableButton}
                  aria-label="Switch to Croatian"
                >
                  <CroatianFlag width={20} height={14} />
                  <span className="ml-3">Croatian</span>
                </button>
              )}
            </MenuItem>
          </div>

          {error && (
            <div className="px-2 py-1 text-xs text-red-500 dark:text-red-400 border-t border-gray-200 dark:border-gray-600">
              Failed to load translations
            </div>
          )}
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default LanguageSwitcher
