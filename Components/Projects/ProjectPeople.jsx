import Image from 'next/image'
import Link from 'next/link'
import { SubsectionHeading } from '@/Components/UI/SectionHeading'

/**
 * `showInstitution` is what separates the two lists: lab members are all CORE,
 * so naming an institution beside each of them is noise, while a collaborator
 * is placed by the institution they come from.
 */
const PeopleGroup = ({ id, title, people, showInstitution = false }) => {
  if (people.length === 0) return null

  return (
    <section>
      <SubsectionHeading id={id}>{title}</SubsectionHeading>
      <ul className='mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {people.map((person) => (
          <li key={person.slug}>
            <Link
              href={person.link}
              className='group flex h-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-muted hover:bg-slate-50 sm:gap-5 sm:p-5'
            >
              <Image
                src={person.image}
                alt=''
                aria-hidden='true'
                className='size-20 shrink-0 rounded-full bg-slate-100 object-cover object-center sm:size-24'
                sizes='96px'
              />
              <span className='block min-w-0'>
                <span className='block text-base font-semibold text-brand-dark group-hover:underline'>
                  {person.name}
                </span>
                {/* Positions run long enough to clip mid-title, so they wrap
                    rather than truncate — `h-full` keeps the row even. */}
                <span className='mt-1 block text-sm leading-6 text-slate-600'>
                  {showInstitution ? person.institution : person.position}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

const ProjectPeople = ({ people }) => (
  <div className='mt-6 space-y-10'>
    <PeopleGroup id='core-lab' title='CORE Lab' people={people.core} />
    <PeopleGroup
      id='collaborators'
      title='Collaborators'
      people={people.collaborators}
      showInstitution
    />
  </div>
)

export default ProjectPeople
