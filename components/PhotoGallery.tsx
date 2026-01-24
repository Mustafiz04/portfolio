'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { Dialog } from '@headlessui/react'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface Photo {
  src: string
  alt: string
}

function useColumns() {
  const [columns, setColumns] = useState(1)

  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setColumns(4)
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        setColumns(3)
      } else if (window.matchMedia('(min-width: 640px)').matches) {
        setColumns(2)
      } else {
        setColumns(1)
      }
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  return columns
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [shuffledPhotos, setShuffledPhotos] = useState<Photo[]>([])
  const columns = useColumns()

  useEffect(() => {
    // Shuffle photos whenever the photos prop changes
    const shuffled = [...photos].sort(() => Math.random() - 0.5)
    setShuffledPhotos(shuffled)
  }, [photos])

  const columnPhotos = useMemo(() => {
    const cols = Array.from({ length: columns }, () => [] as { photo: Photo; index: number }[])
    shuffledPhotos.forEach((photo, index) => {
      cols[index % columns].push({ photo, index })
    })
    return cols
  }, [shuffledPhotos, columns])

  const handlePrevious = useCallback(() => {
    setSelectedImage((prev) => (prev === 0 ? shuffledPhotos.length - 1 : prev! - 1))
  }, [shuffledPhotos.length])

  const handleNext = useCallback(() => {
    setSelectedImage((prev) => (prev === shuffledPhotos.length - 1 ? 0 : prev! + 1))
  }, [shuffledPhotos.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, handlePrevious, handleNext])

  return (
    <div className="my-8 w-full outline-none">
      <div className="flex gap-4">
        {columnPhotos.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-1 flex-col gap-4">
            {col.map(({ photo, index }) => (
              <div key={photo.src} className="break-inside-avoid">
                <button
                  className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
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
                    width={500}
                    height={500}
                    className="h-auto w-full transition-all duration-500 group-hover:scale-110 group-hover:brightness-90"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="line-clamp-2 text-sm font-medium text-white">{photo.alt}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
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
    </div>
  )
}
