import { MapBoxGlobe } from '@/components/mapbox'
import PhotoGallery from '@/components/PhotoGallery'
import siteMetadata from '@/data/siteMetadata'
import { travelPhotos, travelStats } from 'app/constant/travelPhotos'
import ScrollReveal from '@/components/ScrollReveal'
import { Compass, Camera, MapPin, Plane, Instagram, ArrowUpRight } from 'lucide-react'

const accessToken = siteMetadata.mapboxAccessToken || ''

export default function Page() {
  return (
    <div className="relative">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob-bg -right-48 top-0 h-[600px] w-[600px] bg-emerald-100 dark:bg-emerald-900/20" />
        <div className="blob-bg -left-32 top-96 h-96 w-96 bg-primary-100 dark:bg-primary-900/20" />
      </div>

      {/* Hero Section */}
      <section className="relative pb-16 pt-8 md:pb-24 md:pt-16">
        {/* Editorial Header */}
        <div className="animate-fade reveal-delay-1 mb-8 flex items-center gap-4">
          <Compass className="h-5 w-5 text-primary-500" />
          <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
            Travel Journal
          </span>
          <div className="h-px max-w-24 flex-1 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700" />
        </div>

        {/* Main Title */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="animate-reveal font-display text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl md:text-7xl">
              The{' '}
              <span className="relative">
                <span className="gradient-text">Wanderland</span>
                {/* Decorative underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 5.5C47 2 89 2 120 4C151 6 176 6 199 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="text-primary-300 dark:text-primary-700"
                  />
                </svg>
              </span>
            </h1>

            <p className="animate-reveal reveal-delay-2 mt-8 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 md:text-xl">
              Exploring the world, one story at a time. A collection of moments, cultures, and
              landscapes from my journeys across the globe.
            </p>

            {/* Animated Line */}
            <div className="animate-line-expand reveal-delay-3 mt-8 h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-400" />
          </div>
        </div>
      </section>

      {/* Globe Section */}
      <section className="py-12">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-gray-200/60 bg-gradient-to-br from-gray-900 to-gray-800 p-2 shadow-2xl dark:border-gray-700/60">
            {/* Decorative corners */}
            <div className="absolute -left-1 -top-1 h-8 w-8 rounded-br-2xl border-b-2 border-r-2 border-emerald-500" />
            <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-tl-2xl border-l-2 border-t-2 border-emerald-500" />

            <div className="overflow-hidden rounded-2xl">
              {accessToken ? (
                <MapBoxGlobe accessToken={accessToken} />
              ) : (
                <iframe
                  src={siteMetadata.googleTravelMap}
                  width="100%"
                  height="500"
                  className="border-0"
                  title="Travel Map"
                />
              )}
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-6 left-6 flex items-center gap-2 whitespace-nowrap rounded-full bg-black/60 px-4 py-2 backdrop-blur-sm">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-white">Interactive Globe</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Journey Story Section */}
      <section className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Story Content */}
          <ScrollReveal>
            <div className="space-y-8">
              {/* Section Header */}
              <div className="flex items-center gap-4">
                <Plane className="h-5 w-5 text-emerald-500" />
                <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
                  My Journey
                </span>
              </div>

              <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl">
                From Weekend Treks to{' '}
                <span className="text-emerald-600 dark:text-emerald-400">Global Adventures</span>
              </h2>

              <div className="space-y-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  My passion for travel ignited in{' '}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">June 2022</span>,
                  shortly after moving to Bangalore. What started as weekend treks quickly blossomed
                  into a deep-seated love for exploration.
                </p>
                <p>
                  In{' '}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    September 2023
                  </span>
                  , I took a leap of faith with my first solo international trip to Turkey — a
                  journey that ultimately transformed my perspective. I realized that travel is more
                  than just sightseeing; it&apos;s about connecting with diverse souls and
                  exchanging stories that enrich our understanding of the world.
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={siteMetadata.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-hover group inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3 font-display text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                >
                  <Instagram className="h-5 w-5" />
                  <span>Follow the Journey</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Stats Grid */}
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {travelStats.map((stat) => (
                <div
                  key={stat.label}
                  className="card-lift group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/60 p-6 text-center backdrop-blur-sm dark:border-gray-800/60 dark:bg-gray-900/60"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 transition-opacity group-hover:opacity-100" />

                  <span className="relative block font-display text-3xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">
                    {stat.value}
                  </span>
                  <span className="relative mt-2 block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* VHS Gallery Section */}
      <section className="py-16">
        <ScrollReveal>
          <div className="mb-12 flex items-center gap-4">
            <Camera className="h-5 w-5 text-primary-500" />
            <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
              Visual Stories
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
          </div>
        </ScrollReveal>

        <PhotoGallery photos={travelPhotos} />
      </section>

      {/* Closing Quote */}
      <section className="py-16 md:py-24">
        <ScrollReveal>
          <div className="relative mx-auto max-w-3xl text-center">
            {/* Decorative quotes */}
            <div className="absolute -left-8 -top-8 font-display text-8xl text-gray-100 dark:text-gray-800">
              &ldquo;
            </div>

            <blockquote className="relative">
              <p className="font-display text-2xl font-medium italic leading-relaxed text-gray-700 dark:text-gray-300 md:text-3xl">
                The world is a book, and those who do not travel read only one page.
              </p>
              <footer className="mt-6">
                <cite className="not-italic">
                  <span className="text-sm font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    — Saint Augustine
                  </span>
                </cite>
              </footer>
            </blockquote>

            {/* Decorative line */}
            <div className="mx-auto mt-8 h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-400" />
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
