import Project from '@/Components/All_Projects/Project';
import { projects, projectsBySlug } from '@/data/projects';

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
  return <Project name={name} />;
}
