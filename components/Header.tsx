import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { AnalyticsLink } from './AnalyticsLink'

const Header = () => {
  return (
    <header className="relative flex items-center justify-between py-10">
      {/* Left Column: Logo */}
      <div className="flex flex-1 items-center">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {/* {siteMetadata.headerTitle} */}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>

      {/* Center Column: Navigation Links */}
      <div className="hidden flex-none items-center justify-center space-x-3 sm:flex md:space-x-6 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="whitespace-nowrap text-sm font-semibold uppercase tracking-wide text-gray-900 transition-colors hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
            >
              {link.title}
            </Link>
          ))}
      </div>

      {/* Right Column: Utility Icons */}
      <div className="flex flex-1 items-center justify-end space-x-2 leading-5 sm:space-x-4">
        <AnalyticsLink />
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
