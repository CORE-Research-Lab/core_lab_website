import { labCultureContent } from '@/data/home'
import { SubsectionHeading } from '@/Components/UI/SectionHeading'

/** How the lab trains and works together, closing the About section. */
const LabCulture = () => (
  <section className='page-shell pb-14 sm:pb-16' aria-labelledby='how-we-work'>
    <SubsectionHeading id='how-we-work'>{labCultureContent.title}</SubsectionHeading>
    <div className='mt-4 space-y-4 text-lg leading-8 text-slate-700'>
      {labCultureContent.paragraphs.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  </section>
)

export default LabCulture
