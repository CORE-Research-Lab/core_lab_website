import Image from 'next/image'
import { institutionalSupportContent } from '@/data/home'
import { SectionHeading } from '@/Components/UI/SectionHeading'

const OrganizationCard = ({ organization }) => (
  <li>
    <a
      href={organization.href}
      className='group flex h-full min-h-36 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-5 text-center shadow-sm transition-colors hover:border-brand/35'
      target='_blank'
      rel='noreferrer'
      aria-label={`Visit ${organization.name}`}
    >
      <span className='flex min-h-20 w-full items-center justify-center'>
        <Image
          src={organization.logo}
          alt={organization.alt}
          className={`max-w-full object-contain ${organization.logoClassName}`}
          sizes='(max-width: 640px) 10rem, 12rem'
        />
      </span>
      <span className='mt-3 text-sm font-semibold text-slate-700 transition-colors group-hover:text-brand'>
        {organization.name}
      </span>
    </a>
  </li>
)

const InstitutionalSupport = () => (
  <section className='border-t border-brand-line bg-brand-soft/55'>
    <div className='page-shell py-14 sm:py-16'>
      <SectionHeading id='affiliations'>
        {institutionalSupportContent.title}
      </SectionHeading>
      <p className='mt-5 max-w-4xl text-lg leading-8 text-slate-700'>
        {institutionalSupportContent.description}
      </p>

      <div className='mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]'>
        <section className='rounded-2xl border border-brand/10 bg-white/65 p-5 sm:p-6' aria-labelledby='institutional-affiliations'>
          <h3 id='institutional-affiliations' className='text-subsection font-semibold text-brand-dark'>
            Affiliations
          </h3>
          <ul className='mt-5 grid gap-4 sm:grid-cols-2'>
            {institutionalSupportContent.affiliations.map((affiliation) => (
              <OrganizationCard key={affiliation.name} organization={affiliation} />
            ))}
          </ul>
        </section>

        <section className='rounded-2xl border border-brand/10 bg-white/65 p-5 sm:p-6' aria-labelledby='institutional-sponsors'>
          <h3 id='institutional-sponsors' className='text-subsection font-semibold text-brand-dark'>
            Sponsors
          </h3>
          <ul className='mt-5 grid gap-4 sm:grid-cols-3'>
            {institutionalSupportContent.sponsors.map((sponsor) => (
              <OrganizationCard key={sponsor.name} organization={sponsor} />
            ))}
          </ul>
          <p className='mt-5 text-sm leading-6 text-slate-600'>
            {institutionalSupportContent.sponsorNote}
          </p>
        </section>
      </div>
    </div>
  </section>
)

export default InstitutionalSupport
