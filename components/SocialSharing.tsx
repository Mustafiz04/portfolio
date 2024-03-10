'use client'
import { FacebookShare, TwitterShare, LinkedinShare, WhatsappShare } from 'react-share-kit'

export default function SocialSharing({ title, url }) {
  const titleToShare = `Check out this amazing post on ${title}`

  return (
    <div>
      <div>
        {/* <FacebookShare url={url} title={titleToShare} size={28} round={true} style={{paddingRight: '.2rem'}} /> */}
        <TwitterShare
          url={url}
          title={titleToShare}
          size={28}
          round={true}
          style={{ paddingRight: '.2rem' }}
        />
        <LinkedinShare
          url={url}
          title={titleToShare}
          size={28}
          round={true}
          className="mr-2"
          style={{ paddingRight: '.2rem' }}
        />
        <WhatsappShare
          url={url}
          title={titleToShare}
          size={28}
          round={true}
          style={{ paddingRight: '.2rem' }}
        />
        <button
          className="mr-2"
          onClick={(e) => {
            e.preventDefault()
            navigator.clipboard.writeText(url)
          }}
          title="Copy link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mt-[-20px] inline h-7 w-7 hover:text-blue-600 dark:hover:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
