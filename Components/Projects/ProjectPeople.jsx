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
      <ul className='mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {people.map((person) => (
          <li key={person.slug}>
            <Link
              href={person.link}
              className='group block h-full'
            >
              <Image
                src={person.image}
                alt=''
                aria-hidden='true'
                className='aspect-4/5 w-full bg-[#e8e8e3] object-cover object-center grayscale transition-[filter] group-hover:grayscale-0'
                sizes='(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 380px'
              />
              <span className='mt-4 block min-w-0 border-t border-black/20 pt-3'>
                <span className='block text-lg font-semibold text-brand-dark transition-colors group-hover:text-brand'>
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
  <div className='mt-6 space-y-8'>
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
