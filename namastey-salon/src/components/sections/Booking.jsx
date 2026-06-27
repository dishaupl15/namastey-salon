import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Phone, User, ChevronDown, CheckCircle, Sparkles } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper'

const SERVICES = [
  'Hair Cut',
  'Hair Color',
  'Hair Spa',
  'Hair Styling',
  'Facial',
  'Makeup',
  'Nail Art',
  'Waxing',
  'Relaxation Spa',
  'Bridal Package',
  'Other / Consultation',
]

const WHATSAPP_NUMBER = '919999999999'

function buildWhatsAppMsg({ name, phone, service, date }) {
  const d = date || 'flexible date'
  return encodeURIComponent(
    `Hi, I'd like to book an appointment at Namastey Salon.\n\n` +
    `Name: ${name || '—'}\nPhone: ${phone || '—'}\nService: ${service || '—'}\nPreferred Date: ${d}`
  )
}

/* ── Input wrapper ─────────────────────────────────────────── */
function Field({ label, icon, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 font-body text-[0.65rem] tracking-[0.2em] uppercase text-gold/70">
        <span className="text-gold/50">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  )
}

/* ── Success state ─────────────────────────────────────────── */
function SuccessState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-6 py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #c9a84c, #e2c97e)' }}
      >
        <CheckCircle size={36} className="text-luxury-black" />
      </motion.div>
      <div>
        <h3 className="font-display text-3xl text-beige mb-2">Request Sent!</h3>
        <p className="font-body text-sm text-beige/50 leading-relaxed max-w-xs">
          We'll confirm your appointment via WhatsApp or call shortly. See you soon!
        </p>
      </div>
      <button onClick={onReset} className="btn-outline-gold px-8 py-3 text-xs mt-2">
        Book Another
      </button>
    </motion.div>
  )
}

/* ── Form ──────────────────────────────────────────────────── */
function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    setErrors(er => ({ ...er, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Please enter your name'
    if (!form.phone.trim())   e.phone   = 'Please enter your phone number'
    if (!form.service)        e.service = 'Please select a service'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  const whatsappHref =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMsg(form)}`

  if (submitted) return <SuccessState onReset={() => { setForm({ name:'',phone:'',service:'',date:'' }); setSubmitted(false) }} />

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

      {/* Name + Phone — side by side on md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Your Name" icon={<User size={12} />}>
          <input
            type="text"
            placeholder="Priya Sharma"
            value={form.name}
            onChange={set('name')}
            className={`input-luxury ${errors.name ? 'border-red-500/60' : ''}`}
          />
          {errors.name && <p className="font-body text-[0.6rem] text-red-400 tracking-wide">{errors.name}</p>}
        </Field>

        <Field label="Phone Number" icon={<Phone size={12} />}>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={set('phone')}
            className={`input-luxury ${errors.phone ? 'border-red-500/60' : ''}`}
          />
          {errors.phone && <p className="font-body text-[0.6rem] text-red-400 tracking-wide">{errors.phone}</p>}
        </Field>
      </div>

      {/* Service */}
      <Field label="Select Service" icon={<Sparkles size={12} />}>
        <div className="relative">
          <select
            value={form.service}
            onChange={set('service')}
            className={`input-luxury appearance-none pr-10 cursor-pointer ${errors.service ? 'border-red-500/60' : ''}`}
          >
            <option value="" disabled>Choose a service…</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/40 pointer-events-none" />
        </div>
        {errors.service && <p className="font-body text-[0.6rem] text-red-400 tracking-wide">{errors.service}</p>}
      </Field>

      {/* Date */}
      <Field label="Preferred Date" icon={<Calendar size={12} />}>
        <input
          type="date"
          value={form.date}
          onChange={set('date')}
          min={new Date().toISOString().split('T')[0]}
          className="input-luxury [color-scheme:dark] cursor-pointer"
        />
      </Field>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <button type="submit" className="btn-gold flex-1 py-4 text-xs">
          <Calendar size={14} />
          Confirm Appointment
        </button>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp flex-1 py-4 text-xs"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Book via WhatsApp
        </a>
      </div>

      <p className="font-body text-[0.6rem] text-beige/25 tracking-wide text-center">
        We'll confirm within 30 minutes · Open 7 days · Till 10 PM
      </p>
    </form>
  )
}

/* ─── Section ──────────────────────────────────────────────── */
export default function Booking() {
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="booking" className="relative overflow-hidden bg-luxury-black">

      {/* ── Full-bleed CTA banner ──────────────── */}
      <div className="relative py-24 px-6 md:px-12 overflow-hidden">

        {/* Background photo + heavy overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=70"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-20"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.96) 0%, rgba(26,20,10,0.92) 100%)' }} />
        </div>

        {/* Gold orbs */}
        <div aria-hidden className="absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div aria-hidden className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', filter: 'blur(70px)' }} />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left — CTA copy ─────────────────── */}
          <div ref={headerRef}>
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-eyebrow"
            >
              Reserve Your Slot
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display leading-tight text-beige mt-3"
              style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)' }}
            >
              Book Your{' '}
              <span className="bg-clip-text text-transparent block"
                style={{ backgroundImage: 'linear-gradient(135deg, #c9a84c 0%, #e2c97e 50%, #a07830 100%)' }}>
                Appointment
              </span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }} animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="w-12 h-px bg-gold my-7 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-base text-beige/55 leading-relaxed max-w-md"
            >
              Fill in the form or message us directly on WhatsApp. We confirm within 30 minutes and look forward to welcoming you.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col gap-3 mt-10"
            >
              {[
                'Open 7 days a week',
                'Services till 10 PM',
                'Instant WhatsApp confirmation',
                'Walk-ins also welcome',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold block" />
                  </span>
                  <span className="font-body text-sm text-beige/60">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Quick WhatsApp pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20book%20an%20appointment%20at%20Namastey%20Salon`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-body text-xs tracking-[0.15em] uppercase font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
                style={{ background: 'linear-gradient(135deg, #25D366, #1ebe5d)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp Now
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </a>
            </motion.div>
          </div>

          {/* ── Right — form card ────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative rounded-3xl p-8 md:p-10"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(201,168,76,0.15)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.1)',
            }}
          >
            {/* Card top accent line */}
            <div className="absolute top-0 left-8 right-8 h-px rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }} />

            <div className="mb-8">
              <h3 className="font-display text-2xl text-beige">Book an Appointment</h3>
              <p className="font-body text-xs text-beige/40 tracking-wide mt-1">We'll get back to you within 30 minutes</p>
            </div>

            <BookingForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
