import { MapBoxGlobe } from '@/components/mapbox'
import PhotoGallery from '@/components/PhotoGallery'
import siteMetadata from '@/data/siteMetadata'
import { travelPhotos } from 'app/constant/travelPhotos'

const accessToken = siteMetadata.mapboxAccessToken || ''

/* eslint-disable jsx-a11y/iframe-has-title */
export default function Page() {
  return (
    <>
      {accessToken ? (
        <MapBoxGlobe accessToken={accessToken} />
      ) : (
        <iframe src={siteMetadata.googleTravelMap} width="100%" height="480"></iframe>
      )}
      <p className="pb-8 pt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        The Wanderland!
      </p>
      <p className="text-base text-gray-500 dark:text-gray-400">
        My passion for travel ignited unexpectedly in June 2022, shortly after I moved to Bangalore.
        What started as weekend treks in nearby regions quickly blossomed into a deep-seated love
        for exploration. In September 2023, I took a leap of faith with my first solo international
        trip to Turkey—a journey mixed with excitement and nervousness that ultimately transformed
        my perspective. I realized that travel is more than just sightseeing; it's about broadening
        horizons, connecting with diverse souls, and exchanging stories that enrich our
        understanding of the world.
      </p>
      <p className="pb-8 pt-2 text-base text-gray-500 dark:text-gray-400">
        So far, my adventures have taken me to seven incredible nations: Turkey, Singapore,
        Malaysia, the UAE, Saudi Arabia, Oman, and most recently, the historic lands of Egypt. Each
        destination has left an indelible mark on me, fueling my ambition to visit every country on
        this planet at least once. The world is a tapestry of cultures and landscapes waiting to be
        explored, and I am committed to seizing every opportunity to wander and wonder.
      </p>
      <p className="pb-8 pt-2 text-base text-gray-500 dark:text-gray-400">
        This page is designed to showcase all the places I've visited so far, and you can also check
        out my{' '}
        <a
          className="underline"
          href={siteMetadata.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram.
        </a>
      </p>
      <PhotoGallery photos={travelPhotos} />
      <p className="pb-8 pt-2 text-base text-gray-500 dark:text-gray-400">
        Many more to come soon. I hope these images inspire you to explore, dream, and create your
        own unforgettable experiences.
      </p>
    </>
  )
}
