// // 'use client'

// // import {Fragment} from 'react'
// // import {Menu, MenuButton, MenuItem, MenuItems, Transition} from '@headlessui/react'
// // import {useRouter, usePathname} from 'next/navigation'

// // import BritishFlag from '@/app/components/language-icons/BritishFlag'
// // import CroatianFlag from '@/app/components/language-icons/CroatianFlag'

// // interface Props {
// //   // Optional: pass product if on a product page
// //   productSlug?: {en: string; hr?: string}
// // }
// // const LanguageSwitcher = () => {
// //   const router = useRouter()
// //   const pathname = usePathname()

// //   const changeLanguage = (locale: string) => {

// //     router.push(`/${locale}${pathname.replace(/^\/(en|hr)/, '')}`)
// //   }
// //   const lang = pathname.startsWith('/hr') ? 'hr' : 'en'

// //   return (
// //     <Menu as="div" className="relative inline-block text-left">
// //       <MenuButton className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center space-x-2">
// //         {lang === 'en' ? (
// //           <BritishFlag width={24} height={16} />
// //         ) : (
// //           <CroatianFlag width={24} height={16} />
// //         )}
// //       </MenuButton>

// //       <Transition
// //         as={Fragment}
// //         enter="transition ease-out duration-100"
// //         enterFrom="transform opacity-0 scale-95"
// //         enterTo="transform opacity-100 scale-100"
// //         leave="transition ease-in duration-75"
// //         leaveFrom="transform opacity-100 scale-100"
// //         leaveTo="transform opacity-0 scale-95"
// //       >
// //         <MenuItems className="absolute right-0 z-50 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
// //           <div className="p-1">
// //             <MenuItem>
// //               {({active}) => (
// //                 <button
// //                   className={`${active ? 'bg-primary-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
// //                   onClick={() => changeLanguage('en')}
// //                 >
// //                   <BritishFlag width={24} height={16} />
// //                   <span className="ml-2">English</span>
// //                 </button>
// //               )}
// //             </MenuItem>

// //             <MenuItem>
// //               {({active}) => (
// //                 <button
// //                   className={`${active ? 'bg-primary-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
// //                   onClick={() => changeLanguage('hr')}
// //                 >
// //                   <CroatianFlag width={24} height={16} />
// //                   <span className="ml-2">Croatian</span>
// //                 </button>
// //               )}
// //             </MenuItem>
// //           </div>
// //         </MenuItems>
// //       </Transition>
// //     </Menu>
// //   )
// // }

// // export default LanguageSwitcher

// 'use client'

// import {Fragment} from 'react'
// import {Menu, MenuButton, MenuItem, MenuItems, Transition} from '@headlessui/react'
// import {useRouter, usePathname} from 'next/navigation'
// import {localizedRoutes} from '@/sanity/lib/routing'
// import {getLocalizedSlug} from '@/sanity/lib/utils'

// import BritishFlag from '@/app/components/language-icons/BritishFlag'
// import CroatianFlag from '@/app/components/language-icons/CroatianFlag'

// interface Props {
//   productSlug?: {en: string; hr?: string} // current product slug
// }

// const LanguageSwitcher = ({productSlug}: Props) => {
//   const router = useRouter()
//   const pathname = usePathname()

//   const currentLocale = pathname.startsWith('/hr') ? 'hr' : 'en'

//   const changeLanguage = (locale: string) => {
//     let newPath = pathname.replace(/^\/(en|hr)/, '')

//     // If we are on a product page
//     if (productSlug) {
//       const localizedSlug = getLocalizedSlug(productSlug, locale)

//       newPath = `/${localizedRoutes.products[locale]}/${localizedSlug}`
//     } else {
//       // Replace base paths for other pages
//       Object.keys(localizedRoutes).forEach((key) => {
//         newPath = newPath.replace(
//           `/${localizedRoutes[key][currentLocale]}`,
//           `/${localizedRoutes[key][locale]}`,
//         )
//       })
//     }

//     router.push(`/${locale}${newPath}`)
//   }

