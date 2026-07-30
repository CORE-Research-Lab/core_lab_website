import { heroContent } from '@/data/home'
import { publicationsByYear } from '@/data/publications'
import { flattenPublications, hasKnownPublicationYear } from '@/lib/publications.mjs'

const publicationCount = flattenPublications(publicationsByYear)
  .filter(hasKnownPublicationYear)
  .length

const PublicationHighlight = () => (
  <section className='page-shell pb-14 sm:pb-16' aria-label='Research publications'>
    <div className='grid max-w-4xl gap-5 rounded-2xl border border-brand/15 bg-brand-soft/45 p-5 shadow-sm sm:grid-cols-[9rem_1fr] sm:items-center sm:p-6'>
      <div className='sm:border-r sm:border-brand-line sm:pr-6'>
        <p className='text-4xl font-bold tracking-tight text-brand-dark'>
          {publicationCount.toLocaleString('en-CA')}
        </p>
        <p className='mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-brand-muted'>
          Publications
        </p>
      </div>
      <p className='max-w-2xl text-base leading-7 text-slate-700'>
        {heroContent.publicationBlurb}
      </p>
    </div>
  </section>
)

export default PublicationHighlight
