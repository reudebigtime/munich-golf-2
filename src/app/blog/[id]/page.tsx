'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { ArrowLeftIcon, ClockIcon, UserIcon, CalendarIcon, ShareIcon } from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'
import BlogCard from '@/components/blog/BlogCard'
import { toast } from 'react-hot-toast'

export default function BlogPost() {
  const params = useParams()
  const postId = params.id as string
  
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Lade Blog-Post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('/api/blog')
        const data = await response.json()
        
        // Finde den aktuellen Post
        const currentPost = data.posts?.find(p => p.id === postId && p.status === 'published')
        if (!currentPost) {
          throw new Error('Blog post not found')
        }
        setPost(currentPost)
        
        // Finde ähnliche Posts (gleiche Kategorie, aber nicht der aktuelle Post)
        const related = data.posts
          ?.filter(p => 
            p.id !== postId && 
            p.status === 'published' && 
            p.category === currentPost.category
          )
          .slice(0, 2) || []
        setRelatedPosts(related)
      } catch (error) {
        console.error('Error fetching post:', error)
        toast.error('Fehler beim Laden des Blog-Posts')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-dark">
        <Navigation />
        <div className="container-width py-24 text-center text-gray-400">
          Lade Blog-Post...
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-dark">
        <Navigation />
        <div className="container-width py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-400">
            Blog-Post nicht gefunden
          </h1>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 mt-6 text-grass-light hover:text-grass-green"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Zurück zur Übersicht
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dark">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px]">
        {/* Cover Image */}
        <div className="absolute inset-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-dark/40" />
        </div>

        {/* Content */}
        <div className="container-width relative h-full flex flex-col justify-end pb-12">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-grass-light hover:text-grass-green mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Zurück zur Übersicht
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              {format(new Date(post.publishedAt), 'dd. MMMM yyyy', { locale: de })}
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              {post.readTime}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container-width py-12">
        <div className="max-w-3xl mx-auto">
          {/* Author Info */}
          {post.authorImage && post.authorBio && (
            <div className="flex items-center gap-4 p-6 bg-dark-lighter rounded-lg mb-8">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-gray-400">{post.authorBio}</p>
              </div>
            </div>
          )}

          {/* Content */}
          <article 
            className="prose prose-invert prose-grass max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share */}
          <div className="flex items-center gap-4 mt-12 pt-8 border-t border-gray-800">
            <span className="text-gray-400">Teilen:</span>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                toast.success('Link kopiert!')
              }}
              className="flex items-center gap-2 text-grass-light hover:text-grass-green"
            >
              <ShareIcon className="w-5 h-5" />
              Link kopieren
            </button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container-width py-12">
          <h2 className="text-2xl font-bold mb-8">
            Ähnliche <span className="text-grass-light">Artikel</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
