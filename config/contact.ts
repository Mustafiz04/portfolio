export enum ContactType {
  github = 'github',
  linkedin = 'linkedin',
  twitter = 'twitter',
  email = 'email',
}

export interface Contact {
  twitter: string
  site: string
  calendly?: string
  links: Record<ContactType, string>
}

export const contact: Contact = {
  twitter: '@mustafiz_kaifee',
  site: 'mustafizkaifee.in',
  calendly: 'https://calendly.com/mustafizkaifee',
  links: {
    github: 'https://github.com/Mustafiz04',
    linkedin: 'https://linkedin.com/in/mustaizkaifee',
    twitter: 'https://twitter.com/mustafiz_kaifee',
    email: 'mailto:mustafizkaifee04@gmailcom',
  },
}
