import Script from 'next/script'
import { umami } from '@/data/analytics'

export default function Umami() {
  return (
    <script
      defer
      src="https://analytics.mustafizkaifee.in/script.js"
      data-website-id={umami.umamiWebsiteId}
    ></script>
  )
}
