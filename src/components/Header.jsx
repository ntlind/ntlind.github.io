function Header({ isLightMode = false }) {
  const basePath = import.meta.env.BASE_URL

  return (
    <header className="page-container py-4 md:py-6">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src={`${basePath}logos/${isLightMode ? 'dark' : 'main'}.png`}
            alt="Framewave" 
            className="h-8 md:h-10 w-auto transition-opacity duration-500"
          />
          <span className={`text-button text-xl md:text-2xl transition-colors duration-500 ${
            isLightMode ? 'text-white' : 'text-black'
          }`}>
            framewave
          </span>
        </div>

        <a 
          href="https://calendar.app.google/Yqs7KNcNVkdHw9hF6"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-button px-5 py-2.5 rounded-md border-2 transition-all duration-500 ${
            isLightMode 
              ? 'border-white text-white hover:bg-white hover:text-dark' 
              : 'border-dark text-dark hover:bg-dark hover:text-white'
          }`}
        >
          Book a call
        </a>
      </nav>
    </header>
  )
}

export default Header

