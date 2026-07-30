import Image from 'next/image';
import { notFound } from 'next/navigation';
import { HiExternalLink } from 'react-icons/hi';
import { projects, projectsBySlug } from '@/data/projects';
import ProjectPeople from '@/Components/Projects/ProjectPeople';
import PublicationList from '@/Components/Publications/PublicationList';
import PageHeader from '@/Components/UI/PageHeader';
import { SectionHeading } from '@/Components/UI/SectionHeading';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectsBySlug[slug];

  if (!project) {
    return { title: 'Project not found' };
  }

  return {
    title: project.name,
    description: project.summary || project.tagline,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectsBySlug[slug];

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageHeader
        eyebrow='CORE Lab / Project'
        title={project.name}
        description={project.tagline}
      />

      <div className='page-shell pb-24'>
        {/* The project image is the point of the page, so it gets the full
            column and as much height as the viewport can spare. */}
        <figure className='mx-auto flex max-w-4xl items-center justify-center'>
          <Image
            src={project.image}
            alt={project.imageAlt || ''}
            aria-hidden={project.imageAlt ? undefined : 'true'}
            priority
            className='h-auto w-full object-contain'
            sizes='(max-width: 896px) 100vw, 896px'
          />
        </figure>

        <div className='mt-16 grid gap-12 border-t border-black/20 pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start lg:gap-24'>
          <div className='min-w-0 max-w-5xl'>
            {project.description.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className='mt-7 font-editorial text-[clamp(1.5rem,1.2rem+0.9vw,2.25rem)] leading-[1.2] tracking-[-0.02em] text-[#303534] first:mt-0'>
                {paragraph}
              </p>
            ))}
          </div>

          {project.links?.length > 0 && (
            <aside>
              <h2 className='text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-muted'>
                Links
              </h2>
              <ul className='mt-4 border-t border-black/20'>
                {project.links.map((link) => (
                  <li key={link.href} className='border-b border-black/20'>
                    <a
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center justify-between gap-2 py-4 text-sm font-semibold text-brand transition-colors hover:text-brand-dark'
                    >
                      {link.label}
                      <HiExternalLink className='size-4 shrink-0' aria-hidden='true' />
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <section className='mt-28'>
          <SectionHeading id='people'>People</SectionHeading>
          <ProjectPeople people={project.people} />
        </section>

        <section className='mt-28'>
          <SectionHeading id='papers'>Papers</SectionHeading>
          <PublicationList
            groupedItems={project.publications || {}}
            emptyText='Papers will appear here as the project publishes.'
          />
        </section>
      </div>
    </>
  );
}
