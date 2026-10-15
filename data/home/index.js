import michaelNameCard from './assets/ml_name.png'
import andrewNameCard from './assets/ap_name.png'
import lisaNameCard from './assets/lz_name.png'
import whiteboardArtwork from './assets/whiteboard.png'
import doorArtwork from './assets/door.png'
import windowArtwork from './assets/window.png'
import anrLogo from '../navigation/assets/anr-logo.jpg'
import dsiLogo from '../navigation/assets/dsi-logo.png'
import mcmasterUniversityLogo from '../navigation/assets/mcmaster-university-logo-grey.png'
import nsercSymbol from '../navigation/assets/nserc-symbol-color.png'
import toolsCompetitionLogo from '../navigation/assets/tools-competition-logo.png'
import universityOfTorontoLogo from '../navigation/assets/uoft-logo-dark.svg'

export const heroContent = {
  title: 'CORE Lab',
  institutions: 'University of Toronto and McMaster University',
  tagline: 'CORE Lab (Computational Research and Education) studies how people learn, teach, and work in computationally-driven fields.',
  publicationBlurb: 'Our research appears across leading computing education and human-computer interaction (HCI) venues, spanning full papers, working-group reports, and posters.',
  actions: [
    { label: 'Meet the team', href: '/team', variant: 'primary' },
    { label: 'See our publications', href: '/publications', variant: 'secondary' },
    { label: 'See our projects', href: '/projects', variant: 'secondary' },
  ],
}

export const aboutContent = {
  title: 'About the lab',
  paragraphs: [
    'Our research spans computing education, assessment design, educational data mining, student experience, and human-centered AI tools for learning and research.',
    'The lab brings together faculty, graduate students, and undergraduate researchers from the University of Toronto, McMaster University, and partner institutions.',
  ],
  focusAreas: [
    'Adaptive Systems',
    'Artificial Intelligence',
    'Computing Education',
    'Educational Technology',
    'Human-Centered AI',
    'Human-Computer Interaction',
    'Learning Science & Analytics',
    'Machine Learning',
    'Student Experience',
    'UI/UX'
  ],
}

// Closes the About section, below the publications overview.
export const labCultureContent = {
  title: 'How we work',
  paragraphs: [
    'We aim for excellence and push the boundaries of our fields, and we believe that depends on an equitable lab. Every member, from first-year undergraduates to doctoral students, is trained in research methods, research ethics, and the tools we build with, and we revisit that training regularly as methods and expectations change.',
    'The lab is structured so that no one works alone. Students are mentored by faculty and by more senior lab members, projects are run by small teams with clear roles, and credit is shared openly. Beyond our own universities, we work with industry partners and with international collaborators across Europe, Asia, and Oceania. That range of people and perspectives lets us take on questions that no single group could answer.',
  ],
}

export const institutionalSupportContent = {
  title: 'Affiliations & grant support',
  description: 'CORE Lab brings together researchers at the University of Toronto and McMaster University, with support from Canadian and international research organizations.',
  affiliations: [
    {
      name: 'University of Toronto',
      href: 'https://www.utm.utoronto.ca/',
      logo: universityOfTorontoLogo,
      alt: 'University of Toronto logo',
      logoClassName: 'h-20',
    },
    {
      name: 'McMaster University',
      href: 'https://www.mcmaster.ca/',
      logo: mcmasterUniversityLogo,
      alt: 'McMaster University logo',
      logoClassName: 'h-20',
    },
  ],
  sponsors: [
    {
      name: 'NSERC',
      description: 'Canada',
      href: 'https://nserc-crsng.canada.ca/en',
      logo: nsercSymbol,
      alt: 'Natural Sciences and Engineering Research Council of Canada logo',
      logoClassName: 'h-20',
    },
    {
      name: 'Learning Engineering Tools Competition',
      description: 'International innovation prize',
      href: 'https://tools-competition.org/winner/quickta/',
      logo: toolsCompetitionLogo,
      alt: 'Tools Competition logo',
      logoClassName: 'h-14',
    },
    {
      name: 'ANR',
      description: 'France',
      href: 'https://anr.fr/en/',
      logo: anrLogo,
      alt: 'Agence Nationale de la Recherche logo',
      logoClassName: 'h-16',
    },
    {
      name: 'Data Sciences Institute',
      description: 'University of Toronto',
      href: 'https://datasciences.utoronto.ca/',
      logo: dsiLogo,
      alt: 'University of Toronto Data Sciences Institute logo',
      logoClassName: 'h-20',
    },
  ],
  sponsorNote: 'Our support spans national, international, and institutional programs: Canada’s NSERC Discovery Grants and Collaborative Research and Training Experience program (CREATE); the Learning Engineering Tools Competition; France’s ANR; and the University of Toronto’s Data Sciences Institute (DSI), Institute for the Study of University Pedagogy (ISUP), and Learning & Education Advancement Fund (LEAF), with additional support from McMaster University.',
}

// Closes the affiliations section, for prospective donors and funders.
export const supportCallout = {
  title: 'Support our research',
  text: 'Interested in funding or donating to our research? Gifts and sponsorships help us train student researchers, run studies in real classrooms, and build tools that instructors everywhere can use. Reach out to Michael or Angela to talk about how you can help.',
  // One email to both directors, with the subject filled in.
  contacts: [
    {
      label: 'Contact us',
      href: 'mailto:michael.liut@utoronto.ca,zavaleta@mcmaster.ca?subject=Supporting%20CORE%20Lab%20research',
    },
  ],
}

// The photos themselves come from `public/photos/`; see the README there.
export const photoCarouselContent = {
  title: 'Around the lab',
  description: 'Snapshots from lab events, conferences, and everyday life in the office.',
}

export const artworkSection = {
  title: 'Lab Artwork',
  description: 'A new, growing archive of artwork, office decorations, and visual notes made by lab members. This page is a work in progress, and more pieces will be added over time.',
  items: [
    {
      artist: 'Jess',
      description: 'A decorated name card for Michael, made after an introduction to research that turned into an ongoing collaboration.',
      image: michaelNameCard,
    },
    {
      artist: 'Jess',
      description: 'A decorated name card for Andrew, part of a growing collection of office-door artwork.',
      image: andrewNameCard,
    },
    {
      artist: 'Jess',
      description: "A decorated name card for Lisa, continuing the lab's informal office-art tradition.",
      image: lisaNameCard,
    },
    {
      artist: 'Jess',
      description: 'A long-running whiteboard piece built up across office hours, with room for new additions over time.',
      image: whiteboardArtwork,
    },
    {
      artist: 'Jess',
      description: "End-of-year decorations from Andrew's office, including a few carefully guarded Pokemon cards.",
      image: doorArtwork,
    },
    {
      artist: 'Jess',
      description: 'A Tetris-inspired window installation chosen for its color, simplicity, and easy reconfiguration.',
      image: windowArtwork,
    },
  ],
}
