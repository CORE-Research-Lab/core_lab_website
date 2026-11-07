import selfExplanationPoster from './posters/iticse-2025-self-explanation-llms.png'
import timingPoster from './posters/iticse-2025-self-explanation-timing.png'
import discussionBoardsPoster from './posters/utm-ee-fair-2026-discussion-board-questions.png'
import medbotPoster from './posters/nygh-2024-medbot-geriatric-medicine.png'
import aiAssistedProgrammingPoster from './posters/koli-calling-2026-ai-assisted-programming.webp'
import requestPoster from './posters/koli-calling-2026-request-requirements-elicitation.webp'
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
  postersDescription:
    'Posters the lab has presented at conferences. Open one to read it up close, with its abstract and citation.',
  papersTitle: 'Papers',
  searchPlaceholder: 'Search by title, author, venue, or year',
  noPapersText: 'No matching papers yet - try a broader search.',
}

export { posterPublications }

const normalizeTitle = title => String(title || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/**
 * Finds the poster's citation in `Papers/Posters/poster_papers.json`. DOI is
 * the reliable key, but a poster can be shown before its paper has one (or
 * before Semantic Scholar has indexed it), so the exact title matches as a
 * fallback — the same rule the sync uses for its `title` selectors.
 */
const findPosterPublication = poster =>
  posterPublications.find(publication =>
    (poster.doi && publication.doi === poster.doi) ||
    normalizeTitle(publication.title) === normalizeTitle(poster.title)
  )

/**
 * One entry per poster. `slug` is the detail-page URL, `conference` is the
 * label shown beside it (free text — venues are not grouped, so any venue
 * works), and `doi` is optional; a poster without one can carry an `eventUrl`
 * for the venue's page instead. See "Adding a Poster" in the README.
 */
export const posterItems = [
  {
    slug: 'ai-assisted-programming-asking-reviewing-owning',
    conference: 'Koli Calling 2026 Doctoral Consortium',
    title: 'If an Agent Can Write Your Code, What Is Left for You to Learn? Asking, Reviewing, and Owning AI-Assisted Programming',
    image: aiAssistedProgrammingPoster,
  },
  {
    slug: 'request-requirements-elicitation-training',
    conference: 'Koli Calling 2026',
    title: 'ReQuest: Chatbot-Based Simulations for Requirements Elicitation Training',
    image: requestPoster,
  },
  {
    slug: 'what-do-students-still-ask',
    conference: 'UTM Experiential Education Fair 2026',
    title: 'What Do Students Still Ask? Discussion Board Questions in Computer Science Courses Before and After AI',
    image: discussionBoardsPoster,
    // No DOI yet: the citation is matched by title, and this stands in for
    // the DOI link on the poster's page.
    eventUrl: 'https://www.utm.utoronto.ca/experience/events/experiential-education-fair',
  },
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
  {
    slug: 'medbot-geriatric-medicine-chatbot',
    conference: 'NYGH Teaching and Learning Week 2024',
    title: 'Implementation of an Artificial Intelligence Chatbot for Training in Geriatric Medicine Core Competencies',
    image: medbotPoster,
  },
].map(poster => ({
  ...poster,
  publication: findPosterPublication(poster),
  link: `/publications/${poster.slug}`,
}))

export const postersBySlug = Object.fromEntries(
  posterItems.map(poster => [poster.slug, poster])
)
