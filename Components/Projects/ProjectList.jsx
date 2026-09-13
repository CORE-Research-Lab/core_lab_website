import Image from 'next/image'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'
import { projects } from '@/data/projects'
import { flattenPublications } from '@/lib/publications.mjs'

const countPapers = (project) => flattenPublications(project.publications || {}).length
const countPeople = (project) => project.people.core.length + project.people.collaborators.length

const plural = (count, noun) => `${count} ${noun}${count === 1 ? '' : 's'}`

/**
 * Every project, top to bottom, in the order they are listed in the data.
 * One card per project: the image beside the copy from `lg` up, stacked below
 * it. Everything about a project lives on its own page, so a card only has to
 * say what it is and how big it is.
 */
const ProjectList = () => (
  <ul className='space-y-6'>
    {projects.map((project, index) => (
      <li key={project.slug}>
        <article className='grid overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]'>
          {/* The image is a click target for mouse users only; the title and
              the button below already carry the link for keyboards and
              screen readers, so this one stays out of the tab order. */}
          <Link
            href={project.link}
            tabIndex={-1}
            aria-hidden='true'
            className='flex items-center justify-center bg-slate-50 p-4 sm:p-6 lg:border-r lg:border-slate-200'
          >
            <Image
              src={project.image}
              alt=''
              priority={index === 0}
              className='max-h-64 w-auto max-w-full object-contain'
              sizes='(max-width: 1024px) 100vw, 384px'
            />
          </Link>

          <div className='flex min-w-0 flex-col p-5 sm:p-6'>
            <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
              <h2 className='text-subsection font-semibold text-brand-dark'>
                <Link href={project.link} className='hover:underline'>
                  {project.name}
                </Link>
              </h2>
              {project.status === 'past' && (
                <span className='rounded-full bg-brand-soft px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-brand-muted'>
                  Past
                </span>
              )}
            </div>

            <p className='mt-1 text-base font-medium leading-7 text-slate-800'>
              {project.tagline}
            </p>
            <p className='mt-3 max-w-3xl text-base leading-7 text-slate-600'>
              {project.summary}
            </p>

            <div className='mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-slate-200 pt-4'>
              <p className='text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted'>
                {plural(countPeople(project), 'person').replace('persons', 'people')}
                {' · '}
                {plural(countPapers(project), 'paper')}
              </p>
              <Link
                href={project.link}
                className='inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline'
              >
                View project
                <HiArrowRight className='size-4' aria-hidden='true' />
              </Link>
            </div>
          </div>
        </article>
      </li>
    ))}
  </ul>
)

export default ProjectList
