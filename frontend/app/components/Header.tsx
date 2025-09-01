// import Link from './Link'
// // import MobileNav from './MobileNav'
// import ThemeSwitch from './ThemeSwitch'
// import SearchButton from './SearchButton'
// import LanguageSwitcher from './LanguageSwitcher'
// // import siteMetadata from '@/data/siteMetadata'

// const Header = () => {
//   const headerNavLinks = [
//     {href: '/home', title: 'Home'},
//     {href: '/about', title: 'Our story'},
//     {href: '/winery', title: 'Winery'},
//     {href: '/blog', title: 'Blog'},
//     {href: '/accommodation', title: 'Accommodation'},
//     {href: '/contact', title: 'Contact'},
//   ]

//   let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10 h-20'
//   //   if (siteMetadata.stickyNav) {
//   //     headerClass += ' sticky top-0 z-50'
//   //   }

//   return (
//     <header className={headerClass}>
//       <Link href="/" aria-label="Vinarije Kriz">
//         <div className="flex items-center justify-between">
//           <div className="mr-3">{/* <Logo /> */}</div>

//           <div className="font-strangelove hidden h-6 text-3xl font-semibold tracking-wider sm:block">
//             Vinarije Kriz
//           </div>
//         </div>
//       </Link>

//       <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
//         <div className="no-scrollbar hidden flex-1 items-center gap-x-4 overflow-x-auto sm:flex">
//           {headerNavLinks.map((link) => (
//             <Link
//               key={link.title}
//               href={link.href}
//               className="font-strangelove hover:text-primary-500 dark:hover:text-primary-400 m-1 text-2xl font-semibold tracking-wider text-gray-900 dark:text-gray-100"
//             >
//               {link.title}
//             </Link>
//           ))}
//         </div>

//         <SearchButton />
//         <LanguageSwitcher />
//         <ThemeSwitch />

//         {/*
//         <MobileNav /> */}
//       </div>
//     </header>
//   )
// }

// export default Header

'use client'

import {useMessages} from 'next-intl'
import {Link as LocaleLink} from '@/i18n/navigation'
import BrandLink from './Link'
import SearchButton from './SearchButton'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitch from './ThemeSwitch'
// import MobileNav from './MobileNav'
import {usePathname} from 'next/navigation'
interface HeaderProps {
  productSlug?: {en: string; hr?: string}
  locale: string
}

export default function Header({productSlug, locale}: HeaderProps) {
  const messages = useMessages() as {nav: Array<{href: string; title: string}>}
  const headerNavLinks = messages.nav ?? []
  const currentLocale = locale

  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10 h-20'
  const pathname = usePathname()
  const isProductPage = pathname.includes('/products/') || pathname.includes('/proizvodi/')
  return (
    <header className={headerClass}>
      {/* Brand */}
      <BrandLink href="/" aria-label="Vinarije Kriz">
        <div className="flex items-center justify-between">
          <div className="mr-3">{/* <Logo /> */}</div>
          <div className="font-strangelove hidden h-6 text-3xl font-semibold tracking-wider sm:block">
            Vinarije Kriz
          </div>
        </div>
      </BrandLink>

      {/* Navigation & Buttons */}
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden flex-1 items-center gap-x-4 overflow-x-auto sm:flex">
          {headerNavLinks.map((link) => (
            <LocaleLink
              key={link.href}
              href={{pathname: link.href as any}}
              className="font-strangelove hover:text-primary-500 dark:hover:text-primary-400 m-1 text-2xl font-semibold tracking-wider text-gray-900 dark:text-gray-100"
            >
              {link.title}
            </LocaleLink>
          ))}
        </div>

        <SearchButton locale={currentLocale} />
        <LanguageSwitcher />
        <ThemeSwitch />

        {/* <MobileNav /> */}
      </div>
    </header>
  )
}
