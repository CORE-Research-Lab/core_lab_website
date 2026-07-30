'use client'

import { useEffect, useMemo, useState } from 'react'

/**
 * In-page navigation for the long Team and Publications pages.
 *
 * Below `lg` it is a sticky, horizontally scrollable chip row — previously the
 * rail was `lg:block` only, so small screens had no section nav at all. From
 * `lg` up it becomes the sticky left rail.
 *
 * `sections` is a plain `[{ id, label, children? }]` list so pages can hand a
 * small serializable model to the client instead of their full content data.
 */
const SectionNav = ({ sections }) => {
  const ids = useMemo(
    () => sections.flatMap((section) => [section.id, ...(section.children?.map((child) => child.id) ?? [])]),
    [sections]
  )

  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (targets.length === 0) return

    // The last heading that has passed a line a quarter down the viewport wins.
    // Reads are coalesced into one animation frame per scroll burst, and only
    // run while scrolling, so this costs nothing at rest.
    let frame = 0
    const update = () => {
      frame = 0

      const line = window.innerHeight * 0.25
      const passed = targets.filter((target) => target.getBoundingClientRect().top <= line)

      setActiveId((passed.at(-1) || targets[0]).id)
    }

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
    }
  }, [ids])

  // The rail marks the active entry with a left border, so every entry carries
  // one (transparent when inactive) to keep the text from shifting sideways.
  const railLinkClass = (id, isChild) =>
    [
      '-ml-px block border-l-2 text-sm',
      isChild ? 'py-1 pl-6 text-slate-500' : 'py-1.5 pl-4 font-medium',
      activeId === id
        ? 'border-brand text-brand'
        : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-brand',
    ].join(' ')

  const chipClass = (id) =>
    [
      'whitespace-nowrap border-b py-2 text-xs font-semibold uppercase tracking-[0.1em]',
      activeId === id
        ? 'border-brand text-brand'
        : 'border-transparent text-slate-600 hover:border-brand-muted hover:text-brand',
    ].join(' ')

  const flatSections = sections.flatMap((section) => [
    section,
    ...(section.children ?? []),
  ])

  // `min-w-0` on the nav is load-bearing: as a grid item it would otherwise
  // grow to fit the widest chip row rather than letting that row scroll,
  // dragging the whole page into horizontal scroll on phones and tablets.
  return (
    <nav
      aria-label='On this page'
      className='sticky top-header z-20 min-w-0 self-start lg:top-[calc(var(--spacing-header)+1.5rem)]'
    >
      {/* Compact chip row for phones and tablets. The negative margins let it
          bleed to the screen edges while the page keeps its gutters. */}
      <div className='-mx-6 border-b border-black/10 bg-[#f3f3f0]/90 backdrop-blur sm:-mx-10 lg:hidden'>
        <ul className='flex gap-6 overflow-x-auto px-6 py-3 [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden'>
          {flatSections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={activeId === section.id ? 'true' : undefined}
                className={chipClass(section.id)}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Left rail from lg up. */}
      <ul className='hidden max-h-[calc(100vh-var(--spacing-header)-3rem)] overflow-y-auto border-l border-black/15 lg:block'>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={activeId === section.id ? 'true' : undefined}
              className={railLinkClass(section.id, false)}
            >
              {section.label}
            </a>
            {section.children?.length > 0 && (
              <ul className='mb-1'>
                {section.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      aria-current={activeId === child.id ? 'true' : undefined}
                      className={railLinkClass(child.id, true)}
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SectionNav
