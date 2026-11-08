import Image from './Image'
import Link from './Link'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'

const Card = ({ title, description, imgSrc, href, github }) => (
  <div className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-sm transition-all dark:border-gray-800/60 dark:bg-gray-900/70">
    {/* Image Container */}
    {imgSrc && (
      <div className="relative overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        {href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
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

        {/* Floating Badge */}
        {href && (
          <div className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover:opacity-100 dark:bg-gray-900/90 dark:text-white">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        )}
      </div>
    )}

    {/* Content */}
    <div className="flex flex-1 flex-col p-6 md:p-8">
      <h2 className="mb-3 font-display text-xl font-bold leading-tight tracking-tight md:text-2xl">
        {href ? (
          <Link
            href={href}
            className="text-gray-900 transition-colors group-hover:text-primary-500 dark:text-gray-100 dark:group-hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            {title}
          </Link>
        ) : (
          <span className="text-gray-900 dark:text-gray-100">{title}</span>
        )}
      </h2>

      <p className="mb-6 line-clamp-3 flex-1 text-base leading-relaxed text-gray-500 dark:text-gray-400">
        {description}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 border-t border-gray-100 pt-5 dark:border-gray-800">
        {href && (
          <Link
            href={href}
            className="group/btn inline-flex items-center gap-2 font-display text-sm font-bold text-primary-500 transition-colors hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
            aria-label={`Link to ${title}`}
          >
            Live Demo
            <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        )}
        {github && (
          <Link
            href={github}
            className="group/btn inline-flex items-center gap-2 font-display text-sm font-bold text-gray-500 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
            aria-label={`GitHub repository for ${title}`}
          >
            Source Code
            <Github className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
