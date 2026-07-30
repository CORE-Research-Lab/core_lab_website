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
    className='flex size-10 items-center justify-center border border-black/20 text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white'
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
      className='pt-10 sm:pt-16'
      aria-roledescription='carousel'
      aria-label={projectsSection.title}
    >
      <div className='flex items-end justify-between gap-4'>
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

      <p className='mt-7 max-w-4xl text-lg leading-8 text-slate-600 sm:text-xl'>
        {projectsSection.description}
      </p>

      <div className='mt-8 overflow-hidden' ref={emblaRef}>
        <div className='flex touch-pan-y'>
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className='min-w-0 flex-[0_0_100%]'
              role='group'
              aria-roledescription='slide'
              aria-label={`${index + 1} of ${projects.length}`}
            >
              <div className='flex h-full flex-col'>
                <Link
                  href={project.link}
                  className='flex min-h-0 flex-1 items-center justify-center'
                >
                  <Image
                    src={project.image}
                    alt=''
                    aria-hidden='true'
                    priority={index === 0}
                    className={`mx-auto h-auto w-auto max-w-full object-contain ${
                      project.showcaseImageClassName || 'max-h-[min(40svh,24rem)]'
                    }`}
                    sizes='(max-width: 768px) 92vw, 600px'
                  />
                </Link>
                <div className='mt-4'>
                  <Link
                    href={project.link}
                    className='group grid gap-2 sm:grid-cols-[minmax(0,0.3fr)_minmax(0,1fr)] sm:gap-8'
                  >
                    <span className='flex items-start gap-2'>
                      <span className='font-editorial text-subsection text-brand-dark transition-colors group-hover:text-brand'>
                        {project.name}
                      </span>
                      {project.status === 'past' && (
                        <span className='mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-500'>
                          Past
                        </span>
                      )}
                    </span>
                    <span className='block max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8'>
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
              className={`h-0.5 w-8 ${
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
