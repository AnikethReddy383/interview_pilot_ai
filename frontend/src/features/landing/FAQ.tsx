import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is CareerForge?',
    answer: 'CareerForge is an all-in-one career preparation platform designed to help job seekers audit their resumes, optimize for applicant tracking systems (ATS), identify skills gaps, and simulate practice interviews in a calm and private workspace.',
  },
  {
    question: 'How does the ATS scoring work?',
    answer: 'Our algorithm parses your resume using standard parser rules and matches it against targeted job descriptions to calculate formatting correctness, keyword density, and overall matching metrics.',
  },
  {
    question: 'Is my resume data secure and private?',
    answer: 'Yes. Data privacy is a core principle. Your uploaded documents and analysis history are fully secured using Supabase Row Level Security (RLS) policies. Only you have access to your documents and scores.',
  },
  {
    question: 'Can I use the platform for free?',
    answer: 'Absolutely. Our Starter plan is 100% free and includes core resume analysis, ATS compliance checking, and basic job matching tools to establish your foundation.',
  },
  {
    question: 'How does the mock interview simulator prepare me?',
    answer: 'Our upcoming interview simulator will generate personalized conversational technical and behavioral questions based on your background and target jobs, complete with constructive feedback on your responses.',
  },
  {
    question: 'Which resume file formats are supported?',
    answer: 'We currently support PDF and DOCX files. To guarantee the most accurate parsing, we highly recommend uploading standard PDF files.',
  },
  {
    question: 'What makes CareerForge better than traditional review services?',
    answer: 'Instead of waiting days for general feedback and paying hundreds of dollars, CareerForge offers instant, contextual, and recruiter-aligned suggestions 24/7 at a fraction of the cost.',
  },
  {
    question: 'When will the Professional and Enterprise plans launch?',
    answer: 'We are currently polishing the AI models for simulated interviews and team workflows. These features are on our roadmap and will be released in upcoming milestones.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            FAQ
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Frequently Asked Questions
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Quick answers to help you understand how CareerForge works and how it protects your data.
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-button-${index}`}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`size-4 text-slate-500 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className={`transition-all duration-200 ease-in-out ${
                    isOpen ? 'max-h-96 border-t border-slate-100 dark:border-slate-800' : 'max-h-0'
                  } overflow-hidden`}
                >
                  <p className="p-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
