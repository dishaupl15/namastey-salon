import { useState, useRef } from 'react'
import { motion, useInView, useAnimationFrame } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper'

/* ─── Review data ──────────────────────────────────────────── */
const REVIEWS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Regular Client',
    avatar: 'PS',
    rating: 5,
    text: 'Best salon experience I\'ve ever had. The atmosphere is so luxurious and the staff made me feel completely pampered. My hair has never looked better!',
    service: 'Hair Color & Styling',
    date: 'June 2024',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    role: 'First-time Visit',
    avatar: 'RM',
    rating: 5,
    text: 'Walked in for a haircut and walked out feeling like a new person. Very clean, professional and the stylist really listened to what I wanted. Highly recommended.',
    service: 'Men\'s Hair Cut',
    date: 'May 2024',
  },
  {
    id: 3,
    name: 'Sneha Patil',
    role: 'Bridal Client',
    avatar: 'SP',
    rating: 5,
    text: 'They did my bridal makeup and I was absolutely stunned. The team is talented, patient, and genuinely cares about getting every detail perfect. Thank you Namastey Salon!',
    service: 'Bridal Makeup',
    date: 'April 2024',
  },
  {
    id: 4,
    name: 'Anjali Desai',
    role: 'Regular Client',
    avatar: 'AD',
    rating: 5,
    text: 'The facial here is next level. My skin was glowing for days after. They use such premium products and the ambiance makes the whole experience feel like a 5-star spa.',
    service: 'Luxury Facial',
    date: 'June 2024',
  },
  {
    id: 5,
    name: 'Vikram Nair',
    role: 'Monthly Visitor',
    avatar: 'VN',
    rating: 5,
    text: 'I\'ve tried many salons in Kharghar but Namastey stands apart. Consistent quality, super hygienic, and the staff is always warm and welcoming. My go-to salon now.',
    service: 'Hair Spa & Cut',
    date: 'May 2024',
  },
  {
    id: 6,
    name: 'Pooja Joshi',
    role: 'Regular Client',
    avatar: 'PJ',
    rating: 5,
    text: 'The nail art here is stunning. I always get compliments on my nails after every visit. The artists are creative and detail-oriented. Love this place!',
    service: 'Nail Art',
    date: 'June 2024',
  },
  {
    id: 7,
    name: 'Amit Kulkarni',
    role: 'First-time Visit',
    avatar: 'AK',
    rating: 5,
    text: 'Came in for a beard styling and hair cut. The experience was top-notch from start to finish. Clean, professional and reasonably priced for the quality you get.',
    service: 'Grooming Package',
    date: 'March 2024',
  },
  {
    id: 8,
    name: 'Divya Rao',
    role: 'Regular Client',
    avatar: 'DR',
    rating: 5,
    text: 'Staff is so friendly and the services are amazing. The hair spa literally transformed my dry damaged hair into silky smooth perfection. Absolutely worth every rupee.',
    service: 'Hair Spa',
    date: 'April 2024',
  },
]

/* ─── Star row ─────────────────────────────────────────────── */
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < count ? 'fill-gold text-gold' : 'fill-white/10 text-white/10'}
        />
      ))}
    </div>
  )
}

/* ─── Avatar initials bubble ───────────────────────────────── */
function Avatar({ initials, index }) {
  const colors = [
    ['#c9a84c', '#0a0a0a'],
    ['#e2c97e', '#111111'],
    ['#a07830', '#f5f0e8'],
  ]
  const [bg, fg] = colors[index % colors.length]
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center font-body font-semibold text-xs flex-shrink-0"
      style={{ background: `linear-gradient(135deg, ${bg}, ${bg}aa)`, color: fg, border: `1px solid ${bg}60` }}
    >
      {initials}
    </div>
  )
}

