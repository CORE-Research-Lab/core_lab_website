"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { siteBrand } from '@/data/navigation'

// Clicking the footer logo "builds" the lab: a terminal popup types out a
// build log, and once the build succeeds rubber ducks fall down the screen.
// Every click restarts the log and drops another batch of ducks.
const TYPE_SPEED_MS = 22
const POPUP_LINGER_MS = 2500
const DUCK_COUNT = 30

const terminalLines = [
  '$ make core',
  'Compiling CORE Lab...',
  '✓ Build succeeded!',
  'Releasing the debugging ducks...',
]
const terminalText = terminalLines.join('\n')
// The ducks fall once the success line has finished typing.
const ducksAtLength = terminalLines.slice(0, 3).join('\n').length

const consoleArt = String.raw`
  ____ ___  ____  _____
 / ___/ _ \|  _ \| ____|
| |  | | | | |_) |  _|
| |__| |_| |  _ <| |___
 \____\___/|_| \_\_____|
`

// Strict mode runs effects twice in development; greet only once.
let hasGreetedConsole = false

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const randomBetween = (min, max) => min + Math.random() * (max - min)

const makeDucks = (batchId) =>
  Array.from({ length: DUCK_COUNT }, (_, index) => ({
    id: `${batchId}-${index}`,
    left: randomBetween(0, 96),
    size: randomBetween(28, 56),
    delay: randomBetween(0, 1),
    duration: randomBetween(3, 4.8),
    drift: randomBetween(-12, 12),
    spin: randomBetween(-200, 200),
    flip: Math.random() < 0.5,
  }))

const RubberDuck = ({ size, flip }) => (
  <svg
    viewBox='0 0 64 56'
    width={size}
    height={size * 0.875}
    style={flip ? { transform: 'scaleX(-1)' } : undefined}
    aria-hidden='true'
  >
    <path d='M8 30c0-5 4-8 10-8h16c4-9 10-14 18-12 7 2 10 9 7 15-2 4-5 6-8 7 4 3 6 7 5 11-1 8-10 12-24 12H22C13 55 8 48 8 40z' fill='#facc15' />
    <path d='M18 36c6 4 14 4 20-1' fill='none' stroke='#eab308' strokeWidth='3' strokeLinecap='round' />
    <path d='M58 20c4 0 6 2 6 4s-3 3-7 3' fill='#f97316' />
    <circle cx='49' cy='17' r='2.6' fill='#0f172a' />
  </svg>
)

const FooterEasterEgg = () => {
  const [typedLength, setTypedLength] = useState(0)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [ducks, setDucks] = useState([])
  const batchCount = useRef(0)
  // Typing timers are cancelled on every click; duck cleanup timers are not,
  // so earlier batches still finish falling.
  const typingTimers = useRef([])
  const duckTimers = useRef([])

  useEffect(() => {
    if (!hasGreetedConsole) {
      hasGreetedConsole = true
      console.log(
        `%c${consoleArt}`,
        'color:#0b3a72;font-family:monospace;font-weight:bold',
      )
      console.log(
        '%cPoking around under the hood? So do we!\nCurious about computing education research? Say hi and mention the secret word "quack": corelab.utm@utoronto.ca',
        'color:#0b3a72;font-size:13px',
      )
    }

    const typing = typingTimers.current
    const cleanup = duckTimers.current
    return () => [...typing, ...cleanup].forEach(clearTimeout)
  }, [])

  const dropDucks = () => {
    batchCount.current += 1
    const batchId = batchCount.current
    const batch = makeDucks(batchId)
    const longestMs = Math.max(...batch.map((duck) => duck.delay + duck.duration)) * 1000

    setDucks((current) => [...current, ...batch])
    duckTimers.current.push(
      setTimeout(() => {
        setDucks((current) => current.filter((duck) => !duck.id.startsWith(`${batchId}-`)))
      }, longestMs + 200),
    )
  }

  const handleLogoClick = () => {
    typingTimers.current.forEach(clearTimeout)
    typingTimers.current = []
    const later = (callback, delay) => typingTimers.current.push(setTimeout(callback, delay))

    setIsPopupOpen(true)

    // Reduced motion: print the whole build at once and skip the ducks.
    if (prefersReducedMotion()) {
      setTypedLength(terminalText.length)
      later(() => setIsPopupOpen(false), POPUP_LINGER_MS + 1000)
      return
    }

    setTypedLength(0)
    later(dropDucks, ducksAtLength * TYPE_SPEED_MS)
    for (let index = 1; index <= terminalText.length; index += 1) {
      later(() => setTypedLength(index), index * TYPE_SPEED_MS)
    }
    later(() => setIsPopupOpen(false), terminalText.length * TYPE_SPEED_MS + POPUP_LINGER_MS)
  }

  const isComplete = typedLength === terminalText.length

  return (
    <>
      <div className='inline-flex items-center gap-3'>
        {/* The logo is deliberately a plain, unstyled button: nothing hints
            that clicking it does anything. */}
        <button
          type='button'
          onClick={handleLogoClick}
          aria-label={`${siteBrand.name} logo`}
          className='cursor-default rounded-full'
        >
          <Image src={siteBrand.logo} alt='' width={52} height={52} />
        </button>
        <Link href='/' id='footer-lab' className='text-xl font-semibold text-white'>
          {siteBrand.name}
        </Link>
      </div>

      <div
        className={`pointer-events-none fixed bottom-4 right-4 z-60 w-[min(26rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-white/10 bg-slate-950/95 shadow-2xl transition-opacity duration-500 ${
          isPopupOpen ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden='true'
      >
        <div className='flex items-center gap-1.5 border-b border-white/10 px-3 py-2'>
          <span className='h-2.5 w-2.5 rounded-full bg-red-400' />
          <span className='h-2.5 w-2.5 rounded-full bg-amber-300' />
          <span className='h-2.5 w-2.5 rounded-full bg-emerald-400' />
          <span className='ml-2 font-mono text-xs text-slate-400'>core-lab — zsh</span>
        </div>
        <pre className='min-h-24 whitespace-pre-wrap px-4 py-3 font-mono text-xs leading-5 text-emerald-300'>
          {terminalText.slice(0, typedLength)}
          {!isComplete && <span className='text-slate-400'>▌</span>}
        </pre>
      </div>
      <p className='sr-only' aria-live='polite'>
        {isPopupOpen && isComplete ? terminalLines.slice(1).join(' ') : ''}
      </p>

      {ducks.length > 0 && (
        <div className='pointer-events-none fixed inset-0 z-50 overflow-hidden' aria-hidden='true'>
          {ducks.map((duck) => (
            <span
              key={duck.id}
              className='duck-fall absolute -top-16'
              style={{
                left: `${duck.left}%`,
                animationDelay: `${duck.delay}s`,
                animationDuration: `${duck.duration}s`,
                '--duck-drift': `${duck.drift}vw`,
                '--duck-spin': `${duck.spin}deg`,
              }}
            >
              <RubberDuck size={duck.size} flip={duck.flip} />
            </span>
          ))}
        </div>
      )}
    </>
  )
}

export default FooterEasterEgg
