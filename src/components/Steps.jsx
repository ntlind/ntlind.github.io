const steps = [
  {
    step: 1,
    title: 'Connect to your feed',
    description: 'Use our built-in integrations or connect via RTSP, RTMP, or HTTP.',
    image: '1.png',
    imagePosition: 'left'
  },
  {
    step: 2,
    title: 'Define events',
    description: "Describe, in plain English, what events you'd like to detect.",
    image: '2.png',
    imagePosition: 'right',
    isQuote: true,
    quoteText: '"Send me a daily summary of the number of people who entered our mall."'
  },
  {
    step: 3,
    title: 'Create actions',
    description: 'Tie one or more events to an action, such as a real-time Slack alert or weekly summary email.',
    image: '3.png',
    imagePosition: 'left'
  },
  {
    step: 4,
    title: 'Get back to business',
    description: 'Framewave runs in the background, triggering actions to help you make faster, smarter decisions.',
    image: '4.png',
    imagePosition: 'right'
  }
]

function StepCard({ step, index }) {
  const basePath = import.meta.env.BASE_URL
  const isImageLeft = step.imagePosition === 'left'

  return (
    <div className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 ${step.step === 1 ? 'pb-12 md:pb-20' : 'py-12 md:py-20'}`}>
      {/* Image/Quote side */}
      <div className="w-full md:w-1/2">
        {step.isQuote ? (
          <div className="rounded-10 p-8 md:p-12">
            <p className="text-heading text-primary italic text-center leading-relaxed">
              {step.quoteText}
            </p>
          </div>
        ) : (
          <img
            src={`${basePath}steps/${step.image}`}
            alt={step.title}
            className="w-full h-auto rounded-10 shadow-lg"
          />
        )}
      </div>

      {/* Text side */}
      <div className={`w-full md:w-1/2 ${isImageLeft ? 'text-left' : 'text-left md:text-left'}`}>
        <p className="text-caption text-dark/50 mb-2">Step {step.step}</p>
        <h3 className="text-hero text-dark mb-4">{step.title}</h3>
        <p className="text-body text-dark/70 max-w-md">
          {step.description}
        </p>
      </div>
    </div>
  )
}

function Steps() {
  return (
    <section className="page-container py-12 md:py-20 lg:py-28">
      <p className="text-caption text-dark/60 uppercase tracking-wider mb-8">
        How it works
      </p>

      <div className="e">
        {steps.map((step, index) => (
          <StepCard key={step.step} step={step} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Steps

