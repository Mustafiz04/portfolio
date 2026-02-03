import Image from './Image'
import Link from './Link'
import { ExternalLink, Github } from 'lucide-react'

const Card = ({ title, description, imgSrc, href, github }) => (
  <div className="md flex max-w-[544px] p-4 md:w-1/2">
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-primary-500/30 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-primary-400/30">
      {imgSrc && (
        <div className="relative overflow-hidden">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imgSrc}
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="aspect-video w-full object-cover"
              width={544}
              height={306}
            />
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link
              href={href}
              className="text-gray-900 transition-colors hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-6 line-clamp-3 max-w-none flex-1 text-base text-gray-500 dark:text-gray-400">
          {description}
        </p>
        <div className="flex items-center gap-4">
          {href && (
            <Link
              href={href}
              className="flex items-center gap-2 text-sm font-bold text-primary-500 transition-colors hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
              aria-label={`Link to ${title}`}
            >
              Live Demo <ExternalLink className="h-4 w-4" />
            </Link>
          )}
          {github && (
            <Link
              href={github}
              className="flex items-center gap-2 text-sm font-bold text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              Source Code <Github className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default Card
