import Link from 'next/link'
import { heroContent } from '@/data/home'

const Hero = () => {
  return (
    <section className="border-b border-slate-200 bg-brand-soft">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <p className="text-sm font-medium uppercase tracking-wide text-brand">
          {heroContent.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
          {heroContent.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
          {heroContent.tagline}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {heroContent.actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={
                action.variant === 'primary'
                  ? 'inline-flex items-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark'
                  : 'inline-flex items-center rounded-md border border-brand/30 bg-white px-5 py-2.5 text-sm font-semibold text-brand transition hover:border-brand hover:bg-white'
              }
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
