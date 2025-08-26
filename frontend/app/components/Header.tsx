import Link from './Link'
// import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
// import SearchButton from './SearchButton'
// import LanguageSwitcher from './LanguageSwitcher'
// import siteMetadata from '@/data/siteMetadata'

const Header = () => {
  const headerNavLinks = [
    {href: '/home', title: 'Home'},
    {href: '/about', title: 'Our story'},
    {href: '/winery', title: 'Winery'},
    // {href: '/events', title: 'Events'},
    {href: '/blog', title: 'Blog'},
    {href: '/accommodation', title: 'Accommodation'},
    // {href: '/projects', title: 'Products'},
    {href: '/contact', title: 'Contact'},
  ]

  let headerClass =
    'font-strangelove flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10 h-20'
  //   if (siteMetadata.stickyNav) {
  //     headerClass += ' sticky top-0 z-50'
  //   }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label="Vinarije Kriz">
        <div className="flex items-center justify-between">
          <div className="mr-3">{/* <Logo /> */}</div>

          <div className="hidden h-6 text-3xl font-semibold tracking-wider sm:block">
            Vinarije Kriz
          </div>
        </div>
      </Link>

      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden flex-1 items-center gap-x-4 overflow-x-auto sm:flex">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hover:text-primary-500 dark:hover:text-primary-400 m-1 text-2xl font-semibold tracking-wider text-gray-900 dark:text-gray-100"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <ThemeSwitch />

        {/* <SearchButton />
        <LanguageSwitcher />
        <ThemeSwitch />
        <MobileNav /> */}
      </div>
    </header>
  )
}

export default Header
