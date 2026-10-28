export const getPublicationAuthors = (publication) => {
  if (!publication?.author) return []
  return Array.isArray(publication.author) ? publication.author : [publication.author]
}

export const flattenPublications = (data) => {
  if (Array.isArray(data)) return data

  return Object.entries(data || {}).flatMap(([year, publications]) =>
    (publications || []).map(publication => ({
      ...publication,
      year: publication.year || year,
    }))
  )
}

export const groupPublicationsByYear = (publications) =>
  publications.reduce((grouped, publication) => {
    const year = publication.year || 'Unknown'
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(publication)
    return grouped
  }, {})

export const sortPublicationYearsDescending = (a, b) => {
  const aYear = parseInt(a, 10)
  const bYear = parseInt(b, 10)

  if (Number.isNaN(aYear)) return 1
  if (Number.isNaN(bYear)) return -1

  return bYear - aYear
}

export const hasKnownPublicationYear = (publication) =>
  /^\d{4}$/.test(String(publication?.year || '').trim())

// Semantic Scholar gives us the full proceedings title and nothing else — no
// acronym, no location. These patterns recover the acronym people actually
// recognise. Order matters: the first match wins, so keep the specific
// workshops above the conferences whose names they contain.
const venueAcronyms = [
  [/Technical Symposium on Computer Science Education/i, 'SIGCSE TS'],
  [/Innovation and Technology in Computer Science Education/i, 'ITiCSE'],
  [/International Computing Education Research/i, 'ICER'],
  [/Artificial Intelligence in Education/i, 'AIED'],
  [/Koli Calling/i, 'Koli Calling'],
  [/Data Systems Education/i, 'DataEd'],
  [/Human-Computer Interaction for Work/i, 'CHIWORK'],
  [/(CHI Conference|SIGCHI conference) on [Hh]uman [Ff]actors/i, 'CHI'],
  [/HCI Education/i, 'EduCHI'],
  [/Intelligent User Interfaces/i, 'IUI'],
  [/Learning Analytics and Knowledge/i, 'LAK'],
  [/Learning @ Scale/i, 'L@S'],
  [/Designing Interactive Systems/i, 'DIS'],
  [/Global (on )?Computing Education/i, 'CompEd'],
  [/Western Canadian Conference on Computing Education/i, 'WCCCE'],
  [/Australasian Computing Education/i, 'ACE'],
  [/Information Technology Education/i, 'SIGITE'],
  [/Visual Languages and Human-Centric Computing/i, 'VL/HCC'],
  [/Computers, Software, and Applications/i, 'COMPSAC'],
  [/Global Engineering Education Conference/i, 'EDUCON'],
  [/Management of Data/i, 'SIGMOD'],
  [/Human Computation and Crowdsourcing/i, 'HCOMP'],
  [/AAAI Conference on Artificial Intelligence/i, 'AAAI'],
  [/ACM on [Hh]uman-[Cc]omputer [Ii]nteraction/i, 'PACM HCI'],
  [/North York General Hospital Teaching and Learning Week/i, 'NYGH T&L Week'],
]

// Preprint servers are where work waits, not where it was published, so they
// are counted apart from the venues rather than dropped — dropping them made
// the venue total disagree with the publication total.
const preprintServers = /^(ArXiv|Research Square|bioRxiv|SSRN)$/i

const getPublicationVenue = (publication) =>
  (publication?.journal || publication?.booktitle || '').trim()

/** Records whose venue field is empty — the venue is unknown, not "other". */
export const UNLISTED_VENUE = 'Unlisted'
/** Records sitting on a preprint server, not yet at a venue. */
export const PREPRINT_VENUE = 'Preprints'

/**
 * The venue a publication is counted under: a recognised acronym, one of the
 * two synthetic buckets, or failing those the venue's own name. Journals and
 * one-off venues keep that name, so they still count toward the total even
 * when they never reach the homepage shortlist. The homepage treemap and the
 * publications filter both use this, so a tile and its filtered list agree.
 */
