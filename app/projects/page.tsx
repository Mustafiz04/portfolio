import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import ComingSoon from '@/components/ComingSoon'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 py-12 text-center md:space-y-5 md:py-20">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-14">
          Projects
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-7 text-gray-500 dark:text-gray-400">
          A collection of tools, applications, and experiments I've built. Each project represents a
          unique challenge and a step in my learning journey.
        </p>
      </div>
      <div className="pb-12 md:pb-24">
        <div className="-m-4 flex flex-wrap justify-center">
          {projectsData.map((d) => (
            <Card
              key={d.title}
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.href}
              github={d.github}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
