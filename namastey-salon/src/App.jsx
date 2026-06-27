import { lazy, Suspense } from 'react'
import useScrollReveal from './hooks/useScrollReveal'

// Layout — always needed immediately
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Hero loads eagerly — it's the LCP element
import Hero from './components/sections/Hero'

// Everything below the fold is lazy-loaded
const About    = lazy(() => import('./components/sections/About'))
const Services = lazy(() => import('./components/sections/Services'))
const WhyUs    = lazy(() => import('./components/sections/WhyUs'))
const Gallery  = lazy(() => import('./components/sections/Gallery'))
const Reviews  = lazy(() => import('./components/sections/Reviews'))
const Booking  = lazy(() => import('./components/sections/Booking'))
const Location = lazy(() => import('./components/sections/Location'))

// Minimal section-level skeleton while lazy chunks load
function SectionSkeleton() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-luxury-black">
      <div
        className="w-8 h-8 rounded-full border-2 border-gold/20 border-t-gold animate-spin"
        aria-hidden="true"
      />
    </div>
  )
}

export default function App() {
  useScrollReveal()

  return (
    <div className="bg-luxury-black">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <WhyUs />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Reviews />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Booking />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Location />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
