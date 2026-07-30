import Image from 'next/image'
import Link from 'next/link'
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
    <footer className='scroll-anchor bg-[#101413] text-white' id='contactus'>
      <div className='page-shell py-16 sm:py-24'>
        <div className='grid gap-14 border-t border-white/20 pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24'>
          <section aria-labelledby='footer-lab'>
            <Link href='/' className='inline-flex items-center gap-3'>
              <Image src={siteBrand.logo} alt={`${siteBrand.name} logo`} width={40} height={40} />
              <span id='footer-lab' className='text-base font-semibold tracking-tight text-white'>{siteBrand.name}</span>
            </Link>
            <p className='mt-8 max-w-xl font-editorial text-3xl leading-[1.1] text-white/85 sm:text-4xl'>
              Computing education research across the University of Toronto and McMaster University.
            </p>
            <div className='mt-12 grid gap-8 text-sm leading-6 text-white/55 sm:grid-cols-2'>
              <address className='not-italic'>
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
              <address className='not-italic'>
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
            </div>
          </section>

          <section aria-labelledby='footer-contact'>
            <h2 id='footer-contact' className='text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/55'>Contact</h2>
            <ul className='mt-6 border-t border-white/20 text-sm'>
              {contactEmails.map((email) => (
                <li key={email} className='border-b border-white/20'>
                  <a href={`mailto:${email}`} className='block break-all py-4 text-white/75 transition-colors hover:text-white'>
                    {email}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href='https://www.utm.utoronto.ca/visitors/maps-and-directions'
              className='mt-7 inline-flex border-b border-white/45 pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/75 transition-colors hover:border-brand hover:text-white'
              target='_blank'
              rel='noreferrer'
            >
              UTM maps and directions
            </a>
          </section>
        </div>

        <div className='mt-16 border-t border-white/20 pt-6 text-xs uppercase tracking-[0.1em] text-white/40 sm:flex sm:items-center sm:justify-between'>
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
