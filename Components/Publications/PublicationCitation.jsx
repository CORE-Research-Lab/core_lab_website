'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { getMemberAuthorNames, members, normalizeMemberName } from '@/data/members'
import { getPublicationAuthors } from '@/lib/publications.mjs'

const memberAuthors = new Map(
  members.flatMap(member =>
    getMemberAuthorNames(member)
      .map(name => [
        normalizeMemberName(name),
        {
          link: member.link,
          publicationName: member.publicationName || member.name,
          publicationSource: member.publicationSource,
        },
      ])
  )
)

const getVenue = (publication) =>
  publication?.booktitle || publication?.journal || publication?.series || ''

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Marks occurrences of the active search term. `text-inherit` matters here:
 * the browser's default <mark> styling forces black text, which would drop the
 * link colour on titles and the bold weight cues on author names.
 */
const Highlight = ({ text, query }) => {
  const value = String(text ?? '')

  if (!query) return value

  const parts = value.split(new RegExp(`(${escapeRegExp(query)})`, 'ig'))

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className='rounded-xs bg-amber-200/70 text-inherit'>
        {part}
      </mark>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    )
  )
}

const copyTextToClipboard = async (text) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // Fall back for browser contexts that expose Clipboard API but deny write permission.
    }
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

const BibCopyButton = ({ bibtex, title }) => {
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef(null)

  const handleCopy = async () => {
    try {
      await copyTextToClipboard(bibtex)
      setCopied(true)

      if (resetTimer.current) clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => setCopied(false), 1600)
    } catch (error) {
      console.error('Failed to copy BibTeX', error)
    }
  }

  return (
    <button
      type="button"
      className={`inline-block text-blue-700 transition duration-150 active:scale-95 ${
        copied ? 'text-emerald-700' : 'hover:underline'
      }`}
      aria-label={`Copy BibTeX for ${title}`}
      title={copied ? 'Copied BibTeX' : 'Copy BibTeX'}
      onClick={handleCopy}
    >
      {copied ? 'copied' : 'bib'}
    </button>
  )
}

const AuthorList = ({
  authors,
  highlightAuthors = [],
  highlightCoreMembers = true,
  linkMemberAuthors = true,
  highlightQuery = '',
}) => {
  const highlightedNames = highlightAuthors.map(normalizeMemberName)

  if (authors.length === 0) return 'Unknown author'

  return authors.map((author, index) => {
    const normalizedAuthor = normalizeMemberName(author)
    const member = memberAuthors.get(normalizedAuthor)
    const displayAuthor = member?.publicationName || author
    const isHighlighted = highlightedNames.includes(normalizedAuthor)
      || (highlightCoreMembers && member?.publicationSource)
    const authorText = <Highlight text={displayAuthor} query={highlightQuery} />
    const authorContent = isHighlighted ? <strong>{authorText}</strong> : authorText

    return (
      <React.Fragment key={`${author}-${index}`}>
        {member && linkMemberAuthors ? (
          <Link
            href={member.link}
            className={member.publicationSource
              ? 'font-semibold text-brand hover:underline'
              : 'text-brand underline underline-offset-2'}
          >
            {authorContent}
          </Link>
        ) : (
          authorContent
        )}
        {index < authors.length - 1 && ', '}
      </React.Fragment>
    )
  })
}

const PublicationCitation = ({
  publication,
  highlightAuthors = [],
  number,
  highlightCoreMembers = true,
  linkMemberAuthors = true,
  highlightQuery = '',
}) => {
  if (!publication) {
    return <span className="text-slate-600">Research details unavailable.</span>
  }

  const authors = getPublicationAuthors(publication)
  const venue = getVenue(publication)
  const title = publication.title || 'Untitled research item'
  const doi = publication.doi ? String(publication.doi).trim() : ''
  const bibtex = publication.bibtex ? String(publication.bibtex).trim() : ''

  return (
    <div className={number ? 'grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-3' : ''}>
      {number && (
        <span className="pt-0.5 text-right text-sm font-semibold tabular-nums text-brand-muted sm:text-base">
          {number}.
        </span>
      )}
      <span>
        <span>
          <AuthorList
            authors={authors}
            highlightAuthors={highlightAuthors}
            highlightCoreMembers={highlightCoreMembers}
            linkMemberAuthors={linkMemberAuthors}
            highlightQuery={highlightQuery}
          />.
        </span>
        <span className="ml-1">
          {publication.url ? (
            <a
              href={publication.url}
              className="text-blue-700 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              &quot;<Highlight text={title} query={highlightQuery} />&quot;
            </a>
          ) : (
            <span>&quot;<Highlight text={title} query={highlightQuery} />&quot;</span>
          )}
          {venue && (
            <span className="italic"> <Highlight text={venue} query={highlightQuery} />.</span>
          )}
          {publication.year && (
            <span> (<Highlight text={publication.year} query={highlightQuery} />).</span>
          )}
          {doi && (
            <span className="ml-1">
              [
              <a
                href={`https://doi.org/${doi}`}
                className="text-blue-700 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                doi
              </a>
              ]
            </span>
          )}
          {bibtex && (
            <span className="ml-1">
              [<BibCopyButton bibtex={bibtex} title={title} />]
            </span>
          )}
        </span>
      </span>
    </div>
  )
}

export default PublicationCitation
