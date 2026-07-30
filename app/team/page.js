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
    className='group block'
  >
    <Image
      src={person.image}
      alt=''
      aria-hidden='true'
      className={`w-full bg-[#e8e8e3] object-cover object-center grayscale transition-[filter] group-hover:grayscale-0 ${
        featured ? 'aspect-[4/5]' : compact ? 'aspect-square' : 'aspect-[4/5]'
      }`}
      sizes={
        featured
          ? '(max-width: 1024px) 100vw, 620px'
          : compact
            ? '(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 280px'
            : '(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 380px'
      }
    />
    <div className='mt-4 min-w-0 border-t border-black/20 pt-3'>
      <h3 className={`font-semibold text-brand-dark transition-colors group-hover:text-brand ${
        featured ? 'font-editorial text-2xl sm:text-3xl' : compact ? 'text-sm' : 'text-lg'
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
    <div className={`mt-8 grid gap-x-6 gap-y-12 ${
      featured
        ? 'sm:grid-cols-2 xl:grid-cols-3'
        : compact
          ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
          : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    }`}>
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
        eyebrow='CORE Lab / People'
        title='Our Team'
        description='Directors, current students, and frequent collaborators from the University of Toronto and partner institutions.'
      />
      <div className='page-shell grid items-start gap-x-12 pb-24 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-x-20'>
        <SectionNav sections={navSections} />
        <div className='min-w-0 space-y-24 pt-12 lg:pt-0'>
          {memberGroups.map((group) => (
            <section key={group.id}>
              <SectionHeading id={group.id}>{group.title}</SectionHeading>
              {group.groups ? (
                <div className='space-y-20'>
                  {group.groups.map((subgroup) => (
                    <section key={subgroup.id}>
                      <SubsectionHeading id={subgroup.id} className='border-t border-black/15 pt-5'>
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
