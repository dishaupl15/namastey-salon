import React from 'react'

/**
 * variant: 'glass' | 'glass-gold' | 'dark' | 'service' | 'stat' | 'review'
 */
export default function Card({ children, variant = 'glass', className = '', onClick }) {
  const variantClass = {
    glass:       'glass-card',
    'glass-gold': 'glass-card-gold',
    dark:        'glass-card-dark',
    service:     'service-card',
    stat:        'stat-card',
    review:      'review-card',
  }[variant]

  return (
    <div
      className={[variantClass, className].filter(Boolean).join(' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}
