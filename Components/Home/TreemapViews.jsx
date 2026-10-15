'use client'

import { useState } from 'react'

/**
 * The publications treemap with a switch between its views (by venue, by
 * field). Each view arrives already rendered on the server; this only holds
 * which one is showing, and swaps the caption with it.
 */
const TreemapViews = ({ title, views }) => {
  const [activeKey, setActiveKey] = useState(views[0].key)
  const active = views.find(view => view.key === activeKey) || views[0]

  return (
    <>
      <div className='flex flex-wrap items-center justify-between gap-x-4 gap-y-2'>
        <h2 className='text-base font-semibold text-brand-dark'>{title}</h2>
        <div
          role='group'
          aria-label='Group publications by'
          className='inline-flex rounded-lg border border-brand/20 bg-white p-0.5 shadow-sm'
        >
          {views.map(view => (
            <button
              key={view.key}
              type='button'
              aria-pressed={view.key === active.key}
              onClick={() => setActiveKey(view.key)}
              className={`rounded-md px-3 py-1 text-sm font-semibold transition-colors ${
                view.key === active.key
                  ? 'bg-brand text-white'
                  : 'text-brand hover:bg-brand-soft'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>
      <p className='mt-1 text-sm text-slate-500'>{active.caption}</p>
      <div className='mt-3'>{active.content}</div>
    </>
  )
}

export default TreemapViews
