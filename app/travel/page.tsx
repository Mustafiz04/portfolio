import { MapBoxGlobe } from '@/components/mapbox'
import siteMetadata from '@/data/siteMetadata'

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
        I had no idea I would enjoy travelling so much until June 2022, when I relocated to
        Bangalore and began visiting to nearby regions, going on many treks, and in September 2023,
        I embarked on my first solo foreign vacation to Turkey. It was my first time going out
        alone, and I was both afraid and eager. After my journey to Turkey, I realised how much
        travel can enrich your life in terms of information, meeting new people, and perspective.
        You meet people, communicate with them, and exchange your experiences, cultures, and views,
        which is a significant deal.
      </p>
      <p className="pt-2 text-base text-gray-500 dark:text-gray-400">
        I've created this page to visualize all the locations I've been so far or checkout my{' '}
        <a
          className="underline"
          href={siteMetadata.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram.
        </a>{' '}
      </p>
    </>
  )
}
