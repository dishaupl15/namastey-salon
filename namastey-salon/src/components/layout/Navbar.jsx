import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Scissors } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Why Us',   href: '#why'      },
  { label: 'Gallery',  href: '#gallery'  },
  { label: 'Reviews',  href: '#reviews'  },
  { label: 'Location', href: '#location' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [activeLink,  setActiveLink]  = useState('')
  const [menuOpen,    setMenuOpen]    = useState(false)

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveLink(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-luxury-black/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center"
            >
              <Scissors size={14} className="text-gold" />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg tracking-[0.25em] text-beige group-hover:text-gold transition-colors duration-300">
                NAMASTEY
              </span>
              <span className="font-body text-[0.6rem] tracking-[0.4em] text-gold/70 uppercase">
                Salon · नमास्ते
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`nav-link ${activeLink === href.replace('#', '') ? 'active' : ''}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#booking"
              className="btn-gold px-6 py-2.5 text-[0.65rem]"
            >
              Book Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-beige hover:text-gold transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col bg-luxury-black/98 backdrop-blur-2xl pt-24 px-8 pb-10 md:hidden"
          >
            <ul className="flex flex-col gap-6 flex-1">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl text-beige/80 hover:text-gold transition-colors duration-300 tracking-wide block py-1"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="border-t border-white/10 pt-8">
              <a href="#booking" onClick={() => setMenuOpen(false)} className="btn-gold w-full justify-center">
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
