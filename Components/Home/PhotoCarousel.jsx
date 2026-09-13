'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { SectionHeading } from '@/Components/UI/SectionHeading'
import {
  CarouselArrows,
  autoplayOptions,
  prefersReducedMotion,
  stepCarousel,
} from '@/Components/UI/CarouselControls'

const slideIntervalMs = 5000

/**
 * One photo at a time in a frame whose size depends only on the screen width,
 * so the section is the same height whichever photo is showing. Photos are
 * fitted inside the frame rather than cropped to it, so a portrait shot loses
 * nothing; it just gets a little of the frame either side.
 */
const PhotoCarousel = ({ title, description, photos }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions(slideIntervalMs)),
  ])
  const [current, setCurrent] = useState(0)

  const previous = useCallback(() => stepCarousel(emblaApi, -1), [emblaApi])
  const next = useCallback(() => stepCarousel(emblaApi, 1), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    // One photo means nothing to advance through, and the OS reduce-motion
    // setting means nothing should advance on its own either.
    if (photos.length <= 1 || prefersReducedMotion()) emblaApi.plugins().autoplay?.stop()

    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap())

    onSelect()
    emblaApi.on('select', onSelect).on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect)
    }
  }, [emblaApi, photos.length])

  const showControls = photos.length > 1

  // The photo on show and the two beside it load ahead of time; the rest wait
  // until they are next up, so a slide never arrives blank but the page does
  // not fetch the whole album on load either.
  const isNear = (index) => {
    const distance = Math.abs(index - current)
    return Math.min(distance, photos.length - distance) <= 1
  }

  return (
    <section
      className='border-t border-brand-line'
      aria-roledescription='carousel'
      aria-label={title}
    >
      <div className='page-shell py-14 sm:py-16'>
        <SectionHeading id='photos'>{title}</SectionHeading>

        {description && (
          <p className='mt-5 max-w-4xl text-lg leading-8 text-slate-700'>{description}</p>
        )}

        {/* The frame: 4:3 on phones, 3:2 from tablets up, and never taller
            than 36rem on wide screens. Its height follows the screen width
            alone, so the photos inside cannot change it. */}
        <div className='relative mt-6 aspect-4/3 max-h-144 overflow-hidden rounded-xl border border-slate-200 bg-brand-soft/55 sm:aspect-3/2'>
          <div className='absolute inset-0' ref={emblaRef}>
            <div className='flex h-full touch-pan-y'>
              {photos.map((photo, index) => (
                <div
                  key={photo.src}
                  className='relative h-full min-w-0 flex-[0_0_100%]'
                  role='group'
                  aria-roledescription='slide'
                  aria-label={`${index + 1} of ${photos.length}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    loading={isNear(index) ? 'eager' : 'lazy'}
                    className='object-contain'
                    sizes='(max-width: 1280px) 100vw, 1184px'
                  />
                </div>
              ))}
            </div>
          </div>
          {showControls && (
            <>
              <CarouselArrows onPrevious={previous} onNext={next} itemName='photo' />
              <p
                className='pointer-events-none absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold tabular-nums text-slate-600 ring-1 ring-slate-900/10 backdrop-blur-sm'
                aria-hidden='true'
              >
                {current + 1} / {photos.length}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default PhotoCarousel
