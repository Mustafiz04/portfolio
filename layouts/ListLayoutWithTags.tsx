/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="mx-auto max-w-6xl">
      <div className="space-y-4 py-12 text-center md:space-y-5 md:py-20">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-14">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-7 text-gray-500 dark:text-gray-400">
          I write about software engineering, system design, and my adventures across the globe.
          Expect deep dives and occasional life updates.
        </p>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Sidebar for Tags */}
        <aside className="lg:w-1/4">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Browse by Topic
              </h3>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                <Link
                  href="/blog"
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === '/blog'
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50'
                  }`}
                >
                  All Posts
                </Link>
                {sortedTags.slice(0, 10).map((t) => {
                  const isActive = pathname.split('/tags/')[1] === slug(t)
                  return (
                    <Link
                      key={t}
                      href={`/tags/${slug(t)}`}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                          : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <span>{t}</span>
                      <span className="text-xs text-gray-400">({tagCounts[t]})</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="flex-1">
          <div className="space-y-12">
            {!displayPosts.length && (
              <p className="py-10 text-center text-gray-500">No posts found.</p>
            )}
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li key={path} className="group py-10 transition-all">
                    <article className="flex flex-col gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <time
                            dateTime={date}
                            className="text-sm font-medium text-primary-500 dark:text-primary-400"
                          >
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                          <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                          <div className="flex gap-2">
                            {tags?.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-semibold uppercase tracking-tighter text-gray-400 dark:text-gray-500"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <h2 className="text-3xl font-bold leading-tight tracking-tight">
                          <Link
                            href={`/${path}`}
                            className="text-gray-900 transition-colors group-hover:text-primary-500 dark:text-gray-100 dark:group-hover:text-primary-400"
                          >
                            {title}
                          </Link>
                        </h2>
                        <p className="prose max-w-none text-base leading-7 text-gray-500 dark:text-gray-400 md:text-lg">
                          {summary}
                        </p>
                      </div>
                      <Link
                        href={`/${path}`}
                        className="inline-flex items-center text-sm font-bold text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        Read article
                        <svg
                          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
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
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
