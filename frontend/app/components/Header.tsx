'use client'

import {useMessages} from 'next-intl'
import {Link as LocaleLink} from '@/i18n/navigation'

import BrandLink from './Link'
import SearchButton from './SearchButton'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitch from './ThemeSwitch'
import MobileNav from './MobileNav'

interface HeaderProps {
  locale: string
}

export default function Header({locale}: HeaderProps) {
  const messages = useMessages() as {nav: Array<{href: string; title: string}>}
  const headerNavLinks = messages.nav ?? []
  const currentLocale = locale

  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10 h-20'

  return (
    <header className={headerClass}>
      {/* Brand */}
      <LocaleLink href={{pathname: '/'}} locale={locale} aria-label="Vinarije Kriz">
        <div className="flex items-center justify-between">
          <div className="mr-3">{/* <Logo /> */}</div>
          <div className="font-strangelove  h-6 text-3xl font-semibold tracking-wider sm:block">
            Vinarija Križ
          </div>
        </div>
      </LocaleLink>

      {/* Navigation & Buttons */}
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden flex-1 items-center gap-x-4 overflow-x-auto sm:flex">
          {headerNavLinks.map((link) => (
            <LocaleLink
              key={link.href}
              locale={locale}
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

        <MobileNav links={headerNavLinks} />
      </div>
    </header>
  )
}
