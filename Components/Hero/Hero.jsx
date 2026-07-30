import Link from 'next/link'
import { heroContent } from '@/data/home'

const acronymInitialLengths = {
  Computational: 2,
  Research: 1,
  Education: 1,
}

const actionClasses = {
  primary:
    'bg-brand text-white shadow-sm hover:bg-brand-dark',
  secondary:
    'border border-brand/25 bg-white text-brand hover:border-brand hover:bg-brand-soft',
}

const Hero = () => {
  // No bottom border here: the gradient already fades into the page
  // background, so a rule on top of it just reads as a seam.
  return (
    <section className='bg-linear-to-b from-brand-soft to-white'>
      <div className='page-shell py-10 sm:py-12 lg:py-14'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted sm:text-sm'>
          {heroContent.eyebrow}
        </p>
        {/* Title left, copy right: the wide shell would otherwise leave the
            right half empty and push the fold far down the page. */}
        <div className='mt-4 grid gap-6 lg:mt-5 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-center lg:gap-12'>
          {/* -ml-px cancels the left side bearing of the display "C", which is
              ~2px at this size and otherwise indents the title relative to the
              eyebrow above it. */}
          <h1 className='-ml-px text-display font-bold text-brand-dark'>
            {heroContent.title}
          </h1>
          <div className='lg:border-l lg:border-brand-line lg:pl-12'>
            <p className='max-w-2xl text-lg leading-8 text-slate-700'>
              {heroContent.tagline
                .split(/(Computational|Research|Education)/)
                .map((part, index) => {
                  const initialLength = acronymInitialLengths[part]

                  if (!initialLength) {
                    return part
                  }

                  return (
                    <span key={`${part}-${index}`}>
                      <span className='underline decoration-brand-muted decoration-2 underline-offset-4'>
                        {part.slice(0, initialLength)}
                      </span>
                      {part.slice(initialLength)}
                    </span>
                  )
                })}
            </p>
            <div className='mt-6 flex flex-wrap gap-3'>
              {heroContent.actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                    actionClasses[action.variant] || actionClasses.secondary
                  }`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
