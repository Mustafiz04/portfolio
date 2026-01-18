'use client'
import { useEffect } from 'react'

export default function ViewCounter({ slug }) {
  const isProduction = process.env.NODE_ENV === 'production'

  useEffect(() => {
    if (!isProduction) return
    fetch('/api/increament', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    })
  }, [slug, isProduction])
  return null
}
