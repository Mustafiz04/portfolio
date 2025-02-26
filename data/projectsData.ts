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
  {
    title: 'Geo Quiz',
    description: `Geo Quiz is a quiz game that tests your knowledge of the world. It is a simple and fun way to learn about the world around you.`,
    imgSrc: '/static/images/geoquiz.png',
    href: 'https://longitudechallenge.mustafizkaifee.in/',
    github: 'https://github.com/Mustafiz04/longitudechallenge',
  },
]

export default projectsData
