import { HiExternalLink } from 'react-icons/hi'
import { otherTools, otherToolsSection } from '@/data/projects'
import { SectionHeading, SubsectionHeading } from '@/Components/UI/SectionHeading'

/**
 * Smaller systems without a page of their own: one line each, linking to the
 * paper that describes it.
 */
// Tool, description, and paper link, lined up with the project table above.
const columns = 'md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_8rem]'

const OtherTools = () => (
  <section className='mt-16'>
    <SectionHeading id='other-tools'>{otherToolsSection.title}</SectionHeading>
    <p className='mt-4 max-w-3xl text-base leading-7 text-slate-600'>
      {otherToolsSection.description}
    </p>

    {otherTools.map((group) => (
      <div key={group.title} className='mt-8'>
        <SubsectionHeading>{group.title}</SubsectionHeading>
        {/* The same table frame as the project list above, so the page
            reads as one system. */}
        <div className='mt-3 rounded-xl border border-slate-200 bg-white'>
          <div
            aria-hidden='true'
            className={`hidden gap-x-6 border-b border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid ${columns}`}
          >
            <span>Tool</span>
            <span>What it does</span>
            <span className='text-right'>Paper</span>
          </div>
          <ul className='divide-y divide-slate-200'>
            {group.items.map((tool) => (
              <li
                key={tool.name}
                className={`grid gap-x-6 gap-y-1 px-5 py-3 md:items-baseline ${columns}`}
              >
                <span className='text-base font-semibold text-brand-dark'>{tool.name}</span>
                <span className='text-sm leading-6 text-slate-600'>{tool.description}</span>
                <a
                  href={tool.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline md:justify-end'
                >
                  {tool.venue}
                  <HiExternalLink className='size-4 shrink-0' aria-hidden='true' />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </section>
)

export default OtherTools
