import { HiOutlineX } from 'react-icons/hi'

const selectClasses =
  'w-full rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-8 text-sm text-slate-800 shadow-sm transition hover:border-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20'

const Field = ({ id, label, children, className = '' }) => (
  <div className={className}>
    <label htmlFor={id} className='block text-xs font-semibold uppercase tracking-wide text-slate-500'>
      {label}
    </label>
    <div className='mt-1'>{children}</div>
  </div>
)

/**
 * Venue and year-range filters for the papers list. The values live in the
 * URL (see Papers), so a filtered list can be linked to — the homepage venue
 * tiles do exactly that. Picking the same year for both ends filters to one
 * year.
 */
const PublicationFilters = ({ venues, years, venue, from, to, onChange, onClear }) => {
  const isFiltered = Boolean(venue || from || to)

  return (
    <div className='mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_8rem_8rem_auto] sm:items-end'>
      <Field id='publication-venue' label='Venue'>
        <select
          id='publication-venue'
          value={venue}
          onChange={event => onChange({ venue: event.target.value })}
          className={selectClasses}
        >
          <option value=''>All venues</option>
          {venues.map(option => (
            <option key={option.value} value={option.value}>
              {option.label} ({option.count})
            </option>
          ))}
        </select>
      </Field>

      <Field id='publication-from' label='From'>
        <select
          id='publication-from'
          value={from}
          onChange={event => onChange({ from: event.target.value })}
          className={selectClasses}
        >
          <option value=''>Earliest</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </Field>

      <Field id='publication-to' label='To'>
        <select
          id='publication-to'
          value={to}
          onChange={event => onChange({ to: event.target.value })}
          className={selectClasses}
        >
          <option value=''>Latest</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </Field>

      {isFiltered ? (
        <button
          type='button'
          onClick={onClear}
          className='inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-50'
        >
          <HiOutlineX className='size-4' aria-hidden='true' />
          Clear filters
        </button>
      ) : (
        // Holds the column so the selects do not jump when the button appears.
        <span className='hidden sm:block sm:w-[7.5rem]' aria-hidden='true' />
      )}
    </div>
  )
}

export default PublicationFilters
