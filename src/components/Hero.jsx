import { useState, useEffect } from 'react'

const rotatingTexts = [
  'real-time Slack messages',
  'weekly email summaries',
  'webhook calls',
  'database entries',
  'timely text messages',
]

const rotatingColors = [
  'text-accent', 
  `text-primary`,
  'text-accent2',
  'text-accent3',
  'text-accent4',
  'text-accent5',
  'text-accent6',
]

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      
      // After fade out completes, change text and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % rotatingTexts.length)
        setIsAnimating(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Cycle through colors independently
  const colorClass = rotatingColors[currentIndex % rotatingColors.length]

  return (
    <section className="page-container py-12 md:py-20 lg:py-44">
      <div className="max-w-3xl">
        {/* Main headline */}
        <h1 className="text-hero text-dark mb-6">
          Turn any camera feed into
          <br />
          <span 
            className={`${colorClass} inline-block transition-all duration-500 ${
              isAnimating 
                ? 'opacity-0 translate-y-[-20px]' 
                : 'opacity-100 translate-y-0'
            }`}
          >
            {rotatingTexts[currentIndex]}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-body text-dark/70 max-w-xl">
          Framewave connects to your existing camera infrastructure
          to convert on-screen events into workflows and automations.
        </p>
      </div>
    </section>
  )
}

export default Hero

