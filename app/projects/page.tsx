import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import ScrollReveal from '@/components/ScrollReveal'
import { FolderGit2 } from 'lucide-react'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <div className="relative">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob-bg -right-32 top-0 h-[500px] w-[500px] bg-violet-100 dark:bg-violet-900/20" />
        <div className="blob-bg -left-48 top-96 h-96 w-96 bg-primary-100 dark:bg-primary-900/20" />
      </div>

      {/* Hero Section */}
      <section className="relative pb-12 pt-8 md:pb-16 md:pt-12">
        {/* Editorial Header */}
        <div className="animate-fade reveal-delay-1 mb-8 flex items-center gap-4">
          <FolderGit2 className="h-5 w-5 text-primary-500" />
          <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
            Portfolio
          </span>
          <div className="h-px max-w-24 flex-1 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700" />
        </div>

        {/* Title */}
        <h1 className="animate-reveal font-display text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
          Things I&apos;ve <span className="gradient-text">built</span>
        </h1>
        <p className="animate-reveal reveal-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          A collection of tools, applications, and experiments I&apos;ve built. Each project
          represents a unique challenge and a step in my learning journey.
        </p>

        {/* Animated Line */}
        <div className="animate-line-expand reveal-delay-3 mt-8 h-1 w-24 bg-gradient-to-r from-primary-500 to-primary-300" />
      </section>

      {/* Projects Grid */}
      <section className="relative py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {projectsData.map((project, index) => (
            <ScrollReveal key={project.title} delay={(index % 4) * 80}>
              <Card
                title={project.title}
                description={project.description}
                imgSrc={project.imgSrc}
                href={project.href}
                github={project.github}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}
