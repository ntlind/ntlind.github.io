import { useState, useEffect } from 'react'

const benefits = [
  {
    id: 1,
    title: 'Works with your existing equipment.',
    description: 'Install our Edge Agent on your local network to detect events using your existing analog and IP cameras. We\'ll set it up for you for free, or send you a plug-and-play Raspberry Pi for a small fee.'
  },
  {
    id: 2,
    title: 'Set up intelligent alerts in plain English.',
    description: 'Just describe what you want to detect: "notify me when someone isn\'t wearing a safety vest" or "count trucks entering the loading dock." Our AI handles complex detections automatically. No coding required.'
  },
  {
    id: 3,
    title: 'Triggers actions and alerts in real-time.',
    description: 'Integrate with your existing communication tools (e.g., Slack, Twilio, MS Teams, etc.) to receive immediate notifications when an event is detected. Batch non-critical events into daily or weekly summaries to stay informed without being overwhelmed.'
  },
  {
    id: 4,
    title: 'Built with enterprise-grade security and compliance in mind.',
    description: 'Enterprise-grade security with zero compromises. Camera feeds stay on your local network—only event metadata reaches our HIPAA-compliant cloud.'
  }
]

function BenefitTile({ benefit, isHovered, onHover, onLeave }) {
  const [showText, setShowText] = useState(true)

  useEffect(() => {
    if (isHovered) {
      // Delay the state change to avoid synchronous setState in effect
      const fadeTimer = setTimeout(() => setShowText(false), 0)
      const showTimer = setTimeout(() => {
        setShowText(true)
      }, 350)
      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(showTimer)
      }
    } else {
      const resetTimer = setTimeout(() => setShowText(true), 0)
      return () => clearTimeout(resetTimer)
    }
  }, [isHovered])

  return (
    <div
      className={`
        bg-white rounded-10 p-6 md:p-8
        flex flex-col
        md:cursor-pointer
        h-full
      `}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transitionDelay: isHovered ? '0.05s' : '0s'
      }}
    >
      <div className="justify-end mb-4 hidden md:flex">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary flex items-center justify-center">
          <svg 
            className="w-5 h-5 md:w-8 md:h-8 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M17 13l-5 5m0 0l-5-5m5 5V6"
              transform="rotate(-45 12 12)"
            />
          </svg>
        </div>
      </div>

      <div className="flex-1" />

      <div
        className={`
          md:${showText 
            ? 'opacity-100 translate-y-0 transition-all duration-300' 
            : 'opacity-0 translate-y-4 transition-none'
          }
        `}
      >
        {/* Title */}
        <h3 className="text-heading text-dark">
          {benefit.title}
        </h3>

        {/* Description - shown on hover on desktop, always shown on mobile */}
        <div
          className={`
            mt-3 md:mt-0
            md:overflow-hidden md:transition-all md:duration-350
            ${isHovered ? 'md:max-h-48 md:mt-3' : 'md:max-h-0'}
          `}
        >
          <p className="text-body text-dark/70">
            {benefit.description}
          </p>
        </div>
      </div>
    </div>
  )
}

function Benefits({ isLightMode = false }) {
  const [hoveredId, setHoveredId] = useState(null)

  // Calculate flex values based on which tile is hovered
  const getFlexValue = (id) => {
    if (hoveredId === null) return 1
    return hoveredId === id ? 1.1 : 0.9
  }

  const getHeightValue = (rowIds) => {
    if (hoveredId === null) return '280px'
    if (rowIds.includes(hoveredId)) return '300px'
    return '260px'
  }

  return (
    <section id="benefits" className="page-container py-12 md:py-20 lg:py-28">
      <p className={`text-caption uppercase tracking-wider mb-6 md:mb-8 transition-colors duration-500 ${
        isLightMode ? 'text-white/70' : 'text-dark/60'
      }`}>
        Benefits
      </p>

      {/* Mobile: Stack vertically with no animations */}
      <div className="flex flex-col gap-4 md:hidden">
        {benefits.map(benefit => (
          <div key={benefit.id} className="h-auto">
            <BenefitTile
              benefit={benefit}
              isHovered={false}
              onHover={() => {}}
              onLeave={() => {}}
              position=""
            />
          </div>
        ))}
      </div>

      {/* Desktop: Keep the animated grid layout */}
      <div className="hidden md:flex flex-col gap-1">
        <div 
          className="flex gap-1"
          style={{ 
            height: getHeightValue([1, 2]),
            transition: 'height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: hoveredId ? '0.05s' : '0s'
          }}
        >
          <div 
            style={{ 
              flex: getFlexValue(1),
              transition: 'flex 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: hoveredId ? '0.05s' : '0s'
            }}
          >
            <BenefitTile
              benefit={benefits[0]}
              isHovered={hoveredId === 1}
              onHover={() => setHoveredId(1)}
              onLeave={() => setHoveredId(null)}
              position="top-left"
            />
          </div>
          <div 
            style={{ 
              flex: getFlexValue(2),
              transition: 'flex 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: hoveredId ? '0.05s' : '0s'
            }}
          >
            <BenefitTile
              benefit={benefits[1]}
              isHovered={hoveredId === 2}
              onHover={() => setHoveredId(2)}
              onLeave={() => setHoveredId(null)}
              position="top-right"
            />
          </div>
        </div>

        <div 
          className="flex gap-1"
          style={{ 
            height: getHeightValue([3, 4]),
            transition: 'height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: hoveredId ? '0.05s' : '0s'
          }}
        >
          <div 
            style={{ 
              flex: getFlexValue(3),
              transition: 'flex 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: hoveredId ? '0.05s' : '0s'
            }}
          >
            <BenefitTile
              benefit={benefits[2]}
              isHovered={hoveredId === 3}
              onHover={() => setHoveredId(3)}
              onLeave={() => setHoveredId(null)}
              position="bottom-left"
            />
          </div>
          <div 
            style={{ 
              flex: getFlexValue(4),
              transition: 'flex 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: hoveredId ? '0.05s' : '0s'
            }}
          >
            <BenefitTile
              benefit={benefits[3]}
              isHovered={hoveredId === 4}
              onHover={() => setHoveredId(4)}
              onLeave={() => setHoveredId(null)}
              position="bottom-right"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits
