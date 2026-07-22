import coreLogo from './assets/core_logo.png'
import uoftLogoDark from './assets/uoft-logo-dark.svg'

export const siteBrand = {
  name: 'CORE Lab',
  logo: coreLogo,
  affiliation: {
    name: 'University of Toronto',
    logo: uoftLogoDark,
    href: 'https://www.utoronto.ca/',
  },
}

export const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/team', label: 'Team' },
  { href: '/publications', label: 'Publications' },
  { href: '/projects', label: 'Projects' },
  { href: '#contactus', label: 'Contact' },
]
