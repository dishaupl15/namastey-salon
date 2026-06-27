import { useEffect, useRef, lazy, Suspense, Fragment } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Sparkles, ChevronDown } from 'lucide-react'

// Lazy-load the heavy Three.js canvas — keeps initial bundle small
const HeroScene = lazy(() => import('../three/HeroScene'))

/* ── Floating glass stat cards ──────────────── */
const FLOAT_CARDS = [
  { id: 1, label: '4.8★  Rating',  sub: '2,000+ Reviews',  icon: '⭐', pos: 'top-[20%] left-[2%] lg:left-[4%]',   delay: 0,   dur: 7 },
  { id: 2, label: '7,000+ Clients', sub: 'Happy Customers', icon: '💎', pos: 'top-[22%] right-[2%] lg:right-[5%]', delay: 1.2, dur: 8 },
  { id: 3, label: 'Premium',        sub: 'Products Used',   icon: '✨', pos: 'bottom-[30%] left-[2%] lg:left-[4%]',delay: 2.1, dur: 6.5 },
]

/* ── Particle canvas ────────────────────────── */
function ParticleCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.22, vy: -(Math.random() * 0.35 + 0.08),
      life: Math.random(), decay: Math.random() * 0.003 + 0.001,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay
        if (p.life <= 0 || p.y < -10) {
          p.x = Math.random() * canvas.width; p.y = canvas.height + 10
          p.life = Math.random() * 0.8 + 0.2
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${Math.min(p.life, 0.65)})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 pointer-events-none z-10" aria-hidden="true" />
}

/* ── Framer variants ────────────────────────── */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.5 } } }
const fadeUp  = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] } } }
const fadeIn  = { hidden: { opacity: 0 },         show: { opacity: 1,      transition: { duration: 0.7, ease: 'easeOut' } } }

/* ── Hero ───────────────────────────────────── */
export default function Hero() {
  // Shared mouse position ref — avoids React re-renders
  const mouse = useRef([0, 0])

  useEffect(() => {
    const onMove = (e) => {
      // Normalise to [-1, 1] range
      mouse.current = [
        (e.clientX / window.innerWidth  - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ]
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* ── Photo background ───────────────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1800&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/70 via-luxury-black/50 to-luxury-black/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/60 via-transparent to-luxury-black/60" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-luxury-black to-transparent" />
      </div>

      {/* ── Gold ambient glows ─────────────────── */}
      <div aria-hidden="true" className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', filter: 'blur(70px)' }} />
      <div aria-hidden="true" className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)', filter: 'blur(55px)' }} />

      {/* ── Particle dust ──────────────────────── */}
      <ParticleCanvas />

      {/* ── 3D canvas — lazy loaded, sits behind text ─── */}
      <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroScene mouse={mouse} />
        </Suspense>
      </div>

      {/* ── Floating stat cards ────────────────── */}
      {FLOAT_CARDS.map(c => (
        <motion.div
          key={c.id}
          className={`absolute ${c.pos} z-30 hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl select-none`}
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(201,168,76,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: c.delay + 1.4, duration: 0.6 },
            scale:   { delay: c.delay + 1.4, duration: 0.6 },
            y:       { delay: c.delay, duration: c.dur, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <span className="text-2xl">{c.icon}</span>
          <div>
            <p className="font-body font-semibold text-xs text-beige tracking-wide">{c.label}</p>
            <p className="font-body text-[0.6rem] text-gold/70 tracking-widest uppercase">{c.sub}</p>
          </div>
        </motion.div>
      ))}

      {/* ── Main content ───────────────────────── */}
      <motion.div
        variants={stagger} initial="hidden" animate="show"
        className="relative z-40 text-center px-6 md:px-12 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Badge */}
        <motion.div variants={fadeIn} className="mb-8">
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-body text-[0.65rem] text-gold tracking-[0.3em] uppercase"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}
          >
            <Sparkles size={11} />
            Premium Unisex Salon · Kharghar
            <Sparkles size={11} />
          </span>
        </motion.div>

        {/* Hindi */}
        <motion.p variants={fadeUp} className="font-display italic text-gold/60 text-xl md:text-2xl tracking-widest mb-1">
          नमास्ते सलोन
        </motion.p>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="font-display leading-[1.04] tracking-tight text-beige mb-4"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 7.5rem)' }}
        >
          Namastey{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #c9a84c 0%, #e2c97e 45%, #a07830 100%)' }}
          >
            Salon
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p variants={fadeUp} className="font-display italic text-beige/65 text-xl md:text-2xl lg:text-3xl tracking-wide mb-2">
          Where Beauty Meets Elegance
        </motion.p>

        <motion.div variants={fadeIn} className="w-14 h-px bg-gold mx-auto my-5 opacity-60" />

        <motion.p variants={fadeUp} className="font-body text-sm text-beige/45 tracking-[0.22em] uppercase mb-10">
          Premium Hair · Beauty · Spa Services
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-center">
          <a href="#booking" className="btn-gold px-10 py-4 text-xs">
            <Calendar size={14} />
            Book Appointment
          </a>
          <a
            href="https://wa.me/919999999999?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Namastey%20Salon"
            target="_blank" rel="noopener noreferrer"
            className="btn-whatsapp px-10 py-4 text-xs"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Booking
          </a>
        </motion.div>

        {/* Service tags */}
        <motion.div variants={fadeIn} className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-beige/25 font-body text-xs tracking-widest uppercase">
          {['Hair', 'Beauty', 'Spa', 'Nails', 'Makeup'].map((s, i, a) => (
            <Fragment key={s}>
              <span>{s}</span>
              {i < a.length - 1 && <span className="w-1 h-1 rounded-full bg-gold/30" />}
            </Fragment>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ─────────────────────────── */}
      <motion.button
        aria-label="Scroll down"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 0.8 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-body text-[0.6rem] text-beige/30 tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} className="text-gold/45" />
        </motion.div>
      </motion.button>
    </section>
  )
}
