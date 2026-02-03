// import type { SnippetFrontMatter } from '~/types/mdx'
import { BrandIcon } from './BrandIcon'
import Link from './Link'

export function SnippetCard({ snippet }) {
  const { icon, heading, summary, slug } = snippet

  return (
    <Link
      href={`/snippets/${slug}`}
      className="group relative flex items-center gap-5 rounded-2xl border border-gray-100 bg-gray-50/50 p-5 transition-all duration-300 hover:border-primary-500/30 hover:bg-white hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-primary-400/30 dark:hover:bg-gray-900 md:p-6"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-transform group-hover:scale-110 dark:bg-gray-800 dark:ring-gray-700">
        <BrandIcon type={icon} />
      </div>
      <div className="flex-1 space-y-1.5 overflow-hidden">
        <h3 className="line-clamp-1 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100">
          {heading}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {summary}
        </p>
      </div>
      <div className="shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        <svg
          className="h-5 w-5 text-primary-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
