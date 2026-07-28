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
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { FaEnvelope, FaGlobe, FaLinkedin } from 'react-icons/fa'
import { FaGoogleScholar } from 'react-icons/fa6'
import PublicationList from '@/Components/Publications/PublicationList'
import PageHeader from '@/Components/UI/PageHeader'
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

  return {
    title: person.name,
    description: person.bio || `${person.name} — ${person.position}`,
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
            {person.imageSource && (
              <a
                href={person.imageSource}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-2 block text-xs text-slate-500 hover:text-brand hover:underline'
              >
                Photo source
              </a>
            )}
          </div>
          <div className='min-w-0 text-slate-700'>
            <p className='text-lg leading-8'>
              {person.bio || 'Profile details will be added soon.'}
            </p>
            <ul className='mt-6 flex flex-col items-start gap-2 border-t border-slate-200 pt-5 text-sm'>
              <ContactLink icon={FaGlobe} href={person.website} label='Website'>
                {person.website}
              </ContactLink>
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
