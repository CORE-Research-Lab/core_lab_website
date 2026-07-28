"use client"

import { useMemo, useState } from 'react'
import { hasKnownPublicationYear, publicationsByYear, publicationsPage } from '@/data/publications'
import {
  flattenPublications,
  getPublicationAuthors,
  groupPublicationsByYear,
  sortPublicationYearsDescending,
} from '@/lib/publications.mjs'
import SearchBar from './SearchBar'
import PublicationCitation from './PublicationCitation'

const allPublications = flattenPublications(publicationsByYear).filter(hasKnownPublicationYear)

const getSearchText = (publication) => {
  const authors = getPublicationAuthors(publication).join(' ')

  return [
    publication.title,
    authors,
    publication.year,
    publication.booktitle,
    publication.journal,
    publication.series,
  ].filter(Boolean).join(' ').toLowerCase()
}

const withReverseNumbersByYear = (groupedItems, sortedYears) => {
  const numbered = {}
  let number = sortedYears.reduce((total, year) => total + groupedItems[year].length, 0)

  for (const year of sortedYears) {
    numbered[year] = groupedItems[year].map(publication => ({
      publication,
      number: number--,
    }))
  }

  return numbered
}

const Papers = () => {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return allPublications

    return allPublications.filter(pub => getSearchText(pub).includes(normalizedQuery))
  }, [query])

  const groupedFiltered = useMemo(
    () => groupPublicationsByYear(filtered),
    [filtered]
  )

  const sortedYears = useMemo(
    () => Object.keys(groupedFiltered).sort(sortPublicationYearsDescending),
    [groupedFiltered]
  )

  const numberedGroups = useMemo(
    () => withReverseNumbersByYear(groupedFiltered, sortedYears),
    [groupedFiltered, sortedYears]
  )

  return (
    <section id="papers" className="w-full scroll-mt-24 px-5 py-8 sm:px-8 lg:px-12">
      <h2 className="border-b border-b-slate-200 pb-3 text-2xl font-semibold text-brand">
        {publicationsPage.papersTitle}
      </h2>

      <aside
        aria-label="Publication author formatting legend"
        className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
      >
        <strong className="font-semibold text-slate-800">Author legend:</strong>
        <span>
          <strong className="text-brand">Bold name</strong>
          {' '}— current CORE Lab member
        </span>
        <span>
          <span className="text-brand underline underline-offset-2">Underlined name</span>
          {' '}— CORE Lab alumni or collaborator
        </span>
      </aside>

      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder={publicationsPage.searchPlaceholder}
      />

      {filtered.length === 0 ? (
        <p className="pt-5 text-slate-600">{publicationsPage.noPapersText}</p>
      ) : (
        sortedYears.map(year => (
          <div key={year} className="scroll-mt-24">
            <div className="border-y border-y-brand py-2 text-[20px] font-semibold text-brand">
              {year}
            </div>
            <ul className="pt-5 text-slate-800">
              {numberedGroups[year].map(({ publication: pub, number }, index) => (
                <li key={pub.doi || `${pub.title}-${index}`} className="mb-2 py-3 leading-7">
                  <PublicationCitation publication={pub} number={number} />
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
  )
}

export default Papers
