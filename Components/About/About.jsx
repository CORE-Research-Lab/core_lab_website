import { aboutContent } from '@/data/home'

const About = () => {
  return (
    <section className='mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:px-12'>
        <h2 className='border-b border-b-slate-200 pb-3 text-2xl font-semibold text-brand'>{aboutContent.title}</h2>
        <div className='space-y-4 pt-4 text-base leading-7 text-slate-700'>
            {aboutContent.paragraphs.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
        </div>
        {aboutContent.focusAreas?.length > 0 && (
          <div className='pt-6'>
            <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Research areas</h3>
            <ul className='mt-3 flex flex-wrap gap-2'>
              {aboutContent.focusAreas.map(area => (
                <li
                  key={area}
                  className='rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-sm font-medium text-brand'
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}
    </section>
  )
}

export default About
