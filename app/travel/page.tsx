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
        I never anticipated how much I would enjoy traveling until June 2022, when I moved to
        Bangalore and began exploring nearby regions through various treks. In September 2023, I
        embarked on my first solo international trip to Turkey. It was a new experience for me,
        filled with both excitement and apprehension. After my journey to Turkey, I discovered how
        travel can profoundly enrich your life by broadening your knowledge, connecting with new
        people, and offering fresh perspectives. You meet individuals, engage in conversations, and
        share your experiences, cultures, and viewpoints, which is incredibly valuable.
      </p>
      <p className="pb-8 pt-2 text-base text-gray-500 dark:text-gray-400">
        To date, I have had the privilege of visiting six remarkable countries: Turkey, Singapore,
        Malaysia, the UAE, Saudi Arabia and Oman. Each journey has enriched my life in unique ways,
        and I am driven by a profound goal to explore every country at least once in my lifetime.
        The world is vast and filled with diverse cultures, landscapes, and stories waiting to be
        discovered, and I am eager to embrace every opportunity that comes my way.
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
