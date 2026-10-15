import { HiExternalLink } from 'react-icons/hi'
import { otherTools, otherToolsSection } from '@/data/projects'
import { SectionHeading, SubsectionHeading } from '@/Components/UI/SectionHeading'

/**
 * Smaller systems without a page of their own: one line each, linking to the
 * paper that describes it.
 */
const OtherTools = () => (
  <section className='mt-16'>
    <SectionHeading id='other-tools'>{otherToolsSection.title}</SectionHeading>
    <p className='mt-4 max-w-3xl text-base leading-7 text-slate-600'>
      {otherToolsSection.description}
    </p>

    {otherTools.map((group) => (
      <div key={group.title} className='mt-8'>
        <SubsectionHeading>{group.title}</SubsectionHeading>
        <ul className='mt-3 divide-y divide-slate-200 border-y border-slate-200'>
          {group.items.map((tool) => (
            <li
              key={tool.name}
              className='grid gap-x-6 gap-y-1 py-3 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] sm:items-baseline'
            >
              <span className='font-semibold text-brand-dark'>{tool.name}</span>
              <span className='text-base leading-7 text-slate-600'>{tool.description}</span>
              <a
                href={tool.href}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline'
              >
                {tool.venue}
                <HiExternalLink className='size-4 shrink-0' aria-hidden='true' />
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </section>
)

export default OtherTools
