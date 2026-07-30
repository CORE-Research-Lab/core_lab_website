import { posterItems, postersBySlug } from '@/data/publications';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import PublicationCitation from '@/Components/Publications/PublicationCitation';
import PageHeader from '@/Components/UI/PageHeader';
import { SectionHeading } from '@/Components/UI/SectionHeading';

export function generateStaticParams() {
  return posterItems.map((poster) => ({ doi: poster.slug }));
}

export async function generateMetadata({ params }) {
  const { doi } = await params;
  const poster = postersBySlug[doi];

  if (!poster) {
    return { title: 'Poster not found' };
  }

  return {
    title: poster.title,
    description: `${poster.conference} poster: ${poster.title}`,
  };
}

export default async function PosterPage({ params }) {
  const { doi } = await params;
  const poster = postersBySlug[doi];

  if (!poster) {
    notFound();
  }

  return (
    <>
      <PageHeader
        eyebrow='CORE Lab / Poster'
        title={poster.title}
        description={poster.conference}
      />

      <div className='page-shell pb-24'>
        <div className='mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-start lg:gap-20'>
          <Image
            src={poster.image}
            alt={`${poster.conference} poster: ${poster.title}`}
            className='w-full bg-white'
            sizes='(max-width: 1024px) 100vw, 680px'
          />
          <section className='min-w-0 lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]'>
            <SectionHeading id='research'>Research</SectionHeading>
            <div className='mt-8 text-lg leading-8 text-slate-800'>
              <PublicationCitation publication={poster.publication} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
