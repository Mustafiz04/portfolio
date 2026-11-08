'use client'

import { useState, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { AnalyticsLink } from './AnalyticsLink'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-gray-200/60 bg-ink-paper/80 py-4 shadow-sm backdrop-blur-xl dark:border-gray-800/60 dark:bg-ink/80'
          : 'border-b border-transparent bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="group flex items-center transition-opacity hover:opacity-80"
        >
          <Logo />
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <NavLink key={link.title} href={link.href} title={link.title} />
            ))}
        </nav>

        {/* Right: Utility Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <AnalyticsLink />
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="group relative whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    >
      <span className="relative z-10">{title}</span>
      {/* Hover background pill */}
      <span className="absolute inset-0 scale-90 rounded-full bg-gray-100 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 dark:bg-gray-800" />
      {/* Active indicator line */}
      <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary-500 transition-all duration-300 group-hover:w-4" />
    </Link>
  )
}

export default Header
