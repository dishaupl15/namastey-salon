import React from 'react'

/**
 * variant: 'gold' | 'outline' | 'whatsapp' | 'ghost'
 * size:    'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  variant = 'gold',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  href,
  target,
  type = 'button',
  disabled = false,
}) {
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-[0.65rem]',
    md: '',         // handled by base class
    lg: 'px-12 py-5 text-sm',
  }

  const variantClass = {
    gold:      'btn-gold',
    outline:   'btn-outline-gold',
    whatsapp:  'btn-whatsapp',
    ghost:     'font-body text-xs tracking-[0.2em] uppercase text-beige/60 hover:text-gold transition-colors duration-300',
  }[variant]

  const classes = [
    variantClass,
    size !== 'md' ? sizeClasses[size] : '',
    disabled ? 'opacity-50 pointer-events-none' : '',
    className,
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </>
  )

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  )
}
