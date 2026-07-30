import { squarifiedTreemap } from '@/lib/treemap.mjs'

/**
 * A squarified treemap is solved for one aspect ratio and one number of tiles,
 * so a single layout can't serve every width: at phone size a 2.5%-share tile
 * is about 44px across, too small to hold "ICER 3". Each breakpoint therefore
 * gets its own solve, and names as many venues as it has room to label. Areas
 * are exact in both, and a venue keeps its colour across them because the ramp
 * is indexed by rank.
 */
const layouts = [
  { key: 'narrow', aspect: 1.1, namedVenues: 6, className: 'max-h-80 sm:hidden' },
  { key: 'wide', aspect: 2.5, namedVenues: 8, className: 'hidden max-h-80 sm:block' },
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

// Under this share a tile is too short for a second line, so its name and count
// share one. Under `labelShare` it holds no text at all and the list below plus
// the tooltip carry it — a guard for future data, since every tile on the board
// today clears it.
const stackedLabelShare = 0.05
const labelShare = 0.02

const researchOutputsLabel = count => `${count} research output${count === 1 ? '' : 's'}`

/** Top `namedVenues` get their own tile; everything else pools into the tail. */
const buildSegments = (venues, total, namedVenues) => {
  const named = venues.filter(venue => !venue.tail).slice(0, namedVenues)
  const tailCount = total - named.reduce((sum, venue) => sum + venue.count, 0)

  return [
    ...named.map((venue, index) => ({ ...venue, ...venueRamp[index] })),
    ...(tailCount > 0 ? [{ label: 'Other venues', count: tailCount, ...tailStep }] : []),
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
            const share = segment.count / total

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
                title={`${segment.label}: ${researchOutputsLabel(segment.count)}`}
              >
                <div
                  // The one-line tiles are the tightest fit on the board, so
                  // they trade padding for the few pixels their label needs.
                  className={`flex size-full overflow-hidden rounded-sm text-[11px] leading-tight sm:text-xs ${
                    share >= stackedLabelShare
                      ? 'flex-col px-2 py-1.5'
                      : 'items-baseline gap-x-1 px-1.5 py-1'
                  }`}
                  style={{ backgroundColor: segment.fill, color: segment.ink }}
                >
                  {share >= labelShare && (
                    <>
                      <span className='font-semibold'>{segment.label}</span>
                      <span className='tabular-nums'>{segment.count}</span>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )
    })}
    <ul className='sr-only'>
      {venues.map(venue => (
        <li key={venue.label}>
          {venue.label}: {researchOutputsLabel(venue.count)}
        </li>
      ))}
    </ul>
  </div>
)

export default VenueTreemap
