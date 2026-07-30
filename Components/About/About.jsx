import { aboutContent } from '@/data/home'
import { SectionHeading } from '@/Components/UI/SectionHeading'

const About = () => {
  return (
    <section className='page-shell py-20 sm:py-28 lg:py-36'>
      <div className='grid gap-10 lg:grid-cols-[minmax(10rem,0.3fr)_minmax(0,1fr)] lg:gap-20'>
        <SectionHeading id='about'>{aboutContent.title}</SectionHeading>
        <div>
          <div className='space-y-7 font-editorial text-[clamp(1.65rem,1.25rem+1.3vw,2.75rem)] leading-[1.14] tracking-[-0.025em] text-brand-dark'>
            {aboutContent.paragraphs.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {aboutContent.focusAreas?.length > 0 && (
            <div className='mt-16'>
              <h3 className='text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-muted'>
                Research areas
              </h3>
              <ul className='mt-5 grid sm:grid-cols-2 xl:grid-cols-3'>
                {aboutContent.focusAreas.map(area => (
                  <li
                    key={area}
                    className='border-t border-black/15 py-3 text-sm font-medium text-[#303534]'
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default About
