const steps = [
  {
    step: 1,
    title: 'Connect to your cameras',
    description: 'Run Edge Agent on your local network to monitor for events behind the safety of your existing infrastructure. Compatible with virtually any camera - from analog CCTV to modern IP cameras.',
    image: '1.png',
    imagePosition: 'left'
  },
  {
    step: 2,
    title: 'Define events',
    description: "Describe, in plain English, what events you'd like to detect. Define boundaries, duration requirements, or other constraints to match your specific needs.",
    image: '2.png',
    imagePosition: 'right',
  },
  {
    step: 3,
    title: 'Create actions',
    description: 'Tie events to an action, such as a real-time Slack alert or weekly summary email. Build powerful "if this, then that" workflows without writing code.',
    image: '3.png',
    imagePosition: 'left'
  },
  {
    step: 4,
    title: 'Get back to business',
    description: 'That\'s it. Framewave runs silently in the background, triggering your workflows 24/7. Update events or actions anytime from your dashboard.',
    image: '4.png',
    imagePosition: 'right'
  }
]

function StepCard({ step }) {
  const basePath = import.meta.env.BASE_URL
  const isImageLeft = step.imagePosition === 'left'

  return (
    <div className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-4 md:gap-32 mb-16 md:mb-0 ${step.step === 1 ? 'md:pb-20' : 'md:py-20'}`}>
      <div className={`w-full md:w-1/2 ${isImageLeft ? 'text-left' : 'text-left md:text-left'} order-1 md:order-${isImageLeft ? '2' : '1'}`}>
        <p className="text-caption text-dark/50 mb-2">Step {step.step}</p>
        <h3 className="text-hero text-dark mb-4">{step.title}</h3>
        <p className="text-body text-dark/70 max-w-md">
          {step.description}
        </p>
      </div>

      <div className={`w-full md:w-1/2 order-2 md:order-${isImageLeft ? '1' : '2'}`}>
          <img
            src={`${basePath}steps/${step.image}`}
            alt={step.title}
            className="w-full h-auto rounded-10 shadow-lg"
          />
      </div>
    </div>
  )
}

function Steps() {
  return (
    <section id="how-it-works" className="page-container py-12 md:py-20 lg:py-28">
      <p className="text-caption text-dark/60 uppercase tracking-wider mb-8 md:mb-8">
        How it works
      </p>

      <div className="">
        {steps.map((step) => (
          <StepCard key={step.step} step={step} />
        ))}
      </div>
    </section>
  )
}

export default Steps

