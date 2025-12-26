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
//   `text-primary`,
//   'text-accent2',
//   'text-accent3',
//   'text-accent4',
//   'text-accent5',
//   'text-accent6',
]

function Hero({ isLightMode = false }) {
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
    <section id="home" className="page-container py-12 md:py-20 lg:py-44">
      <div className="max-w-3xl">
        {/* Main headline */}
        <h1 className={`text-hero mb-6 transition-colors duration-500 ${
          isLightMode ? 'text-white' : 'text-dark'
        }`}>
          Turn any camera feed into
          <br />
          <span 
            //   Ensure the text always takes up two lines on mobile so that the components below aren't constantly shifting around when the text changes.
            className={`${colorClass} block md:inline-block transition-all duration-500 min-h-[2.5em] md:min-h-0 ${
              isAnimating 
                ? 'opacity-0 translate-y-[-20px]' 
                : 'opacity-100 translate-y-0'
            }`}
          >
            {rotatingTexts[currentIndex]}
          </span>
        </h1>

        <p className={`text-body max-w-xl transition-colors duration-500 ${
          isLightMode ? 'text-white/80' : 'text-dark/70'
        }`}>
          Automatically detect events and trigger workflows using your existing camera infrastructure - no code required.
        </p>
      </div>
    </section>
  )
}

export default Hero

