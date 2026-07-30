import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'
import { heroContent } from '@/data/home'

const renderTagline = (tagline) => {
  const expansion = 'Computational Research and Education'
  const expansionStart = tagline.indexOf(expansion)

  if (expansionStart === -1) return tagline

  const underlineClass =
    'underline decoration-[0.07em] underline-offset-[0.12em]'

  return (
    <>
      {tagline.slice(0, expansionStart)}
      <span className={underlineClass}>Co</span>mputational{' '}
      <span className={underlineClass}>R</span>esearch and{' '}
      <span className={underlineClass}>E</span>ducation
      {tagline.slice(expansionStart + expansion.length)}
    </>
  )
}

const Hero = () => {
  return (
    <section className='min-h-[calc(100svh-var(--spacing-header))]'>
      <div className='page-shell flex min-h-[calc(100svh-var(--spacing-header))] flex-col py-10 sm:py-14'>
        <p className='text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brand-muted'>
          {heroContent.eyebrow}
        </p>
        <h1 className='mt-16 text-display font-editorial text-brand-dark sm:mt-20 lg:mt-24'>
          {heroContent.title}
        </h1>
        <div className='mt-auto grid gap-10 pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.32fr)] lg:items-end lg:gap-16'>
          <p className='max-w-[30ch] font-editorial text-[clamp(1.75rem,1.05rem+2.4vw,3.7rem)] leading-[1.03] tracking-[-0.035em] text-brand-dark'>
            {renderTagline(heroContent.tagline)}
          </p>
          <div className='flex flex-col border-t border-black/20'>
            {heroContent.actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className='group flex items-center justify-between border-b border-black/20 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark transition-colors hover:text-brand'
              >
                {action.label}
                <HiArrowRight className='size-4' aria-hidden='true' />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
