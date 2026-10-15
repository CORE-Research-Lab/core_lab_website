import { heroContent } from '@/data/home'
import { publicationsByYear } from '@/data/publications'
import PublicationTreemap from '@/Components/Home/PublicationTreemap'
import TreemapViews from '@/Components/Home/TreemapViews'
import {
  flattenPublications,
  hasKnownPublicationYear,
  summarisePublicationFields,
  summarisePublicationVenues,
  OTHER_FIELD,
  PREPRINT_VENUE,
  UNLISTED_VENUE,
} from '@/lib/publications.mjs'

// One list behind both the headline number and the treemap, so the tiles always
// add back up to the number printed beside them.
const publications = flattenPublications(publicationsByYear).filter(hasKnownPublicationYear)

const publicationCount = publications.length

// `summarisePublicationVenues` names buckets after what the records say; this is
// where the lab's own wording for one wins.
const bucketLabels = { [PREPRINT_VENUE]: 'Pre-print' }

const buckets = summarisePublicationVenues(publications)
const venueTotal = buckets.reduce((total, bucket) => total + bucket.count, 0)
const venueCount = buckets.filter(bucket => !bucket.synthetic).length

const yearsOf = bucket => bucket.publications.map(publication => parseInt(publication.year, 10))

const venues = buckets.map(bucket => ({
  // `name` is the bucket the publications filter understands; `label` is
  // only what the tile shows.
  name: bucket.name,
  label: bucketLabels[bucket.name] || bucket.name,
  count: bucket.count,
  years: yearsOf(bucket),
  // "Unlisted" is the absence of a venue, so it never earns a named tile no
  // matter how many records land in it.
  tail: bucket.name === UNLISTED_VENUE,
}))

// The same papers grouped by the field each venue belongs to. "Other" always
// sits in the tail, along with any field too small for a tile of its own.
// Field names run long, so a narrow tile shows the short form instead.
const fieldShortLabels = {
  'Computing Education': 'Computing Ed.',
  'Human–Computer Interaction': 'HCI',
  'Computer Science & AI': 'CS & AI',
  'Learning Sciences': 'Learning Sci.',
}

const fields = summarisePublicationFields(publications).map(bucket => ({
  name: bucket.name,
  label: bucket.name,
  shortLabel: fieldShortLabels[bucket.name],
  count: bucket.count,
  years: yearsOf(bucket),
  tail: bucket.name === OTHER_FIELD,
}))

const treemapViews = [
  {
    key: 'venue',
    label: 'Venue',
    caption: `Tile area is each venue’s share of all ${venueTotal} publications, across ${venueCount} venues; bars show papers per year. Select a venue or a bar to see its papers.`,
    content: <PublicationTreemap items={venues} total={venueTotal} filterKey='venue' tailLabel='Other venues' />,
  },
  {
    key: 'field',
    label: 'Field',
    caption: `Tile area is each field’s share of all ${venueTotal} publications; bars show papers per year. Select a field or a bar to see its papers.`,
    // Under 3% a field is too small to label well, so it joins Other.
    content: <PublicationTreemap items={fields} total={venueTotal} filterKey='field' tailLabel='Other' minShare={0.03} />,
  },
]

const PublicationHighlight = () => (
  <section className='page-shell pb-14 sm:pb-16' aria-label='Publications overview'>
    <div className='rounded-2xl border border-brand/15 bg-brand-soft/45 p-5 shadow-sm sm:p-6'>
      <div className='grid gap-5 sm:grid-cols-[9rem_1fr] sm:items-center'>
        <div className='sm:border-r sm:border-brand-line sm:pr-6'>
          <p className='text-4xl font-bold tracking-tight text-brand-dark'>
            {publicationCount.toLocaleString('en-CA')}
          </p>
          <p className='mt-1 text-base font-medium text-slate-600'>
            Publications
          </p>
        </div>
        <p className='max-w-2xl text-base leading-7 text-slate-700'>
          {heroContent.publicationBlurb}
        </p>
      </div>

      <div className='mt-6 border-t border-brand-line pt-5'>
        <TreemapViews title='Where our research appears' views={treemapViews} />
      </div>
    </div>
  </section>
)

export default PublicationHighlight
