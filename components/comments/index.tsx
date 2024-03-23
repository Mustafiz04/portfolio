import siteMetadata from '@/data/siteMetadata'
import dynamic from 'next/dynamic'
import type { Blog, Snippet } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'

interface Props {
  frontMatter: CoreContent<Blog | Snippet>
}

const GiscusComponent = dynamic(
  () => {
    return import('@/components/comments/Giscus')
  },
  { ssr: false }
)

const Comments = ({ frontMatter }: Props) => {
  // console.log(frontMatter)
  let term
  // switch (
  //   siteMetadata.comments?.giscusConfig.mapping
  // ) {
  //   case 'pathname':
  //     term = frontMatter.slug;
  //     break;
  //   case 'url':
  //     term = window.location.href;
  //     break;
  //   case 'title':
  //     term = frontMatter.title;
  //     break;
  // }
  return (
    <div id="comment">
      {siteMetadata.comments && siteMetadata.comments.provider === 'giscus' && (
        <GiscusComponent mapping="pathname" />
      )}
    </div>
  )
}

export default Comments
