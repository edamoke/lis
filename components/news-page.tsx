'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface NewsPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image_url: string | null
  category: string
  author: string
  published_at: string
}

const CATEGORIES = ['general', 'academics', 'events', 'sports', 'announcements']

export default function NewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const url = new URL('/api/news', window.location.origin)
        if (selectedCategory) {
          url.searchParams.append('category', selectedCategory)
        }

        const res = await fetch(url.toString())
        if (!res.ok) throw new Error('Failed to fetch news')
        const { data } = await res.json()
        setPosts(data || [])
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">School News & Updates</h1>
          <p className="text-lg text-muted-foreground">
            Stay informed about the latest happenings at Light International School
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-96">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}

        {/* News Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/news/${post.slug}`}>
                <article className="group cursor-pointer h-full flex flex-col">
                  {/* Featured Image */}
                  {post.featured_image_url && (
                    <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full capitalize">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="text-sm text-muted-foreground">
                        By {post.author}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No news posts found in this category
            </p>
            {selectedCategory && (
              <Button onClick={() => setSelectedCategory(null)}>
                View all posts
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
