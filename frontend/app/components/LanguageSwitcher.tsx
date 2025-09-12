'use client'

import {useState, useEffect, Fragment} from 'react'
import {Menu, MenuButton, MenuItem, MenuItems, Transition} from '@headlessui/react'
import {useParams as useNextParams} from 'next/navigation'
import {usePathname, useRouter} from '@/i18n/navigation'
import BritishFlag from '@/app/components/language-icons/BritishFlag'
import CroatianFlag from '@/app/components/language-icons/CroatianFlag'

interface LocalizedSlugs {
  _type: string
  en: string
  hr: string
}

const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()

  const params = useNextParams()
  const currentLocale = params.locale as 'en' | 'hr'
  const productSlug = params.slug as string | undefined

  const [localizedSlugs, setLocalizedSlugs] = useState<LocalizedSlugs | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetch localized slugs if we are on a product page
  useEffect(() => {
    if (!productSlug) return

    const isProductPage = pathname.startsWith('/products') || pathname.startsWith('/proizvodi')
    const isPostPage = pathname.startsWith('/posts') || pathname.startsWith('/postovi')
    console.log(isProductPage)
    if (!isProductPage && !isPostPage) return
    const fetchLocalizedSlugs = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/localized-slug?slug=${productSlug}`)
        if (!res.ok) throw new Error('Failed to fetch localized slugs')

        const data: LocalizedSlugs = await res.json()
        setLocalizedSlugs(data)
      } catch (error) {
        console.error('Error fetching localized slugs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLocalizedSlugs()
  }, [productSlug])

  const changeLanguage = (newLocale: 'en' | 'hr') => {
    if (productSlug && localizedSlugs) {
      const targetSlug = localizedSlugs[newLocale]
      router.replace(
        {
          pathname: `/products/[slug]`,
          params: {...params, slug: targetSlug},
        },
        {locale: newLocale},
      )
    } else {
      router.replace(
        {pathname, params: params as Record<string, string | string[]>},
        {locale: newLocale},
      )
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center space-x-2">
        {currentLocale === 'en' ? (
          <BritishFlag width={24} height={16} />
        ) : (
          <CroatianFlag width={24} height={16} />
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
        <MenuItems className="absolute right-0 z-50 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
          <div className="p-1">
            <MenuItem>
              {({active}) => (
                <button
                  className={`${
                    active ? 'bg-primary-600 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => changeLanguage('en')}
                  disabled={!!productSlug && (!localizedSlugs || loading)}
                >
                  <BritishFlag width={24} height={16} />
                  <span className="ml-2">English</span>
                </button>
              )}
            </MenuItem>

            <MenuItem>
              {({active}) => (
                <button
                  className={`${
                    active ? 'bg-primary-600 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => changeLanguage('hr')}
                  disabled={!!productSlug && (!localizedSlugs || loading)}
                >
                  <CroatianFlag width={24} height={16} />
                  <span className="ml-2">Croatian</span>
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default LanguageSwitcher
