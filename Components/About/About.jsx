import { aboutContent } from '@/data/home'
import { SectionHeading } from '@/Components/UI/SectionHeading'

const About = () => {
  return (
    <section className='page-shell py-14 sm:py-16'>
      <SectionHeading id='about'>{aboutContent.title}</SectionHeading>
      <div className='mt-5 space-y-4 text-lg leading-8 text-slate-700'>
        {aboutContent.paragraphs.map(paragraph => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {aboutContent.focusAreas?.length > 0 && (
        <div className='mt-8'>
          <h3 className='text-sm font-semibold uppercase tracking-[0.14em] text-slate-500'>
            Research areas
          </h3>
          <ul className='mt-4 flex flex-wrap gap-2'>
            {aboutContent.focusAreas.map(area => (
              <li
                key={area}
                className='rounded-full border border-brand/15 bg-brand-soft px-3.5 py-1.5 text-sm font-medium text-brand'
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
