import Image from 'next/image';
import Link from 'next/link'
import { memberGroups } from '@/data/members';

const MemberCard = ({ person, compact = false }) => (
  <Link href={person.link} className="group block">
    <article className={`rounded-lg border border-slate-200 transition duration-200 hover:border-brand-muted hover:bg-slate-50 hover:shadow-sm ${compact ? 'px-4 py-4' : 'px-5 py-5'}`}>
      <div className="flex items-center">
        <div className={`${compact ? 'h-[72px] w-[72px]' : 'h-[96px] w-[96px]'} flex-shrink-0 overflow-hidden rounded-full bg-slate-100`}>
          <Image
            src={person.image}
            alt={person.name}
            className="h-full w-full object-cover object-center"
            sizes={compact ? '72px' : '96px'}
          />
        </div>
        <div className={`${compact ? 'ml-4' : 'ml-5'} min-w-0`}>
          <h3 className={`m-0 font-semibold text-brand-dark group-hover:underline ${compact ? 'text-sm' : ''}`}>{person.name}</h3>
          <p className={`m-0 text-slate-600 ${compact ? 'text-xs leading-5' : 'text-sm leading-6'}`}>{person.position}</p>
          {person.currentPosition && (
            <p className={`m-0 font-medium text-slate-700 ${compact ? 'text-xs leading-5' : 'text-sm leading-6'}`}>
              {person.currentPosition}
            </p>
          )}
        </div>
      </div>
    </article>
  </Link>
)

const MemberGrid = ({ people, compact = false, emptyText = 'This section is being updated.' }) => (
  people.length > 0 ? (
    <div className={`grid grid-cols-1 pt-4 lg:grid-cols-2 ${compact ? 'gap-3 xl:grid-cols-3' : 'gap-4'}`}>
      {people.map((person) => (
        <MemberCard compact={compact} person={person} key={person.link || person.name} />
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
                <MemberGrid compact={group.id === 'pastmembers'} people={subgroup.people} />
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
