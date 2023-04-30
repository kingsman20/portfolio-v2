import Parser from 'rss-parser'
import { useEffect, useState } from 'react'
import SkeletonBlogEntry from '@components/SkeletonBlogEntry'

interface FeedItem {
  title: string
  link: string
  contentSnippet: string
  description: string
  image: string
  pubDate: string
}

interface CustomFeed {
  items: FeedItem[]
}

const extractImageUrl = (description: string): string | undefined => {
  const startIndex = description.indexOf('https://cdn-images')
  if (startIndex !== -1) {
    const endIndex = description.indexOf('" width', startIndex)
    if (endIndex !== -1) {
      return description.substring(startIndex, endIndex)
    }
  }
}

const Blog = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener')
    if (newWindow) newWindow.opener = null
  }

  useEffect(() => {
    setLoading(true)
    const getFeeds = async () => {
      interface CustomFeed {}
      interface CustomItem {
        description: string
      }
      const parser: Parser<CustomFeed, CustomItem> = new Parser({
        customFields: {
          item: ['description'],
        },
      })
      try {
        const feed = await parser.parseURL('https://medium.com/@kingslifeudo')
        console.log(`feed: ${feed}`)
        const data = feed.items.map((item) => ({
          title: item.title,
          link: item.link.substring(0, item.link.indexOf('?')),
          snippet: item.contentSnippet,
          description: item.description,
          image: item.description?.substring(
            item.description.indexOf('https://cdn-images'),
            item.description.indexOf('" width')
          ),
          pubDate: item.pubDate,
        }))
        setData(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    getFeeds()
  }, [])

  return (
    <div className="blog">
      <h1 className="p-2 text-center text-4xl font-extrabold text-gray-800 dark:text-white">
        Blog
      </h1>
      <div className="flex flex-col items-center justify-center py-2">
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          {loading &&
            Array(10)
              .fill(0, 0)
              .map(() => <SkeletonBlogEntry />)}
          {!loading &&
            data.map((d, i) => (
              <button
                key={i}
                onClick={() => {
                  openInNewTab(d.link)
                }}
                className="... transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
              >
                <div className="w-96 p-1">
                  <div className="px-5 text-left">{d.pubDate}</div>
                  <div className="bg-gray-dark px-6 py-3 text-base">
                    <div className="relative mb-4 rounded-lg text-[0px]">
                      <img src={d.image} alt={d.t} />
                    </div>
                    <h2 className="text-lg font-bold hover:text-sky-500 dark:text-white">
                      {d.title}
                    </h2>
                  </div>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
