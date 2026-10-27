import {
  getMemberAuthorNames,
  members,
  membersBySlug,
  normalizeMemberName,
} from '@/data/members'
import { publicationsByYear, posterPublications } from '@/data/publications'
import {
  flattenPublications,
  getPublicationAuthors,
  groupPublicationsByYear,
  hasKnownPublicationYear,
} from '@/lib/publications.mjs'
import { Fragment } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { FaEnvelope, FaGlobe, FaLinkedin } from 'react-icons/fa'
import { FaGoogleScholar } from 'react-icons/fa6'
import PublicationList from '@/Components/Publications/PublicationList'
import PageHeader from '@/Components/UI/PageHeader'

// Bios are plain text, except that `[label](https://…)` becomes a link.
const bioLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g

const stripBioLinks = (text) => text?.replace(bioLinkPattern, '$1')

const renderBioLine = (line) => {
  // split() with two capture groups yields text, label, href, text, …
  const parts = line.split(bioLinkPattern)

  return parts.map((part, index) => {
    if (index % 3 === 2) return null
    if (index % 3 === 0) return part

    return (
      <a
        key={index}
        href={parts[index + 1]}
        target='_blank'
        rel='noopener noreferrer'
        className='font-medium text-brand hover:underline'
      >
        {part}
      </a>
    )
  })
}
import { SectionHeading } from '@/Components/UI/SectionHeading'

export function generateStaticParams() {
  return members.map((person) => ({ member: person.slug }))
}

export async function generateMetadata({ params }) {
  const { member } = await params
  const person = membersBySlug[member]

  if (!person) {
    return { title: 'Member not found' }
  }

  // First paragraph only, so a long bio still makes a short link preview.
  const description = stripBioLinks(person.bio?.split(/\n{2,}/)[0]) || `${person.name}, ${person.position}`

  return {
    title: person.name,
    description,
  }
}

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
    <li className='flex items-center gap-2'>
      <Icon className='size-5 shrink-0 text-slate-500' aria-hidden='true' />
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className='break-all text-blue-700 hover:underline'
      >
        {children || label}
      </a>
    </li>
  )
}

export default async function MemberPage({ params }) {
  const { member } = await params
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

  const bioParagraphs = person.bio ? person.bio.split(/\n{2,}/) : []
  // A bio of several paragraphs pushes the links below the fold, so they move
  // under the photo instead. One-paragraph bios keep them under the text.
  const linksBesidePhoto = bioParagraphs.length > 1

  const contactLinks = (
    <ul className={`flex flex-col items-start gap-2 border-t border-slate-200 pt-5 text-sm ${linksBesidePhoto ? 'mt-5' : 'mt-6'}`}>
      {(person.websites || (person.website ? [person.website] : [])).map((site) => (
        <ContactLink key={site} icon={FaGlobe} href={site} label='Website'>
          {site}
        </ContactLink>
      ))}
      <ContactLink icon={FaEnvelope} href={person.email ? `mailto:${person.email}` : ''} label='Email'>
        {person.email}
      </ContactLink>
      <ContactLink icon={FaGoogleScholar} href={person.googlescholar} label='Google Scholar'>
        Google Scholar
      </ContactLink>
      <ContactLink icon={FaLinkedin} href={person.linkedin} label='LinkedIn'>
        LinkedIn
      </ContactLink>
    </ul>
  )

  return (
    <>
      <PageHeader title={person.name}>
        <div className='mt-3 text-base leading-7'>
          <p className='font-medium text-slate-700'>{person.position}</p>
          {person.currentPosition && (
            <p className='text-slate-600'>{person.currentPosition}</p>
          )}
        </div>
      </PageHeader>

      <div className='page-shell pb-16'>
        <div className='grid gap-8 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:items-start'>
          <div>
            <Image
              src={person.image}
              alt={person.name}
              className='aspect-square w-full max-w-xs rounded-xl border border-slate-200 bg-slate-50 object-cover object-center md:max-w-none'
              sizes='(max-width: 768px) 20rem, 224px'
            />
            {linksBesidePhoto && contactLinks}
          </div>
          <div className='min-w-0 text-slate-700'>
            {bioParagraphs.length > 0 ? (
              bioParagraphs.map((paragraph, index) => (
                <p key={index} className='text-lg leading-8 [&:not(:first-child)]:mt-4'>
                  {paragraph.split('\n').map((line, lineIndex, lines) => (
                    <Fragment key={lineIndex}>
                      {renderBioLine(line)}
                      {lineIndex < lines.length - 1 && <br />}
                    </Fragment>
                  ))}
                </p>
              ))
            ) : (
              <p className='text-lg leading-8'>Profile details will be added soon.</p>
            )}
            {!linksBesidePhoto && contactLinks}
          </div>
        </div>

        <section className='mt-14'>
          <SectionHeading id='papers'>
            {isMainMember ? 'Papers' : 'Collaborated Papers'}
          </SectionHeading>
          <PublicationList
            groupedItems={filteredPapersByYear}
            numbered
            highlightAuthors={highlightAuthors}
            highlightCoreMembers={false}
            linkMemberAuthors={false}
            emptyText={isMainMember
              ? 'Papers will appear here as the archive grows.'
              : 'Collaborated papers will appear here as the archive grows.'}
          />
        </section>

        <section className='mt-14'>
          <SectionHeading id='posters'>Posters</SectionHeading>
          <PublicationList
            groupedItems={filteredPostersByYear}
            numbered
            highlightAuthors={highlightAuthors}
            highlightCoreMembers={false}
            linkMemberAuthors={false}
            emptyText='Posters will appear here as the archive grows.'
          />
        </section>
      </div>
    </>
  )
}
