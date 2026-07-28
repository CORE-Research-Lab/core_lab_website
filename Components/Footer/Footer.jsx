import Image from 'next/image'
import Link from 'next/link'
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { navigationItems, siteBrand } from '@/data/navigation'
import anrLogo from '@/data/navigation/assets/anr-logo.jpg'
import dsiLogo from '@/data/navigation/assets/dsi-logo.png'
import mcmasterUniversityLogo from '@/data/navigation/assets/mcmaster-university-logo.png'
import nsercSymbol from '@/data/navigation/assets/nserc-symbol-color.png'
import universityOfTorontoLogo from '@/data/navigation/assets/university-of-toronto-logo-white.png'

const contactEmails = [
  'corelab.utm@utoronto.ca',
  'michael.liut@utoronto.ca',
]

const footerLinks = navigationItems.filter((item) => item.href !== '#contactus')

const affiliations = [
  {
    name: 'University of Toronto',
    href: 'https://www.utoronto.ca/',
    logo: universityOfTorontoLogo,
    alt: 'University of Toronto logo',
    width: 435,
    height: 177,
    className: 'h-12',
  },
  {
    name: 'McMaster University',
    href: 'https://www.mcmaster.ca/',
    logo: mcmasterUniversityLogo,
    alt: 'McMaster University logo',
    width: 316,
    height: 168,
    className: 'h-12',
  },
]

const sponsors = [
  {
    name: 'Data Sciences Institute',
    href: 'https://datasciences.utoronto.ca/',
    logo: dsiLogo,
    alt: 'University of Toronto Data Sciences Institute logo',
    width: 80,
    height: 45,
    className: 'rounded-sm bg-white',
  },
  {
    name: 'NSERC',
    href: 'https://nserc-crsng.canada.ca/en',
    logo: nsercSymbol,
    alt: 'Natural Sciences and Engineering Research Council of Canada symbol',
    width: 94,
    height: 45,
  },
  {
    name: 'ANR',
    href: 'https://anr.fr/en/',
    logo: anrLogo,
    alt: 'Agence Nationale de la Recherche logo',
    width: 146,
    height: 45,
    className: 'rounded-sm bg-white',
  },
]

const OrganizationLogo = ({ organization }) => (
  <a
    href={organization.href}
    className='flex h-12 items-center justify-center transition hover:opacity-80'
    target='_blank'
    rel='noreferrer'
    aria-label={`Visit ${organization.name}`}
  >
    <Image
      src={organization.logo}
      alt={organization.alt}
      width={organization.width}
      height={organization.height}
      className={`h-11 w-auto object-contain ${organization.className || ''}`}
    />
  </a>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='mt-16 bg-slate-950 text-slate-100' id='contactus'>
      <div className='mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12'>
        <div className='grid gap-10 lg:grid-cols-[1.2fr_0.9fr_2fr]'>
          <section aria-labelledby='footer-lab'>
            <Link href='/' className='inline-flex items-center gap-3'>
              <Image src={siteBrand.logo} alt={`${siteBrand.name} logo`} width={52} height={52} />
              <span id='footer-lab' className='text-xl font-semibold text-white'>{siteBrand.name}</span>
            </Link>
            <p className='mt-4 max-w-sm text-sm leading-6 text-slate-300'>
              Computing education research at the University of Toronto Mississauga.
            </p>
            <address className='mt-5 flex gap-3 not-italic text-sm leading-6 text-slate-300'>
              <FaMapMarkerAlt className='mt-1 h-4 w-4 shrink-0 text-blue-200' aria-hidden='true' />
              <span>
                Deerfield Hall
                <br />
                University of Toronto Mississauga
                <br />
                3359 Mississauga Road
                <br />
                Mississauga, ON L5L 1C6
              </span>
            </address>
          </section>

          <section aria-labelledby='footer-contact'>
            <h2 id='footer-contact' className='text-sm font-semibold text-white'>Contact</h2>
            <ul className='mt-4 space-y-3 text-sm'>
              {contactEmails.map((email) => (
                <li key={email} className='flex items-center gap-2'>
                  <FaEnvelope className='h-4 w-4 shrink-0 text-blue-200' aria-hidden='true' />
                  <a href={`mailto:${email}`} className='break-all text-slate-300 transition hover:text-white hover:underline'>
                    {email}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href='https://www.utm.utoronto.ca/visitors/maps-and-directions'
              className='mt-5 inline-flex text-sm font-medium text-blue-200 transition hover:text-white hover:underline'
              target='_blank'
              rel='noreferrer'
            >
              UTM maps and directions
            </a>
          </section>

          <div className='grid gap-x-10 gap-y-6 sm:grid-cols-2'>
            <section aria-labelledby='footer-affiliation'>
              <h2 id='footer-affiliation' className='text-sm font-semibold text-white'>Affiliation</h2>
              <ul className='mt-5 flex flex-col items-start gap-5'>
                {affiliations.map((affiliation) => (
                  <li key={affiliation.name}>
                    <a
                      href={affiliation.href}
                      className='inline-flex transition hover:opacity-80'
                      target='_blank'
                      rel='noreferrer'
                      aria-label={`Visit ${affiliation.name}`}
                    >
                      <Image
                        src={affiliation.logo}
                        alt={affiliation.alt}
                        width={affiliation.width}
                        height={affiliation.height}
                        className={`w-auto object-contain ${affiliation.className}`}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby='footer-sponsor'>
              <h2 id='footer-sponsor' className='text-sm font-semibold text-white'>Sponsors and supporters</h2>
              <div className='mt-5 flex flex-wrap items-center gap-x-7 gap-y-5'>
                {sponsors.map((sponsor) => (
                  <OrganizationLogo key={sponsor.name} organization={sponsor} />
                ))}
              </div>
            </section>

            <div className='border-t border-white/10 pt-5 sm:col-span-2'>
              <p className='text-sm leading-6 text-slate-300'>
                We thank the financial support from: NSERC (DG &amp; CREATE), University of Toronto (DSI, ISUP, LEAF), McMaster University, and France&apos;s ANR.
              </p>
              <p className='mt-2 text-xs leading-5 text-slate-400'>
                The CORE Lab is supported by these organizations and is not a product of any sponsor or funder.
              </p>
            </div>
          </div>
        </div>

        <div className='mt-10 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex sm:items-center sm:justify-between'>
          <p>&copy; {currentYear} CORE Lab, University of Toronto Mississauga.</p>
          <ul className='mt-4 flex flex-wrap gap-x-5 gap-y-2 sm:mt-0'>
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className='transition hover:text-white hover:underline'>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
