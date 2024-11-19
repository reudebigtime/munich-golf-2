import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'
import { ClockIcon, UserIcon } from '@heroicons/react/24/outline'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  coverImage: string
  publishedAt: string
  author: string
  readTime: string
  category: string
}

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-dark-lighter rounded-xl overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <Link href={`/blog/${post.id}`}>
        {/* Image Container */}
        <div className="relative h-48 w-full">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-grass-light text-white text-sm rounded-full">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-3 line-clamp-2 hover:text-grass-light transition-colors">
            {post.title}
          </h2>
          
          <p className="text-gray-400 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <UserIcon className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
            <span>
              {formatDistanceToNow(new Date(post.publishedAt), { 
                addSuffix: true,
                locale: de 
              })}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
