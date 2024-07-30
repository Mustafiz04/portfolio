'use client'
import siteMetadata from '@/data/siteMetadata'
import mapboxgl from 'mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { allVisitedPlace } from './placesTraveled'

mapboxgl.accessToken = siteMetadata.mapboxApiKey || ''
/* eslint-disable jsx-a11y/iframe-has-title */
export default function Page() {
  const mapContainer = useRef(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng, setLng] = useState(77.575279)
  const [lat, setLat] = useState(12.97675)
  const [zoom, setZoom] = useState(2)

  // The following values can be changed to control rotation speed:

  // At low zooms, complete a revolution every two minutes.
  const secondsPerRevolution = 240
  // Above zoom level 5, do not rotate.
  const maxSpinZoom = 5
  // Rotate at intermediate speeds between zoom levels 3 and 5.
  const slowSpinZoom = 3

  let userInteracting = false
  const spinEnabled = true

  useEffect(() => {
    if (map.current) return // initialize map only once
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mustafizkaifee/clz8i3iqz002t01qtgnzq8gx0',
        center: [lng, lat],
        zoom: zoom,
        projection: 'globe',
      })
    } else {
      console.error('mapContainer.current is not defined')
    }

    function spinGlobe() {
      const zoom = map.current?.getZoom()
      if (spinEnabled && !userInteracting && (zoom ?? 0) < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution
        if ((zoom ?? 0) > slowSpinZoom) {
          // Slow spinning at higher zooms
          const zoomDif = (maxSpinZoom - (zoom ?? 0)) / (maxSpinZoom - slowSpinZoom)
          distancePerSecond *= zoomDif
        }
        const center = map.current?.getCenter()
        if (center) {
          center.lng -= distancePerSecond
        }
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        map.current?.easeTo({ center, duration: 1000, easing: (n) => n })
      }

      // Pause spinning on interaction
      map.current?.on('mousedown', () => {
        userInteracting = true
      })
      map.current?.on('dragstart', () => {
        userInteracting = true
      })
    }

    // When animation is complete, start spinning if there is no ongoing interaction
    map.current?.on('moveend', () => {
      spinGlobe()
    })

    // spinGlobe()

    // Create a default Marker, colored black, rotated 45 degrees.
    if (map.current) {
      allVisitedPlace.map((place) => {
        const [lng, lat] = place.coordinates
        return new mapboxgl.Marker({ color: place.markerColor })
          .setLngLat([lng, lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3 style="color: black;">${place.name}</h3>`
            )
          )
          .addTo(map.current!)
      })
    }
  })

  return (
    <>
      <div ref={mapContainer} className="map-container" style={{ height: '750px' }} />

      {/* <iframe src={siteMetadata.googleTravelMap} width="100%" height="480"></iframe> */}
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
