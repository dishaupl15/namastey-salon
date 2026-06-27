import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Clock, MapPin, Sparkles } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper'

const STATS = [
  { value: '7K+',  label: 'Happy Clients',    icon: <Sparkles size={16} /> },
  { value: '4.8★', label: 'Google Rating',    icon: <Award    size={16} /> },
  { value: '10+',  label: 'Years Experience', icon: <Clock    size={16} /> },
  { value: '1',    label: 'Premium Location', icon: <MapPin   size={16} /> },
]

const PILLARS = [
  { title: 'Expert Stylists',     desc: 'Trained professionals who understand your unique style and needs.' },
  { title: 'Premium Products',    desc: 'Only the finest, dermatologist-approved beauty brands in our salon.' },
  { title: 'Personalised Care',   desc: 'Every treatment is customised — no one-size-fits-all approach here.' },
  { title: 'Hygienic Standards',  desc: 'Strict sanitation protocols so you can relax with complete peace of mind.' },
]

/* ── Animated counter ──────────────────────── */
function StatCard({ stat, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/[0.07]
                 hover:border-gold/30 transition-all duration-400
                 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.12)]"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <span className="text-gold/70 mb-3">{stat.icon}</span>
      <span className="font-display text-4xl text-gold leading-none mb-1">{stat.value}</span>
      <span className="font-body text-[0.65rem] text-beige/45 tracking-[0.2em] uppercase mt-1">{stat.label}</span>
    </motion.div>
  )
}

export default function About() {
  const leftRef    = useRef(null)
  const leftInView = useInView(leftRef, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="about">
      {/* Gold orb */}
      <div aria-hidden className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)', filter: 'blur(70px)' }} />

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

        {/* ── Left — image collage ─────────────── */}
        <div ref={leftRef} className="relative h-[420px] sm:h-[500px] lg:h-[580px]">
          {/* Main image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-0 left-0 w-[72%] h-[75%] rounded-2xl overflow-hidden
                       shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
          >
            <img
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=700&q=80"
              alt="Namastey Salon interior"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/40 to-transparent" />
          </motion.div>

          {/* Accent image */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 40 }}
            animate={leftInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute bottom-0 right-0 w-[52%] h-[48%] rounded-2xl overflow-hidden
                       border-2 border-luxury-black shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            <img
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&q=80"
              alt="Expert stylist at work"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gold badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={leftInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.45, type: 'spring', stiffness: 200 }}
            className="absolute top-[68%] left-[60%] z-20 flex flex-col items-center justify-center
                       w-24 h-24 sm:w-28 sm:h-28 rounded-full text-luxury-black"
            style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #e2c97e 50%, #a07830 100%)',
                     boxShadow: '0 8px 32px rgba(201,168,76,0.4)' }}
          >
            <span className="font-display text-xl sm:text-2xl font-semibold leading-none">10+</span>
            <span className="font-body text-[0.5rem] sm:text-[0.55rem] tracking-[0.15em] uppercase mt-1 text-center leading-tight px-2">Years<br/>of Excellence</span>
          </motion.div>

          {/* Decorative dots grid */}
          <div aria-hidden className="absolute -bottom-4 -left-4 grid grid-cols-5 gap-1.5 opacity-20 hidden sm:grid">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-gold" />
            ))}
          </div>
        </div>

        {/* ── Right — copy ────────────────────── */}
        <div className="flex flex-col gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="section-eyebrow"
            >
              Our Story
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-display leading-tight text-beige mt-2"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}
            >
              Beauty Is Our{' '}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #c9a84c 0%, #e2c97e 50%, #a07830 100%)' }}>
                Passion
              </span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              viewport={{ once: true }}
              className="w-12 h-px bg-gold mt-6 mb-6 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="font-body text-base text-beige/60 leading-relaxed"
            >
              Namastey Salon is Kharghar's destination for premium beauty — a space where expert
              craft meets genuine care. We combine professional artistry with the warmth of
              personalised attention, so every visit feels like a retreat.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="font-body text-base text-beige/60 leading-relaxed mt-4"
            >
              From precision hair cuts to rejuvenating spa treatments, every service is delivered
              with premium products, hygienic standards and an eye for detail that sets us apart.
            </motion.p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                viewport={{ once: true }}
                className="flex gap-3 items-start"
              >
                <span className="mt-1 w-4 h-4 flex-shrink-0 rounded-full bg-gold/20 border border-gold/40
                                 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold block" />
                </span>
                <div>
                  <p className="font-body text-xs font-semibold text-beige/90 tracking-wide">{p.title}</p>
                  <p className="font-body text-xs text-beige/45 leading-relaxed mt-0.5">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            viewport={{ once: true }}
          >
            <a href="#booking" className="btn-gold px-10 py-4 text-xs">
              Book Your Visit
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Stats row ───────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24 relative z-10">
        {STATS.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>
    </SectionWrapper>
  )
}
