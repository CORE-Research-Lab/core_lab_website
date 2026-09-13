"use client"

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { HiArrowRight, HiExternalLink } from 'react-icons/hi'
import { posterItems, publicationsPage } from '@/data/publications'
import { getPublicationAuthors } from '@/lib/publications.mjs'
import { AuthorList } from '@/Components/Publications/PublicationCitation'
import { SectionHeading } from '@/Components/UI/SectionHeading'
import {
  CarouselArrows,
  autoplayOptions,
  prefersReducedMotion,
  stepCarousel,
} from '@/Components/UI/CarouselControls'

const posters = posterItems
const slideIntervalMs = 8000

/**
 * The description for one poster. Every poster's panel is rendered and laid
 * over the same grid cell, with only the one on stage visible, so the card is
 * always as tall as the tallest panel and never changes size as they cycle.
 */
const PosterPanel = ({ poster, onStage }) => {
  const publication = poster.publication
  const authors = getPublicationAuthors(publication)
  // A poster with no DOI yet links out to its venue instead.
  const secondaryLink = poster.doi
    ? { label: 'DOI', href: `https://doi.org/${poster.doi}` }
    : poster.eventUrl
      ? { label: 'Event page', href: poster.eventUrl }
      : null

  return (
    <div className={`col-start-1 row-start-1 p-5 sm:p-6 ${onStage ? '' : 'invisible'}`}>
      <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
        <span className='rounded-full bg-brand-soft px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-brand'>
          {poster.conference}
        </span>
        <span className='text-xs font-medium uppercase tracking-[0.12em] text-slate-500'>
          Poster
        </span>
      </div>

      <h3 className='mt-3 text-subsection font-semibold text-brand-dark'>
        <Link href={poster.link} className='hover:underline'>
          {poster.title}
        </Link>
      </h3>

      {authors.length > 0 && (
        <p className='mt-2 text-sm leading-6 text-slate-600'>
          <AuthorList authors={authors} coFirstAuthors={publication?.coFirstAuthors} />
        </p>
      )}

      {publication?.abstract && (
        <p className='mt-4 line-clamp-4 text-sm leading-6 text-slate-600'>
          {publication.abstract}
        </p>
      )}

      <div className='mt-5 flex flex-wrap gap-2'>
        <Link
          href={poster.link}
          className='inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark'
        >
          Open poster
          <HiArrowRight className='size-4' aria-hidden='true' />
        </Link>
        {secondaryLink && (
          <a
            href={secondaryLink.href}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 rounded-lg border border-brand/25 bg-white px-4 py-2 text-sm font-semibold text-brand hover:border-brand hover:bg-brand-soft'
          >
            {secondaryLink.label}
            <HiExternalLink className='size-4' aria-hidden='true' />
          </a>
        )}
      </div>
    </div>
  )
}

/**
 * The poster wall on the publications page. One poster hangs on the stage at a
 * time and the side panel describes it. Embla drives the stage, so swiping,
 * looping, and the header arrows all work; the panel just mirrors the selected
 * slide.
 */
const Posters = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay(autoplayOptions(slideIntervalMs))]
  )
  const [current, setCurrent] = useState(0)

  const previousSlide = useCallback(() => stepCarousel(emblaApi, -1), [emblaApi])
  const nextSlide = useCallback(() => stepCarousel(emblaApi, 1), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    // One poster means nothing to advance through, and the OS reduce-motion
    // setting means nothing should advance on its own either.
    if (posters.length <= 1 || prefersReducedMotion()) emblaApi.plugins().autoplay?.stop()

    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap())

    onSelect()
    emblaApi.on('select', onSelect).on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect)
    }
  }, [emblaApi])

  if (posters.length === 0) return null

  const showControls = posters.length > 1

  return (
    <section
      className='pt-8'
      aria-roledescription='carousel'
      aria-label={publicationsPage.postersTitle}
    >
      <SectionHeading id='posters'>{publicationsPage.postersTitle}</SectionHeading>

      <p className='mt-5 max-w-4xl text-lg leading-8 text-slate-600'>
        {publicationsPage.postersDescription}
      </p>

      <div className='mt-5 grid overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-[minmax(0,1fr)_21rem]'>
        {/* The stage. The carousel viewport fills whatever height the side
            panel needs, so a portrait and a landscape poster share one frame
            without the card changing size between them. */}
        <div className='relative min-h-[clamp(16rem,48vh,28rem)] lg:min-h-[clamp(24rem,60vh,36rem)]'>
          <div className='poster-wall absolute inset-0 overflow-hidden' ref={emblaRef}>
            <div className='flex h-full touch-pan-y'>
              {posters.map((poster, index) => (
                <div
                  key={poster.slug}
                  className='relative h-full min-w-0 flex-[0_0_100%]'
                  role='group'
                  aria-roledescription='slide'
                  aria-label={`${index + 1} of ${posters.length}`}
                >
                  {/* The outline sits inside the frame because the viewport
                      clips anything drawn outside it. */}
                  <Link
                    href={poster.link}
                    aria-label={`View poster: ${poster.title}`}
                    className='absolute inset-0 block focus-visible:-outline-offset-4'
                  >
                    <Image
                      src={poster.image}
                      alt=''
                      fill
                      priority={index === 0}
                      className='poster-paper object-contain p-5 sm:p-8'
                      sizes='(max-width: 1024px) 100vw, 640px'
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {showControls && (
            <>
              <CarouselArrows onPrevious={previousSlide} onNext={nextSlide} itemName='poster' />
              <p
                className='pointer-events-none absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold tabular-nums text-slate-600 ring-1 ring-slate-900/10 backdrop-blur-sm'
                aria-hidden='true'
              >
                {current + 1} / {posters.length}
              </p>
            </>
          )}
        </div>

        {/* `min-w-0` lets long titles wrap instead of widening the column
            past the card edge on phones. */}
        <div className='grid min-w-0 border-t border-slate-200 lg:border-l lg:border-t-0'>
          {posters.map((poster, index) => (
            <PosterPanel key={poster.slug} poster={poster} onStage={index === current} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Posters
