import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Clock, Phone, Instagram, Mail, Scissors, ArrowUp } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About Us',   href: '#about'    },
  { label: 'Services',   href: '#services' },
  { label: 'Why Us',     href: '#why'      },
  { label: 'Gallery',    href: '#gallery'  },
  { label: 'Reviews',    href: '#reviews'  },
  { label: 'Book Now',   href: '#booking'  },
  { label: 'Location',   href: '#location' },
]

const SERVICES = [
  'Hair Cut', 'Hair Color', 'Hair Spa',
  'Facial', 'Makeup', 'Nail Art',
  'Waxing', 'Bridal Package',
]

const WHATSAPP = '919999999999'
const PHONE    = '+91 99999 99999'
const INSTA    = 'https://instagram.com/namastey.salon'

/* ── Social icon button ───────────────────────────────────── */
function SocialBtn({ href, label, children, color }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10
                 text-beige/50 transition-all duration-300 hover:scale-110 hover:border-transparent"
      style={{ '--hover-bg': color }}
      onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = '#0a0a0a' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '' }}
    >
      {children}
    </a>
  )
}

/* ── Column fade-up ───────────────────────────────────────── */
function Col({ children, delay = 0, className = '' }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative bg-[#080808] overflow-hidden">

      {/* ── Top gold line ────────────────────── */}
      <div className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #c9a84c 30%, #e2c97e 50%, #c9a84c 70%, transparent 100%)' }} />

      {/* ── Ambient orbs ─────────────────────── */}
      <div aria-hidden className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div aria-hidden className="absolute top-0 right-0 w-[350px] h-[250px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* ── Main grid ────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* Brand column */}
          <Col delay={0} className="lg:col-span-1">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center
                              transition-all duration-300 group-hover:border-gold group-hover:shadow-gold-sm"
                style={{ background: 'rgba(201,168,76,0.08)' }}>
                <Scissors size={15} className="text-gold" />
              </div>
              <div className="leading-none">
                <span className="block font-display text-xl tracking-[0.2em] text-beige group-hover:text-gold transition-colors duration-300">
                  NAMASTEY
                </span>
                <span className="block font-body text-[0.55rem] tracking-[0.4em] text-gold/60 uppercase mt-0.5">
                  Salon · नमास्ते
                </span>
              </div>
            </a>

            <p className="font-body text-sm text-beige/45 leading-relaxed mb-8">
              Premium Hair, Beauty & Spa services in Kharghar. Where every visit feels like a luxury retreat.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              <SocialBtn href={INSTA} label="Instagram" color="#E1306C">
                <Instagram size={16} />
              </SocialBtn>

              <SocialBtn href={`https://wa.me/${WHATSAPP}`} label="WhatsApp" color="#25D366">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </SocialBtn>

              <SocialBtn href={`tel:${PHONE.replace(/\s/g, '')}`} label="Call us" color="#c9a84c">
                <Phone size={16} />
              </SocialBtn>

              <SocialBtn href="mailto:hello@namasteysalon.in" label="Email us" color="#c9a84c">
                <Mail size={16} />
              </SocialBtn>
            </div>
          </Col>

          {/* Quick links */}
          <Col delay={0.1}>
            <h4 className="font-body text-xs text-gold/70 tracking-[0.3em] uppercase mb-7">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="group flex items-center gap-2 font-body text-sm text-beige/45 hover:text-gold transition-colors duration-300"
                  >
                    <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Services */}
          <Col delay={0.2}>
            <h4 className="font-body text-xs text-gold/70 tracking-[0.3em] uppercase mb-7">Our Services</h4>
            <ul className="flex flex-col gap-3">
              {SERVICES.map(s => (
                <li key={s}>
                  <a
                    href="#services"
                    className="group flex items-center gap-2 font-body text-sm text-beige/45 hover:text-gold transition-colors duration-300"
                  >
                    <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-4" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact & Hours */}
          <Col delay={0.3}>
            <h4 className="font-body text-xs text-gold/70 tracking-[0.3em] uppercase mb-7">Visit Us</h4>

            <div className="flex flex-col gap-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <MapPin size={14} className="text-gold" />
                </div>
                <div>
                  <p className="font-body text-xs text-gold/70 tracking-widest uppercase mb-1">Address</p>
                  <p className="font-body text-sm text-beige/55 leading-relaxed">
                    1st Floor, The Pacific,<br />
                    Shilp Chowk, Sector 13,<br />
                    Kharghar, Panvel<br />
                    Maharashtra
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <Clock size={14} className="text-gold" />
                </div>
                <div>
                  <p className="font-body text-xs text-gold/70 tracking-widest uppercase mb-1">Hours</p>
                  <p className="font-body text-sm text-beige/55">Mon – Sun</p>
                  <p className="font-body text-sm text-gold font-medium">Open till 10 PM</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <Phone size={14} className="text-gold" />
                </div>
                <div>
                  <p className="font-body text-xs text-gold/70 tracking-widest uppercase mb-1">Call / WhatsApp</p>
                  <a href={`tel:${PHONE.replace(/\s/g,'')}`}
                    className="font-body text-sm text-beige/55 hover:text-gold transition-colors duration-300">
                    {PHONE}
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </div>

        {/* ── Divider ───────────────────────────── */}
        <div className="mt-16 mb-8 h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        {/* ── Bottom bar ────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-beige/25 tracking-wide text-center sm:text-left">
            © {new Date().getFullYear()} Namastey Salon. All rights reserved. · Kharghar, Panvel, Maharashtra
          </p>

          <div className="flex items-center gap-6">
            <span className="font-body text-xs text-beige/25 tracking-widest uppercase">
              नमास्ते सलोन
            </span>
            {/* Back to top */}
            <motion.button
              onClick={scrollTop}
              aria-label="Back to top"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10
                         text-beige/40 hover:text-gold hover:border-gold/40 hover:shadow-gold-sm
                         transition-all duration-300"
            >
              <ArrowUp size={15} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
