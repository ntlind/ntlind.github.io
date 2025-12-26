import { useMemo, useState } from 'react'

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

function CarouselCard({ item, onMouseEnter, onMouseLeave }) {
  const basePath = import.meta.env.BASE_URL
  const isVideo = item.type === 'video'
  
  // All cards same height, videos are wider, images are narrower
  const cardClasses = isVideo 
    ? 'w-80 md:w-[600px] h-60 md:h-[450px] flex-shrink-0' 
    : 'w-48 md:w-[300px] h-60 md:h-[450px] flex-shrink-0'

  return (
    <div 
      className={`card group relative ${cardClasses} bg-transparent overflow-hidden`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Media */}
      {isVideo ? (
        <video
          src={`${basePath}carousel/${encodeURIComponent(item.file)}`}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={`${basePath}carousel/${encodeURIComponent(item.file)}`}
          alt={item.caption}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      {/* Dark gradient overlay at top for text visibility */}
      <div className="card-overlay" />
      
      {/* Caption overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10">
        <p className="text-xl text-white leading-snug truncate group-hover:whitespace-normal group-hover:overflow-visible">
          {item.caption}
        </p>
      </div>
    </div>
  )
}

function Carousel() {
  const [hoveredRow, setHoveredRow] = useState(null)

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

  const duplicatedFirstHalf = [...firstHalf, ...firstHalf]
  const duplicatedSecondHalf = [...secondHalf, ...secondHalf]

  return (
    <section className="py-8 md:py-12 overflow-hidden space-y-1.5">
      {/* First carousel - scrolling left */}
      <div 
        className="flex gap-1 md:gap-1.5 w-max animate-scroll-left"
        style={{
          animationPlayState: hoveredRow === 1 ? 'paused' : 'running'
        }}
      >
        {duplicatedFirstHalf.map((item, index) => (
          <CarouselCard 
            key={`left-${item.file}-${index}`} 
            item={item} 
            onMouseEnter={() => setHoveredRow(1)}
            onMouseLeave={() => setHoveredRow(null)}
          />
        ))}
      </div>
      
      {/* Second carousel - scrolling right */}
      <div 
        className="flex gap-1 md:gap-1.5 w-max animate-scroll-right"
        style={{
          animationPlayState: hoveredRow === 2 ? 'paused' : 'running'
        }}
      >
        {duplicatedSecondHalf.map((item, index) => (
          <CarouselCard 
            key={`right-${item.file}-${index}`} 
            item={item} 
            onMouseEnter={() => setHoveredRow(2)}
            onMouseLeave={() => setHoveredRow(null)}
          />
        ))}
      </div>
    </section>
  )
}

export default Carousel

