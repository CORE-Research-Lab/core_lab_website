"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { publicationsByYear, publicationsPage } from '@/data/publications'
import {
  flattenPublications,
  getPublicationAuthors,
  groupPublicationsByYear,
  hasKnownPublicationYear,
} from '@/lib/publications.mjs'
import { SectionHeading } from '@/Components/UI/SectionHeading'
import SearchBar from './SearchBar'
import PublicationList from './PublicationList'

const allPublications = flattenPublications(publicationsByYear).filter(hasKnownPublicationYear)

// Precompute the searchable text once at module scope; it never changes between
// keystrokes, so rebuilding it inside the filter was wasted work on every one.
const searchIndex = new Map(
  allPublications.map(publication => [
    publication,
    [
      publication.title,
      getPublicationAuthors(publication).join(' '),
      publication.year,
      publication.booktitle,
      publication.journal,
      publication.series,
    ].filter(Boolean).join(' ').toLowerCase(),
  ])
)

const Papers = () => {
  const [query, setQuery] = useState('')
  const legendRef = useRef(null)
  const [legendHeight, setLegendHeight] = useState(0)

  // The year headings pin just below the legend, so the list needs to know
  // how tall the legend is at the current width.
  useEffect(() => {
    const legend = legendRef.current
    if (!legend) return

    const update = () => setLegendHeight(legend.offsetHeight)
    update()

    const observer = new ResizeObserver(update)
    observer.observe(legend)

    return () => observer.disconnect()
  }, [])

  const groupedFiltered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = normalizedQuery
      ? allPublications.filter(pub => searchIndex.get(pub).includes(normalizedQuery))
      : allPublications

    return groupPublicationsByYear(filtered)
  }, [query])

  const resultCount = useMemo(
    () => Object.values(groupedFiltered).reduce((total, list) => total + list.length, 0),
    [groupedFiltered]
  )

  return (
    <section
      className='sticky-below-legend pt-12'
      style={{ '--legend-height': `${legendHeight}px` }}
    >
      <SectionHeading id='papers'>{publicationsPage.papersTitle}</SectionHeading>

      {/* Sticky, so the key stays in view for the whole list. It stacks under
          the section chip row on small screens and under the navbar from `lg`,
          where the section nav is a side rail instead. */}
      <aside
        ref={legendRef}
        aria-label='Author formatting legend'
        className='sticky-legend z-10 mt-5 flex flex-wrap items-center gap-x-6 gap-y-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 shadow-sm sm:text-sm'
      >
        {/* The aside is already named for assistive tech; on phones the
            label only costs a line of sticky space. */}
        <strong className='hidden font-semibold text-slate-800 sm:inline'>Author legend:</strong>
        <span>
          <strong className='text-brand'>Bold name</strong>
          {' '}— current CORE Lab member
        </span>
        <span>
          <span className='text-brand underline underline-offset-2'>Underlined name</span>
          {' '}— CORE Lab alumni or collaborator
        </span>
        <span>
          <sup className='font-semibold text-brand'>*</sup>
          {' '}— equal contribution
        </span>
      </aside>

      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder={publicationsPage.searchPlaceholder}
        resultCount={resultCount}
      />

      <PublicationList
        groupedItems={groupedFiltered}
        numbered
        highlightQuery={query.trim()}
        emptyText={publicationsPage.noPapersText}
      />
    </section>
  )
}

export default Papers
