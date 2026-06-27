import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Scissors, Sparkles, Star } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper'

/* ─── Service data ─────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'hair',
    label: 'Hair',
    icon: <Scissors size={14} />,
    services: [
      {
        name: 'Hair Cut',
        desc: 'Precision cuts tailored to your face shape and lifestyle. Finished with a luxurious blow-dry.',
        price: '₹299 onwards',
        tag: 'Most Popular',
        img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=75',
        alt: 'Professional hair cutting service',
      },
      {
        name: 'Hair Color',
        desc: 'Full color, balayage, highlights or ombre — crafted with premium, damage-free color systems.',
        price: '₹799 onwards',
        tag: 'Trending',
        img: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=75',
        alt: 'Hair coloring service',
      },
      {
        name: 'Hair Spa',
        desc: 'Deep nourishment treatment to restore shine, strength and silkiness to damaged hair.',
        price: '₹499 onwards',
        tag: 'Recommended',
        img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=75',
        alt: 'Hair spa treatment',
      },
      {
        name: 'Hair Styling',
        desc: 'Party-ready blowouts, curls, waves or straight styles — perfect for every occasion.',
        price: '₹399 onwards',
        tag: null,
        img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=75',
        alt: 'Hair styling session',
      },
    ],
  },
  {
    id: 'beauty',
    label: 'Beauty',
    icon: <Sparkles size={14} />,
    services: [
      {
        name: 'Facial',
        desc: 'Customised facials using luxury skincare brands for glowing, healthy skin.',
        price: '₹599 onwards',
        tag: 'Best Seller',
        img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=75',
        alt: 'Facial treatment',
      },
      {
        name: 'Makeup',
        desc: 'Bridal, party or everyday makeup by expert artists using premium, long-lasting products.',
        price: '₹999 onwards',
        tag: 'Premium',
        img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=75',
        alt: 'Professional makeup application',
      },
      {
        name: 'Nail Art',
        desc: 'Manicure, pedicure and nail art with top gel brands. Designs from classic to creative.',
        price: '₹349 onwards',
        tag: 'Trending',
        img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=75',
        alt: 'Nail art service',
      },
      {
        name: 'Waxing',
        desc: 'Smooth, gentle waxing using Rica and other hypoallergenic premium waxes.',
        price: '₹199 onwards',
        tag: null,
        img: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=75',
        alt: 'Waxing service',
      },
    ],
  },
]

/* ─── Tab pill ─────────────────────────────────────────────── */
function TabPill({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-7 py-3 rounded-full font-body text-xs tracking-[0.2em] uppercase transition-all duration-300
        ${active
          ? 'text-luxury-black shadow-gold-sm'
          : 'text-beige/50 hover:text-beige border border-white/10 hover:border-white/20'
        }`}
      style={active ? {
        background: 'linear-gradient(135deg, #c9a84c 0%, #e2c97e 50%, #a07830 100%)',
      } : {}}
    >
      {icon}
      {label}
    </button>
  )
}

/* ─── Service card ─────────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex flex-col rounded-[1.25rem] overflow-hidden cursor-pointer
                 border border-white/[0.07] hover:border-gold/40
                 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(201,168,76,0.18)]"
      style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)' }}
    >
      {/* ── Card shine overlay on hover ──── */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-[1.25rem]"
        style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 50%)' }}
      />

      {/* ── Image ─────────────────────────── */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={service.img}
          alt={service.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                     group-hover:scale-110"
        />
        {/* image gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/20 to-transparent" />

        {/* Tag badge */}
        {service.tag && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full font-body text-[0.6rem] tracking-[0.2em] uppercase text-luxury-black font-semibold z-10"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e2c97e)' }}
          >
            {service.tag}
          </span>
        )}

        {/* Star rating */}
        <div className="absolute bottom-4 right-4 flex gap-0.5 z-10">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className="fill-gold text-gold" />
          ))}
        </div>
      </div>

      {/* ── Body ──────────────────────────── */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Name */}
        <h3 className="font-display text-2xl text-beige group-hover:text-gold transition-colors duration-300 leading-tight">
          {service.name}
        </h3>

        {/* Divider */}
        <div className="w-8 h-px bg-gold/40 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />

        {/* Description */}
        <p className="font-body text-sm text-beige/55 leading-relaxed flex-1">
          {service.desc}
        </p>

        {/* Price + CTA row */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <div>
            <p className="font-body text-[0.6rem] text-gold/50 tracking-[0.2em] uppercase mb-0.5">Starting from</p>
            <p className="font-display text-xl text-gold">{service.price}</p>
          </div>

          <a
            href="#booking"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full
                       font-body text-[0.65rem] tracking-[0.15em] uppercase font-semibold
                       border border-gold/30 text-gold
                       hover:bg-gold hover:text-luxury-black hover:border-gold
                       transition-all duration-300 group/btn"
          >
            <Calendar size={12} className="transition-transform duration-300 group-hover/btn:rotate-12" />
            Book
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Section ──────────────────────────────────────────────── */
export default function Services() {
  const [activeTab, setActiveTab] = useState('hair')
  const current = CATEGORIES.find(c => c.id === activeTab)

  const headerRef  = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <SectionWrapper
      id="services"
      dark
      className="relative"
    >
      {/* Gold orb accents */}
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* ── Section header ──────────────────── */}
      <div ref={headerRef} className="text-center mb-16 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-eyebrow"
        >
          What We Offer
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
            Services
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
          className="font-body text-sm text-beige/50 tracking-wide max-w-md mx-auto leading-relaxed"
        >
          Premium treatments tailored to you — using only the finest products for exceptional results.
        </motion.p>
      </div>

      {/* ── Category tabs ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="flex justify-center gap-3 mb-14 relative z-10"
      >
        {CATEGORIES.map(cat => (
          <TabPill
            key={cat.id}
            active={activeTab === cat.id}
            onClick={() => setActiveTab(cat.id)}
            icon={cat.icon}
            label={cat.label}
          />
        ))}
      </motion.div>

      {/* ── Cards grid ──────────────────────── */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
      >
        {current.services.map((svc, i) => (
          <ServiceCard key={svc.name} service={svc} index={i} />
        ))}
      </motion.div>

      {/* ── Bottom CTA ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-16 relative z-10"
      >
        <p className="font-body text-xs text-beige/30 tracking-[0.25em] uppercase mb-6">
          Can't find what you're looking for?
        </p>
        <a
          href="https://wa.me/919999999999?text=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20services"
          target="_blank" rel="noopener noreferrer"
          className="btn-outline-gold px-10 py-3.5 text-xs"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Ask on WhatsApp
        </a>
      </motion.div>
    </SectionWrapper>
  )
}
