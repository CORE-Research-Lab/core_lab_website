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
 * Every publication lands in exactly one bucket, so the counts always sum back
 * to the list they came from. `synthetic` marks the two buckets that stand in
 * for a missing venue rather than naming a real one.
 */
export const summarisePublicationVenues = (publications) => {
  const buckets = new Map()

  const add = (name, synthetic = false) => {
    const bucket = buckets.get(name) || { name, count: 0, synthetic }
    bucket.count += 1
    buckets.set(name, bucket)
  }

  for (const publication of publications) {
    const venue = getPublicationVenue(publication)

    if (!venue) add(UNLISTED_VENUE, true)
    else if (preprintServers.test(venue)) add(PREPRINT_VENUE, true)
    // Journals and one-off venues keep their own name as the key, so they
    // still count toward the total even when they never reach the shortlist.
    else add(venueAcronyms.find(([pattern]) => pattern.test(venue))?.[1] || venue)
  }

  return [...buckets.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  )
}
