'use client'
import { FacebookShare, TwitterShare, LinkedinShare, WhatsappShare } from 'react-share-kit'
import { Link2 } from 'lucide-react'

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
          <Link2 className="mt-[-20px] inline h-7 w-7 hover:text-primary-500 dark:hover:text-primary-400" />
        </button>
      </div>
    </div>
  )
}
