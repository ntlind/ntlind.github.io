import { useMemo, useState, useRef, useCallback, useEffect } from 'react'

// Dynamically import all carousel media files
const carouselFiles = import.meta.glob('/public/carousel/*', { query: '?url', import: 'default' })

// Process the imported files to create carousel items
const carouselItems = Object.keys(carouselFiles).map(path => {
  const fileName = path.split('/').pop()
  const fileExt = fileName.split('.').pop().toLowerCase()
  
  // Determine if it's a video or image
  const videoExtensions = ['mov', 'mp4', 'webm', 'ogg']
  const isVideo = videoExtensions.includes(fileExt)
  
  // Create caption from filename (remove extension and format)
  const caption = fileName
    .replace(/\.(mov|mp4|webm|ogg|png|jpg|jpeg|webp|gif)$/i, '')
    .replace(/([A-Z])/g, ' $1')
    .trim() + '.'
  
  return {
    file: fileName,
    type: isVideo ? 'video' : 'image',
    caption: caption
  }
})

function CarouselCard({ item, isActive, cardId }) {
  const basePath = import.meta.env.BASE_URL
  const isVideo = item.type === 'video'
  
  // All cards same height, videos are wider, images are narrower
  const cardClasses = isVideo 
    ? 'w-80 md:w-[600px] h-60 md:h-[450px] flex-shrink-0' 
    : 'w-48 md:w-[300px] h-60 md:h-[450px] flex-shrink-0'

  return (
    <div 
      data-card-id={cardId}
      className={`card group relative ${cardClasses} bg-transparent overflow-hidden cursor-pointer
        transition-all duration-300 ease-out select-none
        ${isActive 
          ? 'scale-[1.08] z-20 shadow-2xl shadow-accent/30 ring-2 ring-accent/50' 
          : 'scale-100 z-10 hover:scale-[1.02]'
        }`}
    >
      {/* Media */}
      {isVideo ? (
        <video
          src={`${basePath}carousel/${encodeURIComponent(item.file)}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={`${basePath}carousel/${encodeURIComponent(item.file)}`}
          alt={item.caption}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      )}
      
      {/* Overlay - brightens on active instead of darkening */}
      <div className={`absolute inset-0 transition-all duration-300 pointer-events-none
        ${isActive 
          ? 'bg-gradient-to-b from-black/40 via-transparent to-transparent' 
          : 'bg-gradient-to-b from-black/80 via-black/5 to-transparent'
        }`} 
      />
      
      {/* Caption overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10">
        <p className={`text-xl text-white leading-snug transition-all duration-300
          ${isActive ? 'whitespace-normal overflow-visible' : ''}`}>
          {item.caption}
        </p>
      </div>
      
      {/* Active glow effect */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none animate-pulse-subtle">
          <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent" />
        </div>
      )}
    </div>
  )
}

// Threshold in pixels to distinguish a hold from a drag
const DRAG_THRESHOLD = 8
// Auto-scroll speed in pixels per second
const SCROLL_SPEED = 50

function CarouselRow({ items, direction, rowId }) {
  const [activeCard, setActiveCard] = useState(null)
  const [interactionState, setInteractionState] = useState('idle') // 'idle' | 'pending' | 'dragging'
  const [position, setPosition] = useState(null) // null = needs initialization
  const rowRef = useRef(null)
  const animationRef = useRef(null)
  const lastTimeRef = useRef(null)
  const interactionRef = useRef({
    startX: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    targetCardId: null,
  })

  // Find which card element was clicked
  const findCardId = (target) => {
    const cardEl = target.closest('[data-card-id]')
    return cardEl ? cardEl.dataset.cardId : null
  }

  // Get total width for wrapping
  const getHalfWidth = useCallback(() => {
    if (rowRef.current) {
      return rowRef.current.scrollWidth / 2
    }
    return 0
  }, [])

  // Auto-scroll animation loop
  useEffect(() => {
    const animate = (timestamp) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp
      }
      
      const deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp
      
      const halfWidth = getHalfWidth()
      
      // Initialize position based on direction
      setPosition(prev => {
        if (prev === null && halfWidth > 0) {
          // Left carousel starts at 0, right carousel starts at -halfWidth
          return direction === 'left' ? 0 : -halfWidth
        }
        
        // Only auto-scroll when idle (not holding or dragging)
        if (interactionState !== 'idle' || prev === null) return prev
        
        const scrollAmount = (SCROLL_SPEED * deltaTime) / 1000
        const delta = direction === 'left' ? -scrollAmount : scrollAmount
        
        let newPos = prev + delta
        // Wrap around seamlessly
        if (newPos <= -halfWidth) {
          newPos += halfWidth
        } else if (newPos >= 0) {
          newPos -= halfWidth
        }
        return newPos
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [interactionState, direction, getHalfWidth])

  const handleStart = useCallback((clientX, target) => {
    interactionRef.current = {
      startX: clientX,
      lastX: clientX,
      lastTime: Date.now(),
      velocity: 0,
      targetCardId: findCardId(target),
    }
    setInteractionState('pending')
    
    // Immediately highlight if on a card
    if (interactionRef.current.targetCardId) {
      setActiveCard(interactionRef.current.targetCardId)
    }
  }, [])

  const handleMove = useCallback((clientX) => {
    if (interactionState === 'idle') return
    
    const { startX, lastX, lastTime } = interactionRef.current
    const totalMoved = Math.abs(clientX - startX)
    const now = Date.now()
    const dt = now - lastTime
    
    // Calculate velocity
    if (dt > 0) {
      interactionRef.current.velocity = (clientX - lastX) / dt
    }
    
    const delta = clientX - lastX
    interactionRef.current.lastX = clientX
    interactionRef.current.lastTime = now
    
    // Check if we've moved enough to switch to dragging
    if (interactionState === 'pending' && totalMoved > DRAG_THRESHOLD) {
      setInteractionState('dragging')
      setActiveCard(null) // Cancel card highlight when dragging
    }
    
    // Apply drag movement directly to position
    if (interactionState === 'dragging' || totalMoved > DRAG_THRESHOLD) {
      setPosition(prev => {
        if (prev === null) return prev
        const halfWidth = getHalfWidth()
        let newPos = prev + delta
        // Wrap around
        if (halfWidth > 0) {
          if (newPos <= -halfWidth) newPos += halfWidth
          if (newPos >= 0) newPos -= halfWidth
        }
        return newPos
      })
    }
  }, [interactionState])

  const handleEnd = useCallback(() => {
    if (interactionState === 'idle') return
    
    const { velocity } = interactionRef.current
    
    if (interactionState === 'dragging') {
      // Apply momentum then return to idle
      const momentum = velocity * 150
      if (Math.abs(momentum) > 0.5) {
        let currentMomentum = momentum
        const decay = () => {
          if (Math.abs(currentMomentum) < 0.5) {
            setInteractionState('idle')
            return
          }
          setPosition(prev => {
            const halfWidth = getHalfWidth()
            if (halfWidth === 0) return prev + currentMomentum
            
            let newPos = prev + currentMomentum
            // Wrap around
            if (newPos <= -halfWidth) newPos += halfWidth
            if (newPos >= 0) newPos -= halfWidth
            return newPos
          })
          currentMomentum *= 0.95
          requestAnimationFrame(decay)
        }
        requestAnimationFrame(decay)
      } else {
        setInteractionState('idle')
      }
    } else {
      // Was a hold, not a drag - just release
      setActiveCard(null)
      setInteractionState('idle')
    }
  }, [interactionState, getHalfWidth])

  // Event handlers
  const handlers = {
    onMouseDown: (e) => {
      e.preventDefault()
      handleStart(e.clientX, e.target)
    },
    onMouseMove: (e) => handleMove(e.clientX),
    onMouseUp: handleEnd,
    onMouseLeave: handleEnd,
    onTouchStart: (e) => handleStart(e.touches[0].clientX, e.target),
    onTouchMove: (e) => handleMove(e.touches[0].clientX),
    onTouchEnd: handleEnd,
  }

  const duplicatedItems = [...items, ...items]

  return (
    <div 
      ref={rowRef}
      className="flex gap-1 md:gap-1.5 w-max cursor-grab active:cursor-grabbing"
      style={{
        transform: position !== null ? `translateX(${position}px)` : undefined,
      }}
      {...handlers}
    >
      {duplicatedItems.map((item, index) => {
        const cardId = `${item.file}-${index}`
        return (
          <CarouselCard 
            key={`${rowId}-${cardId}`} 
            item={item}
            cardId={cardId}
            isActive={activeCard === cardId}
          />
        )
      })}
    </div>
  )
}

function Carousel() {
  // Distribute videos and images evenly across two carousels while maintaining alternation
  const { firstHalf, secondHalf } = useMemo(() => {
    const videos = carouselItems.filter(item => item.type === 'video')
    const images = carouselItems.filter(item => item.type === 'image')
    
    const carousel1 = []
    const carousel2 = []
    
    let videoIndex = 0
    let imageIndex = 0
    let useCarousel1 = true
    
    while (videoIndex < videos.length || imageIndex < images.length) {
      const targetCarousel = useCarousel1 ? carousel1 : carousel2
      
      if (videoIndex < videos.length) {
        targetCarousel.push(videos[videoIndex])
        videoIndex++
      }
      
      if (imageIndex < images.length) {
        targetCarousel.push(images[imageIndex])
        imageIndex++
      }
      
      useCarousel1 = !useCarousel1
    }
    
    return { firstHalf: carousel1, secondHalf: carousel2 }
  }, [])

  return (
    <section className="py-8 md:py-12 overflow-hidden space-y-1.5">
      {/* First carousel - scrolling left */}
      <CarouselRow items={firstHalf} direction="left" rowId="left" />
      
      {/* Second carousel - scrolling right */}
      <CarouselRow items={secondHalf} direction="right" rowId="right" />
    </section>
  )
}

export default Carousel

