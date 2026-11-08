import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import {
  FileText,
  Globe,
  Edit,
  User,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Code2,
  Sparkles,
} from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const MAX_DISPLAY = 3

export default function Home({ posts }) {
  return (
    <div className="relative">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob-bg -right-32 -top-32 h-96 w-96 bg-primary-200 dark:bg-primary-900/30" />
        <div className="blob-bg -bottom-48 -left-32 h-[500px] w-[500px] bg-primary-100 dark:bg-primary-800/20" />
      </div>

      {/* Hero Section */}
      <section className="relative pb-24 pt-16 md:pb-32 md:pt-28">
        {/* Editorial Index Number */}
        <div className="animate-fade reveal-delay-1 mb-8 flex items-center gap-4">
          <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
            {/* TODO */}
          </span>
          <div className="h-px max-w-24 flex-1 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700" />
        </div>

        {/* Main Hero Content */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Name & Title */}
          <div className="lg:col-span-7">
            <h1 className="animate-reveal font-display text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="block">Mustafiz</span>
              <span className="gradient-text block">Kaifee</span>
            </h1>

            <div className="animate-reveal reveal-delay-2 mt-8 max-w-xl">
              <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-400 md:text-2xl">
                <span className="font-display font-semibold text-gray-900 dark:text-gray-100">
                  Engineer
                </span>{' '}
                by profession.{' '}
                <span className="font-display font-semibold text-gray-900 dark:text-gray-100">
                  Explorer
                </span>{' '}
                by passion.
              </p>
            </div>

            {/* Animated Line */}
            <div className="animate-line-expand reveal-delay-3 mt-8 h-1 w-32 bg-gradient-to-r from-primary-500 to-primary-300" />

            <p className="animate-reveal reveal-delay-4 mt-8 max-w-lg text-base leading-7 text-gray-500 dark:text-gray-400">
              Senior Software Engineer building scalable systems and solving complex problems. When
              not coding, I&apos;m probably traveling to a new country, playing sports, or learning
              something new.
            </p>

            {/* Social Links */}
            <div className="animate-reveal reveal-delay-5 mt-10 flex flex-wrap gap-3">
              <SocialPill href={siteMetadata.github} icon={Github} label="GitHub" />
              <SocialPill href={siteMetadata.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialPill href={siteMetadata.twitter} icon={Twitter} label="Twitter" />
              <SocialPill href={siteMetadata.instagram} icon={Instagram} label="Instagram" />
              <SocialPill href={`mailto:${siteMetadata.email}`} icon={Mail} label="Email" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="py-16">
        <ScrollReveal>
          <div className="mb-12 flex items-center gap-4">
            <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
              Explore
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ScrollReveal delay={0}>
            <NavCard
              href="/travel"
              icon={Globe}
              title="Travel Map"
              description="Journey across continents"
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <NavCard
              href="/blog"
              icon={Edit}
              title="Writings"
              description="Thoughts & explorations"
            />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <NavCard
              href="/static/resume.pdf"
              icon={FileText}
              title="Resume"
              description="Professional journey"
              isExternal
            />
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <NavCard href="/about" icon={User} title="About" description="The person behind code" />
          </ScrollReveal>
        </div>
      </section>

      {/* Latest Writings */}
      {posts.length > 0 && (
        <section className="py-16">
          <ScrollReveal>
            <div className="mb-12 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
                  Latest Writings
                </span>
                <div className="hidden h-px w-24 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800 sm:block" />
              </div>
              <Link
                href="/blog"
                className="group flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
              >
                View all
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {posts.slice(0, MAX_DISPLAY).map((post, index) => {
              const { slug, date, title, summary, tags } = post
              return (
                <ScrollReveal key={slug} delay={index * 100}>
                  <ArticleCard
                    slug={slug}
                    date={date}
                    title={title}
                    summary={summary}
                    tags={tags}
                    index={index + 1}
                  />
                </ScrollReveal>
              )
            })}
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-24">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 px-8 py-16 text-center dark:from-gray-800 dark:to-gray-900 sm:px-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '32px 32px',
                }}
              />
            </div>

            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Let&apos;s build something <span className="gradient-text">amazing</span> together
              </h2>
              <p className="mx-auto mt-4 max-w-md text-gray-300">
                I&apos;m always excited to connect with fellow developers, travelers, and curious
                minds.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={`mailto:${siteMetadata.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-sm font-semibold text-gray-900 transition-all hover:bg-primary-50 hover:shadow-lg"
                >
                  <Mail className="h-4 w-4" />
                  Get in touch
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-display text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
                >
                  Learn more about me
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}

function SocialPill({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="magnetic-hover inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 backdrop-blur-sm transition-all hover:border-primary-300 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:border-primary-700 dark:hover:text-primary-400"
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </a>
  )
}

function StatRow({ icon: Icon, label, value, accent = false }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      </div>
      <span
        className={`font-display text-sm font-semibold ${
          accent ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-gray-100'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function NavCard({ href, icon: Icon, title, description, isExternal = false }) {
  const CardWrapper = isExternal ? 'a' : Link
  const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <CardWrapper
      href={href}
      {...externalProps}
      className="card-lift group relative block overflow-hidden rounded-2xl border border-gray-200/80 bg-white/60 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/60"
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

      <div className="relative">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600 ring-1 ring-gray-200/60 transition-all group-hover:bg-primary-50 group-hover:text-primary-600 group-hover:ring-primary-200 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:group-hover:bg-primary-900/30 dark:group-hover:text-primary-400 dark:group-hover:ring-primary-800">
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="font-display text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>

        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors group-hover:text-primary-500 dark:text-gray-500 dark:group-hover:text-primary-400">
          Explore
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </CardWrapper>
  )
}

function ArticleCard({ slug, date, title, summary, tags, index }) {
  return (
    <article className="group relative">
      <div className="flex gap-6">
        {/* Index Number */}
        <div className="hidden flex-shrink-0 sm:block">
          <span className="font-display text-5xl font-bold text-gray-100 transition-colors group-hover:text-primary-100 dark:text-gray-800 dark:group-hover:text-primary-900/50">
            {String(index).padStart(2, '0')}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 rounded-2xl border border-gray-200/60 bg-white/40 p-6 backdrop-blur-sm transition-all group-hover:border-primary-200 group-hover:bg-white/80 dark:border-gray-800/60 dark:bg-gray-900/40 dark:group-hover:border-primary-900 dark:group-hover:bg-gray-900/80">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <time className="text-gray-400 dark:text-gray-500" dateTime={date}>
              {formatDate(date, siteMetadata.locale)}
            </time>
            <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 2).map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          </div>

          <h3 className="mt-3 font-display text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400 sm:text-2xl">
            <Link href={`/blog/${slug}`} className="after:absolute after:inset-0">
              {title}
            </Link>
          </h3>

          <p className="mt-3 line-clamp-2 text-gray-500 dark:text-gray-400">{summary}</p>

          <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-500 dark:text-primary-400">
            Read more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </article>
  )
}
