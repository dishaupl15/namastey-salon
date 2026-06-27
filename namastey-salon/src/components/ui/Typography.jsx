import React from 'react'

export function DisplayXL({ children, className = '' }) {
  return (
    <h1 className={`font-display text-display-xl text-beige leading-[1.05] tracking-tight ${className}`}>
      {children}
    </h1>
  )
}

export function DisplayLG({ children, className = '' }) {
  return (
    <h2 className={`font-display text-display-lg text-beige leading-tight ${className}`}>
      {children}
    </h2>
  )
}

export function DisplayMD({ children, className = '' }) {
  return (
    <h3 className={`font-display text-display-md text-beige leading-snug ${className}`}>
      {children}
    </h3>
  )
}

export function Eyebrow({ children, className = '' }) {
  return (
    <span className={`section-eyebrow ${className}`}>{children}</span>
  )
}

export function GoldText({ children, className = '' }) {
  return (
    <span className={`gold-gradient-text ${className}`}>{children}</span>
  )
}

export function ShimmerText({ children, className = '' }) {
  return (
    <span className={`shimmer-text ${className}`}>{children}</span>
  )
}

export function BodyLG({ children, className = '' }) {
  return (
    <p className={`font-body text-lg text-beige/70 leading-relaxed tracking-wide ${className}`}>
      {children}
    </p>
  )
}

export function BodySM({ children, className = '' }) {
  return (
    <p className={`font-body text-sm text-beige/60 leading-relaxed tracking-wide ${className}`}>
      {children}
    </p>
  )
}

export function Label({ children, className = '' }) {
  return (
    <span className={`font-body text-xs text-gold/80 tracking-[0.2em] uppercase ${className}`}>
      {children}
    </span>
  )
}

export function Stars({ count = 5, className = '' }) {
  return (
    <div className={`stars ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? 'star' : 'star text-white/20'}>★</span>
      ))}
    </div>
  )
}
