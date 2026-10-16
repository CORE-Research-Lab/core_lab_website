import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'
import { projects } from '@/data/projects'
import { flattenPublications } from '@/lib/publications.mjs'

const countPapers = (project) => flattenPublications(project.publications || {}).length
const countPeople = (project) => project.people.core.length + project.people.collaborators.length

// Active projects carry no label; the others say where they stand.
const statusLabels = {
  'in-development': 'In development',
  past: 'Past project',
}

// Name, summary, people, papers, and the arrow, from `md` up. Below that each
// row stacks, and the counts move under the summary.
const columns = 'md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_4.5rem_4.5rem_1.25rem]'

/**
 * Every project as one row of a table, in the order they are listed in the
 * data: its name, a one-sentence summary, and how many people and papers it
 * has. The tagline, description, people, and papers all live on the project's
 * own page, so the list stays short enough to scan.
 */
const ProjectList = () => (
  <div className='rounded-xl border border-slate-200 bg-white'>
    {/* Column headings for sighted readers; each row names its own counts
        for screen readers, so the headings stay out of the way of both. */}
    <div
      aria-hidden='true'
      className={`hidden gap-x-6 border-b border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid ${columns}`}
    >
      <span>Project</span>
      <span>What it does</span>
      <span className='text-right'>People</span>
      <span className='text-right'>Papers</span>
      <span />
    </div>

    <ul className='divide-y divide-slate-200'>
      {projects.map(project => {
        const people = countPeople(project)
        const papers = countPapers(project)

        return (
          <li key={project.slug}>
            {/* The whole row is the link, so the name, the summary, and the
                arrow all open the project. */}
            <Link
              href={project.link}
              className={`group grid gap-x-6 gap-y-1 px-5 py-4 transition-colors hover:bg-brand-soft/50 focus-visible:bg-brand-soft/50 md:items-baseline ${columns}`}
            >
              <span className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
                <span className='text-base font-semibold text-brand-dark group-hover:underline'>
                  {project.name}
                </span>
                {statusLabels[project.status] && (
                  <span className='rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600'>
                    {statusLabels[project.status]}
                  </span>
                )}
              </span>

              <span className='text-sm leading-6 text-slate-600'>{project.summary}</span>

              {/* Small screens: one line under the summary. From `md`: a
                  number in each column, with its noun kept for screen
                  readers. */}
              <span className='text-sm tabular-nums text-slate-500 md:hidden'>
                {people} {people === 1 ? 'person' : 'people'} · {papers} {papers === 1 ? 'paper' : 'papers'}
              </span>
              <span className='hidden text-right text-sm tabular-nums text-slate-500 md:block'>
                {people}<span className='sr-only'> {people === 1 ? 'person' : 'people'}</span>
              </span>
              <span className='hidden text-right text-sm tabular-nums text-slate-500 md:block'>
                {papers}<span className='sr-only'> {papers === 1 ? 'paper' : 'papers'}</span>
              </span>

              <HiArrowRight
                className='hidden size-4 self-center text-brand transition-colors md:block'
                aria-hidden='true'
              />
            </Link>
          </li>
        )
      })}
    </ul>
  </div>
)

export default ProjectList
