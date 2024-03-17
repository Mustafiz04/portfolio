'use client'
import { useEffect } from 'react'

export default function ViewCounter({ slug }) {
  useEffect(() => {
    fetch('/api/increament', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    })
  }, [slug])
  return null
}
