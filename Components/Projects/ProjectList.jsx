import { projects, projectStatusLabels as statusLabels } from '@/data/projects'
import { flattenPublications } from '@/lib/publications.mjs'
import ProjectTable from './ProjectTable'

const countPapers = (project) => flattenPublications(project.publications || {}).length
const countPeople = (project) => project.people.core.length + project.people.collaborators.length

/**
 * Every project as one row of a table, most papers first (then most people):
 * its name, a one-sentence summary, and how many people and papers it has.
 * The tagline, description, people, and papers all live on the project's own
 * page, so the list stays short enough to scan.
 *
 * The counting happens here on the server; `ProjectTable` gets only what a
 * row shows, and handles re-ordering it in the browser.
 */
const ProjectList = () => (
  <ProjectTable
    rows={projects.map(project => ({
      slug: project.slug,
      name: project.name,
      link: project.link,
      summary: project.summary,
      statusLabel: statusLabels[project.status] || null,
      people: countPeople(project),
      papers: countPapers(project),
    }))}
  />
)

export default ProjectList
