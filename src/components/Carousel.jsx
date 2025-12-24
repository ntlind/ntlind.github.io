import { useMemo } from 'react'

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

function CarouselCard({ item }) {
  const basePath = import.meta.env.BASE_URL
  const isVideo = item.type === 'video'
  
  // All cards same height, videos are wider, images are narrower
  const cardClasses = isVideo 
    ? 'w-80 md:w-[600px] h-60 md:h-[450px] flex-shrink-0' 
    : 'w-48 md:w-[300px] h-60 md:h-[450px] flex-shrink-0'

  return (
    <div className={`card relative ${cardClasses} bg-transparent overflow-hidden`}>
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
        <p className="text-base text-white leading-snug">
          {item.caption}
        </p>
      </div>
    </div>
  )
}

function Carousel() {
  // Interleave videos and images: video, image, video, image...
  const interleavedItems = useMemo(() => {
    const videos = carouselItems.filter(item => item.type === 'video')
    const images = carouselItems.filter(item => item.type === 'image')
    
    const result = []
    const maxLength = Math.max(videos.length, images.length)
    
    for (let i = 0; i < maxLength; i++) {
      if (videos[i]) result.push(videos[i])
      if (images[i]) result.push(images[i])
    }
    
    return result
  }, [])

  // Split items into two halves
  const midpoint = Math.ceil(interleavedItems.length / 2)
  const firstHalf = interleavedItems.slice(0, midpoint)
  const secondHalf = interleavedItems.slice(midpoint)

  // Duplicate items for seamless infinite scroll
  const duplicatedFirstHalf = [...firstHalf, ...firstHalf]
  const duplicatedSecondHalf = [...secondHalf, ...secondHalf]

  return (
    <section className="py-8 md:py-12 overflow-hidden space-y-1.5">
      {/* First carousel - scrolling left */}
      <div className="animate-scroll-left flex gap-1 md:gap-1.5 w-max">
        {duplicatedFirstHalf.map((item, index) => (
          <CarouselCard key={`left-${item.file}-${index}`} item={item} />
        ))}
      </div>
      
      {/* Second carousel - scrolling right */}
      <div className="animate-scroll-right flex gap-1 md:gap-1.5 w-max">
        {duplicatedSecondHalf.map((item, index) => (
          <CarouselCard key={`right-${item.file}-${index}`} item={item} />
        ))}
      </div>
    </section>
  )
}

export default Carousel

