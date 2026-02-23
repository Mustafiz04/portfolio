'use client'

import { useState, useEffect, useCallback, useMemo, Fragment } from 'react'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  ArrowsPointingOutIcon,
  ShareIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'

interface MediaItem {
  src: string
  alt: string
  type?: 'image' | 'video'
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

const COUNTRY_FLAGS: Record<string, string> = {
  All: '🌍',
  uae: '🇦🇪',
  turkiye: '🇹🇷',
  singapore: '🇸🇬',
  malaysia: '🇲🇾',
  saudiarabia: '🇸🇦',
  oman: '🇴🇲',
  egypt: '🇪🇬',
}

export default function PhotoGallery({ photos }: { photos: MediaItem[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [shuffledPhotos, setShuffledPhotos] = useState<MediaItem[]>([])
  const [activeFilter, setActiveFilter] = useState('All')
  const columns = useColumns()

  // Extract unique countries from photo paths
  const countries = useMemo(() => {
    const extracted = photos.map((p) => {
      const parts = p.src.split('/')
      // Assuming path is /static/images/[country]/...
      return parts[3] || 'Other'
    })
    return ['All', ...Array.from(new Set(extracted))]
  }, [photos])

  useEffect(() => {
    // Shuffle photos whenever the photos prop changes
    const shuffled = [...photos].sort(() => Math.random() - 0.5)
    setShuffledPhotos(shuffled)
  }, [photos])

  const filteredPhotos = useMemo(() => {
    if (activeFilter === 'All') return shuffledPhotos
    return shuffledPhotos.filter((p) => p.src.includes(`/${activeFilter}/`))
  }, [shuffledPhotos, activeFilter])

  const columnPhotos = useMemo(() => {
    const cols = Array.from({ length: columns }, () => [] as { photo: MediaItem; index: number }[])
    filteredPhotos.forEach((photo, index) => {
      cols[index % columns].push({ photo, index })
    })
    return cols
  }, [filteredPhotos, columns])

  const handlePrevious = useCallback(() => {
    setSelectedImage((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev! - 1))
  }, [filteredPhotos.length])

  const handleNext = useCallback(() => {
    setSelectedImage((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev! + 1))
  }, [filteredPhotos.length])

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
      {/* Filter Bar */}
      <div className="no-scrollbar mb-12 flex w-full overflow-x-auto pb-4 sm:pb-0">
        <div className="mx-auto flex flex-nowrap gap-3 px-4">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => {
                setActiveFilter(country)
                setSelectedImage(null)
              }}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold tracking-wide transition-all duration-300 ${
                activeFilter === country
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              } uppercase`}
            >
              <span className="text-lg">{COUNTRY_FLAGS[country] || '📍'}</span>
              <span>{country}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {columnPhotos.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-1 flex-col gap-4">
            {col.map(({ photo, index }) => (
              <div key={photo.src} className="break-inside-avoid">
                <button
                  className="group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-800 dark:ring-white/5"
                  onClick={() => setSelectedImage(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedImage(index)
                    }
                  }}
                  tabIndex={0}
                >
                  {photo.type === 'video' ? (
                    <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-auto">
                      <video
                        src={photo.src}
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause()
                          e.currentTarget.currentTime = 0
                        }}
                      >
                        <track kind="captions" />
                      </video>
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-white/20 p-4 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                          <PlayIcon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        Video
                      </div>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={600}
                        height={800}
                        className="h-auto w-full transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="rounded-full bg-white/20 p-3 backdrop-blur-md">
                          <ArrowsPointingOutIcon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Caption Overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="line-clamp-2 text-sm font-semibold leading-relaxed text-white">
                        {photo.alt}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Transition show={selectedImage !== null} as={Fragment}>
        <Dialog onClose={() => setSelectedImage(null)} className="relative z-50">
          {/* Backdrop with intense blur */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-black/98 fixed inset-0 backdrop-blur-xl" aria-hidden="true" />
          </Transition.Child>

          {/* Full-screen container */}
          <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="relative flex h-full w-full flex-col items-center justify-center">
                {/* Top Navigation Bar */}
                <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between p-4 sm:p-8">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 ring-1 ring-white/20 backdrop-blur-xl">
                      {selectedImage !== null && `${selectedImage + 1} / ${filteredPhotos.length}`}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4">
                    <button className="rounded-full bg-white/10 p-2.5 text-white/80 ring-1 ring-white/10 backdrop-blur-xl transition-all hover:bg-white/20 hover:text-white">
                      <ShareIcon className="h-5 w-5" />
                    </button>
                    <button className="rounded-full bg-white/10 p-2.5 text-white/80 ring-1 ring-white/10 backdrop-blur-xl transition-all hover:bg-white/20 hover:text-white">
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="rounded-full bg-white/10 p-2.5 text-white/80 ring-1 ring-white/10 backdrop-blur-xl transition-all hover:bg-white/20 hover:text-white"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Main Content Area */}
                {selectedImage !== null && (
                  <div className="relative flex h-full w-full items-center justify-center px-4 sm:px-12">
                    {/* Desktop Navigation Arrows */}
                    <button
                      onClick={handlePrevious}
                      className="absolute left-8 z-20 hidden rounded-full bg-white/5 p-4 text-white/60 ring-1 ring-white/10 backdrop-blur-3xl transition-all hover:bg-white/20 hover:text-white sm:block"
                    >
                      <ChevronLeftIcon className="h-8 w-8" />
                    </button>

                    <div className="relative h-[70vh] w-full max-w-6xl sm:h-[75vh]">
                      {filteredPhotos[selectedImage].type === 'video' ? (
                        <video
                          src={filteredPhotos[selectedImage].src}
                          className="h-full w-full rounded-lg object-contain shadow-2xl"
                          controls
                          autoPlay
                          playsInline
                        >
                          <track kind="captions" />
                        </video>
                      ) : (
                        <Image
                          src={filteredPhotos[selectedImage].src}
                          alt={filteredPhotos[selectedImage].alt}
                          fill
                          priority
                          sizes="100vw"
                          quality={100}
                          className="rounded-lg object-contain shadow-2xl"
                        />
                      )}
                    </div>

                    <button
                      onClick={handleNext}
                      className="absolute right-8 z-20 hidden rounded-full bg-white/5 p-4 text-white/60 ring-1 ring-white/10 backdrop-blur-3xl transition-all hover:bg-white/20 hover:text-white sm:block"
                    >
                      <ChevronRightIcon className="h-8 w-8" />
                    </button>
                  </div>
                )}

                {/* Bottom Info & Filmstrip */}
                {selectedImage !== null && (
                  <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center bg-gradient-to-t from-black via-black/80 to-transparent px-6 pb-8 pt-20">
                    <p className="mb-8 max-w-2xl text-center text-sm font-medium tracking-wide text-white/90 sm:text-base">
                      {filteredPhotos[selectedImage].alt}
                    </p>

                    {/* Filmstrip - Desktop Only */}
                    <div className="hidden w-full max-w-4xl justify-center gap-2 overflow-x-auto pb-2 sm:flex">
                      {filteredPhotos.map((photo, idx) => (
                        <button
                          key={`thumb-${photo.src}`}
                          onClick={() => setSelectedImage(idx)}
                          className={`relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-md transition-all duration-300 ${
                            selectedImage === idx
                              ? 'z-10 scale-110 ring-2 ring-white'
                              : 'opacity-40 hover:opacity-100'
                          }`}
                        >
                          {photo.type === 'video' ? (
                            <div className="flex h-full w-full items-center justify-center bg-gray-800">
                              <PlayIcon className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              className="object-cover"
                              sizes="100px"
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Mobile Navigation Controls */}
                    <div className="flex items-center gap-12 sm:hidden">
                      <button
                        onClick={handlePrevious}
                        className="rounded-full bg-white/10 p-4 text-white ring-1 ring-white/20 backdrop-blur-xl"
                      >
                        <ChevronLeftIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="rounded-full bg-white/10 p-4 text-white ring-1 ring-white/20 backdrop-blur-xl"
                      >
                        <ChevronRightIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
