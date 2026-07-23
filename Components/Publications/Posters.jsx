"use client"

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { posterItems, publicationsPage } from '@/data/publications'
import Image from "next/image";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import Link from 'next/link';

const posterSlides = posterItems
const slideIntervalMs = 6000

const Posters = () => {
    const length = posterSlides.length

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

        const onSelect = () => setCurrent(emblaApi.selectedScrollSnap())

        onSelect()
        emblaApi.on('select', onSelect).on('reInit', onSelect)

        return () => {
            emblaApi.off('select', onSelect).off('reInit', onSelect)
        }
    }, [emblaApi]);

  if (length === 0) return null

  return (
    <section id="posters" className='w-full scroll-mt-24 px-5 pb-5 pt-10 sm:px-8 lg:px-12'>
        <h2 className="border-b border-b-slate-200 pb-3 text-2xl font-semibold text-brand">
            {publicationsPage.postersTitle}
        </h2>
        <div className="flex items-center gap-2 pt-5">
            <button
              type="button"
              onClick={previousSlide}
              className="shrink-0 cursor-pointer rounded-full p-2 text-3xl text-brand transition hover:bg-slate-100 sm:text-4xl"
              aria-label="Show previous poster"
            >
                <BsFillArrowLeftCircleFill aria-hidden="true" />
            </button>

            <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y">
                {posterSlides.map((poster) => (
                    <div key={poster.link} className="min-w-0 flex-[0_0_100%] px-1">
                        <Link
                          href={poster.link}
                          className="flex h-[20rem] flex-col overflow-hidden rounded-lg border border-slate-200 transition hover:border-brand-muted hover:shadow-sm sm:h-[34rem]"
                        >
                            <div className="flex min-h-0 flex-1 items-center justify-center px-3 pt-4 sm:px-10 sm:pt-5">
                                <Image
                                  src={poster.image}
                                  alt={`${poster.conference} poster: ${poster.title}`}
                                  className="h-full w-full object-contain"
                                  sizes="(max-width: 768px) 90vw, 800px"
                                />
                            </div>
                            <p className="mx-3 mt-3 shrink-0 border-t-2 border-t-brand py-3 text-xs leading-5 text-brand hover:underline sm:mx-10 sm:text-base sm:leading-6">
                                <b>{poster.conference}</b> - {poster.title}
                            </p>
                        </Link>
                    </div>
                ))}
                </div>
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="shrink-0 cursor-pointer rounded-full p-2 text-3xl text-brand transition hover:bg-slate-100 sm:text-4xl"
              aria-label="Show next poster"
            >
                <BsFillArrowRightCircleFill aria-hidden="true" />
            </button>
        </div>

        <div className='flex justify-center gap-7 py-4'>
            {posterSlides.map((poster, index)=>{
                return (
                    <button
                      type="button"
                      key={poster.link}
                      className={`h-3 w-3 cursor-pointer rounded-full ${index===current? 'bg-slate-700' : 'bg-slate-300'}`}
                      onClick={()=>scrollTo(index)}
                      aria-label={`Show poster ${index + 1}`}
                    />
                )
            })}
        </div>
    </section>
  )
}

export default Posters
