import arcImage from './assets/arc.png'
import voiceexImage from './assets/voiceex.png'
import arcPublications from '@/Papers/Projects/arc_papers.json'
import voiceexPublications from '@/Papers/Projects/voiceex_papers.json'
import numiPublications from '@/Papers/Projects/numi_papers.json'
import quicktaPublications from '@/Papers/Projects/quickta_papers.json'
import codeToConceptPublications from '@/Papers/Projects/code-to-concept_papers.json'
import marginPublications from '@/Papers/Projects/margin_papers.json'
import mosaicPublications from '@/Papers/Projects/mosaic_papers.json'
import sqamPublications from '@/Papers/Projects/sqam_papers.json'
import medbotPublications from '@/Papers/Projects/medbot_papers.json'
import { isCollaborator, membersBySlug } from '@/data/members'

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
 * `image` is optional: a project without one gets a text-only card.
 */
const projectEntries = [
  {
    slug: 'numi',
    name: 'NUMI',
    status: 'active',
    tagline: 'Mastery learning for middle-school math, with an AI tutor that coaches through mistakes instead of giving answers.',
    summary:
      'A lab-built practice platform studied with nearly 7,000 students in 20 schools: mastery requirements boosted practice, and the AI tutor improved recovery after errors.',
    description: [
      'Computer-assisted learning in mathematics works best when students persist to mastery and learn from their mistakes. Most platforms let students stop early, and general-purpose AI tutors tend to hand over answers, which recent large-scale studies show can hurt learning.',
      'NUMI delivers weekly, curriculum-aligned modules (a short video, exercises, an exit ticket, immediate feedback and worked solutions) with a mastery rule of three correct in a row and a guardrailed tutor beside every exercise. The tutor never gives the final answer. It offers a reasoning check to get started and, after a mistake, walks the student through the solution step by step, surfacing likely misconceptions. Student inputs are not stored by any external AI provider.',
      'In a pre-registered experiment with 6,997 grade 6–8 students across 20 schools, the mastery requirement raised the share of students reaching mastery by 28.7 percentage points. The AI tutor raised the chance of answering correctly right after a mistake by 8.5 points on a 31.7% base. On a delayed test a week later, the tutor helped most when paired with a requirement to persist. Larger trials across grades 4–9 are under way.',
    ],
    links: [
      { label: 'Paper (NBER Working Paper 35621)', href: 'https://doi.org/10.3386/w35621' },
      { label: 'Trial registration (AEARCTR-0018643)', href: 'https://www.socialscienceregistry.org/trials/18643' },
    ],
    people: ['philip_oreopoulos', 'michael_liut'],
    publications: numiPublications,
  },
  {
    slug: 'quickta',
    name: 'QuickTA',
    status: 'active',
    tagline: 'An LLM teaching assistant that hints, checks understanding, and never hands over the answer, at any hour and at scale.',
    summary:
      'Course-aware chat tutoring with pedagogical guardrails and guided reflection, deployed to more than a thousand students and studied in randomized field experiments.',
    description: [
      'One-to-one tutoring produces some of the largest learning gains known, and it has never been affordable at scale. In a course of a thousand students, help arrives late, unevenly, and mostly in office hours. Generic chatbots fill the gap by handing over answers.',
      'QuickTA is a course-aware conversational tutor built on large language models with pedagogical guardrails: it withholds complete solutions, stays on the assignment’s topic, and follows a hint-then-check structure drawn from worked-example and metacognitive-questioning research. After assignments it runs LLM-guided reflection to support self-regulated learning, and every interaction is logged for research. A campus-hosted version runs on small language models with retrieval-augmented generation, so student questions never leave university hardware.',
      'Across deployments in introductory databases and CS1 courses at the University of Toronto, 54% of students’ first queries were conceptual rather than solution-seeking. Brief guidance on how to use the tutor cut verbatim copy-pasting, trust in the tutor rose over the term, and guided reflection raised self-reported confidence, although exam-score differences were not statistically significant. In a cluster-randomized study in a 774-student mathematical statistics course, giving the tutor access to course materials did not change tutorial scores, but international students and students with lower final grades were more likely to find it useful.',
    ],
    links: [
      { label: 'Paper (CSCW 2024)', href: 'https://doi.org/10.1145/3687038' },
      { label: 'Paper (L@S 2024)', href: 'https://doi.org/10.1145/3657604.3662042' },
    ],
    people: [
      'michael_liut',
      'ilya_musabirov',
      'suqing_liu',
      'zezhu_sam_yu',
      'yousef_bulbulia',
      'ruiwei_xiao',
      'andi_bergen',
      'john_stamper',
      'marko_choi',
      'nathan_taback',
      'paul_denny',
    ],
    publications: quicktaPublications,
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
  {
    slug: 'code-to-concept',
    name: 'Code to Concept',
    status: 'active',
    tagline: 'See code, memory, and a metaphor move together: interactive multi-view visualizations for CS1 and CS2.',
    summary:
      'Synchronized code, memory, and analogy views for novice programmers, tested in a randomized trial with 829 CS1 students and extended to CS2 data structures.',
    description: [
      'Novices must build an accurate model of what a program does as it runs from static code alone. Single-view tools such as Python Tutor show memory state, but students still struggle to connect code, state, and concept, and a systematic review of 90 visualization-tool papers found the field long on tools and short on rigorous evaluation.',
      'Code to Concept is an open-source web tool with three synchronized panes: the Python code, a diagram of variables and runtime memory, and an instructor-written metaphor, such as a conveyor belt for iteration or a relay race for linked lists. Shared stepping controls keep the views coordinated, and a CS2 variant swaps the metaphor for an abstract structural view aimed at recursion and linked data structures.',
      'In a 12-week randomized trial in a 1,080-student CS1 course (829 consenting), the multi-view tool produced higher end-of-term engagement than Python Tutor with no increase in cognitive load. Students reporting language barriers preferred multiple visuals, and eye-tracking showed code anchoring attention while memory views peaked on linked lists.',
    ],
    links: [
      { label: 'Code (GitHub)', href: 'https://github.com/CORE-Research-Lab/Interactive-Viz-IntroProgramming' },
      { label: 'Paper (ICER 2026)', href: 'https://doi.org/10.1145/3765964.3811662' },
      { label: 'Paper (Koli Calling 2025)', href: 'https://doi.org/10.1145/3769994.3769998' },
    ],
    people: [
      'naaz_sibia',
      'jessica_wen',
      'amber_richardson',
      'yashika_jain',
      'khushi_malik',
      'valeria_osorio_ramirez',
      'angela_zavaleta_bernuy',
      'bogdan_simion',
      'andrew_petersen',
      'michael_liut',
      'carolina_nobre',
    ],
    publications: codeToConceptPublications,
  },
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
    slug: 'margin',
    name: 'Margin',
    status: 'active',
    tagline: 'Criterion-based feedback on technical writing in hours, not weeks, from language models that run on campus hardware.',
    summary:
      'A retrieval-augmented feedback pipeline for computing writing assignments. Students rated its feedback above TA feedback, and a cohort was processed in 1.8 hours instead of about 40.',
    description: [
      'Writing is central to computing careers, but feedback on design documents, bug reports, and READMEs is slow, uneven, and expensive. In a class of 200, TA feedback can take weeks and tens of hours, and by the time it arrives students have moved on.',
      'Margin is named for the margin of a draft, where a good reviewer’s comments have always gone. It is a retrieval-augmented generation pipeline that produces rubric-aligned, criterion-level comments rather than grades. It runs on small language models hosted on institutional hardware, so student work never leaves campus and there is no per-use API cost, building on the local small-model pipelines first developed for QuickTA.',
      'In blinded, within-subjects studies, students rated the local model’s feedback 5.73 out of 7 in CS2 (n = 176), against 5.48 for GPT-4o and 3.62 for TA feedback. In Operating Systems (n = 80) the local model again led, and the pipeline processed the cohort in 1.8 hours instead of about 40 hours of TA grading and training.',
    ],
    links: [
      { label: 'Paper (AIED 2026)', href: 'https://doi.org/10.1007/978-3-032-29760-0_57' },
    ],
    people: ['suqing_liu', 'harry_ye', 'bogdan_simion', 'michael_liut', 'christopher_eaton'],
    publications: marginPublications,
  },
  {
    slug: 'mosaic',
    name: 'MOSAIC',
    status: 'active',
    tagline: 'Turning one static worksheet into a personalized learning path, shaped by each student’s knowledge, motivation, and skills.',
    summary:
      'LLM-personalized learning materials built on the FACET framework. In CS1 they lifted completion above 99% and raised correctness 18% for the students most at risk.',
    description: [
      'Introductory programming classes span students who have coded for years and students who have never seen a loop, and motivation varies as much as knowledge. A single static worksheet bores some and loses others: without personalization, 25–30% of low-knowledge students never finished.',
      'MOSAIC builds on FACET, developed by Gonnermann-Müller and colleagues at the Weizenbaum Institute, which uses LLMs to generate differentiated worksheets from an instructor’s own materials. MOSAIC extends it into a richer learner model that combines knowledge, motivation, and skills, and varies scaffolding, explicitness, and tone for each student while the instructor keeps control of the content.',
      'In a first study with 409 CS1 students learning regular expressions, personalized worksheets lifted completion above 99% in every profile. The low-knowledge, low-motivation group gained 18.2% in correctness, a statistically significant result, while perceived challenge stayed the same: personalization acted as a retention scaffold, not a shortcut. The project is now extending its learner model to neurodivergent learners.',
    ],
    links: [
      { label: 'Paper (ITiCSE 2026)', href: 'https://doi.org/10.1145/3803400.3809330' },
    ],
    people: ['franco_ortiz', 'harry_ye', 'michael_liut'],
    publications: mosaicPublications,
  },
  {
    slug: 'sqam',
    name: 'SQAM',
    status: 'active',
    tagline: 'An SQL automarker that grades queries by what they return, with partial credit, plus scaffolded schema and data tasks.',
    summary:
      'SQAM grades SQL by result set with partial credit, and weekly schema and data tasks with instant feedback (9,071 submissions from 669 students) build full data skills.',
    description: [
      'Database courses often reduce to writing SELECT queries, graded all-or-nothing by string matching. Students who are nearly right get nothing and learn little from the mark, and they rarely practise defining schemas or managing data, the skills industry says it needs most.',
      'SQAM, the SQL AutoMarker, grades a query by what it returns rather than how it is written, awarding partial credit and personalized feedback. Across five course offerings its marks matched TA marks wherever TAs gave partial credit, and averaged 14.5 points above a binary automarker.',
      'Weekly scaffolded schema and data exercises with immediate feedback now make data definition and manipulation a core, assessed part of a third-year database course. Across three offerings (669 students, 9,071 submissions), students needed fewer attempts on schema and data tasks than on queries, and early schema performance predicted later SQL performance.',
    ],
    links: [
      { label: 'Paper (Koli Calling 2021)', href: 'https://doi.org/10.1145/3488042.3489970' },
      { label: 'Paper (ITiCSE 2026)', href: 'https://doi.org/10.1145/3803400.3809307' },
    ],
    people: [
      'naaz_sibia',
      'jessica_wen',
      'zeling_zoey_zhang',
      'harry_ye',
      'ilya_musabirov',
      'bogdan_simion',
      'andrew_petersen',
      'angela_zavaleta_bernuy',
      'michael_liut',
      'paul_vrbik',
      'carlos_anibal_suarez',
    ],
    publications: sqamPublications,
  },
  {
    slug: 'medbot',
    name: 'MedBot',
    status: 'active',
    tagline: 'Practise history taking and hard conversations with an AI simulated patient, and get rubric-based feedback immediately.',
    summary:
      'A voice-enabled simulated patient for medical learners, co-developed with clinicians, that scores each encounter against instructor rubrics and gives feedback.',
    description: [
      'Clinical interviewing (taking a history, reasoning toward a diagnosis, delivering difficult news) is learned through practice with patients, standardized actors, and OSCE-style assessment. Those opportunities are scarce, expensive, and arrive late, so learners get few repetitions and little immediate, specific feedback.',
      'MedBot is an adaptive simulated patient. Learners interview it by text or voice, and each encounter is assessed against an instructor’s rubric with automated, criterion-level feedback. The first published case teaches recognition of falls and geriatric syndromes in older adults. Co-developed with Dr. Nihal Haque (North York General Hospital; Temerty Faculty of Medicine).',
    ],
    links: [
      { label: 'Paper (AIME 2026)', href: 'https://doi.org/10.1007/978-3-032-30813-9_19' },
    ],
    people: ['nihal_haque', 'michael_liut'],
    publications: medbotPublications,
  },
  {
    slug: 'request',
    name: 'ReQuest',
    status: 'in-development',
    tagline: 'Practise requirements interviews with a simulated stakeholder and get feedback on the questions you ask.',
    summary:
      'An AI-supported trainer for requirements elicitation. Learners interview a simulated client, then receive feedback on question quality, coverage, and follow-up.',
    description: [
      'Requirements elicitation is where software projects most often go wrong, and it depends on a skill that is rarely taught explicitly: asking good questions. Students read about open and closed questions, probing, and follow-up, but get few chances to practise with a stakeholder and almost no feedback on the questions themselves.',
      'ReQuest turns question asking into a skill learners can practise and be assessed on. Learners run an elicitation interview and receive formative feedback on their questions: type, coverage of the problem space, sequencing, and missed follow-ups. Repeated rounds give researchers fine-grained data on how novices’ questioning strategies develop.',
    ],
    people: ['angela_zavaleta_bernuy', 'amber_richardson', 'caroline_pechenik'],
  },
  {
    slug: 'amber',
    name: 'AMBER',
    status: 'in-development',
    tagline: 'Adaptive Model-Blended Editing and Reflection: revise with feedback blended from several AI models, then reflect on what changed.',
    summary:
      'AMBER blends feedback from multiple AI models, adapts it to each writer, and pairs every round of editing with guided reflection.',
    description: [
      'Writing improves through cycles of feedback and revision, but every single source of feedback (one TA, one instructor, one AI model) has blind spots. Students often accept or ignore suggestions without asking why, so revision becomes compliance rather than learning.',
      'AMBER combines feedback from several language models into one set of suggestions, adapted to the writer’s level and the task. Learners edit their drafts in response, then reflect on each change: what they revised, why, and what they would do differently next time.',
    ],
    people: ['angela_zavaleta_bernuy', 'amber_richardson'],
  },
]

