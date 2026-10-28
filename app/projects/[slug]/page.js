import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiArrowRight, HiExternalLink, HiOutlineMail } from 'react-icons/hi';
import { getPublicationAuthors } from '@/lib/publications.mjs';
import { projects, projectsBySlug, projectsSection } from '@/data/projects';
import ProjectPeople from '@/Components/Projects/ProjectPeople';
import { AuthorList } from '@/Components/Publications/PublicationCitation';
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

  const description = project.summary || project.tagline;

  return {
    title: project.name,
    description,
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
  const hasRelated = project.relatedProjects.length > 0;
  const hasSidebar = inDevelopment || hasLinks || hasRelated;
  const hasSideColumn = Boolean(project.image) || hasSidebar;

  // The image column is wider than the links column so an infographic stays
  // legible beside the text.
  const sideColumnWidth = project.image
    ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]'
    : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]';

  return (
    <>
      <PageHeader
        title={project.name}
        description={project.tagline}
      />

      <div className='page-shell pb-16'>
        {/* Two columns only when there is something for the side column, so a
            project without one does not leave an empty gutter beside its text.
            The image sits beside the description rather than above it, so the
            text starts right under the title; on small screens it follows the
            text. */}
        <div className={`mt-2 grid gap-8 lg:items-start lg:gap-12 ${hasSideColumn ? sideColumnWidth : ''}`}>
          <div className='min-w-0 max-w-5xl'>
            {project.description.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className='mt-4 text-lg leading-8 text-slate-700 first:mt-0'>
                {paragraph}
              </p>
            ))}
          </div>

          {hasSideColumn && (
            <div className='flex min-w-0 flex-col gap-6'>
              {project.image && (
                <figure>
                  <a
                    href={project.image.src}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-[border-color,box-shadow] hover:border-brand/40 hover:shadow-md'
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt || ''}
                      aria-hidden={project.imageAlt ? undefined : 'true'}
                      priority
                      className='h-auto w-full object-contain'
                      sizes='(max-width: 1024px) 100vw, 480px'
                    />
                  </a>
                  <figcaption className='mt-2 text-right'>
                    <a
                      href={project.image.src}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline'
                    >
                      Open full size
                      <HiExternalLink className='size-4' aria-hidden='true' />
                    </a>
                  </figcaption>
                </figure>
              )}

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

                  {hasRelated && (
                    <section className={inDevelopment || hasLinks ? 'mt-6' : undefined}>
                      <h2 className='text-base font-semibold text-brand-dark'>
                        Related projects
                      </h2>
                      <ul className='mt-3 divide-y divide-slate-200 border-y border-slate-200'>
                        {project.relatedProjects.map((related) => (
                          <li key={related.slug}>
                            <Link href={related.link} className='group block py-3'>
                              <span className='flex items-center justify-between gap-2 text-sm font-semibold text-brand group-hover:underline'>
                                {related.name}
                                <HiArrowRight className='size-4 shrink-0' aria-hidden='true' />
                              </span>
                              <span className='mt-1 block text-xs leading-5 text-slate-600'>
                                {related.tagline}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </aside>
              )}
            </div>
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

        {project.posters.length > 0 && (
          <section className='mt-14'>
            <SectionHeading id='posters'>Posters</SectionHeading>
            <ul className='mt-5 grid gap-5 md:grid-cols-2'>
              {project.posters.map((poster) => (
                <li key={poster.slug}>
                  <Link
                    href={poster.link}
                    className='group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-[border-color,box-shadow] hover:border-brand/40 hover:shadow-md'
                  >
                    <div className='border-b border-slate-200 bg-slate-50 p-4'>
                      <Image
                        src={poster.image}
                        alt=''
                        className='h-auto w-full object-contain'
                        sizes='(max-width: 768px) 100vw, 560px'
                      />
                    </div>
                    <div className='p-5'>
                      <p className='text-sm font-medium text-slate-600'>
                        {poster.conference} poster
                      </p>
                      <h3 className='mt-2 text-lg font-semibold leading-7 text-brand-dark group-hover:underline'>
                        {poster.title}
                      </h3>
                      {poster.publication && (
                        <p className='mt-2 text-sm leading-6 text-slate-600'>
                          <AuthorList
                            authors={getPublicationAuthors(poster.publication)}
                            coFirstAuthors={poster.publication.coFirstAuthors}
                            linkMemberAuthors={false}
                          />
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
