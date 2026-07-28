import { memberGroups } from '@/data/members';

const Sidebar = () => {
  return (
    <aside className='hidden w-56 shrink-0 py-5 pl-5 pr-5 lg:block lg:pl-12'>
        <nav className='sticky top-24 z-10 flex flex-col space-y-4 bg-white/80 backdrop-blur'>
            {memberGroups.map((group) => (
              <div className='border-b border-slate-200 pb-2' key={group.id}>
                <a
                  href={`#${group.id}`}
                  className='cursor-pointer text-brand-dark hover:text-brand'
                >
                  {group.navLabel || group.title}
                </a>
                {group.groups && (
                  <div className='mt-2 flex flex-col gap-2 border-l border-slate-200 pl-3 text-sm'>
                    {group.groups.map((subgroup) => (
                      <a
                        key={subgroup.id}
                        href={`#${subgroup.id}`}
                        className='cursor-pointer text-slate-600 hover:text-brand'
                      >
                        {subgroup.navLabel || subgroup.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </nav>
    </aside>
  )
}

export default Sidebar