//   return (
//     <Menu as="div" className="relative inline-block text-left">
//       <MenuButton className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center space-x-2">
//         {currentLocale === 'en' ? (
//           <BritishFlag width={24} height={16} />
//         ) : (
//           <CroatianFlag width={24} height={16} />
//         )}
//       </MenuButton>

//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <MenuItems className="absolute right-0 z-50 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
//           <div className="p-1">
//             <MenuItem>
//               {({active}) => (
//                 <button
//                   className={`${active ? 'bg-primary-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   onClick={() => changeLanguage('en')}
//                 >
//                   <BritishFlag width={24} height={16} />
//                   <span className="ml-2">English</span>
//                 </button>
//               )}
//             </MenuItem>

//             <MenuItem>
//               {({active}) => (
//                 <button
//                   className={`${active ? 'bg-primary-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   onClick={() => changeLanguage('hr')}
//                 >
//                   <CroatianFlag width={24} height={16} />
//                   <span className="ml-2">Croatian</span>
//                 </button>
//               )}
//             </MenuItem>
//           </div>
//         </MenuItems>
//       </Transition>
//     </Menu>
//   )
// }

// export default LanguageSwitcher

// 'use client'
// import {useParams as useNextParams} from 'next/navigation'
// import {Fragment} from 'react'
// import {Menu, MenuButton, MenuItem, MenuItems, Transition} from '@headlessui/react'
// import {usePathname, useRouter} from '@/i18n/navigation' // Import from your updated navigation file
// import {getLocalizedSlug} from '@/sanity/lib/utils'

// import BritishFlag from '@/app/components/language-icons/BritishFlag'
// import CroatianFlag from '@/app/components/language-icons/CroatianFlag'

// interface Props {
//   productSlug?: {en: string; hr?: string}
// }

// const LanguageSwitcher = ({productSlug}: Props) => {
//   const router = useRouter()
//   const pathname = usePathname()
//   const params = useNextParams()
//   const currentLocale = pathname.startsWith('/hr') ? 'hr' : 'en'

//   // const changeLanguage = (newLocale: string) => {
//   //   // Check if we are on a product details page
//   //   if (productSlug) {
//   //     const localizedSlug = getLocalizedSlug(productSlug, newLocale)
//   //     router.replace(
//   //       {
//   //         pathname: '/products/[slug]',
//   //         params: {slug: localizedSlug},
//   //       },
//   //       {locale: newLocale},
//   //     )
//   //   } else {
//   //     // For all other pages (dynamic or static), use the current params and pathname
//   //     // `next-intl` will correctly handle static vs dynamic paths
//   //     router.replace({pathname, params}, {locale: newLocale})
//   //     console.log('parametars from swith product', {pathname, params}, {locale: newLocale})
//   //   }
//   // }

//   const changeLanguage = (newLocale: string) => {
//     // If we are on a product page, the `productSlug` prop will be available.
//     if (productSlug) {
//       const localizedSlug = getLocalizedSlug(productSlug, newLocale)

//       // Tell next-intl to replace the `[slug]` in the pathname with the new localized slug.
//       // It will automatically translate the `/products` part based on the `pathnames` config.
//       router.replace(
//         {pathname: '/products/[slug]', params: {slug: localizedSlug}},
//         {locale: newLocale},
//       )
//     } else {
//       // This is for all other pages (dynamic or static).
//       // Since `usePathname` doesn't return the resolved path for dynamic segments,
//       // we need to combine the pathname with the params.
//       router.replace({pathname, params}, {locale: newLocale})
//     }
//   }

//   return (
//     <Menu as="div" className="relative inline-block text-left">
//       <MenuButton className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center space-x-2">
//         {currentLocale === 'en' ? (
//           <BritishFlag width={24} height={16} />
//         ) : (
//           <CroatianFlag width={24} height={16} />
//         )}
//       </MenuButton>

//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <MenuItems className="absolute right-0 z-50 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
//           <div className="p-1">
//             <MenuItem>
//               {({active}) => (
//                 <button
//                   className={`${active ? 'bg-primary-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   onClick={() => changeLanguage('en')}
//                 >
//                   <BritishFlag width={24} height={16} />
//                   <span className="ml-2">English</span>
//                 </button>
//               )}
//             </MenuItem>

