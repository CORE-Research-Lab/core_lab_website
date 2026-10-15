import OtherTools from '@/Components/Projects/OtherTools';
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
      <PageHeader title={projectsSection.title} description={projectsSection.description} />
      <div className='page-shell pb-16'>
        <ProjectList />
        <OtherTools />
      </div>
    </>
  );
}
