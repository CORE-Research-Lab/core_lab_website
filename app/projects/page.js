import Image from 'next/image';
import Link from 'next/link';
import { activeProjects, projectsPage } from '@/data/projects';
import PageHeader from '@/Components/UI/PageHeader';

export const metadata = {
  title: 'Projects',
  description: 'Current research projects from the CORE Lab.',
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title={projectsPage.activeTitle}
        description={projectsPage.activeDescription}
      />
      <div className='page-shell space-y-6 pb-16'>
        {activeProjects.map((project) => (
          <article
            className='group relative grid gap-5 rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-muted sm:gap-6 sm:p-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:items-start'
            key={project.link}
          >
            <Image
              src={project.image}
              alt=''
              aria-hidden='true'
              className='aspect-16/10 w-full rounded-lg border border-slate-100 bg-slate-50 object-contain'
              sizes='(max-width: 768px) 100vw, 240px'
            />
            <div className='min-w-0'>
              <h2 className='text-subsection font-semibold text-brand-dark'>
                <Link href={project.link} className='hover:underline'>
                  {/* Stretch the link over the whole card so the image is clickable too. */}
                  <span className='absolute inset-0' aria-hidden='true' />
                  {project.name}
                </Link>
              </h2>
              <p className='mt-2 leading-7 text-slate-700'>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
