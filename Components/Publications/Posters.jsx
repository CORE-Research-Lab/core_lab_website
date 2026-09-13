"use client"

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { HiArrowRight, HiChevronLeft, HiChevronRight, HiExternalLink } from 'react-icons/hi'
import { posterItems, publicationsPage } from '@/data/publications'
import { getPublicationAuthors } from '@/lib/publications.mjs'
import { AuthorList } from '@/Components/Publications/PublicationCitation'
import { SectionHeading } from '@/Components/UI/SectionHeading'

const posters = posterItems
const slideIntervalMs = 8000

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

/**
 * Every poster as a thumbnail. This is the carousel's index: the reader can
 * see what else is on the wall and jump to it, instead of guessing from a row
 * of dots. Below `lg` it scrolls sideways under the panel; from `lg` up it
 * stacks at the bottom of the side column.
 */
const PosterIndex = ({ current, onSelect }) => (
  <div className='mt-auto border-t border-slate-200 bg-slate-50/80 p-3 sm:p-4'>
    <p className='px-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted'>
      All posters · {posters.length}
    </p>
    <ul className='mt-2 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0'>
      {posters.map((poster, index) => {
        const isActive = index === current

        return (
          <li key={poster.slug} className='w-64 shrink-0 lg:w-auto lg:shrink'>
            <button
              type='button'
              onClick={() => onSelect(index)}
              aria-current={isActive ? 'true' : undefined}
              className={`flex w-full items-center gap-3 rounded-lg border p-2 text-left ${
                isActive
                  ? 'border-brand bg-white'
                  : 'border-transparent hover:border-slate-200 hover:bg-white'
              }`}
            >
              <span className='relative h-14 w-16 shrink-0 overflow-hidden rounded bg-brand-soft/70'>
                <Image
                  src={poster.image}
                  alt=''
                  aria-hidden='true'
                  fill
                  className='object-contain p-1.5'
                  sizes='64px'
                />
              </span>
              <span className='min-w-0'>
                <span className='block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-brand-muted'>
                  {poster.conference}
                </span>
                <span
                  className={`mt-0.5 line-clamp-2 text-sm leading-5 ${
                    isActive ? 'font-semibold text-brand-dark' : 'font-medium text-slate-700'
                  }`}
                >
                  {poster.title}
                </span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  </div>
)

/**
 * The poster wall on the research page. One poster hangs on the stage at a
 * time; the side panel describes it and indexes the rest. Embla still drives
 * the stage so swiping, looping, and the header arrows work as they do on the
 * projects rail above; the panel just mirrors the selected slide.
 */
const Posters = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: slideIntervalMs, stopOnInteraction: true, stopOnMouseEnter: true })]
  )
  const [current, setCurrent] = useState(0)

  const previousSlide = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const nextSlide = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback(index => emblaApi?.scrollTo(index), [emblaApi])

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
  const active = posters[current] ?? posters[0]
  const publication = active.publication
  const authors = getPublicationAuthors(publication)
  // A poster with no DOI yet links out to its venue instead.
  const secondaryLink = active.doi
    ? { label: 'DOI', href: `https://doi.org/${active.doi}` }
    : active.eventUrl
      ? { label: 'Event page', href: active.eventUrl }
      : null

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
        {showControls && (
          <div className='flex shrink-0 items-center gap-2'>
            <ControlButton label='Show previous poster' onClick={previousSlide}>
              <HiChevronLeft className='size-5' aria-hidden='true' />
            </ControlButton>
            <ControlButton label='Show next poster' onClick={nextSlide}>
              <HiChevronRight className='size-5' aria-hidden='true' />
            </ControlButton>
          </div>
        )}
      </div>

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
            <p
              className='pointer-events-none absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold tabular-nums text-slate-600 ring-1 ring-slate-900/10 backdrop-blur-sm'
              aria-hidden='true'
            >
              {current + 1} / {posters.length}
            </p>
          )}
        </div>

        {/* The panel for whichever poster is on the stage. `min-w-0` is
            load-bearing: without it the fixed-width thumbnails in the index
            set the column's minimum width and push the panel past the card
            edge on phones. */}
        <div className='flex min-w-0 flex-col border-t border-slate-200 lg:border-l lg:border-t-0'>
          <div className='p-5 sm:p-6'>
            <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
              <span className='rounded-full bg-brand-soft px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-brand'>
                {active.conference}
              </span>
              <span className='text-xs font-medium uppercase tracking-[0.12em] text-slate-500'>
                Poster
              </span>
            </div>

            <h3 className='mt-3 text-subsection font-semibold text-brand-dark'>
              <Link href={active.link} className='hover:underline'>
                {active.title}
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
                href={active.link}
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

          {showControls && <PosterIndex current={current} onSelect={scrollTo} />}
        </div>
      </div>
    </section>
  )
}

export default Posters
