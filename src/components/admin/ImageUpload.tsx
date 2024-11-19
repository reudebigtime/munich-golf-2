'use client'

import { useState, useRef } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface ImageUploadProps {
  onImageSelected: (imageUrl: string) => void
}

export default function ImageUpload({ onImageSelected }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Bitte wählen Sie nur Bilddateien aus.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const imageUrl = reader.result as string
      setPreview(imageUrl)
      onImageSelected(imageUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 transition-colors
                ${isDragging 
                  ? 'border-green-400 bg-green-400/10' 
                  : 'border-gray-700 hover:border-green-400'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleFileSelect(file)
          }
        }}
      />

      {preview ? (
        // Image Preview
        <div className="relative aspect-video w-full">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded-lg"
          />
          <button
            onClick={() => {
              setPreview(null)
              onImageSelected('')
            }}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full
                     hover:bg-red-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ) : (
        // Upload Interface
        <div
          className="flex flex-col items-center justify-center py-12 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <PhotoIcon className="w-12 h-12 text-gray-400 mb-4" />
          <div className="text-center">
            <p className="text-gray-300 mb-1">
              Ziehen Sie ein Bild hierher oder
            </p>
            <p className="text-green-400 hover:text-green-500 transition-colors">
              klicken Sie zum Auswählen
            </p>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            PNG, JPG oder WEBP (max. 5MB)
          </p>
        </div>
      )}
    </div>
  )
}
