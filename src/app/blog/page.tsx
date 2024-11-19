'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { images } from '@/lib/images'

type BlogPost = {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  image: string
  category: string
  content: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Die perfekte Golfschwung-Technik',
    excerpt: 'Entdecken Sie die Geheimnisse eines effizienten und präzisen Golfschwungs.',
    date: '15. Oktober 2023',
    author: 'Sebastian Meyer',
    image: images.golfSwing,
    category: 'Technik',
    content: 'Ausführlicher Artikel über Golfschwung-Techniken...'
  },
  {
    id: 2,
    title: 'Mentales Training im Golf',
    excerpt: 'Wie Sie Ihre mentale Stärke auf dem Golfplatz verbessern können.',
    date: '12. Oktober 2023',
    author: 'Sarah Schmidt',
    image: images.mentalTraining,
    category: 'Mental',
    content: 'Detaillierte Einblicke in mentales Training...'
  },
  {
    id: 3,
    title: 'Ausrüstungsguide für Anfänger',
    excerpt: 'Die wichtigsten Golfschläger und Ausrüstungsgegenstände für Einsteiger.',
    date: '10. Oktober 2023',
    author: 'Michael Bauer',
    image: images.golfEquipment,
    category: 'Ausrüstung',
    content: 'Umfassender Guide zur Golfausrüstung...'
  }
]

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-dark text-white pt-20">
        {/* Hero Section */}
        <div className="relative h-[40vh] overflow-hidden">
          <Image
            src={images.golfBlog}
            alt="Golf Blog"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-dark/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-4"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-green-400">Golf Blog</h1>
              <p className="text-2xl md:text-3xl font-medium text-green-300">
                Tipps, Tricks und Insights aus der Welt des Golfsports
              </p>
            </motion.div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="container-width py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-lighter rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative h-[200px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-400 text-dark px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-green-400">{post.date}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-green-400">{post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-green-300">{post.title}</h3>
                  <p className="text-gray-400">{post.excerpt}</p>
                  <button className="mt-4 text-green-400 hover:text-green-500 font-medium transition-colors">
                    Weiterlesen →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Blog Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-dark-lighter rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-[300px]">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-dark/80 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-dark transition-colors"
                >
                  ✕
                </button>
                <div className="absolute top-4 left-4 bg-green-400 text-dark px-3 py-1 rounded-full text-sm font-medium">
                  {selectedPost.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="text-green-400">{selectedPost.date}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-green-400">{selectedPost.author}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-300">{selectedPost.title}</h3>
                <p className="text-gray-300">{selectedPost.content}</p>
                <div className="mt-8 flex justify-between items-center">
                  <button
                    className="bg-green-400 hover:bg-green-500 text-dark font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                    onClick={() => setSelectedPost(null)}
                  >
                    Zurück zur Übersicht
                  </button>
                  <div className="flex space-x-4">
                    <button className="text-green-400 hover:text-green-500 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h4v2h-4V4zm0 12V9l4.5 4.5L12 18z" />
                      </svg>
                    </button>
                    <button className="text-green-400 hover:text-green-500 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  )
}
