'use client'

import { useRef } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

/**
 * Pieces shared by the homepage photo album and the poster wall on the
 * publications page. Both move one item at a time at the reader's pace: no
 * autoplay, and quiet text controls under the object rather than arrows laid
 * over it.
 */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * A sideways swipe (touch) or drag (mouse) across an element: left goes
 * forward, right goes back. Mostly-vertical movement is left to the page
 * scroll. The click that ends a swipe is swallowed, so swiping across a link
 * does not also follow it. `from`, a selector, limits swipes to ones that
 * start inside a matching element.
 */
export const useSwipe = ({ onNext, onPrevious, threshold = 40, from }) => {
  const start = useRef(null)
  const swiped = useRef(false)

  return {
    onPointerDown: (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return
      if (from && !event.target.closest?.(from)) return
      start.current = { x: event.clientX, y: event.clientY }
      swiped.current = false
    },
    onPointerUp: (event) => {
      if (!start.current) return
      const dx = event.clientX - start.current.x
      const dy = event.clientY - start.current.y
      start.current = null
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.5) return
      swiped.current = true
      if (dx < 0) onNext()
      else onPrevious()
    },
    onPointerCancel: () => {
      start.current = null
    },
    onClickCapture: (event) => {
      if (!swiped.current) return
      swiped.current = false
      event.preventDefault()
      event.stopPropagation()
    },
  }
}

const tones = {
  light: {
    button: 'text-brand hover:text-brand-dark disabled:text-slate-300',
    label: 'text-slate-500',
  },
  dark: {
    button: 'text-white/85 hover:text-white disabled:text-white/30',
    label: 'text-white/70',
  },
}

const TurnButton = ({ onClick, disabled, label, className, children }) => (
  <button
    type='button'
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className={`inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-semibold underline-offset-4 hover:underline disabled:cursor-default disabled:no-underline ${className}`}
  >
    {children}
  </button>
)

/**
 * "‹ Previous   3 of 12   Next ›". The middle label is a polite live region,
 * so a screen reader hears where it landed after each turn.
 */
export const TurnControls = ({
  onPrevious,
  onNext,
  canPrevious = true,
  canNext = true,
  label,
  itemName,
  tone = 'light',
  className = '',
}) => {
  const colors = tones[tone]

  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-6 ${className}`}>
      <TurnButton
        onClick={onPrevious}
        disabled={!canPrevious}
        label={`Previous ${itemName}`}
        className={colors.button}
      >
        <HiChevronLeft className='size-4' aria-hidden='true' />
        Previous
      </TurnButton>
      <p
        className={`min-w-24 text-center font-serif text-sm italic tabular-nums ${colors.label}`}
        aria-live='polite'
      >
        {label}
      </p>
      <TurnButton
        onClick={onNext}
        disabled={!canNext}
        label={`Next ${itemName}`}
        className={colors.button}
      >
        Next
        <HiChevronRight className='size-4' aria-hidden='true' />
      </TurnButton>
    </div>
  )
}
