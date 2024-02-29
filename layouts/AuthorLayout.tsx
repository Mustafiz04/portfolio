import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import StackList from '@/components/list/StackList';
import { WorkStack } from 'config/stack';
import { RoughNotation } from 'react-rough-notation';

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github, resume } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              {/* <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} /> */}
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            {children}
            {/* <p className='mt-8'> */}
              <a
                className='!font-normal !text-black !no-underline dark:!text-white'
                href={resume}
                target='_blank'
                rel='noreferrer'
              >
                <RoughNotation
                  show
                  type='box'
                  animationDelay={250}
                  animationDuration={2000}
                  strokeWidth={2}
                  // color='#fffff'
                >
                  Resume
                </RoughNotation>
              </a>
              <h2 className='mt-8 mb-4 text-2xl font-semibold dark:text-white'>
                Skills
              </h2>
              <StackList stack={WorkStack} />
            {/* </p> */}
          </div>
        </div>
      </div>
    </>
  )
}
