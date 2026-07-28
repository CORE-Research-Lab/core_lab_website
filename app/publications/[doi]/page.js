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
      <PageHeader title={poster.title} description={poster.conference} />

      <div className='page-shell grid gap-8 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-12'>
        <Image
          src={poster.image}
          alt={`${poster.conference} poster: ${poster.title}`}
          className='w-full rounded-xl border border-slate-200 bg-slate-50'
          sizes='(max-width: 1024px) 100vw, 560px'
        />
        <section className='min-w-0'>
          <SectionHeading id='publication'>Publication</SectionHeading>
          <div className='mt-5 leading-7 text-slate-800'>
            <PublicationCitation publication={poster.publication} />
          </div>
        </section>
      </div>
    </>
  );
}
