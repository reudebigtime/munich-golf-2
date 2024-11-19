'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import ImageUpload from '@/components/admin/ImageUpload'

const BlogEditor = dynamic(() => import('@/components/admin/BlogEditor'), {
  ssr: false,
})

// Mock-Funktion zum Laden der Blogpost-Daten
const fetchBlogPost = async (id: string) => {
  // TODO: Durch echten API-Call ersetzen
  return {
    id,
    title: 'Die besten Golftechniken für Anfänger',
    content: '<p>Hier steht der Inhalt des Blogposts...</p>',
    coverImage: '/images/blog/golf-techniques.jpg',
    status: 'published',
    publishedAt: '2023-11-15T10:00:00Z',
    author: 'Max Mustermann'
  }
}

export default function EditBlogPost() {
  const params = useParams()
  const postId = params.id as string

  const [title, setTitle] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await fetchBlogPost(postId)
        setTitle(post.title)
        setCoverImage(post.coverImage)
        // TODO: Setze den Editor-Inhalt
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading blog post:', error)
        // TODO: Zeige Fehlermeldung
        setIsLoading(false)
      }
    }

    loadPost()
  }, [postId])
  
  const handleUpdate = async () => {
    // TODO: Implement blog post update logic
    console.log('Updating blog post:', {
      id: postId,
      title,
      coverImage,
      // content will come from BlogEditor
    })
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-dark">
        <Navigation />
        <div className="container-width py-24">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grass-light" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dark">
      <Navigation />
      
      <div className="container-width py-24">
        <h1 className="text-4xl font-bold mb-12">
          Artikel <span className="text-grass-light">bearbeiten</span>
        </h1>

        <div className="space-y-8">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Artikel Titel
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-dark-lighter border border-gray-800 rounded-lg 
                       focus:ring-2 focus:ring-grass-light focus:border-transparent
                       text-white placeholder-gray-500"
              placeholder="Geben Sie den Titel ein..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cover Bild
            </label>
            <ImageUpload onImageSelected={setCoverImage} />
          </div>

          {/* Blog Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Artikel Inhalt
            </label>
            <BlogEditor />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700
                       transition-colors duration-200 font-medium"
            >
              Abbrechen
            </button>
            <button
              onClick={handleUpdate}
              className="px-6 py-2 bg-grass-light text-white rounded-lg hover:bg-grass-green
                       transition-colors duration-200 font-medium"
            >
              Aktualisieren
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
