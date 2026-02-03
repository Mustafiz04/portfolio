import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import Link from '@/components/Link'
import StackList from '@/components/list/StackList'
import { WorkStack } from 'config/stack'
import { RoughNotation } from 'react-rough-notation'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    twitter,
    linkedin,
    github,
    leetcode,
    youtube,
    resume,
  } = content

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-4 pb-8 pt-6 text-center md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          About
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-7 text-gray-500 dark:text-gray-400">
          A glimpse into my journey, skills, and the path I've traveled in tech.
        </p>
      </div>
      <div className="items-start space-y-12 xl:grid xl:grid-cols-3 xl:gap-x-12 xl:space-y-0">
        <div className="flex flex-col items-center pt-8 xl:sticky xl:top-24">
          <div className="relative mb-6">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary-500/20 to-green-500/20 blur-lg" />
            {avatar && (
              <Image
                src={avatar}
                alt={name}
                width={192}
                height={192}
                className="relative h-48 w-48 rounded-3xl object-cover shadow-2xl ring-4 ring-white dark:ring-gray-900"
              />
            )}
          </div>
          <h3 className="pb-1 pt-4 text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
            {name}
          </h3>
          <div className="text-md font-medium text-primary-500">{occupation}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{company}</div>

          <div className="mt-6 flex space-x-4 px-4 pt-1">
            <SocialIcon kind="mail" href={`mailto:${email}`} />
            <SocialIcon kind="github" href={github} />
            <SocialIcon kind="linkedin" href={linkedin} />
            <SocialIcon kind="leetcode" href={leetcode} />
          </div>

          <div className="mt-8 w-full px-4">
            <a
              href={resume}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-bold text-white transition-all hover:bg-gray-800 hover:shadow-lg dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
          {children}

          <div className="mt-12 space-y-12">
            {/* Career CTA Section - Compact Version */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 p-6 transition-colors hover:border-primary-500/20 dark:border-gray-800">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Work History
                  </h4>
                  {/* <p className="text-sm text-gray-500">
                    My professional timeline and impact.
                  </p> */}
                </div>
                <Link
                  href="/career"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary-500 hover:text-primary-600"
                >
                  View timeline
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Technical Section - No Border Box */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-primary-500" />
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  Technical
                </h2>
              </div>
              <div className="px-2">
                <StackList stack={WorkStack} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
