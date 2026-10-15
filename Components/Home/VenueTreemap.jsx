import Link from 'next/link'
import { squarifiedTreemap } from '@/lib/treemap.mjs'

/**
 * A squarified treemap is solved for one aspect ratio and one number of tiles,
 * so a single layout can't serve every width: at phone size a 2.5%-share tile
 * is about 44px across, too small to hold "ICER 3". Each breakpoint therefore
 * gets its own solve, and names as many venues as it has room to label. Areas
 * are exact in both, and a venue keeps its colour across them because the ramp
 * is indexed by rank.
 */
//
// The size rules for a tile's contents are in percent of the board, so they
// differ per layout: the same percentage is far fewer pixels on a phone.
// `barsHeight` is the least tile height with room for the year bars,
// `compactWidth` the width under which the count drops a size, and
// `stackWidth` the width under which the count takes its own line because the
// name has no room beside it.
const layouts = [
  {
    key: 'narrow',
    aspect: 1.1,
    namedVenues: 6,
    className: 'max-h-80 sm:hidden',
    barsHeight: 32,
    compactWidth: 30,
    stackWidth: 25,
  },
  {
    key: 'wide',
    aspect: 2.5,
    namedVenues: 8,
    className: 'hidden max-h-80 sm:block',
    barsHeight: 32,
    compactWidth: 15,
    stackWidth: 8,
  },
]

/**
 * An ordinal ramp of the brand navy, darkest for the most-published venue. The
 * steps were checked for monotone lightness, a visible gap between neighbours,
 * and contrast against the card surface; each `ink` is the label colour that
 * clears 4.5:1 on its own fill. Re-run both checks before re-picking any by
 * eye — the light end is already at the edge of what the surface allows, so
 * adding a step means re-stepping the whole ramp rather than appending one.
 */
const venueRamp = [
  { fill: '#00172f', ink: '#ffffff' },
  { fill: '#002a5c', ink: '#ffffff' },
  { fill: '#0d3d77', ink: '#ffffff' },
  { fill: '#1a5292', ink: '#ffffff' },
  { fill: '#2d6aa9', ink: '#ffffff' },
  { fill: '#4a85bd', ink: '#0f172a' },
  { fill: '#6b9fcf', ink: '#0f172a' },
  { fill: '#96b3d6', ink: '#0f172a' },
]

// The tail is an aggregate rather than a venue, so it sits outside the ramp.
const tailStep = { fill: '#94a3b8', ink: '#0f172a' }

// Only venues with at least this share of the papers get year bars, and then
// only where the layout leaves their tile tall enough (`barsHeight`).
const barsShare = 0.08

// The bars cover the same run of years in every tile, so a bar means the same
// thing wherever it appears.
const barYearCount = 8
const lastBarYear = new Date().getFullYear()
const barYears = Array.from({ length: barYearCount }, (_, index) => lastBarYear - barYearCount + 1 + index)

const yearSpan = years => {
  const first = Math.min(...years)
  const last = Math.max(...years)
  return first === last ? `${first}` : `${first}–${String(last).slice(-2)}`
}

const YearBars = ({ years }) => {
  const counts = barYears.map(year => years.filter(paperYear => paperYear === year).length)
  const peak = Math.max(1, ...counts)

  return (
    // Hovering a bar swaps the year axis underneath for that bar's count. The
    // axis spans the whole tile, so the readout can never be clipped the way
    // a tooltip above a narrow tile's bar was. The swap is instant: a fade
    // left two years' readouts overlapping while moving along the bars.
    <div className='group/bars relative mt-auto pt-2'>
      {/* Shorter on small tablets, where the wide layout's tiles are at
          their smallest. */}
      <div className='flex h-5 items-end md:h-7'>
        {counts.map((count, index) => (
          // No gap between columns: each one is the hover target for its year,
          // padded so the bars still read as separate.
          <span key={barYears[index]} className='group/bar flex h-full flex-1 items-end px-[1.5px]'>
            <span
              className={`w-full rounded-[1px] bg-current transition-opacity ${
                count ? 'opacity-75 group-hover/bar:opacity-100' : 'opacity-25 group-hover/bar:opacity-60'
              }`}
              // An empty year keeps a hairline so the run of years stays legible.
              style={{ height: count ? `${Math.max(12, (count / peak) * 100)}%` : '2px' }}
            />
            <span className='pointer-events-none absolute inset-x-0 bottom-0 text-center text-[10px] font-semibold tabular-nums opacity-0 group-hover/bar:opacity-100'>
              {barYears[index]} · {count} {count === 1 ? 'paper' : 'papers'}
            </span>
          </span>
        ))}
      </div>
      <div className='mt-1 flex justify-between text-[10px] tabular-nums opacity-70 group-hover/bars:opacity-0'>
        <span>{barYears[0]}</span>
        <span>{lastBarYear}</span>
      </div>
    </div>
  )
}

