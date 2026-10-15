"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { publicationsByYear, publicationsPage } from '@/data/publications'
import {
  flattenPublications,
  getPublicationAuthors,
  getPublicationField,
  getPublicationVenueBucket,
  groupPublicationsByYear,
  hasKnownPublicationYear,
  summarisePublicationFields,
  summarisePublicationVenues,
  PREPRINT_VENUE,
  UNLISTED_VENUE,
} from '@/lib/publications.mjs'
import { SectionHeading } from '@/Components/UI/SectionHeading'
import SearchBar from './SearchBar'
import PublicationFilters from './PublicationFilters'
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

// The filter offers the same venue buckets the homepage treemap draws, so a
// tile's link always lands on a venue the dropdown knows.
const venueLabels = { [PREPRINT_VENUE]: 'Pre-print', [UNLISTED_VENUE]: 'Venue not listed' }

const venueOptions = summarisePublicationVenues(allPublications).map(bucket => ({
  value: bucket.name,
  label: venueLabels[bucket.name] || bucket.name,
  count: bucket.count,
}))

const venueOf = new Map(allPublications.map(publication => [publication, getPublicationVenueBucket(publication)]))

// Fields group venues the same way the homepage's by-field view does.
const fieldOptions = summarisePublicationFields(allPublications).map(bucket => ({
  value: bucket.name,
  label: bucket.name,
  count: bucket.count,
}))

const fieldOf = new Map(allPublications.map(publication => [publication, getPublicationField(publication)]))

const yearOptions = [...new Set(allPublications.map(publication => publication.year))].sort((a, b) => b - a)

// Only values the lists actually offer are honoured, so a stale or hand-edited
// link falls back to "all" rather than an empty list.
const readFilters = params => {
  const venue = params.get('venue') || ''
  const field = params.get('field') || ''
  const from = params.get('from') || ''
  const to = params.get('to') || ''

  return {
    venue: venueOptions.some(option => option.value === venue) ? venue : '',
    field: fieldOptions.some(option => option.value === field) ? field : '',
    from: yearOptions.includes(from) ? from : '',
    to: yearOptions.includes(to) ? to : '',
  }
}

const Papers = () => {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filters = readFilters(searchParams)

  // The URL is the filter state, so the back button and shared links work.
  const setFilters = useCallback(
    changes => {
      const next = new URLSearchParams(searchParams)
      for (const [key, value] of Object.entries(changes)) {
        if (value) next.set(key, value)
        else next.delete(key)
      }
      const queryString = next.toString()
      router.replace(`${pathname}${queryString ? `?${queryString}` : ''}#papers`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const clearFilters = useCallback(
    () => setFilters({ venue: '', field: '', from: '', to: '' }),
    [setFilters]
  )
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

  const { venue, field, from, to } = filters

  const groupedFiltered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    // Either end can be left open, and a reversed range still means the years
    // between the two.
    const [low, high] = [from, to].filter(Boolean).map(Number).sort((a, b) => a - b)
    const lowest = from && to ? low : from ? Number(from) : -Infinity
    const highest = from && to ? high : to ? Number(to) : Infinity

    const filtered = allPublications.filter(pub => {
      if (venue && venueOf.get(pub) !== venue) return false
      if (field && fieldOf.get(pub) !== field) return false
      const year = Number(pub.year)
      if (year < lowest || year > highest) return false
      return !normalizedQuery || searchIndex.get(pub).includes(normalizedQuery)
    })

    return groupPublicationsByYear(filtered)
  }, [query, venue, field, from, to])

  const filterSummary = [
    venue && (venueLabels[venue] || venue),
    field,
    from && to ? (from === to ? from : `${Math.min(from, to)}–${Math.max(from, to)}`) : from ? `${from} onward` : to ? `up to ${to}` : '',
  ].filter(Boolean).join(', ')

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
          : current CORE Lab member
        </span>
        <span>
          <span className='text-brand underline underline-offset-2'>Underlined name</span>
          : CORE Lab alumni or collaborator
        </span>
        <span>
          <sup className='font-semibold text-brand'>*</sup>
          : equal contribution
        </span>
      </aside>

      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder={publicationsPage.searchPlaceholder}
        resultCount={resultCount}
        filterSummary={filterSummary}
      >
        <PublicationFilters
          venues={venueOptions}
          fields={fieldOptions}
          years={yearOptions}
          venue={venue}
          field={field}
          from={from}
          to={to}
          onChange={setFilters}
          onClear={clearFilters}
        />
      </SearchBar>

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
