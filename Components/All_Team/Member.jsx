import {
  getMemberAuthorNames,
  members,
  membersBySlug,
  normalizeMemberName,
} from '@/data/members'
import { hasKnownPublicationYear, publicationsByYear, posterPublications } from '@/data/publications'
import {
  flattenPublications,
  getPublicationAuthors,
  groupPublicationsByYear,
  sortPublicationYearsDescending,
} from '@/lib/publications.mjs'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { FaEnvelope, FaGlobe, FaLinkedin } from 'react-icons/fa'
import { FaGoogleScholar } from 'react-icons/fa6'
import PublicationCitation from '@/Components/Publications/PublicationCitation'

const mainMemberAuthorNames = new Set(
  members
    .filter(person => person.publicationSource)
    .flatMap(getMemberAuthorNames)
    .map(normalizeMemberName)
)

const allPapers = flattenPublications(publicationsByYear).filter(hasKnownPublicationYear)

const ContactLink = ({ icon: Icon, label, href, children }) => {
  if (!href) return null

  return (
    <li className="flex items-center gap-2">
      <Icon className="h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="break-all text-blue-700 hover:underline"
      >
        {children || label}
      </a>
    </li>
  )
}

const PublicationSection = ({ title, groupedItems, emptyText, highlightAuthors }) => {
  const sortedYears = Object.keys(groupedItems).sort(sortPublicationYearsDescending)
  let publicationNumber = sortedYears.reduce((total, year) => total + groupedItems[year].length, 0)

  return (
    <>
      <h2 className="mt-10 border-b border-b-slate-200 pb-3 text-xl font-semibold text-brand">
        {title}
      </h2>

      {sortedYears.length === 0 && <p className="pt-5 text-slate-600">{emptyText}</p>}

      {sortedYears.map(year => (
        <div key={year} className="mt-6 scroll-mt-24">
          <div className="border-y border-y-brand py-2 text-[20px] font-semibold text-brand">
            {year}
          </div>
          <ul className="pt-5 text-slate-800">
            {groupedItems[year].map((item, index) => {
              const number = publicationNumber--

              return (
                <li key={item.doi || `${item.title}-${index}`} className="mb-2 py-3 leading-7">
                  <PublicationCitation
                    publication={item}
                    highlightAuthors={highlightAuthors}
                    highlightCoreMembers={false}
                    linkMemberAuthors={false}
                    number={number}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </>
  )
}

const Member = ({ member }) => {
  const person = membersBySlug[member]

  if (!person) {
    notFound()
  }

  const isMainMember = Boolean(person.publicationSource)
  const highlightAuthors = getMemberAuthorNames(person)
  const normalizedAuthorNames = new Set(highlightAuthors.map(normalizeMemberName))
  const matchesMember = (publication) =>
    getPublicationAuthors(publication)
      .some(author => normalizedAuthorNames.has(normalizeMemberName(author)))
  const hasMainMemberCoauthor = (publication) =>
    getPublicationAuthors(publication)
      .some(author => mainMemberAuthorNames.has(normalizeMemberName(author)))

  const filteredPapersByYear = groupPublicationsByYear(
    allPapers.filter(publication =>
      matchesMember(publication) && (isMainMember || hasMainMemberCoauthor(publication))
    )
  )
  const filteredPostersByYear = groupPublicationsByYear(
    posterPublications.filter(matchesMember)
  )

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-12">
      <h1 className="border-b border-b-slate-200 pb-3 text-2xl font-semibold text-brand">
        {person.name}
      </h1>
      <div className="pt-3 text-sm leading-6">
        <p className="font-medium text-slate-700">{person.position}</p>
        {person.currentPosition && (
          <p className="text-slate-600">{person.currentPosition}</p>
        )}
      </div>

      <div className="grid gap-6 pt-5 md:grid-cols-[220px_1fr] md:items-start">
        <div>
          <Image
            src={person.image}
            alt={person.name}
            className="aspect-square w-full rounded-lg border border-slate-200 object-cover object-center"
            sizes="(max-width: 768px) 100vw, 220px"
          />
          {person.imageSource && (
            <a
              href={person.imageSource}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-xs text-slate-500 hover:text-blue-700 hover:underline"
            >
              Photo source
            </a>
          )}
        </div>
        <div className="text-slate-700">
          {person.bio ? (
            <p className="leading-7">{person.bio}</p>
          ) : (
            <p className="leading-7 text-slate-600">Profile details will be added soon.</p>
          )}
          <ul className="mt-5 flex flex-col items-start gap-2 border-t border-t-slate-200 pt-4 text-sm">
            <ContactLink icon={FaGlobe} href={person.website} label="Website">
              {person.website}
            </ContactLink>
            <ContactLink icon={FaEnvelope} href={person.email ? `mailto:${person.email}` : ''} label="Email">
              {person.email}
            </ContactLink>
            <ContactLink icon={FaGoogleScholar} href={person.googlescholar} label="Google Scholar">
              Google Scholar
            </ContactLink>
            <ContactLink icon={FaLinkedin} href={person.linkedin} label="LinkedIn">
              LinkedIn
            </ContactLink>
          </ul>
        </div>
      </div>

      <PublicationSection
        title={isMainMember ? 'Papers' : 'Collaborated Papers'}
        groupedItems={filteredPapersByYear}
        emptyText={isMainMember
          ? 'Papers will appear here as the archive grows.'
          : 'Collaborated papers will appear here as the archive grows.'}
        highlightAuthors={highlightAuthors}
      />

      <PublicationSection
        title="Posters"
        groupedItems={filteredPostersByYear}
        emptyText="Posters will appear here as the archive grows."
        highlightAuthors={highlightAuthors}
      />
    </section>
  )
}

export default Member
