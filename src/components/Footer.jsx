function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Use cases', href: '#use-case' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: 'mailto:hello@framewave.ai' },
  ]

  return (
    <footer className="bg-primary text-white py-12 md:py-16">
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-12">
          {/* Left side - Contact */}
          <div className="flex-1">
            <p className="text-sm text-white/70 mb-2">
              Interested in working with us? Let&apos;s chat!
            </p>
            <div className="mb-4">
              <a 
                href="mailto:hello@framewave.ai"
                className="text-4xl font-semibold text-white hover:text-accent transition-colors duration-200"
              >
                hello@framewave.ai
              </a>
            </div>
            <a 
              href="https://calendar.app.google/Yqs7KNcNVkdHw9hF6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-accent transition-colors duration-200"
            >
              Schedule time with Nick and Marwan
            </a>
          </div>

          {/* Right side - Navigation */}
          <div className="flex gap-12 md:gap-24">
            <nav className="flex flex-col gap-3">
              <p className="text-sm text-white/70 mb-2">Navigation</p>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom - Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <p className="text-sm text-white/70">
            © {currentYear} Framewave. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a
              href="/privacy-policy.html"
              className="text-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            {/* <a
              href="/terms-of-service.html"
              className="text-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

