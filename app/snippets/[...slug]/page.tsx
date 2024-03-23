import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allSnippets } from 'contentlayer/generated'
import type { Authors, Blog, Snippet } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import SnippetLayout from '@/layouts/SnippetLayout'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const snippet = allSnippets.find((p) => p.slug === slug)
  if (!snippet) {
    return
  }

  const publishedAt = new Date(snippet.date).toISOString()
  const modifiedAt = new Date(snippet.lastmod || snippet.date).toISOString()
  let imageList = [siteMetadata.socialBanner]
  if (snippet.images) {
    imageList = typeof snippet.images === 'string' ? [snippet.images] : snippet.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: snippet.title,
    description: snippet.summary,
    openGraph: {
      title: snippet.title,
      description: snippet.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: snippet.title,
      description: snippet.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allSnippets.map((p) => ({ slug: p.slug.split('/') }))

  return paths
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allSnippets))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allSnippets.find((p) => p.slug === slug) as Snippet
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData

  const Layout = SnippetLayout

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SnippetLayout content={mainContent}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </SnippetLayout>
    </>
  )
}
