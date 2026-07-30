import Image from 'next/image'
import { institutionalSupportContent } from '@/data/home'
import { SectionHeading } from '@/Components/UI/SectionHeading'

const OrganizationCard = ({ organization }) => (
  <li className='border-t border-black/15'>
    <a
      href={organization.href}
      className='group flex h-full min-h-48 flex-col items-start justify-between py-6 transition-colors'
      target='_blank'
      rel='noreferrer'
      aria-label={`Visit ${organization.name}`}
    >
      <span className='flex min-h-24 w-full items-center justify-start'>
        {/* Each logo is pinned to a height that optically balances it against
            the others, so the width has to stay `auto` to hold the source
            aspect ratio — and saying so explicitly is also what stops Next
            warning that only one axis was set. */}
        <Image
          src={organization.logo}
          alt={organization.alt}
          className={`w-auto max-w-full object-contain ${organization.logoClassName}`}
          sizes='(max-width: 640px) 12rem, 16rem'
        />
      </span>
      <span className='mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#303534] transition-colors group-hover:text-brand'>
        {organization.name}
      </span>
      {organization.description && (
        <span className='mt-1 text-xs text-slate-500'>
          {organization.description}
        </span>
      )}
    </a>
  </li>
)

const InstitutionalSupport = () => (
  <section>
    <div className='page-shell py-20 sm:py-28 lg:py-36'>
      <SectionHeading id='affiliations'>
        {institutionalSupportContent.title}
      </SectionHeading>
      <p className='mt-8 max-w-5xl font-editorial text-[clamp(1.55rem,1.2rem+1.15vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-[#303534]'>
        {institutionalSupportContent.description}
      </p>

      <div className='mt-16 grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24'>
        <section aria-labelledby='institutional-affiliations'>
          <h3 id='institutional-affiliations' className='text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-muted'>
            Affiliations
          </h3>
          <ul className='mt-5 grid sm:grid-cols-2'>
            {institutionalSupportContent.affiliations.map((affiliation) => (
              <OrganizationCard key={affiliation.name} organization={affiliation} />
            ))}
          </ul>
        </section>

        <section aria-labelledby='institutional-sponsors'>
          <h3 id='institutional-sponsors' className='text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-muted'>
            Sponsors & funders
          </h3>
          <ul className='mt-5 grid sm:grid-cols-2'>
            {institutionalSupportContent.sponsors.map((sponsor) => (
              <OrganizationCard key={sponsor.name} organization={sponsor} />
            ))}
          </ul>
          <p className='mt-8 max-w-3xl text-sm leading-6 text-slate-600'>
            {institutionalSupportContent.sponsorNote}
          </p>
        </section>
      </div>
    </div>
  </section>
)

export default InstitutionalSupport
