import OtherTools from '@/Components/Projects/OtherTools';
import { HiArrowRight } from 'react-icons/hi';
import ProjectList from '@/Components/Projects/ProjectList';
import PageHeader from '@/Components/UI/PageHeader';
import { projectsSection } from '@/data/projects';

export const metadata = {
  title: projectsSection.title,
  description: projectsSection.description,
};

export default function ProjectsPage() {
  return (
    <>
      {/* The preamble sits in the header, so it is spaced from the title
          the way every other page's intro is. */}
      <PageHeader title={projectsSection.title}>
        {/* Two full paragraphs, so a reading line height rather than the
            looser one a one-line page description gets. Full width, so the
            text keeps the same right margin as the table below. */}
        <div className='mt-3 space-y-3 text-lg leading-7 text-slate-600'>
          {projectsSection.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <p>
            <a
              href={projectsSection.contact.href}
              className='inline-flex items-center gap-1.5 text-base font-semibold text-brand hover:underline'
            >
              {projectsSection.contact.label}
              <HiArrowRight className='size-4' aria-hidden='true' />
            </a>
          </p>
        </div>
      </PageHeader>
      <div className='page-shell pb-16'>
        <ProjectList />
        <OtherTools />
      </div>
    </>
  );
}
