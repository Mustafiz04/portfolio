import Script from 'next/script'
import { umami } from '@/data/analytics'

export default function Umami() {
  return (
    <Script
      async
      data-website-id={umami.umamiWebsiteId}
      src="https://analytics.leohuynh.dev/script.js"
    />
  )
}