//             <MenuItem>
//               {({active}) => (
//                 <button
//                   className={`${active ? 'bg-primary-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   onClick={() => changeLanguage('hr')}
//                 >
//                   <CroatianFlag width={24} height={16} />
//                   <span className="ml-2">Croatian</span>
//                 </button>
//               )}
//             </MenuItem>
//           </div>
//         </MenuItems>
//       </Transition>
//     </Menu>
//   )
// }

// export default LanguageSwitcher

// 'use client'

// import {Fragment} from 'react'
// import {Menu, MenuButton, MenuItem, MenuItems, Transition} from '@headlessui/react'
// import {useParams as useNextParams} from 'next/navigation'
// import {usePathname, useRouter} from '@/i18n/navigation'
// import {getLocalizedSlug, getAllLocalizedSlugs} from '@/sanity/lib/utils'
// import BritishFlag from '@/app/components/language-icons/BritishFlag'
// import CroatianFlag from '@/app/components/language-icons/CroatianFlag'

// interface Props {
//   productSlug?: {en: string; hr?: string}
//   locale: string
// }

// // Define a reusable type for the router's path object to ensure consistency
// type PathObject = {
//   pathname: string
//   params: Record<string, string | string[]>
// }

// const LanguageSwitcher = ({productSlug, locale}: Props) => {
//   const router = useRouter()
//   const pathname = usePathname()
//   const params = useNextParams()
//   const localizedSlugs = getAllLocalizedSlugs(productSlug)
//   const currentLocale = pathname.startsWith('/hr') ? 'hr' : 'en'
//   console.log('localized slugs in switcher', localizedSlugs)
//   const changeLanguage = (newLocale: string) => {
//     let targetRoute: PathObject

//     if (productSlug) {
//       const localizedSlug = getLocalizedSlug(productSlug, newLocale)
//       targetRoute = {
//         pathname: '/products/[slug]',
//         params: {...params, slug: localizedSlug}, // Spread existing params
//       }
//     } else {
//       targetRoute = {pathname, params: params as Record<string, string | string[]>}
//     }

//     router.replace(targetRoute, {locale: newLocale})
//   }

//   return (
//     <Menu as="div" className="relative inline-block text-left">
//       <MenuButton className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center space-x-2">
//         {currentLocale === 'en' ? (
//           <BritishFlag width={24} height={16} />
//         ) : (
//           <CroatianFlag width={24} height={16} />
//         )}
//       </MenuButton>

//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <MenuItems className="absolute right-0 z-50 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
//           <div className="p-1">
//             <MenuItem>
//               {({active}) => (
//                 <button
//                   className={`${active ? 'bg-primary-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   onClick={() => changeLanguage('en')}
//                 >
//                   <BritishFlag width={24} height={16} />
//                   <span className="ml-2">English</span>
//                 </button>
//               )}
//             </MenuItem>

//             <MenuItem>
//               {({active}) => (
//                 <button
//                   className={`${active ? 'bg-primary-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   onClick={() => changeLanguage('hr')}
//                 >
//                   <CroatianFlag width={24} height={16} />
//                   <span className="ml-2">Croatian</span>
//                 </button>
//               )}
//             </MenuItem>
//           </div>
//         </MenuItems>
//       </Transition>
//     </Menu>
//   )
// }

// export default LanguageSwitcher

// 'use client'

// import {useState, useEffect, Fragment} from 'react'
// import {Menu, MenuButton, MenuItem, MenuItems, Transition} from '@headlessui/react'
// import {useParams as useNextParams} from 'next/navigation'
// import {usePathname, useRouter} from '@/i18n/navigation'
// import BritishFlag from '@/app/components/language-icons/BritishFlag'
// import CroatianFlag from '@/app/components/language-icons/CroatianFlag'

// interface Props {
//   // productSlug?: {en: string; hr?: string}
//   locale: string
// }

// type PathObject = {
//   pathname: string
//   params: Record<string, string | string[]>
// }

// type LocalizedSlugs = {
//   _type: string
//   en: string
//   hr: string
// }

