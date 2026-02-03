'use client'
import { useState } from 'react'
import { InlineWidget } from 'react-calendly'
import { contact } from 'config/contact'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function Career() {
  const careerData = [
    {
      date: 'September, 2025 - Present',
      title: 'Senior Software Engineer',
      company: 'PhonePe',
      companyUrl: 'https://www.phonepe.com/',
      description: 'Building large-scale fintech solutions.',
    },
    {
      date: 'May, 2024 - September, 2025',
      title: 'Software Engineer (Backend)',
      company: 'BitGo',
      companyUrl: 'https://www.bitgo.com/',
      description: 'Worked on digital asset infrastructure and backend services.',
    },
    {
      date: 'February, 2024',
      title: 'Software Developer (Freelance)',
      company: 'micro1',
      companyUrl: 'https://www.micro1.ai/',
      description: 'Delivered high-quality software solutions as a specialized freelancer.',
    },
    {
      date: 'April, 2022 - February, 2024',
      title: 'Software Development Engineer',
      company: 'MediBuddy',
      companyUrl: 'https://www.medibuddy.in/',
      description: 'Contributed to the development of primary healthcare delivery systems.',
    },
    {
      date: 'January, 2021 - April, 2022',
      title: 'Software Development Engineer',
      company: 'Freecharge',
      companyUrl: 'https://www.freecharge.in/',
      description: 'Part of the digital savings account team, building financial products.',
    },
    {
      date: 'May, 2021',
      title: 'B.Tech Graduation',
      company: 'NIT Jamshedpur',
      companyUrl: 'https://www.nitjsr.ac.in/',
      description:
        'Completed my Bachelor of Technology from National Institute of Technology, Jamshedpur.',
    },
    {
      date: 'January, 2021 - June, 2021',
      title: 'Software Developer Intern',
      company: 'Freecharge',
      companyUrl: 'https://www.freecharge.in/',
      description: '6-month intensive internship focusing on digital banking infrastructure.',
    },
    {
      date: 'July, 2017',
      title: 'Enrolled in B.Tech',
      company: 'NIT Jamshedpur',
      companyUrl: 'https://www.nitjsr.ac.in/',
      description: 'Began my engineering journey in the Bachelor of Technology programme.',
    },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <PageSEO
        title={`Career - ${siteMetadata.author}`}
        description="My professional journey and career timeline."
      />

      <div className="space-y-4 pb-16 text-center">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-14">
          Career Timeline
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-7 text-gray-500 dark:text-gray-400">
          A visual journey of my professional milestones, engineering roles, and educational
          background.
        </p>
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-100 dark:bg-gray-800 md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-12">
          {careerData.map((item, index) => (
            <div key={index} className="relative flex flex-col md:flex-row md:justify-between">
              {/* Timeline Node */}
              <div className="absolute left-4 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-primary-500 ring-4 ring-primary-500/10 dark:border-gray-950 md:left-1/2" />

              {/* Date Column (Left on Desktop) */}
              <div
                className={`pl-12 md:w-[45%] md:pl-0 ${index % 2 === 0 ? 'md:text-right' : 'md:order-last'}`}
              >
                <time className="text-sm font-bold uppercase tracking-widest text-primary-500">
                  {item.date}
                </time>
              </div>

              {/* Spacer for Desktop */}
              <div className="hidden md:block md:w-[5%]" />

              {/* Content Card (Right on Desktop) */}
              <div
                className={`mt-4 pl-12 md:mt-0 md:w-[45%] md:pl-0 ${index % 2 === 0 ? 'md:order-last' : 'md:text-right'}`}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-primary-500/30 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/40">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block font-medium text-gray-500 underline-offset-4 hover:text-primary-500 hover:underline dark:text-gray-400"
                  >
                    {item.company}
                  </a>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
