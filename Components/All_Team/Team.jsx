import Image from 'next/image';
import Link from 'next/link'
import { memberGroups } from '@/data/members';

const MemberCard = ({ person }) => (
  <Link href={person.link} className="group block">
    <article className="rounded-lg border border-slate-200 px-5 py-5 transition duration-200 hover:border-brand-muted hover:bg-slate-50 hover:shadow-sm">
      <div className="flex items-center">
        <div className="h-[96px] w-[96px] flex-shrink-0 overflow-hidden rounded-full bg-slate-100">
          <Image
            src={person.image}
            alt={person.name}
            className="h-full w-full object-cover object-center"
            sizes="96px"
          />
        </div>
        <div className="ml-5 min-w-0">
          <h3 className="m-0 font-semibold text-brand-dark group-hover:underline">{person.name}</h3>
          <p className="m-0 text-sm leading-6 text-slate-600">{person.position}</p>
          {person.currentPosition && (
            <p className="m-0 text-sm font-medium leading-6 text-slate-700">
              {person.currentPosition}
            </p>
          )}
        </div>
      </div>
    </article>
  </Link>
)

const MemberGrid = ({ people, emptyText = 'This section is being updated.' }) => (
  people.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-2">
      {people.map((person) => (
        <MemberCard person={person} key={person.link || person.name} />
      ))}
    </div>
  ) : (
    <p className="pt-4 text-slate-600">{emptyText}</p>
  )
)

const Members = () => {
  return (
    <div className='w-full px-5 pb-10 sm:px-8 lg:pr-12'>
      {memberGroups.map((group) => (
        <section className="scroll-mt-24" id={group.id} key={group.id}>
          <h2 className='border-b border-b-slate-200 pb-3 pt-10 text-2xl font-semibold text-brand'>{group.title}</h2>
          {group.groups ? (
            group.groups.map((subgroup) => (
              <section className="scroll-mt-24" id={subgroup.id} key={subgroup.id}>
                <h3 className="pt-7 text-xl font-semibold text-brand-dark">{subgroup.title}</h3>
                <MemberGrid people={subgroup.people} />
              </section>
            ))
          ) : (
            <MemberGrid
              people={group.people}
              emptyText={group.id === 'pastmembers' ? 'This archive is being updated.' : undefined}
            />
          )}
        </section>
      ))}
    </div>
  )
}

export default Members
