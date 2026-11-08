'use client'

import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800/60 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Full-screen Menu Overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!navShow}
        className={`fixed inset-0 z-50 transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          navShow ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close menu"
          className={`absolute inset-0 bg-ink-paper/95 backdrop-blur-xl dark:bg-ink/95 ${
            navShow ? 'animate-fade' : ''
          }`}
          onClick={onToggleNav}
        />

        {/* Menu Content */}
        <div
          className={`relative flex h-full flex-col transition-all delay-100 duration-500 ${
            navShow ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600">
                <span className="font-display text-lg font-bold text-white">M</span>
              </div>
              <span className="font-display text-lg font-bold text-gray-900 dark:text-gray-100">
                Menu
              </span>
            </div>

            {/* Close Button */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
              aria-label="Close Menu"
              onClick={onToggleNav}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-1 flex-col justify-center px-6">
            <div className="space-y-2">
              {headerNavLinks.map((link, index) => (
                <div
                  key={link.title}
                  className={`transform transition-all duration-500 ${
                    navShow ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: navShow ? `${150 + index * 75}ms` : '0ms' }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between rounded-2xl px-4 py-5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800/60"
                    onClick={onToggleNav}
                  >
                    <div className="flex items-center gap-4">
                      {/* Index Number */}
                      <span className="font-display text-sm font-medium text-gray-300 dark:text-gray-600">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {/* Link Title */}
                      <span className="font-display text-3xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-primary-500 dark:text-gray-100 dark:group-hover:text-primary-400 sm:text-4xl">
                        {link.title}
                      </span>
                    </div>
                    {/* Arrow */}
                    <ArrowUpRight className="h-6 w-6 text-gray-300 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-500 dark:text-gray-600 dark:group-hover:text-primary-400" />
                  </Link>
                </div>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div
            className={`border-t border-gray-200 px-6 py-8 dark:border-gray-800 ${
              navShow ? 'animate-fade reveal-delay-5' : 'opacity-0'
            }`}
          >
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              <span className="font-display font-semibold text-gray-900 dark:text-gray-100">
                Mustafiz Kaifee
              </span>
              <span className="mx-2">·</span>
              Engineer & Explorer
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileNav
