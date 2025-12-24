function Team() {
  const basePath = import.meta.env.BASE_URL

  return (
    <section className="page-container py-12 md:py-20 lg:py-28">
      <p className="text-caption text-dark/60 uppercase tracking-wider mb-8">
        Team
      </p>

      <div className="mb-8 md:mb-12">
        <img
          src={`${basePath}team/team.png`}
          alt="Marwan Harajli and Nick Lind"
          className="w-full h-auto rounded-10 shadow-lg"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <p className="text-body text-dark leading-relaxed">
          <span className="font-semibold">Marwan Harajli</span> and{' '}
          <span className="font-semibold">Nick Lind</span> met at Facebook, where they built 
          speech and knowledge graph technologies together while working on the AI Research Team. 
          After seeing Fortune 500 companies struggle to implement even basic computer vision 
          solutions with specialized ML teams and six-figure budgets, they realized that smaller 
          businesses were at risk of being completely left behind in the AI race. That&apos;s why they founded Framewave: to 
          empower businesses of all sizes to manage their operations using enterprise-grade 
          computer vision technologies.
        </p>
      </div>
    </section>
  )
}

export default Team

