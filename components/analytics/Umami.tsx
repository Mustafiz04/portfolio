import Script from 'next/script'
import { umami } from '@/data/analytics'

export default function Umami() {
  return (
    <script
      defer
      src="https://umami-navy-eta.vercel.app/script.js"
      data-website-id={umami.umamiWebsiteId}
    ></script>
  )
}
