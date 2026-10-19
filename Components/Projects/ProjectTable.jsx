'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HiArrowRight, HiChevronDown, HiChevronUp, HiSelector } from 'react-icons/hi'

// Name, summary, people, papers, and the arrow, from `md` up. Below that each
// row stacks, and the counts move under the summary.
const columns = 'md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_4.5rem_4.5rem_1.25rem]'

// What a first click on each heading does: names read A to Z, counts read
// largest first. Clicking the same heading again reverses it. A tie on one
// count is broken by the other, so equal paper counts put larger teams first.
const sortKeys = {
  name: { label: 'Project', firstDirection: 'asc', compare: (a, b) => a.name.localeCompare(b.name) },
  people: { label: 'People', firstDirection: 'desc', compare: (a, b) => a.people - b.people || a.papers - b.papers },
  papers: { label: 'Papers', firstDirection: 'desc', compare: (a, b) => a.papers - b.papers || a.people - b.people },
}

// The table opens with the most published projects first.
const defaultSort = { key: 'papers', direction: 'desc' }

const directionWords = {
  name: { asc: 'A to Z', desc: 'Z to A' },
  people: { asc: 'fewest first', desc: 'most first' },
  papers: { asc: 'fewest first', desc: 'most first' },
}

// The small-screen menu offers the same orders as the headings, by name.
const menuOptions = [
  { value: 'name-asc', label: 'Project, A to Z', sort: { key: 'name', direction: 'asc' } },
  { value: 'name-desc', label: 'Project, Z to A', sort: { key: 'name', direction: 'desc' } },
  { value: 'people-desc', label: 'Most people', sort: { key: 'people', direction: 'desc' } },
  { value: 'people-asc', label: 'Fewest people', sort: { key: 'people', direction: 'asc' } },
  { value: 'papers-desc', label: 'Most papers', sort: { key: 'papers', direction: 'desc' } },
  { value: 'papers-asc', label: 'Fewest papers', sort: { key: 'papers', direction: 'asc' } },
]

const nextSort = (current, key) =>
  current.key === key
    ? { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
    : { key, direction: sortKeys[key].firstDirection }

// Array sort is stable, so projects tied on both counts keep the order they
// are listed in the data.
const sortRows = (rows, sort) => {
  const { compare } = sortKeys[sort.key]
  const sign = sort.direction === 'asc' ? 1 : -1
  return [...rows].sort((a, b) => sign * compare(a, b))
}

const describeSort = (sort) =>
  `Sorted by ${sortKeys[sort.key].label.toLowerCase()}, ${directionWords[sort.key][sort.direction]}.`

const SortHeading = ({ sortKey, sort, onSort, alignRight }) => {
  const active = sort.key === sortKey
  const Icon = !active ? HiSelector : sort.direction === 'asc' ? HiChevronUp : HiChevronDown
  const icon = <Icon className={`size-3.5 shrink-0 ${active ? '' : 'text-slate-400'}`} aria-hidden='true' />

  return (
    <button
      type='button'
      onClick={() => onSort(sortKey)}
      className={`inline-flex items-center gap-1 rounded-sm text-xs font-semibold uppercase tracking-wide transition-colors hover:text-brand-dark ${
        alignRight ? 'justify-self-end' : 'justify-self-start'
      } ${active ? 'text-brand-dark' : 'text-slate-500'}`}
    >
      {/* Counts are right-aligned, so their icon goes first and the word
          lines up with the numbers below it. */}
      {alignRight && icon}
      {sortKeys[sortKey].label}
      <span className='sr-only'>
        {active ? `, sorted ${directionWords[sortKey][sort.direction]}` : ', sort'}
      </span>
      {!alignRight && icon}
    </button>
  )
}

/**
 * The project table, re-ordered by clicking the Project, People, or Papers
 * heading. Rows arrive as plain data from `ProjectList`, already counted.
 */
const ProjectTable = ({ rows }) => {
  const [sort, setSort] = useState(defaultSort)
  const sortedRows = sortRows(rows, sort)
  const menuValue = menuOptions.find(
    option => option.sort.key === sort.key && option.sort.direction === sort.direction
  ).value

  return (
    <div className='rounded-xl border border-slate-200 bg-white'>
      {/* Small screens have no column headings, so the orders are a menu. */}
      <div className='flex items-center justify-end gap-2 border-b border-slate-200 bg-slate-50 px-5 py-2.5 md:hidden'>
        <label htmlFor='project-sort' className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
          Sort by
        </label>
        <select
          id='project-sort'
          value={menuValue}
          onChange={event => setSort(menuOptions.find(option => option.value === event.target.value).sort)}
          className='rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700'
        >
          {menuOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div
        role='group'
        aria-label='Sort projects'
        className={`hidden gap-x-6 border-b border-slate-200 bg-slate-50 px-5 py-2.5 md:grid ${columns}`}
      >
        <SortHeading sortKey='name' sort={sort} onSort={key => setSort(nextSort(sort, key))} />
        <span aria-hidden='true' className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
          What it does
        </span>
        <SortHeading sortKey='people' sort={sort} onSort={key => setSort(nextSort(sort, key))} alignRight />
        <SortHeading sortKey='papers' sort={sort} onSort={key => setSort(nextSort(sort, key))} alignRight />
        <span />
      </div>

      {/* Tells screen-reader users the new order after each change. */}
      <p className='sr-only' aria-live='polite'>{describeSort(sort)}</p>

      <ul className='divide-y divide-slate-200'>
        {sortedRows.map(project => (
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
                {project.statusLabel && (
                  <span className='rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600'>
                    {project.statusLabel}
                  </span>
                )}
              </span>

              <span className='text-sm leading-6 text-slate-600'>{project.summary}</span>

              {/* Small screens: one line under the summary. From `md`: a
                  number in each column, with its noun kept for screen
                  readers. */}
              <span className='text-sm tabular-nums text-slate-500 md:hidden'>
                {project.people} {project.people === 1 ? 'person' : 'people'} · {project.papers} {project.papers === 1 ? 'paper' : 'papers'}
              </span>
              <span className='hidden text-right text-sm tabular-nums text-slate-500 md:block'>
                {project.people}<span className='sr-only'> {project.people === 1 ? 'person' : 'people'}</span>
              </span>
              <span className='hidden text-right text-sm tabular-nums text-slate-500 md:block'>
                {project.papers}<span className='sr-only'> {project.papers === 1 ? 'paper' : 'papers'}</span>
              </span>

              {/* Lined up with the first line of the row, like the name and
                  the counts, rather than centred on a row that can wrap. */}
              <span className='hidden text-brand md:inline-flex md:translate-y-0.5' aria-hidden='true'>
                <HiArrowRight className='size-4' />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectTable
