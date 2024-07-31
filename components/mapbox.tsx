'use client'
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { allVisitedPlace } from '../public/static/placesTraveled'

export function MapBoxGlobe({ accessToken }) {
  mapboxgl.accessToken = accessToken
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
    if (map.current || !accessToken) return
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
        map.current?.easeTo({ center, duration: 5000, easing: (n) => n * 5 })
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
    // map.current?.on('moveend', () => {
    //   spinGlobe()
    // })

    spinGlobe()

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

    return () => {
      map.current?.off('moveend', spinGlobe)
    }
  }, [])
  return (
    <>
      <div ref={mapContainer} className="map-container" style={{ height: '750px' }} />
    </>
  )
}
