function Header() {
  const basePath = import.meta.env.BASE_URL

  return (
    <header className="page-container py-4 md:py-6">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src={`${basePath}logos/main.png`}
            alt="Framewave" 
            className="h-8 md:h-10 w-auto"
          />
          <span className="text-button text-black text-xl md:text-2xl">framewave</span>
        </div>

        {/* Book a call button */}
        <button className="btn-primary">
          Book a call
        </button>
      </nav>
    </header>
  )
}

export default Header

