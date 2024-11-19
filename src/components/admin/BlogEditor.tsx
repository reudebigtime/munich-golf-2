'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Image from 'next/image'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
} from 'lucide-react'
import ImageUpload from './ImageUpload'

interface BlogPost {
  id?: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  status: 'published' | 'draft'
  publishedAt: string | null
  author: string
  authorImage?: string
  authorBio?: string
  readTime: string
}

const categories = ['Technik', 'Etikette', 'Plätze', 'Equipment', 'Turniere']

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('URL des Bildes:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL:', previousUrl)
    
    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link')
      .setLink({ href: url, target: '_blank' }).run()
  }

  return (
    <div className="border-b border-gray-800 p-2 mb-4 flex flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-green-400/20 transition-colors
                  ${editor.isActive('bold') ? 'bg-green-400/20 text-green-500' : 'text-gray-400'}`}
      >
        <Bold size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-green-400/20 transition-colors
                  ${editor.isActive('italic') ? 'bg-green-400/20 text-green-500' : 'text-gray-400'}`}
      >
        <Italic size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-green-400/20 transition-colors
                  ${editor.isActive('bulletList') ? 'bg-green-400/20 text-green-500' : 'text-gray-400'}`}
      >
        <List size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-green-400/20 transition-colors
                  ${editor.isActive('orderedList') ? 'bg-green-400/20 text-green-500' : 'text-gray-400'}`}
      >
        <ListOrdered size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-green-400/20 transition-colors
                  ${editor.isActive('blockquote') ? 'bg-green-400/20 text-green-500' : 'text-gray-400'}`}
      >
        <Quote size={20} />
      </button>
      <button
        onClick={setLink}
        className={`p-2 rounded hover:bg-green-400/20 transition-colors
                  ${editor.isActive('link') ? 'bg-green-400/20 text-green-500' : 'text-gray-400'}`}
      >
        <LinkIcon size={20} />
      </button>
      <button
        onClick={addImage}
        className="p-2 rounded hover:bg-green-400/20 transition-colors text-gray-400"
      >
        <ImageIcon size={20} />
      </button>
    </div>
  )
}

interface BlogEditorProps {
  initialData?: BlogPost
  onSave?: (post: BlogPost, status: 'published' | 'draft') => void
}

export default function BlogEditor({ initialData, onSave }: BlogEditorProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [category, setCategory] = useState(initialData?.category || categories[0])
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '')
  const [showPreview, setShowPreview] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapImage,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: initialData?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-lg max-w-none focus:outline-none min-h-[300px]',
      },
    },
  })

  const handleSave = (status: 'published' | 'draft') => {
    if (!editor || !onSave) return

    const content = editor.getHTML()
    const wordCount = content.split(/\s+/).length
    const readTime = `${Math.ceil(wordCount / 200)} min`

    const post: BlogPost = {
      ...initialData,
      title,
      excerpt,
      content,
      coverImage,
      category,
      status,
      publishedAt: status === 'published' ? new Date().toISOString() : null,
      author: 'Max Mustermann', // TODO: Dynamisch vom eingeloggten User
      readTime,
    }

    onSave(post, status)
  }

  if (showPreview) {
    return (
      <div className="space-y-8">
        {/* Preview Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Vorschau</h2>
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400
                     transition-colors duration-200"
          >
            Zurück zum Editor
          </button>
        </div>

        {/* Preview Content */}
        <div className="bg-dark-lighter rounded-xl overflow-hidden">
          {coverImage && (
            <div className="relative h-64 w-full">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-8">
            <span className="px-3 py-1 bg-green-400 text-white text-sm rounded-full">
              {category}
            </span>
            <h1 className="text-3xl font-bold mt-4 mb-2">{title}</h1>
            <p className="text-gray-400 mb-8">{excerpt}</p>
            <div 
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Meta Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Titel
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-dark-lighter border border-gray-800 rounded-lg
                       text-white placeholder-gray-500
                       focus:ring-2 focus:ring-green-400 focus:border-transparent"
              placeholder="Geben Sie den Titel ein..."
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">
              Kurzbeschreibung
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-dark-lighter border border-gray-800 rounded-lg
                       text-white placeholder-gray-500
                       focus:ring-2 focus:ring-green-400 focus:border-transparent"
              placeholder="Geben Sie eine kurze Beschreibung ein..."
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
              Kategorie
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-dark-lighter border border-gray-800 rounded-lg
                       text-white
                       focus:ring-2 focus:ring-green-400 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Cover-Bild
          </label>
          <ImageUpload onImageSelected={setCoverImage} />
        </div>
      </div>

      {/* Editor */}
      <div className="w-full border border-gray-800 rounded-lg overflow-hidden bg-dark-lighter">
        <MenuBar editor={editor} />
        <div className="p-4">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => setShowPreview(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-dark-lighter text-gray-300 rounded-lg
                   hover:bg-gray-800 transition-colors duration-200"
        >
          <Eye size={20} />
          <span>Vorschau</span>
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => handleSave('draft')}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700
                     transition-colors duration-200"
          >
            Als Entwurf speichern
          </button>
          <button
            onClick={() => handleSave('published')}
            className="px-6 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500
                     transition-colors duration-200"
          >
            Veröffentlichen
          </button>
        </div>
      </div>
    </div>
  )
}
