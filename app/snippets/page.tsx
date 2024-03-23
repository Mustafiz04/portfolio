import SnippetLayout from '@/layouts/SnippetListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allSnippets } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ComingSoon from '@/components/ComingSoon'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const snippets = allCoreContent(sortPosts(allSnippets))
  const pageNumber = 1
  const initialDisplayPosts = snippets.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(snippets.length / POSTS_PER_PAGE),
  }

  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <SnippetLayout snippets={snippets} title="All Snippets" />
    </>
  )
}
