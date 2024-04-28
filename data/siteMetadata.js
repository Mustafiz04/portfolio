/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Mustafiz Kaifee',
  author: 'Mustafiz Kaifee',
  headerTitle: 'MustafizKaifee',
  description:
    'A software engineer dedicated to continuous evolution, innovation, and inspiring others through the transformative power of technology.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://mustafizkaifee.in',
  siteRepo: 'https://github.com/Mustafiz04/portfolio',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/logo.png',
  email: 'mustafizkaifee04@gmail.com',
  github: 'https://github.com/Mustafiz04',
  twitter: 'https://twitter.com/mustafiz_kaifee',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com/in/mustafizkaifee',
  threads: 'https://www.threads.net/mustafizkaifee',
  instagram: 'https://www.instagram.com/mustafizkaifee/',
  leetcode: 'https://leetcode.com/kaifee000/',
  locale: 'en-US',
  analyticsUrl: 'https://analytics.mustafizkaifee.in/share/NKmMJR57vxcWZKTR/www.mustafizkaifee.in',
  googleTravelMap: 'https://www.google.com/maps/d/embed?mid=1viaFGwOsLrVDWjdCSzPiSaP8FD_23R8',
  typewriterText: [
    ' I am currently residing in Bengaluru, Karnataka.',
    'Professionally, I am an aspiring Software Engineer with a keen interest in learning new technologies.',
    'My primary passion lies in the creation of innovative solutions aimed at assisting and benefiting people.',
    'Problem-solving is a skill I thoroughly enjoy and actively cultivate.',
    'I devote time to reading a variety of books.',
    'In my professional capacity, I predominantly work with JavaScript (JS) and TypeScript (TS) technologies.',
    'I am particularly drawn to the challenge of building scalable products.',
    'Currently, I am actively engaged in learning about System Design to further enhance my skills.',
    'Outside of work, I enjoy traveling to explore new places and cultures.',
    'Videography is another interest of mine, and I enjoy creating videos.',
    'Gaming is a pastime I indulge in to relax and unwind.',
    'I also have a fondness for playing chess.',
    'On a personal note, I consider myself a cat person, appreciating the companionship of feline pets.',
  ],
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: 'Mustafiz04/portfolio',
      repositoryId: 'R_kgDOLZWcgg',
      category: 'General',
      categoryId: 'DIC_kwDOLZWcgs4Cdp1n',
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}

module.exports = siteMetadata
