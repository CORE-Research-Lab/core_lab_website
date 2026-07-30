"use client"

import { useEffect, useState } from 'react'
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigationItems, siteBrand } from '@/data/navigation';
import { HiMenu, HiX } from 'react-icons/hi';

const isRouteActive = (pathname, href) => {
  if (href.startsWith('#')) return false
  if (href === '/') return pathname === '/'

  return pathname === href || pathname.startsWith(`${href}/`)
}

const Navbar = () => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(()=>{
    const handleScroll = () => setIsScrolled(window.scrollY > 8)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  },[])

  // Close the mobile menu on Escape and lock body scroll while it is open.
  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  // The scrim and drawer are siblings of <nav>, not children. The scrolled nav
  // uses backdrop-blur, and backdrop-filter makes an element the containing
  // block for its position:fixed descendants — nesting them would pin the
  // drawer to the 69px navbar instead of the viewport once you scroll.
  return (
    <>
      <nav
        className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
          isScrolled
            ? 'border-black/10 bg-[#f3f3f0]/90 backdrop-blur-md'
            : 'border-transparent bg-[#f3f3f0]'
        }`}
      >
        <div className='page-shell flex h-header items-center justify-between gap-4'>
          <Link href='/' className='flex shrink-0 items-center gap-2.5'>
            <Image
              src={siteBrand.logo}
              alt={`${siteBrand.name} logo`}
              width={36}
              height={36}
              className='size-9'
              priority
            />
            <span className='text-base font-semibold tracking-[-0.03em] text-brand-dark'>
              {siteBrand.name}
            </span>
          </Link>

          <ul className='nav-links hidden items-center gap-9 text-[0.72rem] font-semibold uppercase tracking-[0.12em] md:flex'>
            {navigationItems.map((item) => {
              const active = isRouteActive(pathname, item.href)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    data-active={active || undefined}
                    className={`transition-colors ${active ? 'text-brand' : 'text-[#303534] hover:text-brand'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <button
            type='button'
            className='-mr-2 p-2 text-slate-700 transition-colors hover:text-brand md:hidden'
            onClick={() => setIsMenuOpen(true)}
            aria-label='Open navigation menu'
            aria-expanded={isMenuOpen}
            aria-controls='mobile-menu'
          >
            <HiMenu className='size-6' aria-hidden='true'/>
          </button>
        </div>
      </nav>

      {/* mobile menu scrim */}
      <button
        type='button'
        tabIndex={isMenuOpen ? 0 : -1}
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-40 bg-slate-950/40 md:hidden ${
          isMenuOpen ? '' : 'hidden'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-label='Dismiss navigation menu'
      />

      <div
        id='mobile-menu'
        inert={!isMenuOpen}
        aria-hidden={!isMenuOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col bg-[#f3f3f0] shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex h-header shrink-0 items-center justify-between border-b border-black/10 pl-6 pr-4'>
          <span className='text-base font-semibold text-brand-dark'>{siteBrand.name}</span>
          <button
            type='button'
            className='p-2 text-slate-700 transition-colors hover:text-brand'
            onClick={() => setIsMenuOpen(false)}
            aria-label='Close navigation menu'
          >
            <HiX className='size-5' aria-hidden='true'/>
          </button>
        </div>
        <ul className='flex flex-col gap-1 overflow-y-auto p-4'>
          {navigationItems.map((item) => {
            const active = isRouteActive(pathname, item.href)

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`block border-b border-black/10 px-1 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-colors ${
                    active ? 'text-brand' : 'text-slate-700 hover:text-brand'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Navbar
