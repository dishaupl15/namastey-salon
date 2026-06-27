import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Clock, Phone, Navigation } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper'

const INFO = [
  {
    icon: <MapPin size={18} />,
    label: 'Address',
    lines: ['1st Floor, The Pacific,', 'Shilp Chowk, Sector 13,', 'Kharghar, Panvel — Maharashtra'],
  },
  {
    icon: <Clock size={18} />,
    label: 'Opening Hours',
    lines: ['Monday – Sunday', 'Open till 10 PM'],
    highlight: 1,
  },
  {
    icon: <Phone size={18} />,
    label: 'Call / WhatsApp',
    lines: ['+91 99999 99999'],
    link: 'tel:+919999999999',
  },
]

export default function Location() {
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="location" dark>
      {/* Orb */}
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      {/* Header */}
      <div ref={headerRef} className="text-center mb-16 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-eyebrow"
        >
          Find Us
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display leading-tight text-beige"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
        >
          Our{' '}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #c9a84c 0%, #e2c97e 50%, #a07830 100%)' }}>
            Location
          </span>
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }} animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-14 h-px bg-gold mx-auto my-6 origin-left"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-sm text-beige/50 max-w-md mx-auto leading-relaxed"
        >
          Conveniently located in the heart of Kharghar, Navi Mumbai.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 relative z-10">

        {/* Map embed */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="lg:col-span-3 rounded-2xl overflow-hidden relative"
          style={{
            border: '1px solid rgba(201,168,76,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            minHeight: '400px',
          }}
        >
          {/* Google Maps embed — replace src with actual embed URL for production */}
          <iframe
            title="Namastey Salon Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.0!2d73.0706!3d19.0468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAyJzQ4LjUiTiA3M8KwMDQnMTQuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '400px', filter: 'grayscale(0.3) contrast(1.1)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Map overlay card */}
          <div
            className="absolute bottom-4 left-4 right-4 px-5 py-4 rounded-xl flex items-center gap-4"
            style={{
              background: 'rgba(10,10,10,0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(201,168,76,0.25)',
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e2c97e)' }}>
              <MapPin size={16} className="text-luxury-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body font-semibold text-sm text-beige truncate">Namastey Salon</p>
              <p className="font-body text-xs text-beige/50 truncate">The Pacific, Shilp Chowk, Kharghar</p>
            </div>
            <a
              href="https://maps.google.com/?q=Kharghar+Navi+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-[0.6rem] tracking-[0.15em] uppercase text-luxury-black font-semibold flex-shrink-0
                         transition-all duration-300 hover:shadow-gold-sm"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e2c97e)' }}
            >
              <Navigation size={11} />
              Directions
            </a>
          </div>
        </motion.div>

        {/* Info cards */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {INFO.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="flex gap-4 p-6 rounded-2xl border border-white/[0.07] hover:border-gold/25
                         transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.1)]"
              style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c' }}>
                {item.icon}
              </div>
              <div>
                <p className="font-body text-[0.6rem] text-gold/60 tracking-[0.25em] uppercase mb-2">{item.label}</p>
                {item.lines.map((line, j) => (
                  item.link && j === 0
                    ? <a key={j} href={item.link}
                        className="block font-body text-sm text-beige/70 hover:text-gold transition-colors duration-300 leading-relaxed">
                        {line}
                      </a>
                    : <p key={j}
                        className={`font-body text-sm leading-relaxed ${item.highlight === j ? 'text-gold font-medium' : 'text-beige/70'}`}>
                        {line}
                      </p>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Quick book CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 100%)',
              border: '1px solid rgba(201,168,76,0.2)',
            }}
          >
            <p className="font-display text-xl text-beige mb-1">Ready to visit?</p>
            <p className="font-body text-xs text-beige/45 tracking-wide mb-5">Walk-ins welcome · Open till 10 PM</p>
            <a href="#booking" className="btn-gold text-xs px-8 py-3">
              Book Appointment
            </a>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
