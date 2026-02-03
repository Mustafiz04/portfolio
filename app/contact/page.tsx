'use client'
import { useState } from 'react'
import { InlineWidget } from 'react-calendly'
import { contact } from 'config/contact'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function Contact() {
  const [calendlyPopup, setCalendlyPopup] = useState(false)

  function onScheduleMeeting(): void {
    setCalendlyPopup(true)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 py-12 text-center md:space-y-5 md:py-20">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-14">
          Contact
        </h1>
        <div className="mx-auto max-w-2xl space-y-6">
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Do you have a project in mind? Want to hire me? or simply wanna chat? I'm always open to
            discussing new opportunities and creative ideas.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={onScheduleMeeting}
              className="inline-flex items-center rounded-xl bg-primary-500 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-primary-600 hover:shadow-lg dark:hover:bg-primary-400"
            >
              Schedule a meeting
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
            <a
              href={`mailto:${siteMetadata.email}`}
              className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-8 py-4 text-sm font-bold text-gray-900 transition-all hover:border-primary-500/30 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-900"
            >
              Send an email
            </a>
          </div>
        </div>
      </div>

      {calendlyPopup && (
        <div className="mb-12 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950">
          <div className="p-4 md:p-8" style={{ minWidth: '320px', height: '700px' }}>
            <InlineWidget url="https://calendly.com/mustafiz_kaifee/30min" />
          </div>
        </div>
      )}
    </div>
  )
}
