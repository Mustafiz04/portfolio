'use client'

import { useState, useEffect, useCallback, useMemo, Fragment } from 'react'
import Image from 'next/image'
import {
  Dialog,
  Transition,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Maximize2,
  Share2,
  Download,
  ChevronDown,
  Check,
  MapPin,
  Grid3X3,
} from 'lucide-react'

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
  japan: '🇯🇵',
}

const COUNTRY_NAMES: Record<string, string> = {
  All: 'All Destinations',
  uae: 'UAE',
  turkiye: 'Türkiye',
  singapore: 'Singapore',
  malaysia: 'Malaysia',
  saudiarabia: 'Saudi Arabia',
  oman: 'Oman',
  egypt: 'Egypt',
  japan: 'Japan',
}

function getCountryName(countryKey: string): string {
  if (COUNTRY_NAMES[countryKey]) return COUNTRY_NAMES[countryKey]
  return countryKey.charAt(0).toUpperCase() + countryKey.slice(1)
}

export default function PhotoGallery({ photos }: { photos: MediaItem[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [shuffledPhotos, setShuffledPhotos] = useState<MediaItem[]>([])
  const [activeFilter, setActiveFilter] = useState('All')
  const columns = useColumns()

  const countries = useMemo(() => {
    const extracted = photos.map((p) => {
      const parts = p.src.split('/')
      return parts[3] || 'Other'
    })
    return ['All', ...Array.from(new Set(extracted))]
  }, [photos])

  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: photos.length }
    photos.forEach((p) => {
      const parts = p.src.split('/')
      const countryKey = parts[3] || 'Other'
      counts[countryKey] = (counts[countryKey] || 0) + 1
    })
    return counts
  }, [photos])

  useEffect(() => {
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
    <div className="w-full outline-none">
      {/* Filter Section */}
      <div className="mb-12 w-full">
        {/* Mobile Dropdown */}
        <div className="relative mx-auto max-w-sm sm:hidden">
          <Listbox
            value={activeFilter}
            onChange={(val) => {
              setActiveFilter(val)
              setSelectedImage(null)
            }}
          >
            <div className="relative">
              <ListboxButton className="group relative flex w-full items-center justify-between rounded-2xl border border-gray-200/80 bg-white/80 px-5 py-4 text-left shadow-lg backdrop-blur-xl transition-all hover:border-primary-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/80 dark:hover:border-primary-700">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 text-xl dark:from-primary-900/50 dark:to-primary-800/30">
                    {COUNTRY_FLAGS[activeFilter] || '📍'}
                  </div>
                  <div>
                    <span className="block font-display text-base font-bold text-gray-900 dark:text-gray-100">
                      {getCountryName(activeFilter)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {countryCounts[activeFilter] || 0} photos
                    </span>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400 transition-transform group-data-[open]:rotate-180" />
              </ListboxButton>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <ListboxOptions className="absolute z-30 mt-2 max-h-80 w-full overflow-auto rounded-2xl border border-gray-200/80 bg-white/95 p-2 shadow-2xl backdrop-blur-xl focus:outline-none dark:border-gray-800 dark:bg-gray-900/95">
                  {countries.map((country) => (
                    <ListboxOption
                      key={country}
                      value={country}
                      className={({ active, selected }) =>
                        `relative flex cursor-pointer select-none items-center justify-between rounded-xl px-4 py-3 transition-all ${
                          selected
                            ? 'bg-primary-500 text-white'
                            : active
                              ? 'bg-gray-100 dark:bg-gray-800'
                              : ''
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{COUNTRY_FLAGS[country] || '📍'}</span>
                            <span className="font-medium">{getCountryName(country)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                selected
                                  ? 'bg-white/20'
                                  : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                              }`}
                            >
                              {countryCounts[country] || 0}
                            </span>
                            {selected && <Check className="h-4 w-4" />}
                          </div>
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* Desktop Filter Pills */}
        <div className="hidden flex-wrap justify-center gap-3 sm:flex">
          {countries.map((country) => {
            const isSelected = activeFilter === country
            return (
              <button
                key={country}
                onClick={() => {
                  setActiveFilter(country)
                  setSelectedImage(null)
                }}
                className={`group relative flex items-center gap-3 overflow-hidden rounded-full px-5 py-3 font-display text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'border border-gray-200/80 bg-white/60 text-gray-700 backdrop-blur-sm hover:border-primary-200 hover:bg-white hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-300 dark:hover:border-primary-800 dark:hover:bg-gray-900'
                }`}
              >
                {/* Hover shine effect */}
                {!isSelected && (
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary-500/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                )}

                <span className="relative text-lg">{COUNTRY_FLAGS[country] || '📍'}</span>
                <span className="relative">{getCountryName(country)}</span>
                <span
                  className={`relative rounded-full px-2 py-0.5 text-xs font-bold transition-colors ${
                    isSelected
                      ? 'bg-white/20'
                      : 'bg-gray-100 text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-600 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-primary-900/50 dark:group-hover:text-primary-400'
                  }`}
                >
                  {countryCounts[country] || 0}
                </span>
              </button>
            )
          })}
        </div>

        {/* Results count */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Grid3X3 className="h-4 w-4" />
          <span>
            Showing{' '}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {filteredPhotos.length}
            </span>{' '}
            memories
          </span>
        </div>
      </div>

      {/* Masonry Gallery Grid */}
      <div className="flex gap-4 md:gap-6">
        {columnPhotos.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-1 flex-col gap-4 md:gap-6">
            {col.map(({ photo, index }) => (
              <div key={photo.src} className="break-inside-avoid">
                <button
                  className="group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-md ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/10 dark:bg-gray-800 dark:ring-white/5"
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
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
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
                      {/* Video Play Indicator */}
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-black/30 p-4 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-black/50">
                          <Play className="h-8 w-8 text-white" fill="white" />
                        </div>
                      </div>
                      {/* Video Badge */}
                      <div className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
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
                        className="h-auto w-full transition-all duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      {/* Zoom Indicator */}
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="rounded-full bg-black/30 p-3 backdrop-blur-md">
                          <Maximize2 className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Caption Overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-5 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                      <div className="mb-2 flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-primary-400" />
                        <span className="text-xs font-medium uppercase tracking-wider text-primary-300">
                          {getCountryName(photo.src.split('/')[3] || 'Unknown')}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-sm font-medium leading-snug text-white">
                        {photo.alt}
                      </p>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-primary-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Transition show={selectedImage !== null} as={Fragment}>
        <Dialog onClose={() => setSelectedImage(null)} className="relative z-50">
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/95 backdrop-blur-xl" aria-hidden="true" />
          </Transition.Child>

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative flex h-full w-full flex-col items-center justify-center">
                {/* Top Bar */}
                <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
                  {/* Counter */}
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold tracking-wider text-white/90 ring-1 ring-white/20 backdrop-blur-xl">
                      {selectedImage !== null && (
                        <>
                          <span className="text-primary-400">{selectedImage + 1}</span>
                          <span className="mx-1 text-white/40">/</span>
                          <span>{filteredPhotos.length}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="rounded-full bg-white/10 p-3 text-white/70 ring-1 ring-white/10 backdrop-blur-xl transition-all hover:bg-white/20 hover:text-white">
                      <Share2 className="h-5 w-5" />
                    </button>
                    <button className="rounded-full bg-white/10 p-3 text-white/70 ring-1 ring-white/10 backdrop-blur-xl transition-all hover:bg-white/20 hover:text-white">
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="rounded-full bg-white/10 p-3 text-white/70 ring-1 ring-white/10 backdrop-blur-xl transition-all hover:bg-red-500/80 hover:text-white hover:ring-red-500/50"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Main Image */}
                {selectedImage !== null && (
                  <div className="relative flex h-full w-full items-center justify-center px-4 sm:px-16">
                    {/* Prev Button */}
                    <button
                      onClick={handlePrevious}
                      className="absolute left-4 z-20 hidden rounded-full bg-white/5 p-4 text-white/50 ring-1 ring-white/10 backdrop-blur-xl transition-all hover:bg-white/20 hover:text-white sm:left-8 sm:block"
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </button>

                    <div className="relative h-[70vh] w-full max-w-5xl sm:h-[80vh]">
                      {filteredPhotos[selectedImage].type === 'video' ? (
                        <video
                          src={filteredPhotos[selectedImage].src}
                          className="h-full w-full rounded-xl object-contain"
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
                          className="rounded-xl object-contain"
                        />
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={handleNext}
                      className="absolute right-4 z-20 hidden rounded-full bg-white/5 p-4 text-white/50 ring-1 ring-white/10 backdrop-blur-xl transition-all hover:bg-white/20 hover:text-white sm:right-8 sm:block"
                    >
                      <ChevronRight className="h-8 w-8" />
                    </button>
                  </div>
                )}

                {/* Bottom Info */}
                {selectedImage !== null && (
                  <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/80 to-transparent px-6 pb-8 pt-16">
                    {/* Caption */}
                    <div className="mx-auto max-w-2xl text-center">
                      <div className="mb-3 flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4 text-primary-400" />
                        <span className="text-sm font-medium uppercase tracking-wider text-primary-400">
                          {getCountryName(
                            filteredPhotos[selectedImage].src.split('/')[3] || 'Unknown'
                          )}
                        </span>
                      </div>
                      <p className="text-base font-medium text-white/90 sm:text-lg">
                        {filteredPhotos[selectedImage].alt}
                      </p>
                    </div>

                    {/* Filmstrip - Desktop */}
                    <div className="mt-8 hidden justify-center gap-2 overflow-x-auto pb-2 sm:flex">
                      {filteredPhotos.slice(0, 12).map((photo, idx) => (
                        <button
                          key={`thumb-${photo.src}`}
                          onClick={() => setSelectedImage(idx)}
                          className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                            selectedImage === idx
                              ? 'scale-110 ring-2 ring-primary-500'
                              : 'opacity-40 hover:opacity-80'
                          }`}
                        >
                          {photo.type === 'video' ? (
                            <div className="flex h-full w-full items-center justify-center bg-gray-800">
                              <Play className="h-4 w-4 text-white" />
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
                      {filteredPhotos.length > 12 && (
                        <div className="flex h-14 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-white/60">
                          +{filteredPhotos.length - 12}
                        </div>
                      )}
                    </div>

                    {/* Mobile Navigation */}
                    <div className="mt-6 flex items-center justify-center gap-8 sm:hidden">
                      <button
                        onClick={handlePrevious}
                        className="rounded-full bg-white/10 p-4 text-white ring-1 ring-white/20 backdrop-blur-xl"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="rounded-full bg-white/10 p-4 text-white ring-1 ring-white/20 backdrop-blur-xl"
                      >
                        <ChevronRight className="h-6 w-6" />
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
