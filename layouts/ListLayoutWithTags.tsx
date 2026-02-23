'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  tagCounts: Record<string, number>
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
  tagCounts,
}: ListLayoutProps) {
  const pathname = usePathname()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts
  const INITIAL_TAG_COUNT = 10
  const tagsToShow = sortedTags.slice(0, INITIAL_TAG_COUNT)

  const filteredTags = sortedTags.filter((t) => t.toLowerCase().includes(searchValue.toLowerCase()))

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
                {tagsToShow.map((t) => {
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
                      <span className="truncate">{t}</span>
                      <span className="ml-2 text-xs text-gray-400">({tagCounts[t]})</span>
                    </Link>
                  )
                })}

                {sortedTags.length > INITIAL_TAG_COUNT && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-2 flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                    View All ({sortedTags.length})
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Tags Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-20">
            {/* Backdrop */}
            <button
              type="button"
              className="fixed inset-0 h-full w-full cursor-default bg-gray-900/60 backdrop-blur-sm transition-opacity focus:outline-none"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            />

            {/* Modal Content */}
            <div className="relative flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-950">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">All Topics</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* SearchBar */}
              <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-800">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-10 py-3 text-sm transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-800 dark:bg-gray-900 dark:focus:border-primary-400 dark:focus:bg-gray-950"
                  />
                  <svg
                    className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {searchValue && (
                    <button
                      onClick={() => setSearchValue('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Tags Grid */}
              <div className="scrollbar-hide flex-1 overflow-y-auto p-6">
                <div className="flex flex-wrap gap-3">
                  {filteredTags.length > 0 ? (
                    filteredTags.map((t) => {
                      const isActive = pathname.split('/tags/')[1] === slug(t)
                      return (
                        <Link
                          key={t}
                          href={`/tags/${slug(t)}`}
                          onClick={() => setIsModalOpen(false)}
                          className={`group flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                            isActive
                              ? 'border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                              : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-primary-200 hover:bg-white hover:text-primary-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-primary-800 dark:hover:bg-gray-950'
                          }`}
                        >
                          <span>{t}</span>
                          <span className="text-xs opacity-50">({tagCounts[t]})</span>
                        </Link>
                      )
                    })
                  ) : (
                    <div className="flex w-full flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                        <svg
                          className="h-8 w-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        No topics found
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Try a different search term.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

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
