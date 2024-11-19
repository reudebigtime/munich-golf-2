'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import BlogPostList from '@/components/admin/BlogPostList'
import SearchBar from '@/components/admin/SearchBar'
import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Lade Blog-Posts
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast.error('Fehler beim Laden der Blog-Posts')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // Filter-Logik
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleEdit = (id: string) => {
    window.location.href = `/admin/edit/${id}`
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blog?id=${id}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to delete blog post')
      }
      
      toast.success('Blog-Post erfolgreich gelöscht')
      fetchPosts() // Aktualisiere die Liste
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Fehler beim Löschen des Blog-Posts')
    }
  }

  return (
    <main className="min-h-screen bg-dark">
      <Navigation />
      
      <div className="container-width py-24">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">
            Blog <span className="text-grass-light">Dashboard</span>
          </h1>
          <Link 
            href="/admin/new"
            className="flex items-center gap-2 px-4 py-2 bg-grass-light rounded-lg
                     hover:bg-grass-green transition-colors duration-200"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Neuer Beitrag</span>
          </Link>
        </div>

        {/* Filter und Suche */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Blogbeiträge durchsuchen..."
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-dark-lighter border border-gray-800 rounded-lg
                     text-gray-300 focus:ring-2 focus:ring-grass-light focus:border-transparent"
          >
            <option value="all">Alle Status</option>
            <option value="published">Veröffentlicht</option>
            <option value="draft">Entwurf</option>
          </select>
        </div>

        {/* Blog Post Liste */}
        {isLoading ? (
          <div className="text-center text-gray-400">Lade Blog-Posts...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center text-gray-400">
            {searchQuery || statusFilter !== 'all' 
              ? 'Keine Blog-Posts gefunden.'
              : 'Noch keine Blog-Posts vorhanden.'}
          </div>
        ) : (
          <BlogPostList 
            posts={filteredPosts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  )
}
