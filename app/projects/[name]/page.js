import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects, projectsBySlug } from '@/data/projects';
import PublicationList from '@/Components/Publications/PublicationList';
import PageHeader from '@/Components/UI/PageHeader';
import { SectionHeading } from '@/Components/UI/SectionHeading';

export function generateStaticParams() {
  return projects.map((project) => ({ name: project.slug }));
}

export async function generateMetadata({ params }) {
  const { name } = await params;
  const project = projectsBySlug[name];

  if (!project) {
    return { title: 'Project not found' };
  }

  return {
    title: project.name,
    description: project.description || `${project.name} — a CORE Lab research project.`,
  };
}

export default async function ProjectPage({ params }) {
  const { name } = await params;
  const project = projectsBySlug[name];

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageHeader title={project.name} />

      <div className='page-shell pb-16'>
        <div className='grid gap-8 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:items-start'>
          <Image
            src={project.image}
            alt=''
            aria-hidden='true'
            className='aspect-16/10 w-full rounded-xl border border-slate-200 bg-slate-50 object-contain'
            sizes='(max-width: 768px) 100vw, 288px'
          />
          <p className='min-w-0 text-lg leading-8 text-slate-700'>
            {project.description || 'Project details are being prepared.'}
          </p>
        </div>

        <section className='mt-14'>
          <SectionHeading id='research'>Research</SectionHeading>
          <PublicationList
            groupedItems={project.publications || {}}
            emptyText='No research listed yet.'
          />
        </section>
      </div>
    </>
  );
}
