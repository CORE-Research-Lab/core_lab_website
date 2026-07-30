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
  eyebrow: 'University of Toronto · McMaster University',
  tagline: 'CORE Lab (Computational Research and Education) studies how people learn, teach, and work in computationally-driven fields.',
  publicationBlurb: 'We publish across leading computing education venues, including SIGCSE TS, ITiCSE, ICER, and Koli Calling, and leading human-computer interaction (HCI) venues like CHI and IUI.',
  actions: [
    { label: 'Meet the team', href: '/team', variant: 'primary' },
    { label: 'Read our research', href: '/publications', variant: 'secondary' },
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

export const institutionalSupportContent = {
  title: 'Affiliations & grant support',
  description: 'CORE Lab brings together researchers at the University of Toronto and McMaster University, with support from Canadian and international research organizations.',
  affiliations: [
    {
      name: 'University of Toronto',
      href: 'https://www.utm.utoronto.ca/',
      logo: universityOfTorontoLogo,
      alt: 'University of Toronto logo',
      logoClassName: 'h-16',
    },
    {
      name: 'McMaster University',
      href: 'https://www.mcmaster.ca/',
      logo: mcmasterUniversityLogo,
      alt: 'McMaster University logo',
      logoClassName: 'h-16',
    },
  ],
  sponsors: [
    {
      name: 'NSERC',
      description: 'Canada',
      href: 'https://nserc-crsng.canada.ca/en',
      logo: nsercSymbol,
      alt: 'Natural Sciences and Engineering Research Council of Canada logo',
      logoClassName: 'h-14',
    },
    {
      name: 'Learning Engineering Tools Competition',
      description: 'International innovation prize',
      href: 'https://tools-competition.org/winner/quickta/',
      logo: toolsCompetitionLogo,
      alt: 'Tools Competition logo',
      logoClassName: 'h-10',
    },
    {
      name: 'ANR',
      description: 'France',
      href: 'https://anr.fr/en/',
      logo: anrLogo,
      alt: 'Agence Nationale de la Recherche logo',
      logoClassName: 'h-11',
    },
    {
      name: 'Data Sciences Institute',
      description: 'University of Toronto',
      href: 'https://datasciences.utoronto.ca/',
      logo: dsiLogo,
      alt: 'University of Toronto Data Sciences Institute logo',
      logoClassName: 'h-16',
    },
  ],
  sponsorNote: 'Our support spans national, international, and institutional programs: Canada’s NSERC Discovery Grants and Collaborative Research and Training Experience program (CREATE); the Learning Engineering Tools Competition; France’s ANR; and the University of Toronto’s Data Sciences Institute (DSI), Institute for the Study of University Pedagogy (ISUP), and Learning & Education Advancement Fund (LEAF), with additional support from McMaster University.',
}

export const artworkSection = {
  title: 'Lab Artwork',
  description: 'A small archive of artwork, office decorations, and visual notes made by lab members.',
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
