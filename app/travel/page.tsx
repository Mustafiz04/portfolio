import { MapBoxGlobe } from '@/components/mapbox'
import PhotoGallery from '@/components/PhotoGallery'
import siteMetadata from '@/data/siteMetadata'
import { travelPhotos, travelStats } from 'app/constant/travelPhotos'

const accessToken = siteMetadata.mapboxAccessToken || ''

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
          The <span className="text-primary-500">Wanderland</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Exploring the world, one story at a time. A collection of moments, cultures, and
          landscapes from my journeys across the globe.
        </p>
      </div>
      {/* Globe Section */}
      <div className="relative mb-16 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50/50 p-2 shadow-2xl dark:border-gray-800 dark:bg-gray-900/50">
        <div className="w-full overflow-hidden rounded-2xl">
          {accessToken ? (
            <MapBoxGlobe accessToken={accessToken} />
          ) : (
            <iframe
              src={siteMetadata.googleTravelMap}
              width="100%"
              height="100%"
              className="border-0"
              title="Travel Map"
            ></iframe>
          )}
        </div>
      </div>

      {/* Stats & Story Section */}
      <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Journey</h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            <p>
              My passion for travel ignited in June 2022, shortly after moving to Bangalore. What
              started as weekend treks quickly blossomed into a deep seated love for exploration.
            </p>
            <p>
              In September 2023, I took a leap of faith with my first solo international trip to
              Turkey a journey that ultimately transformed my perspective. I realized that travel is
              more than just sightseeing; it's about connecting with diverse souls and exchanging
              stories that enrich our understanding of the world.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href={siteMetadata.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-all hover:border-primary-500 hover:text-primary-500 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-primary-400 dark:hover:text-primary-400"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Follow on Instagram</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {travelStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:border-primary-500/30 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      {/* <div className="mb-12 space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Visual Stories</h2>
        <p className="text-gray-600 dark:text-gray-400">
          A glimpse into the landscapes and cultures I've encountered.
        </p>
      </div> */}

      <PhotoGallery photos={travelPhotos} />

      <div className="mt-20 text-center">
        <p className="text-lg italic text-gray-500 dark:text-gray-400">
          "The world is a book, and those who do not travel read only one page."
        </p>
      </div>
    </div>
  )
}
