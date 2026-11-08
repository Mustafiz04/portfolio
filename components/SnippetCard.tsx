import { BrandIcon } from './BrandIcon'
import Link from './Link'
import { ArrowRight } from 'lucide-react'

export function SnippetCard({ snippet }) {
  const { icon, heading, summary, slug } = snippet

  return (
    <Link
      href={`/snippets/${slug}`}
      className="card-lift group relative flex h-full items-center gap-5 overflow-hidden rounded-2xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-sm transition-all dark:border-gray-800/60 dark:bg-gray-900/70 md:p-7"
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Icon Container */}
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-md ring-1 ring-gray-100 transition-all group-hover:shadow-lg group-hover:ring-primary-200 dark:from-gray-800 dark:to-gray-900 dark:ring-gray-700 dark:group-hover:ring-primary-800">
        <BrandIcon type={icon} />
      </div>

      {/* Content */}
      <div className="relative flex-1 space-y-1.5 overflow-hidden">
        <h3 className="line-clamp-1 font-display text-lg font-bold leading-tight tracking-tight text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400 md:text-xl">
          {heading}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {summary}
        </p>
      </div>

      {/* Arrow indicator */}
      <div className="relative shrink-0">
        <ArrowRight className="h-5 w-5 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-primary-500 dark:text-gray-600 dark:group-hover:text-primary-400" />
      </div>
    </Link>
  )
}
