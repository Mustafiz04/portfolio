import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import { Github, Twitter, Linkedin, Instagram, Mail, Youtube, ArrowUpRight } from 'lucide-react'

// Custom icons for platforms not in lucide-react
const LeetCodeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
)

const ChessIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 22H5v-2h14v2M17.16 8.26A8.94 8.94 0 0 1 21 15c0 1.5-.36 2.91-1 4.16V20H4v-.84A9 9 0 0 1 3 15a8.94 8.94 0 0 1 3.84-6.74L5 6.5l1.5-1.5 2.8 2.8c.51-.27 1.06-.5 1.62-.66L11 2h2l.08 5.14c.56.16 1.11.39 1.62.66l2.8-2.8 1.5 1.5-1.84 1.76z" />
  </svg>
)

const socialLinks = [
  { name: 'GitHub', href: siteMetadata.github, icon: Github },
  { name: 'LinkedIn', href: siteMetadata.linkedin, icon: Linkedin },
  { name: 'Twitter', href: siteMetadata.twitter, icon: Twitter },
  { name: 'Instagram', href: siteMetadata.instagram, icon: Instagram },
  { name: 'YouTube', href: siteMetadata.youtube, icon: Youtube },
  { name: 'LeetCode', href: siteMetadata.leetcode, icon: LeetCodeIcon },
  { name: 'Chess', href: siteMetadata.chess, icon: ChessIcon },
  { name: 'Email', href: `mailto:${siteMetadata.email}`, icon: Mail },
]

const footerLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Travel', href: '/travel' },
  { name: 'Snippets', href: '/snippets' },
]

export default function Footer() {
  return (
    <footer className="relative mt-24">
      {/* Top Border with Gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />

      <div className="py-16">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Mustafiz Kaifee
              </span>
            </Link>

            {/* Social Links */}
            <div className="mt-8 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/60 text-gray-500 backdrop-blur-sm transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-400 dark:hover:border-primary-700 dark:hover:bg-primary-900/20 dark:hover:text-primary-400"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>

            {/* Contact Column */}
            <div className="mt-8 lg:col-span-3">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                Get in Touch
              </h3>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Always open to new opportunities and collaborations.
              </p>
              <a
                href={`mailto:${siteMetadata.email}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 font-display text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30"
              >
                <Mail className="h-4 w-4" />
                Say Hello
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3 lg:col-start-8">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-200/60 pt-8 dark:border-gray-800/60 sm:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()}{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {siteMetadata.author}
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href={siteMetadata.siteRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            >
              <Github className="h-4 w-4" />
              <span>Source</span>
            </a>
            {/* <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700" />
            <span className="text-sm text-gray-400 dark:text-gray-500">
              Built with Next.js & Tailwind
            </span> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
