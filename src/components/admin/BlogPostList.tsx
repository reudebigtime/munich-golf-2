'use client'

import Image from 'next/image'
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  coverImage: string
  status: 'published' | 'draft'
  publishedAt: string | null
  author: string
}

interface BlogPostListProps {
  posts: BlogPost[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function BlogPostList({ posts, onEdit, onDelete }: BlogPostListProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-dark-lighter rounded-lg border border-gray-800">
        <p className="text-gray-400">Keine Blogbeiträge gefunden</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col md:flex-row gap-6 p-6 bg-dark-lighter rounded-lg border border-gray-800
                   hover:border-green-400 transition-colors duration-200"
        >
          {/* Cover Image */}
          <div className="relative w-full md:w-48 h-48 md:h-32">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white truncate">{post.title}</h3>
                <p className="mt-1 text-sm text-gray-400">
                  von {post.author} • {formatDate(post.publishedAt)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {post.status === 'published' && (
                  <Link
                    href={`/blog/${post.id}`}
                    className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                )}
                <button
                  onClick={() => onEdit(post.id)}
                  className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Möchten Sie diesen Blogbeitrag wirklich löschen?')) {
                      onDelete(post.id)
                    }
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="mt-2 text-gray-300 line-clamp-2">{post.excerpt}</p>

            {/* Status Badge */}
            <div className="mt-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${post.status === 'published'
                            ? 'bg-green-400/20 text-green-500'
                            : 'bg-gray-700/20 text-gray-400'
                          }`}
              >
                {post.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
