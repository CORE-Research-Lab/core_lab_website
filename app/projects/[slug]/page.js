import Image from 'next/image';
import { notFound } from 'next/navigation';
import { HiExternalLink, HiOutlineMail } from 'react-icons/hi';
import { projects, projectsBySlug, projectsSection } from '@/data/projects';
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

  const inDevelopment = project.status === 'in-development';
  const hasLinks = project.links?.length > 0;
  const hasSidebar = inDevelopment || hasLinks;

  return (
    <>
      <PageHeader
        title={project.name}
        description={project.tagline}
      />

      <div className='page-shell pb-16'>
        {/* The project image is the point of the page, so it gets the full
            column and as much height as the viewport can spare. */}
        {project.image && (
          <figure className='mx-auto flex max-w-4xl items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6'>
            <Image
              src={project.image}
              alt={project.imageAlt || ''}
              aria-hidden={project.imageAlt ? undefined : 'true'}
              priority
              className='h-auto w-full object-contain'
              sizes='(max-width: 896px) 100vw, 896px'
            />
          </figure>
        )}

        {/* Two columns only when there is something for the side column, so a
            project without one does not leave an empty gutter beside its text. */}
        <div className={`${project.image ? 'mt-10' : 'mt-2'} grid gap-8 lg:items-start lg:gap-12 ${hasSidebar ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]' : ''}`}>
          <div className='min-w-0 max-w-5xl'>
            {project.description.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className='mt-4 text-lg leading-8 text-slate-700 first:mt-0'>
                {paragraph}
              </p>
            ))}
          </div>

          {hasSidebar && (
            <aside className='rounded-xl border border-slate-200 bg-slate-50 p-5'>
              {inDevelopment && (
                <section>
                  <h2 className='text-base font-semibold text-brand-dark'>
                    In development
                  </h2>
                  <p className='mt-2 text-sm leading-6 text-slate-600'>
                    We are still building this project, so it has no papers yet.
                    Results will appear here as it is studied and published. If
                    it could help in a course you teach, we would love to hear
                    from you.
                  </p>
                  <ul className='mt-3 border-y border-slate-200'>
                    <li>
                      <a
                        href={projectsSection.contact.href}
                        className='flex items-center justify-between gap-2 py-3 text-sm font-semibold text-brand hover:underline'
                      >
                        {projectsSection.contact.label}
                        <HiOutlineMail className='size-4 shrink-0' aria-hidden='true' />
                      </a>
                    </li>
                  </ul>
                </section>
              )}

              {hasLinks && (
                <section className={inDevelopment ? 'mt-6' : undefined}>
                  <h2 className='text-base font-semibold text-brand-dark'>
                    Links
                  </h2>
                  <ul className='mt-3 divide-y divide-slate-200 border-y border-slate-200'>
                    {project.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center justify-between gap-2 py-3 text-sm font-semibold text-brand hover:underline'
                        >
                          {link.label}
                          <HiExternalLink className='size-4 shrink-0' aria-hidden='true' />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </aside>
          )}
        </div>

        <section className='mt-14'>
          <SectionHeading id='people'>People</SectionHeading>
          <ProjectPeople people={project.people} />
        </section>

        <section className='mt-14'>
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