// const LanguageSwitcher = ({}: Props) => {
//   const router = useRouter()
//   const pathname = usePathname()
//   const params = useNextParams()

//   const currentLocale = params.locale as 'en' | 'hr'
//   const [oppositeSlug, setOppositeSlug] = useState<string | null>(null)
//   const [localizedSlugs, setLocalizedSlugs] = useState<LocalizedSlugs | null>(null)
//   const [loading, setLoading] = useState(false)
//   const productSlug = params.slug
//   const local = params.locale
//   console.log('product slug in switcher', productSlug)
//   console.log('locale in switcher', local)
//   // Fetch slugs dynamically if productSlug exists
//   useEffect(() => {
//     if (!productSlug) return

//     async function fetchLocalizedSlugs() {
//       setLoading(true)
//       try {
//         console.log('Fetching slug for API:', productSlug)

//         const res = await fetch(`/api/localized-slug?slug=${productSlug}`)
//         if (!res.ok) throw new Error('Failed to fetch localized slugs')

//         const data: LocalizedSlugs = await res.json()
//         setLocalizedSlugs(data)
//         console.log('Localized slugs from API:', data)
//       } catch (error) {
//         console.error('Error fetching localized slugs:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchLocalizedSlugs()
//   }, [productSlug])

//   const changeLanguage = (newLocale: 'en' | 'hr') => {
//     let targetRoute: PathObject
//     if (!oppositeSlug) return null

//     const targetUrl = `/${currentLocale === 'en' ? 'hr' : 'en'}/product/${oppositeSlug}`
//     if (productSlug && localizedSlugs) {
//       const localizedSlug = localizedSlugs[newLocale] ?? productSlug.en
//       targetRoute = {
//         pathname: '/products/[slug]',
//         params: {...params, slug: localizedSlug},
//       }
//     } else {
//       targetRoute = {pathname, params: params as Record<string, string | string[]>}
//     }

//     router.replace(targetRoute, {locale: newLocale})
//   }

//   return (
//     <Menu as="div" className="relative inline-block text-left">
//       <MenuButton className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center space-x-2">
//         {currentLocale === 'en' ? (
//           <BritishFlag width={24} height={16} />
//         ) : (
//           <CroatianFlag width={24} height={16} />
//         )}
//       </MenuButton>

//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <MenuItems className="absolute right-0 z-50 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
//           <div className="p-1">
//             <MenuItem>
//               {({active}) => (
//                 <button
//                   className={`${active ? 'bg-primary-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   onClick={() => changeLanguage('en')}
//                   disabled={!!productSlug && (!localizedSlugs || loading)}
//                 >
//                   <BritishFlag width={24} height={16} />
//                   <span className="ml-2">English</span>
//                 </button>
//               )}
//             </MenuItem>

//             <MenuItem>
//               {({active}) => (
//                 <button
//                   className={`${active ? 'bg-primary-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   onClick={() => changeLanguage('hr')}
//                   disabled={!!productSlug && (!localizedSlugs || loading)}
//                 >
//                   <CroatianFlag width={24} height={16} />
//                   <span className="ml-2">Croatian</span>
//                 </button>
//               )}
//             </MenuItem>
//           </div>
//         </MenuItems>
//       </Transition>
//     </Menu>
//   )
// }
// export default LanguageSwitcher

'use client'

import {useState, useEffect, Fragment} from 'react'
import {Menu, MenuButton, MenuItem, MenuItems, Transition} from '@headlessui/react'
import {useParams as useNextParams} from 'next/navigation'
import {usePathname, useRouter} from '@/i18n/navigation'
import BritishFlag from '@/app/components/language-icons/BritishFlag'
import CroatianFlag from '@/app/components/language-icons/CroatianFlag'
import Link from 'next/link'
interface LocalizedSlugs {
  _type: string
  en: string
  hr: string
}

const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  console.log('pathname in switcher', pathname)
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
      // Use opposite slug for product pages
      const targetSlug = localizedSlugs[newLocale]
      router.replace(
        {
          pathname: `/products/[slug]`,
          params: {...params, slug: targetSlug},
        },
        {locale: newLocale},
      )
    } else {
      // Keep current path for other pages
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
