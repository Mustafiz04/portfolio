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

  useEffect(() => {
    // Shuffle photos whenever the photos prop changes
    const shuffled = [...photos].sort(() => Math.random() - 0.5)
    setShuffledPhotos(shuffled)
  }, [photos])

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? shuffledPhotos.length - 1 : prev! - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === shuffledPhotos.length - 1 ? 0 : prev! + 1))
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
            className="group relative h-72 cursor-pointer overflow-hidden rounded-lg"
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
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300"
            />
            <div className="absolute inset-0 flex items-end bg-black/30 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-sm sm:text-white">{photo.alt}</p>
            </div>
          </button>
        ))}
      </div>

      <Dialog
        open={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-gray-900/95" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative h-[90vh] w-[90vw] max-w-7xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {selectedImage !== null && (
              <>
                <div className="relative h-full w-full">
                  <Image
                    src={shuffledPhotos[selectedImage].src}
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
                <p className="mt-4 text-center text-lg text-white">
                  {shuffledPhotos[selectedImage].alt}
                </p>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </button>
  )
}
