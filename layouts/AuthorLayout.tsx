import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import Image from '@/components/Image'
import Link from '@/components/Link'
import StackList from '@/components/list/StackList'
import { WorkStack } from 'config/stack'
import {
  Download,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
  User,
  Code2,
  MapPin,
  Briefcase,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github, youtube, resume } =
    content

  return (
    <div className="relative">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob-bg -right-32 top-0 h-[500px] w-[500px] bg-primary-100 dark:bg-primary-900/20" />
        <div className="blob-bg -left-48 top-96 h-96 w-96 bg-violet-100 dark:bg-violet-900/20" />
      </div>

      {/* Hero Section */}
      <section className="relative pb-12 pt-8 md:pb-16 md:pt-12">
        {/* Editorial Header */}
        <div className="animate-fade reveal-delay-1 mb-8 flex items-center gap-4">
          <User className="h-5 w-5 text-primary-500" />
          <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
            About Me
          </span>
          <div className="h-px max-w-24 flex-1 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700" />
        </div>

        {/* Title */}
        <h1 className="animate-reveal font-display text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
          A glimpse into my <span className="gradient-text">journey</span>
        </h1>
        <p className="animate-reveal reveal-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          The path I&apos;ve traveled in tech, the skills I&apos;ve built, and the passions that
          drive me forward.
        </p>

        {/* Animated Line */}
        <div className="animate-line-expand reveal-delay-3 mt-8 h-1 w-24 bg-gradient-to-r from-primary-500 to-primary-300" />
      </section>

      {/* Main Content */}
      <section className="relative py-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-4">
            <ScrollReveal>
              <div className="sticky top-24">
                {/* Profile Card */}
                <div className="overflow-hidden rounded-3xl border border-gray-200/60 bg-white/70 p-8 shadow-xl backdrop-blur-xl dark:border-gray-800/60 dark:bg-gray-900/70">
                  {/* Avatar */}
                  <div className="relative mx-auto mb-6 w-fit">
                    {/* Glow Effect */}
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary-500/30 via-primary-300/20 to-transparent blur-xl" />
                    {avatar && (
                      <Image
                        src={avatar}
                        alt={name}
                        width={160}
                        height={160}
                        className="relative h-40 w-40 rounded-2xl object-cover shadow-2xl ring-4 ring-white dark:ring-gray-800"
                      />
                    )}
                    {/* Status Indicator */}
                    <div className="absolute -bottom-2 -right-2 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-lg dark:bg-gray-800">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </span>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        Available
                      </span>
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="text-center">
                    <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                      {name}
                    </h2>
                    <p className="mt-1 font-medium text-primary-600 dark:text-primary-400">
                      {occupation}
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Briefcase className="h-4 w-4" />
                      <span>{company}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>Bengaluru, India</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700" />

                  {/* Social Links */}
                  <div className="flex justify-center gap-2">
                    <SocialButton href={`mailto:${email}`} icon={Mail} label="Email" />
                    <SocialButton href={github} icon={Github} label="GitHub" />
                    <SocialButton href={linkedin} icon={Linkedin} label="LinkedIn" />
                    <SocialButton href={twitter} icon={Twitter} label="Twitter" />
                    <SocialButton href={youtube} icon={Youtube} label="YouTube" />
                  </div>

                  {/* Resume Button */}
                  <a
                    href={resume}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 py-3.5 font-display text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-gray-900/20 dark:from-white dark:to-gray-100 dark:text-gray-900 dark:hover:shadow-white/20"
                  >
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <QuickStat value="5+" label="Years Exp" />
                  {/* <QuickStat value="5+" label="Companies" /> */}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-8">
            {/* Bio Section */}
            <ScrollReveal>
              <div className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/50">
                    <Sparkles className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900 dark:text-gray-100">
                    The Story
                  </h3>
                </div>

                <div className="prose prose-lg max-w-none text-gray-600 dark:prose-invert dark:text-gray-400">
                  {children}
                </div>
              </div>
            </ScrollReveal>

            {/* Technical Skills Section */}
            <ScrollReveal delay={100}>
              <div className="rounded-3xl border border-gray-200/60 bg-white/50 p-8 backdrop-blur-sm dark:border-gray-800/60 dark:bg-gray-900/50">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/50">
                    <Code2 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-gray-900 dark:text-gray-100">
                      Technical Arsenal
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Technologies I work with daily
                    </p>
                  </div>
                </div>

                <StackList stack={WorkStack} />
              </div>
            </ScrollReveal>

            {/* Connect CTA */}
            <ScrollReveal delay={200}>
              <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-center dark:from-gray-800 dark:to-gray-900 sm:p-12">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: '24px 24px',
                    }}
                  />
                </div>

                <div className="relative">
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    Let&apos;s connect and build something{' '}
                    <span className="gradient-text">amazing</span>
                  </h3>
                  <p className="mx-auto mt-4 max-w-md text-gray-300">
                    I&apos;m always open to discussing new opportunities, collaborations, or just
                    having a chat about tech.
                  </p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-sm font-semibold text-gray-900 transition-all hover:bg-primary-50 hover:shadow-lg"
                    >
                      <Mail className="h-4 w-4" />
                      Get in touch
                    </a>
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-display text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
                    >
                      View my work
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}

function SocialButton({
  href,
  icon: Icon,
  label,
}: {
  href: string | undefined
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
      aria-label={label}
    >
      <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
    </a>
  )
}

function QuickStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-gray-200/60 bg-white/60 p-4 text-center backdrop-blur-sm dark:border-gray-800/60 dark:bg-gray-900/60">
      <span className="block font-display text-2xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </span>
      <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {label}
      </span>
    </div>
  )
}