/** The publications page, filtered to one venue; the tail has no single venue to filter by. */
const venueHref = segment =>
  segment.name ? `/publications?venue=${encodeURIComponent(segment.name)}#papers` : '/publications#papers'

const researchOutputsLabel = count => `${count} research output${count === 1 ? '' : 's'}`

/** Top `namedVenues` get their own tile; everything else pools into the tail. */
const buildSegments = (venues, total, namedVenues) => {
  const named = venues.filter(venue => !venue.tail).slice(0, namedVenues)
  const tailCount = total - named.reduce((sum, venue) => sum + venue.count, 0)
  const tailYears = venues.filter(venue => !named.includes(venue)).flatMap(venue => venue.years)

  return [
    ...named.map((venue, index) => ({ ...venue, ...venueRamp[index] })),
    ...(tailCount > 0
      ? [{ label: 'Other venues', name: null, count: tailCount, years: tailYears, ...tailStep }]
      : []),
  ]
}

const VenueTreemap = ({ venues, total }) => (
  <div>
    {layouts.map(layout => {
      const segments = buildSegments(venues, total, layout.namedVenues)
      const tiles = squarifiedTreemap(
        segments.map(segment => segment.count),
        { aspect: layout.aspect }
      )

      return (
        // The list below repeats every venue and count as text, so the tiles
        // are decoration to a screen reader.
        <div
          key={layout.key}
          aria-hidden='true'
          className={`relative w-full ${layout.className}`}
          style={{ aspectRatio: layout.aspect }}
        >
          {tiles.map(tile => {
            const segment = segments[tile.index]
            // A short tile still fits its two lines once the padding and
            // line height are trimmed.
            const isShort = tile.height < 18
            // A narrow tile has no room beside its years for the full-size
            // count, and one tall enough drops its years a little lower to
            // clear even the smaller one.
            const isCompact = isShort || tile.width < layout.compactWidth
            const isStacked = !isShort && tile.width < layout.stackWidth
            const hasBars = segment.count / total >= barsShare && tile.height >= layout.barsHeight

            return (
              <div
                key={segment.label}
                // Padding rather than a margin, so neighbours meet in a 2px gap
                // of the card surface instead of a drawn border.
                className='absolute p-px'
                style={{
                  left: `${tile.x}%`,
                  top: `${tile.y}%`,
                  width: `${tile.width}%`,
                  height: `${tile.height}%`,
                }}
              >
                {/* Out of the tab order like the tiles themselves: the list
                    below carries the same links for keyboards and screen
                    readers. */}
                <Link
                  href={venueHref(segment)}
                  tabIndex={-1}
                  className={`relative flex size-full flex-col overflow-hidden rounded-sm px-2 text-[11px] transition-[filter] hover:brightness-125 ${
                    isShort ? 'py-0.5 leading-[1.15] md:text-xs' : 'py-1 leading-tight sm:py-1.5 sm:text-xs'
                  }`}
                  style={{ backgroundColor: segment.fill, color: segment.ink }}
                >
                  {/* The count, the figure the tile's size stands for, is
                      pinned large in the top-right corner. Taking it out of
                      the flow keeps the rows below where they were, so a
                      short tile still fits its name and years. The name is
                      padded clear of it; the years sit below it. A tile too
                      narrow for the name beside it gives the count its own
                      line instead, still at the right. */}
                  <span
                    className={`font-bold leading-none tabular-nums ${
                      isStacked
                        ? 'mb-0.5 self-end'
                        : `absolute right-2 ${isShort ? 'top-0.5' : 'top-1 sm:top-1.5'}`
                    } ${isCompact ? 'text-sm sm:text-base' : 'text-base sm:text-xl'}`}
                  >
                    {segment.count}
                  </span>
                  <span
                    className={`font-semibold ${isStacked ? '' : isCompact ? 'pr-6' : 'pr-8'} ${
                      isCompact && !isShort && !isStacked ? 'mb-1' : ''
                    }`}
                  >
                    {segment.label}
                  </span>
                  <span className='whitespace-nowrap tabular-nums opacity-75'>{yearSpan(segment.years)}</span>
                  {hasBars && <YearBars years={segment.years} />}
                </Link>
              </div>
            )
          })}
        </div>
      )
    })}
    <ul className='sr-only'>
      {venues.map(venue => (
        <li key={venue.label}>
          <Link href={venueHref(venue)}>
            {venue.label}: {researchOutputsLabel(venue.count)}, {yearSpan(venue.years)}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default VenueTreemap
