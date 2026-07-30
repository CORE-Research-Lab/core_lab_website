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
  <section className='bg-[#101413] text-white' aria-label='Research overview'>
    <div className='page-shell py-20 sm:py-28 lg:py-36'>
      <div className='grid gap-12 lg:grid-cols-[minmax(15rem,0.38fr)_minmax(0,1fr)] lg:items-end lg:gap-20'>
        <div>
          <p className='font-editorial text-[clamp(6rem,4rem+8vw,12rem)] leading-[0.75] tracking-[-0.06em]'>
            {publicationCount.toLocaleString('en-CA')}
          </p>
          <p className='mt-7 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/55'>
            Publications
          </p>
        </div>
        <p className='max-w-4xl font-editorial text-[clamp(1.75rem,1.2rem+1.8vw,3.25rem)] leading-[1.08] tracking-[-0.025em] text-white/90'>
          {heroContent.publicationBlurb}
        </p>
      </div>

      <div className='mt-20 border-t border-white/20 pt-6'>
        <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'>
          <h2 className='text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/65'>
            Where our research appears
          </h2>
          <p className='text-sm text-white/45'>
            Tile area is each venue&rsquo;s share of all {venueTotal} publications, across {venueCount} venues
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
