'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import {
  ChevronDown,
  X,
  Search,
  SearchX,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollReveal from '@/components/ScrollReveal'

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
    <div className="flex items-center justify-center gap-4 pt-12">
      {prevPage ? (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
          className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 font-display text-sm font-semibold text-gray-700 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-primary-700 dark:hover:bg-primary-900/20 dark:hover:text-primary-400"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Previous
        </Link>
      ) : (
        <span className="flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-5 py-2.5 font-display text-sm font-semibold text-gray-300 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-600">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </span>
      )}

      <span className="font-display text-sm font-medium text-gray-500 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>

      {nextPage ? (
        <Link
          href={`/${basePath}/page/${currentPage + 1}`}
          rel="next"
          className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 font-display text-sm font-semibold text-gray-700 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-primary-700 dark:hover:bg-primary-900/20 dark:hover:text-primary-400"
        >
          Next
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <span className="flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-5 py-2.5 font-display text-sm font-semibold text-gray-300 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-600">
          Next
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
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
    <div className="relative">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob-bg -right-48 top-0 h-[600px] w-[600px] bg-primary-100 dark:bg-primary-900/20" />
        <div className="blob-bg -left-32 top-96 h-96 w-96 bg-violet-100 dark:bg-violet-900/20" />
      </div>

      {/* Hero Section */}
      <section className="relative pb-12 pt-8 md:pb-16 md:pt-12">
        {/* Editorial Header */}
        <div className="animate-fade reveal-delay-1 mb-8 flex items-center gap-4">
          <BookOpen className="h-5 w-5 text-primary-500" />
          <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
            {title}
          </span>
          <div className="h-px max-w-24 flex-1 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700" />
        </div>

        {/* Title */}
        <h1 className="animate-reveal font-display text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
          Thoughts, <span className="gradient-text">stories</span> & ideas
        </h1>
        <p className="animate-reveal reveal-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          I write about software engineering, system design, and my adventures across the globe.
          Expect deep dives and occasional life updates.
        </p>

        {/* Animated Line */}
        <div className="animate-line-expand reveal-delay-3 mt-8 h-1 w-24 bg-gradient-to-r from-primary-500 to-primary-300" />
      </section>

      {/* Content */}
      <section className="relative py-8">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Sidebar for Tags */}
          <aside className="lg:w-1/4">
            <ScrollReveal>
              <div className="sticky top-24 space-y-8">
                <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-xl dark:border-gray-800/60 dark:bg-gray-900/70">
                  <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    Browse by Topic
                  </h3>
                  <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                    <Link
                      href="/blog"
                      className={`rounded-xl px-3 py-2 font-display text-sm font-medium transition-all ${
                        pathname === '/blog'
                          ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
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
                          className={`flex items-center justify-between rounded-xl px-3 py-2 font-display text-sm font-medium transition-all ${
                            isActive
                              ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
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
                        className="mt-2 flex items-center gap-1 px-3 py-2 font-display text-xs font-bold uppercase tracking-wider text-primary-500 transition-colors hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        <ChevronDown className="h-4 w-4" />
                        View All ({sortedTags.length})
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
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
              <div className="relative flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-gray-200/60 bg-white shadow-2xl transition-all dark:border-gray-800/60 dark:bg-gray-900">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
                  <h2 className="font-display text-xl font-bold text-gray-900 dark:text-gray-100">
                    All Topics
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800"
                  >
                    <X className="h-6 w-6" />
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
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-10 py-3 font-display text-sm transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-800 dark:bg-gray-900 dark:focus:border-primary-400 dark:focus:bg-gray-950"
                    />
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    {searchValue && (
                      <button
                        onClick={() => setSearchValue('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                        <X className="h-5 w-5" />
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
                            className={`group flex items-center gap-2 rounded-xl border px-4 py-2 font-display text-sm font-semibold transition-all hover:-translate-y-0.5 ${
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
                          <SearchX className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="font-display text-lg font-medium text-gray-900 dark:text-gray-100">
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
            <div className="space-y-6">
              {!displayPosts.length && (
                <p className="py-10 text-center text-gray-500">No posts found.</p>
              )}
              <ul className="space-y-8">
                {displayPosts.map((post, index) => {
                  const { path, date, title, summary, tags } = post
                  return (
                    <ScrollReveal as="li" key={path} delay={(index % 5) * 60}>
                      <article className="card-lift group overflow-hidden rounded-2xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-sm transition-all dark:border-gray-800/60 dark:bg-gray-900/70 md:p-8">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            <time
                              dateTime={date}
                              className="font-display text-sm font-semibold text-primary-500 dark:text-primary-400"
                            >
                              {formatDate(date, siteMetadata.locale)}
                            </time>
                            <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                            <div className="flex gap-2">
                              {tags?.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="font-display text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                            <Link
                              href={`/${path}`}
                              className="text-gray-900 transition-colors group-hover:text-primary-500 dark:text-gray-100 dark:group-hover:text-primary-400"
                            >
                              {title}
                            </Link>
                          </h2>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {summary}
                          </p>
                          <Link
                            href={`/${path}`}
                            className="inline-flex items-center font-display text-sm font-bold text-primary-500 transition-colors hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                          >
                            Read article
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </article>
                    </ScrollReveal>
                  )
                })}
              </ul>
              {pagination && pagination.totalPages > 1 && (
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                />
              )}
            </div>
          </main>
        </div>
      </section>
    </div>
  )
}
