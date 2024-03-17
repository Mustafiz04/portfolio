'use client'
import Typed from 'typed.js'
import { useEffect, useRef } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Typewriter() {
  // Create Ref element.
  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: siteMetadata.typewriterText,
      // Speed settings, try diffrent values untill you get good results
      startDelay: 300,
      typeSpeed: 50,
      backSpeed: 20,
      backDelay: 100,
      loop: true,
      loopCount: Infinity, // loop infinitely
    })

    // Destropying
    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <div>
      <span ref={el}></span>
    </div>
  )
}
