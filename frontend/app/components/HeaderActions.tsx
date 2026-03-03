'use client'

import dynamic from 'next/dynamic'

const SearchButton = dynamic(() => import('./SearchButton'), {
  ssr: false,
})

const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher'), {
  ssr: false,
})

const ThemeSwitch = dynamic(() => import('./ThemeSwitch'), {
  ssr: false,
})

const MobileNav = dynamic(() => import('./MobileNav'), {
  ssr: false,
})

type HeaderActionsProps = {
  locale: string
  navLinks: Array<{href: string; title: string}>
}

export default function HeaderActions({locale, navLinks}: HeaderActionsProps) {
  return (
    <>
      <SearchButton locale={locale} />
      <LanguageSwitcher />
      <ThemeSwitch />
      <MobileNav links={navLinks} />
    </>
  )
}
