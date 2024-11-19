'use client'

import Link from 'next/link'
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'About', href: '/about' },
  { name: 'Kurse', href: '/kurse' },
  { name: 'Blog', href: '/blog' },
]

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-dark/95 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.3)]' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-width">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-white font-bold text-xl tracking-wider group"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white hover:from-green-400 hover:to-green-600 transition-all duration-300">
              MUNICH<span className="text-green-400 group-hover:text-white transition-colors duration-300">GOLF</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="text-gray-300 hover:text-green-400 transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <button 
              onClick={scrollToContact}
              className="flex items-center px-6 py-2.5 text-white bg-dark/50 border border-green-500 hover:bg-green-500 font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] group"
            >
              <span className="group-hover:text-white transition-colors duration-300">Kontakt</span>
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark/95 backdrop-blur-md border-t border-gray-800"
          >
            <div className="container-width py-4 space-y-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="block text-gray-300 hover:text-green-400 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <button 
                  onClick={(e) => {
                    scrollToContact(e)
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex items-center px-6 py-2.5 text-white bg-dark/50 border border-green-500 hover:bg-green-500 font-medium rounded-lg transition-all duration-300 w-full justify-center"
                >
                  <span>Kontakt</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation
