/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Snippet } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { SnippetCard } from '@/components/SnippetCard'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  snippets: CoreContent<Snippet>[]
  title: string
}

export default function SnippetLayoutWithTags({ snippets, title }: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <>
      <div>
        <div className="space-y-4 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title.toUpperCase()}
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 md:text-lg md:leading-7">
            My snippets collection
          </p>
        </div>
        <hr className="border-b-1 my-6 border-gray-200 dark:border-gray-700" />
        <div className="container py-12">
          <div className="grid-cols-2 gap-6 lg:grid">
            {snippets.map((snippet) => (
              <SnippetCard key={snippet.title} snippet={snippet} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
