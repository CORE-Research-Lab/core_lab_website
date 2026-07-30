import Image from 'next/image'
import Link from 'next/link'
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { navigationItems, siteBrand } from '@/data/navigation'

const contactEmails = [
  'corelab.utm@utoronto.ca',
  'michael.liut@utoronto.ca',
  'zavaleta@mcmaster.ca',
]

const footerLinks = navigationItems.filter((item) => item.href !== '#contactus')

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='scroll-anchor bg-slate-950 text-slate-100' id='contactus'>
      <div className='page-shell py-14'>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.85fr]'>
          <section aria-labelledby='footer-lab'>
            <Link href='/' className='inline-flex items-center gap-3'>
              <Image src={siteBrand.logo} alt={`${siteBrand.name} logo`} width={52} height={52} />
              <span id='footer-lab' className='text-xl font-semibold text-white'>{siteBrand.name}</span>
            </Link>
            <p className='mt-4 max-w-sm text-sm leading-6 text-slate-300'>
              Computing education research across the University of Toronto and McMaster University.
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
            <address className='mt-5 flex gap-3 not-italic text-sm leading-6 text-slate-300'>
              <FaMapMarkerAlt className='mt-1 h-4 w-4 shrink-0 text-blue-200' aria-hidden='true' />
              <span>
                Information Technology Building
                <br />
                McMaster University
                <br />
                1280 Main Street West
                <br />
                Hamilton, ON L8S 4L8
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
        </div>

        <div className='mt-10 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex sm:items-center sm:justify-between'>
          <p>&copy; {currentYear} CORE Lab.</p>
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
