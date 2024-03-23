import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors, Snippet } from 'contentlayer/generated'
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
  content: CoreContent<Snippet>
  children: ReactNode
}

export default function SnippetLayout({ content, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, images } = content
  const basePath = path.split('/')[0]
  const banner = images?.[0]

  const blogReadingTime = calculateReadingTime(String(JSON.stringify(children)))

  const url = `${siteMetadata.siteUrl}/blog/${slug}`

  const views = redis.mget<number[]>(['pageviews', 'posts', slug].join(':'))

  return (
    <SectionContainer>
      {/* <BlogSEO url={url} authorDetails={authorDetails} {...content} /> */}
      <ScrollTopAndComment />
      <ViewCounter slug={slug} />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <div>
                <b>{views}</b> views
                <span className="ml-1 mr-2 text-gray-500 dark:text-gray-400">&middot;</span>
                <b>{blogReadingTime}</b> {' mins read'}
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-4 xl:row-span-2 xl:pb-0">
              {banner && <Image src={banner} className="object-cover object-center" alt="banner" />}
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
              <div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(path)} rel="nofollow">
                  Discuss on Twitter
                </Link>
                {` • `}
                <Link href={editUrl(filePath)}>View on GitHub</Link>
              </div>
              {siteMetadata.comments && (
                <div
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments frontMatter={content} />
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
