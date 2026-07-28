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
