import Script from 'next/script'
import siteMetadata from '@/data/siteMetadata'

export default function Umami() {
  return (
    <Script
      async
      data-website-id={siteMetadata.umamiWebsiteId}
      src="https://analytics.leohuynh.dev/script.js"
    />
  )
}
