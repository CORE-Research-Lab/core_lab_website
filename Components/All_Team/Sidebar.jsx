import { memberGroups } from '@/data/members';

const Sidebar = () => {
  return (
    <aside className='hidden w-56 shrink-0 py-5 pl-5 pr-5 lg:block lg:pl-12'>
        <nav className='sticky top-24 z-10 flex flex-col space-y-4 bg-white/80 backdrop-blur'>
            {memberGroups.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className='cursor-pointer border-b border-slate-200 pb-2 text-brand-dark hover:text-brand'
              >
                {group.navLabel || group.title}
              </a>
            ))}
        </nav>
    </aside>
  )
}

export default Sidebar
