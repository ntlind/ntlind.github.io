import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Carousel from './components/Carousel'
import Benefits from './components/Benefits'
import Steps from './components/Steps'
import Team from './components/Team'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'

function App() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past viewport height
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      
      if (scrollPosition > viewportHeight && !hasScrolled) {
        setHasScrolled(true)
      } else if (scrollPosition <= viewportHeight && hasScrolled) {
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
        <Benefits />
        <Steps />
        <CallToAction />
        <Team />
      </main>
      <Footer />
    </div>
  )
}

export default App

