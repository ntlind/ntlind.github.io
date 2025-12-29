function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28 lg:py-36">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#5CD4C2" />
              <circle cx="0" cy="0" r="1.5" fill="#5CD4C2" />
              <circle cx="100" cy="0" r="1.5" fill="#5CD4C2" />
              <circle cx="0" cy="100" r="1.5" fill="#5CD4C2" />
              <circle cx="100" cy="100" r="1.5" fill="#5CD4C2" />
              <path d="M0 50 Q25 30 50 50 T100 50" stroke="#5CD4C2" strokeWidth="0.5" fill="none" />
              <path d="M0 70 Q25 50 50 70 T100 70" stroke="#5CD4C2" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="page-container relative z-10">
        <h2 className="text-hero text-white mb-8 max-w-5xl">
          Start a free two-week trial to see how Framewave can help you automate your business
        </h2>

        <a 
          href="https://calendar.app.google/Yqs7KNcNVkdHw9hF6"
          target="_blank"
          rel="noopener noreferrer"
          className="text-button px-8 py-3 rounded-10 border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary transition-colors duration-200 inline-block"
        >
          Schedule time with Nick and Marwan
        </a>
      </div>
    </section>
  )
}

export default CallToAction