export const getPublicationVenueBucket = (publication) => {
  const venue = getPublicationVenue(publication)

  if (!venue) return UNLISTED_VENUE
  if (preprintServers.test(venue)) return PREPRINT_VENUE
  return venueAcronyms.find(([pattern]) => pattern.test(venue))?.[1] || venue
}

const syntheticVenues = new Set([UNLISTED_VENUE, PREPRINT_VENUE])

/** The field a venue belongs to, for the homepage's by-field view and the field filter. */
export const OTHER_FIELD = 'Other'
export const PREPRINT_FIELD = 'Pre-print'

// Keyed by the venue bucket `getPublicationVenueBucket` returns, so a venue's
// acronym and its field are decided in one place. A venue not listed here,
// such as a new one-off journal, counts as Other until it is added, and the
// publication sync warns about it. A venue that belongs in Other on purpose
// is listed there, which keeps the sync quiet about it.
const venueFields = {
  'Computing Education': [
    'ITiCSE', 'SIGCSE TS', 'Koli Calling', 'ICER', 'DataEd', 'WCCCE', 'SIGITE', 'ACE', 'CompEd',
    'ACM Inroads', 'ACM Transactions on Computing Education',
    'Annual Workshop of the Psychology of Programming Interest Group',
    'Proceedings of the 8th Educational Data Mining in Computer Science Education Workshop (CSEDM 2024)',
  ],
  'Human–Computer Interaction': [
    'CHI', 'PACM HCI', 'DIS', 'CHIWORK', 'IUI', 'VL/HCC', 'HCOMP', 'EduCHI',
    'EuroVis 2025 - Education Papers',
  ],
  'Learning Sciences': [
    'LAK', 'AIED', 'L@S', 'EDUCON', 'SFU Educational Review', 'TSpace, University of Toronto',
    'NYGH T&L Week',
  ],
  'Computer Science & AI': [
    'SIGMOD', 'ACM SIGMOD Record', 'COMPSAC', 'AAAI', 'Algorithms', 'Prague Stringology Conference',
    'Conference on Artificial Intelligence in Medicine in Europe', 'Complex & Intelligent Systems',
    'Discover Computing',
    '2021 International Conference on Indoor Positioning and Indoor Navigation (IPIN)',
  ],
  [OTHER_FIELD]: ['Nature Human Behaviour'],
}

const fieldByVenue = new Map(
  Object.entries(venueFields).flatMap(([field, venues]) => venues.map(venue => [venue, field]))
)

/** False for a venue nobody has placed in a field yet; the sync lists those. */
export const hasAssignedField = (publication) => {
  const venue = getPublicationVenueBucket(publication)
  return venue === PREPRINT_VENUE || venue === UNLISTED_VENUE || fieldByVenue.has(venue)
}

export const getPublicationField = (publication) => {
  const venue = getPublicationVenueBucket(publication)
  if (venue === PREPRINT_VENUE) return PREPRINT_FIELD
  return fieldByVenue.get(venue) || OTHER_FIELD
}

/** Like `summarisePublicationVenues`, one bucket per field, largest first. */
export const summarisePublicationFields = (publications) => {
  const buckets = new Map()

  for (const publication of publications) {
    const name = getPublicationField(publication)
    const bucket = buckets.get(name) || { name, count: 0, publications: [] }
    bucket.count += 1
    bucket.publications.push(publication)
    buckets.set(name, bucket)
  }

  return [...buckets.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  )
}

/**
 * Every publication lands in exactly one bucket, so the counts always sum back
 * to the list they came from. `synthetic` marks the two buckets that stand in
 * for a missing venue rather than naming a real one.
 */
export const summarisePublicationVenues = (publications) => {
  const buckets = new Map()

  for (const publication of publications) {
    const name = getPublicationVenueBucket(publication)
    const bucket = buckets.get(name) || {
      name,
      count: 0,
      synthetic: syntheticVenues.has(name),
      publications: [],
    }
    bucket.count += 1
    bucket.publications.push(publication)
    buckets.set(name, bucket)
  }

  return [...buckets.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  )
}
