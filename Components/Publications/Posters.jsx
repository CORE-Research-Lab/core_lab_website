"use client"

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { posterItems, publicationsPage } from '@/data/publications'
import Image from 'next/image'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import Link from 'next/link'
import { SectionHeading } from '@/Components/UI/SectionHeading'

const posterSlides = posterItems
const slideIntervalMs = 6000

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const ControlButton = ({ label, onClick, children }) => (
  <button
    type='button'
    onClick={onClick}
    aria-label={label}
    className='flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-brand hover:border-brand-muted hover:bg-brand-soft'
  >
    {children}
  </button>
)

const Posters = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: slideIntervalMs, stopOnInteraction: false, stopOnMouseEnter: true })]
  )
  const [current, setCurrent] = useState(0)

  const previousSlide = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const nextSlide = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback(index => emblaApi?.scrollTo(index), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    // Respect the OS "reduce motion" setting instead of auto-advancing at people.
    if (prefersReducedMotion()) emblaApi.plugins().autoplay?.stop()

    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap())

    onSelect()
    emblaApi.on('select', onSelect).on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect)
    }
  }, [emblaApi])

  if (posterSlides.length === 0) return null

  return (
    <section
      className='pt-8'
      aria-roledescription='carousel'
      aria-label={publicationsPage.postersTitle}
    >
      <div className='flex items-end justify-between gap-4 border-b border-slate-200 pb-3'>
        <SectionHeading id='posters' bordered={false}>
          {publicationsPage.postersTitle}
        </SectionHeading>
        {/* Controls live in the header rather than flanking the slide, so the
            poster itself gets the full column width on every screen size. */}
        <div className='flex shrink-0 items-center gap-2'>
          <ControlButton label='Show previous poster' onClick={previousSlide}>
            <HiChevronLeft className='size-5' aria-hidden='true' />
          </ControlButton>
          <ControlButton label='Show next poster' onClick={nextSlide}>
            <HiChevronRight className='size-5' aria-hidden='true' />
          </ControlButton>
        </div>
      </div>

      <div className='mt-5 overflow-hidden' ref={emblaRef}>
        <div className='-ml-4 flex touch-pan-y'>
          {posterSlides.map((poster, index) => (
            <div
              key={poster.link}
              className='min-w-0 flex-[0_0_100%] pl-4'
              role='group'
              aria-roledescription='slide'
              aria-label={`${index + 1} of ${posterSlides.length}`}
            >
              <Link
                href={poster.link}
                className='group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-brand-muted'
              >
                <div className='flex min-h-0 flex-1 items-center justify-center bg-slate-50 p-4 sm:p-6'>
                  <Image
                    src={poster.image}
                    alt={`${poster.conference} poster: ${poster.title}`}
                    className='max-h-[clamp(12rem,55vh,28rem)] w-auto max-w-full object-contain'
                    sizes='(max-width: 1024px) 88vw, 720px'
                  />
                </div>
                <p className='border-t border-slate-200 px-4 py-3 text-sm leading-6 text-brand group-hover:underline sm:px-6 sm:text-base'>
                  <b>{poster.conference}</b> — {poster.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-4 flex items-center justify-center gap-2'>
        {posterSlides.map((poster, index) => (
          <button
            type='button'
            key={poster.link}
            onClick={() => scrollTo(index)}
            aria-label={`Show poster ${index + 1}`}
            aria-current={index === current ? 'true' : undefined}
            className={`size-2.5 rounded-full ${
              index === current ? 'bg-brand' : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Posters
