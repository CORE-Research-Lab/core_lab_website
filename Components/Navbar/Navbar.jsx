"use client"

import { useEffect, useState } from 'react'
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'
import { navigationItems, siteBrand } from '@/data/navigation';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(()=>{
    const handleScroll = () => setIsScroll(window.scrollY > 30)

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

  return (
    <nav className={`sticky top-0 z-30 border-b border-slate-200 transition-colors duration-300 ease-in-out ${isScroll ? "bg-white/95 shadow-sm backdrop-blur" : "bg-white"}`}>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-12'>
            <div className='flex items-center gap-3'>
              <a
                href={siteBrand.affiliation.href}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center transition hover:opacity-80'
                aria-label={siteBrand.affiliation.name}
              >
                <Image
                  src={siteBrand.affiliation.logo}
                  alt={siteBrand.affiliation.name}
                  className='h-9 w-auto'
                  priority
                />
              </a>
              <span aria-hidden='true' className='h-8 w-px bg-slate-300' />
              <Link href="/" className='flex items-center gap-2'>
                <Image src={siteBrand.logo} alt={`${siteBrand.name} logo`} width={44} height={44} priority/>
                <span className='hidden text-lg font-semibold text-brand-dark sm:inline'>{siteBrand.name}</span>
              </Link>
            </div>

            <ul className='hidden items-center gap-9 text-sm font-medium text-slate-700 md:flex nav-links'>
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className='transition-colors hover:text-brand'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className='block rounded-md p-2 transition hover:bg-slate-100 md:hidden'
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
                <HiMenu className='h-6 w-6' aria-hidden="true"/>
            </button>
      </div>

      {/* mobile menu overlay */}
      {isMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Dismiss navigation menu"
        />
      )}

      <ul
        id="mobile-menu"
        inert={!isMenuOpen}
        aria-hidden={!isMenuOpen}
        className={`fixed bottom-0 top-0 z-50 flex h-screen w-64 flex-col gap-4 bg-white px-8 py-20 text-slate-800 shadow-xl transition-transform duration-300 md:hidden ${isMenuOpen ? 'right-0 translate-x-0' : 'right-0 translate-x-full'}`}
      >
          <button
            type="button"
            className='absolute right-6 top-6 rounded-md p-2 transition hover:bg-slate-100'
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation menu"
          >
              <HiX className='h-5 w-5' aria-hidden="true"/>
          </button>
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className='block py-1 font-medium transition-colors hover:text-brand' onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default Navbar
