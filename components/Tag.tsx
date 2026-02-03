import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 rounded-full bg-primary-100/50 px-3 py-1 text-xs font-medium uppercase text-primary-500 transition-colors hover:bg-primary-500 hover:text-white dark:bg-primary-900/30 dark:hover:bg-primary-500"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
