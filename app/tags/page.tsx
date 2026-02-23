import Link from '@/components/Link'
import { slug } from 'github-slugger'
import { genPageMetadata } from 'app/seo'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { allBlogs } from 'contentlayer/generated'
import { getAllTags } from '@/lib/utils/tag-utils'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = getAllTags(allBlogs)
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-24">
        <div className="space-y-4 pb-12 pt-6 text-center">
          <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-14">
            Tags
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-7 text-gray-500 dark:text-gray-400">
            Browse through all the topics I've written about. From web development to personal
            stories.
          </p>
        </div>
        <div className="flex max-w-4xl flex-wrap justify-center gap-3 px-4 md:gap-5">
          {tagKeys.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No tags found.</p>
          )}
          {sortedTags.map((t) => {
            return (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                className="group relative flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2 transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:bg-white hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-primary-400 dark:hover:bg-gray-900 md:px-6 md:py-3"
              >
                <div className="h-2 w-2 rounded-full bg-primary-500" />
                <span className="text-sm font-semibold uppercase tracking-wide text-gray-700 transition-colors group-hover:text-primary-600 dark:text-gray-300 dark:group-hover:text-primary-400 md:text-base">
                  {t}
                </span>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-bold text-gray-600 transition-colors group-hover:bg-primary-100 group-hover:text-primary-600 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-primary-900/30 dark:group-hover:text-primary-300">
                  {tagCounts[t]}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
