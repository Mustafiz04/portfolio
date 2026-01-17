import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { Authors, allAuthors } from 'contentlayer/generated'
import {
  FileText,
  Globe,
  Edit,
  User,
  Github,
  Twitter,
  Linkedin,
  BarChart,
  Instagram,
  Mail,
  ArrowRight,
} from 'lucide-react'

import projectsData from '@/data/projectsData'
import { WorkStack, StackInfo } from 'config/stack'

const MAX_DISPLAY = 3

export default function Home({ posts }) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Hero Section */}
      <div className="space-y-8 pb-12 pt-12 md:space-y-12 md:pt-24">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-14">
            Hi, I'm <span className="text-green-600 dark:text-green-500">{siteMetadata.title}</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Engineer by profession. Explorer by passion.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            I'm a Senior Software Engineer who loves building scalable software and solving complex
            problems. When I'm not coding, I'm probably traveling to a new country, playing sports,
            or learning something new.
          </p>

          {/* Social Icons */}
          <div className="mt-8 flex space-x-6">
            <SocialLink href={siteMetadata.github} icon={Github} label="Github" />
            <SocialLink href={siteMetadata.linkedin} icon={Linkedin} label="LinkedIn" />
            <SocialLink href={siteMetadata.twitter} icon={Twitter} label="Twitter" />
            <SocialLink href={siteMetadata.instagram} icon={Instagram} label="Instagram" />
            <SocialLink href={`mailto:${siteMetadata.email}`} icon={Mail} label="Email" />
          </div>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            href="/travel"
            icon={Globe}
            title="Travel Map"
            description="Explore my journey around the world."
          />
          <FeatureCard
            href="/blog"
            icon={Edit}
            title="Writings"
            description="Thoughts on code, design, and life."
          />
          <FeatureCard
            href="/static/resume.pdf"
            icon={FileText}
            title="Resume"
            description="My professional background and skills."
            isExternal
          />
          <FeatureCard
            href="/about"
            icon={User}
            title="About Me"
            description="Get to know the person behind the code."
          />
        </div>
      </div>



      {/* Tech Stack
      <div className="py-12">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-4">
          {WorkStack.map((tech) => (
            <div
              key={tech}
              className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-green-500 hover:text-green-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-green-400"
            >
              {StackInfo[tech].value}
            </div>
          ))}
        </div>
      </div> */}

      {/* Featured Projects
      <div className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="group flex items-center text-base font-medium text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
          >
            View all projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.slice(0, 3).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div> */}

      {/* Latest Posts */}
      {posts.length > 0 && (
        <div className="space-y-8 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Latest Writings
            </h2>
            <Link
              href="/blog"
              className="group flex items-center text-base font-medium text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
            >
              View all posts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="space-y-8">
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <li key={slug} className="group relative">
                  <article className="flex flex-col space-y-2 xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors"
                        >
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

function SocialLink({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 transition-colors hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500"
      aria-label={label}
    >
      <Icon className="h-6 w-6" />
    </a>
  )
}

function FeatureCard({ href, icon: Icon, title, description, isExternal = false }) {
  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      className="group relative block overflow-hidden rounded-2xl bg-gray-50 p-8 transition-all hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800"
    >
      <div className="mb-4 text-green-600 dark:text-green-500">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
      <div className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
        <ArrowRight className="h-5 w-5 text-green-600 dark:text-green-500" />
      </div>
    </Link>
  )
}

function ProjectCard({ project }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-green-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-500">
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {project.title}
          </a>
        </h3>
        <p className="mb-4 flex-1 text-gray-500 dark:text-gray-400">{project.description}</p>
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="z-10 flex items-center text-sm font-medium text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500"
            >
              <Github className="mr-1 h-4 w-4" /> GitHub
            </a>
          )}
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="z-10 flex items-center text-sm font-medium text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500"
            >
              <Globe className="mr-1 h-4 w-4" /> Website
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
