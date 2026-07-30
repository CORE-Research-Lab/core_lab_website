"use client"

import { useMemo, useState } from 'react'
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
    <section className='pt-12'>
      <SectionHeading id='papers'>{publicationsPage.papersTitle}</SectionHeading>

      <aside
        aria-label='Research author formatting legend'
        className='mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700'
      >
        <strong className='font-semibold text-slate-800'>Author legend:</strong>
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
          {' '}— co-first author
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
