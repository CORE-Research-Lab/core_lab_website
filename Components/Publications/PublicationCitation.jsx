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
}) => {
  const highlightedNames = highlightAuthors.map(normalizeMemberName)

  if (authors.length === 0) return 'Unknown author'

  return authors.map((author, index) => {
    const normalizedAuthor = normalizeMemberName(author)
    const member = memberAuthors.get(normalizedAuthor)
    const displayAuthor = member?.publicationName || author
    const isHighlighted = highlightedNames.includes(normalizedAuthor)
      || (highlightCoreMembers && member?.publicationSource)
    const authorContent = isHighlighted ? <strong>{displayAuthor}</strong> : displayAuthor

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
}) => {
  if (!publication) {
    return <span className="text-slate-600">Publication details unavailable.</span>
  }

  const authors = getPublicationAuthors(publication)
  const venue = getVenue(publication)
  const title = publication.title || 'Untitled publication'
  const doi = publication.doi ? String(publication.doi).trim() : ''
  const bibtex = publication.bibtex ? String(publication.bibtex).trim() : ''

  return (
    <div className={number ? 'grid grid-cols-[3.25rem_1fr] gap-3' : ''}>
      {number && (
        <span className="pt-0.5 text-right font-semibold tabular-nums text-brand">
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
              &quot;{title}&quot;
            </a>
          ) : (
            <span>&quot;{title}&quot;</span>
          )}
          {venue && <span className="italic"> {venue}.</span>}
          {publication.year && <span> ({publication.year}).</span>}
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
