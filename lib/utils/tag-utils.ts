import { slug } from 'github-slugger'
import type { Blog, Snippet } from 'contentlayer/generated'

export function getAllTags(allBlogs: Blog[], allSnippets: Snippet[] = []) {
  const tagCount: Record<string, number> = {}

  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  if (allSnippets.length > 0) {
    allSnippets.forEach((file) => {
      if (file.tags && file.draft !== true) {
        file.tags.forEach((tag) => {
          const formattedTag = slug(tag)
          if (formattedTag in tagCount) {
            tagCount[formattedTag] += 1
          } else {
            tagCount[formattedTag] = 1
          }
        })
      }
    })
  }

  return tagCount
}
