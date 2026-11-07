"use client"

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiArrowRight, HiExternalLink } from 'react-icons/hi'
import { posterItems, publicationsPage } from '@/data/publications'
import { getPublicationAuthors } from '@/lib/publications.mjs'
import { AuthorList } from '@/Components/Publications/PublicationCitation'
import { SectionHeading } from '@/Components/UI/SectionHeading'
import { TurnControls, useSwipe } from '@/Components/UI/TurnControls'

const posters = posterItems

// Posters are never hung quite straight. A fixed sequence keeps each one's
// tilt the same between server and browser renders.
const tilts = ['-0.8deg', '0.6deg', '-0.4deg', '0.9deg', '-0.6deg']

// The order the strips go on when a poster is taped up.
const tapes = ['top-left', 'top-right', 'bottom-right', 'bottom-left']

/**
 * The description for one poster. Every poster's panel is rendered and laid
 * over the same grid cell, with only the one on the wall visible, so the card
 * is always as tall as the tallest panel and never changes size between them.
 */
const PosterPanel = ({ poster, onWall }) => {
  const publication = poster.publication
  const authors = getPublicationAuthors(publication)
  // A poster with no DOI yet links out to its venue instead.
  const secondaryLink = poster.doi
    ? { label: 'DOI', href: `https://doi.org/${poster.doi}` }
    : poster.eventUrl
      ? { label: 'Event page', href: poster.eventUrl }
      : null

  return (
    <div
      className={`col-start-1 row-start-1 p-5 transition-[opacity,visibility] duration-300 sm:p-6 ${
        onWall ? 'opacity-100' : 'invisible opacity-0'
      }`}
    >
      <p className='text-sm font-medium text-slate-600'>
        {poster.conference} poster
      </p>

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
 * The poster wall on the publications page. One poster hangs on the wall at a
 * time, taped at the corners, and the side panel describes it. Changing
 * posters crossfades one into the next in place rather than sliding along a
 * track. Every poster is rendered in the same spot, so they are all loaded and
 * the wall never changes size between them.
 */
const Posters = () => {
  const [current, setCurrent] = useState(0)
  const wallRef = useRef(null)

  const show = (direction) => {
    if (posters.length < 2) return
    const next = (current + direction + posters.length) % posters.length
    const swap = () => setCurrent(next)
    // A hidden poster is loaded but not yet decoded. Decoding it first means
    // the crossfade brings in the sheet itself, not a blank one for a frame.
    const image = wallRef.current?.querySelectorAll('.poster-slot img')[next]
    if (image?.complete) image.decode().then(swap, swap)
    else swap()
  }

  const swipe = useSwipe({ onNext: () => show(1), onPrevious: () => show(-1) })

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') show(1)
    if (event.key === 'ArrowLeft') show(-1)
  }

  if (posters.length === 0) return null

  return (
    <section className='pt-8' aria-label={publicationsPage.postersTitle} onKeyDown={onKeyDown}>
      <SectionHeading id='posters'>{publicationsPage.postersTitle}</SectionHeading>

      <p className='mt-5 max-w-4xl text-lg leading-8 text-slate-600'>
        {publicationsPage.postersDescription}
      </p>

      <div className='mt-5 grid overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-[minmax(0,1fr)_21rem]'>
        <div className='flex min-w-0 flex-col'>
          {/* The wall. It fills whatever height the side panel needs, so a
              portrait and a landscape poster share one frame without the card
              changing size between them. */}
          <div
            ref={wallRef}
            className='poster-wall relative min-h-[clamp(16rem,48vh,28rem)] grow touch-pan-y select-none overflow-hidden lg:min-h-[clamp(24rem,60vh,36rem)]'
            {...swipe}
          >
            {posters.map((poster, index) => {
              const onWall = index === current
              // The posters either side load ahead, so a swap never fades in
              // a blank sheet; hidden ones further away wait their turn.
              const distance = Math.abs(index - current)
              const isNear = Math.min(distance, posters.length - distance) <= 1

              return (
                // The outline sits inside the wall because the wall clips
                // anything drawn outside it. The padding leaves room for the
                // tape that overhangs each corner.
                <Link
                  key={poster.slug}
                  href={poster.link}
                  aria-label={`View poster: ${poster.title}`}
                  aria-hidden={onWall ? undefined : true}
                  tabIndex={onWall ? undefined : -1}
                  draggable={false}
                  data-state={onWall ? 'on' : 'off'}
                  className='poster-slot absolute inset-0 block p-8 focus-visible:-outline-offset-4 sm:p-12'
                >
                  <span className='poster-fit grid size-full place-items-center'>
                    <span
                      className='taped-poster'
                      style={{
                        '--ratio': poster.image.width / poster.image.height,
                        '--tilt': tilts[index % tilts.length],
                      }}
                    >
                      <Image
                        src={poster.image}
                        alt=''
                        fill
                        priority={index === 0}
                        loading={index === 0 ? undefined : isNear ? 'eager' : 'lazy'}
                        className='object-cover'
                        sizes='(max-width: 1024px) 90vw, 600px'
                        draggable={false}
                      />
                      {tapes.map((tape, order) => (
                        <span
                          key={tape}
                          className='poster-tape'
                          data-tape={tape}
                          style={{ '--tape-order': order }}
                          aria-hidden='true'
                        />
                      ))}
                    </span>
                  </span>
                </Link>
              )
            })}
          </div>

          {posters.length > 1 && (
            <TurnControls
              className='border-t border-slate-200 py-2'
              itemName='poster'
              onPrevious={() => show(-1)}
              onNext={() => show(1)}
              label={`${current + 1} of ${posters.length}`}
            />
          )}
        </div>

        {/* `min-w-0` lets long titles wrap instead of widening the column
            past the card edge on phones. */}
        <div className='grid min-w-0 border-t border-slate-200 lg:border-l lg:border-t-0'>
          {posters.map((poster, index) => (
            <PosterPanel key={poster.slug} poster={poster} onWall={index === current} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Posters
