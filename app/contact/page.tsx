'use client'
import { useState } from 'react'
import { InlineWidget } from 'react-calendly'
import { contact } from 'config/contact'

export default function Contact() {
  const [calendlyPopup, setCalendlyPopup] = useState(false)

  function onScheduleMeeting(): void {
    setCalendlyPopup(true)
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Contact
          </h1>
        </div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Do you have a project in mind? Want to hire me? or simply wanna chat? Feel free to{' '}
            <button className="text-blue-500" onClick={onScheduleMeeting}>
              schedule a meeting
            </button>
          </p>
        </div>
        {calendlyPopup && (
          <div
            className="space-y-2 pb-8 pt-6 md:space-y-5"
            style={{ minWidth: '320px', height: '850px' }}
          >
            <InlineWidget url="https://calendly.com/mustafiz_kaifee/30min" />
          </div>
        )}
      </div>
    </>
  )
}
