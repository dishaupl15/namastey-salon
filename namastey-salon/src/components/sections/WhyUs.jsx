import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Star, Scissors, Package, ShieldCheck } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper'

const REASONS = [
  {
    icon:  <Users size={28} />,
    value: '7,000+',
    title: 'Happy Customers',
    desc:  'Thousands of satisfied clients trust us for their beauty needs every month.',
    color: '#c9a84c',
  },
  {
    icon:  <Star size={28} />,
    value: '4.8 ★',
    title: 'Star Rated Salon',
    desc:  'Consistently rated 4.8 on Google — a reflection of quality you can count on.',
    color: '#e2c97e',
  },
  {
    icon:  <Scissors size={28} />,
    value: '10+',
    title: 'Expert Stylists',
    desc:  'Certified professionals with years of experience in hair, skin and beauty.',
    color: '#c9a84c',
  },
  {
    icon:  <Package size={28} />,
    value: '100%',
    title: 'Premium Products',
    desc:  'We use only dermatologist-tested, salon-grade brands — nothing less.',
    color: '#e2c97e',
  },
  {
    icon:  <ShieldCheck size={28} />,
    value: '✓',
    title: 'Hygienic Environment',
    desc:  'Hospital-grade sanitation after every client. Your safety is non-negotiable.',
    color: '#c9a84c',
  },
]

function ReasonCard({ item, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex flex-col gap-5 p-8 rounded-2xl overflow-hidden
                 border border-white/[0.07] hover:border-gold/35
                 transition-all duration-500
                 hover:-translate-y-2 hover:shadow-[0_16px_50px_rgba(201,168,76,0.14)]
                 cursor-default"
      style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}
    >
      {/* Hover shine */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${item.color}18 0%, transparent 70%)` }} />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0
                   transition-transform duration-400 group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${item.color}18 0%, ${item.color}08 100%)`,
          border: `1px solid ${item.color}30`,
          color: item.color,
        }}
      >
        {item.icon}
      </div>

      {/* Value */}
      <div>
        <span
          className="font-display text-4xl leading-none block mb-1"
          style={{ color: item.color }}
        >
          {item.value}
        </span>
        <h3 className="font-body font-semibold text-sm text-beige/90 tracking-wide group-hover:text-beige transition-colors duration-300">
          {item.title}
        </h3>
      </div>

      {/* Divider line — expands on hover */}
      <div className="w-8 h-px group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        style={{ background: item.color, opacity: 0.4 }} />

      {/* Description */}
      <p className="font-body text-sm text-beige/50 leading-relaxed">
        {item.desc}
      </p>
    </motion.div>
  )
}

export default function WhyUs() {
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="why">
      {/* Orb */}
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      {/* Header */}
      <div ref={headerRef} className="text-center mb-20 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-eyebrow"
        >
          Why We're Different
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display leading-tight text-beige"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
        >
          Why Choose{' '}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #c9a84c 0%, #e2c97e 50%, #a07830 100%)' }}>
            Namastey
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
          We set the bar for what a premium salon experience should feel like — every single visit.
        </motion.p>
      </div>

      {/* Cards — 3 + 2 centred layout */}
      <div className="relative z-10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.slice(0, 3).map((item, i) => (
            <ReasonCard key={item.title} item={item} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-2/3 lg:mx-auto">
          {REASONS.slice(3).map((item, i) => (
            <ReasonCard key={item.title} item={item} index={i + 3} />
          ))}
        </div>
      </div>

      {/* Bottom trust bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative z-10 mt-20 flex flex-wrap justify-center items-center gap-x-10 gap-y-4"
      >
        {['Premium Brands', 'Certified Stylists', 'Hygienic Space', 'Unisex Services', 'Open till 10 PM'].map((tag) => (
          <span key={tag} className="flex items-center gap-2 font-body text-xs text-beige/35 tracking-[0.18em] uppercase">
            <span className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0" />
            {tag}
          </span>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
