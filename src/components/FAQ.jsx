import { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: 'Do I need technical expertise or staff to use Framewave?',
    answer: 'No technical expertise required. Once you connect Framewave to your local network, you\'ll be able to define events and actions using our intuitive cloud interface. We\'ll help you get started for free, or send you a plug-and-play Raspberry Pi for a small fee.'
  },
  {
    id: 2,
    question: 'What cameras are supported? Do I need to buy new hardware? What if my cameras are old?',
    answer: 'Framewave works with your existing camera infrastructure, regardless of age or brand. We support standard protocols like RTSP, RTMP, and HTTP, which means virtually any IP camera or video feed can be connected. No need to purchase expensive new hardware.'
  },
  {
    id: 3,
    question: 'How quickly can I get started?',
    answer: 'The entire setup process takes anywhere from 15 minutes to a few hours, depending on your existing infrastructure and technical ability. Our average customer is able to define their first event and action in less than an hour.'
  },
  {
    id: 4,
    question: 'How will you protect my camera feeds?',
    answer: 'Your camera feeds never leave your local network. Framewave only processes camera and event metadata, which is handled on our HIPAA and SOC2 servers.'
  },
  {
    id: 5,
    question: 'What types of notifications can I receive when an event is detected?',
    answer: 'Framewave integrates with Slack, Twilio, email (via SMTP) and MS Teams by default. You can also define custom webhooks to integrate with any of your existing systems. We can help you set up custom integrations for your specific needs, free of charge.'
  }
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-dark/20">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-start justify-between gap-8 text-left hover:opacity-70 transition-opacity duration-200"
      >
        <h3 className="text-heading text-dark flex-1">
          {faq.question}
        </h3>
        
        <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-dark flex items-center justify-center">
  {isOpen ? (
    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" className="text-white"/>
    </svg>
  ) : (
    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" className="text-white"/>
      <line x1="5" y1="12" x2="19" y2="12" className="text-white"/>
    </svg>
  )}
</div>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 mb-6' : 'max-h-0'
        }`}
      >
        <div
          className={`text-body text-dark/70 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {faq.answer}
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const [openId, setOpenId] = useState(null)

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="page-container py-12 md:py-20 lg:py-28">
      <p className="text-caption text-dark/60 uppercase tracking-wider mb-8">
      FAQ
        </p>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-hero text-dark mb-12">
          Frequently asked questions, answered.
        </h2>

        <div className="space-y-0">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

