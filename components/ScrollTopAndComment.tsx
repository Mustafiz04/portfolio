'use client'

import siteMetadata from '@/data/siteMetadata'
import { useEffect, useState } from 'react'
import { MessageCircle, ArrowUp } from 'lucide-react'

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }
  const handleScrollToComment = () => {
    document.getElementById('comment')?.scrollIntoView()
  }
  return (
    <div
      className={`fixed bottom-8 right-8 hidden flex-col gap-3 ${show ? 'md:flex' : 'md:hidden'}`}
    >
      {siteMetadata.comments?.provider && (
        <button
          aria-label="Scroll To Comment"
          onClick={handleScrollToComment}
          className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-primary-50 hover:text-primary-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-primary-900/20 dark:hover:text-primary-400"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}
      <button
        aria-label="Scroll To Top"
        onClick={handleScrollTop}
        className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-primary-50 hover:text-primary-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-primary-900/20 dark:hover:text-primary-400"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  )
}

export default ScrollTopAndComment
