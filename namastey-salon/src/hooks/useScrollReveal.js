import { useEffect } from 'react'

/**
 * Adds the 'visible' class to any element with class 'reveal'
 * when it enters the viewport. Works with CSS animation utilities
 * defined in index.css (.reveal, .reveal-delay-1 … .reveal-delay-5)
 */
export default function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)  // animate once
          }
        })
      },
      { threshold: 0.12 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
