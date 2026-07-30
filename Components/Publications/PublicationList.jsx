import { sortPublicationYearsDescending } from '@/lib/publications.mjs'
import PublicationCitation from './PublicationCitation'

const YearDivider = ({ children }) => (
  <div className='border-y border-y-brand-line bg-brand-soft/60 px-3 py-2 text-base font-semibold tracking-wide text-brand'>
    {children}
  </div>
)

/**
 * The year-grouped citation list shared by the publications page, project
 * pages, and member pages. All three previously kept their own copy of this
 * markup, which is why year dividers and row spacing had drifted apart.
 *
 * When `numbered` is set, entries count down from the total so the newest
 * publication carries the highest number.
 */
const PublicationList = ({
  groupedItems,
  emptyText = 'Nothing to show yet.',
  numbered = false,
  ...citationProps
}) => {
  const years = Object.keys(groupedItems).sort(sortPublicationYearsDescending)

  if (years.length === 0) {
    return <p className='mt-5 text-slate-600'>{emptyText}</p>
  }

  let remaining = numbered
    ? years.reduce((total, year) => total + groupedItems[year].length, 0)
    : 0

  return (
    <div className='mt-6 space-y-8'>
      {years.map(year => (
        <section key={year} className='scroll-anchor'>
          <YearDivider>{year}</YearDivider>
          <ul className='mt-2 divide-y divide-slate-100 text-slate-800'>
            {groupedItems[year].map((publication, index) => (
              <li
                key={publication.doi || `${publication.title}-${index}`}
                className='py-4 leading-7'
              >
                <PublicationCitation
                  publication={publication}
                  number={numbered ? remaining-- : undefined}
                  {...citationProps}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default PublicationList
