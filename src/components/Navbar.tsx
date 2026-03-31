'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from 'next-themes'

interface NavLink {
  href: string
  label: string
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#services', label: 'Services' },
    { href: '/#skills', label: 'Skills' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    { href: '/courses', label: 'Courses' },
  ]

  // Debug log to check theme changes
  useEffect(() => {
    if (mounted) {
      console.log('Current theme in Navbar:', theme)
    }
  }, [theme, mounted])

  // Determine which logo to show based on theme
  const logoSrc = mounted && theme === 'dark' 
    ? '/images/logowhite.png' 
    : '/images/logoblack.png'

  // Show loading state while mounting to prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-white dark:bg-brand-black/90 py-3">
        <div className="container-custom flex justify-between items-center">
          <div className="relative w-21 h-21">
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 dark:bg-brand-black/90 backdrop-blur-md shadow-lg py-3 border-b border-primary/20'
        : 'bg-transparent py-6'
    }`}>
      <div className="container-custom flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-21 h-21">
            <Image
              src={logoSrc}
              alt="Darlington Okorie Logo"
              fill
              className="object-contain transition-transform group-hover:scale-105"
              priority
              key={theme} // Force re-render when theme changes
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          ))}
          
          {/* View More Organizations Button */}
          <Link
            href="/organizations"
            className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 shadow-md font-medium"
          >
            View More Organizations
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-brand-black dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-brand-black/95 backdrop-blur-md shadow-lg border-b border-primary/20"
          >
            <div className="container-custom py-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* View More Organizations Button in Mobile Menu */}
              <Link
                href="/organizations"
                className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all text-center mt-2 font-medium"
                onClick={() => setIsOpen(false)}
              >
                View More Organizations
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}