function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    // { label: 'Home', href: '#' },
    // { label: 'Benefits', href: '#benefits' },
    // { label: 'How it works', href: '#how-it-works' },
    // { label: 'Team', href: '#team' },
    // { label: 'Contact us', href: 'mailto:hello@framewave.ai' },
  ]

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
  ]

  return (
    <footer className="bg-primary text-white py-12 md:py-16">
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8">
          {/* Left side - Logo and contact */}
          <div className="flex-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              {/* <div className="h-12 w-12 bg-white/10 rounded-lg flex items-center justify-center p-1">
                <img
                  src={`${basePath}logos/main.png`}
                  alt="Framewave"
                  className="h-full w-auto"
                />
              </div> */}
              <span className="text-2xl font-semibold text-white">framewave</span>
            </div>

            {/* Contact info */}
            <div className="text-body text-white/80 space-y-1">
              <p>San Francisco, CA</p>
              <p>hello@framewave.ai</p>
            </div>

            {/* Copyright */}
            <p className="text-caption text-white/60 mt-8">
              © {currentYear} Framewave
            </p>
          </div>

          {/* Right side - Navigation */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            {/* Main navigation */}
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-button text-white hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Legal links */}
            <nav className="flex flex-col md:flex-row gap-3 md:gap-8 md:self-end">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-caption text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

