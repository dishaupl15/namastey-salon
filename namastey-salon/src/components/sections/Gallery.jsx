import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper'

/* ─── Images ───────────────────────────────────────────────── */
const IMAGES = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=70',
    alt: 'Luxury salon interior',
    category: 'Interior',
    span: 'row-span-2',   // tall card
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=70',
    alt: 'Expert hair styling session',
    category: 'Hair',
    span: '',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&q=70',
    alt: 'Premium facial treatment',
    category: 'Beauty',
    span: '',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=500&q=70',
    alt: 'Modern salon workstation',
    category: 'Interior',
    span: 'col-span-2',   // wide card
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500&q=70',
    alt: 'Hair color transformation',
    category: 'Hair',
    span: 'row-span-2',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=70',
    alt: 'Professional makeup artistry',
    category: 'Beauty',
    span: '',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=70',
    alt: 'Nail art & manicure',
    category: 'Beauty',
    span: '',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&q=70',
    alt: 'Happy client after styling',
    category: 'Experience',
    span: '',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&q=70',
    alt: 'Hair blow-dry finishing',
    category: 'Hair',
    span: '',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=70',
    alt: 'Relaxing head spa treatment',
    category: 'Experience',
    span: 'col-span-2',
  },
]

const FILTERS = ['All', 'Interior', 'Hair', 'Beauty', 'Experience']

/* ─── Lightbox ─────────────────────────────────────────────── */
function Lightbox({ image, onClose }) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          style={{ background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(20px)' }}
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center
                       border border-white/10 text-beige/60 hover:text-gold hover:border-gold/40
                       transition-all duration-300 z-10"
          >
            <X size={18} />
          </button>

          {/* Image */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden
                       shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover max-h-[85vh]"
            />
            {/* Caption bar */}
            <div className="absolute bottom-0 inset-x-0 px-6 py-5 flex items-center justify-between"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
            >
              <div>
                <p className="font-display text-lg text-beige">{image.alt}</p>
                <p className="font-body text-xs text-gold/70 tracking-widest uppercase mt-0.5">{image.category}</p>
              </div>
              <span className="px-3 py-1 rounded-full font-body text-[0.6rem] tracking-[0.2em] uppercase text-luxury-black"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #e2c97e)' }}>
                Namastey Salon
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Gallery item ─────────────────────────────────────────── */
function GalleryItem({ image, index, onClick }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: (index % 5) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${image.span}
                  border border-white/[0.06] hover:border-gold/30
                  transition-all duration-500 hover:shadow-[0_12px_40px_rgba(201,168,76,0.15)]`}
      style={{ minHeight: image.span === 'row-span-2' ? '420px' : '220px' }}
      onClick={() => onClick(image)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <motion.img
        src={image.thumb}
        alt={image.alt}
        loading="lazy"
        className="w-full h-full object-cover absolute inset-0"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-luxury-black/10 to-transparent" />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3"
        style={{ background: 'rgba(10,10,10,0.5)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          className="w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center text-gold"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: hovered ? 1 : 0.7, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <ZoomIn size={18} />
        </motion.div>
        <motion.p
          className="font-display text-lg text-beige tracking-wide"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
        >
          {image.alt}
        </motion.p>
      </motion.div>

      {/* Category tag — always visible */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 rounded-full font-body text-[0.58rem] tracking-[0.2em] uppercase text-beige/80"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {image.category}
        </span>
      </div>
    </motion.div>
  )
}

/* ─── Section ──────────────────────────────────────────────── */
export default function Gallery() {
  const [filter,    setFilter]    = useState('All')
  const [lightbox,  setLightbox]  = useState(null)

  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const filtered = filter === 'All'
    ? IMAGES
    : IMAGES.filter(img => img.category === filter)

  return (
    <>
      <SectionWrapper id="gallery" dark>
        {/* Orbs */}
        <div aria-hidden className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <div aria-hidden className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-eyebrow"
          >
            Our Work
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display leading-tight text-beige"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
          >
            The{' '}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #c9a84c 0%, #e2c97e 50%, #a07830 100%)' }}>
              Gallery
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
            A glimpse into the premium experience awaiting you at Namastey Salon.
          </motion.p>
        </div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-3 mb-12 relative z-10"
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-full font-body text-xs tracking-[0.2em] uppercase transition-all duration-300
                ${filter === f
                  ? 'text-luxury-black shadow-gold-sm'
                  : 'text-beige/50 border border-white/10 hover:border-white/20 hover:text-beige/80'
                }`}
              style={filter === f ? { background: 'linear-gradient(135deg, #c9a84c 0%, #e2c97e 50%, #a07830 100%)' } : {}}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]"
        >
          {filtered.map((img, i) => (
            <GalleryItem
              key={img.id}
              image={img}
              index={i}
              onClick={setLightbox}
            />
          ))}
        </motion.div>

        {/* Bottom tag */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-14 font-body text-xs text-beige/25 tracking-[0.3em] uppercase relative z-10"
        >
          All services performed at Namastey Salon · Kharghar, Panvel
        </motion.p>
      </SectionWrapper>

      {/* Lightbox portal — outside section so it overlays everything */}
      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
    </>
  )
}
