/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light:   '#e2c97e',
          dark:    '#a07830',
          muted:   'rgba(201,168,76,0.15)',
        },
        beige: {
          DEFAULT: '#f5f0e8',
          dark:    '#e8dfd0',
          muted:   'rgba(245,240,232,0.6)',
        },
        luxury: {
          black: '#0a0a0a',
          dark:  '#111111',
          card:  '#161616',
          deep:  '#0d0d0d',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body:    ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.2rem, 5vw, 5rem)', { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.6rem, 3vw, 3rem)', { lineHeight: '1.2' }],
      },
      spacing: {
        'section': '7rem',
        'section-sm': '4rem',
      },
      borderRadius: {
        'glass': '1.25rem',
        'pill':  '9999px',
      },
      boxShadow: {
        'gold-sm':  '0 0 15px rgba(201,168,76,0.25)',
        'gold-md':  '0 0 35px rgba(201,168,76,0.35)',
        'gold-lg':  '0 0 60px rgba(201,168,76,0.45)',
        'luxury':   '0 25px 60px rgba(0,0,0,0.6)',
        'card':     '0 8px 32px rgba(0,0,0,0.4)',
        'inset-gold': 'inset 0 1px 0 rgba(201,168,76,0.2)',
      },
      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #c9a84c 0%, #e2c97e 50%, #a07830 100%)',
        'gold-shimmer':     'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 50%, transparent 100%)',
        'luxury-gradient':  'linear-gradient(180deg, #0a0a0a 0%, #161616 100%)',
        'hero-overlay':     'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.85) 100%)',
        'card-shine':       'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)',
        'section-fade':     'linear-gradient(180deg, transparent, rgba(10,10,10,0.8))',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 9s ease-in-out infinite',
        'float-delay':  'float 6s ease-in-out 2s infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
        'fade-up':      'fadeUp 0.8s ease forwards',
        'fade-in':      'fadeIn 0.6s ease forwards',
        'glow-pulse':   'glowPulse 3s ease-in-out infinite',
        'spin-slow':    'spin 20s linear infinite',
        'scale-in':     'scaleIn 0.5s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-22px) rotate(3deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,168,76,0.2)' },
          '50%':      { boxShadow: '0 0 50px rgba(201,168,76,0.5)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
