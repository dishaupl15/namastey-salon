import React from 'react'

/**
 * id        — anchor id for nav
 * eyebrow   — small label above title (e.g. "Our Story")
 * title     — main heading
 * subtitle  — paragraph below title
 * align     — 'left' | 'center'
 * dark      — alternate background
 * size      — 'default' | 'sm'
 */
export default function SectionWrapper({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
  size = 'default',
  children,
  className = '',
}) {
  const alignClass  = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  const bgClass     = dark ? 'bg-luxury-deep' : 'bg-luxury-black'
  const sizeClass   = size === 'sm' ? 'section-wrapper-sm' : 'section-wrapper'

  return (
    <section id={id} className={`${bgClass} ${sizeClass} ${className}`}>
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Section header */}
      {(eyebrow || title || subtitle) && (
        <div className={`relative z-10 flex flex-col ${alignClass} mb-16`}>
          {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
          {title && (
            <h2 className="section-title text-balance">
              {title}
            </h2>
          )}
          {(eyebrow || title) && (
            <div className={`gold-divider ${align === 'center' ? 'gold-divider-center' : ''}`} />
          )}
          {subtitle && (
            <p className={`section-subtitle ${align === 'center' ? 'text-center mx-auto' : ''}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Page content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}
