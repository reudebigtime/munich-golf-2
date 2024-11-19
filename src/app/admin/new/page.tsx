'use client'

import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import BlogEditor from '@/components/admin/BlogEditor'
import { toast } from 'react-hot-toast'

export default function NewBlogPost() {
  const router = useRouter()

  const handleSave = async (post: any, status: 'published' | 'draft') => {
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...post, status }),
      })

      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to save blog post')
      }

      toast.success(status === 'published' ? 'Artikel veröffentlicht!' : 'Entwurf gespeichert!')
      router.push('/admin')
    } catch (error) {
      console.error('Error saving blog post:', error)
      toast.error('Fehler beim Speichern des Artikels')
    }
  }

  return (
    <main className="min-h-screen bg-dark">
      <Navigation />
      
      <div className="container-width py-24">
        <h1 className="text-4xl font-bold mb-12">
          Neuer <span className="text-grass-light">Artikel</span>
        </h1>

        <BlogEditor onSave={handleSave} />
      </div>
    </main>
  )
}