/* ─── Single review card ───────────────────────────────────── */
function ReviewCard({ review, index }) {
  return (
    <div
      className="relative flex flex-col gap-5 p-7 rounded-2xl flex-shrink-0 w-[320px] md:w-[360px]
                 border border-white/[0.07] hover:border-gold/25
                 transition-all duration-400 hover:-translate-y-1
                 hover:shadow-[0_12px_40px_rgba(201,168,76,0.1)]"
      style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}
    >
      {/* Quote icon */}
      <div className="absolute top-5 right-6 text-gold/10">
        <Quote size={40} />
      </div>

      {/* Stars */}
      <Stars count={review.rating} />

      {/* Review text */}
      <p className="font-body text-sm text-beige/65 leading-relaxed flex-1">
        "{review.text}"
      </p>

      {/* Service tag */}
      <span className="self-start px-3 py-1 rounded-full font-body text-[0.58rem] tracking-[0.18em] uppercase"
        style={{
          background: 'rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.2)',
          color: '#c9a84c',
        }}>
        {review.service}
      </span>

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.06]" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <Avatar initials={review.avatar} index={index} />
        <div className="flex-1 min-w-0">
          <p className="font-body font-semibold text-sm text-beige/90 tracking-wide truncate">{review.name}</p>
          <p className="font-body text-[0.65rem] text-beige/40 tracking-widest uppercase mt-0.5">{review.role}</p>
        </div>
        {/* Google G */}
        <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0 opacity-30" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>
    </div>
  )
}

/* ─── Auto-scrolling marquee track ─────────────────────────── */
function MarqueeTrack({ items, direction = 1, speed = 35 }) {
  const trackRef = useRef(null)
  const xRef     = useRef(0)
  const paused   = useRef(false)

  // Duplicate items so the loop is seamless
  const doubled = [...items, ...items]

  useAnimationFrame((_, delta) => {
    if (!trackRef.current || paused.current) return
    const el        = trackRef.current
    const cardW     = 376   // card width + gap
    const totalW    = cardW * items.length

    xRef.current -= (speed * direction * delta) / 1000
    // wrap around
    if (direction > 0 && xRef.current <= -totalW) xRef.current += totalW
    if (direction < 0 && xRef.current >= 0)        xRef.current -= totalW

    el.style.transform = `translateX(${xRef.current}px)`
  })

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => { paused.current = true  }}
      onMouseLeave={() => { paused.current = false }}
    >
      <div ref={trackRef} className="flex gap-4 will-change-transform">
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} index={i % items.length} />
        ))}
      </div>
    </div>
  )
}

/* ─── Section ──────────────────────────────────────────────── */
export default function Reviews() {
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  // Split reviews into two rows for alternating scroll
  const row1 = REVIEWS.slice(0, 4)
  const row2 = REVIEWS.slice(4)

  return (
    <SectionWrapper id="reviews" dark className="overflow-hidden !px-0 lg:!px-0">
      {/* Orbs */}
      <div aria-hidden className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)', filter: 'blur(70px)' }} />
      <div aria-hidden className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Header */}
      <div ref={headerRef} className="text-center mb-16 relative z-10 px-6 md:px-12 lg:px-24">
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-eyebrow"
        >
          Client Love
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display leading-tight text-beige"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
        >
          What Our{' '}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #c9a84c 0%, #e2c97e 50%, #a07830 100%)' }}>
            Clients Say
          </span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }} animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-14 h-px bg-gold mx-auto my-6 origin-left"
        />

        {/* Aggregate rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mt-2"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-gold text-gold" />
            ))}
          </div>
          <span className="font-display text-3xl text-gold">4.8</span>
          <span className="font-body text-xs text-beige/40 tracking-widest uppercase">Based on 2,000+ Reviews</span>
        </motion.div>
      </div>

      {/* ── Row 1 — scrolls left ─────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }} animate={headerInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="relative z-10 mb-4 pl-6"
      >
        <MarqueeTrack items={row1} direction={1} speed={32} />
      </motion.div>

      {/* ── Row 2 — scrolls right ────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }} animate={headerInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="relative z-10 pl-6"
      >
        <MarqueeTrack items={row2} direction={-1} speed={28} />
      </motion.div>

      {/* Edge fade masks */}
      <div aria-hidden className="absolute inset-y-0 left-0 w-24 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0d0d0d, transparent)' }} />
      <div aria-hidden className="absolute inset-y-0 right-0 w-24 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0d0d0d, transparent)' }} />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-16 relative z-10 px-6"
      >
        <p className="font-body text-xs text-beige/30 tracking-[0.25em] uppercase mb-6">
          Join 7,000+ happy clients
        </p>
        <a href="#booking" className="btn-gold px-12 py-4 text-xs">
          Book Your Experience
        </a>
      </motion.div>
    </SectionWrapper>
  )
}
