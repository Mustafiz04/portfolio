'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Dialog } from '@headlessui/react'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface Photo {
  src: string
  alt: string
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [shuffledPhotos, setShuffledPhotos] = useState<Photo[]>([])
  const [imageSources, setImageSources] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const convertImages = async () => {
      const heic2any = (await import('heic2any')).default
      setLoading(true)
      const sources = await Promise.all(
        photos.map(async (photo) => {
          if (photo.src.endsWith('.heic') || photo.src.endsWith('.HEIC')) {
            try {
              const response = await fetch(photo.src)
              if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.statusText}`)
              }
              const blob = await response.blob()
              console.log('Fetched blob:', blob)
              const converted = (await heic2any({ blob, toType: 'image/jpeg' })) as Blob
              return URL.createObjectURL(converted)
            } catch (error) {
              console.error('Error converting HEIC image:', error)
              return photo.src // Fallback to original source if conversion fails
            }
          }
          return photo.src
        })
      )
      setImageSources(sources)

      // Shuffle photos after converting images
      const shuffled = [...photos].sort(() => Math.random() - 0.5)
      setShuffledPhotos(shuffled)
    }

    convertImages()
  }, [photos])

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? photos.length - 1 : prev! - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === photos.length - 1 ? 0 : prev! + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === 'Escape') setSelectedImage(null)
  }

  return (
    <button onKeyDown={handleKeyDown} tabIndex={0} className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {shuffledPhotos.map((photo, index) => (
          <button
            key={photo.src}
            className="relative h-72 cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedImage(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setSelectedImage(index)
              }
            }}
            tabIndex={0}
          >
            <Image
              src={imageSources[index]}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      <Dialog
        open={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative h-[90vh] w-[90vw] max-w-7xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {selectedImage !== null && (
              <div className="relative h-full w-full">
                <Image
                  src={imageSources[selectedImage]}
                  alt={shuffledPhotos[selectedImage].alt}
                  fill
                  priority
                  sizes="90vw"
                  quality={85}
                  className="object-contain"
                />

                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </button>
  )
}
