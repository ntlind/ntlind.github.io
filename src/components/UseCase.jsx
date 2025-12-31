import { useState } from 'react'

const useCases = [
  {
    id: '1',
    label: 'Construction',
    headline: 'Proactive safety management for multi-site construction operations',
    bullets: [
      {
        bold: 'Detect and correct safety violations in real-time',
        detail: '(e.g., workers entering exclusion zones, missing fall protection or PPE, etc.) by sending immediate alerts to site supervisors before incidents escalate.'
      },
      {
        bold: 'Automatically generate weekly safety documentation',
        detail: 'with violation breakdowns, near-miss patterns, and crew-level risk metrics delivered directly to safety managers. Maintain audit-ready records across every active jobsite.'
      },
      {
        bold: 'Monitor material deliveries and equipment staging',
        detail: 'to flag supply bottlenecks before crews are left waiting. Receive threshold alerts when critical materials run low or equipment sits idle beyond scheduled windows.'
      }
    ]
  },
  {
    id: '2',
    label: 'Healthcare',
    headline: 'Continuous patient monitoring without the staff burden',
    bullets: [
      {
        bold: 'Alert nursing staff when patients exhibit concerning behaviors',
        detail: '(e.g., extended time out of bed, wandering near exits, prolonged periods without caregiver contact). Escalate to charge nurses when response thresholds are exceeded.'
      },
      {
        bold: 'Track patient wait times and care intervals',
        detail: 'from check-in through discharge. Surface bottlenecks in triage, imaging, and consultation handoffs with time-stamped visual documentation.'
      },
      {
        bold: 'Generate utilization reports for beds, wheelchairs, and shared equipment',
        detail: 'to identify underused assets and peak-demand windows. Support capacity planning with data from actual floor activity.'
      }
    ]
  },
  {
    id: '3',
    label: 'Retail',
    headline: 'Operational visibility across every location and shift',
    bullets: [
      {
        bold: 'Trigger staffing alerts when checkout lines exceed wait thresholds',
        detail: '(e.g., 10+ customers in line, more than 3 carts waiting for each open register). Notify floor managers to open additional registers or redirect staff before customers abandon carts.'
      },
      {
        bold: 'Count customer traffic and measure dwell times by zone',
        detail: 'to understand peak hours, identify high-engagement displays, and spot underperforming floor sections. Correlate foot traffic with POS data for conversion analysis.'
      },
      {
        bold: 'Monitor shelf inventory and stockroom activity',
        detail: 'to flag empty shelves, detect restocking delays, and alert merchandising teams when displays need attention. Track delivery vehicle arrivals and unloading times.'
      }
    ]
  },
  {
    id: '4',
    label: 'Manufacturing & Warehousing',
    headline: 'Production floor intelligence without disrupting existing workflows',
    bullets: [
      {
        bold: 'Count finished goods and track work-in-progress at each station',
        detail: '. Log production output automatically and identify stations where throughput drops below target rates.'
      },
      {
        bold: 'Detect supply chain disruptions at receiving docks',
        detail: 'by monitoring inbound truck arrivals, unloading durations, and staging area congestion. Alert logistics coordinators when receiving bays sit empty during expected delivery windows.'
      },
      {
        bold: 'Identify equipment idle time and operator inefficiencies',
        detail: 'across shifts without manual timekeeping. Surface patterns in machine downtime, forklift routes, and pick-path deviations to inform process improvements.'
      }
    ]
  }
]

function UseCase() {
  const basePath = import.meta.env.BASE_URL
  const [activeIndex, setActiveIndex] = useState(0)
  const activeCase = useCases[activeIndex]

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % useCases.length)
  }

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + useCases.length) % useCases.length)
  }

  return (
    <section id="use-case" className="page-container pb-12 md:pb-20 lg:pb-28">
      {/* Industry Navigation Pills */}
      <div className="mb-8 md:mb-12">
        <p className="text-caption text-dark/60 uppercase tracking-wider mb-4">
          Use Cases
        </p>
        
        {/* Desktop: Show all pills */}
        <div className="hidden md:flex flex-wrap gap-2">
          {useCases.map((useCase, index) => (
            <button
              key={useCase.id}
              onClick={() => setActiveIndex(index)}
              className={`
                px-4 py-2 rounded-full text-caption font-medium transition-all duration-300
                ${activeIndex === index 
                  ? 'bg-dark text-white' 
                  : 'bg-dark/5 text-dark/70 hover:bg-dark/10 hover:text-dark'
                }
              `}
            >
              {useCase.label}
            </button>
          ))}
        </div>

        {/* Mobile: Compact pill selector with arrows */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={goToPrev}
            className="w-10 h-10 flex-shrink-0 rounded-full bg-dark/5 flex items-center justify-center text-dark/70 hover:bg-dark/10 transition-colors"
            aria-label="Previous use case"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex-1 text-center min-w-0">
            <span className="px-4 py-2 rounded-full bg-dark text-white text-caption font-medium inline-block max-w-full truncate">
              {activeCase.label}
            </span>
          </div>
          
          <button
            onClick={goToNext}
            className="w-10 h-10 flex-shrink-0 rounded-full bg-dark/5 flex items-center justify-center text-dark/70 hover:bg-dark/10 transition-colors"
            aria-label="Next use case"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Use Case Content */}
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        {/* Text Content */}
        <div className="w-full md:w-5/12 order-1">
          <div 
            key={activeCase.id}
            className="animate-fade-in"
          >
            <h2 className="text-heading text-dark mb-8">
              {activeCase.headline}
            </h2>

            <ul className="space-y-6">
              {activeCase.bullets.map((bullet, index) => (
                <li key={index} className="text-body text-dark/70">
                  <span className="font-semibold text-dark">{bullet.bold}</span>
                  {bullet.detail.startsWith('—') ? bullet.detail : ` ${bullet.detail}`}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-7/12 order-2">
          <img
            src={`${basePath}use_case/${activeCase.id}.png`}
            alt={`${activeCase.label} use case showing AI-powered monitoring`}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Dot Indicators (Desktop) */}
      <div className="hidden md:flex justify-center mt-10 gap-2">
        {useCases.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${activeIndex === index 
                ? 'bg-dark w-6' 
                : 'bg-dark/20 hover:bg-dark/40'
              }
            `}
            aria-label={`Go to ${useCases[index].label}`}
          />
        ))}
      </div>
    </section>
  )
}

export default UseCase
