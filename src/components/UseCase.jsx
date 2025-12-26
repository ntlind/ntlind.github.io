function UseCase() {
  const basePath = import.meta.env.BASE_URL

  return (
    <section id="use-case" className="page-container pb-12 md:pb-20 lg:pb-28">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        {/* Text Content */}
        <div className="w-full md:w-5/12 order-1">
          <p className="text-caption text-dark/60 uppercase tracking-wider mb-6">
            Use Case
          </p>
          
          <h2 className="text-heading text-dark mb-8">
            Managing OSHA risk for a $300M regional construction company
          </h2>

          <ul className="space-y-6">
            <li className="text-body text-dark/70">
              <span className="font-semibold text-dark">Detected and corrected 840+ safety violations</span> in the first 90 days (e.g., workers entering exclusion zones, missing fall protection, and PPE non-compliance).
            </li>
            <li className="text-body text-dark/70">
              <span className="font-semibold text-dark">Generated weekly safety reports</span> to break down violations, near-misses, and risk patterns by crew and site. Cut safety manager documentation time from 10 hours to 30 minutes weekly and provided audit-ready data that helped reduce EMR rate by 0.15 points.
            </li>
            <li className="text-body text-dark/70">
              <span className="font-semibold text-dark">Tracked material deliveries and equipment staging</span> to eliminate the daily bottleneck of crews waiting on supplies. Reduced average wait time from 47 to 14 minutes per delivery, saving $180K annually in labor costs across 6 active sites.
            </li>
          </ul>
        </div>

        {/* Image */}
        <div className="w-full md:w-7/12 order-2">
          <img
            src={`${basePath}use_case/1.png`}
            alt="Construction site with safety monitoring detecting workers and crane loads"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
}

export default UseCase

