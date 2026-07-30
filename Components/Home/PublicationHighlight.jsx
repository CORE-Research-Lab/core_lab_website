import { heroContent } from '@/data/home'
import { publicationsByYear } from '@/data/publications'
import VenueTreemap from '@/Components/Home/VenueTreemap'
import {
  flattenPublications,
  hasKnownPublicationYear,
  summarisePublicationVenues,
  PREPRINT_VENUE,
  UNLISTED_VENUE,
} from '@/lib/publications.mjs'

// One list behind both the headline number and the treemap, so the tiles always
// add back up to the number printed beside them.
const publications = flattenPublications(publicationsByYear).filter(hasKnownPublicationYear)

const publicationCount = publications.length

// `summarisePublicationVenues` names buckets after what the records say; this is
// where the lab's own wording for one wins.
const bucketLabels = { [PREPRINT_VENUE]: 'To submit' }

const buckets = summarisePublicationVenues(publications)
const venueTotal = buckets.reduce((total, bucket) => total + bucket.count, 0)
const venueCount = buckets.filter(bucket => !bucket.synthetic).length

const venues = buckets.map(bucket => ({
  label: bucketLabels[bucket.name] || bucket.name,
  count: bucket.count,
  // "Unlisted" is the absence of a venue, so it never earns a named tile no
  // matter how many records land in it.
  tail: bucket.name === UNLISTED_VENUE,
}))

const PublicationHighlight = () => (
  <section className='page-shell pb-14 sm:pb-16' aria-label='Research overview'>
    <div className='rounded-2xl border border-brand/15 bg-brand-soft/45 p-5 shadow-sm sm:p-6'>
      <div className='grid gap-5 sm:grid-cols-[9rem_1fr] sm:items-center'>
        <div className='sm:border-r sm:border-brand-line sm:pr-6'>
          <p className='text-4xl font-bold tracking-tight text-brand-dark'>
            {publicationCount.toLocaleString('en-CA')}
          </p>
          <p className='mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-brand-muted'>
            Research outputs
          </p>
        </div>
        <p className='max-w-2xl text-base leading-7 text-slate-700'>
          {heroContent.publicationBlurb}
        </p>
      </div>

      <div className='mt-6 border-t border-brand-line pt-5'>
        <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'>
          <h2 className='text-sm font-semibold uppercase tracking-[0.12em] text-brand-muted'>
            Where our research appears
          </h2>
          <p className='text-sm text-slate-500'>
            Tile area is each venue&rsquo;s share of all {venueTotal} research outputs, across{' '}
            {venueCount} venues
          </p>
        </div>
        <div className='mt-3'>
          <VenueTreemap venues={venues} total={venueTotal} />
        </div>
      </div>
    </div>
  </section>
)

export default PublicationHighlight
