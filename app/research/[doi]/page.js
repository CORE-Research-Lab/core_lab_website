import { posterItems, postersBySlug } from '@/data/publications';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLeft, HiExternalLink } from 'react-icons/hi';
import PublicationCitation, { AuthorList } from '@/Components/Publications/PublicationCitation';
import { getPublicationAuthors } from '@/lib/publications.mjs';
import PageHeader from '@/Components/UI/PageHeader';
import { SectionHeading } from '@/Components/UI/SectionHeading';

export function generateStaticParams() {
  return posterItems.map((poster) => ({ doi: poster.slug }));
}

// Search snippets cut off around this length, so the abstract is trimmed to a
// whole sentence that fits rather than mid-word.
const summarise = (text, limit = 155) => {
  if (!text) return '';
  if (text.length <= limit) return text;

  const cut = text.slice(0, limit);
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(' '));

  return `${cut.slice(0, end > 0 ? end : limit).trim()}…`;
};

export async function generateMetadata({ params }) {
  const { doi } = await params;
  const poster = postersBySlug[doi];

  if (!poster) {
    return { title: 'Poster not found' };
  }

  return {
    title: poster.title,
    description:
      summarise(poster.publication?.abstract) || `${poster.conference} poster: ${poster.title}`,
  };
}

const eyebrowClass = 'text-sm font-semibold uppercase tracking-[0.14em] text-brand-muted';

const linkClass =
  'flex items-center justify-between gap-2 py-3 text-sm font-semibold text-brand hover:underline';

export default async function PosterPage({ params }) {
  const { doi } = await params;
  const poster = postersBySlug[doi];

  if (!poster) {
    notFound();
  }

  const { publication } = poster;
  const venue = publication?.booktitle || publication?.journal || '';
  // A poster is only cited as a paper once it has one: a DOI or a venue. Until
  // then the page names its authors and nothing else.
  const isPublished = Boolean(poster.doi || venue);
  const links = [
    poster.doi && { label: 'DOI', href: `https://doi.org/${poster.doi}` },
    publication?.semanticScholarUrl && {
      label: 'Semantic Scholar',
      href: publication.semanticScholarUrl,
    },
    poster.eventUrl && { label: 'Event page', href: poster.eventUrl },
    { label: 'Full-size poster', href: poster.image.src },
  ].filter(Boolean);

  return (
    <>
      <PageHeader title={poster.title} description={`Poster presented at ${poster.conference}`} />

      <div className='page-shell pb-16'>
        {/* The poster is the point of the page: it hangs on the same wall as
            the showcase, at the full column width, capped so a portrait sheet
            still fits on one screen. */}
        <figure className='poster-wall flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 p-5 sm:p-8 lg:p-12'>
          <Image
            src={poster.image}
            alt={`${poster.conference} poster: ${poster.title}`}
            priority
            className='poster-paper h-auto max-h-[min(78vh,60rem)] w-auto max-w-full object-contain'
            sizes='(max-width: 1280px) 100vw, 1184px'
          />
        </figure>

        <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
          <Link
            href='/research#posters'
            className='inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline'
          >
            <HiArrowLeft className='size-4' aria-hidden='true' />
            All posters
          </Link>
          <a
            href={poster.image.src}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 rounded-lg border border-brand/25 bg-white px-4 py-2 text-sm font-semibold text-brand hover:border-brand hover:bg-brand-soft'
          >
            Open full-size poster
            <HiExternalLink className='size-4' aria-hidden='true' />
          </a>
        </div>

        <div className='mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start lg:gap-12'>
          <div className='min-w-0'>
            {publication?.abstract && (
              <section>
                <SectionHeading id='abstract'>Abstract</SectionHeading>
                <p className='mt-5 max-w-3xl text-lg leading-8 text-slate-700'>
                  {publication.abstract}
                </p>
              </section>
            )}

            <section className={publication?.abstract ? 'mt-12' : ''}>
              {isPublished ? (
                <>
                  <SectionHeading id='citation'>Citation</SectionHeading>
                  <div className='mt-5 max-w-3xl leading-7 text-slate-800'>
                    <PublicationCitation publication={publication} />
                  </div>
                </>
              ) : (
                <>
                  <SectionHeading id='authors'>Authors</SectionHeading>
                  <p className='mt-5 max-w-3xl leading-7 text-slate-800'>
                    <AuthorList
                      authors={getPublicationAuthors(publication)}
                      coFirstAuthors={publication?.coFirstAuthors}
                    />
                  </p>
                </>
              )}
            </section>
          </div>

          <aside className='rounded-xl border border-slate-200 bg-slate-50 p-5'>
            <h2 className={eyebrowClass}>Details</h2>
            <dl className='mt-3 divide-y divide-slate-200 border-y border-slate-200 text-sm'>
              <div className='py-3'>
                <dt className='font-semibold text-slate-800'>Presented at</dt>
                <dd className='mt-0.5 text-slate-600'>{poster.conference}</dd>
              </div>
              {venue && (
                <div className='py-3'>
                  <dt className='font-semibold text-slate-800'>Published in</dt>
                  <dd className='mt-0.5 leading-6 text-slate-600'>{venue}</dd>
                </div>
              )}
              {publication?.year && (
                <div className='py-3'>
                  <dt className='font-semibold text-slate-800'>Year</dt>
                  <dd className='mt-0.5 text-slate-600'>{publication.year}</dd>
                </div>
              )}
            </dl>

            <h2 className={`${eyebrowClass} mt-6`}>Links</h2>
            <ul className='mt-3 divide-y divide-slate-200 border-y border-slate-200'>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target='_blank' rel='noopener noreferrer' className={linkClass}>
                    {link.label}
                    <HiExternalLink className='size-4 shrink-0' aria-hidden='true' />
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
