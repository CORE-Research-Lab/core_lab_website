import Papers from '@/Components/Publications/Papers';
import Posters from '@/Components/Publications/Posters';
import ProjectShowcase from '@/Components/Projects/ProjectShowcase';
import PageHeader from '@/Components/UI/PageHeader';
import SectionNav from '@/Components/UI/SectionNav';
import { publicationsPage } from '@/data/publications';
import { projectsSection } from '@/data/projects';

export const metadata = {
  title: 'Research',
  description: 'Projects, papers, and posters from the CORE Lab and its collaborators.',
};

const navSections = [
  { id: 'projects', label: projectsSection.title },
  { id: 'posters', label: publicationsPage.postersTitle },
  { id: 'papers', label: publicationsPage.papersTitle },
];

export default function Research() {
  return (
    <>
      <PageHeader
        eyebrow='CORE Lab / Research'
        title='Research'
        description='Projects, papers, and poster presentations from the lab and its collaborators.'
      />
      <div className='page-shell grid items-start gap-x-12 pb-24 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-x-20'>
        <SectionNav sections={navSections} />
        <div className='min-w-0'>
          <ProjectShowcase />
          <Posters />
          <Papers />
        </div>
      </div>
    </>
  );
}
