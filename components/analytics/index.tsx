/* eslint-disable @typescript-eslint/no-explicit-any */
import GA from './GoogleAnalytics'
import Umami from './Umami'

import analytics from '@/data/analytics'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    plausible?: (...args: any[]) => void
    sa_event?: (...args: any[]) => void
  }
}

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  const { googleAnalytics, umami } = analytics
  return (
    <>
      {isProduction && googleAnalytics.googleAnalyticsId && <GA />}
      {isProduction && umami.umamiWebsiteId && <Umami />}
    </>
  )
}

export default Analytics
