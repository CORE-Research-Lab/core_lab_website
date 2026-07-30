import arcImage from './assets/arc.png'
import voiceexImage from './assets/voiceex.png'
import arcPublications from '@/Papers/Projects/arc_papers.json'
import voiceexPublications from '@/Papers/Projects/voiceex_papers.json'
import {
  getMemberInstitution,
  isCollaborator,
  membersBySlug,
} from '@/data/members'

export const projectsSection = {
  title: 'Projects',
  description:
    'Systems and studies the lab is building. Open one to see who works on it and what it has published.',
}

/**
 * A project names its people by team slug rather than by name, so a project
 * card links straight to the member page and can never drift from it. Papers
 * come from `Papers/Projects/<slug>_papers.json`, which the publication sync
 * fills from the selectors in `Papers/semantic-scholar.config.json`.
 */
const projectEntries = [
  {
    slug: 'arc',
    name: 'ARC',
    status: 'active',
    tagline: 'Designing for strategic exploration and responsible AI in systematic literature reviews.',
    summary:
      'An integrated environment for systematic literature reviews, built around transparent iterative search and verifiable AI-assisted screening.',
    description: [
      'Systematic literature reviews are fundamental to scientific progress, but the work is spread across a fragmented tool ecosystem that imposes a high cognitive load and suppresses the iterative, exploratory side of scholarship. An exploratory design study with 20 experienced researchers surfaced three friction points: refining queries across multiple databases, the scale and pace of modern publishing, and the tension between automation and scholarly agency.',
      'ARC is a design probe built from those findings. It brings multi-database search, a transparent record of how a query evolved, and verifiable AI-assisted screening into a single environment. In a comparative study with 8 researchers, that integration moved effort away from administrative overhead and toward strategic exploration, using external representations and visible AI reasoning to keep expert judgement in the loop.',
    ],
    image: arcImage,
    imageAlt:
      'ARC interface overview: search bar, search history with comparisons, search results table, and LLM-powered relevance filtering.',
    links: [
      { label: 'Paper (IUI 2026)', href: 'https://doi.org/10.1145/3742413.3789079' },
    ],
    people: [
      'harry_ye',
      'naaz_sibia',
      'angela_zavaleta_bernuy',
      'michael_liut',
      'tingting_zhu',
      'carolina_nobre',
      'viktoria_pammer_schindler',
    ],
    publications: arcPublications,
  },
  {
    slug: 'voiceex',
    name: 'VoiceEx',
    status: 'active',
    tagline:
      'Exploring how voice-based reflection can make self-explanation more natural, expressive, and effective for learners.',
    summary:
      'A voice-first reflection environment for studying how students explain their thinking, revisit difficult concepts, and respond to guided follow-up questions.',
    description: [
      'VoiceEx supports self-explanation in flipped computing courses. Students can listen to a reflection prompt, record or upload a spoken response, and continue with guided follow-up questions that encourage them to examine how they approached a problem and where their understanding could improve.',
      'The research behind VoiceEx compares voice and text as reflection media. Across field studies and interviews, students initially tended to prefer text, while voice responses were often longer and contained more topic-related language. Preference for voice increased with experience, revealing how social presence, confidence, cognitive load, and performance anxiety should shape the design of mixed-modality learning tools.',
    ],
    image: voiceexImage,
    showcaseImageClassName: 'max-h-[min(48svh,28rem)]',
    imageAlt:
      'VoiceEx reflection interface with an audio prompt, voice recording controls, audio upload, and follow-up reflection questions.',
    links: [
      {
        label: 'Paper (DIS 2024)',
        href: 'https://doi.org/10.1145/3643834.3661596',
      },
    ],
    people: [
      'angela_zavaleta_bernuy',
      'naaz_sibia',
      'harry_ye',
      'jessica_wen',
      'michael_liut',
      'andrew_petersen',
      'viktoria_pammer_schindler',
    ],
    publications: voiceexPublications,
  },
]

const resolvePerson = (slug, projectName) => {
  const person = membersBySlug[slug]

  // Fail at build time rather than quietly dropping someone from a project.
  if (!person) {
    throw new Error(
      `Project "${projectName}" lists an unknown team slug: "${slug}". Add the person to data/members or fix the slug.`
    )
  }

  return {
    name: person.name,
    slug: person.slug,
    link: person.link,
    image: person.image,
    position: person.position,
    institution: getMemberInstitution(person),
    isCollaborator: isCollaborator(person),
  }
}

/** CORE Lab members first, then external collaborators, each in listed order. */
const resolvePeople = (project) => {
  const people = project.people.map(slug => resolvePerson(slug, project.name))

  return {
    core: people.filter(person => !person.isCollaborator),
    collaborators: people.filter(person => person.isCollaborator),
  }
}

export const projects = projectEntries.map(project => ({
  ...project,
  people: resolvePeople(project),
  link: `/research/project/${project.slug}`,
}))

export const projectsBySlug = Object.fromEntries(
  projects.map(project => [project.slug, project])
)
