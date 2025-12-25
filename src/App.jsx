import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Carousel from './components/Carousel'
import Benefits from './components/Benefits'
import Steps from './components/Steps'
import Team from './components/Team'
import FAQ from './components/FAQ'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'

function App() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      
      if (scrollPosition > viewportHeight * 0.5 && !hasScrolled) {
        setHasScrolled(true)
      } else if (scrollPosition <= viewportHeight * 0.5 && hasScrolled) {
        setHasScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolled])

  return (
    <div 
      className={`min-h-screen transition-colors duration-500 ${
        hasScrolled ? 'bg-eggshell' : 'bg-dark'
      }`}
    >
      <Header isLightMode={!hasScrolled} />
      <main>
        <Hero isLightMode={!hasScrolled} />
        <Carousel />
        <Benefits isLightMode={!hasScrolled} />
        <Steps />
        <CallToAction />
        <Team />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App

