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
  return (
    <div className="mx-auto max-w-6xl">
      <div className="space-y-4 py-12 text-center md:space-y-5 md:py-20">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-14">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-7 text-gray-500 dark:text-gray-400">
          A collection of small scripts, configurations, and helpful code blocks I use in my daily
          workflow.
        </p>
      </div>
      <div className="pb-12 md:pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.title} snippet={snippet} />
          ))}
        </div>
      </div>
    </div>
  )
}
