import Image from 'next/image';
import Link from 'next/link';
import { memberGroups } from '@/data/members';
import PageHeader from '@/Components/UI/PageHeader';
import SectionNav from '@/Components/UI/SectionNav';
import { SectionHeading, SubsectionHeading } from '@/Components/UI/SectionHeading';

export const metadata = {
  title: 'Team',
  description: 'Directors, current students, frequent collaborators, and past members of the CORE Lab.',
};

// Keep the client-side nav payload to ids and labels rather than shipping the
// full member data (photos included) across the server/client boundary.
const navSections = memberGroups.map((group) => ({
  id: group.id,
  label: group.navLabel || group.title,
  children: group.groups?.map((subgroup) => ({
    id: subgroup.id,
    label: subgroup.navLabel || subgroup.title,
  })),
}));

const MemberCard = ({ person, compact = false, featured = false }) => (
  <Link
    href={person.link}
    className={`group flex items-center rounded-xl border border-slate-200 bg-white hover:border-brand-muted hover:bg-slate-50 ${
      featured ? 'gap-6 p-5 sm:gap-8 sm:p-8' : 'gap-4 p-4 sm:gap-5 sm:p-5'
    }`}
  >
    <Image
      src={person.image}
      alt=''
      aria-hidden='true'
      className={`${
        featured ? 'size-24 sm:size-36' : compact ? 'size-16' : 'size-20 sm:size-24'
      } shrink-0 rounded-full bg-slate-100 object-cover object-center`}
      sizes={featured ? '(max-width: 640px) 96px, 144px' : compact ? '64px' : '96px'}
    />
    <div className='min-w-0'>
      <h3 className={`font-semibold text-brand-dark group-hover:underline ${
        featured ? 'text-xl sm:text-2xl' : compact ? 'text-sm' : 'text-base'
      }`}>
        {person.name}
      </h3>
      <p className={`mt-1 text-slate-600 ${
        featured ? 'text-base leading-7' : compact ? 'text-xs leading-5' : 'text-sm leading-6'
      }`}>
        {person.position}
      </p>
      {person.currentPosition && (
        <p className={`font-medium text-slate-700 ${
          featured ? 'text-base leading-7' : compact ? 'text-xs leading-5' : 'text-sm leading-6'
        }`}>
          {person.currentPosition}
        </p>
      )}
    </div>
  </Link>
)

const MemberGrid = ({
  people,
  compact = false,
  featured = false,
  emptyText = 'This section is being updated.',
}) => (
  people.length > 0 ? (
    <div className={`mt-5 grid ${featured ? 'grid-cols-1 gap-5' : `gap-4 ${compact ? 'sm:grid-cols-2 xl:grid-cols-3' : 'xl:grid-cols-2'}`}`}>
      {people.map((person) => (
        <MemberCard
          compact={compact}
          featured={featured}
          person={person}
          key={person.link || person.name}
        />
      ))}
    </div>
  ) : (
    <p className='mt-5 text-slate-600'>{emptyText}</p>
  )
)

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title='Our Team'
        description='Directors, current students, and frequent collaborators from the University of Toronto and partner institutions.'
      />
      <div className='page-shell grid items-start gap-x-12 pb-16 lg:grid-cols-[14rem_minmax(0,1fr)]'>
        <SectionNav sections={navSections} />
        <div className='min-w-0 space-y-12 pt-8 lg:pt-0'>
          {memberGroups.map((group) => (
            <section key={group.id}>
              <SectionHeading id={group.id}>{group.title}</SectionHeading>
              {group.groups ? (
                <div className='space-y-8'>
                  {group.groups.map((subgroup) => (
                    <section key={subgroup.id}>
                      <SubsectionHeading id={subgroup.id} className='pt-6'>
                        {subgroup.title}
                      </SubsectionHeading>
                      <MemberGrid compact={group.id === 'pastmembers'} people={subgroup.people} />
                    </section>
                  ))}
                </div>
              ) : (
                <MemberGrid
                  featured={group.id === 'directors'}
                  people={group.people}
                  emptyText={group.id === 'pastmembers' ? 'This archive is being updated.' : undefined}
                />
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
