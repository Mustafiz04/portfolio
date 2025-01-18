import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import ComingSoon from '@/components/ComingSoon'
import Typewriter from '@/components/Typewriter'
import { Authors, allAuthors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors

  return (
    <>
      <div className="mx-auto max-w-3xl px-2 py-16 text-center md:space-y-20 md:text-left lg:mx-auto lg:max-w-7xl lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Hi, I'm <span className="text-green-600">{siteMetadata.title}</span>.
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-7 text-gray-500 dark:text-gray-300 md:mt-6">
          Passionate about creating elegant, efficient, and scalable software solutions 🚀 with a
          love for writing clean, well-documented, and well-tested code.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 lg:mt-16 lg:grid-cols-3 lg:space-y-0">
          <a
            href="/static/resume.pdf"
            rel="noopener noreferrer"
            className="group rounded-lg border border-gray-300 
            px-5 py-4 transition-colors duration-200 
            hover:border-green-600 dark:border-gray-700 
            dark:hover:border-green-500"
            target="_blank"
          >
            <h3 className="h4 mb-2 text-green-600 dark:text-green-500">
              Resume 📝 - <span className="text-sm">last update: 2025-01-19</span>
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Click here to see my professional background, skills, and work experience
            </p>
          </a>
          <a
            href="/travel"
            rel="noopener noreferrer"
            className="group rounded-lg border border-gray-300 
            px-5 py-4 transition-colors duration-200 
            hover:border-green-600 dark:border-gray-700 
            dark:hover:border-green-500"
          >
            <h3 className="h4 mb-2 text-green-600 dark:text-green-500">My Travel Map 🌍</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Check out my travel map to see my journey around the world.
            </p>
          </a>
          {/* <a
            href="/blog"
            rel="noopener noreferrer"
            className="group rounded-lg border border-gray-300 
            px-5 py-4 transition-colors duration-200 
            hover:border-green-600 dark:border-gray-700 
            dark:hover:border-green-500"
          >
            <h3 className="h4 mb-2 text-green-600 dark:text-green-500">My writings 📝</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Read my thoughts on software development, design, and more.
            </p>
          </a> */}
          <a
            href="/about"
            rel="noopener noreferrer"
            className="group rounded-lg border border-gray-300 
            px-5 py-4 transition-colors duration-200 
            hover:border-green-600 dark:border-gray-700 
            dark:hover:border-green-500"
          >
            <h3 className="h4 mb-2 text-green-600 dark:text-green-500">More about me 😊</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Learn more about who I am and what I do.
            </p>
          </a>
          <a
            href="/career"
            rel="noopener noreferrer"
            className="group rounded-lg border border-gray-300 
            px-5 py-4 transition-colors duration-200 
            hover:border-green-600 dark:border-gray-700 
            dark:hover:border-green-500"
          >
            <h3 className="h4 mb-2 text-green-600 dark:text-green-500">My career 💼</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Check out my resume for a quick overview of my professional journey.
            </p>
          </a>
          <a
            href={siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-gray-300 
            px-5 py-4 transition-colors duration-200 
            hover:border-green-600 dark:border-gray-700 
            dark:hover:border-green-500"
          >
            <h3 className="h4 mb-2 text-green-600 dark:text-green-500">Checkout my Github 💻</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              My latest projects and work I'm doing.
            </p>
          </a>
          <a
            href={siteMetadata.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-gray-300 
            px-5 py-4 transition-colors duration-200 
            hover:border-green-600 dark:border-gray-700 
            dark:hover:border-green-500"
          >
            <h3 className="h4 text-green-60t0 mb-2 dark:text-green-500">Follow me on Twitter 🐦</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get the latest news and updates from me.
            </p>
          </a>
          <a
            href={siteMetadata.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-gray-300 
            px-5 py-4 transition-colors duration-200 
            hover:border-green-600 dark:border-gray-700 
            dark:hover:border-green-500"
          >
            <h3 className="h4 mb-2 text-green-600 dark:text-green-500">
              Connect with me on LinkedIn 🤝
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Learn more about my professional background.
            </p>
          </a>
          <a
            href={siteMetadata.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-gray-300 
            px-5 py-4 transition-colors duration-200 
            hover:border-green-600 dark:border-gray-700 
            dark:hover:border-green-500"
          >
            <h3 className="h4 mb-2 text-green-600 dark:text-green-500">My LeetCode 📊</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Check out my solutions on LeetCode.
            </p>
          </a>
          <a
            href={siteMetadata.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-gray-300 
            px-5 py-4 transition-colors duration-200 
            hover:border-green-600 dark:border-gray-700 
            dark:hover:border-green-500"
          >
            <h3 className="h4 mb-2 text-green-600 dark:text-green-500">
              Follow me on Instagram 📸{' '}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Follow me to see the other side of my story.
            </p>
          </a>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest Post
          </h1>
          {/* <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p> */}
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {/* {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </>
  )
}
