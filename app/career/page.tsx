'use client'
import { useState } from 'react'
import { InlineWidget } from 'react-calendly'
import { contact } from 'config/contact'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function Career() {
  return (
    <>
      <div className="mx-auto mt-8 max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Career Timeline
        </h1>
        <div className="mt-6 space-y-1">
          <div className="pb-4 md:grid md:grid-cols-3 md:gap-4">
            <div className="md:col-span-1">
              <h2 className="font-bold">May, 2024</h2>
            </div>
            <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-900 md:col-span-2">
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Joined{' '}
                  <a className="underline" href="https://www.bitgo.com/">
                    BitGo
                  </a>{' '}
                  as a Software Engineer (Backend).
                </li>
              </ul>
            </div>
          </div>
          <div className="pb-4 md:grid md:grid-cols-3 md:gap-4">
            <div className="md:col-span-1">
              <h2 className="font-bold">Febuary, 2024</h2>
            </div>
            <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-900 md:col-span-2">
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Joined{' '}
                  <a className="underline" href="https://www.micro1.ai/">
                    micro1
                  </a>{' '}
                  as a freelancer Software Developer.
                </li>
              </ul>
            </div>
          </div>

          <div className="pb-4 md:grid md:grid-cols-3 md:gap-4">
            <div className="md:col-span-1">
              <h2 className="font-bold">April, 2022</h2>
            </div>
            <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-900 md:col-span-2">
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Joined{' '}
                  <a className="underline" href="https://www.medibuddy.in/">
                    MediBuddy
                  </a>{' '}
                  as a Software Development Engineer.
                </li>
              </ul>
            </div>
          </div>

          <div className="pb-4 md:grid md:grid-cols-3 md:gap-4">
            <div className="md:col-span-1">
              <h2 className="font-bold">January, 2021</h2>
            </div>
            <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-900 md:col-span-2">
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Completed my 6 months internship as a Software Developer Intern and joined as a
                  full time Software Development Engineer at{' '}
                  <a className="underline" href="https://www.freecharge.in/">
                    Freecharge
                  </a>{' '}
                  .
                </li>
              </ul>
            </div>
          </div>

          <div className="pb-4 md:grid md:grid-cols-3 md:gap-4">
            <div className="md:col-span-1">
              <h2 className="font-bold">May, 2021</h2>
            </div>
            <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-900 md:col-span-2">
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Graduated from{' '}
                  <a className="underline" href="https://www.medibuddy.in/">
                    National Institute of Technology, Jamshedpur
                  </a>{' '}
                </li>
              </ul>
            </div>
          </div>

          <div className="pb-4 md:grid md:grid-cols-3 md:gap-4">
            <div className="md:col-span-1">
              <h2 className="font-bold">January, 2021</h2>
            </div>
            <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-900 md:col-span-2">
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Started a 6 months internship at{' '}
                  <a className="underline" href="https://www.freecharge.in/">
                    Freecharge
                  </a>{' '}
                  as a Software Developer Intern in the digital savings account team.
                </li>
              </ul>
            </div>
          </div>

          <div className="pb-4 md:grid md:grid-cols-3 md:gap-4">
            <div className="md:col-span-1">
              <h2 className="font-bold">July, 2017</h2>
            </div>
            <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-900 md:col-span-2">
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Enrolled in the Bachelor of Technology programme at{' '}
                  <a className="underline" href="https://www.medibuddy.in/">
                    National Institute of Technology, Jamshedpur
                  </a>{' '}
                </li>
              </ul>
            </div>
          </div>

          {/* <div className="flex space-x-3">
            <div className="flex-1 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
              <h2 className="font-bold">2014</h2>
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Started my first full-time job as a Junior Software Developer at{' '}
                  <a className="underline" href="https://www.dynatrace.com/">
                    Dynatrace
                  </a>
                  .
                </li>
              </ul>
            </div>
            <div className="flex-1 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
              <h2 className="font-bold">2015</h2>
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Joined{' '}
                  <a className="underline" href="https://www.keenan.co/">
                    Keenan
                  </a>{' '}
                  as a Junior Software Developer.
                </li>
              </ul>
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="flex-1 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
              <h2 className="font-bold">2016</h2>
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Started working on my first open-source project:{' '}
                  <a className="underline" href="https://github.com/muratgozel/nextjs-starter-kit">
                    Next.js starter kit
                  </a>
                  .
                </li>
              </ul>
            </div>
            <div className="flex-1 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
              <h2 className="font-bold">2017</h2>
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Joined{' '}
                  <a className="underline" href="https://www.jamify.org/">
                    Jamify
                  </a>{' '}
                  as a Full-Stack Software Developer.
                </li>
              </ul>
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="flex-1 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
              <h2 className="font-bold">2018</h2>
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Started working on my second open-source project:{' '}
                  <a className="underline" href="https://github.com/muratgozel/nextjs-starter-kit">
                    Next.js starter kit
                  </a>
                  .
                </li>
              </ul>
            </div>
            <div className="flex-1 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
              <h2 className="font-bold">2019</h2>
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Published my first article on{' '}
                  <a className="underline" href="https://dev.to/muratgozel">
                    DEV
                  </a>
                  .
                </li>
              </ul>
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="flex-1 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
              <h2 className="font-bold">2020</h2>
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Started working on my third open-source project:{' '}
                  <a
                    className="underline"
                    href="https://github.com/muratgozel/tailwind-nextjs-starter-blog"
                  >
                    Tailwind Next.js blog template
                  </a>
                  .
                </li>
              </ul>
            </div>
            <div className="flex-1 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
              <h2 className="font-bold">2021</h2>
              <ul className="mt-2">
                <li className="text-gray-500 dark:text-gray-400">
                  Started working on my personal website.
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}