export const otherToolsSection = {
  title: 'Other tools',
  description:
    'Systems that CORE Lab members helped design, build, deploy, or evaluate, many in partnership with collaborators at other institutions. Each links to the paper that describes it.',
}

/**
 * Smaller systems that have a paper but no project page of their own. Each
 * links straight to its paper; `venue` is the label shown beside it.
 */
export const otherTools = [
  {
    title: 'Learning tools',
    items: [
      {
        name: 'OnTrack',
        description: 'Reminder emails whose wording and timing are chosen by multi-armed bandits, tested in large courses.',
        venue: 'SIGITE 2022',
        href: 'https://doi.org/10.1145/3537674.3554740',
      },
      {
        name: 'Pedagogical Prompting',
        description: 'Teaches students to prompt LLMs in ways that support learning, tested in an RCT in CS1.',
        venue: 'arXiv 2026',
        href: 'https://doi.org/10.48550/arxiv.2602.16033',
      },
      {
        name: 'CodeAid',
        description: 'A classroom LLM programming assistant that scaffolds rather than solves.',
        venue: 'CHI 2024',
        href: 'https://doi.org/10.1145/3613904.3642773',
      },
      {
        name: 'Codetierlist',
        description: 'A competitive, tier-list gamification platform for programming courses.',
        venue: 'ACE 2025',
        href: 'https://doi.org/10.1145/3716640.3716646',
      },
      {
        name: 'ShapeCreator Mobile',
        description: 'At-home coding practice designed for low-resource settings.',
        venue: 'ITiCSE 2025',
        href: 'https://doi.org/10.1145/3724389.3731253',
      },
      {
        name: 'SSDVis',
        description: 'Interactive visualization of operating-systems and SSD concepts.',
        venue: 'ITiCSE 2026',
        href: 'https://doi.org/10.1145/3803400.3809309',
      },
      {
        name: 'AI-Generated Traces',
        description: 'LLM-generated execution traces for novice programmers, studied across institutions.',
        venue: 'ITiCSE 2026',
        href: 'https://doi.org/10.1145/3803400.3809346',
      },
      {
        name: 'On-Demand Hints',
        description: 'Hints and progress feedback on programming exercises, compared in large courses.',
        venue: 'ITiCSE 2025',
        href: 'https://doi.org/10.1145/3724389.3730787',
      },
      {
        name: 'UML and ER Diagram Feedback',
        description: 'Automated, criterion-based LLM feedback on student software-design diagrams.',
        venue: 'arXiv 2025',
        href: 'https://doi.org/10.48550/arxiv.2507.23470',
      },
      {
        name: 'Humanized Programming Feedback',
        description: 'Generative models fine-tuned on student-written feedback to sound more like a person.',
        venue: 'arXiv 2025',
        href: 'https://doi.org/10.48550/arxiv.2509.10647',
      },
      {
        name: 'Adaptive Experiments Platform',
        description: 'Infrastructure for running adaptive experiments inside course platforms.',
        venue: 'LAK 2025',
        href: 'https://doi.org/10.1145/3706468.3706471',
      },
    ],
  },
  {
    title: 'Research and writing tools',
    items: [
      {
        name: 'Reflexis',
        description: 'Collaborative qualitative analysis that supports researcher reflexivity.',
        venue: 'CHI 2026',
        href: 'https://doi.org/10.1145/3772318.3791275',
      },
      {
        name: 'ScholarMate',
        description: 'A mixed-initiative sensemaking tool for research literature.',
        venue: 'CHIWORK 2025',
        href: 'https://doi.org/10.1145/3707640.3731913',
      },
      {
        name: 'TreeReader',
        description: 'An LLM-powered hierarchical reader for research papers.',
        venue: 'VL/HCC 2025',
        href: 'https://doi.org/10.1109/vl-hcc65237.2025.00039',
      },
      {
        name: 'TreeWriter',
        description: 'Hierarchical AI planning and drafting for long documents.',
        venue: 'arXiv 2026',
        href: 'https://doi.org/10.48550/arxiv.2601.12740',
      },
      {
        name: 'ABScribe',
        description: 'Human–AI co-writing that lets writers explore many variations at once.',
        venue: 'CHI 2024',
        href: 'https://doi.org/10.1145/3613904.3641899',
      },
      {
        name: 'CopilotLens',
        description: 'A transparency layer that explains what AI coding agents did and why.',
        venue: 'arXiv 2025',
        href: 'https://doi.org/10.48550/arxiv.2506.20062',
      },
    ],
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
    institution: person.institution,
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
  link: `/projects/${project.slug}`,
}))

export const projectsBySlug = Object.fromEntries(
  projects.map(project => [project.slug, project])
)
