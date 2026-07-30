'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { projects, projectsSection } from '@/data/projects'
import { SectionHeading } from '@/Components/UI/SectionHeading'

const slideIntervalMs = 7000

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
 * The projects rail on the research page: one project per slide, sized so the
 * project image is actually readable rather than a thumbnail. The card is a
 * link — everything about a project lives on its own page, so this component
 * only has to know how to loop through them.
 */
const ProjectShowcase = () => {
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

    // One project means nothing to advance through, and the OS reduce-motion
    // setting means nothing should advance on its own either.
    if (projects.length <= 1 || prefersReducedMotion()) emblaApi.plugins().autoplay?.stop()

    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap())

    onSelect()
    emblaApi.on('select', onSelect).on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect)
    }
  }, [emblaApi])

  if (projects.length === 0) return null

  const showControls = projects.length > 1

  return (
    <section
      className='pt-8'
      aria-roledescription='carousel'
      aria-label={projectsSection.title}
    >
      <div className='flex items-end justify-between gap-4 border-b border-slate-200 pb-3'>
        <SectionHeading id='projects' bordered={false}>
          {projectsSection.title}
        </SectionHeading>
        {showControls && (
          <div className='flex shrink-0 items-center gap-2'>
            <ControlButton label='Show previous project' onClick={previousSlide}>
              <HiChevronLeft className='size-5' aria-hidden='true' />
            </ControlButton>
            <ControlButton label='Show next project' onClick={nextSlide}>
              <HiChevronRight className='size-5' aria-hidden='true' />
            </ControlButton>
          </div>
        )}
      </div>

      <p className='mt-5 max-w-4xl text-lg leading-8 text-slate-600'>
        {projectsSection.description}
      </p>

      <div className='mt-5 overflow-hidden' ref={emblaRef}>
        <div className='-ml-4 flex touch-pan-y'>
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className='min-w-0 flex-[0_0_100%] pl-4'
              role='group'
              aria-roledescription='slide'
              aria-label={`${index + 1} of ${projects.length}`}
            >
              <div className='flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white'>
                <Link
                  href={project.link}
                  className='flex min-h-0 flex-1 items-center justify-center bg-slate-50 p-4 sm:p-6'
                >
                  <Image
                    src={project.image}
                    alt=''
                    aria-hidden='true'
                    priority={index === 0}
                    className={`mx-auto h-auto w-auto max-w-full object-contain ${
                      project.showcaseImageClassName || 'max-h-[clamp(12rem,45vh,24rem)]'
                    }`}
                    sizes='(max-width: 1024px) 88vw, 720px'
                  />
                </Link>
                <div className='border-t border-slate-200 p-4 sm:p-6'>
                  <Link
                    href={project.link}
                    className='group block'
                  >
                    <span className='flex items-start gap-2'>
                      <span className='text-subsection font-semibold text-brand-dark group-hover:underline'>
                        {project.name}
                      </span>
                      {project.status === 'past' && (
                        <span className='mt-0.5 rounded-full bg-brand-soft px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-brand-muted'>
                          Past
                        </span>
                      )}
                    </span>
                    <span className='mt-2 block max-w-3xl text-base leading-7 text-slate-600'>
                      {project.summary}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <div className='mt-5 flex items-center justify-center gap-2'>
          {projects.map((project, index) => (
            <button
              type='button'
              key={project.slug}
              onClick={() => scrollTo(index)}
              aria-label={`Show ${project.name}`}
              aria-current={index === current ? 'true' : undefined}
            className={`size-2.5 rounded-full ${
                index === current ? 'bg-brand' : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProjectShowcase
