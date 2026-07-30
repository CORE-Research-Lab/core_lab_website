import selfExplanationPoster from './assets/ITiCSE_p1.png'
import timingPoster from './assets/ITiCSE_p2.png'
import rawPublicationsByYear from '@/Papers/papers.json'
import posterPublications from '@/Papers/Posters/poster_papers.json'

const coFirstAuthorsByDoi = {
  '10.1007/978-3-032-29760-0_57': ['Suqing Liu', 'Runlong Ye'],
  '10.1145/3803400.3809330': ['Franco Ortiz', 'Runlong Ye'],
}

// Authorship notes live outside the synced paper archive so a publication
// refresh cannot erase manually verified contribution information.
export const publicationsByYear = Object.fromEntries(
  Object.entries(rawPublicationsByYear).map(([year, publications]) => [
    year,
    publications.map(publication => ({
      ...publication,
      coFirstAuthors: coFirstAuthorsByDoi[publication.doi] || [],
    })),
  ])
)

export const publicationsPage = {
  postersTitle: 'Poster Showcase',
  papersTitle: 'Papers',
  searchPlaceholder: 'Search by title, author, venue, or year',
  noPapersText: 'No matching papers yet - try a broader search.',
}

export { posterPublications }

export const posterItems = [
  {
    slug: '10.1145_3724389.3730790',
    doi: '10.1145/3724389.3730790',
    conference: 'ITiCSE 2025',
    title: 'Enhancing Self-Explanation in Student Learning through Large Language Models',
    image: selfExplanationPoster,
  },
  {
    slug: '10.1145_3724389.3730767',
    doi: '10.1145/3724389.3730767',
    conference: 'ITiCSE 2025',
    title: 'Self-Explanations: Does Timing Matter?',
    image: timingPoster,
  },
].map(poster => ({
  ...poster,
  publication: posterPublications.find(publication => publication.doi === poster.doi),
  link: `/research/${poster.slug}`,
}))

export const postersBySlug = Object.fromEntries(
  posterItems.map(poster => [poster.slug, poster])
)
