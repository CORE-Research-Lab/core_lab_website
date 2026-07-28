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
    <section className='relative isolate overflow-hidden bg-linear-to-b from-brand-soft to-white'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -right-24 -top-32 -z-10 size-[28rem] rounded-full bg-brand/5 blur-3xl'
      />
      <div className='page-shell py-16 sm:py-20 lg:py-28'>
        <p className='text-sm font-semibold uppercase tracking-[0.18em] text-brand-muted'>
          University of Toronto - McMaster University
        </p>
        <h1 className='mt-4 text-display font-bold text-brand-dark'>
          {heroContent.title}
        </h1>
        <p className='mt-6 text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9'>
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
        <div className='mt-9 flex flex-wrap gap-3'>
          {heroContent.actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                actionClasses[action.variant] || actionClasses.secondary
              }`}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
