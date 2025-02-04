interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  github?: string
}

const projectsData: Project[] = [
  {
    title: 'Money Mind',
    description: `Money Mind is a tool that helps you manage your finances. It allows you to track your income and expenses, and provides insights on your spending habits.`,
    imgSrc: '/static/images/moneymind.png',
    href: 'https://moneymind.mustafizkaifee.in/',
    github: 'https://github.com/Mustafiz04/moneymind',
  },
]

export default projectsData
