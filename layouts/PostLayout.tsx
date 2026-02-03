import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/comments/index'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { BlogSEO } from '@/components/SEO'
import SocialSharing from '@/components/SocialSharing'
import { calculateReadingTime } from '../lib/utils'
import ViewCounter from '../app/blog/[...slug]/view'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, images } = content
  const basePath = path.split('/')[0]
  const banner = images?.[0]

  const blogReadingTime = calculateReadingTime(String(JSON.stringify(children)))
  const url = `${siteMetadata.siteUrl}/blog/${slug}`

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <ViewCounter slug={slug} />
      <article className="mx-auto max-w-4xl pt-10">
        <header className="space-y-4 pb-12 text-center">
          <dl className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            <dt className="sr-only">Published on</dt>
            <dd>
              <time dateTime={date}>
                {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
              </time>
            </dd>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <dd>{blogReadingTime} min read</dd>
          </dl>
          <div>
            <PageTitle>{title}</PageTitle>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {tags?.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        </header>

        {banner && (
          <div className="mb-12 overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={banner}
              className="aspect-video w-full object-cover object-center"
              alt={title}
              width={1200}
              height={630}
            />
          </div>
        )}

        <div className="relative">
          <div className="prose prose-lg max-w-none pb-12 pt-10 dark:prose-invert">{children}</div>

          <hr className="border-gray-200 dark:border-gray-800" />

          <div className="py-10">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="flex items-center gap-4">
                {authorDetails.map((author) => (
                  <div key={author.name} className="flex items-center gap-3">
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width={48}
                        height={48}
                        alt={author.name}
                        className="h-12 w-12 rounded-full ring-2 ring-primary-500/20"
                      />
                    )}
                    <div className="text-sm font-medium">
                      <p className="text-gray-900 dark:text-gray-100">{author.name}</p>
                      {author.twitter && (
                        <Link
                          href={author.twitter}
                          className="text-primary-500 hover:text-primary-600"
                        >
                          {author.twitter.replace('https://twitter.com/', '@')}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Share
                </span>
                <SocialSharing title={title} url={url} />
              </div>
            </div>
          </div>

          <div className="grid gap-8 border-t border-gray-100 py-10 dark:border-gray-800 md:grid-cols-2">
            {prev && (
              <Link
                href={`/${prev.path}`}
                className="group flex flex-col items-start gap-2 rounded-2xl border border-gray-100 p-6 transition-all hover:border-primary-500/30 hover:bg-primary-50/20 dark:border-gray-800 dark:hover:bg-primary-900/10"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  &larr; Previous Article
                </span>
                <span className="text-lg font-bold group-hover:text-primary-500">{prev.title}</span>
              </Link>
            )}
            {next && (
              <Link
                href={`/${next.path}`}
                className="group flex flex-col items-end gap-2 rounded-2xl border border-gray-100 p-6 text-right transition-all hover:border-primary-500/30 hover:bg-primary-50/20 dark:border-gray-800 dark:hover:bg-primary-900/10"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Next Article &rarr;
                </span>
                <span className="text-lg font-bold group-hover:text-primary-500">{next.title}</span>
              </Link>
            )}
          </div>

          {siteMetadata.comments && (
            <div className="pt-10" id="comment">
              <Comments frontMatter={content} />
            </div>
          )}

          <div className="py-10">
            <Link
              href={`/${basePath}`}
              className="inline-flex items-center text-sm font-bold text-primary-500 hover:text-primary-600"
            >
              &larr; Back to the blog
            </Link>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
